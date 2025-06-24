import React, { useState } from 'react';
import AvailabilityFormTypes from '../../../../FormTypes/AvailabilityFormTypes';
import axios from 'axios';
import CommonToast from '../../../../Toast/CommonToast';

export default function Availability() {
    const [loading, setLoading] = useState(false);
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = 'info') => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);
        return id;
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    const idlocal = localStorage.getItem('user_id');
    const [formData, setFormData] = useState(AvailabilityFormTypes(idlocal));
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleServiceChange = (index, e) => {
        const { name, value } = e.target;
        const services = [...formData.services];
        services[index][name] = value;
        setFormData(prev => ({ ...prev, services }));
    };

    const handleAddService = () => {
        setFormData(prev => ({
            ...prev,
            services: [...prev.services, { name: '', rate_type: 'hourly', rate: '', currency: 'LKR' }]
        }));
    };

    const handleRemoveService = (index) => {
        const services = formData.services.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, services }));
    };

    const handleTimeChange = (day, field, value) => {
        setFormData(prev => ({
            ...prev,
            weekly_availability: {
                ...prev.weekly_availability,
                [day]: {
                    ...prev.weekly_availability[day],
                    [field]: value
                }
            }
        }));
    };

    const handleLocationChange = (index, value) => {
        const locations = [...formData.locations];
        locations[index] = value;
        setFormData(prev => ({ ...prev, locations }));
    };

    const handleAddLocation = () => {
        setFormData(prev => ({ ...prev, locations: [...prev.locations, ''] }));
    };

    const handleRemoveLocation = (index) => {
        const locations = formData.locations.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, locations }));
    };

   
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post('/api/postAvailability', formData);
      
      if (response.status === 201 || response.status === 200) {
        addToast('Availability submitted successfully!', 'success');
        setFormData(AvailabilityFormTypes(idlocal));
      } else {
        addToast('Something went wrong!', 'error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      addToast('Submission failed!', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
    return (
        <div className="bg-white border rounded-md border-gray-200 p-6 mr-2">
                 <CommonToast toasts={toasts} removeToast={removeToast} />
            <h2 className="text-xl font-semibold mb-1">User Availability</h2>
            <p className="text-sm text-gray-500 mb-5 ">Set your available data</p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Worker ID</label>
                        <input
                            type="text"
                            name="worker_id"
                            disabled
                            value={formData.worker_id}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Services</h3>
                    {formData.services.map((service, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 border border-gray-300 rounded-md">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Service Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={service.name}
                                    onChange={(e) => handleServiceChange(index, e)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Rate Type</label>
                                <select
                                    name="rate_type"
                                    value={service.rate_type}
                                    onChange={(e) => handleServiceChange(index, e)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="hourly">Hourly</option>
                                    <option value="job">Per Job</option>
                                    <option value="daily">Daily</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Rate</label>
                                <input
                                    type="number"
                                    name="rate"
                                    value={service.rate}
                                    onChange={(e) => handleServiceChange(index, e)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                            </div>
                            <div className="flex items-end">
                                <button
                                    type="button"
                                    onClick={() => handleRemoveService(index)}
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddService}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Add Another Service
                    </button>
                </div>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900">Weekly Availability</h3>
                        <p className="text-sm text-gray-500 mt-1">Set your available hours for each day</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {Object.entries(formData.weekly_availability).map(([day, times]) => (
                            <div key={day} className="bg-white rounded-lg shadow-xs border border-gray-200 p-5 hover:shadow-sm transition-all">
                                <div className="flex items-center mb-4">
                                    <span className="w-7 h-7 flex items-center justify-center bg-indigo-100 text-indigo-700 rounded-lg mr-2 font-medium">
                                        {day.charAt(0).toUpperCase()}
                                    </span>
                                    <h4 className="text-base font-medium text-gray-800 capitalize">{day}</h4>
                                </div>

                                <div className="space-y-4">
                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Start time
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="time"
                                                value={times.from}
                                                onChange={(e) => handleTimeChange(day, 'from', e.target.value)}
                                                className="w-full h-10 bg-gray-50 border-2 border-gray-200 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 focus:bg-white outline-none transition-all cursor-pointer"
                                            />
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="6 9 12 15 18 9"></polyline>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            End time
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="time"
                                                value={times.to}
                                                onChange={(e) => handleTimeChange(day, 'to', e.target.value)}
                                                className="w-full h-10 bg-gray-50 border-2 border-gray-200 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 focus:bg-white outline-none transition-all cursor-pointer"
                                            />
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="6 9 12 15 18 9"></polyline>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Service Locations</h3>
                    {formData.locations.map((location, index) => (
                        <div key={index} className="flex items-center gap-2 mb-2">
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => handleLocationChange(index, e.target.value)}
                                className="flex-1 block border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                            {formData.locations.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => handleRemoveLocation(index)}
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddLocation}
                        className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Add Another Location
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Expected Rate Type</label>
                        <select
                            name="rate_type"
                            value={formData.expected_rate.rate_type}
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                expected_rate: { ...prev.expected_rate, rate_type: e.target.value }
                            }))}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="hourly">Hourly</option>
                            <option value="job">Per Job</option>
                            <option value="daily">Daily</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Maximum Rate</label>
                        <input
                            type="number"
                            name="max_rate"
                            value={formData.expected_rate.max_rate}
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                expected_rate: { ...prev.expected_rate, max_rate: e.target.value }
                            }))}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Currency</label>
                        <input
                            type="text"
                            name="currency"
                            value={formData.expected_rate.currency}
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                expected_rate: { ...prev.expected_rate, currency: e.target.value }
                            }))}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            disabled
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Preferences</label>
                    <textarea
                        name="preferences"
                        value={formData.preferences}
                        onChange={handleChange}
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Don't prefer homes with dogs, etc."
                    />
                </div>


                <div onClick={handleSubmit} className="flex justify-end">
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Save Availability
                    </button>
                </div>
            </form>
        </div>
    );
}

