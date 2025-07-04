import React from 'react';
import { Link } from 'react-router-dom';

function RoutingLinksClients({ Dropdownpost, handleScrollPost, countAvailability }) {
  return (
    <div className="h-full  flex flex-col bg-white shadow-sm">
      <div className="flex-grow space-y-0.5 px-2 py-3">
        <div className="relative group mb-1">
          <Link
            to="clienthome"
            className="flex items-center px-2.5 py-2 text-sm font-medium rounded-lg text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors duration-200"
          >
            <div className="p-1 rounded-lg bg-indigo-100 mr-2">
              <svg className="h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span className="font-medium">Dashboard</span>
            <span className="absolute right-4 text-xs font-medium text-indigo-500 bg-white px-2 py-0.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Client View
            </span>
          </Link>
        </div>

        <Link
          to="makeprofile"
          className="flex items-center px-2.5 py-2 text-sm font-medium rounded-lg text-gray-700 hover:text-indigo-700 hover:bg-gray-50 transition-colors duration-200 group"
        >
          <div className="p-1 rounded-lg bg-gray-100 group-hover:bg-indigo-100 mr-2">
            <svg className="h-5 w-5 text-gray-500 group-hover:text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <span>Edit Profile</span>
        </Link>
        <Link
          to="create-job-request"
          className="flex items-center px-2.5 py-2 text-sm font-medium rounded-lg text-gray-700 hover:text-indigo-700 hover:bg-gray-50 transition-colors duration-200 group"
        >
          <div className="p-1 rounded-lg bg-gray-100 group-hover:bg-indigo-100 mr-2">
            <svg className="h-5 w-5 text-gray-500 group-hover:text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <span>Create Job Request</span>
          <span className="ml-auto inline-flex items-center justify-center h-5 w-8 text-xs font-bold text-white bg-green-500 rounded-full transform group-hover:scale-110 transition-transform">
            New
          </span>
        </Link>
        <Link
          to="worker_availability"
          className="flex items-center px-2.5 py-2 text-sm font-medium rounded-lg text-gray-700 hover:text-indigo-700 hover:bg-gray-50 transition-colors duration-200 group relative"
        >
          <div className="p-1 rounded-lg bg-gray-100 group-hover:bg-indigo-100 mr-2">
            <svg className="h-5 w-5 text-gray-500 group-hover:text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <span>Workers Availability</span>
          {countAvailability > 0 && (
            <span className="ml-auto inline-flex items-center justify-center h-5 w-5 text-xs font-bold text-white bg-red-500 rounded-full transform group-hover:scale-110 transition-transform">
              {countAvailability}
            </span>
          )}
        </Link>

        <Link
          to="findworkers"
          className="flex items-center px-2.5 py-2 text-sm font-medium rounded-lg text-gray-700 hover:text-indigo-700 hover:bg-gray-50 transition-colors duration-200 group relative"
        >
          <div className="p-1 rounded-lg bg-gray-100 group-hover:bg-indigo-100 mr-2">
            <svg className="h-5 w-5 text-gray-500 group-hover:text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <span>Find Workers</span>
          {countAvailability > 0 && (
            <span className="ml-auto inline-flex items-center justify-center h-5 w-5 text-xs font-bold text-white bg-red-500 rounded-full transform group-hover:scale-110 transition-transform">
              {countAvailability}
            </span>
          )}
        </Link>

        <button
          onClick={handleScrollPost}
          className="flex items-center px-2.5 py-2 text-sm font-medium rounded-lg text-gray-700 hover:text-indigo-700 hover:bg-gray-50 w-full transition-colors duration-200 group"
        >
          <div className="p-1 rounded-lg bg-gray-100 group-hover:bg-indigo-100 mr-2">
            <svg className="h-5 w-5 text-gray-500 group-hover:text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <span>Create Post</span>
        </button>

        {Dropdownpost && (
          <div className="ml-10 mt-0.5 space-y-0.5">
            <Link
              to="makepost"
              className="block px-2.5 py-1.5 text-sm font-medium rounded-lg text-gray-600 hover:text-indigo-700 hover:bg-gray-50 transition-colors duration-200"
            >
              New Post
            </Link>
          </div>
        )}
      </div>

      <div className="px-3 py-2 border-t border-gray-200 bg-gray-50 rounded-b-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
              Client Dashboard
            </div>
            <div className="text-xs text-gray-500 mt-0.5">
              {new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              })}
            </div>
          </div>
          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
            <svg className="h-4 w-4 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoutingLinksClients;