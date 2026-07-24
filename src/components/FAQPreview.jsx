import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';

export default function FAQPreview() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: "How does the eligibility assessment work?",
      a: "Our preliminary eligibility check evaluates your work history, qualifications, language proficiency, and relocation preferences against mandatory UAE labor and visa standards."
    },
    {
      q: "Does creating a profile guarantee employment?",
      a: "No. Creating a profile allows you to present your verified credentials to employers. Selection, interview outcomes, and offer issuance remain at the sole discretion of hiring organizations."
    },
    {
      q: "Which documents will I need?",
      a: "Initially, you will need an updated CV, a copy of your valid passport, and relevant educational or trade certificates. Additional verification items may be requested based on the specific job role."
    },
    {
      q: "How are recruitment companies involved?",
      a: "Licensed recruitment partners manage candidate lead distribution, document verification, and employer coordination through our secure multi-tenant platform."
    },
    {
      q: "How are interviews arranged?",
      a: "Once shortlisted by an employer, interviews are scheduled through our video platform or coordinated directly by our approved recruitment partners."
    },
    {
      q: "Who decides work-permit and visa approval?",
      a: "Work permits and residence visas are issued exclusively by the relevant Ministry of Human Resources and Authority (MOHRE & GDRFA) in the United Arab Emirates upon successful employer sponsorship."
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-extrabold tracking-wider uppercase text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
            Frequently Asked Questions
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Questions before you begin?
          </h2>

          <p className="text-base text-slate-600 font-normal">
            Find answers to common questions about eligibility, application processes, and recruitment security.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx} 
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all shadow-sm"
              >
                <button 
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-base focus:outline-none hover:bg-slate-50 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-emerald-600' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* View All Action */}
        <div className="mt-10 text-center">
          <a href="#faq" className="btn btn-secondary text-sm px-6 py-2.5">
            <span>View All Questions</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
