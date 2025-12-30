import React, { useState } from 'react';
import { services } from '../data';
import { ArrowRight, Plus, Minus, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom'; // <--- Import Link

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Services = () => {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    { question: "What services does your company provide?", answer: "We provide a comprehensive range of digital services including Website Development, Mobile App Development, UI/UX Design, Digital Marketing, and Cloud Computing solutions." },
    { question: "What industries do you serve?", answer: "We serve a diverse range of industries including Healthcare, E-commerce, Real Estate, Education, and FinTech, delivering custom solutions for each sector." },
    { question: "Do you offer custom IT solutions?", answer: "Yes, absolutely. We specialize in building custom software solutions from the ground up to ensure they align perfectly with your specific business workflows." },
    { question: "How can I contact your support team?", answer: "You can reach our 24/7 support team via email at support@nexora.co.ke or call us directly at +254 700 000 000." },
  ];

  return (
    <div className="pt-20">
      
      {/* 1. Header Section - Image with Overlay */}
      <section className="relative py-24 text-center text-white overflow-hidden">
        
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          {/* You can change this image URL to a specific one for each page if you want */}
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay (85% Opacity) - This makes it "dull" and readable */}
          <div className="absolute inset-0 bg-brand-charcoal/85"></div>
        </div>

        {/* Content Layer */}
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-creative">
            {/* CHANGE THIS TITLE PER PAGE */}
            Our Services
          </h1>
          <div className="flex justify-center gap-2 text-gray-300 text-sm font-medium">
            <Link to="/" className="hover:text-white transition-colors">Home</Link> / 
            {/* CHANGE THIS BREADCRUMB PER PAGE */}
            <span className="text-brand-rose">Services</span>
          </div>
        </div>
      </section>

      {/* 2. Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="grid md:grid-cols-3 gap-8"
          >
            {services.map((service) => (
              <motion.div 
                key={service.id} 
                variants={fadeInUp}
                whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100"
              >
                <motion.div 
                  whileHover={{ rotateY: 180 }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 bg-brand-rose/10 text-brand-rose rounded-xl flex items-center justify-center mb-6 text-2xl group-hover:bg-brand-rose group-hover:text-white"
                >
                  <div className="group-hover:scale-x-[-1] transition-transform duration-0"> 
                    {service.icon}
                  </div>
                </motion.div>
                <h3 className="text-2xl font-bold mb-4 text-brand-charcoal group-hover:text-brand-rose transition-colors">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.desc}</p>
                
                {/* Learn More Button - Linked to Details Page */}
                <Link 
                  to={`/services/${service.id}`} 
                  className="flex items-center gap-2 text-brand-charcoal font-bold hover:text-brand-rose transition group-hover:gap-4"
                >
                  Learn More <ArrowRight size={18} />
                </Link>

              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. Why Trust Us Section */}
      <section className="py-24 bg-brand-charcoal text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80" alt="Teamwork" className="rounded-2xl shadow-2xl border-4 border-brand-rose/20"/>
            </motion.div>
            
            <motion.div
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
            >
                <span className="text-brand-rose font-bold uppercase tracking-wider">Why Choose Us</span>
                <h2 className="text-4xl font-bold mt-4 mb-6">Why Trust Us for Your <br/>IT Needs?</h2>
                <p className="text-gray-300 mb-8 text-lg">We combine technical expertise with a deep understanding of business processes.</p>
                
                <div className="grid grid-cols-2 gap-6">
                    {["Expert Team", "Fast Delivery", "24/7 Support", "Fair Pricing"].map((item, idx) => (
                        <motion.div 
                          key={idx} 
                          whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                          className="bg-white/5 p-6 rounded-xl border border-white/10 transition cursor-pointer"
                        >
                            <h4 className="text-xl font-bold text-brand-rose">{item}</h4>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
      </section>

      {/* 4. Quote & FAQ */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-brand-charcoal rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-rose rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>
                <h3 className="text-3xl font-bold mb-2">Get Your <span className="text-brand-rose">Free Quote</span> Today!</h3>
                <form className="space-y-4 relative z-10 mt-8">
                   <input type="text" placeholder="Your Name *" className="w-full p-4 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-brand-rose transition" />
                   <input type="email" placeholder="Email Address *" className="w-full p-4 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-brand-rose transition" />
                   <button className="w-full py-4 bg-brand-rose rounded-lg font-bold text-white hover:bg-white hover:text-brand-rose transition-all shadow-lg transform hover:-translate-y-1">
                        Send Message
                    </button>
                </form>
            </motion.div>

            {/* Animated FAQ */}
            <motion.div
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
            >
                <div className="mb-10">
                    <span className="text-brand-rose font-bold uppercase tracking-wider flex items-center gap-2">
                        <HelpCircle size={18}/> FAQ
                    </span>
                    <h2 className="text-4xl font-bold text-brand-charcoal mt-2">Question? <span className="text-brand-rose">Look here.</span></h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <motion.div 
                            key={idx} 
                            className={`border rounded-xl overflow-hidden ${openFaq === idx ? 'border-brand-rose shadow-md' : 'border-gray-200'}`}
                        >
                            <button 
                                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition"
                            >
                                <span className={`font-bold text-lg ${openFaq === idx ? 'text-brand-rose' : 'text-brand-charcoal'}`}>{faq.question}</span>
                                <motion.div animate={{ rotate: openFaq === idx ? 180 : 0 }}>
                                  {openFaq === idx ? <Minus className="text-brand-rose"/> : <Plus className="text-gray-400"/>}
                                </motion.div>
                            </button>
                            
                            <AnimatePresence>
                                {openFaq === idx && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-white px-6"
                                    >
                                        <p className="text-gray-600 pb-6 leading-relaxed">{faq.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;