import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useState } from "react";

const UserSelection = () => {
  const navigate = useNavigate();
  const [isSinhala, setIsSinhala] = useState(false);
  const [userType, setUserType] = useState(null); 

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

  
      {!userType && (
        <>
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-4xl font-bold mb-6"
          >
            {isSinhala ? "ඔබ නව පරිශීලකයෙක්ද?" : "Are you a New or Existing User?"}
          </motion.h1>

          <div className="flex space-x-6 mb-6">
            <motion.button
              className="px-6 py-3 text-lg font-semibold bg-white text-green-600 rounded-lg shadow-lg transition transform hover:scale-105 hover:bg-green-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() =>navigate("/select-role")}
            >
              {isSinhala ? "නව පරිශීලක" : "New User"}
            </motion.button>

            <motion.button
              className="px-6 py-3 text-lg font-semibold bg-white text-blue-600 rounded-lg shadow-lg transition transform hover:scale-105 hover:bg-blue-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/login")}
            >
              {isSinhala ? "දැනටමත් ලියාපදිංචි වී ඇත" : "Existing User"}
            </motion.button>
          </div>
        </>
      )}

    
    
    </div>
  );
};

export default UserSelection;
