import React, { useState } from 'react';
import { projects } from '../data';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom'; // <--- Import Link

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Web Design', 'Mobile App', 'UI/UX'];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category.includes(filter));

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
            Our Projects
          </h1>
          <div className="flex justify-center gap-2 text-gray-300 text-sm font-medium">
            <Link to="/" className="hover:text-white transition-colors">Home</Link> / 
            {/* CHANGE THIS BREADCRUMB PER PAGE */}
            <span className="text-brand-rose">Projects</span>
          </div>
        </div>
      </section>

      {/* 2. Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        
        {/* Filter Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-4 mb-16 flex-wrap"
        >
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-1 ${
                filter === cat 
                ? 'bg-brand-rose text-white shadow-lg shadow-brand-rose/30' 
                : 'bg-white text-brand-charcoal border border-gray-200 hover:border-brand-rose hover:text-brand-rose hover:shadow-md'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Project Grid with Layout Animation */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.id} 
                className="group relative overflow-hidden rounded-2xl h-[350px] shadow-lg cursor-pointer"
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-brand-charcoal/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-6 text-center backdrop-blur-sm">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <span className="text-brand-rose font-bold uppercase tracking-wider text-sm mb-2 block">
                      {project.category}
                    </span>
                    <h3 className="text-3xl font-bold mb-6">{project.title}</h3>
                    
                    {/* BUTTON IMPLEMENTATION: Linked to Details Page */}
                    <Link 
                      to={`/projects/${project.id}`}
                      className="bg-white text-brand-charcoal px-6 py-3 rounded-full font-bold flex items-center gap-2 mx-auto hover:bg-brand-rose hover:text-white transition-colors"
                    >
                      View Case Study <ArrowRight size={18}/>
                    </Link>

                  </motion.div>
                </div>

                {/* Corner Icon (Always Visible, animates on hover) */}
                <div className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg text-brand-charcoal group-hover:scale-0 transition-transform duration-300">
                    <ExternalLink size={20} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* 3. "Need Consultation" Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-32 bg-brand-charcoal rounded-3xl p-10 md:p-16 relative overflow-hidden text-white flex flex-col md:flex-row items-center justify-between gap-10"
        >
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-rose/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

            <div className="relative z-10 max-w-xl">
                <div className="flex items-center gap-2 mb-4 text-brand-rose font-semibold">
                    <span className="w-8 h-[2px] bg-brand-rose"></span> Contact Us
                </div>
                <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                    Need Consultation or Help with Your Next Project?
                </h2>
                <Link to="/contact">
                  <button className="bg-brand-rose text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-brand-charcoal transition-all shadow-lg hover:shadow-brand-rose/50">
                      Get A Quote
                  </button>
                </Link>
            </div>

            {/* Image Section */}
            <div className="relative z-10 hidden md:block">
                <div className="relative">
                    <div className="absolute -inset-4 border-2 border-dashed border-gray-600 rounded-full animate-spin-slow"></div>
                    <img 
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80" 
                        alt="Consultant" 
                        className="w-64 h-64 object-cover rounded-full border-4 border-brand-rose shadow-2xl"
                    />
                    {/* Floating Badge */}
                    <div className="absolute bottom-0 -left-6 bg-white text-brand-charcoal px-4 py-2 rounded-lg shadow-lg font-bold flex items-center gap-2 animate-bounce-slow">
                        <span>👋</span> Let's Talk!
                    </div>
                </div>
            </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;