import React, { useState, useEffect } from 'react';
import { FiFilter, FiClock, FiMapPin, FiDollarSign, FiUser, FiCalendar } from 'react-icons/fi';

function AvailabilityWorkers() {
    const [workers, setWorkers] = useState([
    {
      id: 1,
      name: "John Doe",
      location: "Colombo",
      rate: 1500,
      currency: "LKR",
      availability: {
        Monday: { from: "08:00", to: "17:00" },
        Tuesday: { from: "09:00", to: "18:00" }
      },
      services: ["Cleaning", "Gardening"]
    },

  ]);

  const [locationFilter, setLocationFilter] = useState('');
  const [rateFilter, setRateFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);


  const filteredWorkers = workers.filter(worker => {
    const matchesLocation = locationFilter ? worker.location.includes(locationFilter) : true;
    const matchesRate = rateFilter ? worker.rate <= parseInt(rateFilter) : true;
    return matchesLocation && matchesRate;
  });

 
  const locations = [...new Set(workers.map(worker => worker.location))];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkers.map(worker => (
          <div key={worker.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="flex items-start mb-4">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <FiUser className="text-indigo-600" size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{worker.name}</h3>
                  <div className="flex items-center text-gray-500 mt-1">
                    <FiMapPin size={14} className="mr-1" />
                    <span>{worker.location}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <FiDollarSign size={16} className="text-green-500 mr-2" />
                  <span className="text-gray-700">{worker.rate} {worker.currency}/hr</span>
                </div>

                <div className="flex items-center">
                  <FiCalendar size={16} className="text-blue-500 mr-2" />
                  <span className="text-gray-700">
                    {Object.keys(worker.availability).length} days available
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {worker.services.map((service, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedWorker(worker)}
                className="mt-4 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors flex items-center justify-center"
              >
                <FiClock className="mr-2" />
                View Schedule
              </button>
            </div>
          </div>
        ))}
      </div>


      {selectedWorker && (
        <div style={{backgroundColor:'rgba(0,0,0,0.5)'}} className="fixed inset-0 flex items-center justify-center p-4 z-50">
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

              <div className="space-y-4">
                {Object.entries(selectedWorker.availability).map(([day, time]) => (
                  <div key={day} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700 capitalize">{day}</span>
                    <span className="text-gray-600">
                      {time.from} - {time.to}
                    </span>
                  </div>
                ))}
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