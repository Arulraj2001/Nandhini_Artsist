import { createClient } from "@supabase/supabase-js";
import { 
  Service, 
  PortfolioItem, 
  Testimonial, 
  PricingPackage, 
  Booking, 
  ContactMessage, 
  WebsiteSettings,
  InstagramSettings,
  InstagramPost,
  InstagramSyncLog
} from "../types";

// Read public environment variables safely using import.meta.env
const supabaseUrl = (((import.meta as any).env?.VITE_SUPABASE_URL) || "").trim();
const supabaseAnonKey = (((import.meta as any).env?.VITE_SUPABASE_ANON_KEY) || "").trim();

// Initialize client only if we have non-empty credentials, preventing startup crashes
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

/**
 * BI-DIRECTIONAL SCHEMA MAPPERS
 * Converts database snake_case conventions into React camelCase interfaces.
 */

export const mapService = {
  toReact: (db: any): Service => ({
    id: db.id,
    title: db.title,
    description: db.description,
    price: Number(db.price || 0),
    duration: db.duration,
    image: db.image,
    active: db.active !== false,
  }),
  toDb: (react: Partial<Service>) => ({
    id: react.id,
    title: react.title,
    description: react.description,
    price: react.price,
    duration: react.duration,
    image: react.image,
    active: react.active,
  })
};

export const mapPortfolio = {
  toReact: (db: any): PortfolioItem => ({
    id: db.id,
    category: db.category,
    title: db.title,
    description: db.description,
    image: db.image,
    createdAt: db.created_at || new Date().toISOString().split("T")[0],
  }),
  toDb: (react: Partial<PortfolioItem>) => ({
    id: react.id,
    category: react.category,
    title: react.title,
    description: react.description,
    image: react.image,
    created_at: react.createdAt,
  })
};

export const mapTestimonial = {
  toReact: (db: any): Testimonial => ({
    id: db.id,
    name: db.name,
    rating: db.rating,
    review: db.review,
    photo: db.photo,
    event: db.event,
  }),
  toDb: (react: Partial<Testimonial>) => ({
    id: react.id,
    name: react.name,
    rating: react.rating,
    review: react.review,
    photo: react.photo,
    event: react.event,
  })
};

export const mapPricingPackage = {
  toReact: (db: any): PricingPackage => ({
    id: db.id,
    name: db.name,
    price: Number(db.price || 0),
    features: Array.isArray(db.features) ? db.features : (db.features || "").split(","),
    isPopular: db.is_popular === true,
  }),
  toDb: (react: Partial<PricingPackage>) => ({
    id: react.id,
    name: react.name,
    price: react.price,
    features: react.features,
    is_popular: react.isPopular,
  })
};

export const mapBooking = {
  toReact: (db: any): Booking => ({
    id: db.id,
    name: db.name,
    phone: db.phone,
    email: db.email,
    eventType: db.event_type,
    eventDate: db.event_date,
    status: db.status || "New",
    message: db.message || undefined,
    createdAt: db.created_at || new Date().toISOString(),
  }),
  toDb: (react: Partial<Booking>) => ({
    id: react.id,
    name: react.name,
    phone: react.phone,
    email: react.email,
    event_type: react.eventType,
    event_date: react.eventDate,
    status: react.status,
    message: react.message,
    created_at: react.createdAt,
  })
};

export const mapContactMessage = {
  toReact: (db: any): ContactMessage => ({
    id: db.id,
    name: db.name,
    phone: db.phone,
    email: db.email,
    eventType: db.event_type || "",
    eventDate: db.event_date || "",
    message: db.message,
    status: db.status || "New",
    createdAt: db.created_at || new Date().toISOString(),
  }),
  toDb: (react: Partial<ContactMessage>) => ({
    id: react.id,
    name: react.name,
    phone: react.phone,
    email: react.email,
    event_type: react.eventType,
    event_date: react.eventDate,
    message: react.message,
    status: react.status,
    created_at: react.createdAt,
  })
};

