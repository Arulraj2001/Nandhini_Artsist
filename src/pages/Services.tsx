import React from "react";
import { Sparkles, Clock, CheckCircle, Flame, Star } from "lucide-react";
import { Service } from "../types";

interface ServicesProps {
  services: Service[];
  onNavigate: (page: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ services, onNavigate }) => {
  const activeServices = services.filter((s) => s.active);

  return (
    <div className="bg-[#fbfaf9] py-16 md:py-24" id="services-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#81314c] bg-[#eddee3] px-3.5 py-1.5 rounded-full uppercase tracking-widest font-semibold font-sans mb-3">
            <Sparkles className="w-3.5 h-3.5" /> THE MENU OF BEAUTY
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-[#1F2937] tracking-tight">
            Our Elite Makeover Services
          </h1>
          <p className="max-w-xl mx-auto text-sm md:text-base text-gray-500 font-sans mt-3">
            Deliberate luxury palettes, meticulous face mapping, and premium waterproof formulations crafted specifically for high-definition photography.
          </p>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeServices.length > 0 ? (
            activeServices.map((service, idx) => (
              <div
                id={`services-card-${service.id}`}
                key={service.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:-translate-y-2 transition-all duration-300 flex flex-col h-full group"
              >
                {/* Image Showcase */}
                <div className="h-64 relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle Top overlay price tag */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md border border-[#eddee3] text-xs font-semibold px-4 py-1.5 rounded-full text-[#81314c] font-sans">
                    From Rs. {service.price}
                  </div>
                  {idx === 0 && (
                    <div className="absolute top-4 right-4 bg-[#e6c699] text-white text-[9px] uppercase tracking-widest font-bold font-sans px-2.5 py-1 rounded-sm shadow-md flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" /> Popular Selection
                    </div>
                  )}
                </div>

                {/* Info Area */}
                <div className="p-6 md:p-8 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl sm:text-2xl text-[#1F2937] group-hover:text-[#81314c] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-sans line-clamp-4">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between font-sans text-xs mt-auto">
                    <span className="flex items-center gap-1.5 text-gray-400">
                      <Clock className="w-4 h-4 text-[#81314c]" /> {service.duration}
                    </span>
                    <button
                      id={`btn-reserve-service-${service.id}`}
                      onClick={() => {
                        onNavigate("contact");
                        window.scrollTo({ top: 120, behavior: "smooth" });
                      }}
                      className="bg-[#81314c] group-hover:bg-[#69233b] text-white font-bold uppercase tracking-widest px-4 py-2.5 rounded-lg transition-colors shadow-sm"
                    >
                      Reserve Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-400 py-16">No custom makeup services are active right now.</p>
          )}
        </div>

        {/* Quality standard checklist */}
        <div className="mt-20 bg-white border border-[#eddee3] rounded-2xl p-8 md:p-12">
          <div className="text-center mb-10">
            <span className="text-[#81314c] text-xs font-sans uppercase tracking-widest font-bold">THE STANDARDS OF MAESTROS</span>
            <h3 className="font-serif text-2xl md:text-3xl mt-1 text-[#1F2937]">What’s Included in Every Session?</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-5 h-5 text-[#81314c]" />
                <h4 className="font-serif font-bold text-sm text-[#1F2937]">Ultra-Exclusive Cosmetics</h4>
              </div>
              <p className="text-xs text-gray-405 leading-relaxed pl-7 font-sans">
                Only the finest original labels—Chanel, Dior, Charlotte Tilbury, Tom Ford, and Shiseido—minimizing breakout alerts completely.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-5 h-5 text-[#81314c]" />
                <h4 className="font-serif font-bold text-sm text-[#1F2937]">Tailored Skin Prep Therapy</h4>
              </div>
              <p className="text-xs text-gray-445 leading-relaxed pl-7 font-sans">
                Every session begins with structural detox masks, dual massage treatments, and moisture barriers for seamless blending.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-5 h-5 text-[#81314c]" />
                <h4 className="font-serif font-bold text-sm text-[#1F2937]">Draping, Framing & Lashes</h4>
              </div>
              <p className="text-xs text-gray-445 leading-relaxed pl-7 font-sans">
                Premium silk false eyelashes and advanced, crease-proof saree pleating and draping are provided with no extra add-on fees.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
