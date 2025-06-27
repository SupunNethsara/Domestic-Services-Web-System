import React from 'react';
import { FaPaintRoller, FaBroom, FaChild } from 'react-icons/fa';
import { FiChevronRight } from 'react-icons/fi';

function TopRatedServices() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-md font-semibold text-gray-800 mb-3">Top Rated Services</h3>
      
      <div className="space-y-3">
        {/* Service Item 1 */}
        <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
          <div className="flex items-center">
            <div className="bg-blue-50 p-2 rounded mr-3">
              <FaPaintRoller className="text-blue-600 text-md" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-800">Home Painting</h4>
              <div className="flex items-center mt-1">
                <span className="text-xs text-gray-500">4.8 (120 reviews)</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-800">LKR 1,500/day</p>
            <FiChevronRight className="ml-auto text-gray-400" />
          </div>
        </div>

        {/* Service Item 2 */}
        <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
          <div className="flex items-center">
            <div className="bg-green-50 p-2 rounded mr-3">
              <FaBroom className="text-green-600 text-md" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-800">Deep Cleaning</h4>
              <div className="flex items-center mt-1">
                <span className="text-xs text-gray-500">5.0 (88 reviews)</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-800">LKR 2,000/session</p>
            <FiChevronRight className="ml-auto text-gray-400" />
          </div>
        </div>

        {/* Service Item 3 */}
        <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
          <div className="flex items-center">
            <div className="bg-purple-50 p-2 rounded mr-3">
              <FaChild className="text-purple-600 text-md" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-800">Childcare</h4>
              <div className="flex items-center mt-1">
                <span className="text-xs text-gray-500">4.7 (64 reviews)</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-800">LKR 300/hour</p>
            <FiChevronRight className="ml-auto text-gray-400" />
          </div>
        </div>
      </div>

      <button className="mt-4 w-full py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors">
        View All Services
      </button>
    </div>
  );
}

export default TopRatedServices;