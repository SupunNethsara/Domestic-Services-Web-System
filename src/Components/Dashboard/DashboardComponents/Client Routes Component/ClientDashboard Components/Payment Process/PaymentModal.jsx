import React, { useState, useEffect } from 'react';
import { FaCreditCard, FaCashRegister, FaCopy, FaCheck } from 'react-icons/fa';
import { Elements } from '@stripe/react-stripe-js';
import StripePaymentForm from './StripePaymentForm';
import axios from 'axios';

const PaymentModal = ({ worker, onClose, stripePromise }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [bankDetails, setBankDetails] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const worker_id = worker?.id;
        const response = await axios.get(`http://127.0.0.1:8000/api/workers-bank-details/${worker_id}`);
        setBankDetails(response.data);
      } catch (error) {
        console.log('No bank details found');
      }
    };

    if (worker?.id) {
      fetchBankDetails();
    }
  }, [worker]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatAccountNumber = (accountNumber) => {
    if (!accountNumber) return '';
    const visibleDigits = 4;
    const masked = '•'.repeat(accountNumber.length - visibleDigits);
    return `${masked}${accountNumber.slice(-visibleDigits)}`;
  };

  return (
    <div style={{ backgroundColor: 'rgb(0,0,0,0.5' }} className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Make Payment</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Amount (LKR)</label>
          <input
            type="number"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter amount"
            required
            min="1"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Payment Method</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setPaymentMethod('card')}
              className={`flex items-center justify-center p-3 rounded-md border ${paymentMethod === 'card' ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-300 hover:bg-gray-50'}`}
            >
              <FaCreditCard className="mr-2" />
              Card
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod('bank')}
              className={`flex items-center justify-center p-3 rounded-md border ${paymentMethod === 'bank' ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-300 hover:bg-gray-50'}`}
            >
              <FaCashRegister className="mr-2" />
              Bank Transfer
            </button>
          </div>
        </div>

        {paymentMethod === 'card' ? (
          <Elements stripe={stripePromise}>
            <StripePaymentForm
              workerId={worker?.id}
              amount={paymentAmount}
              onSuccess={() => {
                onClose();
                setPaymentAmount('');
                alert('Payment successful!');
              }}
              onCancel={onClose}
            />
          </Elements>
        ) : (
          <div className="mt-4">
            {bankDetails ? (
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium text-gray-800 mb-3">Bank Transfer Details</h3>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Bank Name</p>
                    <p className="font-medium">{bankDetails.bank_name}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Account Holder</p>
                    <p className="font-medium">{bankDetails.account_holder_name}</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500">Account Number</p>
                      <button
                        onClick={() => copyToClipboard(bankDetails.account_number)}
                        className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm"
                      >
                        {copied ? <FaCheck className="mr-1" /> : <FaCopy className="mr-1" />}
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <p className="font-mono bg-white p-2 rounded mt-1">
                      {formatAccountNumber(bankDetails.account_number)}
                    </p>
                  </div>

                  {bankDetails.branch_code && (
                    <div>
                      <p className="text-sm text-gray-500">Branch Code</p>
                      <p className="font-medium">{bankDetails.branch_code}</p>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    Please include the payment reference: <strong>PAY-{String(worker?.id).slice(0, 6)}</strong>
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                <p>No bank details available for this worker.</p>
                <p className="mt-1 text-sm">Please use another payment method.</p>
              </div>
            )}

            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;