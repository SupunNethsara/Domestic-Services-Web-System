import React from 'react';
import { FaPlay, FaLightbulb, FaUsers, FaClock, FaCheckCircle } from 'react-icons/fa';

function ExplainVideoSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How Our Platform Works
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
            Watch our quick guide to get the most out of our service
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-600 text-white mb-4 cursor-pointer hover:bg-indigo-700 transition-colors">
                  <FaPlay className="h-6 w-6 ml-1" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Watch Demo</h3>
                <p className="mt-1 text-gray-600">2:45 min</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>

    <div className="space-y-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-indigo-100 rounded-lg p-3">
                <FaLightbulb className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Find the Perfect Worker</h3>
                <p className="mt-1 text-gray-600">
                  Browse our verified professionals with detailed profiles, ratings, and service history.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 bg-indigo-100 rounded-lg p-3">
                <FaUsers className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Easy Booking Process</h3>
                <p className="mt-1 text-gray-600">
                  Request services with just a few clicks and get instant confirmation.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 bg-indigo-100 rounded-lg p-3">
                <FaClock className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Real-Time Tracking</h3>
                <p className="mt-1 text-gray-600">
                  Monitor your service request status and communicate directly with your worker.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 bg-indigo-100 rounded-lg p-3">
                <FaCheckCircle className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Secure Payments</h3>
                <p className="mt-1 text-gray-600">
                  Pay safely through our platform with multiple payment options available.
                </p>
              </div>
            </div>

            <button className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Get Started Now
            </button>
          </div>
        </div>

    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 font-medium">JD</span>
              </div>
              <div className="ml-4">
                <h4 className="text-sm font-medium text-gray-900">John D.</h4>
                <div className="flex mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="h-4 w-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-4 text-gray-600">
              "Found an amazing plumber within minutes. The platform made it so easy to compare options and book immediately."
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 font-medium">SM</span>
              </div>
              <div className="ml-4">
                <h4 className="text-sm font-medium text-gray-900">Sarah M.</h4>
                <div className="flex mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="h-4 w-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-4 text-gray-600">
              "As a busy mom, this service has been a lifesaver. I can book trusted help whenever I need it."
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 font-medium">RK</span>
              </div>
              <div className="ml-4">
                <h4 className="text-sm font-medium text-gray-900">Raj K.</h4>
                <div className="flex mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="h-4 w-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-4 text-gray-600">
              "The payment system is so convenient and secure. Never worry about carrying cash for services anymore."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExplainVideoSection;