import React, { useState } from 'react';
import { pricing } from '../data';
import { Check, X, Smartphone, CreditCard, FileText, Loader2, CheckCircle, AlertCircle, Copy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; 
import { db } from '../firebase'; 
import emailjs from '@emailjs/browser';
import picture from '../assets/pattern.png';
import { Helmet } from 'react-helmet-async';
import { useRef } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

const Pricing = () => {
  // --- STATE MANAGEMENT ---
  const [selectedPlan, setSelectedPlan] = useState(null); // Stores the plan user clicked
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('mpesa'); // 'mpesa', 'invoice', 'visa'

  const captchaRef = useRef(null);
  
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', mpesaCode: '' });
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'

  // Open Modal
  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
    setStatus('idle');
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ name: '', email: '', phone: '', mpesaCode: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- SUBMIT LOGIC ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Validation
    if(!formData.name || !formData.email || !formData.phone) {
        alert("Please fill in your contact details.");
        return;
    }
    if(paymentMethod === 'mpesa' && !formData.mpesaCode) {
        alert("Please enter the M-Pesa Transaction Code.");
        return;
    }

    
const token = captchaRef.current.getValue();
if (!token) {
    alert("Please verify that you are not a robot.");
    return;
}

    setStatus('loading');

    try {
        // 1. Determine Status based on Method
        const paymentStatus = paymentMethod === 'mpesa' ? 'Paid (Verify Code)' : 'Pending (Invoice)';

        // 2. Save Order to Firebase
        await addDoc(collection(db, "orders"), {
            customer: formData,
            plan: selectedPlan,
            method: paymentMethod,
            amount: selectedPlan.price,
            status: paymentStatus,
            timestamp: serverTimestamp()
        });

        // 3. Prepare Email Content
        const serviceID = "service_nhwsclu"; 
        const templateID = "template_61eywtf"; 
        const publicKey = "ctUKvg88_0Th5sfKn";

        // Admin Notification
        const adminMessage = `
            NEW ORDER RECEIVED!
            
            Plan: ${selectedPlan.plan} (${selectedPlan.price})
            Customer: ${formData.name}
            Phone: ${formData.phone}
            Method: ${paymentMethod.toUpperCase()}
            ${paymentMethod === 'mpesa' ? `M-Pesa Code: ${formData.mpesaCode}` : 'Action: Send Invoice manually'}
        `;

        // Client Receipt / Invoice
        let clientSubject = "";
        let clientBody = "";

        if(paymentMethod === 'mpesa') {
            clientSubject = `Payment Receipt - ${selectedPlan.plan}`;
            clientBody = `Hi ${formData.name},\n\nThank you for your payment of KES ${selectedPlan.price}. We have received your M-Pesa code (${formData.mpesaCode}) and are processing your order.\n\nPlan: ${selectedPlan.plan}\nStatus: Paid\n\nWelcome to Nexora!`;
        } else {
            clientSubject = `Invoice Generated - ${selectedPlan.plan}`;
            clientBody = `Hi ${formData.name},\n\nThank you for choosing the ${selectedPlan.plan}. Please find your invoice details below:\n\nAmount Due: KES ${selectedPlan.price}\nPaybill: 247247\nAccount: 0340183028114\n\nPlease make payment within 24 hours to activate your service.\n\nBest,\nNexora Team`;
        }

        const adminParams = {
            to_email: "info@nexoracreatives.co.ke",
            from_name: "Nexora Billing",
            reply_to: formData.email,
            subject: `New Order: ${selectedPlan.plan}`,
            message_body: adminMessage
        };

        const clientParams = {
            to_email: formData.email,
            from_name: "Nexora Billing Team",
            reply_to: "info@nexoracreatives.co.ke",
            subject: clientSubject,
            message_body: clientBody
        };

        // 4. Send Emails
        await Promise.all([
            emailjs.send(serviceID, templateID, adminParams, publicKey),
            emailjs.send(serviceID, templateID, clientParams, publicKey)
        ]);

        setStatus('success');
        captchaRef.current.reset();
        setTimeout(() => closeModal(), 5000);

    } catch (error) {
        console.error("Payment Error:", error);
        setStatus('error');
    }
  };

  return (
    <div className="pt-20">
        <Helmet>
                <title>Pricing - Nexora Creative Solutions</title>
                <meta name="description" content="Nexora Creative Solutions is a leading tech agency in Kenya specializing in Web Development, Mobile Apps, and Digital Marketing." />
              </Helmet>
      
      {/* 1. Header Section */}
      <section className="relative py-24 text-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={picture} alt="Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-brand-charcoal/55"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-creative">Pricing Plans</h1>
          <div className="flex justify-center gap-2 text-gray-300 text-sm font-medium">
            <Link to="/" className="hover:text-white transition-colors">Home</Link> / 
            <span className="text-brand-rose">Pricing</span>
          </div>
        </div>
      </section>

      {/* 2. Pricing Grid */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {pricing.map((plan, idx) => (
            <div 
              key={idx} 
              className={`relative p-8 rounded-2xl transition-transform duration-300 hover:-translate-y-2 flex flex-col ${
                plan.recommended 
                ? 'bg-brand-charcoal text-white ring-4 ring-brand-rose shadow-2xl scale-105 z-10' 
                : 'bg-white border border-gray-200 text-brand-charcoal shadow-lg'
              }`}
            >
              {plan.recommended && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand-rose text-white text-xs font-bold px-4 py-1 rounded-full shadow-md uppercase tracking-wide">
                  Most Popular
                </div>
              )}

              <h3 className="text-xl font-bold mb-4">{plan.plan}</h3>
              
              <div className="flex items-baseline mb-2">
                <span className="text-2xl font-bold mr-1">KES</span>
                <span className="text-4xl font-extrabold">{plan.price}</span>
              </div>
              <p className={`text-sm mb-6 ${plan.recommended ? 'text-gray-400' : 'text-gray-500'}`}>
                {plan.period}
              </p>
              
              <div className={`h-px w-full mb-6 ${plan.recommended ? 'bg-gray-700' : 'bg-gray-100'}`}></div>

              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3">
                    <Check size={20} className={`mt-0.5 flex-shrink-0 ${plan.recommended ? 'text-brand-rose' : 'text-green-500'}`} />
                    <span className="text-sm leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => handleSelectPlan(plan)}
                className={`w-full py-4 rounded-xl font-bold transition shadow-lg ${
                plan.recommended 
                ? 'bg-brand-rose hover:bg-white hover:text-brand-rose text-white' 
                : 'bg-gray-100 text-brand-charcoal hover:bg-brand-charcoal hover:text-white'
              }`}>
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 3. CHECKOUT MODAL */}
      <AnimatePresence>
        {isModalOpen && selectedPlan && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-charcoal/80 backdrop-blur-sm"
            >
                <motion.div 
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="bg-white rounded-3xl w-full max-w-2xl relative shadow-2xl overflow-hidden flex flex-col md:flex-row"
                >
                    {/* Close Button */}
                    <button onClick={closeModal} className="absolute top-4 right-4 z-20 text-gray-400 hover:text-brand-rose bg-white rounded-full p-1">
                        <X size={24} />
                    </button>

                    {/* Left Side: Order Summary */}
                    <div className="bg-brand-charcoal text-white p-8 md:w-2/5 flex flex-col justify-between">
                        <div>
                            <h3 className="text-gray-400 uppercase text-xs font-bold tracking-wider mb-2">Order Summary</h3>
                            <h2 className="text-3xl font-bold mb-1">{selectedPlan.plan}</h2>
                            <p className="text-brand-rose text-lg font-bold">KES {selectedPlan.price} <span className="text-xs text-gray-400 font-normal">/project</span></p>
                        </div>
                        <div className="mt-8 space-y-3">
                            {selectedPlan.features.slice(0, 3).map((feat, i) => (
                                <div key={i} className="flex gap-2 text-sm text-gray-300">
                                    <Check size={16} className="text-brand-rose shrink-0"/> {feat}
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 pt-6 border-t border-gray-700">
                            <p className="text-xs text-gray-500">Total Due Today</p>
                            <p className="text-2xl font-bold">KES {selectedPlan.price}</p>
                        </div>
                    </div>

                    {/* Right Side: Payment Form */}
                    <div className="p-8 md:w-3/5 bg-gray-50">
                        <h3 className="text-xl font-bold text-brand-charcoal mb-6">Secure Checkout</h3>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Personal Info */}
                            <div className="space-y-3">
                                <input 
                                    type="text" name="name" placeholder="Full Name" required 
                                    value={formData.name} onChange={handleChange}
                                    className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-brand-rose text-sm"
                                />
                                <input 
                                    type="email" name="email" placeholder="Email Address" required 
                                    value={formData.email} onChange={handleChange}
                                    className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-brand-rose text-sm"
                                />
                                <input 
                                    type="tel" name="phone" placeholder="Phone Number" required 
                                    value={formData.phone} onChange={handleChange}
                                    className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-brand-rose text-sm"
                                />
                            </div>

                            {/* Payment Method Selector */}
                            <div className="grid grid-cols-3 gap-2 mt-4">
                                <button 
                                    type="button"
                                    onClick={() => setPaymentMethod('mpesa')}
                                    className={`p-2 rounded-lg border flex flex-col items-center justify-center gap-1 text-xs font-bold transition ${paymentMethod === 'mpesa' ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
                                >
                                    <Smartphone size={20}/> M-Pesa
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setPaymentMethod('invoice')}
                                    className={`p-2 rounded-lg border flex flex-col items-center justify-center gap-1 text-xs font-bold transition ${paymentMethod === 'invoice' ? 'border-brand-rose bg-red-50 text-brand-rose' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
                                >
                                    <FileText size={20}/> Invoice
                                </button>
                                <button 
                                    type="button"
                                    disabled
                                    className="p-2 rounded-lg border border-gray-100 flex flex-col items-center justify-center gap-1 text-xs font-bold text-gray-300 cursor-not-allowed"
                                >
                                    <CreditCard size={20}/> Visa
                                </button>
                            </div>

                            {/* Dynamic Payment Content */}
                            <div className="mt-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                                {paymentMethod === 'mpesa' ? (
                                    <div className="space-y-3">
                                        <div className="text-center">
                                            <p className="text-xs text-gray-500 uppercase font-bold">Paybill Number</p>
                                            <p className="text-2xl font-bold text-green-600 tracking-widest flex items-center justify-center gap-2">
                                                247247 <Copy size={14} className="cursor-pointer text-gray-400 hover:text-black"/>
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">Account: 0340183028114</p>
                                        </div>
                                        <input 
                                            type="text" name="mpesaCode" placeholder="Enter M-Pesa Transaction Code (e.g. SGH...)" 
                                            value={formData.mpesaCode} onChange={handleChange}
                                            className="w-full p-3 rounded-lg border border-green-200 bg-green-50 focus:outline-none focus:border-green-500 text-sm font-bold text-center uppercase tracking-wider placeholder-green-700/50"
                                        />
                                    </div>
                                ) : (
                                    <div className="text-center py-2">
                                        <FileText size={32} className="mx-auto text-brand-rose mb-2"/>
                                        <p className="text-sm font-bold text-brand-charcoal">Pay Later</p>
                                        <p className="text-xs text-gray-500">We will email you the invoice with payment instructions.</p>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-center mb-4">
    <ReCAPTCHA
        ref={captchaRef}
        sitekey="6LfWPTwsAAAAAL7MIvw9G_BLeA7il4BTwNJCu7eN"
    />
</div>

                            {/* Submit Button */}
                            <button 
                                type="submit"
                                disabled={status === 'loading' || status === 'success'}
                                className={`w-full py-4 rounded-xl font-bold transition flex items-center justify-center gap-2 ${
                                    status === 'success' ? 'bg-green-500 text-white' : 
                                    'bg-brand-charcoal text-white hover:bg-brand-rose'
                                }`}
                            >
                                {status === 'loading' ? <Loader2 className="animate-spin"/> : 
                                 status === 'success' ? <><CheckCircle/> Order Confirmed!</> : 
                                 paymentMethod === 'mpesa' ? 'Confirm Payment' : 'Generate Invoice'}
                            </button>
                        </form>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Pricing;