import React from 'react';
import { FaUserCircle, FaStar, FaRegStar } from 'react-icons/fa';

const WorkerProfileHeader = ({ worker, averageRating, reviewCount }) => {
const rating = averageRating !== undefined && averageRating !== null ? Number(averageRating) : Number(worker.rating) || 0;

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <FaUserCircle className="mr-2 text-indigo-600" />
        Worker Profile
      </h2>
      <div className="flex items-start mb-4">
        <div className="mr-4">
          {worker.profileImage ? (
            <img
              src={worker.profileImage}
              alt={worker.name}
              className="w-16 h-16 rounded-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/150';
              }}
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
              <FaUserCircle className="text-3xl" />
            </div>
          )}
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">{worker.name}</h3>
          <div className="flex items-center mt-1">
            {[1, 2, 3, 4, 5].map((star) =>
              star <= Math.round(rating) ? (
                <FaStar key={star} className="text-yellow-400" />
              ) : (
                <FaRegStar key={star} className="text-yellow-400" />
              )
            )}
            <span className="ml-1 text-sm text-gray-600">
              ({rating}{reviewCount !== undefined ? `, ${reviewCount} review${reviewCount === 1 ? '' : 's'}` : ''})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfileHeader;