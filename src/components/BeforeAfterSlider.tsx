import React, { useState, useRef, useEffect } from "react";
import { Sparkles } from "lucide-react";

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage (0 - 100)
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-0" id="before-after-section">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-[#eddee3] text-[#81314c] text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-3 font-sans">
          <Sparkles className="w-3.5 h-3.5" /> Before & After Glow Comparison
        </div>
        <h2 className="text-3xl md:text-5xl font-serif text-[#1F2937] tracking-tight mb-4">
          Timeless Masterclass Transformations
        </h2>
        <p className="max-w-xl mx-auto text-sm md:text-base text-gray-500 font-sans leading-relaxed">
          Drag the center handle horizontally to witness how professional blending can turn natural skin tones into high-definition photographic masterpieces.
        </p>
      </div>

      <div
        id="slider-container"
        ref={containerRef}
        className="relative h-[320px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl cursor-ew-resize border border-[#eddee3]"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        {/* AFTER IMAGE (Background - Full Width) */}
        <div className="absolute inset-0 select-none">
          <img
            src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200&auto=format&fit=crop"
            alt="Luxurious After Look"
            className="w-full h-full object-cover"
            draggable="false"
          />
          <div className="absolute bottom-4 right-4 bg-black/50 text-white backdrop-blur-md text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full font-sans select-none">
            After Makeover
          </div>
        </div>

        {/* BEFORE IMAGE (Foreground - Clipped Width) */}
        <div
          className="absolute inset-0 overflow-hidden select-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
            alt="Natural Before Look"
            className="absolute top-0 left-0 w-full h-full object-cover max-w-none"
            style={{ width: containerRef.current?.getBoundingClientRect().width }}
            draggable="false"
          />
          <div className="absolute bottom-4 left-4 bg-black/50 text-white backdrop-blur-md text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full font-sans select-none">
            Before Touchup
          </div>
        </div>

        {/* DIVIDER BAR */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* SLIDER HANDLE */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white border-2 border-[#e6c699] shadow-[0_0_15px_rgba(129,49,76,0.35)] rounded-full flex items-center justify-center pointer-events-none transition-transform duration-100 scale-100 hover:scale-110 pulse-soft">
            <svg
              className="w-6 h-6 text-[#81314c] fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" transform="rotate(-90 12 12)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
