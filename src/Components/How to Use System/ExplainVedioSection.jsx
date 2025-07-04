import React from 'react';
import { FaPlay, FaLightbulb, FaUsers, FaClock, FaCheckCircle } from 'react-icons/fa';

function ExplainVideoSection() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 sm:text-3xl">
            How Our Service Works
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-gray-600 mx-auto">
            Learn how to easily connect with skilled professionals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative rounded-lg overflow-hidden shadow-md group">
            <img
              src={'/VedioImage.png'}
              alt="Demo Video"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white mb-3 cursor-pointer hover:bg-blue-700 transition-all duration-300 transform group-hover:scale-110">
                  <FaPlay className="h-5 w-5 ml-1 transition-transform duration-300 group-hover:scale-125" />
                </div>
                <h3 className="text-base font-medium text-white transition-opacity duration-300 group-hover:opacity-90">
                  Watch Overview
                </h3>
              </div>
            </div>
            <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:opacity-40"></div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-50 rounded-lg p-2">
                <FaLightbulb className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-base font-medium text-gray-800">Find Qualified Professionals</h3>
                <p className="mt-1 text-gray-600 text-sm">
                  Browse verified professionals with complete profiles and service history.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-50 rounded-lg p-2">
                <FaUsers className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-base font-medium text-gray-800">Simple Booking</h3>
                <p className="mt-1 text-gray-600 text-sm">
                  Request services quickly and receive prompt confirmation.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-50 rounded-lg p-2">
                <FaClock className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-base font-medium text-gray-800">Service Tracking</h3>
                <p className="mt-1 text-gray-600 text-sm">
                  Monitor your request status and communicate with your professional.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-50 rounded-lg p-2">
                <FaCheckCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-base font-medium text-gray-800">Secure Payment</h3>
                <p className="mt-1 text-gray-600 text-sm">
                  Pay safely through our platform with various payment options.
                </p>
              </div>
            </div>

            <button className="mt-4 inline-flex items-center px-5 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Get Started
            </button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 text-sm font-medium">JD</span>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-gray-800">John D.</h4>
                <div className="flex mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="h-3.5 w-3.5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-3 text-gray-600 text-sm">
              "Found a great plumber quickly. The platform makes it easy to compare options and book."
            </p>
          </div>

          <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 text-sm font-medium">SM</span>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-gray-800">Sarah M.</h4>
                <div className="flex mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="h-3.5 w-3.5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-3 text-gray-600 text-sm">
              "Very convenient for busy schedules. I can book trusted help when needed."
            </p>
          </div>

          <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 text-sm font-medium">RK</span>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-gray-800">Raj K.</h4>
                <div className="flex mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="h-3.5 w-3.5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-3 text-gray-600 text-sm">
              "The payment system is convenient and secure. No need to carry cash for services."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExplainVideoSection;