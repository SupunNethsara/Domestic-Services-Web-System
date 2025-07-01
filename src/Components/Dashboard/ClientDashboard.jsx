import React, { useState, useEffect } from 'react';
import TooltipsWithTabs from './DashboardComponents/TooltipsWithTabs';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Popupadd from './DashboardComponents/Client Routes Component/ClientDashboard Components/Popupadd';
import MakePostModal from './DashboardComponents/Client Routes Component/ClientDashboard Components/MakePostModal';
import ChatDrawer from './DashboardComponents/Client Routes Component/ClientDashboard Components/Chat Service/ChatDrawer';
import TopRatedServices from './DashboardComponents/Client Routes Component/ClientDashboard Components/TopRatedServices';
import UserOnlineStatus from './DashboardComponents/Client Routes Component/ClientDashboard Components/UserOnlineStatus';
import RoutingLinksClients from './DashboardComponents/Client Routes Component/ClientDashboard Components/RoutingLinksClients';



export default function ClientDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Dropdownpost, setDropdownpost] = useState(false);
  const [postmodal, setPostModal] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countAvailability, setCountAvailability] = useState(0);
  const [isOpenChatDrawer, setIsOpenChatDrawer] = useState(false);
  const [currentChatWorker, setCurrentChatWorker] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      const response = await axios.get('http://127.0.0.1:8000/api/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(response.data.profile || {});
    } catch (err) {
      console.error('Failed to fetch profile:', err);
      setError(err.response?.data?.message || err.message || 'Failed to load profile');

      if (err.response?.status === 401) {
        window.location.href = '/login';
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchWorkers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/getAvailabilitytoClients');
      const count = response.data?.data?.length || 0;
      setCountAvailability(count);
    } catch (error) {
      console.error("Error fetching availability:", error);
    }
  };

  useEffect(() => {
    if (location.state?.shouldRefresh) {
      navigate(location.pathname, { replace: true, state: {} });
      window.location.reload();
    }

    fetchProfile();
    fetchWorkers();
  }, [location, navigate]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleScrollPost = () => setDropdownpost(!Dropdownpost);
  const openPostModal = () => !postmodal && setPostModal(true);
  const closemodal = () => postmodal && setPostModal(false);

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
      window.location.href = '/';

    } catch (error) {
      console.error('Logout failed:', error.response?.data || error.message);

      if (error.response?.status === 401) {
        localStorage.removeItem('token');
      }
      window.location.href = '/login';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  if (error) {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
  const handleChatDrawer = (workerData) => {
    setCurrentChatWorker(workerData);
    setIsOpenChatDrawer(true);
  };
  return (
    <div>
      <div className="  min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm lg:static lg:overflow-y-visible">
          <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
              <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-3">
                <div className="flex-shrink-0 flex items-center">
                  <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Home Heroes
                  </span>
                </div>
              </div>

              <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                <div className="flex items-center px-6 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                  <div className="w-full">
                    <TooltipsWithTabs />
                  </div>
                </div>
              </div>

              <div className="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
                <button
                  onClick={() => setIsOpenMenu(!isOpenMenu)}
                  type="button"
                  className="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open menu</span>
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>

              <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-3">
                <button className="ml-5 flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span className="sr-only">View notifications</span>
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
                <button onClick={handleChatDrawer} className="ml-5 flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span className="sr-only">Chat</span>
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </button>

                <div className="flex-shrink-0 relative ml-5">
                  <div>
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      type="button"
                      className="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span className="sr-only">Open user menu</span>
                      {profile?.profile_image ? (
                        <img
                          src={profile.profile_image}
                          alt="Profile"
                          className="h-8 w-8 rounded-full"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                          <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 14.016q2.531 0 5.273 1.102t2.742 2.883v1.5h-16.031v-1.5q0-1.781 2.742-2.883t5.273-1.102zM12 12q-1.641 0-2.813-1.172t-1.172-2.813 1.172-2.836 2.813-1.195 2.813 1.195 1.172 2.836-1.172 2.813-2.813 1.172z" />
                          </svg>
                        </div>
                      )}
                    </button>
                  </div>

                  {isOpen && (
                    <div className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 " role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                      <Link to="profilepage" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex="-1">
                        Your Profile
                      </Link>
                      <button className="block w-full text-left py-2 px-4 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex="-1">
                        Settings
                      </button>
                      <button onClick={logout} className="block w-full text-left py-2 px-4 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex="-1">
                        Sign out
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={openPostModal}
                  className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create Post
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <nav className="lg:hidden" aria-label="Global">
            {isOpenMenu && (
              <div className="max-w-3xl mx-auto px-2 pt-2 pb-3 space-y-1 sm:px-4">
                <Link to="clienthome" className="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-100">
                  Dashboard
                </Link>
                <a href="#" className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">
                  Calendar
                </a>
                <a href="#" className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">
                  Teams
                </a>
                <a href="#" className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">
                  Directory
                </a>
              </div>
            )}

            <div className="border-t border-gray-200 pt-4 pb-3">
              <div className="max-w-3xl mx-auto px-4 flex items-center sm:px-6">
                <div onClick={() => setIsOpen(!isOpen)} className="flex-shrink-0">
                  {profile?.profile_image ? (
                    <img
                      src={profile.profile_image}
                      alt="Profile"
                      className="h-10 w-10 rounded-full"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <svg className="h-6 w-6 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 14.016q2.531 0 5.273 1.102t2.742 2.883v1.5h-16.031v-1.5q0-1.781 2.742-2.883t5.273-1.102zM12 12q-1.641 0-2.813-1.172t-1.172-2.813 1.172-2.836 2.813-1.195 2.813 1.195 1.172 2.836-1.172 2.813-2.813 1.172z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {profile?.first_name || 'User'} {profile?.last_name || ''}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {profile?.email || 'user@example.com'}
                  </div>
                </div>
                <button type="button" className="ml-auto flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span className="sr-only">View notifications</span>
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
              </div>

              {isOpen && (
                <div className="mt-3 max-w-3xl mx-auto px-2 space-y-1 sm:px-4">
                  <Link to="profilepage" className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">
                    Your Profile
                  </Link>
                  <a href="#" className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">
                    Settings
                  </a>
                  <button onClick={logout} className="block w-full text-left rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </nav>
        </header>

        <div className="block min-w-0 bg-[#F2F4F7] xl:flex m-2 h-full">
          <Popupadd />
          <MakePostModal postmodal={postmodal} closemodal={closemodal} />

          {/* Left Sidebar  */}
          <div className="hidden sm:block xl:flex-shrink-0 xl:w-90 xl:border-r xl:border-gray-200 m-2 bg-white h-full rounded-md">
            <div className="p-4">
              <Popupadd />
              <MakePostModal postmodal={postmodal} closemodal={closemodal} />
              <RoutingLinksClients
                Dropdownpost={Dropdownpost}
                handleScrollPost={handleScrollPost}
                countAvailability={countAvailability}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full m-2 h-screen overflow-y-scroll" style={{ flex: '1 1 50%' }}>
            <div className="h-full w-full">
              <div className="relative h-full w-full" style={{ minHeight: "36rem" }}>
                <Outlet context={{
                  isModalOpen,
                  profile,
                  handleOpenModal,
                  handleCloseModal,
                  handleChatDrawer,
                }} />
              </div>
            </div>
          </div>

          {/* Right Sidebar  */}
          <div className="rounded-lg border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-90 xl:border-r xl:border-gray-200 m-2 bg-[#f2f4f7] h-full">
            <div className="h-full pl-4 sm:pl-6 lg:pl-8 xl:pl-0">
              <TopRatedServices />
              <UserOnlineStatus />
              {isOpenChatDrawer && (
                <ChatDrawer
                  worker={currentChatWorker}
                  onClose={() => setIsOpenChatDrawer(false)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}