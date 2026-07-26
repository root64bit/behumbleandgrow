import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export function CandidateSupportFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is there any candidate application or agency fee charged to candidates?',
      a: 'No. Be Humble & Grow operates strictly in accordance with UAE Ministry of Human Resources & Emiratisation (MOHRE) laws. No candidate fee is charged for recruitment or placement.',
    },
    {
      q: 'How long does the UAE MOHRE Work Permit approval process take?',
      a: 'Standard MOHRE work permit approvals typically take between 5 to 10 business days once submitted by your sponsoring employer.',
    },
    {
      q: 'What documents are mandatory for verification in my Document Vault?',
      a: 'You must upload a valid International Passport (bio page), an updated CV, and relevant educational or professional certificates.',
    },
    {
      q: 'How do I prepare for my employer video interview?',
      a: 'Ensure you have a quiet environment, stable internet connection, and your original passport ready for identity verification.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-4 text-left">
      <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        <HelpCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <h2 className="text-sm font-bold text-slate-900 dark:text-white">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-2">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="border border-slate-200/80 dark:border-slate-800 rounded-xl overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFaq(i)}
                className="w-full p-3.5 text-left flex items-center justify-between gap-3 bg-slate-50/60 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
                aria-expanded={isOpen}
              >
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  {faq.q}
                </span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>
              {isOpen && (
                <div className="p-3.5 pt-0 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
