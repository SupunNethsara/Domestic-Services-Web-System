import React, { useState, useEffect } from 'react';
import CreateJobRequestModal from './CreateJobRequestModal';
import axios from 'axios';

function CreateJobRequest() {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleRequestModal = () => {
    setIsRequestModalOpen(!isRequestModalOpen);
  }

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/getClientStoreRequest', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setRequests(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [isRequestModalOpen]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error: {error}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Job Requests</h1>
            <p className="text-gray-600 mt-1">Manage your service requests</p>
          </div>
          <button
            onClick={handleRequestModal}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            New Request
          </button>
        </div>
        {requests.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {requests.map((request) => (
              <div key={request.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100">
                <div className="p-6 pb-0 flex items-start gap-4">
                  <img
                    src={request.client.profile.profile_image}
                    alt={request.client.profile.username}
                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {request.client.profile.first_name} {request.client.profile.last_name}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${request.status === 'open' ? 'bg-green-100 text-green-800' :
                          request.status === 'filled' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                        }`}>
                        {request.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{request.client.profile.city}, {request.client.profile.country}</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-gray-800 mb-3">Job Details</h2>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {request.job_titles.map((job, index) => (
                        <span key={index} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium">
                          {job}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</p>
                      <p className="text-gray-800 font-medium">{request.salary_range}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Type</p>
                      <p className="text-gray-800 font-medium capitalize">{request.job_type}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</p>
                      <p className="text-gray-800 font-medium">
                        {new Date(request.start_date).toLocaleDateString()} -
                        {request.end_date ? ` ${new Date(request.end_date).toLocaleDateString()}` : ' Ongoing'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Requirements</p>
                      <div className="flex gap-1">
                        {request.has_transportation && <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">Transport</span>}
                        {request.background_check && <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">Background</span>}
                        {request.interview_required && <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">Interview</span>}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-700 line-clamp-3">{request.description}</p>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-500">
                      Created {new Date(request.created_at).toLocaleDateString()}
                    </span>
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors">
                        Edit
                      </button>
                      <button className="px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-8 text-center border-2 border-dashed border-gray-200">
            <div className="mx-auto w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No job requests yet</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">Create your first job request to find qualified workers for your needs</p>
            <button
              onClick={handleRequestModal}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create New Request
            </button>
          </div>
        )}
      </div>

      {isRequestModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden animate-fadeIn">
            <CreateJobRequestModal onClose={handleRequestModal} />
          </div>
        </div>
      )}
    </div>
  )
}

export default CreateJobRequest;