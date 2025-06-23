import axios from 'axios';
import React from 'react'
import { FiHome, FiFileText, FiLogOut, FiSettings, FiUsers } from 'react-icons/fi';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const logout = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      window.location.href = '/login';
      return;
    }

    try {
      await axios.get('/api/logout', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      localStorage.removeItem('token');
      window.location.href = '/login';

    } catch (error) {
      console.error('Logout failed:', error.response?.data || error.message);

      if (error.response?.status === 401) {
        localStorage.removeItem('token');
      }
      window.location.href = '/login';
    }
  };

function Sidebar() {
    return (
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
            <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white p-4">

                <div className="mb-8 mt-4 px-2">
                    <h4 className="text-md font-bold text-blue-600 b-4 tracking-tighter">HOME HEROES</h4>
                </div>

                <nav className="space-y-1">
                    <Link
                        to="statics"
                        className="flex mt-2 items-center px-3 py-2 text-sm font-medium rounded-md text-blue-700 bg-indigo-50"
                    >
                        <FiHome className="mr-3 h-5 w-5" />
                        Dashboard
                    </Link>
                    <Link
                        to="user_manage"
                        className="flex mt-2 items-center text-gray-600 px-3 py-2 text-sm font-medium rounded-md "
                    >
                        <FiUsers className="mr-3 h-5 w-5" />
                        User Management
                    </Link>
                    <Link
                        to="post_manage"
                        className="flex mt-2 items-center text-gray-600 px-3 py-2 text-sm font-medium rounded-md "
                    >
                        <FiFileText className="mr-3 h-5 w-5" />
                        Post Management
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
                    <nav className="mt-auto pt-4 space-y-1 border-t border-gray-200">
                        <button
                            onClick={logout}
                            className=" cursor-pointer w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-red-600 hover:bg-red-50"
                        >
                            <FiLogOut className="mr-3 h-5 w-5" />
                            Logout
                        </button>
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