import React, { useState } from 'react';
import { FaCreditCard, FaCashRegister } from 'react-icons/fa';
import { Elements } from '@stripe/react-stripe-js';
import StripePaymentForm from './StripePaymentForm';


const PaymentModal = ({ 
  worker, 
  onClose, 
  stripePromise 
}) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paymentAmount, setPaymentAmount] = useState('');

  return (
    <div style={{ backgroundColor: 'rgb(0,0,0,0.5' }} className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Make Payment</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Amount (LKR)</label>
          <input
            type="number"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Payment Method</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={() => setPaymentMethod('card')}
                className="mr-2"
              />
              <FaCreditCard className="mr-2" />
              Credit/Debit Card
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="bank"
                checked={paymentMethod === 'bank'}
                onChange={() => setPaymentMethod('bank')}
                className="mr-2"
              />
              <FaCashRegister className="mr-2" />
              Bank Transfer
            </label>
          </div>
        </div>
        {paymentMethod === 'card' && (
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
        )}
        {paymentMethod === 'bank' && (
          <div className="text-gray-700 mt-4">
            <p>Bank transfer instructions will be shown here.</p>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;