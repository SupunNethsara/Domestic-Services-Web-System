import { motion } from "framer-motion";


const Welcome = () => {


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-center">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-5xl font-bold mb-4"
      >
        Welcome to Our Service
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-lg md:text-xl mb-6"
      >
        Find trusted domestic service providers easily.
      </motion.p>

      <motion.button
        className="px-6 py-3 text-lg font-semibold bg-white text-blue-500 rounded-lg shadow-lg transition transform hover:scale-105 hover:bg-blue-100"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
        onClick={() => navigate("/select-role")}
      >
        Get Started
      </motion.button>
    </div>
  );
};

export default Welcome;
