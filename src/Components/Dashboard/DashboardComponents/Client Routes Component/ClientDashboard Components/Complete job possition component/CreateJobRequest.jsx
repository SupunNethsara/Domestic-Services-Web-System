// CreateJobRequest.js (Main Component)
import React, { useState } from 'react';
import CreateJobRequestModal from './CreateJobRequestModal';

function CreateJobRequest() {
  const [isRequestModalOpen, setisRequestModalOpen] = useState(false);

  const handleRequestModal = () => {
    setisRequestModalOpen(!isRequestModalOpen);
  }

  return (
    <div className="bg-white  p-4 h-[100vh]">
      <div className="flex justify-between items-center mb-6 ">
        <h3 className="text-2xl font-bold text-gray-800">Client Requests</h3>
        <button 
          onClick={handleRequestModal}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Create Request
        </button>
      </div>
      
      {isRequestModalOpen && (
        <div style={{backgroundColor:'rgb(0,0,0,0.5'}} className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-2xl">
            <CreateJobRequestModal onClose={handleRequestModal} />
          </div>
        </div>
      )}
    </div>
  )
}

export default CreateJobRequest;