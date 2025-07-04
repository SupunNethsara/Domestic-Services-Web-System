import React from 'react'

function Description() {
    return (
        <div>
            <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Streamlined for Everyone</h2>
                        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                            Our platform is thoughtfully designed to meet the needs of both clients and workers with intuitive workflows.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition-all hover:shadow-2xl">
                            <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 px-6">
                                <h3 className="text-xl font-semibold">For Clients</h3>
                            </div>
                            <div className="p-8">
                                <div className="mb-8 pb-8 border-b border-gray-100">
                                    <h4 className="text-lg font-semibold mb-4 text-gray-900 flex items-center">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        Find Quality Workers
                                    </h4>
                                    <ul className="space-y-4">
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0 mt-1">
                                                <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <p className="ml-3 text-gray-600">Search for skilled professionals in your area</p>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0 mt-1">
                                                <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <p className="ml-3 text-gray-600">Filter by availability, ratings, and budget</p>
                                        </li>
                                    </ul>
                                </div>

                                <div className="mb-8">
                                    <h4 className="text-lg font-semibold mb-4 text-gray-900 flex items-center">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                        </div>
                                        Project Management
                                    </h4>
                                    <ul className="space-y-4">
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0 mt-1">
                                                <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <p className="ml-3 text-gray-600">Monitor project progress with real-time updates</p>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0 mt-1">
                                                <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <p className="ml-3 text-gray-600">Schedule and manage appointments seamlessly</p>
                                        </li>
                                    </ul>
                                </div>

                                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 font-medium shadow-md hover:shadow-lg">
                                    Discover Client Features
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition-all hover:shadow-2xl">
                            <div className="bg-gradient-to-r from-cyan-500 to-blue-400 text-white py-4 px-6">
                                <h3 className="text-xl font-semibold">For Workers</h3>
                            </div>
                            <div className="p-8">
                                <div className="mb-8 pb-8 border-b border-gray-100">
                                    <h4 className="text-lg font-semibold mb-4 text-gray-900 flex items-center">
                                        <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center mr-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        Professional Profile
                                    </h4>
                                    <ul className="space-y-4">
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0 mt-1">
                                                <svg className="h-5 w-5 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <p className="ml-3 text-gray-600">Showcase your experience and specialties</p>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0 mt-1">
                                                <svg className="h-5 w-5 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <p className="ml-3 text-gray-600">Highlight certifications and qualifications</p>
                                        </li>
                                    </ul>
                                </div>

                                <div className="mb-8">
                                    <h4 className="text-lg font-semibold mb-4 text-gray-900 flex items-center">
                                        <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center mr-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                            </svg>
                                        </div>
                                        Business Growth
                                    </h4>
                                    <ul className="space-y-4">
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0 mt-1">
                                                <svg className="h-5 w-5 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <p className="ml-3 text-gray-600">Track your earnings and performance metrics</p>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0 mt-1">
                                                <svg className="h-5 w-5 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <p className="ml-3 text-gray-600">Build credibility through client reviews</p>
                                        </li>
                                    </ul>
                                </div>

                                <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-400 text-white px-6 py-3 rounded-lg hover:from-cyan-600 hover:to-blue-500 transition-all duration-300 font-medium shadow-md hover:shadow-lg">
                                    Explore Worker Tools
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Description