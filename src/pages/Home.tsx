import React, { useEffect, useState, useRef } from "react";
import { 
  Sparkles, 
  ArrowRight, 
  ArrowDown, 
  Award, 
  Star, 
  Clock, 
  Check, 
  Instagram, 
  ShieldCheck,
  Play,
  Layers,
  Video,
  X,
  ExternalLink
} from "lucide-react";
import { Service, PortfolioItem, Testimonial, WebsiteSettings, InstagramPost } from "../types";
import { BeforeAfterSlider } from "../components/BeforeAfterSlider";
import { parseAboutStory } from "../lib/aboutUtils";

interface HomeProps {
  settings: WebsiteSettings;
  services: Service[];
  portfolio: PortfolioItem[];
  testimonials: Testimonial[];
  onNavigate: (page: string) => void;
  instagramPosts: InstagramPost[];
}

export const Home: React.FC<HomeProps> = ({
  settings,
  services,
  portfolio,
  testimonials,
  onNavigate,
  instagramPosts = [],
}) => {
  const activeServices = services.filter((s) => s.active).slice(0, 3);
  const aboutData = parseAboutStory(settings?.aboutStory);
  const previewPortfolio = portfolio.slice(0, 3);
  const previewReviews = testimonials.slice(0, 3);

  // Counter animation hook representation
  const [bridesCount, setBridesCount] = useState(100);
  const [eventsCount, setEventsCount] = useState(200);

  // Instagram dynamic lookbook state variables
  const [activeTab, setActiveTab] = useState<string>("All");
  const [visibleLimit, setVisibleLimit] = useState<number>(6);
  const [previewMedia, setPreviewMedia] = useState<InstagramPost | null>(null);

  // Derived filtered posts list
  const filteredPosts = instagramPosts.filter((post) => {
    if (activeTab === "Images") {
      return post.mediaType === "IMAGE";
    }
    if (activeTab === "Reels") {
      return post.mediaType === "REEL";
    }
    if (activeTab === "Carousels & Videos") {
      return post.mediaType === "CAROUSEL_ALBUM" || post.mediaType === "VIDEO";
    }
    return true; // "All"
  });

  // Filtered Reels for Reels Showcase
  const reelsPosts = instagramPosts.filter(p => p.mediaType === "REEL");

  const handleOpenPreview = (item: InstagramPost) => {
    setPreviewMedia(item);
  };

  const handleClosePreview = () => {
    setPreviewMedia(null);
  };

  const handleLoadMore = () => {
    setVisibleLimit((prev) => prev + 6);
  };

  useEffect(() => {
    const bTimer = setInterval(() => {
      setBridesCount((prev) => (prev < 500 ? prev + 15 : 500));
    }, 45);

    const eTimer = setInterval(() => {
      setEventsCount((prev) => (prev < 1000 ? prev + 30 : 1000));
    }, 45);

    return () => {
      clearInterval(bTimer);
      clearInterval(eTimer);
    };
  }, []);

  return (
    <div className="bg-[#fbfaf9]" id="home-page">
      {/* 1. LUXURY FULL-SCREEN HERO SECTION */}
      <section 
        id="hero-section"
        className="relative min-h-[90vh] flex items-center justify-center text-center px-4 overflow-hidden py-16"
      >
        {/* Ambient background with high-quality default or custom hero banner */}
        <div className="absolute inset-0 z-0 select-none">
          <div className="absolute inset-0 bg-[#fbfaf9]/65 z-10 transition-colors duration-300" />
          <div className="absolute inset-0 bg-radial from-[#81314c]/5 to-transparent z-10 pointer-events-none" />
          <img
            src={settings.heroBanner || "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200&auto=format&fit=crop"}
            alt="Signature Bride Makeup Banner"
            className="w-full h-full object-cover filter brightness-95"
            onError={(e) => {
              // Fallback just in case user provides broken custom links in settings
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200&auto=format&fit=crop";
            }}
          />
        </div>

        {/* Content Area with refined typography */}
        <div className="relative z-20 max-w-4xl mx-auto space-y-6 mt-6 md:mt-12">
          {/* Badge */}
          <div 
            id="hero-award-badge"
            className="inline-flex items-center gap-2 bg-[#eddee3] text-[#81314c] border border-[#81314c]/15 px-4.5 py-1.5 rounded-full shadow-sm animate-fade-in font-sans text-[10px] md:text-xs uppercase font-semibold tracking-[0.2em]"
          >
            <Award className="w-4 h-4 text-[#e6c699]" />
            {settings.heroBadge || "Award Winning Bridal Makeup Artist"}
          </div>

          {/* Heading with Elegant Font */}
          <h1 
            id="hero-main-heading"
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-4.5xl sm:text-6xl md:text-7.5xl text-[#1F2937] leading-[1.08] tracking-tight font-extrabold"
          >
            {settings.heroTitle || "Transforming Beauty Into Timeless Elegance"}
          </h1>

          {/* Description */}
          <p 
            id="hero-subtext"
            className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-gray-700 font-sans font-light leading-relaxed"
          >
            {settings.heroDescription || "Professional Bridal & Fashion Makeup Artist creating stunning individual masterpieces for your most crucial elegant life events."}
          </p>

          {/* Call-to-actions */}
          <div 
            id="hero-ctas"
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button
              id="hero-btn-book"
              onClick={() => onNavigate("contact")}
              className="w-full sm:w-auto bg-[#81314c] hover:bg-[#69233b] text-white font-sans text-xs font-semibold uppercase tracking-widest px-10 py-4.5 rounded-full shadow-lg hover:shadow-[#81314c]/20 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            >
              Book Consultation
            </button>
            <button
              id="hero-btn-portfolio"
              onClick={() => onNavigate("portfolio")}
              className="w-full sm:w-auto bg-[#fbfaf9]/90 hover:bg-[#fbfaf9] text-[#1F2937] border border-gray-300 font-sans text-xs font-semibold uppercase tracking-widest px-10 py-4.5 rounded-full hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            >
              View Portfolio
            </button>
          </div>

          <div className="flex justify-center pt-8">
            <button 
              onClick={() => {
                document.getElementById("stats-section")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="p-3 bg-white/60 text-[#81314c] border border-[#eddee3] rounded-full shadow-md hover:shadow-lg transition-all animate-bounce cursor-pointer"
            >
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section 
        id="stats-section"
        className="relative py-12 bg-white border-y border-[#eddee3] overflow-hidden transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            
            <div className="space-y-1">
              <span className="block text-3xl md:text-5xl font-serif font-semibold text-[#81314c]">
                {bridesCount}+
              </span>
              <span className="block text-xs uppercase tracking-widest text-gray-500 font-sans font-semibold">
                Happy Brides
              </span>
            </div>

            <div className="space-y-1">
              <span className="block text-3xl md:text-5xl font-serif font-semibold text-[#e6c699]">
                {settings.aboutExperienceYears || "10+"}
              </span>
              <span className="block text-xs uppercase tracking-widest text-gray-500 font-sans font-semibold">
                Years Experience
              </span>
            </div>

            <div className="space-y-1">
              <span className="block text-3xl md:text-5xl font-serif font-semibold text-[#81314c]">
                {eventsCount}+
              </span>
              <span className="block text-xs uppercase tracking-widest text-gray-500 font-sans font-semibold">
                Events Covered
              </span>
            </div>

            <div className="space-y-1">
              <span className="block text-3xl md:text-5xl font-serif font-semibold text-[#e6c699] flex items-center justify-center gap-1">
                4.9 <Star className="w-5 h-5 fill-current text-[#e6c699]" />
              </span>
              <span className="block text-xs uppercase tracking-widest text-gray-500 font-sans font-semibold">
                Customer Rating
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 3. ABOUT PREVIEW SECTION */}
      <section 
        id="about-preview-section"
        className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Portrait Collage */}
          <div className="lg:col-span-5 relative">
            <div className="absolute top-4 left-4 right-[-16px] bottom-[-16px] border-2 border-[#81314c]/20 rounded-2xl -z-10" />
            <img
              src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop"
              alt="Nandhini Styling a Bride"
              className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl shadow-xl border border-[#eddee3]"
            />
            {/* Embedded Mini Stat Badge */}
            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md border border-[#eddee3] p-4.5 rounded-xl shadow-lg flex items-center gap-3">
              <div className="p-3 bg-[#eddee3] text-[#81314c] rounded-full">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="block text-xs text-gray-400 font-sans tracking-wider uppercase font-semibold">Quality Guarantee</span>
                <span className="block text-sm font-serif font-bold text-[#1F2937]">MAC, Chanel & Dior Only</span>
              </div>
            </div>
          </div>

          {/* Artist Text bio preview */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#81314c] font-sans uppercase font-semibold tracking-widest">
              <Sparkles className="w-3.5 h-3.5" /> MEET THE MAESTRO
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1F2937] tracking-tight">
              Crafting Flawless Memories For Elegant Individuals
            </h2>
            <p className="text-gray-650 text-sm md:text-base leading-relaxed font-sans whitespace-pre-line">
              {aboutData.story}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-2.5">
                <Check className="w-5 h-5 text-[#81314c] shrink-0 mt-0.5" />
                <span className="text-xs md:text-sm text-gray-650 font-sans">Signature High-Definition Airbrush Base</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-5 h-5 text-[#81314c] shrink-0 mt-0.5" />
                <span className="text-xs md:text-sm text-gray-650 font-sans">Luxurious Lash Extensions & Hair Couture</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-5 h-5 text-[#81314c] shrink-0 mt-0.5" />
                <span className="text-xs md:text-sm text-gray-650 font-sans">In-Person Look Tryout Trials</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-5 h-5 text-[#81314c] shrink-0 mt-0.5" />
                <span className="text-xs md:text-sm text-gray-650 font-sans">Traditional Drape/Pleating Assistance</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                id="btn-nav-about-more"
                onClick={() => onNavigate("about")}
                className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-widest text-[#81314c] hover:text-[#69233b] transition-all group"
              >
                Read Fully Story <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 4. SERVICES PREVIEW SECTION */}
      <section 
        id="services-preview-section"
        className="py-20 bg-gradient-to-b from-white to-[#eddee3]/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs text-[#81314c] font-sans uppercase tracking-widest font-semibold block mb-2">
                COUTURE PORTFOLIO SERVICES
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-[#1F2937] tracking-tight">
                Our Signature Makeovers
              </h2>
            </div>
            <button
              id="btn-nav-services-all"
              onClick={() => onNavigate("services")}
              className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-widest text-[#81314c] hover:text-[#69233b] mt-4 md:mt-0"
            >
              Explore All Services <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activeServices.length > 0 ? (
              activeServices.map((service, index) => (
                <div
                  id={`home-service-card-${index}`}
                  key={service.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#eddee3] shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full group"
                >
                  <div className="h-64 relative overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/85 backdrop-blur-md border border-[#eddee3] px-3.5 py-1 rounded-sm text-xs md:text-sm font-semibold text-[#81314c] font-sans">
                      Rs. {service.price}
                    </div>
                  </div>
                  <div className="p-6 md:p-8 flex flex-col flex-1 space-y-4">
                    <h3 className="font-serif text-xl text-[#1F2937] font-semibold tracking-wide">
                      {service.title}
                    </h3>
                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-sans line-clamp-3">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto font-sans text-xs">
                      <span className="flex items-center gap-1.5 text-gray-400">
                        <Clock className="w-4 h-4 text-[#81314c]" /> {service.duration}
                      </span>
                      <button
                        id={`btn-home-book-service-${index}`}
                        onClick={() => onNavigate("contact")}
                        className="text-[#81314c] group-hover:text-[#69233b] font-bold uppercase tracking-wider"
                      >
                        Reserve
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-3 text-center text-gray-400 py-12">No active services setup.</p>
            )}
          </div>

        </div>
      </section>

      {/* 5. BEFORE & AFTER SHOWCASE */}
      <section className="py-20 md:py-28 bg-[#fbfaf9]">
        <BeforeAfterSlider />
      </section>

      {/* 6. PORTFOLIO PREVIEW SECTION */}
      <section 
        id="portfolio-preview-section"
        className="py-20 bg-gradient-to-b from-[#fbfaf9] to-white border-t border-[#eddee3]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs text-[#81314c] font-sans uppercase tracking-widest font-semibold block mb-2">
                LUXURY LOOKBOOK PREVIEW
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-[#1F2937] tracking-tight">
                Our Captivated Brides
              </h2>
            </div>
            <button
              id="btn-nav-portfolio-all"
              onClick={() => onNavigate("portfolio")}
              className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-widest text-[#81314c] hover:text-[#69233b] mt-4 md:mt-0"
            >
              Launch Lookbook <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {previewPortfolio.length > 0 ? (
              previewPortfolio.map((item, index) => (
                <div
                  id={`home-portfolio-item-${index}`}
                  key={item.id}
                  className="relative group rounded-2xl overflow-hidden aspect-[4/5] shadow-md cursor-pointer border border-[#eddee3]"
                  onClick={() => onNavigate("portfolio")}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350 flex flex-col justify-end p-6">
                    <span className="bg-[#81314c] text-white text-[10px] tracking-widest uppercase font-semibold font-sans px-2 py-0.5 rounded self-start mb-2">
                      {item.category}
                    </span>
                    <h4 className="text-white text-lg font-serif">{item.title}</h4>
                    <p className="text-gray-300 text-xs font-sans mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-3 text-center text-gray-400 py-12">Portfolio gallery is empty.</p>
            )}
          </div>

        </div>
      </section>

      {/* 7. TESTIMONIAL PREVIEW */}
      <section 
        id="testimonials-preview-section"
        className="py-20 bg-[#eddee3]/15 border-y border-[#eddee3]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="text-xs text-[#81314c] font-sans uppercase tracking-widest font-semibold block mb-2">
              REAL CLIENT REACTIONS
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1F2937] tracking-tight">
              What Our Brides Are Saying
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {previewReviews.map((rev, idx) => (
              <div
                id={`home-testimonial-card-${idx}`}
                key={rev.id}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-4"
              >
                <div className="flex items-center gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-[#e6c699]" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm italic font-sans leading-relaxed">
                  "{rev.review}"
                </p>
                <div className="flex items-center gap-3.5 pt-4 border-t border-gray-50">
                  <img
                    src={rev.photo}
                    alt={rev.name}
                    className="w-11 h-11 object-cover rounded-full border border-[#eddee3]"
                  />
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-[#1F2937]">
                      {rev.name}
                    </h4>
                    <span className="block text-[10px] uppercase font-sans tracking-wider text-gray-400">
                      {rev.event}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              id="btn-nav-testimonials-all animate-pulse"
              onClick={() => onNavigate("testimonials")}
              className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-widest bg-white border border-[#eddee3] text-[#81314c] px-6 py-3 rounded-full hover:bg-gray-50 transition-all"
            >
              Read Additional Reviews ({testimonials.length}) <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* 8. INSTAGRAM AUTOMATION: LATEST BEAUTY TRANSFORMATIONS */}
      <section 
        id="instagram-automation-section"
        className="py-24 bg-white border-t border-[#eddee3] transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-12 space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#81314c] font-sans uppercase tracking-[0.2em] font-semibold bg-[#eddee3] px-4 py-1.5 rounded-full shadow-sm">
              <Instagram className="w-4 h-4 animate-spin-slow" /> Live Instagram Lookbook
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1F2937] tracking-tight font-extrabold">
              Latest Beauty Transformations
            </h2>
            <p className="max-w-xl mx-auto text-sm text-gray-500 font-sans leading-relaxed">
              Follow our latest bridal, reception, and high-fashion makeup journeys. Automatically updated when Nandhini posts.
            </p>
            <div className="pt-2">
              <a 
                href={settings.instagramUrl || "https://instagram.com/nandhini.makeup"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-gray-600 hover:text-[#81314c] uppercase tracking-widest font-bold border border-gray-250 hover:border-[#81314c]/30 bg-[#fbfaf9] hover:bg-[#eddee3]/20 px-6 py-3 rounded-full shadow-sm transition-all"
              >
                <Instagram className="w-4 h-4 text-[#81314c]" />
                View On Instagram <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
              </a>
            </div>
          </div>

          {/* Interactive Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {["All", "Images", "Reels", "Carousels & Videos"].map((filter) => (
              <button
                key={filter}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setActiveTab(filter);
                  setVisibleLimit(6); // Reset limit on tab change
                }}
                className={`font-sans text-xs font-semibold uppercase tracking-widest px-5 py-2.5 rounded-full transition-all ${
                  activeTab === filter
                    ? "bg-[#81314c] text-white shadow-md shadow-[#81314c]/20"
                    : "bg-gray-100/90 hover:bg-gray-150 text-gray-600"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Grid Layout conforming to luxury specifications */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-gray-200 rounded-3xl bg-[#fbfaf9] max-w-4xl mx-auto">
              <Instagram className="w-10 h-10 mx-auto text-gray-300 mb-3" />
              <p className="text-sm font-sans text-gray-500 font-medium">No synced lookbook files in this category yet.</p>
              <p className="text-xs font-sans text-gray-400 mt-1">Connect your Instagram Business Account in the dashboard to synchronize.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredPosts.slice(0, visibleLimit).map((post, idx) => {
                const isReel = post.mediaType === "REEL";
                const isCarousel = post.mediaType === "CAROUSEL_ALBUM";
                const isVideo = post.mediaType === "VIDEO";

                return (
                  <div
                    key={post.id || idx}
                    onClick={() => handleOpenPreview(post)}
                    className="group relative bg-[#fbfaf9] rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-350 cursor-pointer"
                  >
                    {/* Media Container Aspect Ratio */}
                    <div className="relative aspect-[4/5] sm:aspect-square overflow-hidden bg-gray-900">
                      <img
                        src={post.mediaUrl}
                        alt={post.caption || "Beauty transformation"}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/25 opacity-90 transition-all duration-300" />
                      
                      {/* Badge badge */}
                      <span className="absolute top-4.5 right-4.5 font-sans text-[10px] font-bold uppercase tracking-widest bg-black/70 text-white px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 z-10">
                        {isReel && (
                          <>
                            <Play className="w-3 h-3 fill-current text-[#e6c699]" />
                            Reel
                          </>
                        )}
                        {isCarousel && (
                          <>
                            <Layers className="w-3 h-3 text-[#e6c699]" />
                            Carousel
                          </>
                        )}
                        {isVideo && (
                          <>
                            <Video className="w-3 h-3 text-[#e6c699]" />
                            Video
                          </>
                        )}
                        {!isReel && !isCarousel && !isVideo && "Post"}
                      </span>

                      {/* Overlays on hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        <div className="w-14 h-14 bg-white text-[#81314c] border border-[#eddee3] rounded-full shadow-lg flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300">
                          {isReel || isVideo ? (
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                          ) : (
                            <Instagram className="w-5 h-5" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="p-5.5 space-y-2.5">
                      <span className="block text-[10px] font-mono text-[#81314c] font-semibold tracking-wide">
                        {new Date(post.timestamp).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      
                      <p className="text-gray-700 text-sm font-sans line-clamp-3 leading-relaxed">
                        {post.caption || "Signature beauty transformation by master artist Nandhini. Custom airbrush aesthetics."}
                      </p>
                      
                      <div className="pt-2 flex items-center justify-between border-t border-gray-150">
                        <span className="text-[10px] uppercase font-sans tracking-widest text-[#e6c699] font-bold">
                          Bridal Artistry
                        </span>
                        <span className="text-[10px] text-[#81314c] font-sans flex items-center gap-1.5 font-bold">
                          Engage <ExternalLink className="w-3 h-3 text-[#81314c]" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Load More component */}
          {filteredPosts.length > visibleLimit && (
            <div className="text-center mt-12">
              <button
                style={{ cursor: "pointer" }}
                onClick={handleLoadMore}
                className="font-sans text-xs font-semibold uppercase tracking-widest border border-[#eddee3] hover:border-[#81314c] bg-white hover:bg-[#81314c] text-[#81314c] hover:text-white px-10 py-4.5 rounded-full shadow-sm hover:shadow-[#81314c]/10 transition-all duration-300 transform active:scale-95 z-25"
              >
                Load More Transformations (+{filteredPosts.length - visibleLimit})
              </button>
            </div>
          )}

        </div>
      </section>

      {/* 8.5 DEDICATED REELS SHOWCASE */}
      <section 
        id="reels-showcase-section"
        className="py-24 bg-[#fbfaf9] border-t border-[#eddee3] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <span className="inline-block text-xs text-[#81314c] font-sans uppercase tracking-[0.2em] font-semibold">
                Trending bridal short-form clips
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-[#1F2937] tracking-tight font-extrabold">
                Shorts & Reels Showcase
              </h2>
            </div>
            <p className="max-w-md text-sm text-gray-500 font-sans leading-relaxed">
              Step into the active studio. Watch real-time bridal saree drapes, airbrush application trials, and glowing reception highlights.
            </p>
          </div>

          {reelsPosts.length === 0 ? (
            <div className="text-center py-16 bg-white border border-gray-150 rounded-3xl max-w-4xl mx-auto">
              <Play className="w-10 h-10 mx-auto text-gray-300 mb-2" />
              <p className="text-xs font-sans text-gray-400 font-medium">No synced Reels found on this feed yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {reelsPosts.slice(0, 4).map((reel, idx) => (
                <div
                  key={reel.id || idx}
                  onClick={() => handleOpenPreview(reel)}
                  className="group relative bg-[#1F2937] rounded-3xl aspect-[9/16] overflow-hidden cursor-pointer shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300"
                >
                  {/* Optimized image for short form content */}
                  <img
                    src={reel.mediaUrl}
                    alt={reel.caption || "Reel video transformation"}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/10 transition-opacity" />

                  {/* Play circle and metadata details inside */}
                  <div className="absolute inset-x-0 bottom-0 p-5 space-y-3.5 z-10">
                    <div className="w-11 h-11 bg-[#81314c] text-white border border-[#eddee3]/20 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-4.5 h-4.5 fill-current ml-0.5 text-white" />
                    </div>
                    
                    <p className="text-[11px] text-gray-200 font-sans line-clamp-3 leading-relaxed">
                      {reel.caption || "Stunning luxury makeover details. Click to view full transition video."}
                    </p>

                    <div className="flex items-center gap-1.5 pt-1.5 border-t border-white/10">
                      <span className="w-1.5 h-1.5 bg-[#e6c699] rounded-full animate-ping" />
                      <span className="text-[9px] uppercase font-sans tracking-widest text-[#e6c699] font-bold">
                        Bridal Reel
                      </span>
                    </div>
                  </div>

                  {/* Badge */}
                  <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 text-[9px] font-sans uppercase tracking-[0.15em] text-white rounded-full border border-white/5 flex items-center gap-1">
                    <Play className="w-2.5 h-2.5 fill-current text-[#eddee3]" /> Reel Stream
                  </span>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* LUXURY INTERACTIVE MEDIA POPUP WITH DYNAMIC GENERATED SEO HEADERS */}
      {previewMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div 
            className="relative bg-white text-[#1F2937] rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] md:h-[650px] shadow-2xl flex flex-col md:flex-row transform scale-95 md:scale-100 transition-all duration-300"
          >
            {/* Left Column: Media Stage with simulated video player */}
            <div className="relative md:w-3/5 bg-black flex items-center justify-center overflow-hidden h-[300px] md:h-full shrink-0">
              {previewMedia.mediaType === "REEL" || previewMedia.mediaType === "VIDEO" ? (
                <div className="relative w-full h-full flex flex-col items-center justify-center bg-gray-950">
                  <img 
                    src={previewMedia.mediaUrl} 
                    alt="Video preview" 
                    className="absolute inset-0 w-full h-full object-cover filter brightness-75 select-none" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-[#81314c]/20 mix-blend-color" />
                  
                  {/* Dynamic simulated spectrum for live visual video indicators */}
                  <div className="relative z-10 space-y-4 text-center px-4">
                    <div className="w-16 h-16 bg-[#81314c] text-white border-2 border-white rounded-full flex items-center justify-center mx-auto shadow-xl transform animate-pulse cursor-pointer hover:scale-105 active:scale-95">
                      <Play className="w-6 h-6 fill-current ml-1 text-white" />
                    </div>
                    <span className="block text-xs uppercase font-sans tracking-widest font-extrabold text-white">
                      Playing Beauty reel Stream
                    </span>
                    <div className="flex justify-center items-end gap-1 h-5 pt-2 select-none">
                      <span className="w-1 bg-[#e6c699] rounded-full h-4 animate-bounce shrink-0" style={{ animationDelay: '0.1s' }} />
                      <span className="w-1 bg-[#e6c699] rounded-full h-5 animate-bounce shrink-0" style={{ animationDelay: '0.3s' }} />
                      <span className="w-1 bg-[#e6c699] rounded-full h-3 animate-bounce shrink-0" style={{ animationDelay: '0s' }} />
                      <span className="w-1 bg-[#e6c699] rounded-full h-5 animate-bounce shrink-0" style={{ animationDelay: '0.4s' }} />
                      <span className="w-1 bg-[#e6c699] rounded-full h-2 animate-bounce shrink-0" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              ) : (
                <img
                  src={previewMedia.mediaUrl}
                  alt={previewMedia.caption || "Transformations"}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              )}

              {/* Tag tag */}
              <span className="absolute bottom-5 left-5 bg-black/60 backdrop-blur-sm border border-white/10 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest text-[#e6c699] font-bold">
                {previewMedia.mediaType}
              </span>
            </div>

            {/* Right Column: Descriptions & SEO Structured Meta Generative engine */}
            <div className="md:w-2/5 p-6 md:p-8 flex flex-col justify-between overflow-y-auto h-[400px] md:h-full">
              <div className="space-y-6">
                
                {/* Header controls info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-[#81314c] rounded-full animate-ping" />
                    <span className="font-mono text-[9px] text-gray-500 font-semibold uppercase tracking-wider">
                      Interactive Live Sync
                    </span>
                  </div>
                  <button 
                    style={{ cursor: "pointer" }}
                    onClick={handleClosePreview}
                    className="p-1.5 bg-gray-100 hover:bg-[#eddee3] hover:text-[#81314c] rounded-full transition-all text-gray-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Subtitle / Timestamp */}
                <div className="space-y-1">
                  <span className="block text-2xs uppercase tracking-[0.2em] text-[#81314c] font-bold">
                    Couture Makeup Lookbook
                  </span>
                  <span className="block text-xs font-mono text-gray-400">
                    Published: {new Date(previewMedia.timestamp).toLocaleDateString(undefined, {
                      dateStyle: 'medium'
                    })} at {new Date(previewMedia.timestamp).toLocaleTimeString(undefined, {
                      timeStyle: 'short'
                    })}
                  </span>
                </div>

                <div className="h-px bg-gray-100" />

                {/* Caption / Text details */}
                <div className="space-y-2">
                  <span className="block text-[11px] uppercase tracking-wider font-bold text-gray-400">
                    Caption Specifics
                  </span>
                  <p className="text-gray-700 text-sm font-sans leading-relaxed max-h-[120px] overflow-y-auto pr-1">
                    {previewMedia.caption || "No comments written on original Instagram post snippet."}
                  </p>
                </div>

                {/* SEO Header Generator Output */}
                <div className="bg-[#fbfaf9] p-4.5 rounded-2xl border border-gray-100 space-y-3">
                  <span className="inline-flex items-center gap-1 font-sans text-[10px] font-bold uppercase tracking-widest text-[#81314c]">
                    <Sparkles className="w-3.5 h-3.5 text-[#e6c699]" /> Automated SEO Header
                  </span>
                  <div className="space-y-2.5">
                    <div>
                      <span className="block text-[9px] font-mono uppercase text-gray-400">Generated Meta Title</span>
                      <p className="text-[11px] font-sans font-semibold text-gray-700 pr-1 select-all leading-snug">
                        {previewMedia.caption 
                          ? `${previewMedia.caption.split(/[!.\n#]/)[0] || "Beauty Transformation"} | Nandhini Bridal Couture`
                          : "Luxury Beauty Transformations | Nandhini Bridal Couture"}
                      </p>
                    </div>
                    <div>
                      <span className="block text-[9px] font-mono uppercase text-gray-400">Generated Meta Description</span>
                      <p className="text-[10px] font-sans text-gray-500 italic leading-snug select-all">
                        {previewMedia.caption 
                          ? `Book tailored professional makeup. ${previewMedia.caption.substring(0, 110)}... Exclusive HD bridal makeup in Bangalore by master Nandhini.`
                          : "Book professional makeup services. Experience the radiant glow, custom contours, and luxury Saree draping with Bangalore's leading makeup artist."}
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Controls and links */}
              <div className="pt-6 space-y-3">
                <a
                  href={previewMedia.permalink || settings.instagramUrl || "https://instagram.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#81314c] hover:bg-[#69233b] text-white text-xs uppercase tracking-widest font-bold px-4 py-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Instagram className="w-4 h-4 text-white" />
                  View Original on Instagram
                  <ExternalLink className="w-3.5 h-3.5 text-white/85" />
                </a>
                
                <button
                  style={{ cursor: "pointer" }}
                  onClick={handleClosePreview}
                  className="w-full bg-gray-100 hover:bg-gray-150 text-gray-600 text-xs uppercase tracking-widest font-semibold px-4 py-3 rounded-xl transition-all"
                >
                  Close Showcase Window
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 9. LARGE CTA BOOKING BANNER SECTION */}
      <section 
        id="cta-section"
        className="relative py-24 md:py-32 bg-[#1F2937] text-white text-center overflow-hidden"
      >
        <div className="absolute inset-0 opacity-15">
          <img
            src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200&auto=format&fit=crop"
            alt="Intricate brush backdrop"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-6">
          <span className="text-[#81314c] text-xs font-sans uppercase tracking-widest font-bold">
            CONFIRM YOUR CELEBRATION DATE
          </span>
          <h2 className="text-3xl md:text-6xl font-serif tracking-tight font-light">
            Luxury Bridal Slots Are Highly Demanded
          </h2>
          <p className="max-w-xl mx-auto text-sm md:text-base text-gray-300 font-sans leading-relaxed">
            Nandhini accepts only a premier sequence of bridal projects to guarantee fully concentrated artistry. Ensure your event date is reserved block-free.
          </p>
          <div className="pt-4">
            <button
              id="cta-btn-book-final"
              onClick={() => onNavigate("contact")}
              className="bg-[#81314c] hover:bg-[#69233b] text-white text-xs uppercase tracking-widest font-semibold px-10 py-5 rounded-full font-sans shadow-xl hover:shadow-[#81314c]/20 transition-all transform hover:-translate-y-0.5"
            >
              Secure My Makeover Slot Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
