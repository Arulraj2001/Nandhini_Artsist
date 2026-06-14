import React from "react";
import { Sparkles, Check, BadgePercent, HelpCircle, Star } from "lucide-react";
import { PricingPackage } from "../types";

interface PricingProps {
  pricingPackages: PricingPackage[];
  onNavigate: (page: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ pricingPackages, onNavigate }) => {
  return (
    <div className="bg-[#fbfaf9] py-16 md:py-24" id="pricing-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#81314c] bg-[#eddee3] px-3.5 py-1.5 rounded-full uppercase tracking-widest font-semibold font-sans mb-3">
            <BadgePercent className="w-3.5 h-3.5" /> LUXE INVESTMENTS
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-[#1F2937] tracking-tight">
            Our Premium Bridal Packages
          </h1>
          <p className="max-w-xl mx-auto text-sm md:text-base text-gray-500 font-sans mt-3">
            Fully customized programs designed specifically to take care of hair, pleat structure, contour prep, and waterproof facial longevity.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-24 reveal">
          {pricingPackages.map((pkg) => {
            const isPopular = pkg.isPopular || pkg.name.toLowerCase().includes("gold");
            return (
              <div
                id={`pricing-card-${pkg.id}`}
                key={pkg.id}
                className={`rounded-3xl p-8 flex flex-col justify-between relative luxury-card-hover ${
                  isPopular
                    ? "bg-[#1F2937] text-white shadow-2xl scale-102 lg:scale-105 border-2 border-[#e6c699]"
                    : "bg-white text-gray-900 border border-gray-150 shadow-sm"
                }`}
              >
                {/* Popularity Badge */}
                {isPopular && (
                  <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[#e6c699] to-[#81314c] text-white text-[9px] uppercase tracking-[0.2em] font-extrabold font-sans px-4 py-1.5 rounded-full shadow-md flex items-center gap-1 whitespace-nowrap">
                    <Star className="w-3 h-3 fill-current text-white" /> Recommended Masterpiece
                  </div>
                )}

                <div className="space-y-6">
                  {/* Title & Price heading */}
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl tracking-wide font-bold">
                      {pkg.name}
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4.5xl sm:text-5xl font-serif font-black">
                        Rs. {pkg.price}
                      </span>
                      <span className={`text-xs ${isPopular ? "text-gray-400" : "text-gray-550"} font-sans`}>
                        / event day
                      </span>
                    </div>
                  </div>

                  <hr className={isPopular ? "border-gray-800" : "border-gray-100"} />

                  {/* Feature Lists */}
                  <div className="space-y-4 flex-grow">
                    <span className="block text-[10px] uppercase font-sans tracking-widest font-semibold text-[#81314c]">
                      Whats Included:
                    </span>
                    <ul className="space-y-3">
                      {pkg.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-sans leading-relaxed">
                          <Check className={`w-4.5 h-4.5 shrink-0 mt-0.5 ${isPopular ? "text-[#e6c699]" : "text-[#81314c]"}`} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Primary Booking CTA button */}
                <div className="pt-8 mt-auto">
                  <button
                    id={`btn-pricing-book-${pkg.id}`}
                    onClick={() => {
                      onNavigate("contact");
                      window.scrollTo({ top: 120, behavior: "smooth" });
                    }}
                    className={`w-full text-center font-sans text-xs font-semibold uppercase tracking-widest py-4 rounded-full transition-all duration-200 transform active:scale-98 luxury-button-hover ${
                      isPopular
                        ? "bg-gradient-to-r from-[#e6c699] to-[#81314c] hover:from-[#c29c2c] hover:to-[#a35e69] text-white shadow-lg"
                        : "bg-gray-100 hover:bg-[#81314c] hover:text-white text-[#1F2937]"
                    }`}
                  >
                    Select {pkg.name.split(" ")[0]}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic FAQ dropdown or mini details panel */}
        <div className="bg-[#fbfaf9] border border-[#eddee3] rounded-2xl p-8 md:p-12">
          <div className="flex gap-2 items-center mb-6">
            <HelpCircle className="w-5 h-5 text-[#81314c]" />
            <h4 className="font-serif text-lg font-bold text-[#1F2937]">Important Booking Disclosures</h4>
          </div>
          <ul className="space-y-3 text-xs md:text-sm text-gray-500 font-sans leading-relaxed">
            <li>• Outstation travel charges and accommodation logistics are calculated customly based on event postcodes.</li>
            <li>• Booking slot confirmations require a 50% advanced token retainer to safely secure the calendar day.</li>
            <li>• Hair extensions and authentic customized fresh floral setups must be pre-arranged prior or discussed on trial sessions.</li>
          </ul>
        </div>

      </div>
    </div>
  );
};
