import { useState, useEffect } from 'react';
import {useNavigate } from 'react-router';

const Popupadd = () => {
  const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };
  const handleCompleteProfile =()=>{
    handleClose(); 
    navigate('makeprofile');
  }

  return (
    <>
      {isVisible && (
   
        <div style={{backgroundColor:'rgba(0,0,0,0.5)'}} className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
       
          <div className="w-96 bg-white rounded-lg shadow-xl overflow-hidden">
      
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex justify-between items-center">
              <h3 className="font-bold text-lg">Complete Your Profile</h3>
              <button 
                onClick={handleClose} 
                className="text-white hover:text-gray-200 focus:outline-none"
              >
                ✕
              </button>
            </div>
            
    
            <div className="p-6 text-center">
              <p className="text-gray-700 mb-4">
                ඔබේ පැතිකඩ 100% සම්පූර්ණ කරන්න අවශ්යයි! මෙය ඔබගේ SEO traffic වැඩි කිරීමට උපකාරී වේ.
              </p>
              <div className="space-y-3">

                <button  onClick={handleCompleteProfile} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-md hover:from-blue-700 hover:to-purple-700 transition">
                  Complete Now
                </button>
                <button 
                  onClick={handleClose}
                  className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition"
                >
                  Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popupadd;