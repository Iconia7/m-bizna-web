import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, AlertTriangle, Briefcase, DollarSign } from 'lucide-react';
import picture from '../assets/pattern.png';
import SEO from '../components/SEO';

const Terms = () => {
  return (
    <div className="pt-20">
        <SEO 
  title="Terms of Service | Nexora Creative Solutions"
  description="Read the Terms and Conditions for using Nexora Creative Solutions' website and services. Understanding our agreement ensures a smooth partnership."
  url="/terms"
/>
      
      {/* Header */}
      <section className="relative py-20 text-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={picture} alt="Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-brand-charcoal/55"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 font-creative">Terms & Conditions</h1>
          <div className="flex justify-center gap-2 text-gray-300 text-sm">
            <Link to="/" className="hover:text-white">Home</Link> / <span className="text-brand-rose">Terms</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16 text-gray-700 leading-relaxed">
        
        <p className="mb-10 text-lg">
            Welcome to Nexora Creative Solutions. By accessing our website or using our services, you agree to be bound by these Terms and Conditions.
        </p>

        <div className="space-y-12">
            
            {/* Services */}
            <section>
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-brand-rose text-white p-2 rounded"><Briefcase size={24}/></div>
                    <h2 className="text-2xl font-bold text-brand-charcoal">1. Services</h2>
                </div>
                <p>
                    Nexora Creative Solutions provides software development, design, and digital marketing services. The specific scope of work for each project will be defined in a separate agreement or quote provided to the client.
                </p>
            </section>

            {/* Payments - CRITICAL FOR YOU */}
            <section>
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-brand-rose text-white p-2 rounded"><DollarSign size={24}/></div>
                    <h2 className="text-2xl font-bold text-brand-charcoal">2. Payments & Billing</h2>
                </div>
                <ul className="list-disc pl-6 space-y-3">
                    <li><strong>Deposits:</strong> A deposit of at least <strong>50%</strong> is required before the commencement of any custom development project.</li>
                    <li><strong>Final Payment:</strong> The remaining balance is due upon project completion, before the final handover of codes or credentials.</li>
                    <li><strong>Methods:</strong> We accept payments via M-Pesa (Paybill/Till) and Bank Transfer.</li>
                    <li><strong>Late Fees:</strong> Invoices overdue by more than 14 days may incur a 10% late fee.</li>
                </ul>
            </section>

            {/* Revisions */}
            <section>
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-brand-rose text-white p-2 rounded"><CheckCircle size={24}/></div>
                    <h2 className="text-2xl font-bold text-brand-charcoal">3. Revisions & Approvals</h2>
                </div>
                <p>
                    We provide a set number of revisions (usually 2-3 rounds) as outlined in your quote. Additional changes requested after approval or outside the original scope will be billed at our standard hourly rate.
                </p>
            </section>

            {/* Liability */}
            <section>
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-brand-rose text-white p-2 rounded"><AlertTriangle size={24}/></div>
                    <h2 className="text-2xl font-bold text-brand-charcoal">4. Limitation of Liability</h2>
                </div>
                <p>
                    Nexora Creative Solutions shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our services. We do not guarantee specific results (e.g., SEO rankings or sales) as these depend on market factors beyond our control.
                </p>
            </section>

            {/* Governing Law */}
            <section>
                <h2 className="text-2xl font-bold text-brand-charcoal mb-4">5. Governing Law</h2>
                <p>
                    These terms shall be governed by and construed in accordance with the laws of <strong>Kenya</strong>. Any disputes arising shall be subject to the exclusive jurisdiction of the courts located in Nairobi/Kiambu.
                </p>
            </section>

        </div>

      </div>
    </div>
  );
};

export default Terms;