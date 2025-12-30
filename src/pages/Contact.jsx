import React from 'react';
import { Phone, Mail, Clock, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // <--- Import Link
import picture from '../assets/pattern.png';

const Contact = () => {
  return (
    <div className="pt-20">
      
      {/* 1. Header Section - Image with Overlay */}
            <section className="relative py-24 text-center text-white overflow-hidden">
              
              {/* Background Image Layer */}
              <div className="absolute inset-0 z-0">
                {/* You can change this image URL to a specific one for each page if you want */}
                <img 
                  src={picture}
                  alt="Background" 
                  className="w-full h-full object-cover"
                />
                {/* Dark Overlay (85% Opacity) - This makes it "dull" and readable */}
                <div className="absolute inset-0 bg-brand-charcoal/55"></div>
              </div>
      
              {/* Content Layer */}
              <div className="relative z-10 max-w-4xl mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 font-creative">
                  {/* CHANGE THIS TITLE PER PAGE */}
                  Contact Us
                </h1>
                <div className="flex justify-center gap-2 text-gray-300 text-sm font-medium">
                  <Link to="/" className="hover:text-white transition-colors">Home</Link> / 
                  {/* CHANGE THIS BREADCRUMB PER PAGE */}
                  <span className="text-brand-rose">Contact Us</span>
                </div>
              </div>
            </section>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-3 gap-10">
          
          {/* 2. Contact Info Card - Dark Blue Theme */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 bg-brand-charcoal text-white p-10 rounded-3xl relative overflow-hidden shadow-2xl"
          >
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-8">Contact Info</h3>
              <p className="text-gray-300 mb-8">Fill up the form and our Team will get back to you within 24 hours.</p>
              
              <div className="space-y-8">
                {[
                  { icon: <MapPin size={24}/>, label: "Address", text: "Thika, Kiambu, Kenya" },
                  { icon: <Phone size={24}/>, label: "Phone", text: "+254 115 332 870" },
                  { icon: <Mail size={24}/>, label: "Email", text: "hello@nexoracreatives.co.ke" },
                  { icon: <Clock size={24}/>, label: "Open Time", text: "Mon - Sat: 07:00 - 19:00" }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ x: 10 }}
                    className="flex items-start gap-4 group cursor-default"
                  >
                    <div className="text-brand-rose group-hover:scale-110 transition-transform">{item.icon}</div>
                    <div>
                      <span className="font-bold text-gray-400 text-sm uppercase tracking-wider">{item.label}</span>
                      <p className="text-white font-medium text-lg">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Decorative Background Circles */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-rose rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-brand-rose rounded-full blur-3xl opacity-20 -ml-10 -mb-10"></div>
            
            {/* Abstract Pattern */}
            <svg className="absolute bottom-0 right-0 opacity-10 w-48 h-48 text-white" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M45,-76C58.9,-69.3,71.4,-59.1,81.3,-46.7C91.2,-34.3,98.5,-19.7,97.7,-5.3C96.9,9.1,88,23.3,77.5,35.1C67,46.9,54.9,56.3,42.1,64.3C29.3,72.3,15.8,78.9,1.6,76.1C-12.6,73.3,-27.5,61.1,-41.4,51.1C-55.3,41.1,-68.2,33.3,-75.6,21.8C-83,10.3,-84.9,-4.9,-80.6,-18.4C-76.3,-31.9,-65.8,-43.7,-53.8,-51.1C-41.8,-58.5,-28.3,-61.5,-15.8,-63.3C-3.3,-65.1,8.3,-65.7,21,-66" transform="translate(100 100)" />
            </svg>
          </motion.div>

          {/* 3. Contact Form - White Theme */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100"
          >
            <h2 className="text-3xl font-bold text-brand-charcoal mb-2">Get Your <span className="text-brand-rose">Free Quote</span> Today</h2>
            <p className="text-gray-500 mb-10">Fill out the form below and we will get back to you shortly.</p>
            
            <form className="grid md:grid-cols-2 gap-6">
              {['Your Name *', 'Email Address *', 'Phone Number *'].map((placeholder, idx) => (
                <motion.div key={idx} whileFocus={{ scale: 1.02 }}>
                   <input 
                     type={idx === 1 ? "email" : "text"} 
                     placeholder={placeholder} 
                     className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-rose focus:ring-2 focus:ring-brand-rose/20 transition-all" 
                   />
                </motion.div>
              ))}
              
              <motion.div whileFocus={{ scale: 1.02 }}>
                <select className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-rose focus:ring-2 focus:ring-brand-rose/20 transition-all text-gray-500">
                  <option>Select Service</option>
                  <option>Web Development</option>
                  <option>Mobile App</option>
                  <option>UI/UX Design</option>
                </select>
              </motion.div>
              
              <motion.div className="md:col-span-2" whileFocus={{ scale: 1.01 }}>
                <textarea 
                  placeholder="Your Message *" 
                  rows="4" 
                  className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-rose focus:ring-2 focus:ring-brand-rose/20 transition-all"
                ></textarea>
              </motion.div>
              
              <motion.button 
                whileHover={{ scale: 1.02, backgroundColor: "#03045E" }}
                whileTap={{ scale: 0.98 }}
                className="md:col-span-2 bg-brand-rose text-white font-bold py-5 rounded-xl shadow-lg shadow-brand-rose/30 flex items-center justify-center gap-3 transition-colors"
              >
                Send Message <Send size={20} />
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* 4. Map Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 rounded-3xl overflow-hidden shadow-2xl border border-gray-200 h-[400px] relative bg-gray-100"
        >
          {/* Placeholder for Map - In a real app, use Google Maps Embed API here */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.25623872412!2d36.8148!3d-1.2921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d65f5776d5%3A0xf695781625052945!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1625581234567!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy"
            className="grayscale hover:grayscale-0 transition-all duration-700"
          ></iframe>
          
          {/* Map Pin Overlay */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
             <div className="relative">
                <div className="w-4 h-4 bg-brand-rose rounded-full animate-ping absolute"></div>
                <div className="w-4 h-4 bg-brand-rose rounded-full border-2 border-white shadow-lg"></div>
             </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Contact;