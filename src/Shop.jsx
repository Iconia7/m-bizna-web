import React, { useState } from 'react';
import { ShoppingBag, Clock, ShieldCheck, ArrowLeft, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
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
    id: 4, // Fixed ID
    name: "Nexora 'Source Code' Hoodie (Black)",
    price: 2800, 
    image: "/images/hoodie-mockup1.png", 
    tag: "Heavyweight Cotton",
    shipsIn: "3-5 Days",
    sizes: ["M", "L", "XL", "XXL"]
  },
   {
    id: 5, // Fixed ID
    name: "Nexora 'Source Code' Hoodie (Gray)",
    price: 2800, 
    image: "/images/hoodie-mockup2.png", 
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
    name: "Nexora Developer Tee (White)",
    price: 700,
    image: "/images/tee-mockup.png",
    tag: "Essential",
    shipsIn: "2 Days",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 6, // Fixed ID
    name: "Nexora Developer Tee (Black)",
    price: 700,
    image: "/images/tee-mockup1.png",
    tag: "Essential",
    shipsIn: "2 Days",
    sizes: ["S", "M", "L", "XL"]
  }
];

// --- RECEIPT VIEW (Styled to match Agency) ---
const ReceiptView = ({ transaction, item, size, onBack }) => {
  const date = new Date().toLocaleString();
  const adminPhone = "254115332870"; 

  const handleWhatsApp = () => {
    const message = `🧾 *PAYMENT CONFIRMED* \n\n` +
                    `Order Ref: ${transaction.receipt}\n` +
                    `Item: ${item.name}\n` +
                    `Size: ${size}\n` +
                    `Amount: KES ${item.price}\n\n` +
                    `Please ship to my location.`;
    const url = `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden relative border border-gray-100">
        {/* Success Header - Using Brand Colors */}
        <div className="bg-brand-charcoal p-8 text-center relative overflow-hidden">
           {/* Background Pattern Overlay */}
           <div className="absolute inset-0 opacity-10" style={{backgroundImage: `url('/pattern.png')`}}></div>
           
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce">
                <CheckCircle size={32} className="text-brand-rose" />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight font-creative">PAYMENT SUCCESSFUL</h2>
            <p className="text-gray-300 text-sm font-medium">Transaction Confirmed</p>
          </div>
        </div>

        {/* Receipt Details */}
        <div className="p-8 space-y-6">
          <div className="text-center border-b border-gray-100 pb-6">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Total Paid</p>
            <p className="text-4xl font-black text-brand-charcoal">KES {item.price.toLocaleString()}</p>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">M-Pesa Ref</span>
              <span className="font-bold text-brand-charcoal">{transaction.receipt}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Date</span>
              <span className="font-bold text-brand-charcoal text-right">{date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Item</span>
              <span className="font-bold text-brand-charcoal">{item.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Size</span>
              <span className="font-bold text-brand-rose bg-red-50 px-3 py-1 rounded-full">{size}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <button 
              onClick={handleWhatsApp}
              className="w-full bg-brand-rose text-white py-4 rounded-full font-bold hover:bg-white hover:text-brand-rose border border-brand-rose transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <span className="text-xl">👉</span> Send to Nexora for Delivery
            </button>
            
            <button 
              onClick={onBack}
              className="w-full bg-white border border-gray-200 text-gray-400 py-3 rounded-full font-bold hover:bg-gray-50 transition"
            >
              Close Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- ANIMATIONS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Shop({ onBack }) { 
  const [view, setView] = useState('shop');
  const [successData, setSuccessData] = useState(null);
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
    <>
      {/* CONDITIONAL RENDERING */}
      {view === 'receipt' && successData ? (
        <ReceiptView 
            transaction={successData.details}
            item={successData.item}
            size={successData.size}
            onBack={() => {
                setView('shop');
                setSelectedItem(null);
            }}
        />
      ) : (
    <div className="bg-white min-h-screen pb-20 font-sans text-brand-charcoal">
      
      {/* --- NAVBAR (Brand Aligned) --- */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-3 flex items-center justify-between shadow-sm">
         <div className="flex items-center gap-4">
             {onBack && (
                 <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition text-brand-charcoal">
                     <ArrowLeft size={24} />
                 </button>
             )}
             
             {/* THE LOGO (Matches Home Page) */}
             <div className="flex items-center gap-2">
                 <img src="/NCS_Logo.png" alt="Nexora Logo" className="h-10 w-auto" />
                 <span className="text-brand-charcoal font-black text-xl hidden md:block tracking-tight">SHOP</span>
             </div>
         </div>
         
         <div className="flex items-center gap-3">
             <div className="text-[10px] md:text-xs font-bold bg-brand-charcoal text-white px-4 py-2 rounded-full shadow-lg tracking-widest uppercase">
                 Pre-Order Open
             </div>
         </div>
      </div>

      {/* --- HERO SECTION (Matches Home Page Style) --- */}
      <div className="relative bg-brand-charcoal text-white py-20 overflow-hidden font-creative">
         {/* Pattern Overlay */}
         <div 
            className="absolute inset-0 opacity-20" 
            style={{
    backgroundImage: `url('/pattern.png')`,
    backgroundSize: '300px auto'
}}
         ></div>
         
         <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="px-6 text-center max-w-3xl mx-auto relative z-10"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
              WEAR THE <span className="text-brand-rose">CODE.</span>
            </h2>
            <p className="text-gray-300 text-lg md:text-xl font-sans max-w-xl mx-auto">
                Official Agency Merchandise. Engineered in Nairobi. Printed in Thika.
            </p>
          </motion.div>
      </div>

      {/* --- PRODUCT GRID --- */}
      <div className="px-6 py-12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 -mt-10 relative z-10">
        {MERCH.map((item, index) => (
          <motion.div 
            key={item.id} 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group flex flex-col bg-white rounded-[2rem] p-4 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-brand-rose/10 transition-all duration-300 border border-gray-100"
          >
            
            {/* Image Card */}
            <div className="bg-gray-50 rounded-[1.5rem] p-6 mb-6 relative overflow-hidden">
               <motion.img 
                 whileHover={{ scale: 1.1 }}
                 src={item.image} 
                 alt={item.name} 
                 className="w-full h-64 object-contain mix-blend-multiply" 
               />
               <div className="absolute top-4 left-4 bg-white/90 backdrop-blur border border-gray-200 text-xs font-bold px-3 py-1 rounded-full text-brand-charcoal">
                 {item.tag}
               </div>
            </div>

            {/* Details */}
            <div className="px-2">
                <div className="mb-2 flex justify-between items-start">
                    <h3 className="text-lg font-bold text-brand-charcoal leading-tight">{item.name}</h3>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                     <span className="text-2xl font-black text-brand-rose">Ksh {item.price.toLocaleString()}</span>
                     <p className="text-xs text-gray-400 flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
                        <Clock size={12}/> {item.shipsIn}
                     </p>
                </div>

                {/* Size Selector */}
                <p className="text-xs font-bold text-gray-400 uppercase mb-2">Select Size</p>
                <div className="flex flex-wrap gap-2 mb-6">
                {item.sizes.map(size => (
                    <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 text-sm font-bold rounded-full border transition-all ${
                        selectedSize === size 
                        ? "bg-brand-charcoal text-white border-brand-charcoal scale-110 shadow-lg" 
                        : "bg-white text-gray-400 border-gray-200 hover:border-brand-rose hover:text-brand-rose"
                    }`}
                    >
                    {size}
                    </button>
                ))}
                </div>

                {/* Action Button - EXACT MATCH TO HOME PAGE BUTTONS */}
                <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleBuy(item)}
                className="w-full bg-brand-rose text-white py-4 rounded-full font-bold hover:bg-white hover:text-brand-rose border-2 border-brand-rose transition-all flex justify-center items-center gap-2 shadow-[0_10px_20px_rgba(167,0,42,0.2)]"
                >
                <ShoppingBag size={20} />
                Pre-Order Now
                </motion.button>
                
                <div className="mt-4 text-center">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center justify-center gap-1">
                        <ShieldCheck size={12} /> Secured by PayHero
                    </span>
                </div>
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
                    setSuccessData({
                        details: details,
                        item: selectedItem,
                        size: selectedSize
                    });
                    setIsPaymentOpen(false);
                    setView('receipt'); 
                    toast.success("Payment Successful!");
                }}
            />
          )}
        </div>
      )}
    </>
  );
}