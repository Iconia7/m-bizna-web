import React from 'react';
import { pricing } from '../data';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import picture from '../assets/pattern.png';

const Pricing = () => {
  return (
    <div className="pt-20">
      
      {/* 1. Header Section */}
      <section className="relative py-24 text-center text-white overflow-hidden">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img 
            src={picture}
            alt="Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-charcoal/55"></div>
        </div>

        {/* Content Layer */}
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-creative">
            Pricing Plans
          </h1>
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
              className={`relative p-8 rounded-2xl transition-transform duration-300 hover:-translate-y-2 ${
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

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3">
                    <Check size={20} className={`mt-0.5 flex-shrink-0 ${plan.recommended ? 'text-brand-rose' : 'text-green-500'}`} />
                    <span className="text-sm leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-4 rounded-xl font-bold transition shadow-lg ${
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
    </div>
  );
};

export default Pricing;