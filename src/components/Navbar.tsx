import React, { useState } from "react";
import { Menu, X, Sparkles, User, LogOut } from "lucide-react";
import { WebsiteSettings } from "../types";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  settings: WebsiteSettings;
  isAdmin: boolean;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  settings,
  isAdmin,
  onLogout
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Services", id: "services" },
    { name: "Portfolio", id: "portfolio" },
    { name: "Testimonials", id: "testimonials" },
    { name: "Pricing", id: "pricing" },
    { name: "Contact", id: "contact" }
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav 
      className="sticky top-0 z-40 bg-[#fbfaf9]/85 backdrop-blur-md border-b border-[#eddee3] tracking-wide transition-colors duration-300"
      id="main-navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo Brand Title with Luxury Spacing */}
          <div 
            onClick={() => handleNavClick("home")} 
            className="flex flex-col items-start cursor-pointer hover:opacity-85 transition-opacity"
            id="brand-logo"
          >
            <span style={{ fontFamily: "'Cinzel', serif" }} className="text-xl sm:text-2xl font-bold tracking-[0.22em] text-[#1F2937] leading-tight flex items-center">
              {settings.logoText || "NANDHINI"}
            </span>
            <span className="text-[8px] uppercase tracking-[0.38em] text-[#81314c] font-semibold mt-1">
              Makeup Artist & Bridal Couture
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => {
              const active = currentPage === item.id;
              return (
                <button
                   id={`nav-item-${item.id}`}
                   key={item.id}
                   onClick={() => handleNavClick(item.id)}
                   className={`relative font-sans text-xs font-semibold uppercase tracking-widest transition-all duration-300 py-2 hover:text-[#81314c] ${
                     active ? "text-[#81314c]" : "text-gray-500"
                   }`}
                >
                  {item.name}
                  {active && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#81314c] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Desktop Right Side Booking CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAdmin ? (
              <div className="flex items-center space-x-3 bg-[#eddee3] px-4 py-2 rounded-full border border-[#81314c]/20">
                <button
                  id="nav-btn-admin"
                  onClick={() => handleNavClick("admin")}
                  className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold font-sans text-[#81314c] hover:opacity-80 transition-all"
                >
                  <User className="w-3.5 h-3.5" /> Portal
                </button>
                <div className="w-px h-4 bg-gray-300" />
                <button
                  id="nav-btn-logout"
                  onClick={onLogout}
                  className="text-gray-500 hover:text-red-600 transition-all"
                  title="Logout Admin"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                id="nav-btn-book"
                onClick={() => handleNavClick("contact")}
                className="flex items-center gap-2 bg-[#81314c] hover:bg-[#69233b] text-white text-xs font-semibold uppercase tracking-widest px-5 py-3 rounded-full hover:shadow-lg hover:shadow-[#81314c]/15 transition-all duration-300 transform active:scale-95 font-sans"
              >
                <Sparkles className="w-3.5 h-3.5" /> Book Consultation
              </button>
            )}
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex items-center space-x-3 lg:hidden">
            {isAdmin && (
              <button
                id="mobile-nav-btn-admin"
                onClick={() => handleNavClick("admin")}
                className="p-2 text-[#81314c] bg-[#eddee3] rounded-full border border-[#81314c]/20"
                title="Admin Portal"
              >
                <User className="w-4 h-4" />
              </button>
            )}
            <button
              id="mobile-hamburger"
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#1F2937] p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden bg-[#fbfaf9] border-b border-[#eddee3] py-5 px-6 space-y-4 shadow-xl transition-all duration-300 absolute w-full top-20 left-0 z-35"
          id="mobile-drawer"
        >
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => {
              const active = currentPage === item.id;
              return (
                <button
                  id={`mobile-nav-item-${item.id}`}
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left font-sans text-xs font-semibold uppercase tracking-widest w-full py-1.5 transition-all ${
                    active ? "text-[#81314c] pl-2 border-l-2 border-[#81314c]" : "text-gray-505 pl-0"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
            
            <hr className="border-[#eddee3] my-2" />

            {isAdmin ? (
              <div className="flex items-center justify-between bg-[#eddee3] p-3 rounded-lg">
                <span className="text-xs uppercase tracking-wider font-semibold font-sans text-[#81314c]">
                  Logged in as Admin
                </span>
                <button
                  id="mobile-btn-logout"
                  onClick={() => {
                    onLogout();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 font-semibold"
                >
                  <LogOut className="w-3.5 h-3.5" /> Logout
                </button>
              </div>
            ) : (
              <button
                id="mobile-nav-btn-book"
                onClick={() => handleNavClick("contact")}
                className="w-full text-center bg-[#81314c] hover:bg-[#69233b] text-white text-xs font-semibold uppercase tracking-widest py-3.5 rounded-full transition-colors font-sans flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" /> Book Consultation
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
