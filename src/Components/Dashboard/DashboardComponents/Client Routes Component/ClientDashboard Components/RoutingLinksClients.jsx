import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function RoutingLinksClients({ Dropdownpost, handleScrollPost, countAvailability }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="h-[90vh] flex flex-col bg-gradient-to-b from-white to-gray-50 shadow-lg rounded-xl overflow-hidden">
      <div className="flex-grow space-y-1 p-3">
        <div
          className="relative group mb-2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Link
            to="clienthome"
            className="flex items-center px-3 py-3 text-sm font-medium rounded-xl text-indigo-700 bg-gradient-to-r from-indigo-50 to-indigo-100 hover:from-indigo-100 hover:to-indigo-200 transition-all duration-300 shadow-sm"
          >
            <div className="p-1.5 rounded-lg bg-white shadow-sm mr-3">
              <svg className="h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span className="font-semibold">Dashboard</span>
            <span className={`absolute right-4 text-xs font-medium text-indigo-500 bg-white px-2 py-1 rounded-full shadow-sm transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}>
              Client View
            </span>
          </Link>
        </div>
        <Link
          to="makeprofile"
          className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:text-indigo-700 hover:bg-gray-50 transition-all duration-200 group transform hover:-translate-y-0.5"
        >
          <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-indigo-100 group-hover:scale-110 transition-all duration-200 mr-3">
            <svg className="h-5 w-5 text-gray-500 group-hover:text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <span>Edit Profile</span>
        </Link>

        <Link
          to="create-job-request"
          className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:text-indigo-700 hover:bg-gray-50 transition-all duration-200 group transform hover:-translate-y-0.5"
        >
          <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-indigo-100 group-hover:scale-110 transition-all duration-200 mr-3">
            <svg className="h-5 w-5 text-gray-500 group-hover:text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <span>Create Job Request</span>
          <span className="ml-auto inline-flex items-center justify-center h-5 w-8 text-xs font-bold text-white bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transform group-hover:scale-110 transition-transform shadow-sm">
            New
          </span>
        </Link>

        <Link
          to="worker_availability"
          className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:text-indigo-700 hover:bg-gray-50 transition-all duration-200 group transform hover:-translate-y-0.5 relative"
        >
          <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-indigo-100 group-hover:scale-110 transition-all duration-200 mr-3">
            <svg className="h-5 w-5 text-gray-500 group-hover:text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <span>Workers Availability</span>
          {countAvailability > 0 && (
            <span className="ml-auto inline-flex items-center justify-center h-5 w-5 text-xs font-bold text-white bg-gradient-to-r from-red-500 to-rose-500 rounded-full transform group-hover:scale-110 transition-transform shadow-sm">
              {countAvailability}
            </span>
          )}
        </Link>

        <Link
          to="findworkers"
          className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:text-indigo-700 hover:bg-gray-50 transition-all duration-200 group transform hover:-translate-y-0.5 relative"
        >
          <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-indigo-100 group-hover:scale-110 transition-all duration-200 mr-3">
            <svg
              className="h-5 w-5 text-gray-500 group-hover:text-indigo-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <span>Make Request to Users</span>
          {countAvailability > 0 && (
            <span className="ml-auto inline-flex items-center justify-center h-5 w-5 text-xs font-bold text-white bg-gradient-to-r from-red-500 to-rose-500 rounded-full transform group-hover:scale-110 transition-transform shadow-sm">
              {countAvailability}
            </span>
          )}
        </Link>
        <Link
          to=""
          className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:text-indigo-700 hover:bg-gray-50 transition-all duration-200 group transform hover:-translate-y-0.5 relative"
        >
          <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-indigo-100 group-hover:scale-110 transition-all duration-200 mr-3">
            <svg
              className="h-5 w-5 text-gray-500 group-hover:text-indigo-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
              />
            </svg>
          </div>
          <span>Worker Responses</span>

        </Link>

      </div>

      <div className="px-4 py-3 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-b-xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider flex items-center">
              <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"></path>
              </svg>
              Client Dashboard
            </div>
            <div className="text-xs text-gray-500 mt-1 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              {new Date().toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              })}
            </div>
          </div>
          <div className="h-9 w-9 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center shadow-sm">
            <svg className="h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoutingLinksClients;