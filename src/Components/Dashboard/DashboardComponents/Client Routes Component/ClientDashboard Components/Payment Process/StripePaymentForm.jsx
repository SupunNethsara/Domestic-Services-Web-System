import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const StripePaymentForm = ({ workerId, amount, onSuccess, onCancel }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPayment, setCurrentPayment] = useState(null);
    const [pollingAttempts, setPollingAttempts] = useState(0);
    const maxPollingAttempts = 15;
    const pollingInterval = 2000;

    const verifyPaymentStatus = async (paymentId) => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/api/payment-status/${paymentId}`,
                {
                    timeout: 5000,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.status === 'paid') {
                return true;
            }

            if (response.data.status === 'pending' && response.data.stripe_payment_id) {
                try {
                    await axios.post(`http://127.0.0.1:8000/api/manual-verify-payment/${paymentId}`);
                    return true;
                } catch (manualError) {
                    console.error('Manual verification failed:', manualError);
                }
            }

            return false;
        } catch (err) {
            console.error('Payment verification error:', err);
            throw err;
        }
    };

    const pollPaymentStatus = async (paymentId) => {
        let attempts = 0;

        while (attempts < maxPollingAttempts) {
            attempts++;
            setPollingAttempts(attempts);

            try {
                const isPaid = await verifyPaymentStatus(paymentId);
                if (isPaid) return true;
            } catch (err) {
                console.error(`Polling attempt ${attempts} failed:`, err);
            }

            await new Promise(resolve => setTimeout(resolve, pollingInterval));
        }

        throw new Error('Payment verification timeout. Please check your payment history.');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;
        if (!stripe || !elements) {
            setError('Payment system not ready');
            return;
        }

        if (!amount || isNaN(amount) || amount <= 0) {
            setError('Please enter a valid payment amount');
            return;
        }

        setLoading(true);
        setError(null);
        setPollingAttempts(0);

        try {
            const createPaymentResponse = await axios.post(
                'http://127.0.0.1:8000/api/worker-payments',
                {
                    client_id: localStorage.getItem('user_id'),
                    worker_id: workerId,
                    amount: parseFloat(amount)
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );

            const { payment, client_secret } = createPaymentResponse.data;
            setCurrentPayment(payment);

            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: localStorage.getItem('user_name') || 'Customer'
                    }
                }
            });

            if (stripeError) {
                throw new Error(stripeError.message || 'Payment failed');
            }

            switch (paymentIntent.status) {
                case 'succeeded':
                    await pollPaymentStatus(payment.id);
                    onSuccess();
                    break;

                case 'processing':
                    await pollPaymentStatus(payment.id);
                    onSuccess();
                    break;

                case 'requires_action':
                    setError('Payment requires additional authentication - please check your payment method');
                    break;

                default:
                    throw new Error(`Unexpected payment status: ${paymentIntent.status}`);
            }
        } catch (err) {
            setError(err.message || 'Payment processing failed');
            console.error('Payment error:', err);
        } finally {
            setLoading(false);
        }
    };

    const getButtonText = () => {
        if (loading) {
            if (pollingAttempts > 0) {
                return `Verifying (${pollingAttempts}/${maxPollingAttempts})`;
            }
            return 'Processing payment...';
        }
        return 'Pay Now';
    };

    return (
        <div className="payment-form-container">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Card Details</label>
                    <div className="p-3 border rounded-md bg-white">
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                                hidePostalCode: true
                            }}
                        />
                    </div>
                </div>

                {error && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-md">
                        {error}
                        {currentPayment?.id && (
                            <div className="mt-2 text-sm">
                                Payment ID: {currentPayment.id}
                            </div>
                        )}
                    </div>
                )}

                <div className="flex justify-between pt-4">
                    <button
                        type="button"
                        onClick={() => {
                            setError(null);
                            onCancel();
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={`px-6 py-2 rounded-md text-white transition-colors ${
                            loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                        } min-w-[120px] flex justify-center`}
                        disabled={!stripe || loading}
                    >
                        {loading ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {getButtonText()}
                            </span>
                        ) : (
                            getButtonText()
                        )}
                    </button>
                </div>
            </form>

            <div className="mt-6 text-xs text-gray-500">
                <p>Payments are processed securely by Stripe. Your card details are never stored on our servers.</p>
                {currentPayment?.id && (
                    <p className="mt-1">Payment reference: {currentPayment.id}</p>
                )}
            </div>
        </div>
    );
};

export default StripePaymentForm;