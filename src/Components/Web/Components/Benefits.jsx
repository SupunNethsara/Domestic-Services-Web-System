import React from 'react'

function Benefits() {
    return (
        <div>
            <section className="py-16 bg-[#F5F9FF]">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Join Our Platform?</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Discover the benefits for both clients and professionals.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        <div className="bg-white rounded-xl shadow-md p-8">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-[#E3F2FD] rounded-full flex items-center justify-center mr-4">
                                    <i className="fas fa-user-tie text-[#1E88E5] text-xl"></i>
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-800">For Clients</h3>
                            </div>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start">
                                    <i className="fas fa-check-circle text-[#1E88E5] mt-1 mr-3"></i>
                                    <span className="text-gray-700">Access to a wide network of verified professionals</span>
                                </li>
                                <li className="flex items-start">
                                    <i className="fas fa-check-circle text-[#1E88E5] mt-1 mr-3"></i>
                                    <span className="text-gray-700">Transparent review system to make informed decisions</span>
                                </li>
                                <li className="flex items-start">
                                    <i className="fas fa-check-circle text-[#1E88E5] mt-1 mr-3"></i>
                                    <span className="text-gray-700">Secure payment processing and dispute resolution</span>
                                </li>
                                <li className="flex items-start">
                                    <i className="fas fa-check-circle text-[#1E88E5] mt-1 mr-3"></i>
                                    <span className="text-gray-700">Streamlined communication and project management</span>
                                </li>
                                <li className="flex items-start">
                                    <i className="fas fa-check-circle text-[#1E88E5] mt-1 mr-3"></i>
                                    <span className="text-gray-700">Dedicated support for all your questions and needs</span>
                                </li>
                            </ul>
                            <button className="bg-[#1E88E5] text-white px-6 py-3 rounded-button hover:bg-[#1976D2] transition duration-300 whitespace-nowrap cursor-pointer">
                                Register as Client
                            </button>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-8">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-[#E3F2FD] rounded-full flex items-center justify-center mr-4">
                                    <i className="fas fa-tools text-[#1E88E5] text-xl"></i>
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-800">For Workers</h3>
                            </div>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start">
                                    <i className="fas fa-check-circle text-[#1E88E5] mt-1 mr-3"></i>
                                    <span className="text-gray-700">Showcase your skills and build a professional portfolio</span>
                                </li>
                                <li className="flex items-start">
                                    <i className="fas fa-check-circle text-[#1E88E5] mt-1 mr-3"></i>
                                    <span className="text-gray-700">Connect with clients looking for your specific expertise</span>
                                </li>
                                <li className="flex items-start">
                                    <i className="fas fa-check-circle text-[#1E88E5] mt-1 mr-3"></i>
                                    <span className="text-gray-700">Reliable payment system with on-time processing</span>
                                </li>
                                <li className="flex items-start">
                                    <i className="fas fa-check-circle text-[#1E88E5] mt-1 mr-3"></i>
                                    <span className="text-gray-700">Collect reviews to enhance your professional reputation</span>
                                </li>
                                <li className="flex items-start">
                                    <i className="fas fa-check-circle text-[#1E88E5] mt-1 mr-3"></i>
                                    <span className="text-gray-700">Flexible scheduling and work management tools</span>
                                </li>
                            </ul>
                            <button className="bg-[#64B5F6] text-white px-6 py-3 rounded-button hover:bg-[#42A5F5] transition duration-300 whitespace-nowrap cursor-pointer">
                                Join as Worker
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Benefits