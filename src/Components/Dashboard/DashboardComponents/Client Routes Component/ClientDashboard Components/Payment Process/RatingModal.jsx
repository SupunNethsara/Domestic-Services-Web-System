import React, { useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import axios from 'axios';

const RatingModal = ({ worker, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    setIsSubmitting(true);

    const client_id = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/ratings',
        {
          client_id: client_id,
          worker_id: worker.id,
          rating,
          review
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setSubmissionSuccess(true);

    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit rating');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessConfirm = () => {
    onClose();
  };

  return (
    <div style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        {submissionSuccess ? (
      <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Rating Submitted Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for your feedback.
            </p>
            <button
              onClick={handleSuccessConfirm}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              OK
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Rate {worker?.name || 'Worker'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Rating</label>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="text-2xl mr-1 focus:outline-none"
                      disabled={isSubmitting}
                    >
                      {star <= rating ? (
                        <FaStar className="text-yellow-400" />
                      ) : (
                        <FaRegStar className="text-yellow-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Review (Optional)</label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows="3"
                  disabled={isSubmitting}
                  placeholder="Share your experience with this worker..."
                ></textarea>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Rating'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default RatingModal;