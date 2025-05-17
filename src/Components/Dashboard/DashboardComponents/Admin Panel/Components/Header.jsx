import React from 'react'
import { FiHome, FiCheckSquare, FiCalendar, FiSettings, FiUsers, FiPieChart, FiBell, FiSearch } from 'react-icons/fi';
function Header() {
  return (
    <header className="bg-white shadow-sm">
    <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-4">
            <FiSearch className="text-gray-400" />
            <input
                type="text"
                placeholder="Search tasks, projects..."
                className="border-0 focus:ring-0 text-gray-600 placeholder-gray-400"
            />
        </div>
        <div className="flex items-center space-x-4">
            <button className="p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                <FiBell className="h-6 w-6" />
            </button>
            <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                DL
            </div>
        </div>
    </div>
</header>
  )
}

export default Header