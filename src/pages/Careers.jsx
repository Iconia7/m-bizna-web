import React from 'react';
import { benefits, jobs } from '../data';
import { CheckCircle, Briefcase, MapPin, Clock, ArrowRight, Heart, Globe, Coffee, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // <--- Import Link
import picture from '../assets/pattern.png'; // <--- Import Pattern Image

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const Careers = () => {
  return (
    <div className="pt-20">

      {/* 1. New Header Section */}
      <section className="relative py-24 text-center text-white overflow-hidden">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img 
            src={picture}
            alt="Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-charcoal/55"></div>
        </div>

        {/* Content Layer */}
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-creative">
            Careers
          </h1>
          <div className="flex justify-center gap-2 text-gray-300 text-sm font-medium">
            <Link to="/" className="hover:text-white transition-colors">Home</Link> / 
            <span className="text-brand-rose">Careers</span>
          </div>
        </div>
      </section>
      
      {/* 2. Hero / Intro Section */}
      <section className="relative py-24 bg-white text-center overflow-hidden">
         {/* Animated Background Elements */}
         <motion.div 
           animate={{ rotate: 360 }}
           transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
           className="absolute -top-20 -left-20 w-80 h-80 border-4 border-dashed border-brand-rose/10 rounded-full"
         />
         <div className="max-w-4xl mx-auto px-4 relative z-10">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
                <span className="text-brand-rose font-bold tracking-wider uppercase text-sm bg-brand-rose/10 px-4 py-1 rounded-full">
                    Join Our Team
                </span>
                <h1 className="text-5xl md:text-6xl font-extrabold text-brand-charcoal mt-6 mb-6">
                    Drive the <span className="text-brand-rose">Future</span> of Technology
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                    We are looking for creative problem solvers and innovators. If you are passionate about technology and want to make an impact, Nexora is the place for you.
                </p>
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-brand-charcoal text-white px-8 py-4 rounded-full font-bold hover:bg-brand-rose transition-colors shadow-lg"
                    onClick={() => document.getElementById('openings').scrollIntoView({ behavior: 'smooth' })}
                >
                    View Open Positions
                </motion.button>
            </motion.div>
         </div>
         {/* Hero Image */}
         <motion.div 
           initial={{ opacity: 0, y: 50 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3, duration: 0.8 }}
           className="mt-16 max-w-6xl mx-auto px-4"
         >
            <img 
               src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80" 
               alt="Team working" 
               className="rounded-3xl shadow-2xl w-full h-[400px] object-cover"
            />
         </motion.div>
      </section>

      {/* 3. Perks & Benefits */}
      <section className="py-24 bg-brand-charcoal text-white relative overflow-hidden">
         {/* Background pattern */}
         <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
         
         <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
                <span className="text-brand-rose font-bold uppercase tracking-wider">Benefits</span>
                <h2 className="text-4xl font-bold mt-2">Why Work With Us?</h2>
            </div>

            <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid md:grid-cols-3 gap-6"
            >
                {benefits.map((benefit) => (
                    <motion.div 
                        key={benefit.id}
                        variants={fadeInUp}
                        whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                        className="bg-white/5 border border-white/10 p-8 rounded-2xl transition-all duration-300 backdrop-blur-sm"
                    >
                        <div className="w-12 h-12 bg-brand-rose rounded-lg flex items-center justify-center mb-6 text-white shadow-lg shadow-brand-rose/30">
                            {/* Icons mapping based on index for variety */}
                            {benefit.id === 1 ? <Globe /> : benefit.id === 2 ? <Heart /> : benefit.id === 3 ? <Clock /> : benefit.id === 4 ? <Users /> : benefit.id === 5 ? <Briefcase /> : <Coffee />}
                        </div>
                        <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">{benefit.desc}</p>
                    </motion.div>
                ))}
            </motion.div>
         </div>
      </section>

      {/* 4. Job Openings */}
      <section id="openings" className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-16">
                <span className="text-brand-rose font-bold uppercase tracking-wider">Join Us</span>
                <h2 className="text-4xl font-bold text-brand-charcoal mt-2">Current Openings</h2>
            </div>

            <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6"
            >
                {jobs.map((job) => (
                    <motion.div 
                        key={job.id}
                        variants={fadeInUp}
                        className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
                    >
                        <div>
                            <h3 className="text-2xl font-bold text-brand-charcoal group-hover:text-brand-rose transition-colors">{job.title}</h3>
                            <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500 font-medium">
                                <span className="flex items-center gap-1"><Briefcase size={16}/> {job.type}</span>
                                <span className="flex items-center gap-1"><MapPin size={16}/> {job.location}</span>
                                <span className="flex items-center gap-1"><Clock size={16}/> {job.exp}</span>
                            </div>
                        </div>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-brand-rose/10 text-brand-rose px-6 py-3 rounded-full font-bold hover:bg-brand-rose hover:text-white transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                        >
                            Apply Now <ArrowRight size={18}/>
                        </motion.button>
                    </motion.div>
                ))}
            </motion.div>
        </div>
      </section>

      {/* 5. Life @ Nexora (Gallery) */}
      <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-end justify-between mb-12">
                <div>
                    <span className="text-brand-rose font-bold uppercase tracking-wider">Our Culture</span>
                    <h2 className="text-4xl font-bold text-brand-charcoal mt-2">Life @ <span className="text-brand-rose">Nexora</span></h2>
                </div>
                <button className="hidden md:flex items-center gap-2 text-brand-charcoal font-bold hover:text-brand-rose transition">View All Gallery <ArrowRight size={20}/></button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[500px]">
                <div className="col-span-2 row-span-2 relative group overflow-hidden rounded-2xl">
                    <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80" alt="Office Life" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                    <div className="absolute inset-0 bg-brand-charcoal/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold">Team Meetings</div>
                </div>
                <div className="col-span-1 row-span-1 relative group overflow-hidden rounded-2xl">
                    <img src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80" alt="Office Life" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                </div>
                <div className="col-span-1 row-span-2 relative group overflow-hidden rounded-2xl">
                    <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80" alt="Office Life" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                </div>
                <div className="col-span-1 row-span-1 relative group overflow-hidden rounded-2xl">
                     <img src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&q=80" alt="Office Life" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                </div>
            </div>
          </div>
      </section>

      {/* 6. Bottom CTA (Reused style) */}
      <section className="py-20 bg-brand-charcoal text-white text-center">
          <div className="max-w-3xl mx-auto px-4">
              <h2 className="text-3xl font-bold mb-6">Don't see a position that fits?</h2>
              <p className="text-gray-300 mb-8">We are always on the lookout for talented individuals. Send your resume to our HR department and we'll keep you on file.</p>
              <button className="bg-brand-rose px-8 py-3 rounded-full font-bold text-white hover:bg-white hover:text-brand-charcoal transition-all shadow-lg">
                  Send Your Resume
              </button>
          </div>
      </section>

    </div>
  );
};

export default Careers;