import React, { useState } from 'react';
import axios from 'axios';

function AskJobModal({ isOpen, onClose, request }) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen || !request) return null;

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        client_id: request.client_id,
        category: request.job_titles[0],
        title,
        message
      };

      const response = await axios.post('http://127.0.0.1:8000/api/updateJobRequest', payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      console.log("✅ Sent Successfully:", response.data);
      onClose();
    } catch (error) {
      console.error("❌ Failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">
            Contact Client
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter message title"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              value={message}
              onChange={handleMessageChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Write your message to the client..."
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              disabled={!title.trim() || !message.trim()}
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AskJobModal;