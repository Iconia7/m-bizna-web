import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { team } from '../data';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, Briefcase, CheckCircle, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import picture from '../assets/pattern.png';

const TeamDetails = () => {
  const { id } = useParams();
  const member = team.find(m => m.id === parseInt(id));

  if (!member) return <div className="pt-40 text-center">Member not found</div>;

  return (
    <div className="pt-20">

      {/* 1. Header Section - Image with Overlay */}
            <section className="relative py-24 text-center text-white overflow-hidden">
              
              {/* Background Image Layer */}
              <div className="absolute inset-0 z-0">
                {/* You can change this image URL to a specific one for each page if you want */}
                <img 
                  src={picture}
                  className="w-full h-full object-cover"
                />
                {/* Dark Overlay (85% Opacity) - This makes it "dull" and readable */}
                <div className="absolute inset-0 bg-brand-charcoal/55"></div>
              </div>
      
              {/* Content Layer */}
              <div className="relative z-10 max-w-4xl mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 font-creative">
                  {/* CHANGE THIS TITLE PER PAGE */}
                  Team Details
                </h1>
                <div className="flex justify-center gap-2 text-gray-300 text-sm font-medium">
                  <Link to="/" className="hover:text-white transition-colors">Home</Link> / 
                  {/* CHANGE THIS BREADCRUMB PER PAGE */}
                  <Link to="/services" className="hover:text-white">Team</Link> / 
                <span className="text-brand-rose">{member.name}</span>
                </div>
              </div>
            </section>

      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid lg:grid-cols-3 gap-12">
            
            {/* 2. Left Column: Image & Info */}
            <div className="lg:col-span-1">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gray-50 p-8 rounded-3xl border border-gray-100 text-center"
                >
                    <div className="rounded-3xl overflow-hidden mb-8 shadow-xl">
                        <img src={member.image} alt={member.name} className="w-full h-auto object-cover" />
                    </div>
                    <h2 className="text-2xl font-bold text-brand-charcoal mb-2">{member.name}</h2>
                    <p className="text-brand-rose font-medium mb-6">{member.role}</p>
                    
                    <div className="space-y-4 text-left mb-8">
                        <div className="flex items-center gap-3 text-gray-600">
                            <Mail size={18} className="text-brand-rose"/> <span className="text-sm">{member.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <Phone size={18} className="text-brand-rose"/> <span className="text-sm">{member.phone}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <Briefcase size={18} className="text-brand-rose"/> <span className="text-sm">{member.experience} Experience</span>
                        </div>
                    </div>

                    <div className="flex justify-center gap-3">
                       {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                         <a key={i} href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-charcoal border border-gray-200 hover:bg-brand-rose hover:text-white hover:border-brand-rose transition">
                            <Icon size={18}/>
                         </a>
                       ))}
                    </div>
                </motion.div>
            </div>

            {/* 3. Right Column: Bio & Skills */}
            <div className="lg:col-span-2">
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <h2 className="text-3xl font-bold text-brand-charcoal mb-6">Biography</h2>
                    <p className="text-gray-600 mb-8 leading-relaxed text-lg">{member.bio}</p>
                    <p className="text-gray-600 mb-12 leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>

                    <h3 className="text-2xl font-bold text-brand-charcoal mb-8">Professional Skills</h3>
                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 mb-16">
                        {member.skills.map((skill, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between mb-2 font-bold text-brand-charcoal">
                                    <span>{skill.name}</span>
                                    <span>{skill.level}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.level}%` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        className="bg-brand-rose h-2.5 rounded-full relative"
                                    >
                                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border-2 border-brand-rose rounded-full"></div>
                                    </motion.div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact Form within details page (from design) */}
                    <div className="bg-brand-charcoal rounded-3xl p-10 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-rose rounded-full blur-[80px] opacity-20"></div>
                        <div className="relative z-10">
                            <span className="text-brand-rose font-bold uppercase tracking-wider text-sm mb-2 block">// Contact Me</span>
                            <h3 className="text-3xl font-bold mb-8">Get In Touch</h3>
                            
                            <form className="grid md:grid-cols-2 gap-6">
                                <input type="text" placeholder="Your Name" className="bg-white/10 border border-white/20 p-4 rounded-xl text-white focus:outline-none focus:border-brand-rose" />
                                <input type="email" placeholder="Your Email" className="bg-white/10 border border-white/20 p-4 rounded-xl text-white focus:outline-none focus:border-brand-rose" />
                                <div className="md:col-span-2">
                                    <textarea rows="4" placeholder="Write Message" className="w-full bg-white/10 border border-white/20 p-4 rounded-xl text-white focus:outline-none focus:border-brand-rose"></textarea>
                                </div>
                                <button className="md:col-span-2 bg-brand-rose py-4 rounded-xl font-bold hover:bg-white hover:text-brand-charcoal transition shadow-lg">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>

                </motion.div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default TeamDetails;