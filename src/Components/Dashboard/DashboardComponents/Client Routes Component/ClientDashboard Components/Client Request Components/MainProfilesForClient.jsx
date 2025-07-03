import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { FaUserCircle, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import RatingModal from '../Payment Process/RatingModal';
import PaymentModal from '../Payment Process/PaymentModal';
import PaymentsTab from '../Payment Process/PaymentTab';
import MessagesTabs from '../Payment Process/MessageTabs';
import JobDetails from '../Payment Process/JobDetails';
import WorkerDetails from '../Payment Process/WorkerDetails';
import WorkerProfileHeader from '../Payment Process/WorkerProfileheader';

const stripePromise = loadStripe('pk_test_51RggQdFZkIQXRwTEw3MjdYZgBw8N0dbVkRCKqslwGD4nvqOePi3YYD4ljunfEtRtYVjnEvlVT5cYgCFxOElxBwQM00WmPKAt0B');

function MainProfilesForClient() {
  const [activeTab, setActiveTab] = useState('details');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [worker, setWorker] = useState(null);
  const [clientJob, setClientJob] = useState(null);

  const location = useLocation();
  const { workerId } = useParams();
  const { workerData: locationWorkerData } = location.state || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (locationWorkerData) {
          setWorker(transformWorkerData(locationWorkerData));
        } else if (workerId) {
          const token = localStorage.getItem('token');
          const workerResponse = await axios.get(`http://127.0.0.1:8000/api/workers/${workerId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setWorker(transformWorkerData(workerResponse.data));
        }

        const token = localStorage.getItem('token');
        const jobResponse = await axios.get('http://127.0.0.1:8000/api/getActiveJobs', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (jobResponse.data && jobResponse.data.length > 0) {
          setClientJob(jobResponse.data[0]);
        }

      } catch (err) {
        setError(err.message || 'Failed to load data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [workerId, locationWorkerData]);

  const transformWorkerData = (apiData) => {
    if (!apiData) return null;

    return {
      id: apiData.worker_id || apiData.id,
      name: apiData.full_name || `${apiData.first_name || ''} ${apiData.last_name || ''}`.trim() || 'Unknown Worker',
      profileImage: apiData.profile_image || 'https://via.placeholder.com/150',
      rating: apiData.rating || 4.5,
      skills: apiData.services?.map(service => service.name) || [],
      location: `${apiData.city || 'Unknown City'}, ${apiData.country || 'Unknown Country'}`,
      rate: apiData.expected_rate
        ? `${apiData.expected_rate.currency || 'LKR'} ${apiData.expected_rate.max_rate || '0'}/${apiData.expected_rate.rate_type || 'hourly'}`
        : 'Rate not specified',
      availability: apiData.availability_type === 'weekly'
        ? formatWeeklyAvailability(apiData.weekly_availability)
        : apiData.availability_type || 'Flexible',
      contact: apiData.mobile || apiData.phone || 'Contact not provided',
      bio: apiData.about || apiData.bio || 'No bio provided',
      rawData: apiData
    };
  };

  const formatWeeklyAvailability = (weeklyAvailability) => {
    if (!weeklyAvailability) return 'Not specified';
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days
      .filter(day => weeklyAvailability[day.toLowerCase()])
      .join(', ') || 'Not available';
  };

  const handleRatingSubmit = ({ rating, review }) => {
    console.log(`Submitted rating: ${rating}, review: ${review}`);
    alert(`Thank you for your ${rating} star rating and review!`);
    setShowRatingModal(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading worker profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          <FaExclamationTriangle className="text-4xl mx-auto mb-4" />
          <p>Error loading profile: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!worker) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-gray-600">
          <FaUserCircle className="text-5xl mx-auto mb-4 text-gray-400" />
          <p className="text-xl">Worker not found</p>
          <p className="mt-2">Please try again or contact support</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          {clientJob ? `Service Request #${clientJob.id}` : 'Worker Profile'}
        </h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          {clientJob && (
            <div className="bg-green-100 px-6 py-3 flex items-center justify-between">
              <div className="flex items-center">
                <FaCheckCircle className="text-green-600 mr-2" />
                <span className="font-medium text-green-800">Request Accepted</span>
              </div>
              <div className="text-sm text-green-700">
                {clientJob.start_date && `Started on ${new Date(clientJob.start_date).toLocaleDateString()}`}
              </div>
            </div>
          )}

          <div className="border-b border-gray-200 ml-4">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('details')}
                className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'details' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Details
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'messages' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Messages
              </button>
              {clientJob && (
                <button
                  onClick={() => setActiveTab('payments')}
                  className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'payments' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  Payments
                </button>
              )}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'details' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <WorkerProfileHeader worker={worker} />
                  <WorkerDetails worker={worker} />
                  <div className="mt-6 flex space-x-3">
                    <button
                      onClick={() => setShowRatingModal(true)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                    >
                      Rate Worker
                    </button>
                  </div>
                </div>

                {clientJob && (
                  <JobDetails
                    job={clientJob}
                    onPaymentClick={() => setShowPaymentModal(true)}
                  />
                )}
              </div>
            )}

            {activeTab === 'messages' && (
              <MessagesTabs workerId={worker.id} />
            )}

            {activeTab === 'payments' && clientJob && (
              <PaymentsTab
                job={clientJob}
                worker={worker}
                onPaymentClick={() => setShowPaymentModal(true)}
              />
            )}
          </div>
        </div>
      </div>

      {showPaymentModal && (
        <PaymentModal
          worker={worker}
          job={clientJob}
          onClose={() => setShowPaymentModal(false)}
          stripePromise={stripePromise}
        />
      )}

      {showRatingModal && (
        <RatingModal
          worker={worker}
          onClose={() => setShowRatingModal(false)}
          onSubmit={handleRatingSubmit}
        />
      )}
    </div>
  );
}

export default MainProfilesForClient;