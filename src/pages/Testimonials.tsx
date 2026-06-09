import React, { useState } from "react";
import { MessageSquare, Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Testimonial } from "../types";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  const [spotlightIndex, setSpotlightIndex] = useState(0);

  const handleNextSpotlight = () => {
    setSpotlightIndex((prev) => (prev < testimonials.length - 1 ? prev + 1 : 0));
  };

  const handlePrevSpotlight = () => {
    setSpotlightIndex((prev) => (prev > 0 ? prev - 1 : testimonials.length - 1));
  };

  const activeSpotlight = testimonials[spotlightIndex] || testimonials[0];

  return (
    <div className="bg-[#fbfaf9] py-16 md:py-24" id="testimonials-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#81314c] bg-[#eddee3] px-3.5 py-1.5 rounded-full uppercase tracking-widest font-semibold font-sans mb-3">
            <MessageSquare className="w-3.5 h-3.5" /> THE CHERISHED BRIDES
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-[#1F2937] tracking-tight">
            Client Words & Glowing Reels
          </h1>
          <p className="max-w-xl mx-auto text-sm md:text-base text-gray-500 font-sans mt-3">
            Real testimonies of joy, confidence, and magical wedding moments captured perfectly in writing.
          </p>
        </div>

        {/* Large featured luxury carousel spotlight */}
        {activeSpotlight && (
          <div 
            id="testimonial-hero-carousel"
            className="bg-[#1F2937] text-white rounded-3xl p-8 md:p-16 mb-20 relative overflow-hidden shadow-2xl border border-gray-800"
          >
            {/* Background absolute quote symbol */}
            <div className="absolute right-8 bottom-8 text-white/5 pointer-events-none select-none">
              <Quote className="w-64 h-64" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              
              {/* Photo spotlight left */}
              <div className="lg:col-span-5 relative flex justify-center">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-xl border-4 border-[#81314c]/30 relative">
                  <img
                    src={activeSpotlight.photo}
                    alt={activeSpotlight.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 right-4 bg-[#81314c] text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded">
                    {activeSpotlight.event}
                  </div>
                </div>
              </div>

              {/* Text review right */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-1">
                  {[...Array(activeSpotlight.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current text-[#e6c699]" />
                  ))}
                </div>

                <p className="text-xl sm:text-2xl font-serif italic font-light leading-relaxed text-gray-100">
                  "{activeSpotlight.review}"
                </p>

                <div className="pt-2 border-t border-gray-800">
                  <h4 className="text-lg font-serif text-white font-bold">{activeSpotlight.name}</h4>
                  <span className="text-xs uppercase tracking-widest text-[#81314c] font-sans">Verified Happy Bride</span>
                </div>

                {/* Left Right triggers */}
                <div className="flex gap-2 pt-2">
                  <button
                    id="btn-prev-spotlight"
                    onClick={handlePrevSpotlight}
                    className="p-3 bg-white/5 hover:bg-[#81314c] border border-white/10 rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  <button
                    id="btn-next-spotlight"
                    onClick={handleNextSpotlight}
                    className="p-3 bg-white/5 hover:bg-[#81314c] border border-white/10 rounded-full transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Regular masonry grid for other reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((review, idx) => (
            <div
              id={`testimonial-card-grid-${idx}`}
              key={review.id}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-[#e6c699]" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#81314c]/20" />
                </div>
                <p className="text-gray-600 text-xs sm:text-sm font-sans italic leading-relaxed">
                  "{review.review}"
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t border-gray-50">
                <img
                  src={review.photo}
                  alt={review.name}
                  className="w-11 h-11 object-cover rounded-full border border-[#eddee3]"
                />
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#1F2937]">{review.name}</h4>
                  <span className="block text-[10px] uppercase font-sans tracking-wider text-gray-400">
                    {review.event}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
