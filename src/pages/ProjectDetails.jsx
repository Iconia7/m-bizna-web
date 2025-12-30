import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../data';
import { CheckCircle, ArrowRight, MapPin, Calendar, User, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const ProjectDetails = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === parseInt(id));

  // Fallback if project not found
  if (!project) return <div className="pt-32 text-center text-2xl">Project not found</div>;

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
                  Project Details
                </h1>
                <div className="flex justify-center gap-2 text-gray-300 text-sm font-medium">
                  <Link to="/" className="hover:text-white transition-colors">Home</Link> / 
                  {/* CHANGE THIS BREADCRUMB PER PAGE */}
                  <Link to="/services" className="hover:text-white">Projects</Link> / 
                <span className="text-brand-rose">{project.title}</span>
                </div>
              </div>
            </section>

      <div className="max-w-7xl mx-auto px-4 py-20">
        
        {/* 2. Main Hero Image */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl overflow-hidden shadow-2xl mb-16 h-[400px] md:h-[500px]"
        >
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* 3. Left Content Column */}
          <div className="lg:col-span-2">
            <motion.div initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }}>
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-brand-rose/10 text-brand-rose font-bold text-4xl w-16 h-16 rounded-full flex items-center justify-center shrink-0">
                  {project.title.charAt(0)}
                </div>
                <div>
                   <h2 className="text-3xl font-bold text-brand-charcoal">{project.title} - {project.category}</h2>
                   <p className="text-gray-500 mt-2">A revolutionary solution for modern problems.</p>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-brand-charcoal mb-4">The Challenge</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">{project.challenge}</p>

              <h3 className="text-2xl font-bold text-brand-charcoal mb-4">The Solution</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{project.solution}</p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {['Live Connectivity', 'Secure Data', 'Real-time Updates', 'User Friendly'].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-gray-700 font-medium">
                    <CheckCircle className="text-brand-rose" size={20} /> {item}
                  </div>
                ))}
              </div>

              {/* Showcase Images */}
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                 <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80" alt="Detail 1" className="rounded-xl shadow-lg hover:scale-105 transition duration-500" />
                 <img src="https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&q=80" alt="Detail 2" className="rounded-xl shadow-lg hover:scale-105 transition duration-500" />
              </div>

              <h3 className="text-2xl font-bold text-brand-charcoal mb-4">The Impact</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">{project.impact}</p>

              {/* Testimonial Box */}
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                 <div className="flex gap-1 text-yellow-400 mb-4">
                    {[1,2,3,4,5].map(star => <Star key={star} size={18} fill="currentColor" />)}
                 </div>
                 <h4 className="font-bold text-xl text-brand-charcoal mb-2">The Best Decision Ever!</h4>
                 <p className="text-gray-600 italic mb-6">"Working with Nexora was a game changer. They understood our vision perfectly and delivered beyond expectations."</p>
                 <div className="flex items-center gap-4">
                    <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Client" className="w-12 h-12 rounded-full border-2 border-brand-rose" />
                    <div>
                        <span className="block font-bold text-brand-charcoal">Sarah Jenkins</span>
                        <span className="text-sm text-gray-500">CTO, {project.client}</span>
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>

          {/* 4. Right Sidebar: Project Info */}
          <div className="lg:col-span-1">
             <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="bg-brand-charcoal text-white p-8 rounded-2xl shadow-xl sticky top-24"
             >
                <h3 className="text-2xl font-bold mb-6 border-b border-gray-600 pb-4">Project Info</h3>
                
                <div className="space-y-6">
                   <div className="flex items-start gap-4">
                      <div className="bg-brand-rose/20 p-2 rounded-lg text-brand-rose"><User size={20}/></div>
                      <div>
                         <span className="text-gray-400 text-sm block">Client:</span>
                         <span className="font-bold">{project.client}</span>
                      </div>
                   </div>
                   <div className="flex items-start gap-4">
                      <div className="bg-brand-rose/20 p-2 rounded-lg text-brand-rose"><Calendar size={20}/></div>
                      <div>
                         <span className="text-gray-400 text-sm block">Date:</span>
                         <span className="font-bold">{project.date}</span>
                      </div>
                   </div>
                   <div className="flex items-start gap-4">
                      <div className="bg-brand-rose/20 p-2 rounded-lg text-brand-rose"><MapPin size={20}/></div>
                      <div>
                         <span className="text-gray-400 text-sm block">Location:</span>
                         <span className="font-bold">{project.location}</span>
                      </div>
                   </div>
                   <div className="flex items-start gap-4">
                      <div className="bg-brand-rose/20 p-2 rounded-lg text-brand-rose"><CheckCircle size={20}/></div>
                      <div>
                         <span className="text-gray-400 text-sm block">Category:</span>
                         <span className="font-bold">{project.category}</span>
                      </div>
                   </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-600">
                   <h4 className="font-bold mb-2">Need help?</h4>
                   <p className="text-gray-400 text-sm mb-4">Let's discuss your next project.</p>
                   <Link to="/contact" className="block w-full text-center bg-brand-rose py-3 rounded-lg font-bold hover:bg-white hover:text-brand-rose transition">
                      Contact Us
                   </Link>
                </div>
             </motion.div>
          </div>

        </div>

        {/* 5. View Other Projects (Slider simulation) */}
        <section className="mt-24">
            <div className="flex justify-between items-center mb-8">
               <h2 className="text-3xl font-bold text-brand-charcoal">View Other Projects</h2>
               <Link to="/projects" className="text-brand-rose font-bold flex items-center gap-2">View All <ArrowRight size={20}/></Link>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
               {projects.filter(p => p.id !== project.id).slice(0, 2).map(p => (
                   <Link to={`/projects/${p.id}`} key={p.id} className="group relative rounded-xl overflow-hidden h-[250px] shadow-lg">
                       <img src={p.image} alt={p.title} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                       <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                           <h3 className="text-white text-xl font-bold">{p.title}</h3>
                       </div>
                   </Link>
               ))}
            </div>
        </section>

      </div>
    </div>
  );
};

export default ProjectDetails;