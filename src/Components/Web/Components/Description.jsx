import React from 'react'

function Description() {
  return (
    <div>
           <section className="py-16 bg-[#F5F9FF]">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">See How It Works</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Experience our intuitive platform designed for both clients and workers.</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="bg-[#1E88E5] text-white py-3 px-4">
                                <h3 className="text-lg font-medium">Client Dashboard</h3>
                            </div>
                            <div className="p-6">
                                <div className="mb-6 border-b border-gray-200 pb-6">
                                    <h4 className="text-lg font-semibold mb-3 text-gray-800">Find Work Near You</h4>
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="bg-[#E3F2FD] p-2 rounded-lg">
                                            <i className="fas fa-map-marker-alt text-[#1E88E5]"></i>
                                        </div>
                                        <p className="text-gray-600">Search for jobs in your neighborhood</p>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-[#E3F2FD] p-2 rounded-lg">
                                            <i className="fas fa-filter text-[#1E88E5]"></i>
                                        </div>
                                        <p className="text-gray-600">Filter by availability and price range</p>
                                    </div>
                                </div>
                                <div className="mb-6 border-b border-gray-200 pb-6">
                                    <h4 className="text-lg font-semibold mb-3 text-gray-800">Manage Your Projects</h4>
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="bg-[#E3F2FD] p-2 rounded-lg">
                                            <i className="fas fa-tasks text-[#1E88E5]"></i>
                                        </div>
                                        <p className="text-gray-600">Track project progress in real-time</p>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-[#E3F2FD] p-2 rounded-lg">
                                            <i className="fas fa-calendar-alt text-[#1E88E5]"></i>
                                        </div>
                                        <p className="text-gray-600">Schedule meetings and set deadlines</p>
                                    </div>
                                </div>
                                <button className="bg-[#1E88E5] text-white px-4 py-2 rounded-button hover:bg-[#1976D2] transition duration-300 whitespace-nowrap cursor-pointer">
                                    Explore Client Features
                                </button>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="bg-[#64B5F6] text-white py-3 px-4">
                                <h3 className="text-lg font-medium">Worker Dashboard</h3>
                            </div>
                            <div className="p-6">
                                <div className="mb-6 border-b border-gray-200 pb-6">
                                    <h4 className="text-lg font-semibold mb-3 text-gray-800">Create Your Work Profile</h4>
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="bg-[#E3F2FD] p-2 rounded-lg">
                                            <i className="fas fa-user-circle text-[#1E88E5]"></i>
                                        </div>
                                        <p className="text-gray-600">List your experience and preferred work types</p>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-[#E3F2FD] p-2 rounded-lg">
                                            <i className="fas fa-certificate text-[#1E88E5]"></i>
                                        </div>
                                        <p className="text-gray-600">Highlight your skills and certifications</p>
                                    </div>
                                </div>
                                <div className="mb-6 border-b border-gray-200 pb-6">
                                    <h4 className="text-lg font-semibold mb-3 text-gray-800">Grow Your Business</h4>
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="bg-[#E3F2FD] p-2 rounded-lg">
                                            <i className="fas fa-chart-line text-[#1E88E5]"></i>
                                        </div>
                                        <p className="text-gray-600">Track your performance and earnings</p>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-[#E3F2FD] p-2 rounded-lg">
                                            <i className="fas fa-star-half-alt text-[#1E88E5]"></i>
                                        </div>
                                        <p className="text-gray-600">Collect reviews to build your reputation</p>
                                    </div>
                                </div>
                                <button className="bg-[#64B5F6] text-white px-4 py-2 rounded-button hover:bg-[#42A5F5] transition duration-300 whitespace-nowrap cursor-pointer">
                                    Explore Worker Features
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