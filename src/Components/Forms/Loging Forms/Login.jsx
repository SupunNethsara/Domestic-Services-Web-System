import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });
  
      const { role, token } = response.data;
  
      if (!role || !token) {
        throw new Error("Invalid response from server");
      }
  
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
  
      if (role === "client") {
        navigate("/client-dashboard");
        console.log('Login Successfull');
      } else if (role === "worker") {
        navigate("/worker-dashboard");
        console.log('Login Successfull');
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log("Login Failed", error.response ? error.response.data : error);
    }
  };
  
  return (
    <section className="bg-white">
      <div className="flex justify-center min-h-screen">
        <motion.div
          initial={{ x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="hidden bg-cover p-10 justify-center items-center lg:block lg:w-2/5 bg-blue-500"
        >
          <img className="mt-10" src="" alt="" />
        </motion.div>

        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full"
          >
            <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize">
              Welcome Back!
            </h1>

            <p className="mt-4 text-gray-500">
              Please enter your credentials to login to your account.
            </p>

            <form onSubmit={handlelogin} className="grid grid-cols-1 gap-6 mt-8">
              <div>
                <label className="block mb-2 text-sm text-gray-600">Email address</label>
                <input
                  type="email"
                  placeholder="johnsnow@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                <span>Login</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 rtl:-scale-x-100"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </form>

            <p className="mt-6 text-sm text-center text-gray-500">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/Worker-Register")}
                className="text-blue-500 hover:underline focus:outline-none"
              >
                Register here
              </button>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}