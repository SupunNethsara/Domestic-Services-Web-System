import React from 'react'

function Footer() {
    return (
        <div>
            <footer className="bg-[#E3F2FD] pt-12 pb-6">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

                        <div>
                            <h4 className="text-xl font-bold text-gray-800 mb-4">HomeHero</h4>
                            <p className="text-gray-600 mb-4">Connecting clients and professionals for seamless collaboration and success.</p>
                            <div className="flex space-x-4">
                                <a href="#" className="text-[#1E88E5] hover:text-[#1976D2] transition duration-300 cursor-pointer">
                                    <i className="fab fa-facebook-f text-lg"></i>
                                </a>
                                <a href="#" className="text-[#1E88E5] hover:text-[#1976D2] transition duration-300 cursor-pointer">
                                    <i className="fab fa-twitter text-lg"></i>
                                </a>
                                <a href="#" className="text-[#1E88E5] hover:text-[#1976D2] transition duration-300 cursor-pointer">
                                    <i className="fab fa-instagram text-lg"></i>
                                </a>
                                <a href="#" className="text-[#1E88E5] hover:text-[#1976D2] transition duration-300 cursor-pointer">
                                    <i className="fab fa-linkedin-in text-lg"></i>
                                </a>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-[#1E88E5] transition duration-300 cursor-pointer">Home</a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-[#1E88E5] transition duration-300 cursor-pointer">About Us</a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-[#1E88E5] transition duration-300 cursor-pointer">Services</a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-[#1E88E5] transition duration-300 cursor-pointer">How It Works</a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-[#1E88E5] transition duration-300 cursor-pointer">Contact</a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold text-gray-800 mb-4">Support</h4>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-[#1E88E5] transition duration-300 cursor-pointer">Help Center</a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-[#1E88E5] transition duration-300 cursor-pointer">FAQ</a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-[#1E88E5] transition duration-300 cursor-pointer">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-[#1E88E5] transition duration-300 cursor-pointer">Terms of Service</a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-[#1E88E5] transition duration-300 cursor-pointer">Cookie Policy</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-gray-800 mb-4">Stay Updated</h4>
                            <p className="text-gray-600 mb-4">Subscribe to our newsletter for the latest updates and features.</p>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="flex-grow px-4 py-2 rounded-l-lg border-none focus:outline-none text-sm"
                                />
                                <button className="bg-[#1E88E5] text-white px-4 py-2 rounded-r-lg hover:bg-[#1976D2] transition duration-300 whitespace-nowrap cursor-pointer">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-[#BBDEFB]">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <p className="text-gray-600 text-sm mb-4 md:mb-0">
                                &copy; {new Date().getFullYear()} DomesticPro. All rights reserved.
                            </p>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center">
                                    <i className="fab fa-cc-visa text-[#1A1F71] text-2xl mr-2"></i>
                                    <i className="fab fa-cc-mastercard text-[#EB001B] text-2xl mr-2"></i>
                                    <i className="fab fa-cc-paypal text-[#003087] text-2xl"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer