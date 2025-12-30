import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { services } from '../data';
import { CheckCircle, ArrowRight, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import picture from '../assets/pattern.png';

const ServiceDetails = () => {
  const { id } = useParams();
  const service = services.find((s) => s.id === parseInt(id));

  // Fallback if not found (or default to first service for demo)
  const currentService = service || services[0];
  const { details } = currentService;

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
            Service Details
          </h1>
          <div className="flex justify-center gap-2 text-gray-300 text-sm font-medium">
            <Link to="/" className="hover:text-white transition-colors">Home</Link> / 
            {/* CHANGE THIS BREADCRUMB PER PAGE */}
            <Link to="/services" className="hover:text-white">Services</Link> / 
          <span className="text-brand-rose">{currentService.title}</span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-20">
         
         <div className="grid lg:grid-cols-3 gap-12">
            
            {/* 2. Main Content */}
            <div className="lg:col-span-2">
                <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
                    <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80" alt="Team" className="rounded-2xl shadow-xl w-full h-[400px] object-cover mb-10" />

                    <h2 className="text-3xl font-bold text-brand-charcoal mb-4">{details?.heading || currentService.title}</h2>
                    <div className="flex gap-4 mb-6">
                        <span className="text-6xl font-bold text-brand-rose leading-none float-left mr-2">
                            {details?.intro?.charAt(0) || "W"}
                        </span>
                        <p className="text-gray-600 leading-relaxed pt-2">
                            {details?.intro?.substring(1) || currentService.desc}
                        </p>
                    </div>
                    
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        We provide comprehensive solutions that help you achieve your business goals. Our team consists of industry experts who are dedicated to delivering excellence in every project.
                    </p>

                    <h3 className="text-2xl font-bold text-brand-charcoal mb-6">Services Include:</h3>
                    <div className="grid md:grid-cols-2 gap-4 mb-12">
                        {(details?.includes || ['Custom Solutions', 'Expert Support']).map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-brand-rose/50 transition">
                                <CheckCircle className="text-brand-rose shrink-0" size={20} />
                                <span className="font-semibold text-gray-700">{item}</span>
                            </div>
                        ))}
                    </div>
                    
                    {/* Images Grid */}
                    <div className="grid md:grid-cols-2 gap-6 mb-12">
                        <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80" className="rounded-2xl shadow-lg" alt="Work 1"/>
                        <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80" className="rounded-2xl shadow-lg" alt="Work 2"/>
                    </div>

                    <h3 className="text-2xl font-bold text-brand-charcoal mb-8">Our Expertise in {currentService.title}</h3>
                    <div className="space-y-6">
                        {(details?.expertise || []).map((exp, idx) => (
                            <div key={idx} className="flex gap-6 group">
                                <div className="w-16 h-16 rounded-full bg-white border-2 border-brand-rose text-brand-rose flex items-center justify-center font-bold text-xl shrink-0 group-hover:bg-brand-rose group-hover:text-white transition">
                                    0{idx + 1}
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-brand-charcoal mb-2">{exp.title}</h4>
                                    <p className="text-gray-600">{exp.text}</p>
                                </div>
                            </div>
                        ))}
                        {/* Fallback if no expertise data */}
                        {(!details?.expertise || details.expertise.length === 0) && (
                            <p className="text-gray-500 italic">Detailed expertise info coming soon.</p>
                        )}
                    </div>

                </motion.div>
            </div>

            {/* 3. Sidebar (Contact Form & Info) */}
            <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-8">
                    
                    {/* Categories / Services List */}
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <h3 className="font-bold text-xl text-brand-charcoal mb-4">All Services</h3>
                        <div className="space-y-2">
                            {services.map(s => (
                                <Link 
                                    key={s.id} 
                                    to={`/services/${s.id}`} 
                                    className={`block p-3 rounded-lg transition flex justify-between items-center ${s.id === currentService.id ? 'bg-brand-rose text-white' : 'bg-white text-gray-600 hover:bg-gray-200'}`}
                                >
                                    {s.title} <ArrowRight size={16}/>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Contact Form Sidebar */}
                    <div className="bg-brand-charcoal text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-brand-rose/20 rounded-full -mr-10 -mt-10 blur-xl"></div>
                         <h3 className="text-2xl font-bold mb-2">Get Your <span className="text-brand-rose">Free Quote</span></h3>
                         <p className="text-gray-400 text-sm mb-6">Fill the form and we'll get back to you shortly.</p>
                         
                         <form className="space-y-4 relative z-10">
                             <input type="text" placeholder="Name" className="w-full p-3 rounded bg-white/10 border border-white/20 focus:outline-none focus:border-brand-rose text-white placeholder-gray-400"/>
                             <input type="email" placeholder="Email" className="w-full p-3 rounded bg-white/10 border border-white/20 focus:outline-none focus:border-brand-rose text-white placeholder-gray-400"/>
                             <textarea rows="3" placeholder="Message" className="w-full p-3 rounded bg-white/10 border border-white/20 focus:outline-none focus:border-brand-rose text-white placeholder-gray-400"></textarea>
                             <button className="w-full bg-brand-rose py-3 rounded font-bold hover:bg-white hover:text-brand-rose transition">Submit Now</button>
                         </form>
                    </div>

                    {/* Help Box */}
                    <div className="bg-blue-50 p-6 rounded-2xl flex items-center gap-4">
                        <div className="bg-brand-charcoal text-white p-3 rounded-full">
                            <HelpCircle />
                        </div>
                        <div>
                            <h4 className="font-bold text-brand-charcoal">Have Questions?</h4>
                            <p className="text-sm text-brand-rose font-bold">+254 700 000 000</p>
                        </div>
                    </div>

                </div>
            </div>

         </div>

      </div>

    </div>
  );
};

export default ServiceDetails;