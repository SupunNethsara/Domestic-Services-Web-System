import React, { useState, useEffect } from 'react';
import {
    FaUserCircle, FaStar, FaRegStar, FaPhone, FaMapMarkerAlt,
    FaCalendarAlt, FaMoneyBillWave, FaCreditCard, FaCashRegister,
    FaCheckCircle, FaExclamationTriangle
} from 'react-icons/fa';
import { RiMessage2Fill } from 'react-icons/ri';
import { GiSkills } from 'react-icons/gi';
import { IoMdTime } from 'react-icons/io';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

function MainProfilesForClient() {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [activeTab, setActiveTab] = useState('details');
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [paymentAmount, setPaymentAmount] = useState('');
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get worker data from location state or params
    const location = useLocation();
    const { workerId } = useParams();
    const { workerData: locationWorkerData } = location.state || {};

    const [worker, setWorker] = useState(null);
    const [clientJob, setClientJob] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                if (locationWorkerData) {
                    setWorker(transformWorkerData(locationWorkerData));
                }

                const token = localStorage.getItem('token');

                const jobResponse = await axios.get('http://127.0.0.1:8000/api/getActiveJobs',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                if (jobResponse.data && jobResponse.data.length > 0) {
                    setClientJob(jobResponse.data[0]);
                }

            } catch (err) {
                setError(err.message);
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [workerId, locationWorkerData]);

 const transformWorkerData = (apiData) => {
        return {
            id: apiData.worker_id,
            name: apiData.full_name || `${apiData.first_name} ${apiData.last_name}`,
            profileImage: apiData.profile_image,
            rating: 4.5,
            skills: apiData.services?.map(service => service.name) || [],
            location: `${apiData.city}, ${apiData.country}`,
            rate: apiData.expected_rate
                ? `${apiData.expected_rate.currency} ${apiData.expected_rate.max_rate}/${apiData.expected_rate.rate_type}`
                : 'Rate not specified',
            availability: apiData.availability_type === 'weekly'
                ? formatWeeklyAvailability(apiData.weekly_availability)
                : 'Flexible',
            contact: apiData.mobile || 'Contact not provided',
            bio: apiData.about || 'No bio provided',
            rawData: apiData
        };
    };

    const formatWeeklyAvailability = (weeklyAvailability) => {
        if (!weeklyAvailability) return 'Not specified';

        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        return days
            .filter(day => weeklyAvailability[day.toLowerCase()])
            .join(', ');
    };

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            setMessages([...messages, {
                id: messages.length + 1,
                text: newMessage,
                sender: 'client',
                time: new Date().toLocaleTimeString()
            }]);
            setNewMessage('');
        }
    };

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        setShowPaymentModal(false);
        alert(`Payment of ${paymentAmount} LKR submitted via ${paymentMethod}`);
        setPaymentAmount('');
    };

    const handleRatingSubmit = (e) => {
        e.preventDefault();
        setShowRatingModal(false);
        alert(`Thank you for your ${rating} star rating and review!`);
        setRating(0);
        setReview('');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-700">Loading worker profile...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center text-red-600">
                    <FaExclamationTriangle className="text-4xl mx-auto mb-4" />
                    <p>Error loading profile: {error}</p>
                </div>
            </div>
        );
    }

    if (!worker) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center text-gray-600">
                    <p>Worker not found</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                    {clientJob ? `Service Request #${clientJob.id}` : 'Worker Profile'}
                </h1>

                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                    {clientJob && (
                        <div className="bg-green-100 px-6 py-3 flex items-center justify-between">
                            <div className="flex items-center">
                                <FaCheckCircle className="text-green-600 mr-2" />
                                <span className="font-medium text-green-800">Request Accepted</span>
                            </div>
                            <div className="text-sm text-green-700">
                                {clientJob.start_date && `Started on ${new Date(clientJob.start_date).toLocaleDateString()}`}
                            </div>
                        </div>
                    )}

                    <div className="border-b border-gray-200">
                        <nav className="flex -mb-px">
                            <button
                                onClick={() => setActiveTab('details')}
                                className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'details' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                            >
                                Details
                            </button>
                            <button
                                onClick={() => setActiveTab('messages')}
                                className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'messages' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                            >
                                Messages
                            </button>
                            {clientJob && (
                                <button
                                    onClick={() => setActiveTab('payments')}
                                    className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'payments' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                                >
                                    Payments
                                </button>
                            )}
                        </nav>
                    </div>

                    <div className="p-6">
                        {activeTab === 'details' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                        <FaUserCircle className="mr-2 text-indigo-600" />
                                        Worker Profile
                                    </h2>
                                    <div className="flex items-start mb-4">
                                        <div className="mr-4">
                                            {worker.profileImage ? (
                                                <img
                                                    src={worker.profileImage}
                                                    alt={worker.name}
                                                    className="w-16 h-16 rounded-full object-cover"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = 'https://via.placeholder.com/150';
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                                    <FaUserCircle className="text-3xl" />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900">{worker.name}</h3>
                                            <div className="flex items-center mt-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    star <= Math.floor(worker.rating) ? (
                                                        <FaStar key={star} className="text-yellow-400" />
                                                    ) : (
                                                        <FaRegStar key={star} className="text-yellow-400" />
                                                    )
                                                ))}
                                                <span className="ml-1 text-sm text-gray-600">({worker.rating})</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center">
                                            <GiSkills className="text-gray-500 mr-2" />
                                            <span className="text-gray-700">
                                                <strong>Skills:</strong> {worker.skills.join(', ')}
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <FaMapMarkerAlt className="text-gray-500 mr-2" />
                                            <span className="text-gray-700">
                                                <strong>Location:</strong> {worker.location}
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <FaMoneyBillWave className="text-gray-500 mr-2" />
                                            <span className="text-gray-700">
                                                <strong>Rate:</strong> {worker.rate}
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <IoMdTime className="text-gray-500 mr-2" />
                                            <span className="text-gray-700">
                                                <strong>Availability:</strong> {worker.availability}
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <FaPhone className="text-gray-500 mr-2" />
                                            <span className="text-gray-700">
                                                <strong>Contact:</strong> {worker.contact}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <h4 className="font-medium text-gray-800 mb-2">About</h4>
                                        <p className="text-gray-600">{worker.bio}</p>
                                    </div>

                                    <div className="mt-6 flex space-x-3">
                                        <button
                                            onClick={() => setShowRatingModal(true)}
                                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                                        >
                                            Rate Worker
                                        </button>
                                    </div>
                                </div>

                                {clientJob && (
                                    <div>
                                        <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                                <FaCalendarAlt className="mr-2 text-indigo-600" />
                                                Job Details
                                            </h2>
                                            <div className="space-y-3">
                                                <div>
                                                    <strong className="text-gray-700">Job Titles:</strong>
                                                    <p className="text-gray-600 mt-1">
                                                        {clientJob.job_titles?.join(', ')}
                                                    </p>
                                                </div>
                                                <div>
                                                    <strong className="text-gray-700">Location:</strong>
                                                    <p className="text-gray-600">{clientJob.location}</p>
                                                </div>
                                                <div>
                                                    <strong className="text-gray-700">Salary Range:</strong>
                                                    <p className="text-gray-600">{clientJob.salary_range}</p>
                                                </div>
                                                <div>
                                                    <strong className="text-gray-700">Description:</strong>
                                                    <p className="text-gray-600">{clientJob.description}</p>
                                                </div>
                                                <div>
                                                    <strong className="text-gray-700">Duration:</strong>
                                                    <p className="text-gray-600">
                                                        {new Date(clientJob.start_date).toLocaleDateString()} to{' '}
                                                        {new Date(clientJob.end_date).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mt-6">
                                                <button
                                                    onClick={() => setShowPaymentModal(true)}
                                                    className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                                                >
                                                    Make Payment
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'messages' && (
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                    <RiMessage2Fill className="mr-2 text-indigo-600" />
                                    Messages
                                </h2>

                                <div className="h-64 overflow-y-auto mb-4 space-y-3">
                                    {messages.length > 0 ? (
                                        messages.map((message) => (
                                            <div
                                                key={message.id}
                                                className={`p-3 rounded-lg max-w-xs ${message.sender === 'client' ? 'bg-indigo-100 ml-auto' : 'bg-white'}`}
                                            >
                                                <p className="text-gray-800">{message.text}</p>
                                                <p className="text-xs text-gray-500 mt-1 text-right">{message.time}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-8 text-gray-500">
                                            No messages yet. Start the conversation!
                                        </div>
                                    )}
                                </div>

                                <div className="flex">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Type your message..."
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                    <button
                                        onClick={handleSendMessage}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 transition-colors"
                                    >
                                        Send
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'payments' && clientJob && (
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                    <FaMoneyBillWave className="mr-2 text-indigo-600" />
                                    Payment History
                                </h2>

                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date().toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {clientJob.salary_range}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    Credit Card
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        Pending
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="mt-6">
                                    <button
                                        onClick={() => setShowPaymentModal(true)}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                                    >
                                        Make New Payment
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showPaymentModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Make Payment</h2>
                        <form onSubmit={handlePaymentSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Amount (LKR)</label>
                                <input
                                    type="number"
                                    value={paymentAmount}
                                    onChange={(e) => setPaymentAmount(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Payment Method</label>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="card"
                                            checked={paymentMethod === 'card'}
                                            onChange={() => setPaymentMethod('card')}
                                            className="mr-2"
                                        />
                                        <FaCreditCard className="mr-2" />
                                        Credit/Debit Card
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="bank"
                                            checked={paymentMethod === 'bank'}
                                            onChange={() => setPaymentMethod('bank')}
                                            className="mr-2"
                                        />
                                        <FaCashRegister className="mr-2" />
                                        Bank Transfer
                                    </label>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowPaymentModal(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                                >
                                    Confirm Payment
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showRatingModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Rate Worker</h2>
                        <form onSubmit={handleRatingSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Rating</label>
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            type="button"
                                            key={star}
                                            onClick={() => setRating(star)}
                                            className="text-2xl mr-1 focus:outline-none"
                                        >
                                            {star <= rating ? (
                                                <FaStar className="text-yellow-400" />
                                            ) : (
                                                <FaRegStar className="text-yellow-400" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Review (Optional)</label>
                                <textarea
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    rows="3"
                                ></textarea>
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowRatingModal(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                                >
                                    Submit Rating
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MainProfilesForClient;