import React, { useState, useEffect } from 'react';
import { FiPlus, FiX, FiEdit2, FiTrash2 } from 'react-icons/fi';
import NotBankDetails from './NotBankDetails';
import axios from 'axios';
import ActiveBankDetails from './ActiveBankDetails';

function AddBankDetails() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bankDetails, setBankDetails] = useState(null);
    const [formData, setFormData] = useState({
        account_holder_name: '',
        account_number: '',
        bank_name: '',
        branch_name: '',
        branch_code: '',
        account_type: 'checking'
    });

    useEffect(() => {
        const fetchBankDetails = async () => {
            try {
                const userId = localStorage.getItem('user_id');
                const response = await axios.get(`http://127.0.0.1:8000/api/workers-bank-details/${userId}`);
                setBankDetails(response.data);
            } catch (error) {
                console.log('No bank details found');
            }
        };

        fetchBankDetails();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem('user_id');
            const response = await axios.post('http://127.0.0.1:8000/api/workers-bank-details', {
                worker_id: userId,
                ...formData
            });

            setBankDetails(response.data);
            setIsModalOpen(false);
            setFormData({
                account_holder_name: '',
                account_number: '',
                bank_name: '',
                branch_code: '',
                account_type: 'checking'
            });
        } catch (error) {
            console.error('Error:', error.response?.data?.message || error.message);
            alert(error.response?.data?.message || 'Failed to save bank details');
        }
    };

    const handleRemoveDetails = async () => {
        try {
            const userId = localStorage.getItem('user_id');
            await axios.delete(`http://127.0.0.1:8000/api/workers-bank-details/${userId}`);
            setBankDetails(null);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to remove bank details');
        }
    };

    const handleEditDetails = () => {
        if (bankDetails) {
            setFormData({
                account_holder_name: bankDetails.account_holder_name,
                account_number: bankDetails.account_number,
                bank_name: bankDetails.bank_name,
                branch_name: bankDetails.branch_name,
                branch_code: bankDetails.branch_code,
                account_type: bankDetails.account_type
            });
            setIsModalOpen(true);
        }
    };

    return (
        <div className='bg-white p-6 max-w-full shadow-md rounded-lg'>
            <div className='flex items-center justify-between border-b border-gray-200 pb-4 mb-4'>
                <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">Bank Details</h1>
                        <p className="text-sm text-gray-500 mt-1">Manage your payment information</p>
                    </div>
                </div>
                {!bankDetails ? (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className='flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200'
                    >
                        <FiPlus className="text-lg" />
                        <span>Add Bank Details</span>
                    </button>
                ) : (
                    <div className="flex space-x-3">

                    </div>
                )}
            </div>
            {!bankDetails ? (
                <NotBankDetails />
            ) : (
                <ActiveBankDetails
                    bankdetails={bankDetails}
                    onEdit={handleEditDetails}
                    onRemove={handleRemoveDetails}
                />
            )}

            {isModalOpen && (
                <div
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                    className="fixed inset-0 flex items-center justify-center p-4 z-50"
                >
                    <div className="bg-white rounded-lg w-full max-w-md shadow-xl">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {bankDetails ? 'Edit Bank Details' : 'Add Bank Details'}
                                </h3>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    <FiX className="text-xl" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Account Holder Name
                                        </label>
                                        <input
                                            type="text"
                                            name="account_holder_name"
                                            value={formData.account_holder_name}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            required
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Account Number
                                        </label>
                                        <input
                                            type="text"
                                            name="account_number"
                                            value={formData.account_number}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            required
                                            placeholder="1234567890"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Bank Name
                                        </label>
                                        <input
                                            type="text"
                                            name="bank_name"
                                            value={formData.bank_name}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            required
                                            placeholder="Example Bank"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Branch Name
                                        </label>
                                        <input
                                            type="text"
                                            name="branch_name"
                                            value={formData.branch_name}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            required
                                            placeholder="Example Branch"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Branch Code
                                        </label>
                                        <input
                                            type="text"
                                            name="branch_code"
                                            value={formData.branch_code}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            required
                                            placeholder="BR123"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Account Type
                                        </label>
                                        <select
                                            name="account_type"
                                            value={formData.account_type}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        >
                                            <option value="checking">Checking Account</option>
                                            <option value="savings">Savings Account</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                                    >
                                        {bankDetails ? 'Update Details' : 'Save Details'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddBankDetails;