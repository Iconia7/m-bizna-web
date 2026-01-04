// src/MpesaModal.jsx
import React, { useState } from 'react';
import { X, Smartphone, Loader, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export default function MpesaModal({ isOpen, onClose, total, onPaymentSuccess }) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("input"); // 'input' | 'success'
  const [statusMessage, setStatusMessage] = useState("");

  const handlePay = async () => {
    if (phone.length < 10) {
      toast.error("Please enter a valid phone number (e.g., 0712345678)");
      return;
    }

    setLoading(true);

    try {
      // Call your new local API
      const res = await fetch('/api/stkpush', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            phone: phone, 
            amount: total // Note: Backend forces this to 1 KES for sandbox safety
        }) 
      });
      
      const data = await res.json();

      // "ResponseCode": "0" means Safaricom accepted the request
      if (data.ResponseCode === "0") {
        const checkoutID = data.CheckoutRequestID;
        checkStatus(checkoutID);

      } else {
        toast.error("STK Push Failed: " + (data.errorMessage || "Unknown Error"));
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("System Error. Please check your internet connection.");
      setLoading(false);
    }
  };

  const checkStatus = async (checkoutID) => {
    let attempts = 0;
    const maxAttempts = 20; // Stop after 60 seconds (20 * 3s)

    const interval = setInterval(async () => {
        attempts++;
        setStatusMessage(`Checking payment status... (${attempts})`);

        try {
            const res = await fetch('/api/query', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ checkoutRequestID: checkoutID })
            });
            const data = await res.json();

            // Safaricom Result Code "0" means Success
            if (data.ResultCode === "0") {
                clearInterval(interval);
                onPaymentSuccess({ 
                    receipt: data.CheckoutRequestID, 
                    phone: phone 
                });
                onClose();
            } 
            // Result Code other than 0 (e.g., 1032) means Cancelled
            else if (data.ResultCode && data.ResultCode !== "0") {
                clearInterval(interval);
                toast.error("Payment Cancelled or Failed.");
                setStep("input");
                setLoading(false);
            }
        } catch (error) {
            // If request fails (e.g. User hasn't typed PIN yet), just keep waiting
            console.log("Waiting for PIN...");
        }

        if (attempts >= maxAttempts) {
            clearInterval(interval);
            toast.error("Payment Timeout. Did you enter your PIN?");
            setStep("input");
            setLoading(false);
        }
    }, 3000); // Check every 3 seconds
  };

  if (!isOpen) return null;

return (
    <div className="fixed inset-0 bg-[#03045E]/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-[2rem] w-full max-w-sm overflow-hidden shadow-2xl">
        
        {/* Header - Kept Green for M-Pesa Brand Trust */}
        <div className="bg-[#24B02E] p-6 text-white text-center relative">
          <button onClick={onClose} className="absolute top-4 right-4 bg-white/20 p-1 rounded-full hover:bg-white/30 transition"><X size={20}/></button>
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
             <Smartphone size={32} className="text-[#24B02E]" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">M-PESA Secure Pay</h2>
        </div>

        {/* Content */}
        <div className="p-8">
            {step === "input" ? (
                <div className="space-y-6">
                    <div className="text-center">
                        <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">Total to Pay</p>
                        <p className="text-4xl font-black text-[#03045E] mt-1">KES {total.toLocaleString()}</p>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-400 mb-2 ml-1">PHONE NUMBER</label>
                        <input 
                            type="tel" 
                            placeholder="07..." 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl font-bold text-xl text-[#03045E] focus:border-[#A7002A] focus:ring-0 outline-none transition-all placeholder:text-gray-300"
                        />
                    </div>

                    {/* Button - UPDATED TO BRAND ROSE & PILL SHAPE */}
                    <button 
                        onClick={handlePay}
                        disabled={loading}
                        className="w-full bg-[#A7002A] text-white py-4 rounded-full font-bold text-lg shadow-[0_10px_20px_rgba(167,0,42,0.3)] hover:bg-[#8a0022] transition-all disabled:opacity-70 flex justify-center items-center gap-2"
                    >
                        {loading ? <Loader className="animate-spin" /> : "Send Prompt"}
                    </button>
                    
                    <div className="flex justify-center items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                        <ShieldCheck size={12} /> Powered by Daraja API
                    </div>
                </div>
            ) : (
                <div className="text-center py-4">
                    <div className="inline-block p-4 rounded-full bg-green-100 text-green-600 mb-4 animate-bounce">
                        <Smartphone size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-[#03045E] mb-2">Check your phone</h3>
                    <p className="text-gray-500 leading-relaxed">
                        We sent a prompt to <b>{phone}</b>.<br/>
                        Please enter your M-Pesa PIN to complete the order.
                    </p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}