import React from 'react';
import { team } from '../data';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Team = () => {
  return (
    <div className="pt-20">
      
      {/* 1. Header Section */}
      <section className="bg-brand-charcoal text-white py-20 text-center relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <h1 className="text-4xl font-bold relative z-10">Our Team</h1>
        <div className="flex justify-center gap-2 mt-4 text-gray-400 text-sm relative z-10">
          <Link to="/" className="hover:text-white">Home</Link> / 
          <span className="text-brand-rose">Our Team</span>
        </div>
      </section>

      {/* 2. Team Grid */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
            <span className="text-brand-rose font-bold uppercase tracking-wider text-sm">Our Team</span>
            <h2 className="text-4xl font-bold text-brand-charcoal mt-2">Meet Our <span className="text-brand-rose">Expert Team</span></h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member) => (
            <motion.div 
              key={member.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="relative h-[350px] overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                
                {/* Social Overlay */}
                <div className="absolute inset-0 bg-brand-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                   {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                     <div key={i} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-charcoal hover:bg-brand-rose hover:text-white cursor-pointer transition transform hover:-translate-y-1">
                        <Icon size={18}/>
                     </div>
                   ))}
                </div>
              </div>
              
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold text-brand-charcoal mb-1">
                    <Link to={`/team/${member.id}`} className="hover:text-brand-rose transition">{member.name}</Link>
                </h3>
                <p className="text-gray-500 font-medium">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3. Newsletter Section (Matching Design) */}
      <section className="bg-white pb-24">
         <div className="max-w-4xl mx-auto px-4 text-center">
             <div className="bg-brand-charcoal rounded-3xl p-12 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-brand-rose rounded-full blur-[80px] opacity-30"></div>
                 <div className="relative z-10">
                     <span className="text-brand-rose font-bold uppercase tracking-wider text-sm mb-2 block">// Our Newsletter</span>
                     <h2 className="text-3xl font-bold text-white mb-8">Subscribe for <span className="text-brand-rose">Expert IT <br/> Tips & Special Offers</span></h2>
                     
                     <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
                         <input type="email" placeholder="Enter Email Address" className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-brand-rose" />
                         <button className="bg-brand-rose text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-brand-charcoal transition">
                             Subscribe
                         </button>
                     </div>
                 </div>
             </div>
         </div>
      </section>

    </div>
  );
};

export default Team;