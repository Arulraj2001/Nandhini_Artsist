import React, { useState, useEffect } from "react";
import { Menu, X, Sparkles, User, LogOut, Sun, Moon } from "lucide-react";
import { WebsiteSettings } from "../types";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  settings: WebsiteSettings;
  isAdmin: boolean;
  onLogout: () => void;
  isDark?: boolean;
  onToggleDark?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  settings,
  isAdmin,
  onLogout,
  isDark = false,
  onToggleDark,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const isHomeAtTop = currentPage === "home" && !isScrolled;

  return (
    <nav
      className={`sticky top-0 z-40 tracking-wide transition-all duration-500 ${
        isHomeAtTop
          ? "navbar-at-top"
          : "navbar-scrolled"
      }`}
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
            <span style={{ fontFamily: "'Cinzel Decorative', 'Cinzel', serif" }} className="text-xl sm:text-2xl font-bold tracking-[0.16em] leading-tight flex items-center bg-gradient-to-r from-[#81314c] via-[#b84f70] to-[#81314c] bg-clip-text text-transparent">
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
                    active
                      ? "text-[#81314c]"
                      : isHomeAtTop
                      ? "text-gray-700"
                      : "text-gray-500"
                  }`}
                >
                  {item.name}
                  {active && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#81314c] to-[#e6c699] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Desktop Right Side Booking CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Dark / Light Toggle */}
            <button
              onClick={onToggleDark}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 ${
                isDark
                  ? "bg-[#2a1f25] border-[#3d2d36] text-[#e6c699] hover:bg-[#3d2d36]"
                  : isHomeAtTop
                  ? "bg-white/20 border-white/30 text-white hover:bg-white/30"
                  : "bg-white/70 border-[#eddee3] text-[#81314c] hover:bg-[#eddee3]"
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

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
            {/* Mobile dark toggle */}
            <button
              onClick={onToggleDark}
              title={isDark ? "Light Mode" : "Dark Mode"}
              className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                isDark
                  ? "bg-[#2a1f25] border-[#3d2d36] text-[#e6c699]"
                  : "bg-white/70 border-[#eddee3] text-[#81314c]"
              }`}
            >
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
            <button
              id="mobile-hamburger"
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md transition-colors ${isDark ? "text-[#f0e8ec] hover:bg-[#2a1f25]" : "text-[#1F2937] hover:bg-gray-100"}`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className={`lg:hidden border-b py-5 px-6 space-y-4 shadow-xl transition-all duration-300 absolute w-full top-20 left-0 z-35 ${
            isDark ? "bg-[#1a1218] border-[#2a2028]" : "bg-[#fbfaf9] border-[#eddee3]"
          }`}
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
                    active
                      ? "text-[#81314c] pl-2 border-l-2 border-[#81314c]"
                      : isDark ? "text-[#cbbac3] pl-0" : "text-gray-500 pl-0"
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
      {/* Scroll Progress Indicator */}
      <div
        className="absolute bottom-0 left-0 h-[2.5px] bg-gradient-to-r from-[#81314c] via-[#b84f70] to-[#e6c699] transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </nav>
  );
};
