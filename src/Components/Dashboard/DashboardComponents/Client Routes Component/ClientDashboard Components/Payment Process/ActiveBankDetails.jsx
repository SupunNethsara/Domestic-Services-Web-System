import React from 'react';
import { FiEdit2, FiTrash2, FiCopy, FiEye, FiEyeOff } from 'react-icons/fi';

function ActiveBankDetails({ bankdetails, onEdit, onRemove }) {
    const [showFullAccountNumber, setShowFullAccountNumber] = React.useState(false);

    const toggleAccountNumberVisibility = () => {
        setShowFullAccountNumber(!showFullAccountNumber);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    if (!bankdetails) return null;

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-5 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-base font-medium text-gray-800">{bankdetails.bank_name}</h3>
                        {bankdetails.branch_name && (
                            <p className="text-sm text-gray-500 mt-1">{bankdetails.branch_name}</p>
                        )}
                    </div>
                    <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {bankdetails.account_type === 'checking' ? 'Checking' : 'Savings'}
                    </span>
                </div>
            </div>

            <div className="p-5">
                <div className="space-y-4">
                    <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Account Holder</p>
                        <p className="text-base font-medium text-gray-800 mt-1">{bankdetails.account_holder_name}</p>
                    </div>

                    <div>
                        <div className="flex justify-between items-center">
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Account Number</p>
                            <div className="flex space-x-2">
                                <button
                                    onClick={toggleAccountNumberVisibility}
                                    className="text-gray-400 hover:text-blue-600 transition-colors"
                                    aria-label={showFullAccountNumber ? 'Hide account number' : 'Show account number'}
                                >
                                    {showFullAccountNumber ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                                </button>
                                <button
                                    onClick={() => copyToClipboard(bankdetails.account_number)}
                                    className="text-gray-400 hover:text-blue-600 transition-colors"
                                    aria-label="Copy to clipboard"
                                >
                                    <FiCopy size={14} />
                                </button>
                            </div>
                        </div>
                        <div className="mt-1">
                            <p className="text-base font-mono text-gray-800 bg-gray-50 px-3 py-2 rounded-md">
                                {showFullAccountNumber
                                    ? bankdetails.account_number
                                    : `•••• •••• •••• ${bankdetails.account_number.slice(-4)}`}
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Branch Code</p>
                            <p className="text-base font-medium text-gray-800 mt-1">{bankdetails.branch_code}</p>
                        </div>
                        {bankdetails.branch_name && (
                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Branch Name</p>
                                <p className="text-base font-medium text-gray-800 mt-1">{bankdetails.branch_name}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end space-x-3">
                    <button
                        onClick={onRemove}
                        className="flex items-center space-x-2 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                        <FiTrash2 size={14} />
                        <span>Remove</span>
                    </button>
                    <button
                        onClick={onEdit}
                        className="flex items-center space-x-2 px-3 py-1.5 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors"
                    >
                        <FiEdit2 size={14} />
                        <span>Edit</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ActiveBankDetails;