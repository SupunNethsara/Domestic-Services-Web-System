import React from 'react'

function Testimonal({activeTestimonial , testimonials ,handlePrevTestimonial , handleNextTestimonial}) {
  return (
    <div>
           <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Users Say</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Hear from clients and professionals who have transformed their work through our platform.</p>
                    </div>
                    <div className="relative max-w-4xl mx-auto">
                        <div className="overflow-hidden">
                            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
                                {testimonials.map((testimonial) => (
                                    <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                                        <div className="bg-[#F5F9FF] rounded-xl p-8 shadow-md">
                                            <div className="flex items-center mb-6">
                                                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#64B5F6] mr-4">
                                                    <img
                                                        src={testimonial.image}
                                                        alt={testimonial.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-semibold text-gray-800">{testimonial.name}</h4>
                                                    <p className="text-gray-600">{testimonial.role}</p>
                                                    <div className="flex mt-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <i
                                                                key={i}
                                                                className={`fas fa-star ${i < testimonial.rating ? 'text-yellow-500' : 'text-gray-300'} text-sm`}
                                                            ></i>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button
                            onClick={handlePrevTestimonial}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-[#1E88E5] hover:bg-[#F5F9FF] transition duration-300 cursor-pointer z-10"
                        >
                            <i className="fas fa-chevron-left"></i>
                        </button>
                        <button
                            onClick={handleNextTestimonial}
                            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-[#1E88E5] hover:bg-[#F5F9FF] transition duration-300 cursor-pointer z-10"
                        >
                            <i className="fas fa-chevron-right"></i>
                        </button>
                        <div className="flex justify-center mt-6 space-x-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveTestimonial(index)}
                                    className={`w-3 h-3 rounded-full transition-colors duration-300 cursor-pointer ${index === activeTestimonial ? 'bg-[#1E88E5]' : 'bg-gray-300'}`}
                                ></button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
    </div>
  )
}

export default Testimonal