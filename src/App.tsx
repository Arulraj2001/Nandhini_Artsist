import React, { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { FloatingButtons } from "./components/FloatingButtons";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Services } from "./pages/Services";
import { Portfolio } from "./pages/Portfolio";
import { Testimonials } from "./pages/Testimonials";
import { Pricing } from "./pages/Pricing";
import { Contact } from "./pages/Contact";
import { AdminLogin } from "./pages/AdminLogin";
import { AdminDashboard } from "./pages/AdminDashboard";
import { api } from "./lib/api";
import { parseAboutStory } from "./lib/aboutUtils";
import { supabase } from "./lib/supabase";
import { 
  Service, 
  PortfolioItem, 
  Testimonial, 
  PricingPackage, 
  WebsiteSettings,
  InstagramPost 
} from "./types";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(() => localStorage.getItem("theme") === "dark");

  const toggleDark = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);
  
  // Luxury State Cache
  const [services, setServices] = useState<Service[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [pricingPackages, setPricingPackages] = useState<PricingPackage[]>([]);
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);
  const [syncLoading, setSyncLoading] = useState<boolean>(true);

  // Restore classic auth mount checks & ensure clean list class on document
  useEffect(() => {
    // 1. Check current Supabase auth session
    const syncSession = async () => {
      if (supabase) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setIsAdmin(true);
          localStorage.setItem("admin-jwt-token", session.access_token);
        } else {
          const token = localStorage.getItem("admin-jwt-token");
          if (token) {
            setIsAdmin(true);
          }
        }
      } else {
        const token = localStorage.getItem("admin-jwt-token");
        if (token) {
          setIsAdmin(true);
        }
      }
    };
    syncSession();

    // 2. Listen for auth changes from Supabase
    let authListener: any = null;
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (session) {
          setIsAdmin(true);
          localStorage.setItem("admin-jwt-token", session.access_token);
        } else {
          setIsAdmin(false);
          localStorage.removeItem("admin-jwt-token");
        }
      });
      authListener = subscription;
    }

    // Dark mode init is handled by the isDark useEffect

    return () => {
      if (authListener) {
        authListener.unsubscribe();
      }
    };
  }, []);

  // Fetch central collections
  const loadGlobalCollections = async () => {
    try {
      setSyncLoading(true);
      const [srv, port, test, pkg, sett, igPosts] = await Promise.all([
        api.getServices(),
        api.getPortfolio(),
        api.getTestimonials(),
        api.getPricingPackages(),
        api.getSettings(),
        api.getInstagramPosts()
      ]);

      setServices(srv);
      setPortfolio(port);
      setTestimonials(test);
      setPricingPackages(pkg);
      setSettings(sett);
      setInstagramPosts(igPosts);
    } catch (err) {
      console.error("Central collections synchronization error:", err);
    } finally {
      setSyncLoading(false);
    }
  };

  useEffect(() => {
    loadGlobalCollections();
  }, []);

  // Scroll-reveal IntersectionObserver — wires up .reveal elements each page change
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("revealed"); }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    const timer = setTimeout(() => {
      document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) => observer.observe(el));
    }, 80);
    return () => { clearTimeout(timer); observer.disconnect(); };
  }, [currentPage]);

  // Background Auto-sync process (30 minutes check)
  useEffect(() => {
    const triggerAutoSync = async () => {
      try {
        const settingsRes = await api.getInstagramSettings();
        if (settingsRes && settingsRes.autoSync) {
          const lastSync = settingsRes.lastSyncAt ? new Date(settingsRes.lastSyncAt).getTime() : 0;
          const now = Date.now();
          const minutesPassed = (now - lastSync) / (1000 * 60);

          if (minutesPassed >= settingsRes.syncInterval) {
            console.log("Auto sync engine: Throttling interval check...");
            await api.syncInstagram();
            
            // Refetch lists
            const refreshedPosts = await api.getInstagramPosts();
            setInstagramPosts(refreshedPosts);
            const refreshedPort = await api.getPortfolio();
            setPortfolio(refreshedPort);
          }
        }
      } catch (err) {
        console.warn("Background auto sync check skipped:", err);
      }
    };

    const initialSyncTimer = setTimeout(() => {
      triggerAutoSync();
    }, 5000);

    const syncIntervalTimer = setInterval(() => {
      triggerAutoSync();
    }, 30 * 60 * 1000);

    return () => {
      clearTimeout(initialSyncTimer);
      clearInterval(syncIntervalTimer);
    };
  }, []);

  // Dynamic SEO meta updates inside iframe & parent tabs!
  useEffect(() => {
    if (!settings) return;

    // 1. Updates Document Title
    const brandName = settings.logoText || "Nandhini MakeUp Artist";
    const baseTitle = settings.seoTitle || `${brandName} | Luxury Bridal & Fashion Makeup Artist Bangalore`;
    const pageTitleMap: Record<string, string> = {
      home: baseTitle,
      about: `Meet Nandhini | Decadal Award-Winning Cosmetology Master`,
      services: `Signature Makeovers Menu | HD Airbrush Bridal Draping`,
      portfolio: `Digital Lookbook Gallery | Beautiful Real Brides Collection`,
      testimonials: `Happy Client Revolutions | Real Glowing Testimonies`,
      pricing: `Bridal Packages Tiers | Silver, Gold & Platinum Program`,
      contact: `Reserve Consultation slots | Secure Your Wedding Date`,
      admin: `Boutique Portal Control Panel | Secure Administrative Command`
    };

    document.title = pageTitleMap[currentPage] || pageTitleMap.home;

    // 2. Dynamically Inject/Configure SEO Meta Descriptions & OG tags to head!
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    
    const descriptionsMap: Record<string, string> = {
      home: settings.seoDescription || settings.heroDescription || "Award-winning bridal makeup and styling parlor. Book luxury consultations now.",
      about: parseAboutStory(settings.aboutStory).story.slice(0, 155) || "Meet Nandhini, certified elite master. Creating high-definition custom traditional elegance for global brides.",
      services: "Explore signature bridal catalogs, custom waterproof sheet prepping treatments, and premium saree pleating layouts.",
      portfolio: "Browse our Pinterest-style lookbook of captivating brides, fashion models, and destination events.",
      testimonials: "Read verified five-star glowing feedback from our happy bridal community across locations.",
      pricing: "Find tailored program cards for Silver, Gold, and Platinum premium cosmetics programs.",
      contact: "Drop details to secure hold calendar slots for exclusive bridal makeup trials."
    };

    metaDesc.setAttribute("content", descriptionsMap[currentPage] || descriptionsMap.home);

    // Dynamic Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute("content", settings.seoKeywords || "bridal makeup, makeup artist bangalore, nandhini cosmetics");

    // Dynamic Robots setting
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement("meta");
      metaRobots.setAttribute("name", "robots");
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute("content", settings.metaRobotSettings || "index, follow");

    // Dynamic Google Search Console ID meta
    let metaGsc = document.querySelector('meta[name="google-site-verification"]');
    if (settings.googleSearchConsoleId) {
      if (!metaGsc) {
        metaGsc = document.createElement("meta");
        metaGsc.setAttribute("name", "google-site-verification");
        document.head.appendChild(metaGsc);
      }
      metaGsc.setAttribute("content", settings.googleSearchConsoleId);
    } else if (metaGsc) {
      metaGsc.remove();
    }

    // Dynamic Google Analytics integration
    if (settings.googleAnalyticsId) {
      let scriptGaTag = document.getElementById("google-analytics-gtag-script");
      if (!scriptGaTag) {
        scriptGaTag = document.createElement("script");
        scriptGaTag.setAttribute("id", "google-analytics-gtag-script");
        scriptGaTag.setAttribute("async", "true");
        scriptGaTag.setAttribute("src", `https://www.googletagmanager.com/gtag/js?id=${settings.googleAnalyticsId}`);
        document.head.appendChild(scriptGaTag);
      }

      let scriptGaExec = document.getElementById("google-analytics-exec-script");
      if (!scriptGaExec) {
        scriptGaExec = document.createElement("script");
        scriptGaExec.setAttribute("id", "google-analytics-exec-script");
        scriptGaExec.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${settings.googleAnalyticsId}');
        `;
        document.head.appendChild(scriptGaExec);
      }
    }

    // 3. Inject Structured LocalBusiness & MakeupArtist JSON-LD Rich Schema for SEO 100!
    let scriptSchema = document.getElementById("structured-business-seo-schema");
    if (scriptSchema) {
      scriptSchema.remove();
    }
    scriptSchema = document.createElement("script");
    scriptSchema.setAttribute("id", "structured-business-seo-schema");
    scriptSchema.setAttribute("type", "application/ld+json");
    
    const jsonLdData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "LocalBusiness",
          "@id": "https://nandhinimakeup.com/#localbusiness",
          "name": brandName,
          "image": settings.heroBanner,
          "telephone": settings.contactPhone,
          "email": settings.contactEmail,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": settings.contactAddress || "Prestige Boulevards",
            "addressLocality": "Bangalore",
            "addressCountry": "IN"
          },
          "priceRange": "Rs. Rs. Rs."
        },
        {
          "@type": "BeautySalon",
          "name": `${brandName} Makeup Studio`,
          "description": "Premium High-Definition Bridal Makeup, Hair Styling, and Costume Draping Boutique.",
          "telephone": settings.contactPhone,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": settings.contactAddress || "Prestige Boulevards",
            "addressLocality": "Bangalore",
            "addressCountry": "IN"
          }
        }
      ]
    };

    scriptSchema.innerHTML = JSON.stringify(jsonLdData);
    document.head.appendChild(scriptSchema);

  }, [currentPage, settings]);

  // Authentication Handlers
  const handleLoginSuccess = (token: string) => {
    localStorage.setItem("admin-jwt-token", token);
    setIsAdmin(true);
    setCurrentPage("admin");
  };

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut().catch(() => {});
    }
    localStorage.removeItem("admin-jwt-token");
    setIsAdmin(false);
    setCurrentPage("home");
  };

  // Route router selector
  const renderCurrentPage = () => {
    // Show loading only for non-home pages while initial data loads
    // Home page renders immediately with fallback/default values
    if ((syncLoading || !settings) && currentPage !== "home") {
      return (
        <div className="min-h-[70vh] flex items-center justify-center flex-col gap-3.5 bg-[#fbfaf9]">
          <div className="w-10 h-10 border-2 border-[#81314c] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs uppercase tracking-[0.2em] font-sans text-[#81314c] font-medium animate-pulse">
            Configuring Luxury Boutique...
          </span>
        </div>
      );
    }

    switch (currentPage) {
      case "home":
        return (
          <Home
            settings={settings || ({} as WebsiteSettings)}
            services={services}
            portfolio={portfolio}
            testimonials={testimonials}
            onNavigate={setCurrentPage}
            instagramPosts={instagramPosts}
          />
        );
      case "about":
        return <About settings={settings} onNavigate={setCurrentPage} />;
      case "services":
        return <Services services={services} onNavigate={setCurrentPage} />;
      case "portfolio":
        return <Portfolio portfolio={portfolio} />;
      case "testimonials":
        return <Testimonials testimonials={testimonials} />;
      case "pricing":
        return <Pricing pricingPackages={pricingPackages} onNavigate={setCurrentPage} />;
      case "contact":
        return <Contact settings={settings} onBookingAdded={loadGlobalCollections} />;
      case "admin":
        return isAdmin ? (
          <AdminDashboard onLogoutSuccess={handleLogout} />
        ) : (
          <AdminLogin
            onLoginSuccess={handleLoginSuccess}
            onNavigateHome={() => setCurrentPage("home")}
          />
        );
      default:
        return (
          <Home
            settings={settings}
            services={services}
            portfolio={portfolio}
            testimonials={testimonials}
            onNavigate={setCurrentPage}
            instagramPosts={instagramPosts}
          />
        );
    }
  };

  return (
    <div className={`flex flex-col min-h-screen antialiased selection:bg-[#eddee3] selection:text-[#81314c] transition-colors duration-500 ${isDark ? "bg-[#0d0a0c] text-[#f0e8ec]" : "bg-[#fbfaf9] text-[#1F2937]"}`}>
      {/* 1. Global Elite Navbar */}
      {settings && (
        <Navbar
          currentPage={currentPage}
          onNavigate={(page) => {
            setCurrentPage(page);
          }}
          settings={settings}
          isAdmin={isAdmin}
          onLogout={handleLogout}
          isDark={isDark}
          onToggleDark={toggleDark}
        />
      )}

      {/* 2. Main Stage Router Content */}
      <main className="flex-grow">
        <div key={currentPage} className="page-enter">
          {renderCurrentPage()}
        </div>
      </main>

      {/* 3. Global Footer Links */}
      {settings && currentPage !== "admin" && (
        <Footer 
          settings={settings} 
          onNavigate={(page) => {
            setCurrentPage(page);
          }} 
        />
      )}

      {/* 4. Contact Floating triggers */}
      {settings && <FloatingButtons settings={settings} />}
    </div>
  );
}
