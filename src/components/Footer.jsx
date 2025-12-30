import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../assets/NCS_Logo.png';
// 1. Import the background pattern image
import FooterPattern from '../assets/pattern.png';

const Footer = () => {
  return (
    // 2. Set footer to relative and hide overflow so background doesn't spill out
    <footer className="relative bg-brand-charcoal text-gray-300 pt-16 pb-8 border-t border-brand-rose overflow-hidden">

      {/* --- Background Layers --- */}

      {/* Layer 1: The Pattern Image */}
      <div
        className="absolute inset-0 z-0 opacity-70" // Low opacity for the pattern itself so it's subtle
        style={{
          backgroundImage: `url(${FooterPattern})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '300px auto', // Adjust this value to make the gears bigger or smaller
          backgroundPosition: 'center'
        }}
      ></div>

      {/* Layer 2: The Dull Dark Overlay */}
      {/* High opacity (95%) charcoal layer to make the background very dull and ensure text readability */}
      <div className="absolute inset-0 z-0 bg-brand-charcoal/60"></div>


      {/* --- Content --- */}

      {/* 3. Wrap content in relative z-10 to place it ON TOP of background layers */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

        {/* 1. Brand Info Column (Logo + Text) */}
        <div>
          {/* Logo Image */}
          <Link to="/" className="block mb-6">
            <img
              src={Logo}
              alt="Nexora Creative Solutions"
              // Note: h-25 is not a standard Tailwind class. If it doesn't work, use h-24 or h-[100px]
              className="h-25 w-auto object-contain"
            />
          </Link>

          <p className="text-sm leading-relaxed mb-4">
            Transforming ideas into digital reality with cutting-edge technology and expert solutions.
          </p>
        </div>

        {/* 2. Quick Links */}
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

        {/* 3. Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2"><Phone size={16} className="text-brand-rose"/> +254 115 332 870</li>
            <li className="flex items-center gap-2"><Mail size={16} className="text-brand-rose"/> info@nexoracreatives.co.ke</li>
            <li className="flex items-center gap-2"><MapPin size={16} className="text-brand-rose"/> Thika, Kiambu, Kenya</li>
          </ul>
        </div>

        {/* 4. Newsletter */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Newsletter</h3>
          <div className="flex flex-col gap-3">
            <input type="email" placeholder="Email Address" className="bg-gray-800 text-white p-3 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-brand-rose border border-gray-700 placeholder-gray-500 bg-opacity-50" />
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
      {/* Ensure copyright area is also z-10 */}
      <div className="relative z-10 text-center border-t border-gray-800 pt-8 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Nexora Creative Solutions. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;