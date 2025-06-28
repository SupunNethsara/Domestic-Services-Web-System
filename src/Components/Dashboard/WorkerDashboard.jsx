import { React, useState, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import BottomNav from './DashboardComponents/TooltipsWithTabs';
import WorkerPostModal from './DashboardComponents/Worker Routes Component/WorkerDashboard Components/WorkerPostModal';
import Popupadd from './DashboardComponents/Client Routes Component/ClientDashboard Components/Popupadd';
import RouteLinksWorkers from './DashboardComponents/Worker Routes Component/WorkerDashboard Components/Routing Links/RouteLinksWorkers';
import UserOnlineStatus from './DashboardComponents/Client Routes Component/ClientDashboard Components/UserOnlineStatus';
export default function WorkerDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [postmodal, setPostModal] = useState(false);
  const [Dropdownpost, setDropdownpost] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(response.data.profile);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const openPostModal = () => !postmodal && setPostModal(true);
  const closemodal = () => postmodal && setPostModal(false);

  const handleScrollPost = () => {
    setDropdownpost(!Dropdownpost);
  }
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div class="min-h-screen bg-gray-100">

        <header class="bg-white shadow-sm lg:static lg:overflow-y-visible">
          <div class="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
              <div class="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-3">
                <div className="flex-shrink-0 flex items-center">
                  <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Home Heroes
                  </span>
                </div>
              </div>
              <div class="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                <div class="flex items-center px-6  md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                  <div class="w-full">
                    <BottomNav />
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
                <button onClick={""} className="ml-5 flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span className="sr-only">Chat</span>
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </button>

                <div class="flex-shrink-0 relative ml-5">
                  <div>
                    <button onClick={() => setIsOpen(!isOpen)} type="button" class="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                      <span class="sr-only">Open user menu</span>
                      {profile?.profile_image ? (
                        <img
                          class="h-8 w-8 rounded-full"
                          src={profile.profile_image}
                          alt="Profile"
                        />
                      ) : (
                        <div class="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <span class="text-gray-500 text-xs">
                            {profile?.first_name?.charAt(0)}{profile?.last_name?.charAt(0)}
                          </span>
                        </div>
                      )}
                    </button>
                  </div>

                  {isOpen && (
                    <div class="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">

                      <Link to="workerprofile" className="text-sm block rounded-md py-2 px-3  font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">
                        Your Profile
                      </Link>

                      <Link to="" class="text-sm block rounded-md py-2 px-3 font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</Link>

                      <a onClick={logout} href="#" class="text-sm block rounded-md py-2 px-3 font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
                    </div>
                  )}

                </div>

                <a onClick={openPostModal} href="#" class="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"> Create Post </a>
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
                  <Link to="workerprofilee" className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">
                    Your Profile
                  </Link>
                  <a href="#" class="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">Settings</a>

                  <a onClick={logout} href="#" class="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">Sign out</a>
                </div>
              )}

            </div>
          </nav>

        </header>
        <div className="block min-w-0 h-m  bg-[#F2F4F7] xl:flex m-2">
          <Popupadd />
          <WorkerPostModal postmodal={postmodal} closemodal={closemodal} />
          <RouteLinksWorkers
          handleScrollPost ={handleScrollPost}
          Dropdownpost ={Dropdownpost}
          />

          {/* Main Content */}
          <div className="w-full m-2 h-screen overflow-y-scroll ">
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
        <div className=" rounded-lg  border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-84 xl:border-r xl:border-gray-200 m-2 bg-['#f2f4f7'] h-full">
            <div className="h-full pl-4  sm:pl-6 lg:pl-8 xl:pl-0">

              <UserOnlineStatus />

            </div>
          </div>

        </div>


      </div>
    </div>
  )
}
