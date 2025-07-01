import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
    FaCheck,
    FaTimes,
    FaUserCircle,
    FaMapMarkerAlt,
    FaClock,
    FaPhone,

} from 'react-icons/fa';
import { RiMessage2Fill } from 'react-icons/ri';
import { GiPoliceBadge } from 'react-icons/gi';
import { toast } from 'react-toastify';
import MessageInput from './WorkerDashboard Components/MessageInput';

function FindWorkers() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeMessageRequest, setActiveMessageRequest] = useState(null);
    const [messageText, setMessageText] = useState('');
    const [isSendingMessage, setIsSendingMessage] = useState(false);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const token = localStorage.getItem('token');
                const user_id = localStorage.getItem('user_id');

                const response = await axios.get('http://127.0.0.1:8000/api/get-send-request-to-workers', {
                    params: { user_id: user_id },
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.data.success) {
                    setRequests(response.data.data);
                } else {
                    setError('Failed to load requests');
                }
            } catch (error) {
                console.error('Error fetching requests:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    const handleRequest = async (id, action, workerMessage = '') => {
        try {
            const token = localStorage.getItem('token');

            setRequests(requests.map(request =>
                request.id === id ? { ...request, status: action } : request
            ));

            const response = await axios.post(
                'http://127.0.0.1:8000/api/update-send-request-to-workers',
                {
                    request_id: id,
                    status: action,
                    worker_message: workerMessage
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (!response.data.success) {
                setRequests(requests.map(request =>
                    request.id === id ? { ...request, status: 'pending' } : request
                ));
                throw new Error('Failed to update request status');
            }

            toast.success(`Request ${action} successfully`);
            return response.data.request;

        } catch (error) {
            console.error('Error updating request:', error);
            setError('Failed to update request status. Please try again.');
            toast.error(error.response?.data?.message || 'Failed to update request status');
            throw error;
        }
    };

    const handleSendMessage = async () => {
        if (!messageText.trim() || !activeMessageRequest) return;

        setIsSendingMessage(true);
        try {
            const updatedRequest = await handleRequest(
                activeMessageRequest.id,
                activeMessageRequest.status,
                messageText
            );
            setRequests(requests.map(request =>
                request.id === activeMessageRequest.id
                    ? { ...request, worker_message: messageText }
                    : request
            ));

            toast.success('Message sent successfully');
            setMessageText('');
            setActiveMessageRequest(null);
            return updatedRequest;
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error(error.message || 'Failed to send message');
        } finally {
            setIsSendingMessage(false);
        }
    };

    const filteredRequests = requests.filter(request => {
        if (filter === 'all') return true;
        return request.status === filter;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-red-700">Error: {error}</p>
                    </div>
                </div>
            </div>
        );
    }

    if (filteredRequests.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-sm p-8 mr-3">
                <div className="text-center py-12">
                    <svg
                        className="mx-auto h-12 w-12 text-yellow-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">
                        {filter === 'all' ? 'No requests found' : `No ${filter} requests`}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 mb-6">
                        {filter === 'all'
                            ? "You don't have any client requests at this time."
                            : `You don't have any ${filter} requests.`}
                    </p>

                    {filter !== 'all' && (
                        <button
                            onClick={() => setFilter('all')}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                            View All Requests
                        </button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Client Requests</h1>
                <div className="relative">
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="all">All Requests</option>
                        <option value="pending">Pending</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="bg-white shadow-xl overflow-hidden sm:rounded-lg">
                <ul className="divide-y divide-gray-200">
                    {filteredRequests.map((request) => (
                        <li key={request.id} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 relative">
                                    {request.client?.profile?.profile_image ? (
                                        <img
                                            src={request.client.profile.profile_image}
                                            alt="Profile"
                                            className="h-14 w-14 rounded-full object-cover border-2 border-white shadow"
                                        />
                                    ) : (
                                        <div className="h-14 w-14 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white">
                                            <FaUserCircle className="h-10 w-10" />
                                        </div>
                                    )}
                                    <span className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white ${request.status === 'accepted' ? 'bg-green-400' :
                                        request.status === 'rejected' ? 'bg-red-400' : 'bg-yellow-400'
                                        }`}></span>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-900">
                                                {request.client?.profile?.first_name} {request.client?.profile?.last_name}
                                            </h2>
                                            <div className="flex items-center mt-1 text-sm text-gray-500">
                                                <FaClock className="mr-1.5 flex-shrink-0" />
                                                <span>{new Date(request.requested_date).toLocaleString()}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${request.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                                request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {request.status}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-3">
                                        <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded-lg">
                                            {request.message}
                                        </p>
                                    </div>

                                    {request.worker_message && (
                                        <div className="mt-3 bg-purple-50 p-3 rounded-lg">
                                            <p className="text-xs font-medium text-purple-800">Your response:</p>
                                            <p className="text-sm text-gray-700">{request.worker_message}</p>
                                        </div>
                                    )}

                                    {request.special_requirements && (
                                        <div className="mt-3 flex items-start">
                                            <div className="flex-shrink-0 pt-0.5">
                                                <GiPoliceBadge className="h-5 w-5 text-yellow-500" />
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-900">Special Requirements</p>
                                                <p className="text-sm text-gray-500">{request.special_requirements}</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="mt-3 flex items-center text-sm text-gray-500">
                                        <FaMapMarkerAlt className="mr-1.5 flex-shrink-0" />
                                        <span>
                                            {request.client?.profile?.city}, {request.client?.profile?.province}, {request.client?.profile?.country}
                                        </span>
                                    </div>

                                    <div className="mt-4 flex items-center space-x-4">
                                        <button
                                            onClick={() => setActiveMessageRequest(request)}
                                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                        >
                                            <RiMessage2Fill className="mr-2" />
                                            {request.worker_message ? 'Edit Response' : 'Respond'}
                                        </button>
                                        <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                                            <FaPhone className="mr-2" />
                                            Call
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 flex justify-end space-x-3">
                                {request.status === 'pending' ? (
                                    <>
                                        <button
                                            onClick={() => handleRequest(request.id, 'accepted')}
                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                        >
                                            <FaCheck className="mr-2" />
                                            Accept Request
                                        </button>
                                        <button
                                            onClick={() => handleRequest(request.id, 'rejected')}
                                            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                        >
                                            <FaTimes className="mr-2" />
                                            Decline
                                        </button>
                                    </>
                                ) : request.status === 'accepted' ? (
                                    <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-purple-500 to-indigo-600">
                                        <FaCheck className="mr-2" />
                                        Accepted
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-red-500 to-pink-600">
                                        <FaTimes className="mr-2" />
                                        Rejected
                                    </span>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {activeMessageRequest && (
                <MessageInput
                    initialMessage={activeMessageRequest.worker_message || ''}
                    recipientName={activeMessageRequest.client?.profile?.first_name}
                    onSend={async (message) => {
                        setIsSendingMessage(true);
                        try {
                            const updatedRequest = await handleRequest(
                                activeMessageRequest.id,
                                activeMessageRequest.status,
                                message
                            );
                            setRequests(requests.map(request =>
                                request.id === activeMessageRequest.id
                                    ? { ...request, worker_message: message }
                                    : request
                            ));
                            toast.success('Message sent successfully');
                            setMessageText('');
                            setActiveMessageRequest(null);
                        } catch (error) {
                            console.error('Error sending message:', error);
                            toast.error(error.message || 'Failed to send message');
                        } finally {
                            setIsSendingMessage(false);
                        }
                    }}
                    onClose={() => setActiveMessageRequest(null)}
                    isSending={isSendingMessage}
                />
            )}
        </div>
    );
}

export default FindWorkers;