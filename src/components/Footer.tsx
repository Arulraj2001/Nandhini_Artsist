import React from "react";
import {
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  Heart,
} from "lucide-react";
import { WebsiteSettings } from "../types";

interface FooterProps {
  settings: WebsiteSettings;
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onNavigate,
}) => {
  const currentYear = new Date().getFullYear();

  const handleLink = (page: string) => {
    onNavigate(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      className="bg-[#111827] text-white pt-20 pb-8 border-t border-gray-800"
      id="main-footer"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 xl:gap-16">

          {/* Brand */}
          <div className="space-y-5 xl:pr-8">
            <div>
              <h2 className="font-serif text-3xl font-bold tracking-[0.15em]">
                {settings.logoText || "NANDHINI"}
              </h2>

              <p className="text-[#B76E79] text-[11px] uppercase tracking-[0.35em] mt-2">
                Makeup Artist
              </p>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">
              Creating timeless bridal beauty with luxury
              makeup artistry, personalized styling, and
              unforgettable transformations for your
              most cherished moments.
            </p>

            <div className="flex items-center gap-2 text-[#D4AF37] text-xs uppercase tracking-widest font-semibold">
              <Sparkles className="w-4 h-4" />
              Premium Bridal Specialist
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg mb-6">
              Quick Links
            </h4>

            <ul className="space-y-3 text-sm text-gray-400">
              {[
                "home",
                "about",
                "services",
                "portfolio",
                "testimonials",
                "pricing",
                "contact",
              ].map((page) => (
                <li key={page}>
                  <button
                    onClick={() => handleLink(page)}
                    className="hover:text-[#B76E79] transition-colors"
                  >
                    {page.charAt(0).toUpperCase() +
                      page.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg mb-6">
              Contact
            </h4>

            <div className="space-y-4 text-sm text-gray-400">

              {settings.contactAddress && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#B76E79] mt-1 shrink-0" />
                  <span>{settings.contactAddress}</span>
                </div>
              )}

              {settings.contactPhone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#B76E79]" />
                  <a
                    href={`tel:${settings.contactPhone}`}
                    className="hover:text-white"
                  >
                    {settings.contactPhone}
                  </a>
                </div>
              )}

              {settings.contactEmail && (
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#B76E79]" />
                  <a
                    href={`mailto:${settings.contactEmail}`}
                    className="hover:text-white"
                  >
                    {settings.contactEmail}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-serif text-lg mb-6">
              Follow Us
            </h4>

            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Follow our latest bridal transformations,
              beauty tips, reels, and behind-the-scenes
              moments.
            </p>

            <div className="flex gap-3">

              {settings.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-white/5 hover:bg-[#B76E79] flex items-center justify-center transition-all"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}

              {settings.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-white/5 hover:bg-[#B76E79] flex items-center justify-center transition-all"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}

              {settings.youtubeUrl && (
                <a
                  href={settings.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-white/5 hover:bg-[#B76E79] flex items-center justify-center transition-all"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-14 pt-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

            {/* Left */}
            <div className="text-center lg:text-left">
              <p className="text-sm text-gray-400">
                © {currentYear}{" "}
                <span className="font-semibold text-white">
                  {settings.logoText || "NANDHINI"}
                </span>
                . All Rights Reserved.
              </p>

              <p className="text-xs text-gray-500 mt-1">
                Luxury Bridal Makeup Artist • Tamil Nadu
                • Destination Weddings
              </p>
            </div>

            {/* Center */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">

              <button
                onClick={() => handleLink("about")}
                className="hover:text-[#B76E79]"
              >
                About
              </button>

              <button
                onClick={() => handleLink("services")}
                className="hover:text-[#B76E79]"
              >
                Services
              </button>

              <button
                onClick={() => handleLink("portfolio")}
                className="hover:text-[#B76E79]"
              >
                Portfolio
              </button>

              <button
                onClick={() => handleLink("contact")}
                className="hover:text-[#B76E79]"
              >
                Contact
              </button>

              <button
                onClick={() => handleLink("admin")}
                className="hover:text-[#B76E79]"
              >
                Admin Login
              </button>

            </div>

            {/* Right */}
            <div className="flex items-center gap-2 text-xs text-gray-500">
              Crafted with
              <Heart className="w-3 h-3 text-[#B76E79]" />
              for beautiful moments
            </div>

          </div>

        </div>
      </div>
    </footer>
  );
};
