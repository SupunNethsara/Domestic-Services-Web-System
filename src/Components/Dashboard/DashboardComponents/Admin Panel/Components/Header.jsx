import React from 'react';
import { FiBell, FiSearch } from 'react-icons/fi';

function Header() {
    return (
        <header className="bg-white static shadow-sm">
            <div className="max-w-9xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <div className="flex-1"></div>
                <div className="flex items-center bg-white rounded-lg shadow-sm border border-gray-200 hover:border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-200 transition-all duration-200 w-full max-w-md">
                    <div className="pl-3 pr-2 py-2.5 text-gray-400">
                        <FiSearch className="h-5 w-5" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search tasks, projects..."
                        className="w-full py-2.5 pr-4 text-gray-700 placeholder-gray-400 bg-transparent border-0 focus:ring-0 focus:outline-none text-base"
                    />
                </div>                <div className=" flex justify-end items-center space-x-4">
                    <button className="p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                        <FiBell className="h-6 w-6" />
                    </button>
                    <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                       SN
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;