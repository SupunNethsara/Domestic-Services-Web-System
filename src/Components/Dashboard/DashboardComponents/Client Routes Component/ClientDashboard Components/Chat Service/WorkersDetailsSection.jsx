import React from 'react';
import {
    FiUser,
    FiMapPin,
    FiClock,
    FiDollarSign,
    FiX,
    FiCalendar,
    FiInfo,
    FiMessageSquare
} from 'react-icons/fi';

function WorkersDetailsSection({ handelChatModalOpenClose, workerData }) {
    return (
        <div style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
            <div className="relative w-full max-w-lg bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="flex justify-between items-center p-4 bg-indigo-600 text-white">
                    <div className="flex items-center space-x-3">
                        {workerData?.profile_image ? (
                            <img
                                src={workerData.profile_image}
                                alt={workerData.name}
                                className="w-10 h-10 rounded-full object-cover border-2 border-white"
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                                <FiUser className="text-white" />
                            </div>
                        )}
                        <h2 className="text-lg font-semibold">{workerData?.name}</h2>
                    </div>
                    <button
                        onClick={handelChatModalOpenClose}
                        className="p-1 text-white hover:bg-blue-950 hover:bg-opacity-20 rounded-full"
                    >
                        <FiX size={20} />
                    </button>
                </div>
                <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
                    <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center text-gray-600">
                            <FiMapPin className="mr-1 text-indigo-500" />
                            <span>{workerData?.locations?.join(', ') || 'Location not specified'}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <FiClock className="mr-1 text-indigo-500" />
                            <span>
                                {workerData?.weekly_availability
                                    ? `${Object.keys(workerData.weekly_availability).length} days available`
                                    : 'Availability not specified'}
                            </span>
                        </div>
                    </div>

                  
                    {workerData?.about && (
                        <div className="bg-gray-50 p-3 rounded">
                            <h3 className="font-medium text-gray-800 mb-1">About</h3>
                            <p className="text-sm text-gray-600">{workerData.about}</p>
                        </div>
                    )}

              
                    {workerData?.preferences && (
                        <div className="bg-blue-50 p-3 rounded">
                            <h3 className="font-medium text-blue-800 mb-1">Preferences</h3>
                            <p className="text-sm text-blue-600">{workerData.preferences}</p>
                        </div>
                    )}

               
                    <div>
                        <h3 className="font-medium text-gray-800 mb-2">Services</h3>
                        <div className="space-y-2">
                            {workerData?.services?.map((service, index) => (
                             <div key={index} className="flex justify-between items-center p-2 border-b border-gray-300">
                                    <span className="text-gray-700">{service.name}</span>
                                    <span className="flex items-center text-green-600">
                                        <FiDollarSign className="mr-1" size={12} />
                                        {service.rate} {service.currency}/{service.rate_type}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                  
                    <div>
                        <h3 className="font-medium text-gray-800 mb-2">Availability</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            {workerData?.weekly_availability && Object.entries(workerData.weekly_availability).map(([day, times]) => (
                                <div key={day} className="bg-gray-50 p-2 rounded">
                                    <span className="font-medium capitalize text-indigo-600">{day}</span>
                                    <div className="text-gray-500">
                                        {times.from} - {times.to}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

               
                <div className="p-4 border-t border-gray-300">
                    <button
                        onClick={() => console.log("Chat with:", workerData?.id)}
                        className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded flex items-center justify-center"
                    >
                        <FiMessageSquare className="mr-2" />
                        Start Chat
                    </button>
                </div>
            </div>
        </div>
    );
}

export default WorkersDetailsSection;