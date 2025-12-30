import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // BG is Charcoal, Text is White
    <nav className="bg-brand-white text-brand-charcoal fixed w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-charcoal">
            Nexora<span className="text-brand-rose">.</span>
          </Link>
          
          {/* Desktop Links - White text, Rose on Hover */}
          <div className="hidden md:flex space-x-8 items-center">
            {['Home', 'About', 'Services', 'Projects', 'Blogs', 'Pricing', 'Contact'].map((item) => (
              <Link key={item} to={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`} className="text-brand-charcoal hover:text-brand-rose transition-colors font-medium">
                {item}
              </Link>
            ))}
            <button className="bg-brand-rose px-6 py-2 rounded-full text-white font-medium hover:bg-white hover:text-brand-rose transition">
              Get A Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-brand-charcoal hover:text-brand-rose">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-brand-charcoal border-t border-gray-700 pb-4 px-4">
          {['Home', 'About', 'Services', 'Projects', 'Blogs', 'Pricing', 'Contact'].map((item) => (
            <Link key={item} to={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`} className="block py-3 text-white hover:text-brand-rose border-b border-gray-700" onClick={() => setIsOpen(false)}>
              {item}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;