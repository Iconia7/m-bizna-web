import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import picture from '../assets/pattern.png';
import SEO from '../components/SEO';

const PrivacyPolicy = () => {
  return (
    <div className="pt-20">
        <SEO 
  title="Privacy Policy | Nexora Creative Solutions"
  description="We value your privacy. Read our policy to understand how Nexora Creative Solutions collects, uses, and protects your personal data."
  url="/privacy"
/>
      
      {/* Header */}
      <section className="relative py-20 text-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={picture} alt="Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-brand-charcoal/55"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 font-creative">Privacy Policy</h1>
          <div className="flex justify-center gap-2 text-gray-300 text-sm">
            <Link to="/" className="hover:text-white">Home</Link> / <span className="text-brand-rose">Privacy</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16 text-gray-700 leading-relaxed">
        
        <div className="bg-blue-50 border-l-4 border-brand-rose p-6 mb-12 rounded-r-lg">
            <p className="font-bold text-brand-charcoal mb-1">Effective Date: {new Date().getFullYear()}</p>
            <p>At Nexora Creative Solutions, we value your trust. This policy outlines how we collect, use, and protect your personal information.</p>
        </div>

        <div className="space-y-12">
            <section>
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-brand-charcoal text-white p-2 rounded"><Eye size={24}/></div>
                    <h2 className="text-2xl font-bold text-brand-charcoal">1. Information We Collect</h2>
                </div>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Personal Details:</strong> Name, Email address, Phone number (for M-Pesa transactions).</li>
                    <li><strong>Project Data:</strong> Information related to your website, app, or design requirements.</li>
                    <li><strong>Payment Information:</strong> M-Pesa Transaction Codes and payment confirmation details. <em>We do not store credit card numbers directly on our servers.</em></li>
                </ul>
            </section>

            <section>
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-brand-charcoal text-white p-2 rounded"><FileText size={24}/></div>
                    <h2 className="text-2xl font-bold text-brand-charcoal">2. How We Use Your Information</h2>
                </div>
                <p className="mb-4">We use your data solely for:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Providing and delivering our digital services.</li>
                    <li>Processing payments and sending receipts/invoices.</li>
                    <li>Communicating with you regarding project updates.</li>
                    <li>Improving our website and service offerings.</li>
                </ul>
            </section>

            <section>
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-brand-charcoal text-white p-2 rounded"><Lock size={24}/></div>
                    <h2 className="text-2xl font-bold text-brand-charcoal">3. Data Security</h2>
                </div>
                <p>
                    We implement industry-standard security measures (including SSL encryption and secure databases like Firebase) to protect your data from unauthorized access. However, no method of transmission over the internet is 100% secure.
                </p>
            </section>

            <section>
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-brand-charcoal text-white p-2 rounded"><Shield size={24}/></div>
                    <h2 className="text-2xl font-bold text-brand-charcoal">4. Third-Party Services</h2>
                </div>
                <p>
                    We may use trusted third-party services (such as Google Analytics, EmailJS, and Firebase) to operate our business. These parties have their own privacy policies and we encourage you to review them.
                </p>
            </section>

            <section className="border-t border-gray-200 pt-8">
                <h2 className="text-xl font-bold text-brand-charcoal mb-4">Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                <p className="font-bold text-brand-rose mt-2">info@nexoracreatives.co.ke</p>
            </section>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;