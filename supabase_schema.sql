-- NANDHINI BRIDAL COUTURE - SUPABASE DATABASE SCHEMA
-- This script sets up fully typed database tables and populates starter records.
-- Copy and run this script directly inside your Supabase project SQL Editor.

-- Enable UUID extension for security-best primary keys (Optional, defaults to UUID generation if preferred)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ====================================================================
-- 1. SERVICES TABLE
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.services (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC(10, 2) DEFAULT 0.00,
    duration VARCHAR(100) NOT NULL,
    image VARCHAR(2048) NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Active row security settings
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Allow admin full access to services" ON public.services FOR ALL USING (true); -- Customise using auth.uid() checks under Supabase in production

-- ====================================================================
-- 2. PORTFOLIO TABLE
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.portfolio (
    id VARCHAR(50) PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(2048) NOT NULL,
    created_at VARCHAR(100) NOT NULL
);

ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to portfolio" ON public.portfolio FOR SELECT USING (true);
CREATE POLICY "Allow admin full access to portfolio" ON public.portfolio FOR ALL USING (true);

-- ====================================================================
-- 3. TESTIMONIALS TABLE
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.testimonials (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review TEXT NOT NULL,
    photo VARCHAR(2048) NOT NULL,
    event VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Allow admin full access to testimonials" ON public.testimonials FOR ALL USING (true);

-- ====================================================================
-- 4. PRICING PACKAGES TABLE
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.pricing_packages (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    features TEXT[] NOT NULL,
    is_popular BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.pricing_packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to pricing packages" ON public.pricing_packages FOR SELECT USING (true);
CREATE POLICY "Allow admin full access to pricing packages" ON public.pricing_packages FOR ALL USING (true);

-- ====================================================================
-- 5. BOOKINGS TABLE
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.bookings (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    event_type VARCHAR(150) NOT NULL,
    event_date VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'New' NOT NULL,
    message TEXT,
    created_at VARCHAR(100) NOT NULL
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert onto bookings" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin full access to bookings" ON public.bookings FOR ALL USING (true);

-- ====================================================================
-- 6. CONTACT MESSAGES TABLE
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    event_type VARCHAR(150),
    event_date VARCHAR(100),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'New' NOT NULL,
    created_at VARCHAR(100) NOT NULL
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert onto contact messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin full access to contact messages" ON public.contact_messages FOR ALL USING (true);

-- ====================================================================
-- 7. SETTINGS TABLE
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.settings (
    id VARCHAR(50) PRIMARY KEY DEFAULT 'global_config',
    logo_text VARCHAR(100) DEFAULT 'NANDHINI' NOT NULL,
    hero_badge VARCHAR(255) DEFAULT 'Award Winning Bridal Makeup Artist',
    hero_title VARCHAR(255) DEFAULT 'Transforming Beauty Into Timeless Elegance',
    hero_description TEXT,
    hero_banner VARCHAR(2048),
    about_story TEXT,
    about_experience_years VARCHAR(50) DEFAULT '10+',
    contact_phone VARCHAR(100),
    contact_email VARCHAR(255),
    contact_address VARCHAR(500),
    whatsapp_number VARCHAR(100),
    instagram_url VARCHAR(500),
    facebook_url VARCHAR(500),
    youtube_url VARCHAR(500),
    seo_title VARCHAR(255),
    seo_keywords TEXT,
    seo_description TEXT,
    google_analytics_id VARCHAR(100),
    google_search_console_id VARCHAR(100),
    meta_robot_settings VARCHAR(255),
    google_maps_embed_url TEXT
);

ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read to settings" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Allow admin full access to settings" ON public.settings FOR ALL USING (true);

-- ====================================================================
-- SEED DATA PRE-INSERT (REAL COUTURE DATA)
-- ====================================================================

TRUNCATE TABLE public.services, public.portfolio, public.testimonials, public.pricing_packages, public.bookings, public.contact_messages, public.settings RESTART IDENTITY CASCADE;

INSERT INTO public.services (id, title, description, price, duration, image, active) VALUES
('s-1', 'Signature Bridal Makeover', 'Premium HD/Airbrush makeup tailored to your skin type, featuring luxurious detail contouring, premium lashes, customized lip art, and full hair & draping assistance.', 350, '4 Hours', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop', true),
('s-2', 'Reception & Glam Look', 'Elegant evening makeup design with striking eyes, champagne gold highlights, premium draping, and modern hairstyles for your post-wedding celebration.', 250, '3 Hours', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop', true),
('s-3', 'Engagement & Roka Elegance', 'Soft dew-kissed blushing glow, lightweight pastel eyes, and graceful crown braids for a gorgeous daytime or evening pre-wedding ensemble.', 200, '2.5 Hours', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop', true),
('s-4', 'High-Fashion Editorial Model', 'Avant-garde, creative, or ultra-crisp editorial makeup specifically styled to withstand studio strobe highlights under camera flashes.', 180, '2 Hours', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=600&auto=format&fit=crop', true),
('s-5', 'Celebrity Party Guest Glam', 'Clean, classic, and sophisticated luxury makeover for high-profile weddings and social galas. Features flawless wear-proof base setting.', 150, '1.5 Hours', 'https://images.unsplash.com/photo-1620859309999-ad1615d18da1?q=80&w=600&auto=format&fit=crop', true);

INSERT INTO public.portfolio (id, category, title, description, image, created_at) VALUES
('p-1', 'Bridal', 'Royal Crimson Grace', 'Traditional south-indian luxury gold jewelry pairing with premium HD contour matte makeup.', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop', '2026-05-15'),
('p-2', 'Reception', 'Celestial Evening Shimmer', 'Dramatic winged liner and luxury soft champagne shimmer eyeshadow on high-profile model.', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop', '2026-05-20'),
('p-3', 'Engagement', 'Peach Blush Bloom', 'Minimal glow with pastel rose gold accessories, keeping the natural features highlighted.', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop', '2026-05-25'),
('p-4', 'Fashion', 'Gothic Haute Couture', 'Dramatic deep berry lip styling paired with high gloss cheek highlights for modern fashion catalog.', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=600&auto=format&fit=crop', '2026-06-01'),
('p-5', 'Photoshoot', 'Ethereal Sunlight Muse', 'Soft-focus outdoor bridal look catching golden-hour natural glow beautifully.', 'https://images.unsplash.com/photo-1620859309999-ad1615d18da1?q=80&w=600&auto=format&fit=crop', '2026-06-05');

INSERT INTO public.testimonials (id, name, rating, review, photo, event) VALUES
('t-1', 'Aishwarya Krishnan', 5, 'Nandhini is an absolute magician! She styled me for both my wedding and reception, and I felt like a literal royal queen. The makeup lasted over 12 hours without a single crease, even during my teary emotional moments. Absolute master of her craft!', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop', 'Bridal Client'),
('t-2', 'Prianka Sen', 5, 'I have booked party makeup with several artists in the past, but the glowing, hydrated glass-skin look Nandhini created was next-level. Everyone asked me about it. Exceptional professionalism and a soothing energy!', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop', 'Premium Party Look'),
('t-3', 'Dr. Meera Nair', 5, 'From the virtual consultation call to the final touch-up on my big day, Nandhini and her team made everything frictionless. Her luxury bridal toolkit incorporates only premium labels. Easily the best investment I made for my wedding!', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop', 'Royal Destination Bridal');

INSERT INTO public.pricing_packages (id, name, price, features, is_popular) VALUES
('pp-1', 'Silver Package', 450.00, ARRAY['HD Flawless Airbrush Base Makeup', 'Traditional Hair Styling OR Elegant Updo', 'Premium Silk False Eyelashes', 'Basic Draping (Saree/Lehenga/Dupatta)', 'Standard Pre-Consultation (Online)'], false),
('pp-2', 'Gold Package', 750.00, ARRAY['Signature Glass Skin Airbrush Base', 'Luxury Premium Lash Customization', 'Premium Styling & Elaborate Hair Extensions', 'Advanced Draping & Premium Accessories Placement', '1x Face Prep Sheet Mask Session (On Spot)', 'Complimentary Mini Touch-up Travel Kit', 'In-Person Bridal Look Consultation trial'], true),
('pp-3', 'Platinum Package', 1200.00, ARRAY['Ultra-Luxury Water-Resistant Luxury Makeup', 'Pre-Wedding Look Trial Session included', 'Curated Hair Accessory & Floral Placement', 'Luxury Hand & Décolletage Body Glow Bronzing', 'Complementary Saree Pleat Steaming', 'Stay Until Photoshoot completion for touchups (Up to 6h)', 'Premium Mother-of-the-Bride Quick Glam Look complimentary'], false);

INSERT INTO public.bookings (id, name, phone, email, event_type, event_date, status, message, created_at) VALUES
('b-1', 'Shriya Sharma', '+91 98765 43210', 'shriya.sharma@example.com', 'Bridal Makeup', '2026-07-12', 'Confirmed', 'Hoping for a classic neutral look with soft pink shadow and heavy gold highlight.', '2026-06-05'),
('b-2', 'Divya Patel', '+1 (555) 345-6789', 'divya.patel@example.com', 'Engagement Look', '2026-06-25', 'New', 'Would love a trial before the final day if possible.', '2026-06-08');

INSERT INTO public.contact_messages (id, name, phone, email, event_type, event_date, message, status, created_at) VALUES
('cm-1', 'Anjali Rao', '+91 88877 66554', 'anjali.rao@example.com', 'Party Makeup', '2026-06-20', 'Inquiry about packages for 4 bridesmaids.', 'New', '2026-06-01');

INSERT INTO public.settings (
    id, logo_text, hero_badge, hero_title, hero_description, hero_banner,
    about_story, about_experience_years, contact_phone, contact_email,
    contact_address, whatsapp_number, instagram_url, facebook_url, youtube_url,
    seo_title, seo_keywords, seo_description, google_analytics_id,
    google_search_console_id, meta_robot_settings, google_maps_embed_url
) VALUES (
    'global_config',
    'NANDHINI',
    'Award Winning Bridal Makeup Artist',
    'Transforming Beauty Into Timeless Elegance',
    'Professional Bridal, Celebration & High-Fashion Makeup Artist bringing world-class beauty services directly to you. Creating luxury tailored masterpieces for your most memorable moments.',
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200&auto=format&fit=crop',
    'With over a decade of dedication to cosmetic precision, Nandhini has established an international reputation for custom-crafted bridal elegance. Her signature style bridges radiant, classic luxury with modern editorial clean-glow aesthetics. Sourcing only the most exclusive, ultra-luxury palettes (Chanel, Dior, Charlotte Tilbury), Nandhini meticulously studies your facial contours, attire hue, and lighting vectors to capture your raw, gorgeous self perfectly on camera and off.',
    '10+',
    '+91 99000 88776',
    'nandhini.bridalmakeup@gmail.com',
    'Luxury Studio Block 4, Prestige Boulevards, Bangalore, India',
    '+919900088776',
    'https://instagram.com/nandhini.makeup',
    'https://facebook.com/nandhinimakeup',
    'https://youtube.com/@nandhinimakeup',
    'Nandhini Makeup Artist | Luxury Bridal Makeup Bangalore',
    'bridal makeup bangalore, makeup artist, best bridal makeup bangalore, hd airbrush makeup, saree draping, nandhini makeup artist, makeup studio bangalore',
    'Book premium bridal makeup and wedding draping by Nandhini. Specialist in luxury HD airbrush makeup in Bangalore with 10+ years of gorgeous results.',
    'G-MOCKTRACKER12',
    'gsc-verification-mock-code-123456',
    'index, follow, max-image-preview:large, max-snippet:-1',
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.926112932468!2d77.59223!3d12.97159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670b1359c43%3A0xe7dc281c7bc991a0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin'
);

-- ====================================================================
-- 8. INSTAGRAM SETTINGS TABLE
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.instagram_settings (
    id VARCHAR(50) PRIMARY KEY DEFAULT 'instagram_config',
    instagram_account_id VARCHAR(255),
    facebook_page_id VARCHAR(255),
    access_token TEXT,
    auto_sync BOOLEAN DEFAULT TRUE NOT NULL,
    sync_interval INTEGER DEFAULT 30 NOT NULL, -- minutes
    auto_import_portfolio BOOLEAN DEFAULT FALSE NOT NULL, -- ON/OFF imported portfolio automation
    last_sync_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.instagram_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read to instagram_settings" ON public.instagram_settings FOR SELECT USING (true);
CREATE POLICY "Allow admin full access to instagram_settings" ON public.instagram_settings FOR ALL USING (true);

-- Seed default instagram settings row
INSERT INTO public.instagram_settings (id, instagram_account_id, facebook_page_id, access_token, auto_sync, sync_interval, auto_import_portfolio)
VALUES ('instagram_config', '', '', '', true, 30, false)
ON CONFLICT (id) DO NOTHING;

-- ====================================================================
-- 9. INSTAGRAM POSTS TABLE
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.instagram_posts (
    id VARCHAR(100) PRIMARY KEY,
    instagram_post_id VARCHAR(100) UNIQUE NOT NULL,
    media_type VARCHAR(50) NOT NULL, -- 'IMAGE', 'VIDEO', 'REEL', 'CAROUSEL_ALBUM'
    media_url TEXT NOT NULL,
    thumbnail_url TEXT,
    caption TEXT,
    permalink TEXT,
    timestamp VARCHAR(100) NOT NULL,
    synced_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.instagram_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read to instagram_posts" ON public.instagram_posts FOR SELECT USING (true);
CREATE POLICY "Allow admin full access to instagram_posts" ON public.instagram_posts FOR ALL USING (true);

-- Seed starter mock posts so the page looks stunning out of the box even before integration
INSERT INTO public.instagram_posts (id, instagram_post_id, media_type, media_url, thumbnail_url, caption, permalink, timestamp) VALUES
('ig-1', '18029384759201948', 'IMAGE', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop', NULL, '✨ Flawless bridal dreams! Hand-crafted luxury HD makeover for our gorgeous bride Aishwarya. Wearing premium lashes & custom contour gold glow. #BridalMakeup #NandhiniCouture #HDMakeup', 'https://instagram.com', '2026-06-08T10:00:00Z'),
('ig-2', '18029384759201949', 'REEL', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop', '🎥 Walk through of the Celestial Evening Shimmer look dynamic transformation. Slow motion details on high gloss contouring. #InstaReels #MakeupArtist #GlamLook', 'https://instagram.com', '2026-06-07T14:30:00Z'),
('ig-3', '18029384759201950', 'CAROUSEL_ALBUM', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop', NULL, 'Swipe left to see the step-by-step dewy base build-up process. Soft pastel makeup look tailored for outdoor daytime engagement rituals. 🌸 #EngagementLook #DewySkin #BridalArt', 'https://instagram.com', '2026-06-06T09:15:00Z'),
('ig-4', '18029384759201951', 'VIDEO', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800&auto=format&fit=crop', 'Studio spotlight breakdown: How to create high-fashion editorial makeup that stays perfect under powerful studio flashes. #EditorialMakeup #VogueBeauty #HighFashion', 'https://instagram.com', '2026-06-05T18:00:00Z'),
('ig-5', '18029384759201952', 'IMAGE', 'https://images.unsplash.com/photo-1620859309999-ad1615d18da1?q=80&w=800&auto=format&fit=crop', NULL, 'A look of pure elegance. Our luxury mother-of-the-bride glow keeping features incredibly elegant, sophisticated and naturally preserved. #SophisticatedMakeup #LuxuryBeauty', 'https://instagram.com', '2026-06-04T12:00:00Z')
ON CONFLICT (instagram_post_id) DO NOTHING;

-- ====================================================================
-- 10. INSTAGRAM SYNC LOGS TABLE
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.instagram_sync_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    status VARCHAR(50) NOT NULL, -- 'SUCCESS', 'FAILED'
    message TEXT NOT NULL,
    posts_imported INTEGER DEFAULT 0 NOT NULL,
    reels_imported INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.instagram_sync_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read to instagram_sync_logs" ON public.instagram_sync_logs FOR SELECT USING (true);
CREATE POLICY "Allow admin full access to instagram_sync_logs" ON public.instagram_sync_logs FOR ALL USING (true);

-- Seed initial log
INSERT INTO public.instagram_sync_logs (status, message, posts_imported, reels_imported)
VALUES ('SUCCESS', 'Instagram synchronization engine initialized successfully. Ready for manual/automated Syncing.', 5, 1);

