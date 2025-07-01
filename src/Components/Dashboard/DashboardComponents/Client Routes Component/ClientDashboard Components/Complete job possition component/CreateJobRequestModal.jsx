import axios from 'axios';
import React, { useState } from 'react';

const predefinedJobCategories = [
    'House Cleaning',
    'Gardening',
    'Child Care',
    'Elderly Care',
    'Pet Care',
    'Tutoring',
    'Handyman Services',
    'Cooking',
    'Driving'
];

const salaryRanges = [
    'LKR 20,000 - 40,000',
    'LKR 40,000 - 60,000',
    'LKR 60,000 - 80,000',
    'LKR 80,000 - 100,000',
    'LKR 100,000+',
    'Negotiable'
];

const CreateJobRequestModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        jobTitles: [],
        customJobTitle: '',
        location: '',
        salaryRange: '',
        description: '',
        startDate: '',
        endDate: '',
        jobType: 'one-time',
        frequency: '',
        hasTransportation: false,
        backgroundCheck: false,
        interviewRequired: false
    });

    const [showCustomJobInput, setShowCustomJobInput] = useState(false);
    const [customJobInput, setCustomJobInput] = useState('');
    const [jobCategories, setJobCategories] = useState(predefinedJobCategories);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleJobSelection = (category) => {
        setFormData(prev => {
            if (prev.jobTitles.includes(category)) {
                return {
                    ...prev,
                    jobTitles: prev.jobTitles.filter(item => item !== category)
                };
            }
            return {
                ...prev,
                jobTitles: [...prev.jobTitles, category]
            };
        });
    };

const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.jobTitles.length === 0) {
        alert('Please select at least one job category');
        return;
    }
    try {
        const token = localStorage.getItem('token');
        console.log('Token:', token);
        
        const response = await axios.post(
            'http://127.0.0.1:8000/api/ClientStoreRequest', 
            formData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        
        console.log('Job request created:', response.data);
        alert('Job request created successfully!');
        onClose();
    } catch (error) {
        console.error('Error submitting job request:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        }
        alert(`Error creating job request: ${error.response?.data?.message || error.message}`);
    }
};

    const handleAddCustomJob = () => {
        if (customJobInput.trim() && !jobCategories.includes(customJobInput)) {
            setJobCategories([...jobCategories, customJobInput]);
            handleJobSelection(customJobInput);
            setCustomJobInput('');
            setShowCustomJobInput(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-2xl">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Create New Job Request</h2>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-indigo-700 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Categories (Select one or more) <span className="text-red-500">*</span>
                    </label>

                    <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                            {jobCategories.map((category) => (
                                <button
                                    type="button"
                                    key={category}
                                    onClick={() => handleJobSelection(category)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${formData.jobTitles.includes(category)
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                        }`}
                                >
                                    {category}
                                    {formData.jobTitles.includes(category) && (
                                        <span className="ml-1">✓</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {!showCustomJobInput ? (
                        <button
                            type="button"
                            onClick={() => setShowCustomJobInput(true)}
                            className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                        >
                            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add Custom Job Category
                        </button>
                    ) : (
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={customJobInput}
                                onChange={(e) => setCustomJobInput(e.target.value)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter custom job category"
                            />
                            <button
                                type="button"
                                onClick={handleAddCustomJob}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                Add
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowCustomJobInput(false);
                                    setCustomJobInput('');
                                }}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    )}

                    {formData.jobTitles.length > 0 && (
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Additional Job Description (Optional)
                            </label>
                            <input
                                type="text"
                                name="customJobTitle"
                                value={formData.customJobTitle}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Add more details about the jobs you need"
                            />
                        </div>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Location <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pl-10"
                            placeholder="Enter city or address"
                            required
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Monthly Salary Range <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <select
                                name="salaryRange"
                                value={formData.salaryRange}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white"
                                required
                            >
                                <option value="">Select salary range</option>
                                {salaryRanges.map((range) => (
                                    <option key={range} value={range}>{range}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Job Type <span className="text-red-500">*</span>
                        </label>
                        <div className="flex space-x-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="jobType"
                                    value="one-time"
                                    checked={formData.jobType === 'one-time'}
                                    onChange={handleChange}
                                    className="h-5 w-5 text-indigo-600 focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-gray-700">One-time</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="jobType"
                                    value="recurring"
                                    checked={formData.jobType === 'recurring'}
                                    onChange={handleChange}
                                    className="h-5 w-5 text-indigo-600 focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-gray-700">Recurring</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Start Date <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {formData.jobType === 'one-time' ? 'End Date' : 'Expected Duration'}
                        </label>
                        <div className="relative">
                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                min={formData.startDate || new Date().toISOString().split('T')[0]}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
                                disabled={formData.jobType === 'recurring' && !formData.frequency}
                            />
                        </div>
                    </div>
                </div>

                {formData.jobType === 'recurring' && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Frequency <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <select
                                name="frequency"
                                value={formData.frequency}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white"
                                required
                            >
                                <option value="">Select frequency</option>
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="bi-weekly">Bi-weekly</option>
                                <option value="monthly">Monthly</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Detailed Job Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Describe the job responsibilities, requirements, and any special instructions"
                        required
                    />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Preferences
                    </label>
                    <div className="space-y-3">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="hasTransportation"
                                checked={formData.hasTransportation}
                                onChange={handleChange}
                                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 rounded"
                            />
                            <span className="ml-2 text-gray-700">Worker must have own transportation</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="backgroundCheck"
                                checked={formData.backgroundCheck}
                                onChange={handleChange}
                                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 rounded"
                            />
                            <span className="ml-2 text-gray-700">Background check required</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="interviewRequired"
                                checked={formData.interviewRequired}
                                onChange={handleChange}
                                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 rounded"
                            />
                            <span className="ml-2 text-gray-700">Interview required</span>
                        </div>
                    </div>
                </div>

                {formData.jobTitles.length > 0 && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-blue-800 mb-2">Selected Jobs:</h3>
                        <div className="flex flex-wrap gap-2">
                            {formData.jobTitles.map((job) => (
                                <span key={job} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                    {job}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                        Post Job Request
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateJobRequestModal;