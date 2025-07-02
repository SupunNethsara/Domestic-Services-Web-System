import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FiCalendar,
  FiMapPin,
  FiX, FiChevronDown, FiMessageSquare
} from 'react-icons/fi';

const ClientRequestList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/getAllClientsRequest', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setRequests(response.data || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch requests');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const openModal = (request) => {
    setSelectedRequest(request);
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
      <div className="max-w-3xl mx-auto">
        <h1 className="text-xl font-bold text-gray-800 mb-6">Client Requests</h1>

        <div className="space-y-4">
          {requests.length > 0 ? (
            requests.map((request) => (
              <div key={request.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md">
                <div className="p-5 flex flex-col sm:flex-row justify-between gap-4">
               <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="flex-shrink-0">
                      <img
                        src={request.client?.profile?.profile_image || '/default-avatar.png'}
                        alt={request.client?.profile?.username || 'user'}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-medium text-gray-900 truncate">
                        {request.client?.profile?.first_name || 'Unknown'} {request.client?.profile?.last_name || ''}
                      </h2>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <FiMapPin size={14} className="flex-shrink-0" />
                          <span className="truncate">{request.location || 'Location not specified'}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <FiCalendar size={14} className="flex-shrink-0" />
                          <span>Posted {formatDate(request.created_at)}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                 <div className="flex sm:flex-col items-center sm:items-end gap-3">
                    <div className={`px-3 py-1 text-xs rounded-full ${request.status === 'open'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-gray-50 text-gray-700'
                      }`}>
                      {request.status || 'unknown'}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAskAboutJob(request.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg transition-colors"
                      >
                        <FiMessageSquare size={16} />
                        <span className="hidden sm:inline">Ask about job</span>
                      </button>
                      <button
                        onClick={() => openModal(request)}
                        className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm rounded-lg transition-colors"
                      >
                        <span>Details</span>
                        <FiChevronDown size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                {request.job_titles?.length > 0 && (
                  <div className="px-5 pb-4 -mt-2">
                    <div className="flex flex-wrap gap-2">
                      {request.job_titles.map((job, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium"
                        >
                          {job}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No client requests found</h3>
              <p className="text-gray-500">When clients make requests, they'll appear here</p>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && selectedRequest && (
        <div style={{ backgroundColor: 'rgb(0,0,0,0.5' }} className="fixed inset-0 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-800">Request Details</h2>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                  <FiX size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedRequest.client?.profile?.profile_image || '/default-avatar.png'}
                    alt={selectedRequest.client?.profile?.username || 'user'}
                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div>
                    <h3 className="font-medium text-gray-800">
                      {selectedRequest.client?.profile?.first_name || 'Unknown'} {selectedRequest.client?.profile?.last_name || ''}
                    </h3>
                    <p className="text-gray-600 text-sm">{selectedRequest.client?.email || 'Email not available'}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <FiMapPin size={14} />
                      <span>{selectedRequest.location || 'Location not specified'}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="font-medium text-gray-800 border-b pb-2">Job Information</h3>

                  <div>
                    <h4 className="text-gray-800">{selectedRequest.custom_job_title || 'No job title specified'}</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedRequest.job_titles?.map((job, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                          {job || 'Service'}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm">{selectedRequest.description || 'No description provided'}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Salary Range</p>
                      <p className="font-medium">{selectedRequest.salary_range || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Job Type</p>
                      <p className="font-medium capitalize">{selectedRequest.job_type || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Frequency</p>
                      <p className="font-medium capitalize">{selectedRequest.frequency || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Status</p>
                      <p className={`font-medium capitalize ${selectedRequest.status === 'open' ? 'text-green-600' : 'text-gray-600'
                        }`}>
                        {selectedRequest.status || 'unknown'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium text-gray-800 border-b pb-2">Timeline</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Start Date</p>
                      <p className="font-medium">{formatDate(selectedRequest.start_date)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">End Date</p>
                      <p className="font-medium">{formatDate(selectedRequest.end_date)}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="font-medium text-gray-800 border-b pb-2">Requirements</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedRequest.has_transportation && (
                      <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs">
                        Transportation
                      </span>
                    )}
                    {selectedRequest.background_check && (
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                        Background Check
                      </span>
                    )}
                    {selectedRequest.interview_required && (
                      <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs">
                        Interview Required
                      </span>
                    )}
                    {!selectedRequest.has_transportation &&
                      !selectedRequest.background_check &&
                      !selectedRequest.interview_required && (
                        <span className="px-3 py-1 bg-gray-50 text-gray-700 rounded-full text-xs">
                          No special requirements
                        </span>
                      )}
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientRequestList;