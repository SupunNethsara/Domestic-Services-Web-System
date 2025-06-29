import React, { useState } from 'react';
import { FiX, FiCalendar, FiMessageSquare, FiUser, FiTool } from 'react-icons/fi';

function ClientRequestModal({ worker, onClose }) {
    const [requestData, setRequestData] = useState({
        message: '',
        requestedDate: '',
        specialRequirements: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRequestData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
           
            console.log('Submitting request:', { worker, requestData });
          
            await new Promise(resolve => setTimeout(resolve, 1000));
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ backgroundColor: 'rgb(0,0,0,0.5)' }} className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl w-full max-w-md overflow-hidden shadow-2xl border border-indigo-100">
                <div className="flex justify-between items-center border-b border-indigo-200 p-5 bg-white">
                    <div>
                        <h3 className="text-xl font-bold text-indigo-800">Request Service</h3>
                        <p className="text-sm text-indigo-600">Request {worker?.full_name}'s service</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="text-indigo-500 hover:text-indigo-700 transition-colors p-1 rounded-full hover:bg-indigo-100"
                    >
                        <FiX size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                    {error && (
                        <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm flex items-center">
                            <FiX className="mr-2" size={16} />
                            {error}
                        </div>
                    )}

                    <div className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm">
                        <label className="block text-sm font-medium text-indigo-700 mb-2 flex items-center">
                            <FiCalendar className="mr-2 text-indigo-500" />
                            Service Date & Time
                        </label>
                        <input
                            type="datetime-local"
                            name="requestedDate"
                            value={requestData.requestedDate}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300"
                            required
                            min={new Date().toISOString().slice(0, 16)}
                        />
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm">
                        <label className="block text-sm font-medium text-indigo-700 mb-2 flex items-center">
                            <FiMessageSquare className="mr-2 text-indigo-500" />
                            Message (Optional)
                        </label>
                        <textarea
                            name="message"
                            value={requestData.message}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300"
                            placeholder="Tell the worker about your specific needs..."
                        />
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm">
                        <label className="block text-sm font-medium text-indigo-700 mb-2 flex items-center">
                            <FiTool className="mr-2 text-indigo-500" />
                            Special Requirements
                        </label>
                        <input
                            type="text"
                            name="specialRequirements"
                            value={requestData.specialRequirements}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300"
                            placeholder="Any tools or materials needed..."
                        />
                    </div>

                    <div className="flex justify-end space-x-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 border border-indigo-300 rounded-lg text-indigo-700 bg-white hover:bg-indigo-50 transition-colors font-medium"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-600 text-white rounded-lg hover:from-green-700 hover:to-green-700 transition-colors font-medium shadow-md disabled:opacity-70"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Sending...
                                </span>
                            ) : 'Send Request'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ClientRequestModal;