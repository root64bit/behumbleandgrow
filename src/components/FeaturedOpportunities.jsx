import React from 'react';
import { 
  Building2, 
  MapPin, 
  BadgeCheck, 
  Clock3, 
  Bookmark, 
  ArrowRight,
  Banknote
} from 'lucide-react';

export default function FeaturedOpportunities() {
  const opportunities = [
    {
      title: "Customer Service Representative",
      employer: "Verified UAE Hospitality Group",
      location: "Dubai, UAE",
      salary: "AED 4,000 – 5,000 / month",
      type: "Full-time",
      benefit: "Accommodation & Flight Allowance",
      deadline: "Closing in 5 days",
      badge: "High Demand"
    },
    {
      title: "Hotel Front Desk Receptionist",
      employer: "Luxury Resort & Spa",
      location: "Abu Dhabi, UAE",
      salary: "AED 4,500 – 6,000 / month",
      type: "Full-time",
      benefit: "Duty Meals & Health Insurance",
      deadline: "Closing in 8 days",
      badge: "Immediate Hire"
    },
    {
      title: "Electrical & Facilities Technician",
      employer: "Commercial Contracting LLC",
      location: "Dubai, UAE",
      salary: "AED 3,800 – 5,200 / month",
      type: "Full-time",
      benefit: "Transportation & Overtime Pay",
      deadline: "Closing in 3 days",
      badge: "Skilled Trade"
    },
    {
      title: "Warehouse Logistics Coordinator",
      employer: "Global Logistics Network",
      location: "Sharjah, UAE",
      salary: "AED 4,200 – 5,500 / month",
      type: "Full-time",
      benefit: "Annual Return Ticket",
      deadline: "Closing in 12 days",
      badge: "Verified Employer"
    }
  ];

  return (
    <section id="opportunities" className="py-20 bg-white">
      <div className="container">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <span className="text-xs font-extrabold tracking-wider uppercase text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
              Live Vacancies
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              Opportunities currently hiring in the UAE
            </h2>
            <p className="text-base text-slate-600 font-normal mt-1">
              Explore roles from verified employers across growing industries.
            </p>
          </div>

          <a href="#jobs" className="btn btn-secondary text-sm px-5 py-2.5 shrink-0">
            <span>View All Opportunities</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {opportunities.map((op, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-6 hover:border-emerald-600/50 transition-all hover:shadow-lg flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                    <BadgeCheck className="w-4 h-4 text-emerald-600" />
                    <span>{op.employer}</span>
                  </div>
                  <button className="text-slate-400 hover:text-slate-700 p-1" aria-label="Save Job">
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {op.title}
                </h3>

                <p className="text-xs font-medium text-slate-500 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{op.location} · {op.type}</span>
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800">
                    <Banknote className="w-4 h-4 text-emerald-600" />
                    <span>{op.salary}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>{op.benefit}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1">
                  <Clock3 className="w-3.5 h-3.5" />
                  {op.deadline}
                </span>

                <a href="#eligibility" className="btn btn-primary text-xs py-2 px-4">
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
