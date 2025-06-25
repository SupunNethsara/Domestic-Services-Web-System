import React from 'react';
import { FiAlertTriangle, FiX } from 'react-icons/fi';

function DeleteModal({ handledeleteAvilability , item , handleDeleteModal}) {
    return (
        <div style={{backgroundColor:'rgba(0,0,0,0.5'}} className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-md p-6 mx-auto bg-white rounded-xl shadow-2xl animate-fade-in">
               
                <button 
                    onClick={handleDeleteModal}
                    className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <FiX className="w-6 h-6" />
                </button>

              
                <div className="flex flex-col items-center text-center">
              
                    <div className="flex items-center justify-center w-16 h-16 mb-4 bg-red-100 rounded-full">
                        <FiAlertTriangle className="w-8 h-8 text-red-600" />
                    </div>

               
                    <h3 className="mb-2 text-xl font-semibold text-gray-800">
                        Confirm Deletion
                    </h3>

                  
                    <p className="mb-6 text-gray-500">
                        Are you sure you want to delete this item? This action cannot be undone.
                    </p>

                   
                    <div className="flex justify-center w-full gap-3">
                        <button
                            onClick={handleDeleteModal}
                            className="px-6 py-2 font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={()=>handledeleteAvilability(item.id )}
                            className="px-6 py-2 font-medium text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;