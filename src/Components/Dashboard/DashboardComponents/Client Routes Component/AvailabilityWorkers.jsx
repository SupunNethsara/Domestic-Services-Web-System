import React, { useState, useEffect } from 'react';
import { FiFilter, FiClock, FiLink, FiMapPin, FiDollarSign, FiUser, FiCalendar, FiList } from 'react-icons/fi';
import axios from 'axios';
import WorkersDetailsSection from './ClientDashboard Components/Chat Service/WorkersDetailsSection';

function AvailabilityWorkers() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locationFilter, setLocationFilter] = useState('');
  const [rateFilter, setRateFilter] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const[selectWorkerModal , setSelectedWorkerModal] = useState(null);
  const [servicesModal, setServicesModal] = useState({
    open: false,
    worker: null
  });
  const [isChatModal, setIsChatModal] = useState(false);
  const handleChatModalOpenClose = (worker = null) => {
    setSelectedWorkerModal(worker);
    setIsChatModal(!isChatModal);
  };

  const fetchWorkers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/getAvailabilitytoClients');
      setWorkers(response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  const filteredWorkers = workers.filter(worker => {
    const matchesLocation = locationFilter
      ? worker.locations.some(loc => loc.toLowerCase().includes(locationFilter.toLowerCase()))
      : true;

    const matchesRate = rateFilter
      ? worker.services.some(service => service.rate <= parseInt(rateFilter))
      : true;

    return matchesLocation && matchesRate;
  });

  const locations = [...new Set(workers.flatMap(worker => worker.locations))];

  const openServicesModal = (worker) => {
    setServicesModal({
      open: true,
      worker: worker
    });
  };

  const closeServicesModal = () => {
    setServicesModal({
      open: false,
      worker: null
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
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
            <p className="text-sm text-red-700">Error loading workers: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Available Workers</h2>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
          >
            <FiFilter className="mr-2" />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FiMapPin className="mr-2" />
                Location
              </label>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FiDollarSign className="mr-2" />
                Max Rate (LKR)
              </label>
              <input
                type="number"
                value={rateFilter}
                onChange={(e) => setRateFilter(e.target.value)}
                placeholder="Enter max rate"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        )}
      </div>

      {filteredWorkers.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">No workers found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkers.map(worker => (
            <div key={worker.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-5">
                <div className="flex items-start mb-4">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4">
                    {worker.profile_image ? (
                      <img
                        src={worker.profile_image}
                        alt={worker.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <FiUser className="text-indigo-600" size={20} />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{worker.name}</h3>
                    <div className="flex items-center text-gray-500 mt-1">
                      <FiMapPin size={14} className="mr-1" />
                      <span>{worker.locations.join(', ')}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-500">Services:</p>
                    <button
                      onClick={() => openServicesModal(worker)}
                      className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                      <FiList className="mr-1" size={16} />
                      <span className="text-sm">View Services</span>
                    </button>
                  </div>

                  <div className="flex items-center">
                    <FiCalendar size={16} className="text-blue-500 mr-2" />
                    <span className="text-gray-700">
                      {Object.keys(worker.weekly_availability).length} days available
                    </span>
                  </div>

                  {worker.preferences && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-500">Preferences:</p>
                      <p className="text-sm text-gray-700">{worker.preferences}</p>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setSelectedWorker(worker)}
                  className="mt-4 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-xs text-white rounded-md transition-colors flex items-center justify-center"
                >
                  <FiClock className="mr-2" />
                  View Schedule
                </button>
                <button
                  onClick={() => handleChatModalOpenClose(worker)}
                  className="mt-4 w-full py-2 bg-green-600 hover:bg-green-700 text-xs text-white rounded-md transition-colors flex items-center justify-center"
                >
                  <FiLink className="mr-2" />
                  Connect
                </button>
                {isChatModal && (
                  <WorkersDetailsSection
                    handelChatModalOpenClose={handleChatModalOpenClose}
                 workerData={selectWorkerModal}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}


      {servicesModal.open && (
        <div style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} className="fixed inset-0 flex items-center justify-center p-4 z-50 ">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  {servicesModal.worker?.name}'s Services
                </h3>
                <button
                  onClick={closeServicesModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Services & Rates:</h4>
                <ul className="space-y-3">
                  {servicesModal.worker?.services.map((service, index) => (
                    <li key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">{service.name}</p>
                        {service.description && (
                          <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                        )}
                      </div>
                      <span className="font-semibold text-indigo-600">
                        {service.rate} {service.currency}/{service.rate_type}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={closeServicesModal}
                className="mt-6 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}


      {selectedWorker && (
        <div style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} className="fixed inset-0 flex items-center justify-center p-4 z-50 ">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">{selectedWorker.name}'s Schedule</h3>
                <button
                  onClick={() => setSelectedWorker(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Availability:</h4>
                <div className="space-y-2">
                  {Object.entries(selectedWorker.weekly_availability).map(([day, time]) => (
                    <div key={day} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-700 capitalize">{day}</span>
                      <span className="text-gray-600">
                        {time.from} - {time.to}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedWorker(null)}
                className="mt-6 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AvailabilityWorkers;