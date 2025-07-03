import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

const JobDetails = ({ job, onPaymentClick }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <FaCalendarAlt className="mr-2 text-indigo-600" />
        Job Details
      </h2>
      <div className="space-y-3">
        <div>
          <strong className="text-gray-700">Job Titles:</strong>
          <p className="text-gray-600 mt-1">
            {job.job_titles?.join(', ')}
          </p>
        </div>
        <div>
          <strong className="text-gray-700">Location:</strong>
          <p className="text-gray-600">{job.location}</p>
        </div>
        <div>
          <strong className="text-gray-700">Salary Range:</strong>
          <p className="text-gray-600">{job.salary_range}</p>
        </div>
        <div>
          <strong className="text-gray-700">Description:</strong>
          <p className="text-gray-600">{job.description}</p>
        </div>
        <div>
          <strong className="text-gray-700">Duration:</strong>
          <p className="text-gray-600">
            {new Date(job.start_date).toLocaleDateString()} to{' '}
            {new Date(job.end_date).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={onPaymentClick}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Make Payment
        </button>
      </div>
    </div>
  );
};

export default JobDetails;