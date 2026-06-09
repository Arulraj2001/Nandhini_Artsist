import React from "react";
import { Sparkles, Phone, Mail, MapPin, Instagram, Facebook, Youtube } from "lucide-react";
import { WebsiteSettings } from "../types";

interface FooterProps {
  settings: WebsiteSettings;
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const handleLink = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer 
      className="bg-[#1F2937] text-white pt-16 pb-8 border-t border-gray-800"
      id="main-footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Brand & Craftsmanship Vision */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-[0.2em] text-white">
                {settings.logoText || "NANDHINI"}
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#81314c] font-medium mt-1">
                Makeup Artist & Bridal Couture
              </span>
            </div>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-sans mt-3">
              Every stroke of the brush, every contour line is a deliberate piece of art. Bridging international luxury standards (Chanel, Dior, Charlotte Tilbury) with personalized traditional core values, establishing raw premium confidence on your biggest day.
            </p>
            <div className="flex items-center gap-2 pt-2 text-[#e6c699] text-xs font-semibold uppercase tracking-widest font-sans">
              <Sparkles className="w-4 h-4 text-[#e6c699]" /> International Awardee
            </div>
          </div>

          {/* Column 2: Elegant Quick Links */}
          <div>
            <h4 className="font-serif text-lg text-white tracking-widest mb-6 border-b border-gray-800 pb-2">
              Our Pages
            </h4>
            <ul className="space-y-3 font-sans text-xs uppercase tracking-widest text-gray-400">
              {["home", "about", "services", "portfolio", "testimonials", "pricing", "contact"].map((page) => (
                <li key={page}>
                  <button
                    id={`footer-nav-to-${page}`}
                    onClick={() => handleLink(page)}
                    className="hover:text-[#81314c] transition-all duration-200 hover:translate-x-1 inline-block"
                  >
                    {page} Catalog
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Premium Studio Coordinates */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-white tracking-widest mb-2 border-b border-gray-800 pb-2">
              The Studio
            </h4>
            <ul className="space-y-3.5 text-gray-400 text-xs md:text-sm leading-relaxed">
              {settings.contactAddress && (
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4.5 h-4.5 text-[#81314c] shrink-0 mt-0.5" />
                  <span>{settings.contactAddress}</span>
                </li>
              )}
              {settings.contactPhone && (
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4.5 h-4.5 text-[#81314c] shrink-0" />
                  <a href={`tel:${settings.contactPhone}`} className="hover:text-white transition-colors">
                    {settings.contactPhone}
                  </a>
                </li>
              )}
              {settings.contactEmail && (
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4.5 h-4.5 text-[#81314c] shrink-0" />
                  <a href={`mailto:${settings.contactEmail}`} className="hover:text-white transition-colors truncate">
                    {settings.contactEmail}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Column 4: Stay Connected & Social Handles */}
          <div>
            <h4 className="font-serif text-lg text-white tracking-widest mb-6 border-b border-gray-800 pb-2">
              Follow Our Art
            </h4>
            <p className="text-gray-400 text-xs md:text-sm mt-3 mb-4 leading-relaxed">
              We frequently showcase behind-the-scenes preparation reels, real bridal reactions, and luxury cosmetic breakdowns. Connect with our socials:
            </p>
            <div className="flex gap-3">
              {settings.instagramUrl && (
                <a
                  id="footer-social-instagram"
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 hover:bg-[#81314c] p-3 rounded-full transition-all duration-300 transform hover:-translate-y-1 text-white"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {settings.facebookUrl && (
                <a
                  id="footer-social-facebook"
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 hover:bg-[#81314c] p-3 rounded-full transition-all duration-300 transform hover:-translate-y-1 text-white"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {settings.youtubeUrl && (
                <a
                  id="footer-social-youtube"
                  href={settings.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 hover:bg-[#81314c] p-3 rounded-full transition-all duration-300 transform hover:-translate-y-1 text-white"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        <hr className="border-gray-800 my-8" />

        {/* Footer Meta Details and SEO Site Info */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center text-xs text-gray-500 font-sans">
          <div>
            &copy; {currentYear} <strong>{settings.logoText || "NANDHINI"} MAKEUP STUDIO</strong>. All Rights Reserved.
          </div>
          <div className="flex gap-4">
            <a href="/sitemap.xml" target="_blank" className="hover:text-[#81314c] transition-colors">Sitemap</a>
            <a href="/robots.txt" target="_blank" className="hover:text-[#81314c] transition-colors">Robots.txt</a>
            <button onClick={() => handleLink("admin")} className="hover:text-[#81314c] transition-colors">Admin Core</button>
          </div>
          <div className="text-[10px] max-w-xs text-gray-600">
            Award Winning Bridal Studio. Certified by elite luxury cosmetologists worldwide. Bangalore & International.
          </div>
        </div>
      </div>
    </footer>
  );
};
