import React, { useState, useEffect } from 'react';
import { FiFilter, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import ClientRequestModal from './ClientDashboard Components/Client Request Components/ClientRequestModal';
import axios from 'axios';

function FindWorkers() {
    const [workers, setWorkers] = useState([]);
    const [filteredWorkers, setFilteredWorkers] = useState([]);
    const [workerStatuses, setWorkerStatuses] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const workersPerPage = 8;
    const [showFilters, setShowFilters] = useState(false);
    const [isShowRequestModal, setIsShowRequestModal] = useState(false);
    const [selectedWorker, setSelectedWorker] = useState(null);
    const [filters, setFilters] = useState({
        name: '',
        minPrice: '',
        maxPrice: '',
        sortBy: 'none'
    });

    const handleShowRequestModal = (worker) => {
        setSelectedWorker(worker);
        setIsShowRequestModal(true);
    };

    const handleCloseRequest = () => {
        setIsShowRequestModal(false);
        setSelectedWorker(null);
    
        if (workers.length > 0) {
            getStatusesForAllWorkers();
        }
    };

    const getStatusesForAllWorkers = async () => {
        const token = localStorage.getItem("token");
        const statusMap = {};
        
        for (const worker of workers) {
            try {
                const response = await axios.post(
                    'http://127.0.0.1:8000/api/getClientRequestStatus',
                    { worker_id: worker.worker_id },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                statusMap[worker.worker_id] = response.data[0] || null;
            } catch (error) {
                console.error(`Error fetching status for worker ${worker.worker_id}`, error);
                statusMap[worker.worker_id] = null;
            }
        }
        
        setWorkerStatuses(statusMap);
    };

    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/AvailabilityToRequests');
                if (!response.ok) {
                    throw new Error('Failed to fetch workers');
                }
                const data = await response.json();
                setWorkers(data);
                setFilteredWorkers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkers();
    }, []);

    useEffect(() => {
        if (workers.length > 0) {
            getStatusesForAllWorkers();
        }
    }, [workers]);

    useEffect(() => {
        let result = [...workers];

        if (filters.name) {
            result = result.filter(worker =>
                worker.full_name?.toLowerCase().includes(filters.name.toLowerCase())
            );
        }

        if (filters.minPrice) {
            result = result.filter(worker =>
                worker.expected_rate?.max_rate >= parseFloat(filters.minPrice)
            );
        }

        if (filters.maxPrice) {
            result = result.filter(worker =>
                worker.expected_rate?.max_rate <= parseFloat(filters.maxPrice)
            );
        }

        if (filters.sortBy === 'price_asc') {
            result.sort((a, b) =>
                (a.expected_rate?.max_rate || 0) - (b.expected_rate?.max_rate || 0)
            );
        } else if (filters.sortBy === 'price_desc') {
            result.sort((a, b) =>
                (b.expected_rate?.max_rate || 0) - (a.expected_rate?.max_rate || 0)
            );
        }

        setFilteredWorkers(result);
        setCurrentPage(1);
    }, [filters, workers]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const clearFilters = () => {
        setFilters({
            name: '',
            minPrice: '',
            maxPrice: '',
            sortBy: 'none'
        });
    };

    const renderRequestButton = (worker) => {
        const status = workerStatuses[worker.worker_id];
        
        if (status === 'pending') {
            return (
                <button
                    type="button"
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-yellow-500 cursor-not-allowed"
                    disabled
                >
                    Pending
                </button>
            );
        } else if (status === 'accepted') {
            return (
                <button
                    type="button"
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-green-500 cursor-not-allowed"
                    disabled
                >
                    Accepted
                </button>
            );
        } else if (status === 'rejected') {
            return (
                <button
                    type="button"
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-500 cursor-not-allowed"
                    disabled
                >
                    Rejected
                </button>
            );
        } else {
            return (
                <button 
                    onClick={() => handleShowRequestModal(worker)}
                    type="button"
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                    Request
                </button>
            );
        }
    };

    const indexOfLastWorker = currentPage * workersPerPage;
    const indexOfFirstWorker = indexOfLastWorker - workersPerPage;
    const currentWorkers = filteredWorkers.slice(indexOfFirstWorker, indexOfLastWorker);
    const totalPages = Math.ceil(filteredWorkers.length / workersPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                    <div className="bg-indigo-600 h-2.5 rounded-full animate-pulse" style={{ width: '45%' }}></div>
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
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Available Workers</h2>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
                    >
                        <FiFilter className="mr-2" />
                        Filters
                        {showFilters ? <FiChevronUp className="ml-2" /> : <FiChevronDown className="ml-2" />}
                    </button>
                </div>

                {showFilters && (
                    <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={filters.name}
                                    onChange={handleFilterChange}
                                    placeholder="Search by name"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">
                                    Min Price
                                </label>
                                <input
                                    type="number"
                                    id="minPrice"
                                    name="minPrice"
                                    value={filters.minPrice}
                                    onChange={handleFilterChange}
                                    placeholder="Min price"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
                                    Max Price
                                </label>
                                <input
                                    type="number"
                                    id="maxPrice"
                                    name="maxPrice"
                                    value={filters.maxPrice}
                                    onChange={handleFilterChange}
                                    placeholder="Max price"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">
                                    Sort By
                                </label>
                                <select
                                    id="sortBy"
                                    name="sortBy"
                                    value={filters.sortBy}
                                    onChange={handleFilterChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="none">None</option>
                                    <option value="price_asc">Price: Low to High</option>
                                    <option value="price_desc">Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={clearFilters}
                                className="mr-2 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <FiX className="mr-1" /> Clear Filters
                            </button>
                        </div>
                    </div>
                )}

                <div className="mb-2 flex justify-between items-center">
                    <p className="text-sm text-gray-600">
                        Showing {filteredWorkers.length} workers
                    </p>
                    {filters.name || filters.minPrice || filters.maxPrice || filters.sortBy !== 'none' ? (
                        <p className="text-sm text-gray-600">
                            Filtered from {workers.length} total workers
                        </p>
                    ) : null}
                </div>

                <div className="space-y-3 mb-8">
                    {currentWorkers.length > 0 ? (
                        currentWorkers.map((worker) => (
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
                                        {renderRequestButton(worker)}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No workers found</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Try adjusting your filters to find what you're looking for.
                            </p>
                            <div className="mt-6">
                                <button
                                    onClick={clearFilters}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {isShowRequestModal && (
                    <ClientRequestModal
                        worker={selectedWorker}
                        onClose={handleCloseRequest}
                    />
                )}

                {filteredWorkers.length > workersPerPage && (
                    <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{indexOfFirstWorker + 1}</span> to{' '}
                                    <span className="font-medium">
                                        {Math.min(indexOfLastWorker, filteredWorkers.length)}
                                    </span> of{' '}
                                    <span className="font-medium">{filteredWorkers.length}</span> results
                                </p>
                            </div>
                            <div>
                                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                    <button
                                        onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                                        disabled={currentPage === 1}
                                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                                    >
                                        <span className="sr-only">Previous</span>
                                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                                        </svg>
                                    </button>

                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                                        <button
                                            key={number}
                                            onClick={() => paginate(number)}
                                            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === number ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'}`}
                                        >
                                            {number}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                                        disabled={currentPage === totalPages}
                                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                                    >
                                        <span className="sr-only">Next</span>
                                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l4.5 4.25a.75.75 0 11-1.04 1.06l-3.938-3.71L8.27 14.77a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FindWorkers;