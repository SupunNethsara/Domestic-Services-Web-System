import React, { useState, useEffect } from 'react';
import { FaMoneyBillWave } from 'react-icons/fa';
import axios from 'axios';

const PaymentsTab = ({ onPaymentClick, worker }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const worker_id = worker?.id || worker?.worker_id || (worker?.rawData && worker?.rawData.worker_id);

  useEffect(() => {
    const client_id = localStorage.getItem('user_id');
    if (!client_id) {
      setError('Client ID not found');
      setLoading(false);
      return;
    }

    const fetchPayments = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/worker-payments/all', {
          params: {
            client_id,
            worker_id
          }
        });
       const paymentData = Array.isArray(response.data)
          ? response.data
          : response.data.payments || [];
        setPayments(paymentData);
      } catch (err) {
        console.error('Error fetching payments:', err);
        setError(err.response?.data?.message || 'Failed to load payment history');
        setPayments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [worker_id]);

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <FaMoneyBillWave className="mr-2 text-indigo-600" />
        Payment History
      </h2>

      {error && (
        <div className="mb-4 text-red-500 text-sm">{error}</div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-400">Loading...</td>
              </tr>
            ) : payments.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-400">No payment history found.</td>
              </tr>
            ) : (
              payments.map((payment, idx) => (
                <tr key={payment.id || idx}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {payment.created_at
                      ? new Date(payment.created_at).toLocaleDateString()
                      : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    LKR{payment.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {payment.method || 'Debit Card'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      payment.status?.toLowerCase() === 'paid'
                        ? 'bg-green-100 text-green-800'
                        : payment.status?.toLowerCase() === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {payment.status
                        ? payment.status.charAt(0).toUpperCase() + payment.status.slice(1)
                        : '-'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <button
          onClick={onPaymentClick}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Make New Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentsTab;