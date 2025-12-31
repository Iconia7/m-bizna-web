import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; 
import { db } from '../firebase'; // Ensure this path is correct
import emailjs from '@emailjs/browser';
import Logo from '../assets/NCS_Logo.png'; // Ensure you are using the correct logo file
import FooterPattern from '../assets/pattern.png';

const Footer = () => {
  // 1. State for Newsletter Logic
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [message, setMessage] = useState('');

  // 2. Handle Subscribe Function
  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
        setMessage('Please enter a valid email.');
        setStatus('error');
        return;
    }

    setStatus('loading');
    setMessage('');

    try {
        // A. Save to Firebase
        await addDoc(collection(db, "newsletter_subscribers"), {
            email: email,
            timestamp: serverTimestamp(),
            source: 'Footer'
        });

        // B. Send Email via EmailJS (Optional: Create a specific template for Newsletter)
        // You can use the same keys as before, or create a new template for "Newsletter Subscription"
        const serviceID = "service_nhwsclu"; 
        const templateID = "template_7i8obf5"; 
        const publicKey = "ctUKvg88_0Th5sfKn";

        const templateParams = {
            user_email: email, 
            message: "New Newsletter Subscription from Footer"
        };

        await emailjs.send(serviceID, templateID, templateParams, publicKey);

        setStatus('success');
        setEmail('');
        setMessage('Thanks for subscribing!');
        
        // Reset status after 3 seconds so the user can see the form again if needed
        setTimeout(() => {
            setStatus('idle');
            setMessage('');
        }, 3000);

    } catch (error) {
        console.error("Error: ", error);
        setStatus('error');
        setMessage('Error. Please try again.');
    }
  };

  return (
    <footer className="relative bg-brand-charcoal text-gray-300 pt-16 pb-8 border-t border-brand-rose overflow-hidden">

      {/* --- Background Layers --- */}
      <div
        className="absolute inset-0 z-0 opacity-70"
        style={{
          backgroundImage: `url(${FooterPattern})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '300px auto',
          backgroundPosition: 'center'
        }}
      ></div>

      <div className="absolute inset-0 z-0 bg-brand-charcoal/60"></div>

      {/* --- Content --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

        {/* 1. Brand Info Column */}
        <div>
          <Link to="/" className="block mb-6">
            <img
              src={Logo}
              alt="Nexora Creative Solutions"
              className="h-20 w-auto object-contain"
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

        {/* 4. Newsletter (FUNCTIONAL) */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Newsletter</h3>
          
          <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
            <input 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading' || status === 'success'}
                className="bg-gray-800 text-white p-3 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-brand-rose border border-gray-700 placeholder-gray-500 bg-opacity-50 disabled:opacity-50" 
            />
            
            <button 
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className={`font-bold py-2 rounded-md transition flex items-center justify-center gap-2 ${
                    status === 'success' 
                    ? 'bg-green-600 text-white cursor-default' 
                    : 'bg-brand-rose text-white hover:bg-white hover:text-brand-rose'
                }`}
            >
                {status === 'loading' ? <Loader2 className="animate-spin" size={18} /> : 
                 status === 'success' ? <><CheckCircle size={18}/> Subscribed</> : 
                 'Subscribe'}
            </button>

            {/* Status Message */}
            {message && (
                <p className={`text-xs mt-1 ${status === 'error' ? 'text-red-400' : 'text-green-400'}`}>
                    {status === 'error' && <AlertCircle size={12} className="inline mr-1"/>}
                    {message}
                </p>
            )}
          </form>

          <div className="flex gap-4 mt-6">
            <a href="#" className="hover:text-brand-rose transition"><Facebook size={20} /></a>
            <a href="#" className="hover:text-brand-rose transition"><Twitter size={20} /></a>
            <a href="#" className="hover:text-brand-rose transition"><Instagram size={20} /></a>
            <a href="#" className="hover:text-brand-rose transition"><Linkedin size={20} /></a>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="relative z-10 border-t border-gray-800 pt-8 mt-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Left Side: Copyright */}
          <div className="text-sm text-gray-500 text-center md:text-left">
            &copy; {new Date().getFullYear()} Nexora Creative Solutions. All Rights Reserved.
          </div>

          {/* Right Side: Legal Links */}
          <div className="flex gap-6 text-sm font-medium">
            <Link 
              to="/privacy" 
              className="text-gray-400 hover:text-brand-rose transition-colors relative group"
            >
              Privacy Policy
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-rose transition-all group-hover:w-full"></span>
            </Link>
            
            <Link 
              to="/terms" 
              className="text-gray-400 hover:text-brand-rose transition-colors relative group"
            >
              Terms & Conditions
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-rose transition-all group-hover:w-full"></span>
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;