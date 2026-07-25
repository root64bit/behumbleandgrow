import React, { useState } from 'react';
import { LifeBuoy, MessageSquare, Send, CheckCircle2, Phone, Mail, HelpCircle, FileText } from 'lucide-react';

export default function CandidateSupportPage() {
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('verification');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const faqs = [
    { q: 'Is there any candidate application or agency fee charged to candidates?', a: 'No. Be Humble & Grow operates strictly in accordance with UAE Ministry of Human Resources & Emiratisation (MOHRE) laws. No candidate fee is charged for recruitment or placement.' },
    { q: 'How long does the UAE MOHRE Work Permit approval take?', a: 'Standard MOHRE work permit approvals typically take between 5 to 10 business days once submitted by your sponsoring employer.' },
    { q: 'What documents are mandatory for verification?', a: 'You must upload a valid International Passport (bio page), an updated CV, and relevant educational or professional certificates.' },
    { q: 'How do I prepare for my employer video interview?', a: 'Ensure you have a quiet environment, stable internet connection, and your original passport ready for identity verification.' },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto text-left">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full text-xs font-bold mb-2">
          <LifeBuoy className="w-3.5 h-3.5 text-emerald-600" />
          <span>Candidate Support Centre</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Help & Support Hub
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Access candidate guidance, submit support tickets, or contact compliance officers.
        </p>
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
          <HelpCircle className="w-4 h-4 text-emerald-600" />
          <span>Frequently Asked Questions</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, i) => (
            <div key={i} className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
              <h4 className="text-xs font-bold text-slate-900">{faq.q}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Create Support Ticket */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
          <MessageSquare className="w-4 h-4 text-emerald-600" />
          <span>Submit Support Inquiry Ticket</span>
        </h3>

        {submitted ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-bold flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Thank you! Your ticket has been submitted to candidate support. Ticket reference: TK-2026-904.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Inquiry Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                >
                  <option value="verification">Document Verification</option>
                  <option value="interview">Video Interview Attendance</option>
                  <option value="offer">Conditional Offer Terms</option>
                  <option value="visa">UAE Visa & Travel</option>
                  <option value="general">General Candidate Support</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="Brief summary of your question..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Message Details</label>
              <textarea
                required
                rows={4}
                placeholder="Explain your request or issue..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
              ></textarea>
            </div>

            <button
              type="submit"
              className="py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-2 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Submit Ticket to Support</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
