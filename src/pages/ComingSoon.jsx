import React, { useState, useEffect } from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 45,
    hours: 14,
    minutes: 48,
    seconds: 18
  });

  // Simple countdown logic simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
            else {
              hours = 23;
              if (days > 0) days--;
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      
      {/* Left: Image Side */}
      <div className="w-full md:w-1/2 relative h-[400px] md:h-screen">
        <img 
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80" 
          alt="Coming Soon" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-charcoal/20"></div>
        
        {/* Testimonial Overlay */}
        <div className="absolute bottom-10 left-10 right-10 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-white hidden md:block">
            <p className="italic mb-4 text-lg">"We are building something extraordinary. Stay tuned for the launch of Nexora's new digital experience platform."</p>
            <div>
                <h4 className="font-bold">Jenny Alexander</h4>
                <p className="text-sm opacity-80">CEO, Nexora</p>
            </div>
        </div>
      </div>

      {/* Right: Content Side */}
      <div className="w-full md:w-1/2 p-10 md:p-20 flex flex-col justify-center bg-white relative">
         <Link to="/" className="absolute top-10 left-10 text-2xl font-bold text-brand-charcoal flex items-center gap-2">
            Nexora<span className="text-brand-rose">.</span>
         </Link>

         <div className="max-w-lg mx-auto w-full">
             <span className="text-brand-rose font-bold uppercase tracking-wider text-sm mb-4 block">// Coming Soon</span>
             <h1 className="text-5xl md:text-6xl font-extrabold text-brand-charcoal mb-6 leading-tight">
                 Get Notified When <br/> We <span className="text-brand-rose">Launch!</span>
             </h1>

             {/* Countdown */}
             <div className="flex gap-6 mb-12 text-center">
                 {[
                     { label: 'Days', val: timeLeft.days },
                     { label: 'Hours', val: timeLeft.hours },
                     { label: 'Minutes', val: timeLeft.minutes },
                     { label: 'Seconds', val: timeLeft.seconds }
                 ].map((item, idx) => (
                     <div key={idx} className="flex-1">
                         <div className="text-4xl md:text-5xl font-bold text-brand-charcoal mb-2 font-mono">
                             {String(item.val).padStart(2, '0')}
                         </div>
                         <p className="text-gray-500 text-sm uppercase">{item.label}</p>
                     </div>
                 ))}
             </div>

             <div className="mb-10">
                 <p className="text-gray-600 mb-4 font-medium">Get notified when site goes live:</p>
                 <div className="flex gap-4">
                     <input type="email" placeholder="Enter your email" className="w-full px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:border-brand-rose bg-gray-50" />
                     <button className="bg-brand-rose text-white px-8 py-4 rounded-full font-bold hover:bg-brand-charcoal transition shadow-lg">
                         Subscribe
                     </button>
                 </div>
             </div>

             <div className="flex gap-4">
                 {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                     <a key={i} href="#" className="w-12 h-12 bg-brand-rose text-white rounded-full flex items-center justify-center hover:bg-brand-charcoal transition shadow-md">
                        <Icon size={20}/>
                     </a>
                 ))}
             </div>
             
             <div className="mt-12 text-gray-400 text-sm">
                 Copyright © {new Date().getFullYear()} Nexora Creative Solutions.
             </div>
         </div>
      </div>

    </div>
  );
};

export default ComingSoon;