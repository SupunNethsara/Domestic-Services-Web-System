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

      const { role, token, id } = response.data;

      if (!role || !token) {
          navigate('/'); 
        throw new Error("Invalid response from server");
     }

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("user_id", id);

      if (role === "client") {
        navigate("/client-dashboard");
        console.log('Login Successfull');
      }
      else if (role == "admin") {
        navigate("/adminpanel")
        console.log("navigate to Admin panel")
      }
      else if (role === "worker") {
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
          className="hidden bg-cover p-10 justify-center items-center lg:flex lg:w-2/5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-xl relative"
        >
          <div className="text-center">
            <h2 className="text-5xl font-bold text-white mb-4 tracking-tighter">HOME HEROES</h2>
            <p className="text-blue-100 text-lg mb-8">Modern living solutions</p>
            <div className="mt-12 mx-auto w-3/4">
              <svg
                viewBox="0 0 512 512"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto"
              >
                <path
                  d="M256 32L0 160V480H512V160L256 32Z"
                  fill="white"
                  fillOpacity="0.2"
                />
                <path
                  d="M416 480V256H320V480H416Z"
                  fill="white"
                  fillOpacity="0.4"
                />
                <path
                  d="M192 480V256H96V480H192Z"
                  fill="white"
                  fillOpacity="0.4"
                />
                <path
                  d="M256 32L0 160H512L256 32Z"
                  fill="white"
                  fillOpacity="0.6"
                />
              </svg>
            </div>
          </div>
        </motion.div>

        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full"
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
            <p className="text-gray-500 mb-8">Please enter your credentials to login to your account.</p>

            <form onSubmit={handlelogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                <input
                  type="email"
                  placeholder="johnsnow@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow hover:shadow-md transition-all duration-300 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 font-medium flex items-center justify-center"
              >
                <span>Sign In</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 ml-2"
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