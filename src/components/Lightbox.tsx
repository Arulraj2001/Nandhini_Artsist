import React, { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { PortfolioItem } from "../types";

interface LightboxProps {
  item: PortfolioItem;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ item, onClose, onPrev, onNext }) => {
  // Bind keyboard escape and arrow keys for luxury feeling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      if (e.key === "ArrowRight" && onNext) onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 transition-opacity duration-300"
      onClick={onClose}
      id="lightbox-container"
    >
      {/* Top Close Bar */}
      <button
        id="btn-close-lightbox"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-6 right-6 text-white/75 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-200"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev Navigation Trigger */}
      {onPrev && (
        <button
          id="btn-prev-lightbox"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 md:left-8 text-white/75 hover:text-white bg-white/10 hover:bg-white/20 p-3.5 rounded-full transition-all duration-200"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Main Image Stage */}
      <div 
        className="relative max-w-4xl w-full max-h-[80vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.image}
          alt={item.title}
          className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl border border-white/10"
        />
        
        {/* Detail Caption Panel */}
        <div className="mt-4 text-center max-w-xl text-white">
          <span className="inline-block bg-[#81314c]/80 backdrop-blur-md text-white text-[10px] uppercase font-semibold letter tracking-[0.2em] px-2.5 py-1 rounded mb-2 font-sans">
            {item.category}
          </span>
          <h3 className="text-xl font-serif text-white">{item.title}</h3>
          {item.description && (
            <p className="text-sm text-gray-300 mt-1 font-sans">{item.description}</p>
          )}
        </div>
      </div>

      {/* Next Navigation Trigger */}
      {onNext && (
        <button
          id="btn-next-lightbox"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 md:right-8 text-white/75 hover:text-white bg-white/10 hover:bg-white/20 p-3.5 rounded-full transition-all duration-200"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};
