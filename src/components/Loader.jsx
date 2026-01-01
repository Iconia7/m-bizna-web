import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  // CHANGE THIS PATH to wherever your actual logo is located.
  // If it's in the 'public' folder, "/logo.png" works.
  const logoPath = "/NCS_Secondary_Logo.png"; 

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-md transition-all">
      
      <div className="relative flex items-center justify-center w-36 h-36 mb-6">
        
        {/* 1. The Primary Spinning 'Aura' Ring (Brand Rose) */}
        {/* Creates a premium "swoosh" effect around the logo */}
        <motion.div 
          className="absolute inset-0 border-[3px] border-transparent border-t-brand-rose rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        />

        {/* 2. Secondary Slow Ring (Brand Charcoal Subtle) for depth */}
        <motion.div 
          className="absolute inset-4 border-[2px] border-transparent border-b-brand-charcoal/20 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        
        {/* 3. The Center Logo */}
        <motion.div 
          className="relative z-10 bg-white p-3 rounded-full shadow-sm" // White circle background makes logo pop
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: 1, 
            scale: [1, 1.05, 1] // A very subtle "breathing" pulse
          }} 
          transition={{ 
            opacity: { duration: 0.4 },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          {/* MAKE SURE THIS PATH IS CORRECT */}
          <img 
            src={logoPath} 
            alt="Nexora Loading" 
            className="w-16 h-16 object-contain"
            // Failsafe: hides broken image icon if path is wrong
            onError={(e) => { e.target.style.display = 'none'; }} 
          />
        </motion.div>
      </div>

      {/* Professional Loading Text */}
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-brand-charcoal/60 font-medium tracking-[0.2em] uppercase text-xs"
      >
        Loading Your Experience...
      </motion.p>

    </div>
  );
};

export default Loader;