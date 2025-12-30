import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom'; // Ideally use Link instead of a href for internal nav

const Footer = () => {
  return (
    <footer className="bg-brand-charcoal text-gray-300 pt-16 pb-8 border-t border-brand-rose">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Nexora<span className="text-brand-rose">.</span></h2>
          <p className="text-sm leading-relaxed">Transforming ideas into digital reality with cutting-edge technology and expert solutions.</p>
        </div>
        
        {/* Quick Links - Added Blogs Here */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-brand-rose transition">About Us</Link></li>
            <li><Link to="/services" className="hover:text-brand-rose transition">Services</Link></li>
            <li><Link to="/projects" className="hover:text-brand-rose transition">Projects</Link></li>
            <li><Link to="/team" className="hover:text-brand-rose transition">Our Team</Link></li>
            <li><Link to="/blogs" className="hover:text-brand-rose transition">Blogs</Link></li>
            <li><Link to="/careers" className="hover:text-brand-rose transition">Careers</Link></li>
            <li><Link to="/contact" className="hover:text-brand-rose transition">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2"><Phone size={16} className="text-brand-rose"/> +254 115 332 870</li>
            <li className="flex items-center gap-2"><Mail size={16} className="text-brand-rose"/> info@nexoracreatives.co.ke</li>
            <li className="flex items-center gap-2"><MapPin size={16} className="text-brand-rose"/> Nairobi, Kenya</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Newsletter</h3>
          <div className="flex flex-col gap-3">
            <input type="email" placeholder="Email Address" className="bg-gray-800 text-white p-3 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-brand-rose border border-gray-700" />
            <button className="bg-brand-rose text-white font-bold py-2 rounded-md hover:bg-white hover:text-brand-rose transition">Subscribe</button>
          </div>
          <div className="flex gap-4 mt-6">
            <Facebook size={20} className="hover:text-brand-rose cursor-pointer transition"/>
            <Twitter size={20} className="hover:text-brand-rose cursor-pointer transition"/>
            <Instagram size={20} className="hover:text-brand-rose cursor-pointer transition"/>
            <Linkedin size={20} className="hover:text-brand-rose cursor-pointer transition"/>
          </div>
        </div>
      </div>
      <div className="text-center border-t border-gray-800 pt-8 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Nexora Creative Solutions. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;