export const mapSettings = {
  toReact: (db: any): WebsiteSettings => ({
    logoText: db.logo_text || "NANDHINI",
    heroBadge: db.hero_badge || "",
    heroTitle: db.hero_title || "",
    heroDescription: db.hero_description || "",
    heroBanner: db.hero_banner || "",
    aboutStory: db.about_story || "",
    aboutExperienceYears: db.about_experience_years || "",
    contactPhone: db.contact_phone || "",
    contactEmail: db.contact_email || "",
    contactAddress: db.contact_address || "",
    whatsappNumber: db.whatsapp_number || "",
    instagramUrl: db.instagram_url || "",
    facebookUrl: db.facebook_url || "",
    youtubeUrl: db.youtube_url || "",
    seoTitle: db.seo_title || "",
    seoKeywords: db.seo_keywords || "",
    seoDescription: db.seo_description || "",
    googleAnalyticsId: db.google_analytics_id || "",
    googleSearchConsoleId: db.google_search_console_id || "",
    metaRobotSettings: db.meta_robot_settings || "index, follow",
    googleMapsEmbedUrl: db.google_maps_embed_url || "",
  }),
  toDb: (react: Partial<WebsiteSettings>) => ({
    logo_text: react.logoText,
    hero_badge: react.heroBadge,
    hero_title: react.heroTitle,
    hero_description: react.heroDescription,
    hero_banner: react.heroBanner,
    about_story: react.aboutStory,
    about_experience_years: react.aboutExperienceYears,
    contact_phone: react.contactPhone,
    contact_email: react.contactEmail,
    contact_address: react.contactAddress,
    whatsapp_number: react.whatsappNumber,
    instagram_url: react.instagramUrl,
    facebook_url: react.facebookUrl,
    youtube_url: react.youtubeUrl,
    seo_title: react.seoTitle,
    seo_keywords: react.seoKeywords,
    seo_description: react.seoDescription,
    google_analytics_id: react.googleAnalyticsId,
    google_search_console_id: react.googleSearchConsoleId,
    meta_robot_settings: react.metaRobotSettings,
    google_maps_embed_url: react.googleMapsEmbedUrl,
  })
};

export const mapInstagramSettings = {
  toReact: (db: any): InstagramSettings => ({
    id: db.id || "instagram_config",
    instagramAccountId: db.instagram_account_id || "",
    facebookPageId: db.facebook_page_id || "",
    accessToken: db.access_token || "",
    autoSync: db.auto_sync !== false,
    syncInterval: Number(db.sync_interval || 30),
    autoImportPortfolio: db.auto_import_portfolio === true,
    lastSyncAt: db.last_sync_at || undefined,
    createdAt: db.created_at || undefined,
  }),
  toDb: (react: Partial<InstagramSettings>) => ({
    id: react.id || "instagram_config",
    instagram_account_id: react.instagramAccountId,
    facebook_page_id: react.facebookPageId,
    access_token: react.accessToken,
    auto_sync: react.autoSync,
    sync_interval: react.syncInterval,
    auto_import_portfolio: react.autoImportPortfolio,
    last_sync_at: react.lastSyncAt,
    created_at: react.createdAt,
  })
};

export const mapInstagramPost = {
  toReact: (db: any): InstagramPost => ({
    id: db.id,
    instagramPostId: db.instagram_post_id,
    mediaType: db.media_type,
    mediaUrl: db.media_url,
    thumbnailUrl: db.thumbnail_url || undefined,
    caption: db.caption || undefined,
    permalink: db.permalink || undefined,
    timestamp: db.timestamp,
    syncedAt: db.synced_at || undefined,
  }),
  toDb: (react: Partial<InstagramPost>) => ({
    id: react.id,
    instagram_post_id: react.instagramPostId,
    media_type: react.mediaType,
    media_url: react.mediaUrl,
    thumbnail_url: react.thumbnailUrl,
    caption: react.caption,
    permalink: react.permalink,
    timestamp: react.timestamp,
    synced_at: react.syncedAt,
  })
};

export const mapInstagramSyncLog = {
  toReact: (db: any): InstagramSyncLog => ({
    id: db.id,
    status: db.status,
    message: db.message,
    postsImported: Number(db.posts_imported || 0),
    reelsImported: Number(db.reels_imported || 0),
    createdAt: db.created_at || undefined,
  }),
  toDb: (react: Partial<InstagramSyncLog>) => ({
    id: react.id,
    status: react.status,
    message: react.message,
    posts_imported: react.postsImported,
    reels_imported: react.reelsImported,
    created_at: react.createdAt,
  })
};
