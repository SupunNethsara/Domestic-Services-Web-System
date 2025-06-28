import React from 'react'
import { Link } from 'react-router-dom'

function RoutingLinksClients({ Dropdownpost, handleScrollPost, countAvailability }) {
  return (
    <div style={{height:'100vh'}} className="h-full">
      <div className="space-y-1 h-full flex flex-col">
        <div className="flex-grow">
          <Link to="clienthome" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-900 bg-gray-100">
            <svg className="text-gray-500 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </Link>

          <Link to="makeprofile" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50">
            <svg className="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Make Your Profile
          </Link>

          <Link to="worker_availability" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 relative">
            <svg className="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a4 4 0 00-5-4M9 20H4v-2a4 4 0 015-4m6 0a4 4 0 100-8 4 4 0 000 8zm-6 0a4 4 0 100-8 4 4 0 000 8z" />
            </svg>
            Available Workers
            <span className="ml-auto inline-flex items-center px-2 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
              {countAvailability}
            </span>
          </Link>

          <button onClick={handleScrollPost} className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 w-full">
            <svg className="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Post
          </button>

          {Dropdownpost && (
            <div className="ml-8 mt-1">
              <Link to="makepost" className="block px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                Make Post
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RoutingLinksClients