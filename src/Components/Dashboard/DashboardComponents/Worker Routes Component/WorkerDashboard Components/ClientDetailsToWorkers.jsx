import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { 
  FaUserCircle, 
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaGlobeAmericas
} from 'react-icons/fa';
import { RiMessage2Fill, RiUserStarFill } from 'react-icons/ri';
import { GiPoliceBadge, GiModernCity } from 'react-icons/gi';
import { IoMdClose } from 'react-icons/io';

const ClientDetailsToWork = ({ isOpen, onClose, client }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div 
            style={{ backgroundColor: 'rgba(0,0,0,0.7)' }} 
            className="fixed inset-0 backdrop-blur-sm" 
          />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 text-left align-middle shadow-2xl transition-all border border-gray-100">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close"
                >
                  <IoMdClose className="h-5 w-5 text-gray-500" />
                </button>

                {client && (
                  <div className="space-y-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative">
                        {client.profile?.profile_image ? (
                          <img
                            src={client.profile.profile_image}
                            alt="Profile"
                            className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg"
                          />
                        ) : (
                          <div className="h-24 w-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
                            <FaUserCircle className="h-12 w-12" />
                          </div>
                        )}
                        <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1.5 shadow-md">
                          <RiUserStarFill className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h3 className="text-xl font-bold text-gray-900">
                          {client.profile?.first_name} {client.profile?.last_name}
                        </h3>
                        <p className="text-sm text-indigo-600 font-medium">@{client.profile?.username}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                            <FaMapMarkerAlt className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-gray-700 mb-1">Location</h4>
                            <p className="text-sm text-gray-600">
                              {client.profile?.address && (
                                <span className="block">{client.profile.address}</span>
                              )}
                              <span className="flex items-center">
                                <GiModernCity className="mr-1 text-gray-400" />
                                {client.profile?.city}, {client.profile?.province}
                              </span>
                              <span className="flex items-center">
                                <FaGlobeAmericas className="mr-1 text-gray-400" />
                                {client.profile?.country}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                            <RiMessage2Fill className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-gray-700 mb-1">About</h4>
                            <p className="text-sm text-gray-600">
                              {client.profile?.about || 'No information provided'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {client.special_requirements && (
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                          <div className="flex items-start space-x-3">
                            <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600">
                              <GiPoliceBadge className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-gray-700 mb-1">Special Requirements</h4>
                              <p className="text-sm text-gray-600">{client.special_requirements}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex space-x-3 pt-2">
                        <button className="flex-1 flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors">
                          <FaPhone className="h-4 w-4" />
                          <span>Call</span>
                        </button>
                        <button className="flex-1 flex items-center justify-center space-x-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg transition-colors">
                          <FaEnvelope className="h-4 w-4" />
                          <span>Message</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ClientDetailsToWork;