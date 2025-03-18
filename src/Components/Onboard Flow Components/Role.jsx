import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useState } from "react";

const RoleSelection = () => {
  const navigate = useNavigate();
const[isSinhala , setIsSinhala] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-500 to-blue-400 text-white text-center">
     <div className="absolute top-4 right-4">
        <button
          className="px-4 py-2 border-2 border-white rounded-lg font-bold text-white hover:bg-white hover:text-blue-500 transition text-xs"
          onClick={() => setIsSinhala(!isSinhala)}
        >
          {isSinhala ? "Switch to English" : "සිංහලට මාරු කරන්න"}
        </button>
      </div>
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-4xl font-bold mb-6"
      >
       {isSinhala ? "ඔබේ භූමිකාව තෝරන්න" : "Select Your Role"}
      </motion.h1>

      <div className="flex space-x-6 mb-6">
        <motion.button
          className="px-6 py-3 text-lg font-semibold bg-white text-green-600 rounded-lg shadow-lg transition transform hover:scale-105 hover:bg-green-100"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/Client-Register")}
        >
          I am a Client
        </motion.button>

        <motion.button
          className="px-6 py-3 text-lg font-semibold bg-white text-blue-600 rounded-lg shadow-lg transition transform hover:scale-105 hover:bg-blue-100"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/Worker-Register")}
        >
          I am a Worker
        </motion.button>
      </div>

 
    </div>
  );
};

export default RoleSelection;
