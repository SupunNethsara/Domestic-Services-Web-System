import React from 'react'

function FutureShowCase() {
  return (
    <div>
        
            {/* Features Showcase */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Simple Tools to Help You Succeed</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Everything you need to find work, manage your schedule, and earn from home - all in one place.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   
                        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 text-center">
                            <div className="w-20 h-20 bg-[#E3F2FD] rounded-full flex items-center justify-center mx-auto mb-6">
                                <i className="fas fa-comments text-[#1E88E5] text-3xl"></i>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Easy Communication</h3>
                            <p className="text-gray-600">
                                Simple chat system to talk with employers. Get job details, share your availability, and confirm schedules easily through messages.
                            </p>
                        </div>
                     
                        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 text-center">
                            <div className="w-20 h-20 bg-[#E3F2FD] rounded-full flex items-center justify-center mx-auto mb-6">
                                <i className="fas fa-share-alt text-[#1E88E5] text-3xl"></i>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Find Daily Work</h3>
                            <p className="text-gray-600">
                                Browse available jobs in your area, set your working hours, and choose opportunities that fit your schedule and skills.
                            </p>
                        </div>
                       <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 text-center">
                            <div className="w-20 h-20 bg-[#E3F2FD] rounded-full flex items-center justify-center mx-auto mb-6">
                                <i className="fas fa-star text-[#1E88E5] text-3xl"></i>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Review & Rating System</h3>
                            <p className="text-gray-600">
                                Build trust through our comprehensive review system. Rate your experience, leave detailed feedback, and make informed decisions.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
    </div>
  )
}

export default FutureShowCase