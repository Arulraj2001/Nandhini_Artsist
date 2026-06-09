export interface Milestone {
  year: string;
  title: string;
  desc: string;
}

export interface AboutPageData {
  story: string;
  subtitle: string;
  title: string;
  description: string;
  philosophyTitle: string;
  philosophyQuote: string;
  aboutImage: string;
  highlight1Title: string;
  highlight1Sub: string;
  highlight2Title: string;
  highlight2Sub: string;
  milestones: Milestone[];
}

export const DEFAULT_MILESTONES: Milestone[] = [
  {
    year: "2016",
    title: "Couture Master Certification",
    desc: "Graduated with honors from elite international cosmetologist academy, specializing in high-definition camera metrics and lighting science."
  },
  {
    year: "2018",
    title: "Bridal Studio Launch",
    desc: "Established the luxury parlor boutique and began styling high-profile South Indian celebrity clients and international destination brides."
  },
  {
    year: "2021",
    title: "Award for Bridal Excellence",
    desc: "Recognized as the 'Best Traditional Bridal Makeup Artist' at the South Beauty Galas for meticulous draping integration."
  },
  {
    year: "2024",
    title: "High Fashion Catalog Launch",
    desc: "Expanded into high-fashion model portfolios, partnering with top magazine editors for runway coverage looks."
  }
];

export const DEFAULT_ABOUT_DATA: AboutPageData = {
  subtitle: "BEHIND THE BRUSH",
  title: "The Art & Passion of Nandhini",
  description: "A journey of cosmetic precision, lighting mastery, and timeless human connection.",
  aboutImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop",
  philosophyTitle: "My Core Philosophy",
  philosophyQuote: "Makeup is never about masking. It is a precise geometric science and a spiritual celebration of confidence. Every single face tells a beautiful history—our custom mission is to study the spacing, the bone structure, the outfit tint, and create a masterpiece that feels like a breathable second skin.",
  story: "With over a decade of dedication to cosmetic precision, Nandhini has established an international reputation for custom-crafted bridal elegance. Her signature style bridges radiant, classic luxury with modern editorial clean-glow aesthetics. Sourcing only the most exclusive, ultra-luxury palettes, Nandhini meticulously studies your facial contours, attire hue, and lighting vectors.",
  highlight1Title: "Certified Elite",
  highlight1Sub: "LAC Academy London",
  highlight2Title: "Dermatology Safe",
  highlight2Sub: "Skin prep certified",
  milestones: DEFAULT_MILESTONES
};

export function parseAboutStory(aboutStoryRaw: string | undefined | null): AboutPageData {
  if (!aboutStoryRaw || !aboutStoryRaw.trim()) {
    return DEFAULT_ABOUT_DATA;
  }

  const trimmed = aboutStoryRaw.trim();
  if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
    try {
      const parsed = JSON.parse(trimmed);
      return {
        subtitle: parsed.subtitle || DEFAULT_ABOUT_DATA.subtitle,
        title: parsed.title || DEFAULT_ABOUT_DATA.title,
        description: parsed.description || DEFAULT_ABOUT_DATA.description,
        aboutImage: parsed.aboutImage || DEFAULT_ABOUT_DATA.aboutImage,
        philosophyTitle: parsed.philosophyTitle || DEFAULT_ABOUT_DATA.philosophyTitle,
        philosophyQuote: parsed.philosophyQuote || DEFAULT_ABOUT_DATA.philosophyQuote,
        story: parsed.story || parsed.aboutStory || DEFAULT_ABOUT_DATA.story,
        highlight1Title: parsed.highlight1Title || DEFAULT_ABOUT_DATA.highlight1Title,
        highlight1Sub: parsed.highlight1Sub || DEFAULT_ABOUT_DATA.highlight1Sub,
        highlight2Title: parsed.highlight2Title || DEFAULT_ABOUT_DATA.highlight2Title,
        highlight2Sub: parsed.highlight2Sub || DEFAULT_ABOUT_DATA.highlight2Sub,
        milestones: Array.isArray(parsed.milestones) ? parsed.milestones : DEFAULT_MILESTONES
      };
    } catch (e) {
      console.warn("Could not parse aboutStory as JSON, treating as legacy plain text story:", e);
    }
  }

  // Fallback to plain text legacy string
  return {
    ...DEFAULT_ABOUT_DATA,
    story: trimmed
  };
}

export function serializeAboutStory(data: AboutPageData): string {
  return JSON.stringify(data);
}
