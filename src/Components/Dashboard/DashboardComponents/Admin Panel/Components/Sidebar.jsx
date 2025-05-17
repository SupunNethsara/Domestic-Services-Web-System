import React from 'react'
import { FiHome, FiCheckSquare, FiCalendar, FiSettings, FiUsers, FiPieChart, FiBell, FiSearch } from 'react-icons/fi';
import { Link, Outlet } from 'react-router-dom';
function Sidebar() {
    return (
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
            <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white p-4">

                <div className="mb-8 mt-4 px-2">
                    <h4 className="text-md font-bold text-blue-600 b-4 tracking-tighter align-middle justify-center text-center">HOME HEROES</h4>
                </div>

                <nav className="space-y-1">
                    <Link
                        to=""
                        className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-indigo-700 bg-indigo-50"
                    >
                        <FiHome className="mr-3 h-5 w-5" />
                        Dashboard
                    </Link>
                    



                </nav>


                <div className="mt-8 pt-4 border-t border-gray-200">
                    <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Workspace
                    </h3>
                    <nav className="mt-2 space-y-1">
                        <Link
                            to="/settings"
                            className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                        >
                            <FiSettings className="mr-3 h-5 w-5" />
                            Settings
                        </Link>
                    </nav>
                </div>


                <div className="mt-auto p-4 flex items-center">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                        DL
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Deadloads2173</p>
                        <p className="text-xs text-gray-500">Free Plan</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar