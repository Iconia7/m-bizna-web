import React, { useState } from 'react';
import { Phone, Mail, Clock, MapPin, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; 
import { db } from '../firebase'; // Ensure you have your firebase config here
import emailjs from '@emailjs/browser';
import picture from '../assets/pattern.png';

const Contact = () => {
  // 1. State for Form Data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Select Service',
    message: ''
  });

  // 2. State for Submission Status
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'

  // 3. Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 4. Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic Validation
    if(!formData.name || !formData.email || !formData.message) {
        alert("Please fill in all required fields.");
        return;
    }

    setStatus('loading');

    try {
      // A. Save to Firebase Firestore (Database)
      await addDoc(collection(db, "contact_messages"), {
        ...formData,
        timestamp: serverTimestamp(),
        read: false // You can use this later for an admin dashboard
      });

      // B. Send Email Notification via EmailJS
      // REPLACE with your actual keys
      const serviceID = "service_nhwsclu"; 
      const templateID = "template_61eywtf"; 
      const publicKey = "ctUKvg88_0Th5sfKn";

      const templateParams = {
        user_name: formData.name,
        user_email: formData.email,
        user_phone: formData.phone,
        service_type: formData.service,
        message: formData.message
      };

      await emailjs.send(serviceID, templateID, templateParams, publicKey);

      // C. Success State
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', service: 'Select Service', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);

    } catch (error) {
      console.error("Error sending message:", error);
      setStatus('error');
    }
  };

  return (
    <div className="pt-20">
      
      {/* 1. Header Section */}
      <section className="relative py-24 text-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={picture} alt="Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-brand-charcoal/55"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-creative">Contact Us</h1>
          <div className="flex justify-center gap-2 text-gray-300 text-sm font-medium">
            <Link to="/" className="hover:text-white transition-colors">Home</Link> / 
            <span className="text-brand-rose">Contact Us</span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-3 gap-10">
          
          {/* 2. Contact Info Card */}
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
                  <div key={idx} className="flex items-start gap-4 group cursor-default">
                    <div className="text-brand-rose group-hover:scale-110 transition-transform">{item.icon}</div>
                    <div>
                      <span className="font-bold text-gray-400 text-sm uppercase tracking-wider">{item.label}</span>
                      <p className="text-white font-medium text-lg">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Decorations */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-rose rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-brand-rose rounded-full blur-3xl opacity-20 -ml-10 -mb-10"></div>
          </motion.div>

          {/* 3. Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100"
          >
            <h2 className="text-3xl font-bold text-brand-charcoal mb-2">Get Your <span className="text-brand-rose">Free Quote</span> Today</h2>
            <p className="text-gray-500 mb-10">Fill out the form below and we will get back to you shortly.</p>
            
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                {/* Name Input */}
                <motion.div whileFocus={{ scale: 1.02 }}>
                   <input 
                     type="text" 
                     name="name"
                     value={formData.name}
                     onChange={handleChange}
                     placeholder="Your Name *" 
                     required
                     className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-rose focus:ring-2 focus:ring-brand-rose/20 transition-all" 
                   />
                </motion.div>

                {/* Email Input */}
                <motion.div whileFocus={{ scale: 1.02 }}>
                   <input 
                     type="email" 
                     name="email"
                     value={formData.email}
                     onChange={handleChange}
                     placeholder="Email Address *" 
                     required
                     className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-rose focus:ring-2 focus:ring-brand-rose/20 transition-all" 
                   />
                </motion.div>

                {/* Phone Input */}
                <motion.div whileFocus={{ scale: 1.02 }}>
                   <input 
                     type="tel" 
                     name="phone"
                     value={formData.phone}
                     onChange={handleChange}
                     placeholder="Phone Number *" 
                     required
                     className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-rose focus:ring-2 focus:ring-brand-rose/20 transition-all" 
                   />
                </motion.div>
              
                {/* Service Selection */}
                <motion.div whileFocus={{ scale: 1.02 }}>
                  <select 
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-rose focus:ring-2 focus:ring-brand-rose/20 transition-all text-gray-500"
                  >
                    <option disabled>Select Service</option>
                    <option>Web Development</option>
                    <option>Mobile App</option>
                    <option>UI/UX Design</option>
                    <option>Digital Marketing</option>
                    <option>Other</option>
                  </select>
                </motion.div>
              
                {/* Message Area */}
                <motion.div className="md:col-span-2" whileFocus={{ scale: 1.01 }}>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message *" 
                    rows="4" 
                    required
                    className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-rose focus:ring-2 focus:ring-brand-rose/20 transition-all"
                  ></textarea>
                </motion.div>
              
                {/* Submit Button */}
                <div className="md:col-span-2">
                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={status === 'loading' || status === 'success'}
                        className={`w-full font-bold py-5 rounded-xl shadow-lg flex items-center justify-center gap-3 transition-colors ${
                            status === 'success' 
                            ? 'bg-green-500 text-white cursor-default' 
                            : status === 'error'
                            ? 'bg-red-500 text-white'
                            : 'bg-brand-rose text-white hover:bg-brand-charcoal'
                        }`}
                    >
                        {status === 'loading' ? (
                            <><Loader2 className="animate-spin" /> Sending...</>
                        ) : status === 'success' ? (
                            <><CheckCircle /> Message Sent!</>
                        ) : status === 'error' ? (
                            <><AlertCircle /> Failed. Try Again.</>
                        ) : (
                            <>Send Message <Send size={20} /></>
                        )}
                    </motion.button>
                    {status === 'success' && (
                        <p className="text-green-600 text-center mt-3 text-sm">We've received your message and will contact you soon!</p>
                    )}
                </div>
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
          {/* Placeholder for Map */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.171173664724!2d37.0694!3d-1.0493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f4e5b27c66117%3A0xb652a23075841603!2sThika%2C%20Kenya!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy"
            className="grayscale hover:grayscale-0 transition-all duration-700"
          ></iframe>
          
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