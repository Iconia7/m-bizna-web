import React from 'react';
import { pricing } from '../data';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom'; // <--- Import Link for the header

const Pricing = () => {
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
                        Pricing Plan
                      </h1>
                      <div className="flex justify-center gap-2 text-gray-300 text-sm font-medium">
                        <Link to="/" className="hover:text-white transition-colors">Home</Link> / 
                        {/* CHANGE THIS BREADCRUMB PER PAGE */}
                        <span className="text-brand-rose">Pricing</span>
                      </div>
                    </div>
                  </section>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {pricing.map((plan, idx) => (
            <div key={idx} className={`p-8 rounded-2xl ${plan.recommended ? 'bg-brand-charcoal text-white ring-4 ring-brand-rose' : 'bg-white border border-gray-200 text-brand-charcoal'}`}>
              {plan.recommended && <div className="bg-brand-rose text-white text-xs font-bold px-3 py-1 inline-block rounded-full mb-4">Most Popular</div>}
              <h3 className="text-xl font-bold mb-4">{plan.plan}</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className={`text-sm ${plan.recommended ? 'text-gray-400' : 'text-gray-500'}`}>{plan.period}</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-3">
                    <Check size={18} className={plan.recommended ? 'text-brand-rose' : 'text-green-500'} />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-3 rounded-lg font-bold transition ${
                plan.recommended 
                ? 'bg-brand-rose hover:bg-white hover:text-brand-rose' 
                : 'bg-blue-50 text-brand-charcoal hover:bg-brand-charcoal hover:text-white'
              }`}>
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;