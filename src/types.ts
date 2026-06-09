export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  image: string;
  active: boolean;
}

export interface PortfolioItem {
  id: string;
  category: "Bridal" | "Reception" | "Engagement" | "Fashion" | "Photoshoot";
  title: string;
  description: string;
  image: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number; // 1 to 5
  review: string;
  photo: string;
  event: string;
}

export interface PricingPackage {
  id: string;
  name: string;
  price: number;
  features: string[]; // split by comma or array
  isPopular: boolean;
}

export interface Booking {
  id: string;
  name: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate: string;
  status: "New" | "Contacted" | "Confirmed" | "Completed";
  message?: string;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate: string;
  message: string;
  status: "New" | "Contacted" | "Replied";
  createdAt: string;
}

export interface WebsiteSettings {
  logoText: string;
  heroBadge: string;
  heroTitle: string;
  heroDescription: string;
  heroBanner: string;
  aboutStory: string;
  aboutExperienceYears: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  whatsappNumber: string;
  instagramUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
  seoTitle?: string;
  seoKeywords?: string;
  seoDescription?: string;
  googleAnalyticsId?: string;
  googleSearchConsoleId?: string;
  metaRobotSettings?: string;
  googleMapsEmbedUrl?: string;
}

export interface DashboardStats {
  totalServices: number;
  totalPortfolio: number;
  totalTestimonials: number;
  totalEnquiries: number;
  totalBookings: number;
  monthlyEnquiries: { month: string; count: number }[];
  bookingAnalytics: { name: string; value: number }[];
}

export interface InstagramSettings {
  id: string;
  instagramAccountId: string;
  facebookPageId: string;
  accessToken: string;
  autoSync: boolean;
  syncInterval: number;
  autoImportPortfolio: boolean;
  lastSyncAt?: string;
  createdAt?: string;
}

export interface InstagramPost {
  id: string;
  instagramPostId: string;
  mediaType: "IMAGE" | "VIDEO" | "REEL" | "CAROUSEL_ALBUM";
  mediaUrl: string;
  thumbnailUrl?: string;
  caption?: string;
  permalink?: string;
  timestamp: string;
  syncedAt?: string;
}

export interface InstagramSyncLog {
  id: string;
  status: "SUCCESS" | "FAILED";
  message: string;
  postsImported: number;
  reelsImported: number;
  createdAt: string;
}

