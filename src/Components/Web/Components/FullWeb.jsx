import React, { useState, useEffect } from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import FutureShowCase from './FutureShowCase';
import Description from './Description';
import Testimonal from './Testimonal';
import Benefits from './Benefits';
import Footer from './Footer';

const FullWeb = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const testimonials = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Business Owner",
            image: "https://readdy.ai/api/search-image?query=professional%20business%20woman%20portrait%20with%20short%20brown%20hair%2C%20blue%20background%2C%20professional%20headshot%2C%20high%20quality%2C%208k%2C%20photorealistic%2C%20soft%20lighting%2C%20professional%20attire&width=100&height=100&seq=1&orientation=squarish",
            quote: "This platform has completely transformed how I find and collaborate with professionals. The communication tools are seamless and intuitive.",
            rating: 5
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Freelance Designer",
            image: "https://readdy.ai/api/search-image?query=professional%20asian%20man%20portrait%20with%20glasses%2C%20blue%20background%2C%20professional%20headshot%2C%20high%20quality%2C%208k%2C%20photorealistic%2C%20soft%20lighting%2C%20professional%20attire&width=100&height=100&seq=2&orientation=squarish",
            quote: "As a freelancer, finding reliable clients was always challenging until I discovered this platform. The review system helps build trust quickly.",
            rating: 5
        },
        {
            id: 3,
            name: "Emily Rodriguez",
            role: "Project Manager",
            image: "https://readdy.ai/api/search-image?query=professional%20latina%20woman%20portrait%20with%20long%20dark%20hair%2C%20blue%20background%2C%20professional%20headshot%2C%20high%20quality%2C%208k%2C%20photorealistic%2C%20soft%20lighting%2C%20professional%20attire&width=100&height=100&seq=3&orientation=squarish",
            quote: "The platform's intuitive design makes project management a breeze. I can easily communicate with my team and track progress in real-time.",
            rating: 4
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    const handlePrevTestimonial = () => {
        setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const handleNextTestimonial = () => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    return (
        <div className="min-h-screen bg-white text-gray-800 font-sans">
            <Header isScrolled={isScrolled} toggleMenu={toggleMenu} toggleSearch={toggleSearch} isSearchOpen={isSearchOpen} isMenuOpen={isMenuOpen} />
            <HeroSection/>
            <FutureShowCase/>
            <Description/>
            <Testimonal activeTestimonial={activeTestimonial} testimonials={testimonials} handlePrevTestimonial={handlePrevTestimonial} handleNextTestimonial={handleNextTestimonial}/>
            <Benefits/>
            <Footer/>

           
        </div>
    );
}; export default FullWeb