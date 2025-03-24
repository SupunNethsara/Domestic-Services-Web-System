import React, { useState } from 'react'
import TooltipsWithTabs from './DashboardComponents/TooltipsWithTabs';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';


export default function ClientDashboard() {

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Dropdownpost, setDropdownpost] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleScrollPost = () => {
    setDropdownpost(!Dropdownpost);
  }

  const logout = async () => {
    try {
      const token = localStorage.getItem("token"); 
      const response = await axios.get('http://127.0.0.1:8000/api/logout', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      localStorage.removeItem("token");
      window.location.href = "/login"; 
    } catch (error) {
      console.error("Logout failed", error.response?.data || error.message);
    }
  };
  
  
  

  return (
    <div>
      <div class="min-h-screen bg-gray-100">

        <header class="bg-white shadow-sm lg:static lg:overflow-y-visible">
          <div class="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
              <div class="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-3">
                <div class="flex-shrink-0 flex items-center">

                </div>
              </div>
              <div class="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                <div class="flex items-center px-6  md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                  <div class="w-full">
                    <TooltipsWithTabs />
                  </div>
                </div>
              </div>
              <div class="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">

                <button onClick={() => setIsOpenMenu(!isOpenMenu)} type="button" class="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-expanded="false">
                  <span class="sr-only">Open menu</span>

                  <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>

                  <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div class="hidden lg:flex lg:items-center lg:justify-end xl:col-span-3">
                <a href="#" class="ml-5 flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span class="sr-only">View notifications</span>

                  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </a>


                <div class="flex-shrink-0 relative ml-5">
                  <div>
                    <button onClick={() => setIsOpen(!isOpen)} type="button" class="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                      <span class="sr-only">Open user menu</span>
                      <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                    </button>
                  </div>

                  {isOpen && (
                    <div class="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">

                      <a href="#" class="block py-2 px-4 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>

                      <a href="#" class="block py-2 px-4 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a>

                      <a onClick={logout} href="#" class="block py-2 px-4 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
                    </div>
                  )}

                </div>

                <a href="#" class="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"> New Project </a>
              </div>
            </div>
          </div>


          <nav class="lg:hidden" aria-label="Global">
            {isOpenMenu && (
              <div class="max-w-3xl mx-auto px-2 pt-2 pb-3 space-y-1 sm:px-4">

                <a href="#" aria-current="page" class="bg-gray-100 text-gray-900 block rounded-md py-2 px-3 text-base font-medium">Dashboard</a>

                <a href="#" class="hover:bg-gray-50 block rounded-md py-2 px-3 text-base font-medium">Calendar</a>

                <a href="#" class="hover:bg-gray-50 block rounded-md py-2 px-3 text-base font-medium">Teams</a>

                <a href="#" class="hover:bg-gray-50 block rounded-md py-2 px-3 text-base font-medium">Directory</a>
              </div>
            )}

            <div class="border-t border-gray-200 pt-4 pb-3">
              <div class="max-w-3xl mx-auto px-4 flex items-center sm:px-6">
                <div onClick={() => setIsOpen(!isOpen)} class="flex-shrink-0">
                  <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </div>
                <div class="ml-3">
                  <div class="text-base font-medium text-gray-800">Chelsea Hagon</div>
                  <div class="text-sm font-medium text-gray-500">chelseahagon@example.com</div>
                </div>
                <button type="button" class="ml-auto flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span class="sr-only">View notifications</span>

                  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
              </div>
              {isOpen && (
                <div class="mt-3 max-w-3xl mx-auto px-2 space-y-1 sm:px-4">
                  <a href="#" class="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">Your Profile</a>

                  <a href="#" class="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">Settings</a>

                  <a  onClick={logout} href="#" class="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">Sign out</a>
                </div>
              )}

            </div>
          </nav>

        </header>
        <div className=" block min-w-0 bg-[#F2F4F7] xl:flex m-2 ">

          {/* Left Sidebar */}
          <div className="hidden sm:block xl:flex-shrink-0 xl:w-84 xl:border-r xl:border-gray-200 m-2 bg-white h-full">
            <div className="max-h-max pl-4 pr-6 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
              <div className='p-2'>
                <Link to='clienthome'>
                  <a href="#" class="bg-gray-100 text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                    <svg class="text-gray-500 mr-4 flex-shrink-0 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Dashboard
                  </a>
                </Link>


                <a onClick={handleScrollPost} href="#" class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                  <svg class="text-gray-400 group-hover:text-gray-500 mr-4 flex-shrink-0 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Post
                </a>
                {Dropdownpost && (
                  <ul className='ml-10'>
                    <Link to='makepost'>
                      <a href="#" class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                        Make Post
                      </a>
                    </Link>


                  </ul>
                )}

              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full m-2 h-screen">
            <div className="h-full w-full">
              <div className="relative h-full w-full" style={{ minHeight: "36rem" }}>
                <Outlet context={{
                  isModalOpen,
                  handleOpenModal,
                  handleCloseModal,
                }} />
              </div>
            </div>
          </div>


          {/* Right Sidebar */}
          <div className="border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-84 xl:border-r xl:border-gray-200 m-2 bg-white h-full">
            <div className="h-full pl-4 pr-6 py-6 sm:pl-6 lg:pl-8 xl:pl-0"></div>
          </div>

        </div>


      </div>
    </div>
  )
}
