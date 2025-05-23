import React from 'react'
import { useNavigate } from 'react-router';

function Header({ isScrolled, toggleMenu, toggleSearch, isSearchOpen, isMenuOpen }) {
    const navigate = useNavigate();
    return (
        <div>
            <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="text-[#1E88E5] font-bold text-2xl mr-8 flex items-center">
                                <i className="fas fa-home-alt mr-2 text-3xl bg-blue-100 p-2 rounded-lg"></i>
                                <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">HomeHero</span>
                            </div>
                            <nav className="hidden md:flex space-x-8">
                                <a href="#" className="text-gray-700 hover:text-[#1E88E5] font-medium transition duration-300 cursor-pointer">Home</a>
                                <a href="#" className="text-gray-700 hover:text-[#1E88E5] font-medium transition duration-300 cursor-pointer">Services</a>
                                <a href="#" className="text-gray-700 hover:text-[#1E88E5] font-medium transition duration-300 cursor-pointer">About</a>
                                <a href="#" className="text-gray-700 hover:text-[#1E88E5] font-medium transition duration-300 cursor-pointer">Contact</a>
                            </nav>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="relative hidden md:block">
                                <button
                                    onClick={toggleSearch}
                                    className="text-gray-600 hover:text-[#1E88E5] transition duration-300 cursor-pointer"
                                >
                                    <i className="fas fa-search"></i>
                                </button>
                                {isSearchOpen && (
                                    <div className="absolute right-0 top-10 mt-2 w-64 bg-white rounded-lg shadow-lg p-2 z-10">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Search..."
                                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#BBDEFB] focus:outline-none focus:border-[#1E88E5] text-sm"
                                            />
                                            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <button className="bg-white text-[#1E88E5] border border-[#1E88E5] px-4 py-2 rounded-button hover:bg-[#F5F9FF] transition duration-300 whitespace-nowrap cursor-pointer">
                                Login
                            </button>
                            <button onClick={() => navigate("/Welcome")} className="bg-[#1E88E5] text-white px-4 py-2 rounded-button hover:bg-[#1976D2] transition duration-300 whitespace-nowrap cursor-pointer">
                                Register
                            </button>
                            <button
                                onClick={toggleMenu}
                                className="md:hidden text-gray-700 hover:text-[#1E88E5] transition duration-300 cursor-pointer"
                            >
                                <i className="fas fa-bars text-xl"></i>
                            </button>
                        </div>
                    </div>
                    {isMenuOpen && (
                        <div className="md:hidden bg-blue-500 text-white p-5 mt-4 pb-4">
                            <nav className="flex flex-col space-y-3">
                                <a href="#" className=" hover:text-[#1E88E5] font-medium transition duration-300 cursor-pointer">Home</a>
                                <a href="#" className=" hover:text-[#1E88E5] font-medium transition duration-300 cursor-pointer">Services</a>
                                <a href="#" className=" hover:text-[#1E88E5] font-medium transition duration-300 cursor-pointer">About</a>
                                <a href="#" className=" hover:text-[#1E88E5] font-medium transition duration-300 cursor-pointer">Contact</a>
                                <div className="relative mt-2">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#BBDEFB] focus:outline-none focus:border-[#1E88E5] text-sm"
                                    />
                                    <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                                </div>
                            </nav>
                        </div>
                    )}
                </div>
            </header>
        </div>
    )
}

export default Header