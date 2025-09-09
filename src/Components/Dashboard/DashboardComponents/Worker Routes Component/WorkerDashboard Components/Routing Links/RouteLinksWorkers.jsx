import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRequestCount } from '../../../../../../Context/RequestCountContext';

function RouteLinksWorkers({ handleScrollPost, Dropdownpost }) {
  const { requestCount } = useRequestCount();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className=" sm:block xl:flex-shrink-0 xl:w-84 m-2 bg-gradient-to-b from-white to-gray-50 flex flex-col min-h-screen rounded-xl shadow-lg overflow-hidden">
      <div className="flex-grow space-y-1 p-3">
        <div 
          className="relative group mb-2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Link
            to="workerhome"
            className="flex items-center px-3 py-3 text-sm font-medium rounded-xl text-indigo-700 bg-gradient-to-r from-indigo-50 to-indigo-100 hover:from-indigo-100 hover:to-indigo-200 transition-all duration-300 shadow-sm"
          >
            <div className="p-1.5 rounded-lg bg-white shadow-sm mr-3">
              <svg className="h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span className="font-semibold">Dashboard</span>
            <span className={`absolute right-4 text-xs font-medium text-indigo-500 bg-white px-2 py-1 rounded-full shadow-sm transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}>
              Worker View
            </span>
          </Link>
        </div>
        <Link
          to="makeworkerprofile"
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
          to="workeravailability"
          className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:text-indigo-700 hover:bg-gray-50 transition-all duration-200 group transform hover:-translate-y-0.5"
        >
          <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-indigo-100 group-hover:scale-110 transition-all duration-200 mr-3">
            <svg className="h-5 w-5 text-gray-500 group-hover:text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span>Add Availability</span>
        </Link>
        
        <Link
          to="addbankdetails"
          className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:text-green-700 hover:bg-green-50 transition-all duration-200 group transform hover:-translate-y-0.5"
        >
          <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-green-100 group-hover:scale-110 transition-all duration-200 mr-3">
            <svg className="h-5 w-5 text-gray-500 group-hover:text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor" > 
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 6h18M3 12h18M3 18h18"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 6h18v12H3V6z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 10h1m4 0h1m4 0h1M7 14h1m4 0h1m4 0h1"
              />
            </svg>
          </div>
          <span>Add Bank Details</span>
        </Link>
  
        <Link
          to="clientreqesting"
          className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:text-indigo-700 hover:bg-gray-50 transition-all duration-200 group transform hover:-translate-y-0.5 relative"
        >
          <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-indigo-100 group-hover:scale-110 transition-all duration-200 mr-3">
            <svg className="h-5 w-5 text-gray-500 group-hover:text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <span>Coming Requests</span>
          {requestCount > 0 && (
            <span className="ml-auto inline-flex items-center justify-center h-5 w-5 text-xs font-bold text-white bg-gradient-to-r from-red-500 to-rose-500 rounded-full transform group-hover:scale-110 transition-transform shadow-sm">
              {requestCount}
            </span>
          )}
        </Link>
        <button
          onClick={handleScrollPost}
          className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:text-indigo-700 hover:bg-gray-50 w-full transition-all duration-200 group transform hover:-translate-y-0.5"
        >
          <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-indigo-100 group-hover:scale-110 transition-all duration-200 mr-3">
            <svg className="h-5 w-5 text-gray-500 group-hover:text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span>Available Clients</span>
        </button>
        
        {Dropdownpost && (
          <div className="ml-12 mt-1 space-y-1 animate-fadeIn">
            <Link
              to="getrequest"
              className="block px-3 py-2 text-sm font-medium rounded-lg text-gray-600 hover:text-indigo-700 hover:bg-gray-50 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              New Request
            </Link>
          </div>
        )}

        <Link
          to="chat"
          className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:text-indigo-700 hover:bg-gray-50 transition-all duration-200 group transform hover:-translate-y-0.5"
        >
          <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-indigo-100 group-hover:scale-110 transition-all duration-200 mr-3">
            <svg className="h-5 w-5 text-gray-500 group-hover:text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <span>Messages</span>
          <span className="ml-auto inline-flex items-center justify-center h-5 w-5 text-xs font-bold text-white bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transform group-hover:scale-110 transition-transform shadow-sm">
            3
          </span>
        </Link>
      </div>
  
      <div className="px-4 py-3 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-b-xl mt-auto">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider flex items-center">
              <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              Worker Dashboard
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

export default RouteLinksWorkers;