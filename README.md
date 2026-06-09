# ⚜️ Nandhini Bridal Couture — Deployment & Integration Guide

This guide details the procedures to connect this high-end bridal salon portal with **Supabase (PostgreSQL Database)** and host it globally on **Vercel** with fully automated SEO and Google metadata tags.

---

## 🚀 1. Supabase Backend Integration

Supabase gives you a secure, auto-scaling PostgreSQL database with an instant API layer. Follow these simple steps to transition the data persistence from local JSON mock collections to your live cloud database:

### Step 1: Create Your Supabase Project
1. Log in to [Supabase (supabase.com)](https://supabase.com).
2. Click **New Project** and select your region and organization.
3. Keep track of your **Project API keys** and **Database URL** under the Project Settings panel.

### Step 2: Initialize Tables & Real Couture Datasets
1. Inside your Supabase Dashboard, navigate to the **SQL Editor** tab from the left navigation rail.
2. Click **New Query**.
3. Open the file `supabase_schema.sql` located in this project's root folder.
4. Copy the entire contents of the script, paste it into the editor, and click **Run**.
5. *Verify:* Go to your **Table Editor** to confirm that the `services`, `portfolio`, `testimonials`, `pricing_packages`, `bookings`, `contact_messages`, and `settings` tables are created and seeded with all initial high-definition luxury content.

### Step 3: Install Supabase JS Client (Optional Client-Side Driver)
If you decide to fetch data directly on the client side bypass the Express container:
```bash
npm install @supabase/supabase-js
```
Then create a database utility helper in `/src/lib/supabase.ts` to access your tables:
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

---

## 🗺️ 2. Studio Google Maps Integration

An interactive Map coordinates interface has been integrated into the **Contact Page** (and is editable live from the Admin Dashboard):

1. **How to Get Your Embed URL:**
   - Go to [Google Maps](https://maps.google.com).
   - Search for your custom Boutique Studio name or street address.
   - Click **Share** &rarr; select the **Embed a Map** tab.
   - Copy only the `src` attribute value from the iframe tag (e.g. `https://www.google.com/maps/embed?pb=...`).
2. **Apply the Map Code:**
   - Log into the **Admin Portal** on your live site.
   - Go to General Settings &rarr; **Studio Map Coordinates Integration**.
   - Paste the link and hit **Save**. The map will render instantly on the contact screen!

---

## 📈 3. SEO Optimization Settings

This app incorporates a high-performance SEO management engine built into `/src/App.tsx` that uses standard HTML document tags for maximum Google crawler discovery. 

Inside the **Admin Dashboard**, you can configure:
* **Google Search Console Verification Code:** Instantly verifier meta tags to register ownership on Google Webmasters console.
* **Google Analytics Measurement ID:** Automatically inserts the dynamic tracking script (`G-XXXXXXXXXX`) to track user clicks, events, and traffic sources in real-time.
* **SEO Title & Descriptions:** Manage keyword-dense search titles and snippet descriptions shown to couples seeking luxury weddings.
* **Meta Robots settings:** Fine-tune indexing rules (e.g., `index, follow`) to guide crawler behaviors safely.

---

## ☁️ 4. Vercel Hosting Deployment Guide

Deploying this app on Vercel is extremely simple and fast. Vercel automatically reads the configuration inside `vercel.json` to configure single-page application routes and headers correctly.

### ⚡ Option A: Visual Git Import (Recommended)
1. Push your project code to **GitHub, GitLab, or Bitbucket**.
2. Go to the [Vercel Dashboard](https://vercel.com) and click **Add New** &rarr; **Project**.
3. Import your code repository.
4. **Environment Variables:** If you have client keys (e.g., Supabase Keys, custom URLs), add them in Vercel's environment settings panel with the `VITE_` prefix:
   * `VITE_SUPABASE_URL` = `your_live_supabase_url`
   * `VITE_SUPABASE_ANON_KEY` = `your_live_anon_id`
5. Click **Deploy**. Your luxury bridal site will be online with an SSL green lock in under 60 seconds!

### 💻 Option B: Vercel CLI
If you prefer deploying from your terminal, run:
```bash
npm install -g vercel
vercel login
vercel
```
To push live to production:
```bash
vercel --prod
```

### 🎯 Pro-Tip: Zero Footers on Admin Board
The design now hides the heavy marketing footer inside the `/admin` workspace completely, ensuring clean alignment and maximum administrative task focus for managing reservations, bookings, and website variables!
