import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FiHome, FiCheckSquare, FiCalendar, FiSettings, FiUsers, FiPieChart, FiBell, FiSearch } from 'react-icons/fi';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';

function AdminDashbaord() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="md:pl-64 flex flex-col flex-1">
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>

  )
}

export default AdminDashbaord