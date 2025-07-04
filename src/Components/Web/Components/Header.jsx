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
                                    <div className="absolute right-0 top-12 mt-1 w-72 bg-white rounded-xl shadow-xl z-10 overflow-hidden animate-fade-in">
                                        <div className="p-2">
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    placeholder="Search..."
                                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E88E5]/50 focus:border-transparent text-sm transition-all duration-200 shadow-sm"
                                                    autoFocus
                                                />
                                                <svg
                                                    className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                            </div>
                                            <div className="mt-2 space-y-1">
                                                <div className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
                                                    Recent searches
                                                </div>
                                                <div className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
                                                    Popular topics
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 px-3 py-2 border-t border-gray-100 flex justify-between text-xs text-gray-500">
                                            <span>Press Esc to close</span>
                                            <span>↑↓ to navigate</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => navigate("/login")}
                                    className="relative overflow-hidden group bg-transparent text-[#1E88E5] border-2 border-[#1E88E5] px-6 py-2.5 rounded-full hover:bg-[#1E88E5]/5 transition-all duration-300 whitespace-nowrap font-medium text-sm shadow-sm hover:shadow-md"
                                >
                                    <span className="relative z-10">Login</span>
                                    <span className="absolute inset-0 bg-[#1E88E5] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                                </button>

                                <button
                                    onClick={() => navigate("/Welcome")}
                                    className="relative overflow-hidden group bg-gradient-to-r from-[#1E88E5] to-[#0D47A1] text-white px-6 py-2.5 rounded-full hover:shadow-lg transition-all duration-300 whitespace-nowrap font-medium text-sm shadow-md hover:translate-y-[-2px]"
                                >
                                    <span className="relative z-10">Get Started</span>
                                    <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                </button>
                            </div>
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