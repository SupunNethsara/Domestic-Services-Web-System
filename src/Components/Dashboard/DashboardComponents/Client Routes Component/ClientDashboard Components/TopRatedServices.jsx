import React, { useState, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import axios from 'axios';
import {
  FaUserAlt,
  FaLeaf,
  FaChild,
  FaBroom,
  FaUtensils,
  FaPaintRoller
} from 'react-icons/fa';


const ServiceIcon = ({ name }) => {
  const iconMap = {
    'Elder Care': FaUserAlt,
    'Gardening': FaLeaf,
    'Child Care': FaChild,
    'Cleaning': FaBroom,
    'Cooking': FaUtensils,
    'Home Painting': FaPaintRoller
  };

  const IconComponent = iconMap[name] || FaUserAlt;

  const iconColor = {
    'Elder Care': 'text-purple-600',
    'Gardening': 'text-green-600',
    'Child Care': 'text-blue-600',
    'Cleaning': 'text-green-500',
    'Cooking': 'text-red-500',
    'Home Painting': 'text-yellow-600'
  }[name] || 'text-gray-600';

  return (
    <div className={`p-2 rounded mr-3 ${iconColor.replace('text', 'bg').replace(/(500|600)/, '50')
      }`}>
      <IconComponent className={`${iconColor} text-md`} />
    </div>
  );
};

function TopRatedServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopServices = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/getTopRatedServices');
        setServices(response.data.top_rated_services || []);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopServices();
  }, []);

  if (loading) return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    </div>
  );

  if (error) return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <p className="text-red-500 text-center py-4">Error loading services: {error}</p>
    </div>
  );

  if (services.length === 0) return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
      <div className="flex justify-center mb-5">
        <svg className="w-16 h-16 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className=" font-medium text-gray-800 mb-2 text-sm">No top-rated services found</h3>
      <p className="text-gray-500 mb-6 text-sm">We couldn't find any services matching your criteria. Try adjusting your filters or check back later.</p>
      <button className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg text-sm font-medium transition-colors">
        Refresh results
      </button>
    </div>
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-md font-semibold text-gray-800 mb-3">Top Rated Services</h3>

      <div className="space-y-3">
        {services.map((service, index) => (
          <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
            <div className="flex items-center">
              <ServiceIcon name={service.name} />
              <div>
                <h4 className="text-sm font-medium text-gray-800">{service.name}</h4>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-gray-500 capitalize">{service.rate_type}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-baseline space-x-1 font-sans">
                <span className="text-sm text-indigo-600/90">{service.currency}</span>
                <span className="text-sm font-medium text-gray-800">{service.rate}</span>
                <span className="text-xs text-gray-500/80">
                  /{service.rate_type === 'hourly' ? 'hr' : service.rate_type}
                </span>
              </div>
              <FiChevronRight className="ml-auto text-gray-400" />
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 w-full py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors">
        View All Services
      </button>
    </div>
  );
}

export default TopRatedServices;