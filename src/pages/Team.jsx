import React, { useState } from 'react';
import { team } from '../data';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; 
import { db } from '../firebase'; 
import emailjs from '@emailjs/browser';
import picture from '../assets/pattern.png';
import { Helmet } from 'react-helmet-async';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Team = () => {
  // --- NEWSLETTER LOGIC ---
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    // Basic Validation
    if (!email || !email.includes('@')) {
        setMessage('Please enter a valid email.');
        setStatus('error');
        return;
    }

    // CAPTCHA CHECK (If implemented globally, add here. For now, simple check is okay)
    if (window.grecaptcha && window.grecaptcha.getResponse().length === 0) {
        setMessage("Please verify you are not a robot.");
        setStatus('error');
        return;
    }

    setStatus('loading');
    setMessage('');

    try {
        // 1. Save to Firebase
        await addDoc(collection(db, "newsletter_subscribers"), {
            email: email,
            timestamp: serverTimestamp(),
            source: 'Team Page'
        });

        // 2. Email Notification (Optional - to Admin)
        const serviceID = "service_nhwsclu"; 
        const templateID = "template_61eywtf"; 
        const publicKey = "ctUKvg88_0Th5sfKn";

        const templateParams = {
            to_email: "info@nexoracreatives.co.ke",
            from_name: "Team Page Subscriber",
            reply_to: email,
            subject: "New Newsletter Subscriber",
            message_body: `New subscriber from Team Page: ${email}`
        };

        await emailjs.send(serviceID, templateID, templateParams, publicKey);

        // 3. Success State
        setStatus('success');
        setEmail('');
        setMessage('Thanks for subscribing!');
        
        // Reset Captcha if visible
        if(window.grecaptcha) window.grecaptcha.reset();

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

  // Helper for Social Icons
  const SocialIconMap = {
      facebook: Facebook,
      twitter: Twitter,
      linkedin: Linkedin,
      instagram: Instagram
  };

  return (
    <div className="pt-20">
        <Helmet>
                <title>Team - Nexora Creative Solutions</title>
                <meta name="description" content="Nexora Creative Solutions is a leading tech agency in Kenya specializing in Web Development, Mobile Apps, and Digital Marketing." />
              </Helmet>

      {/* 1. Header Section */}
      <section className="relative py-24 text-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={picture} alt="Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-brand-charcoal/55"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-creative">Our Team</h1>
          <div className="flex justify-center gap-2 text-gray-300 text-sm font-medium">
            <Link to="/" className="hover:text-white transition-colors">Home</Link> / 
            <span className="text-brand-rose">Our Team</span>
          </div>
        </div>
      </section>

      {/* 2. Team Grid */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
            <span className="text-brand-rose font-bold uppercase tracking-wider text-sm">Our Team</span>
            <h2 className="text-4xl font-bold text-brand-charcoal mt-2">Meet Our <span className="text-brand-rose">Expert Team</span></h2>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {team.map((member) => (
            <motion.div 
              key={member.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 w-full sm:w-[350px]"
            >
              <div className="relative h-[350px] overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                
                {/* Social Overlay - Dynamic Links */}
                <div className="absolute inset-0 bg-brand-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    {member.socials && Object.entries(member.socials).map(([platform, url], i) => {
                        const Icon = SocialIconMap[platform];
                        return Icon ? (
                            <a 
                                key={i} 
                                href={url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-charcoal hover:bg-brand-rose hover:text-white cursor-pointer transition transform hover:-translate-y-1"
                            >
                                <Icon size={18}/>
                            </a>
                        ) : null;
                    })}
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

      {/* 3. Newsletter Section (FUNCTIONAL) */}
      <section className="bg-white pb-24">
         <div className="max-w-4xl mx-auto px-4 text-center">
             <div className="bg-brand-charcoal rounded-3xl p-12 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-brand-rose rounded-full blur-[80px] opacity-30"></div>
                 <div className="relative z-10">
                     <span className="text-brand-rose font-bold uppercase tracking-wider text-sm mb-2 block">// Our Newsletter</span>
                     <h2 className="text-3xl font-bold text-white mb-8">Subscribe for <span className="text-brand-rose">Expert IT <br/> Tips & Special Offers</span></h2>
                     
                     <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
                         <div className="flex-grow">
                             <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter Email Address" 
                                disabled={status === 'loading' || status === 'success'}
                                className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-brand-rose transition-colors" 
                             />
                         </div>

                         <div className="md:col-span-2 flex justify-center mb-4">
                    <div className="g-recaptcha" data-sitekey="6LfWPTwsAAAAAL7MIvw9G_BLeA7il4BTwNJCu7eN"></div>
                </div>
                         
                         <button 
                            type="submit"
                            disabled={status === 'loading' || status === 'success'}
                            className={`px-8 py-4 rounded-full font-bold transition flex items-center justify-center gap-2 min-w-[160px] ${
                                status === 'success' 
                                ? 'bg-green-500 text-white cursor-default' 
                                : status === 'error'
                                ? 'bg-red-500 text-white'
                                : 'bg-brand-rose text-white hover:bg-white hover:text-brand-charcoal'
                            }`}
                         >
                             {status === 'loading' ? <Loader2 className="animate-spin" /> : 
                              status === 'success' ? <><CheckCircle /> Subscribed</> : 
                              status === 'error' ? <><AlertCircle /> Failed</> : 
                              'Subscribe'}
                         </button>
                     </form>
                     
                     {/* Feedback Message */}
                     {message && (
                        <p className={`mt-4 text-sm font-medium ${status === 'error' ? 'text-red-400' : 'text-green-400'}`}>
                            {message}
                        </p>
                     )}
                 </div>
             </div>
         </div>
      </section>

    </div>
  );
};

export default Team;