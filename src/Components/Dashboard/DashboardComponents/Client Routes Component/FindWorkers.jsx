import React, { useState, useEffect } from 'react';

function FindWorkers() {
    const [workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/AvailabilityToRequests');
                if (!response.ok) {
                    throw new Error('Failed to fetch workers');
                }
                const data = await response.json();
                setWorkers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkers();
    }, []);

if (loading) {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center space-y-4">
            <svg className="animate-spin h-12 w-12 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <h2 className="text-xl font-medium text-gray-700">Finding Available Workers</h2>
            <p className="text-gray-500 max-w-md text-center">
                We're searching our network for professionals matching your requirements.
                This usually takes just a moment...
            </p>
            <div className="w-1/3 bg-gray-200 rounded-full h-2.5">
                <div className="bg-indigo-600 h-2.5 rounded-full animate-pulse" style={{width: '45%'}}></div>
            </div>
        </div>
    );
}


if (error) {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center space-y-6 px-4">
            <svg className="h-16 w-16 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800">Oops! Something went wrong</h2>
            <p className="text-gray-600 text-center max-w-md">
                We couldn't load the worker data. Error: <span className="font-medium">{error}</span>
            </p>
            <div className="space-y-3 text-center">
                <p className="text-gray-500">
                    You can try refreshing the page or come back later.
                </p>
                <button 
                    onClick={() => window.location.reload()}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh Page
                </button>
            </div>
            <div className="mt-6 text-sm text-gray-400">
                Need help? <a href="/contact" className="text-indigo-600 hover:text-indigo-500">Contact support</a>
            </div>
        </div>
    );
}

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6 py-6">
                <h1 className="text-xl font-bold text-gray-900 mb-6">Find Workers</h1>

                <div className="space-y-3">
                    {workers.map((worker) => (
                        <div key={worker.worker_id} className="bg-white shadow-sm rounded-md w-full border border-gray-100">
                            <div className="px-4 py-3 flex items-center">
                                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center mr-3 overflow-hidden">
                                    {worker.profile_image ? (
                                        <img
                                            src={worker.profile_image}
                                            alt={worker.full_name}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-gray-600 text-sm font-medium">
                                            {worker.first_name?.charAt(0)}{worker.last_name?.charAt(0)}
                                        </span>
                                    )}
                                </div>
                                <div className="flex-grow">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-base font-medium text-gray-900">{worker.full_name}</h2>
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-2xs font-medium bg-green-100 text-green-800">
                                            Available
                                        </span>
                                    </div>

                                    <div className="mt-0.5 flex items-center text-sm">
                                        <span className="text-gray-600 font-medium">
                                            {worker.services?.[0]?.name || 'General Worker'}
                                        </span>
                                        <span className="mx-1.5 text-gray-300">•</span>
                                        <span className="text-gray-500">{worker.city}, {worker.country}</span>
                                    </div>

                                    <div className="mt-1.5 flex items-center">
                                        <div className="flex items-center text-sm">
                                            <svg className="h-3.5 w-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <span className="ml-0.5 text-gray-600">
                                                Rate: {worker.expected_rate?.rate_type === 'hourly' ?
                                                    `${worker.expected_rate?.max_rate} ${worker.expected_rate?.currency}/hr` :
                                                    `${worker.expected_rate?.max_rate} ${worker.expected_rate?.currency}`}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="ml-3 flex-shrink-0">
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                                    >
                                        Request
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FindWorkers;