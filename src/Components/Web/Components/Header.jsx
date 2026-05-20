import React from 'react'
import { useNavigate } from 'react-router';

function Header({ isScrolled, toggleMenu, toggleSearch, isSearchOpen, isMenuOpen }) {
    const navigate = useNavigate();
    return (
        <header className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-slate-200/60' : 'bg-transparent'}`}>
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="flex items-center mr-10">
                            <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center mr-2.5 shadow-lg shadow-indigo-200">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                </svg>
                            </div>
                            <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">HomeHero</span>
                        </div>
                        <nav className="hidden md:flex items-center space-x-1">
                            {['Home', 'Services', 'About', 'Contact'].map(item => (
                                <a key={item} href="#" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isScrolled ? 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50' : 'text-slate-200 hover:text-white hover:bg-white/10'}`}>
                                    {item}
                                </a>
                            ))}
                        </nav>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative hidden md:block">
                            <button onClick={toggleSearch} className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 ${isScrolled ? 'text-slate-500 hover:text-indigo-600 hover:bg-indigo-50' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                            {isSearchOpen && (
                                <div className="absolute right-0 top-12 w-72 bg-white rounded-2xl shadow-2xl shadow-slate-200/80 border border-slate-100 z-10 overflow-hidden">
                                    <div className="p-3">
                                        <div className="relative">
                                            <input type="text" placeholder="Search services..." className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 text-sm transition-all" autoFocus />
                                            <svg className="absolute left-3 top-3 h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                        <div className="mt-2 space-y-0.5">
                                            {['House Cleaning', 'Personal Chef', 'Childcare', 'Gardening'].map(s => (
                                                <div key={s} className="px-3 py-2 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg cursor-pointer transition-colors">{s}</div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="bg-slate-50 px-3 py-2 border-t border-slate-100 flex justify-between text-xs text-slate-400">
                                        <span>Press Esc to close</span>
                                        <span>↑↓ navigate</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button onClick={() => navigate("/login")} className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ${isScrolled ? 'border-indigo-200 text-indigo-600 hover:bg-indigo-50' : 'border-white/20 text-white hover:bg-white/10'}`}>
                            Login
                        </button>

                        <button onClick={() => navigate("/Welcome")} className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl text-sm font-semibold shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all duration-200">
                            Get Started
                        </button>

                        <button onClick={toggleMenu} className={`md:hidden w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${isScrolled ? 'text-slate-600 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden mt-4 p-4 bg-white rounded-2xl shadow-xl border border-slate-100">
                        <nav className="flex flex-col space-y-1 mb-4">
                            {['Home', 'Services', 'About', 'Contact'].map(item => (
                                <a key={item} href="#" className="px-4 py-2.5 rounded-xl text-slate-700 font-medium hover:text-indigo-600 hover:bg-indigo-50 transition-colors">{item}</a>
                            ))}
                        </nav>
                        <div className="relative">
                            <input type="text" placeholder="Search services..." className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 text-sm" />
                            <svg className="absolute left-3 top-3 h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header