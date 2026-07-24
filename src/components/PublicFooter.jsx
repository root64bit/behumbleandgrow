import React from 'react';
import { ShieldCheck, Mail, Phone, Globe2 } from 'lucide-react';

export default function PublicFooter() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
      <div className="container space-y-12">
        
        {/* Top Footer Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <img 
              src="/assets/be-humble-grow/logo-reversed-on-navy.webp" 
              alt="Be Humble & Grow Logo" 
              className="h-10 w-auto"
              onError={(e) => {
                e.currentTarget.src = "/assets/be-humble-grow/logo-primary-horizontal.png";
              }}
            />
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Be Humble & Grow provides recruitment technology and structured candidate support. Connecting qualified international talent with licensed UAE employers.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-emerald-500" />
                <span>support@behumbleandgrow.com</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-emerald-500" />
                <span>+971 4 000 0000 (UAE Assistance)</span>
              </div>
            </div>
          </div>

          {/* Column 1: Platform */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#opportunities" className="hover:text-emerald-400 transition-colors">Find Opportunities</a></li>
              <li><a href="#eligibility" className="hover:text-emerald-400 transition-colors">Check Eligibility</a></li>
              <li><a href="#how-it-works" className="hover:text-emerald-400 transition-colors">How It Works</a></li>
              <li><a href="#candidate-dashboard" className="hover:text-emerald-400 transition-colors">Candidate Dashboard</a></li>
            </ul>
          </div>

          {/* Column 2: For Organisations */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">For Organisations</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#employers" className="hover:text-emerald-400 transition-colors">For Employers</a></li>
              <li><a href="#partners" className="hover:text-emerald-400 transition-colors">For Recruitment Partners</a></li>
              <li><a href="#partner-login" className="hover:text-emerald-400 transition-colors">Partner Login</a></li>
              <li><a href="#employer-login" className="hover:text-emerald-400 transition-colors">Employer Login</a></li>
            </ul>
          </div>

          {/* Column 3: Resources & Legal */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#safety" className="hover:text-emerald-400 transition-colors">Recruitment Safety</a></li>
              <li><a href="#faq" className="hover:text-emerald-400 transition-colors">Frequently Asked Questions</a></li>
              <li><a href="#privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-emerald-400 transition-colors">Terms & Conditions</a></li>
              <li><a href="#refund" className="hover:text-emerald-400 transition-colors">Refund Policy</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Disclaimer */}
        <div className="space-y-4 text-center md:text-left text-xs">
          <p className="text-slate-500 leading-relaxed">
            <span className="text-slate-400 font-semibold">Legal & Licensing Disclaimer:</span> Be Humble & Grow provides recruitment technology and structured candidate support. Employment, work-permit and visa decisions remain subject to employers and relevant authorities in the United Arab Emirates.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-900 text-slate-500">
            <p>© 2026 Be Humble & Grow. Licensed Recruitment Platform in the UAE. All Rights Reserved.</p>
            <div className="flex items-center gap-2 text-slate-400">
              <Globe2 className="w-4 h-4 text-slate-500" />
              <span>International Edition (English / UAE)</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
