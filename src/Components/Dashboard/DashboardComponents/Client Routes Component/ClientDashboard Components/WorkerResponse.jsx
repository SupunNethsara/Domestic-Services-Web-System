import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FiCalendar,
  FiMessageSquare,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin
} from 'react-icons/fi';

function WorkerResponse() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchWorkerResponses = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/getJobRequest', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        console.log('Worker responses data:', response.data);
        setResponses(response.data.data || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch worker responses');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkerResponses();
  }, []);

  const openModal = (response) => {
    setSelectedResponse(response);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Invalid date';
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'Not specified';
    try {
      return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Invalid date';
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-4 my-6">
      Error: {error}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Worker Responses</h1>
          <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
            {responses.length} {responses.length === 1 ? 'Response' : 'Responses'}
          </span>
        </div>

        <div className="space-y-4">
          {responses.length > 0 ? (
            responses.map((response) => (
              <div key={response.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md">
                <div className="p-5">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className="flex-shrink-0">
                        <img
                          src={response.worker_profile?.profile_image || '/default-avatar.png'}
                          alt={response.worker_profile?.username || 'worker'}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h2 className="font-medium text-gray-900 truncate">
                          {response.worker_profile?.first_name || 'Unknown'} {response.worker_profile?.last_name || ''}
                        </h2>
                        <p className="text-sm text-gray-500 truncate">@{response.worker_profile?.username || 'username'}</p>
                        
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 mt-2">
                          <span className="flex items-center gap-1">
                            <FiCalendar size={14} className="flex-shrink-0" />
                            <span>Responded {formatDateTime(response.created_at)}</span>
                          </span>
                          <span className="flex items-center gap-1 bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full">
                            <FiMessageSquare size={14} className="flex-shrink-0" />
                            <span className="capitalize">{response.category || 'General'}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => openModal(response)}
                        className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg transition-colors"
                      >
                        <FiMessageSquare size={16} />
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-medium text-gray-800 mb-2">{response.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {response.message}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No responses yet</h3>
              <p className="text-gray-500">When workers respond to your job requests, they'll appear here</p>
            </div>
          )}
        </div>
      </div>

      {/* Response Details Modal */}
      {isModalOpen && selectedResponse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Response Details</h2>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Worker Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-800 mb-3">Worker Information</h3>
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedResponse.worker_profile?.profile_image || '/default-avatar.png'}
                      alt={selectedResponse.worker_profile?.username || 'worker'}
                      className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">
                        {selectedResponse.worker_profile?.first_name || 'Unknown'} {selectedResponse.worker_profile?.last_name || ''}
                      </h4>
                      <p className="text-gray-600 text-sm">@{selectedResponse.worker_profile?.username || 'username'}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <FiMail size={14} />
                          <span>{selectedResponse.worker_profile?.email || 'Email not available'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <FiMapPin size={14} />
                          <span>
                            {selectedResponse.worker_profile?.city || ''} 
                            {selectedResponse.worker_profile?.city && selectedResponse.worker_profile?.country ? ', ' : ''}
                            {selectedResponse.worker_profile?.country || 'Location not specified'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Response Content */}
                <div>
                  <h3 className="font-medium text-gray-800 mb-3">Response Content</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Category</label>
                      <p className="font-medium text-indigo-600 capitalize">{selectedResponse.category || 'General'}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Title</label>
                      <p className="font-medium text-gray-800">{selectedResponse.title}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Message</label>
                      <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                        {selectedResponse.message}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Sent On</label>
                        <p className="text-gray-600">{formatDateTime(selectedResponse.created_at)}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Last Updated</label>
                        <p className="text-gray-600">{formatDateTime(selectedResponse.updated_at)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      // Add functionality to contact the worker
                      console.log('Contact worker:', selectedResponse.worker_profile);
                    }}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Contact Worker
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkerResponse;