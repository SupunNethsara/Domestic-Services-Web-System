import React from 'react'

function Benefits() {
    return (
        <div>
            <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Platform?</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">Designed to empower both clients and professionals with powerful tools</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 group">
                            <div className="flex items-center mb-8">
                                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mr-5 group-hover:bg-blue-200 transition-colors duration-300">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">For Clients</h3>
                            </div>
                            <ul className="space-y-5 mb-10">
                                {[
                                    "Access to a wide network of verified professionals",
                                    "Transparent review system to make informed decisions",
                                    "Secure payment processing and dispute resolution",
                                    "Streamlined communication and project management",
                                    "Dedicated support for all your questions and needs"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <svg className="flex-shrink-0 w-5 h-5 text-blue-500 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-gray-700 text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all duration-300 font-medium text-lg shadow-md hover:shadow-lg">
                                Register as Client
                            </button>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 group">
                            <div className="flex items-center mb-8">
                                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mr-5 group-hover:bg-blue-200 transition-colors duration-300">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">For Professionals</h3>
                            </div>
                            <ul className="space-y-5 mb-10">
                                {[
                                    "Showcase your skills and build a professional portfolio",
                                    "Connect with clients looking for your specific expertise",
                                    "Reliable payment system with on-time processing",
                                    "Collect reviews to enhance your professional reputation",
                                    "Flexible scheduling and work management tools"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <svg className="flex-shrink-0 w-5 h-5 text-blue-500 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-gray-700 text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 font-medium text-lg shadow-md hover:shadow-lg">
                                Join as Professional
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Benefits