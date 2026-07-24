import React from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';

export default function CategoryGrid() {
  const categories = [
    {
      name: "Hospitality & Tourism",
      desc: "Hotels, resorts, luxury dining, and concierge roles.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Construction & Skilled Trades",
      desc: "Electrical, MEP, site supervisors, and civil engineering.",
      image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Healthcare & Life Sciences",
      desc: "Nursing, medical technicians, diagnostic specialists.",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "IT & Engineering",
      desc: "Software development, network infrastructure, systems admin.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Logistics & Supply Chain",
      desc: "Warehouse operations, dispatch, inventory coordination.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Retail & Customer Experience",
      desc: "Store management, brand advisors, sales specialists.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-extrabold tracking-wider uppercase text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
            Sector Coverage
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore opportunities by industry
          </h2>
          <p className="text-base text-slate-600 font-normal">
            Discover UAE vacancies that match your background and professional experience.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <a 
              key={idx} 
              href="#opportunities" 
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/60 aspect-[4/3] block text-decoration-none"
            >
              {/* Background Image */}
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 font-normal leading-relaxed mb-3">
                  {cat.desc}
                </p>

                <div className="flex items-center gap-1 text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
                  <span>Explore Vacancies</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
