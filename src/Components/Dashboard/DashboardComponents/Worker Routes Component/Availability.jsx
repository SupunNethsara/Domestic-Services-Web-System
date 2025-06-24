import React, { useEffect, useState } from 'react';
import AvailabilityModal from './AvailabilityModal';
import axios from 'axios';
import { 
  FiCalendar, 
  FiMapPin, 
  FiClock, 
  FiDollarSign, 
  FiUser, 
  FiPlus,
  FiEdit2
} from 'react-icons/fi';

export default function Availability() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [availabilityData, setAvailabilityData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const user_id = localStorage.getItem('user_id');
 
    const handleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const fetchAvailabilityData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://127.0.0.1:8000/api/getAvailability/${user_id}`);
            setAvailabilityData(response.data.data);
        } catch (err) {
            setError('Failed to fetch availability data');
            console.error('API Error:', err);
        } finally {
            setLoading(false);
        }
    }
  
    useEffect(() => {
        if (user_id) {
            fetchAvailabilityData();
        } else {
            setError('User not authenticated');
        }
    }, [user_id]);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
              
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div className="mb-4 md:mb-0">
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                            <FiCalendar className="mr-3 text-indigo-600" />
                            Your Availability
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Manage your work schedule and service details
                        </p>
                    </div>
                    <button
                        onClick={handleModal}
                        className="flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                    >
                        <FiPlus className="mr-2" />
                        Add Availability
                    </button>
                </div>

               
                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        {availabilityData.length > 0 ? (
                            availabilityData.map(item => (
                                <div key={item.id} className="p-8">
                                  
                                    <div className="flex items-center mb-8 pb-6 border-b border-gray-100">
                                        <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
                                            <FiUser size={20} />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-semibold text-gray-800">{item.name}</h2>
                                            <p className="text-sm text-gray-500">Worker ID: {item.worker_id}</p>
                                        </div>
                                    </div>

                                
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    
                                        <div className="space-y-8">
                                          
                                            <div className="flex items-start">
                                                <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-4 mt-1">
                                                    <FiCalendar size={16} />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-medium text-gray-700 mb-2">Availability Type</h3>
                                                    <p className="capitalize text-gray-600 text-lg">{item.availability_type}</p>
                                                </div>
                                            </div>

                                        
                                            <div className="flex items-start">
                                                <div className="p-2 rounded-full bg-green-100 text-green-600 mr-4 mt-1">
                                                    <FiMapPin size={16} />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-medium text-gray-700 mb-2">Locations</h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {item.locations?.map((location, idx) => (
                                                            <span key={idx} className="inline-block bg-gray-100 rounded-full px-4 py-2 text-sm font-semibold text-gray-700">
                                                                {location}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                 
                                        <div className="space-y-8">
                                          
                                            <div className="flex items-start">
                                                <div className="p-2 rounded-full bg-purple-100 text-purple-600 mr-4 mt-1">
                                                    <FiDollarSign size={16} />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-medium text-gray-700 mb-2">Rates & Services</h3>
                                                    <div className="flex flex-wrap gap-2 mb-3">
                                                        {item.services?.map((service, idx) => (
                                                            <span key={idx} className="inline-block bg-purple-100 rounded-full px-4 py-2 text-sm font-semibold text-purple-800">
                                                                {service.name} ({service.rate}{service.currency})
                                                            </span>
                                                        ))}
                                                    </div>
                                                    {item.expected_rate && (
                                                        <p className="text-gray-600">
                                                            <span className="font-medium">Max Rate:</span> {item.expected_rate.max_rate} {item.expected_rate.currency} ({item.expected_rate.rate_type})
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                        
                                            {item.preferences && (
                                                <div className="flex items-start">
                                                    <div className="p-2 rounded-full bg-yellow-100 text-yellow-600 mr-4 mt-1">
                                                        <FiClock size={16} />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-medium text-gray-700 mb-2">Preferences</h3>
                                                        <p className="text-gray-600">{item.preferences}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    
                                    <div className="mt-10 pt-8 border-t border-gray-100">
                                        <div className="flex items-center mb-6">
                                            <div className="p-2 rounded-full bg-yellow-100 text-yellow-600 mr-3">
                                                <FiClock size={16} />
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-700">Weekly Schedule</h3>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                                            {Object.entries(item.weekly_availability || {}).map(([day, times]) => (
                                                <div key={day} className="bg-gray-50 p-4 rounded-lg">
                                                    <p className="text-sm font-medium text-gray-500 capitalize mb-2">{day}</p>
                                                    {times.from && times.to ? (
                                                        <p className="text-gray-700">{times.from} - {times.to}</p>
                                                    ) : (
                                                        <p className="text-gray-400 italic">Not available</p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-12 text-center">
                                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-6">
                                    <FiCalendar className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-medium text-gray-900 mb-2">No availability set</h3>
                                <p className="text-gray-500 mb-6">Add your availability to start receiving work requests</p>
                                <button
                                    onClick={handleModal}
                                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                                >
                                    <FiPlus className="mr-2" />
                                    Add Availability
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {isModalOpen && (
                    <AvailabilityModal
                        isOpen={isModalOpen}
                        handleModal={handleModal}
                        onSuccess={fetchAvailabilityData}
                    />
                )}
            </div>
        </div>
    );
}