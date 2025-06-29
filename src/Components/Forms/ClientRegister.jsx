import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import axios from 'axios';
import './Style.css'
import { useState } from "react";
export default function ClientRegister() {
  const navigate = useNavigate();

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (password.trim() !== confirmPassword.trim()) {
      alert("Password and confirmation password do not match");
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/ClientRegister', {
        fname, lname, mobile, email, password, password_confirmation: confirmPassword
      });
     alert("Registration Successful!");
      navigate('/login');
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      alert("Registration failed!");
    }
  };

  return (
    <section class="bg-white ">
      <div class="flex justify-center min-h-screen ">
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

        <div class="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5 ">

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 1 }} class="w-full">

            <h1 class="text-2xl font-semibold tracking-wider text-gray-800 capitalize ">
              Get your free account now.
            </h1>

            <p class="mt-4 text-gray-500 ">
              Let’s get you all set up so you can verify your personal account and begin setting up your profile.
            </p>

            <div class="mt-6">
              <h1 class="text-gray-500 ">Select type of account</h1>

              <div class="mt-3 md:flex md:items-center md:-mx-2">
                <button class="flex justify-center w-full px-6 py-3 text-white bg-blue-500 rounded-lg md:w-auto md:mx-2 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>

                  <span class="mx-2">
                    client
                  </span>
                </button>

                <button onClick={() => navigate("/Worker-Register")} class="flex justify-center w-full px-6 py-3 mt-4 text-blue-500 border border-blue-500 rounded-lg md:mt-0 md:w-auto md:mx-2 dark:border-blue-400 dark:text-blue-400 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>

                  <span class="mx-2">
                    worker
                  </span>
                </button>
              </div>
            </div>

            <form onSubmit={handlesubmit} class="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
              <div>
                <label class="block mb-2 text-sm text-gray-600">First Name</label>
                <input type="text" placeholder="John" onChange={(e) => setFname(e.target.value)} value={fname} class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg    focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>

              <div>
                <label class="block mb-2 text-sm text-gray-600 ">Last name</label>
                <input type="text" placeholder="Snow" onChange={(e) => setLname(e.target.value)} value={lname} class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg    focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>

              <div>
                <label class="block mb-2 text-sm text-gray-600 ">Phone number</label>
                <input type="text" placeholder="XXX-XX-XXXX-XXX" onChange={(e) => setMobile(e.target.value)} value={mobile} class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg    focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>

              <div>
                <label class="block mb-2 text-sm text-gray-600 ">Email address</label>
                <input type="email" placeholder="johnsnow@example.com" onChange={(e) => setEmail(e.target.value)} value={email} class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg    focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>

              <div>
                <label class="block mb-2 text-sm text-gray-600 ">Password</label>
                <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} value={password} class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg   focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>

              <div>
                <label class="block mb-2 text-sm text-gray-600 ">Confirm password</label>
                <input type="password" placeholder="Enter your password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  dark:text-gray-300  focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>

              <button type="submit"
                class="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                <span>Sign Up </span>

                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd" />
                </svg>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
