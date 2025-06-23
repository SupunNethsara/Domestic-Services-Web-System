import React, { useState } from 'react';

function Availability() {
  const idlocal = localStorage.getItem('user_id');
  const [formData, setFormData] = useState({
        worker_id: idlocal,
        name: '',
        services: [{ name: '', rate_type: 'hourly', rate: '', currency: 'LKR' }],
        availability_type: 'weekly',
        weekly_availability: {
            monday: { from: '', to: '' },
            tuesday: { from: '', to: '' },
            wednesday: { from: '', to: '' },
            thursday: { from: '', to: '' },
            friday: { from: '', to: '' },
            saturday: { from: '', to: '' },
            sunday: { from: '', to: '' }
        },
        locations: [''],
        coordinates: { lat: '', lng: '' },
        preferences: '',
        expected_rate: {
            rate_type: 'hourly',
            max_rate: '',
            currency: 'LKR'
        }
    });

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
       
};

    return (
        <div className="bg-white border rounded-md border-gray-200 p-6 mr-2">
            <h2 className="text-xl font-semibold mb-4">Availability</h2>

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
                <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Weekly Availability</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Object.entries(formData.weekly_availability).map(([day, times]) => (
                            <div key={day} className="border border-gray-300 rounded-md p-4">
                                <h4 className="text-sm font-medium text-gray-900 capitalize mb-2">{day}</h4>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500">From</label>
                                        <input
                                            type="time"
                                            value={times.from}
                                            onChange={(e) => handleTimeChange(day, 'from', e.target.value)}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500">To</label>
                                        <input
                                            type="time"
                                            value={times.to}
                                            onChange={(e) => handleTimeChange(day, 'to', e.target.value)}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        />
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

export default Availability;