import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react'; // ShoppingBag is already imported
import Logo from '../assets/NCS_Secondary_Logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Define menu items for cleaner mapping
  const navLinks = ['Home', 'About', 'Services', 'Projects', 'Blogs', 'Pricing'];

  return (
    // BG is Charcoal, Text is White
    <nav className="bg-brand-white text-brand-charcoal fixed w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo Section */}
          <Link to="/" className="flex items-center">
            <img 
              src={Logo} 
              alt="Nexora Creative Solutions" 
              className="h-20 md:h-20 w-auto object-contain py-2" 
            />
          </Link>
          
          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((item) => (
              <Link 
                key={item} 
                to={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`} 
                className="text-brand-charcoal hover:text-brand-rose transition-colors font-medium"
              >
                {item}
              </Link>
            ))}

            {/* --- NEW STORE LINK (Desktop) --- */}
            <Link 
              to="/shop" 
              className="text-brand-charcoal hover:text-brand-rose transition-colors font-medium flex items-center gap-1"
            >
              <ShoppingBag size={18} />
              <span>Store</span>
            </Link>

            {/* Quote Button */}
            <Link 
              to="/contact" 
              className="bg-brand-rose px-6 py-2 rounded-full text-white font-medium hover:bg-white hover:text-brand-rose transition border border-brand-rose"
            >
              Get A Quote
            </Link>
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
          {/* Standard Links */}
          {navLinks.map((item) => (
            <Link 
              key={item} 
              to={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`} 
              className="block py-3 text-white hover:text-brand-rose border-b border-gray-700" 
              onClick={() => setIsOpen(false)}
            >
              {item}
            </Link>
          ))}

          {/* --- NEW STORE LINK (Mobile) --- */}
          <Link 
            to="/shop" 
            className="flex items-center gap-2 py-3 text-white hover:text-brand-rose border-b border-gray-700" 
            onClick={() => setIsOpen(false)}
          >
            <ShoppingBag size={18} />
            Store
          </Link>

          {/* Mobile Quote Link */}
          <Link 
            to="/contact" 
            className="block py-3 text-brand-rose font-bold" 
            onClick={() => setIsOpen(false)}
          >
            Get A Quote
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;