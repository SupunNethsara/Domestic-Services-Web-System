import React from 'react'

function HeroSection() {
    return (
        <div>
            <section className="relative min-h-screen flex items-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50"></div>
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[url('https://readdy.ai/api/search-image?query=warm%20and%20welcoming%20home%20environment%20with%20natural%20light%20streaming%20through%20windows%2C%20modern%20minimalist%20interior%20with%20soft%20blue%20accents%2C%20people%20working%20together%20in%20harmony&width=1440&height=900&seq=8&orientation=landscape')] bg-cover bg-center opacity-30"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/10 to-transparent"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="max-w-2xl">
                            <div className="inline-block mb-4 px-4 py-1 bg-blue-100 rounded-full animate-pulse">
                                <span className="text-blue-600 font-medium flex items-center">
                                    <i className="fas fa-home-alt mr-2"></i>
                                    Find Trusted Home-Based Work
                                </span>
                            </div>

                            <h1 className="text-5xl md:text-5xl font-bold mb-6 leading-tight">
                                <span className="text-gray-800">
                                    Transform Your Skills Into
                                </span>
                                <br />
                                <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                                    Stable Income
                                </span>
                            </h1>

                            <p className="text-lg text-gray-700 mb-8 max-w-xl leading-relaxed">
                                Join thousands of home workers earning a reliable income.
                                Whether you're skilled in cleaning, cooking, caregiving, or home
                                maintenance - there's an opportunity waiting for you.
                            </p>

                            <div className="space-y-6">
                                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                    <button className="group relative bg-blue-600 text-white px-8 py-4 rounded-button overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center justify-center">
                                        <span className="relative z-10 flex items-center">
                                            <i className="fas fa-user-plus mr-2"></i>
                                            Start Working Today
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                                    </button>
                                    <button className="group relative bg-white text-blue-600 px-8 py-4 rounded-button overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center justify-center border border-blue-100">
                                        <span className="relative z-10 flex items-center">
                                            <i className="fas fa-search mr-2"></i>
                                            Browse Opportunities
                                        </span>
                                        <div className="absolute inset-0 bg-blue-50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                                    </button>
                                </div>

                                <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-100">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600 mb-1">
                                            5000+
                                        </div>
                                        <div className="text-sm text-gray-600">Active Workers</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600 mb-1">
                                            95%
                                        </div>
                                        <div className="text-sm text-gray-600">Success Rate</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600 mb-1">
                                            24/7
                                        </div>
                                        <div className="text-sm text-gray-600">Support</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="hidden lg:block relative">
                            <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
                            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-200 rounded-full opacity-20 animate-pulse delay-300"></div>
                            <div className="relative bg-white p-6 rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
                                <div className="absolute -top-4 -right-4 bg-blue-100 rounded-full p-3">
                                    <i className="fas fa-star text-blue-600 text-xl"></i>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                    Featured Opportunities
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                        <div className="bg-blue-100 rounded-full p-2 mr-3">
                                            <i className="fas fa-home text-blue-600"></i>
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-800">
                                                House Cleaning
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                $25-35/hr • Flexible Schedule
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                        <div className="bg-blue-100 rounded-full p-2 mr-3">
                                            <i className="fas fa-utensils text-blue-600"></i>
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-800">
                                                Personal Chef
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                $30-50/hr • Part-time
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                        <div className="bg-blue-100 rounded-full p-2 mr-3">
                                            <i className="fas fa-baby text-blue-600"></i>
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-800">Childcare</div>
                                            <div className="text-sm text-gray-600">
                                                $20-30/hr • Full-time
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0">
                    <div className="h-24 bg-gradient-to-t from-white to-transparent"></div>
                    <div className="h-1 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100"></div>
                </div>
            </section>
        </div>
    )
}

export default HeroSection