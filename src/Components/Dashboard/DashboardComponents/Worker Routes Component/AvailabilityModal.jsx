import React, { useState, useEffect } from 'react';
import AvailabilityFormTypes from '../../../../FormTypes/AvailabilityFormTypes';
import axios from 'axios';
import CommonToast from '../../../../Toast/CommonToast';
import { FaTimes } from 'react-icons/fa';
import WorkerServices from '../../../../FormTypes/WorkerServices';

function AvailabilityModal({ handleModal }) {
    const [loading, setLoading] = useState(false);
    const [toasts, setToasts] = useState([]);
    const idlocal = localStorage.getItem('user_id');
    const [formData, setFormData] = useState(AvailabilityFormTypes(idlocal));
    const [showServiceDropdown, setShowServiceDropdown] = useState(false);
    const [serviceSearchTerm, setServiceSearchTerm] = useState("");
    const [predefinedServices] = useState(WorkerServices);
    const [timeToCopy, setTimeToCopy] = useState({ from: '', to: '' });

    const addToast = (message, type = 'info') => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);
        return id;
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

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

    const handleSelectPredefinedService = (service) => {
        if (!formData.services.some(s => s.name === service.name)) {
            const newService = {
                name: service.name,
                rate_type: 'hourly',
                rate: service.defaultRate,
                currency: 'LKR'
            };
            
            setFormData(prev => ({
                ...prev,
                services: [...prev.services, newService]
            }));
        }
        setShowServiceDropdown(false);
        setServiceSearchTerm("");
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

    const copyTimesToAllDays = () => {
        if (!timeToCopy.from || !timeToCopy.to) return;
        
        const updatedAvailability = {};
        Object.keys(formData.weekly_availability).forEach(day => {
            updatedAvailability[day] = {
                from: timeToCopy.from,
                to: timeToCopy.to
            };
        });
        
        setFormData(prev => ({
            ...prev,
            weekly_availability: updatedAvailability
        }));
        
        addToast('Time range copied to all days!', 'success');
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
            const response = await axios.post('http://127.0.0.1:8000/api/postAvailability', formData);
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
            <div style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} className="fixed inset-0 flex items-center justify-center z-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <>
            <CommonToast toasts={toasts} removeToast={removeToast} />
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-40 p-4">
                <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden">

                    <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gray-50">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">Set Your Availability</h2>
                            <p className="text-sm text-gray-500">Configure when and where you're available to work</p>
                        </div>
                        <button
                            onClick={handleModal}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <FaTimes className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="p-6 overflow-y-auto max-h-[80vh]">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Worker ID</label>
                                    <input
                                        type="text"
                                        name="worker_id"
                                        disabled
                                        value={formData.worker_id}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Services Offered</h3>
                                
                                <div className="relative mb-4">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Search predefined services..."
                                            value={serviceSearchTerm}
                                            onChange={(e) => setServiceSearchTerm(e.target.value)}
                                            onFocus={() => setShowServiceDropdown(true)}
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowServiceDropdown(!showServiceDropdown)}
                                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                        >
                                            Browse
                                        </button>
                                    </div>
                                    
                                    {showServiceDropdown && (
                                        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                                            {predefinedServices
                                                .filter(service => 
                                                    service.name.toLowerCase().includes(serviceSearchTerm.toLowerCase())
                                                )
                                                .map(service => (
                                                    <div
                                                        key={service.id}
                                                        className="px-4 py-2 hover:bg-indigo-50 cursor-pointer flex justify-between items-center"
                                                        onClick={() => handleSelectPredefinedService(service)}
                                                    >
                                                        <span>{service.name}</span>
                                                        <span className="text-sm text-gray-500">{service.defaultRate} LKR/hr</span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )}
                                </div>
                                
                                {formData.services.map((service, index) => (
                                    <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 p-4 bg-white rounded-lg border border-gray-200">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={service.name}
                                                onChange={(e) => handleServiceChange(index, e)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Rate Type</label>
                                            <select
                                                name="rate_type"
                                                value={service.rate_type}
                                                onChange={(e) => handleServiceChange(index, e)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                            >
                                                <option value="hourly">Hourly</option>
                                                <option value="job">Per Job</option>
                                                <option value="daily">Daily</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Rate</label>
                                            <input
                                                type="number"
                                                name="rate"
                                                value={service.rate}
                                                onChange={(e) => handleServiceChange(index, e)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                                            <input
                                                type="text"
                                                value="LKR"
                                                disabled
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                                            />
                                        </div>
                                        <div className="flex items-end">
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveService(index)}
                                                className="w-full py-2 px-3 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={handleAddService}
                                    className="mt-2 w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
                                >
                                    + Add Custom Service
                                </button>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Availability</h3>
                                
                                <div className="mb-4 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                                    <h4 className="text-sm font-medium text-indigo-800 mb-2">Copy to all days</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                                            <input
                                                type="time"
                                                value={timeToCopy.from}
                                                onChange={(e) => setTimeToCopy(prev => ({ ...prev, from: e.target.value }))}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                                            <input
                                                type="time"
                                                value={timeToCopy.to}
                                                onChange={(e) => setTimeToCopy(prev => ({ ...prev, to: e.target.value }))}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                        </div>
                                        <div className="flex items-end">
                                            <button
                                                type="button"
                                                onClick={copyTimesToAllDays}
                                                disabled={!timeToCopy.from || !timeToCopy.to}
                                                className="w-full py-2 px-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white rounded-md transition-colors"
                                            >
                                                Apply to All Days
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {Object.entries(formData.weekly_availability).map(([day, times]) => (
                                        <div key={day} className="bg-white p-4 rounded-lg border border-gray-200">
                                            <div className="flex items-center mb-3">
                                                <div className="w-8 h-8 flex items-center justify-center bg-indigo-100 text-indigo-700 rounded-full mr-2 font-medium">
                                                    {day.charAt(0).toUpperCase()}
                                                </div>
                                                <h4 className="text-base font-medium text-gray-800 capitalize">{day}</h4>
                                            </div>
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                                                    <input
                                                        type="time"
                                                        value={times.from}
                                                        onChange={(e) => handleTimeChange(day, 'from', e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                                                    <input
                                                        type="time"
                                                        value={times.to}
                                                        onChange={(e) => handleTimeChange(day, 'to', e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Service Locations</h3>
                                {formData.locations.map((location, index) => (
                                    <div key={index} className="flex gap-2 mb-2">
                                        <input
                                            type="text"
                                            value={location}
                                            onChange={(e) => handleLocationChange(index, e.target.value)}
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="Enter location"
                                            required
                                        />
                                        {formData.locations.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveLocation(index)}
                                                className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={handleAddLocation}
                                    className="mt-2 w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
                                >
                                    + Add Location
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferences</label>
                                    <textarea
                                        name="preferences"
                                        value={formData.preferences}
                                        onChange={handleChange}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="E.g., No pets, no smoking homes, etc."
                                    />
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Rate Type</label>
                                        <select
                                            name="rate_type"
                                            value={formData.expected_rate.rate_type}
                                            onChange={(e) => setFormData(prev => ({
                                                ...prev,
                                                expected_rate: { ...prev.expected_rate, rate_type: e.target.value }
                                            }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                        >
                                            <option value="hourly">Hourly</option>
                                            <option value="job">Per Job</option>
                                            <option value="daily">Daily</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Rate (LKR)</label>
                                        <input
                                            type="number"
                                            name="max_rate"
                                            value={formData.expected_rate.max_rate}
                                            onChange={(e) => setFormData(prev => ({
                                                ...prev,
                                                expected_rate: { ...prev.expected_rate, max_rate: e.target.value }
                                            }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={handleModal}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
                                >
                                    Save Availability
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AvailabilityModal;