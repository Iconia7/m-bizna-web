import React, { useState } from 'react';
import { ShoppingBag, Clock, ShieldCheck, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion'; // Added for brand consistency
import toast from 'react-hot-toast';
import MpesaModal from './MpesaModal';

// --- INVENTORY DATA ---
const MERCH = [
  {
    id: 1,
    name: "Nexora 'Source Code' Hoodie",
    price: 2800, 
    image: "/images/hoodie-mockup.png", 
    tag: "Heavyweight Cotton",
    shipsIn: "3-5 Days",
    sizes: ["M", "L", "XL", "XXL"]
  },
  {
    id: 2,
    name: "Agency Sweatshirt (White/Maroon)",
    price: 2000,
    image: "/images/sweatshirt-mockup.png",
    tag: "Limited Drop",
    shipsIn: "3-5 Days",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 3,
    name: "Nexora Developer Tee",
    price: 700,
    image: "/images/tee-mockup.png",
    tag: "Essential",
    shipsIn: "2 Days",
    sizes: ["S", "M", "L", "XL"]
  }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Shop({ onBack }) { 
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState(""); 
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const handleBuy = (item) => {
    if (!selectedSize) {
      toast.error("Please select your size first.");
      return;
    }
    setSelectedItem(item);
    setIsPaymentOpen(true);
  };

  return (
    <div className="bg-white min-h-screen pb-20 font-sans text-[#03045E]">
      
      {/* Navbar / Header */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between">
         <div className="flex items-center gap-4">
             {onBack && (
                 <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition">
                     <ArrowLeft size={20} className="text-[#03045E]" />
                 </button>
             )}
             <h1 className="text-xl font-black tracking-tighter text-[#03045E]">
                NEXORA<span className="text-[#A7002A]">.SHOP</span>
             </h1>
         </div>
         <div className="text-xs font-bold bg-[#03045E] text-white px-4 py-2 rounded-full shadow-lg">
             PRE-ORDER OPEN
         </div>
      </div>

      {/* Hero Section */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="px-6 py-12 text-center max-w-2xl mx-auto"
      >
        <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
          WEAR THE <span className="text-[#A7002A]">CODE.</span>
        </h2>
        <p className="text-gray-500 text-lg">Official Agency Merchandise. Printed on premium heavy cotton in Thika.</p>
      </motion.div>

      {/* Product Grid */}
      <div className="px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {MERCH.map((item, index) => (
          <motion.div 
            key={item.id} 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group flex flex-col"
          >
            
            {/* Image Card */}
            <div className="bg-gray-50 rounded-[2.5rem] p-6 mb-6 relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200 border border-transparent hover:border-[#A7002A]/10">
               <motion.img 
                 whileHover={{ scale: 1.1 }}
                 src={item.image} 
                 alt={item.name} 
                 className="w-full h-64 object-contain mix-blend-multiply" 
               />
               <div className="absolute top-4 left-4 bg-white/90 backdrop-blur border border-gray-200 text-xs font-bold px-3 py-1 rounded-full text-[#03045E]">
                 {item.tag}
               </div>
            </div>

            {/* Details */}
            <div className="mb-2 flex justify-between items-start">
                <h3 className="text-xl font-bold text-[#03045E]">{item.name}</h3>
                <span className="text-lg font-bold text-[#A7002A]">Ksh {item.price.toLocaleString()}</span>
            </div>
            
            <p className="text-xs text-gray-400 flex items-center gap-1 mb-4">
                <Clock size={12}/> Ships in {item.shipsIn}
            </p>

            {/* Size Selector */}
            <div className="flex flex-wrap gap-2 mb-6">
              {item.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 text-sm font-bold rounded-full border transition-all ${
                    selectedSize === size 
                    ? "bg-[#03045E] text-white border-[#03045E] scale-110 shadow-lg" 
                    : "bg-white text-gray-400 border-gray-200 hover:border-[#A7002A] hover:text-[#A7002A]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Action Button - BRAND MATCHED */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleBuy(item)}
              className="mt-auto w-full bg-[#A7002A] text-white py-4 rounded-full font-bold hover:bg-[#8a0022] transition-colors flex justify-center items-center gap-2 shadow-[0_10px_20px_rgba(167,0,42,0.2)]"
            >
              <ShoppingBag size={18} />
              Pre-Order Now
            </motion.button>
            
            <div className="mt-3 flex justify-center gap-1 text-[10px] text-gray-400 font-medium uppercase tracking-widest">
                <ShieldCheck size={12} /> Secured by PayHero
            </div>
          </motion.div>
        ))}
      </div>

      {/* Payment Modal Integration */}
      {selectedItem && (
        <MpesaModal 
            isOpen={isPaymentOpen} 
            onClose={() => setIsPaymentOpen(false)}
            total={selectedItem.price} 
            onPaymentSuccess={(details) => {
                toast.success(`SUCCESS! Order Reference: ${details.receipt}.`);
                setIsPaymentOpen(false);
            }}
        />
      )}
    </div>
  );
}