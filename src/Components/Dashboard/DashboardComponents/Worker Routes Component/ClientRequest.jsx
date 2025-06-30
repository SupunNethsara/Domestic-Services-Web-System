import React, { useState } from 'react';
import { FaCheck, FaTimes, FaUserCircle, FaStar, FaBriefcase, FaMapMarkerAlt } from 'react-icons/fa';

function FindWorkers() {
  const [workers, setWorkers] = useState([
    {
      id: 1,
      name: 'John Smith',
      profession: 'Electrician',
      rating: 4.8,
      jobsCompleted: 42,
      location: 'New York, NY',
      availability: 'Available Now',
      status: 'pending'
    },

  ]);

  const handleRequest = (id, action) => {
    setWorkers(workers.map(worker => 
      worker.id === id ? { ...worker, status: action } : worker
    ));
  };

  return (
    <div className="max-w-full mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold text-gray-800 mb-6">Clients Request</h1>
      
      <div className="space-y-3">
        {workers.map((worker) => (
          <div key={worker.id} className={`bg-white rounded-lg shadow-sm p-4 border-l-2 ${
            worker.status === 'accepted' ? 'border-green-400' : 
            worker.status === 'rejected' ? 'border-red-400' : 'border-blue-400'
          }`}>
            <div className="flex items-start">
            <div className="flex-shrink-0 mr-3">
                <FaUserCircle className="h-10 w-10 text-gray-300" />
              </div>
                <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-medium text-gray-800">{worker.name}</h2>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    worker.availability === 'Available Now' ? 'bg-green-50 text-green-600' :
                    'bg-blue-50 text-blue-600'
                  }`}>
                    {worker.availability}
                  </span>
                </div>
                
                <div className="mt-1 flex items-center text-xs text-gray-500">
                  <FaBriefcase className="mr-1" size={12} />
                  <span>{worker.profession}</span>
                  <span className="mx-1">•</span>
                  <FaMapMarkerAlt className="mr-1" size={12} />
                  <span>{worker.location}</span>
                </div>
                
                <div className="mt-1 flex items-center text-xs">
                  <FaStar className="text-yellow-400 mr-1" size={12} />
                  <span className="text-gray-700">{worker.rating}</span>
                  <span className="mx-1 text-gray-400">•</span>
                  <span className="text-gray-500">{worker.jobsCompleted} jobs</span>
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="mt-3 flex justify-end space-x-2">
              {worker.status === 'pending' ? (
                <>
                  <button
                    onClick={() => handleRequest(worker.id, 'accepted')}
                    className="px-3 py-1 text-xs font-medium rounded-md bg-green-50 text-green-600 hover:bg-green-100 transition-colors flex items-center"
                  >
                    <FaCheck className="mr-1" size={12} />
                    Accept
                  </button>
                  <button
                    onClick={() => handleRequest(worker.id, 'rejected')}
                    className="px-3 py-1 text-xs font-medium rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition-colors flex items-center"
                  >
                    <FaTimes className="mr-1" size={12} />
                    Reject
                  </button>
                </>
              ) : worker.status === 'accepted' ? (
                <span className="px-2 py-1 text-xs font-medium rounded-md bg-green-50 text-green-600 flex items-center">
                  <FaCheck className="mr-1" size={12} />
                  Accepted
                </span>
              ) : (
                <span className="px-2 py-1 text-xs font-medium rounded-md bg-red-50 text-red-600 flex items-center">
                  <FaTimes className="mr-1" size={12} />
                  Rejected
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FindWorkers;