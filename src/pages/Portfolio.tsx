import React, { useState } from "react";
import { Filter, Eye, Sparkles } from "lucide-react";
import { PortfolioItem } from "../types";
import { Lightbox } from "../components/Lightbox";

interface PortfolioProps {
  portfolio: PortfolioItem[];
}

export const Portfolio: React.FC<PortfolioProps> = ({ portfolio }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ["All", "Bridal", "Reception", "Engagement", "Fashion", "Photoshoot"];

  // Filter items
  const filteredItems = selectedCategory === "All"
    ? portfolio
    : portfolio.filter((item) => item.category === selectedCategory);

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : filteredItems.length - 1));
    }
  };

  const handleNextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! < filteredItems.length - 1 ? prev! + 1 : 0));
    }
  };

  return (
    <div className="bg-[#fbfaf9] py-16 md:py-24" id="portfolio-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#81314c] bg-[#eddee3] px-3.5 py-1.5 rounded-full uppercase tracking-widest font-semibold font-sans mb-3">
            <Sparkles className="w-3.5 h-3.5" /> THE DIGITAL LOOKBOOK
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-[#1F2937] tracking-tight">
            Our Masterpiece Gallery
          </h1>
          <p className="max-w-xl mx-auto text-sm md:text-base text-gray-500 font-sans mt-3">
            Step into our lookbook of real brides and high-fashion catalogs. Each look highlights genuine elegance and clean radiance.
          </p>
        </div>

        {/* Category Filters Bar */}
        <div 
          id="portfolio-filters-bar"
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
        >
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                id={`btn-portfolio-filter-${cat}`}
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`font-sans text-xs font-semibold uppercase tracking-widest px-5 py-2.5 rounded-full border transition-all duration-300 ${
                  active 
                    ? "bg-[#81314c] border-[#81314c] text-white shadow-md shadow-[#81314c]/15" 
                    : "bg-white border-gray-200 text-gray-500 hover:text-[#81314c] hover:border-[#81314c]/30"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Masonry-Style Pinterest Grid */}
        <div 
          id="portfolio-masonry-grid"
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <div
                id={`portfolio-item-${item.id}`}
                key={item.id}
                onClick={() => handleOpenLightbox(index)}
                className="break-inside-avoid relative rounded-2xl overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-[#eddee3] block"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
                
                {/* Dark Hover Panel overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-[#81314c] text-white text-[9px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded font-sans">
                      {item.category}
                    </span>
                    <span className="text-white bg-white/20 p-1.5 rounded-full backdrop-blur-sm">
                      <Eye className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <h3 className="text-white font-serif text-lg tracking-wide">{item.title}</h3>
                  {item.description && (
                    <p className="text-gray-300 text-xs font-sans mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400 py-16">
              No portfolio photos uploaded in this category yet.
            </div>
          )}
        </div>

        {/* Lightbox portal integration */}
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <Lightbox
            item={filteredItems[lightboxIndex]}
            onClose={handleCloseLightbox}
            onPrev={handlePrevLightbox}
            onNext={handleNextLightbox}
          />
        )}

      </div>
    </div>
  );
};
