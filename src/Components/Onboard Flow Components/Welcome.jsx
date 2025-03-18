import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate , Routes, Route } from "react-router";
const Welcome = () => {
  const [isSinhala, setIsSinhala] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="relative h-screen bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-center">
      {/* Header Section */}
      <div className="absolute top-4 right-4">
        <button
          className="px-4 py-2 border-2 border-white rounded-lg text-white hover:bg-white hover:text-blue-500 transition text-xs"
          onClick={() => setIsSinhala(!isSinhala)}
        >
          {isSinhala ? "Switch to English" : "සිංහලට මාරු කරන්න"}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center h-full">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          {isSinhala ? "සාදරයෙන් පිළිගනිමු!" : "Welcome to Our Service"}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-lg md:text-xl mb-6"
        >
          {isSinhala
            ? "විශ්වාසනීය ගෘහසේවා සපයන්නන් පහසුවෙන් සොයන්න."
            : "Find trusted domestic service providers easily."}
        </motion.p>

        <motion.button 
          className="px-6 py-3 text-lg font-semibold bg-white text-blue-500 rounded-lg shadow-lg transition transform hover:scale-105 hover:bg-blue-100"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          onClick={() => navigate("/user-select")}
        >

          {isSinhala ? "ආරම්භය" : "Get Started"}
        </motion.button>
      </div>
    </div>
  );
};

export default Welcome;
