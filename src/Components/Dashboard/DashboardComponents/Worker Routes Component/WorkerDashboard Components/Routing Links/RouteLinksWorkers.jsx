import React from 'react';
import { Link } from 'react-router-dom';

function RouteLinksWorkers({ handleScrollPost, Dropdownpost }) {
  return (
    <div className="hidden sm:block xl:flex-shrink-0 xl:w-84 xl:border-r xl:border-gray-200 m-2 bg-white h-full">

      <div className="flex-grow space-y-1 px-2 py-4">
<div className="relative group mb-2">
          <Link 
            to="workerhome" 
            className="flex items-center px-3 py-3 text-sm font-medium rounded-lg text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors duration-200"
          >
            <div className="p-1.5 rounded-lg bg-indigo-100 mr-3">
              <svg className="h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span className="font-medium">Dashboard</span>
            <span className="absolute right-4 text-xs font-medium text-indigo-500 bg-white px-2 py-0.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Worker View
            </span>
          </Link>
        </div>

    <Link 
          to="makeworkerprofile" 
          className="flex items-center px-3 py-3 text-sm font-medium rounded-lg text-gray-700 hover:text-indigo-700 hover:bg-gray-50 transition-colors duration-200 group"
        >
          <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-indigo-100 mr-3">
            <svg className="h-5 w-5 text-gray-500 group-hover:text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <span>My Profile</span>
        </Link>

   
        <Link 
          to="workeravailability" 
          className="flex items-center px-3 py-3 text-sm font-medium rounded-lg text-gray-700 hover:text-indigo-700 hover:bg-gray-50 transition-colors duration-200 group"
        >
          <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-indigo-100 mr-3">
            <svg className="h-5 w-5 text-gray-500 group-hover:text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span>Availability</span>
        </Link>

    <Link 
          to="clientreqesting" 
          className="flex items-center px-3 py-3 text-sm font-medium rounded-lg text-gray-700 hover:text-indigo-700 hover:bg-gray-50 transition-colors duration-200 group relative"
        >
          <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-indigo-100 mr-3">
            <svg className="h-5 w-5 text-gray-500 group-hover:text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <span>My Requests</span>
          <span className="ml-auto inline-flex items-center justify-center h-5 w-5 text-xs font-bold text-white bg-red-500 rounded-full transform group-hover:scale-110 transition-transform">
            5
          </span>
        </Link>

       <button 
          onClick={handleScrollPost} 
          className="flex items-center px-3 py-3 text-sm font-medium rounded-lg text-gray-700 hover:text-indigo-700 hover:bg-gray-50 w-full transition-colors duration-200 group"
        >
          <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-indigo-100 mr-3">
            <svg className="h-5 w-5 text-gray-500 group-hover:text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span>Create Post</span>
        </button>
     {Dropdownpost && (
          <div className="ml-12 mt-1 space-y-1">
            <Link 
              to="makerequest" 
              className="block px-3 py-2 text-sm font-medium rounded-lg text-gray-600 hover:text-indigo-700 hover:bg-gray-50 transition-colors duration-200"
            >
              New Request
            </Link>
          </div>
        )}

       <Link 
          to="chat" 
          className="flex items-center px-3 py-3 text-sm font-medium rounded-lg text-gray-700 hover:text-indigo-700 hover:bg-gray-50 transition-colors duration-200 group"
        >
          <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-indigo-100 mr-3">
            <svg className="h-5 w-5 text-gray-500 group-hover:text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <span>Messages</span>
          <span className="ml-auto inline-flex items-center justify-center h-5 w-5 text-xs font-bold text-white bg-green-500 rounded-full transform group-hover:scale-110 transition-transform">
            3
          </span>
        </Link>
      </div>

     <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 rounded-b-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
              Worker Dashboard
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

export default RouteLinksWorkers;