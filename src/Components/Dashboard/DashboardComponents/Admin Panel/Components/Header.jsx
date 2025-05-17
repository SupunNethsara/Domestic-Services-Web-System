import React from 'react';
import { FiBell, FiSearch } from 'react-icons/fi';

function Header() {
    return (
        <header className="bg-white static shadow-sm">
            <div className="max-w-9xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <div className="flex-1"></div>
                <div className="flex mr-2 items-center space-x-2 bg-blue-50 rounded-md px-3 py-1.5 w-full max-w-md border border-blue-100 focus-within:border-blue-300 focus-within:bg-white focus-within:ring-1 focus-within:ring-blue-200 transition-all duration-150">
                    <FiSearch className="text-blue-400 h-4 w-4" />
                    <input
                        type="text"
                        placeholder="Search tasks, projects..."
                        className="border-0 focus:ring-0 bg-transparent text-gray-700 placeholder-blue-300 w-full focus:outline-none text-sm h-6"
                    />
                </div>
                <div className=" flex justify-end items-center space-x-4">
                    <button className="p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                        <FiBell className="h-6 w-6" />
                    </button>
                    <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                        DL
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;