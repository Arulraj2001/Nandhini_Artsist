import React from "react";
import { Sparkles, Calendar, Award, Star, Palette, BookOpen } from "lucide-react";
import { WebsiteSettings } from "../types";
import { parseAboutStory } from "../lib/aboutUtils";

interface AboutProps {
  settings: WebsiteSettings;
  onNavigate: (page: string) => void;
}

export const About: React.FC<AboutProps> = ({ settings, onNavigate }) => {
  const aboutData = parseAboutStory(settings?.aboutStory);
  const milestones = aboutData.milestones;

  return (
    <div className="bg-[#fbfaf9] py-16 md:py-24" id="about-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#81314c] bg-[#eddee3] px-3.5 py-1.5 rounded-full uppercase tracking-widest font-semibold font-sans mb-3">
            <Palette className="w-3.5 h-3.5" /> {aboutData.subtitle}
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-[#1F2937] tracking-tight">
            {aboutData.title}
          </h1>
          <p className="max-w-xl mx-auto text-sm md:text-base text-gray-500 font-sans mt-3">
            {aboutData.description}
          </p>
        </div>

        {/* Story Intro Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative">
            <div className="absolute inset-0 bg-[#81314c]/5 rounded-2xl -rotate-2 transform scale-105 select-none" />
            <img
              src={aboutData.aboutImage}
              alt={aboutData.title}
              className="relative z-10 w-full h-[400px] md:h-[550px] object-cover rounded-2xl shadow-xl border border-[#eddee3]"
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl md:text-4xl font-serif text-[#1F2937] tracking-tight border-l-4 border-[#81314c] pl-4">
              {aboutData.philosophyTitle}
            </h2>
            <p className="text-gray-650 text-sm md:text-base leading-relaxed font-sans italic pr-4">
              "{aboutData.philosophyQuote}"
            </p>
            <p className="text-gray-650 text-sm leading-relaxed font-sans whitespace-pre-line">
              {aboutData.story}
            </p>

            {/* Certifications and expertise list */}
            <div className="grid grid-cols-2 gap-4 pt-4 font-sans">
              <div className="bg-white p-4.5 rounded-xl border border-gray-100 flex items-center gap-3">
                <Award className="w-5 h-5 text-[#e6c699]" />
                <div>
                  <span className="block text-xs font-bold text-[#1F2937]">{aboutData.highlight1Title}</span>
                  <span className="text-[10px] text-gray-400">{aboutData.highlight1Sub}</span>
                </div>
              </div>
              <div className="bg-white p-4.5 rounded-xl border border-gray-100 flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-[#81314c]" />
                <div>
                  <span className="block text-xs font-bold text-[#1F2937]">{aboutData.highlight2Title}</span>
                  <span className="text-[10px] text-gray-400">{aboutData.highlight2Sub}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Layout */}
        <div id="timeline-container" className="mb-24 py-12 bg-white rounded-3xl border border-[#eddee3] px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-xs text-[#81314c] uppercase tracking-widest font-semibold font-sans">ESTABLISHING A LEGACY</span>
            <h3 className="text-3xl font-serif text-[#1F2937] mt-1">Our Journey Line</h3>
          </div>

          <div className="relative border-l border-gray-200 ml-4 md:ml-32 md:mr-32 space-y-12">
            {milestones.map((item, index) => (
              <div key={index} className="relative pl-8 group">
                {/* Year Badge */}
                <div className="md:absolute md:left-[-110px] md:top-0 bg-[#eddee3] text-[#81314c] font-sans text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-2 md:mb-0 inline-block">
                  {item.year}
                </div>
                
                {/* Timeline Node Bullet */}
                <span className="absolute left-[-6px] top-1.5 w-3 h-3 rounded-full bg-[#81314c] group-hover:scale-125 transition-transform" />

                {/* Card Details */}
                <div className="space-y-1 bg-[#fbfaf9] border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-serif text-lg font-semibold text-[#1F2937] tracking-wider">{item.title}</h4>
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-sans">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA to Consultation */}
        <div className="bg-[#81314c]/5 rounded-3xl p-8 md:p-12 text-center border border-[#81314c]/20">
          <h3 className="font-serif text-2xl md:text-4xl text-[#1F2937] tracking-wider mb-3">
            Want to Discuss Your Dream Creative Vision?
          </h3>
          <p className="max-w-xl mx-auto text-xs md:text-sm text-gray-500 font-sans mb-6 leading-relaxed">
            Every bride gets a personal, digital or in-person consultation call with Nandhini to draft layout contours and try combinations. Secure your slot.
          </p>
          <button
            id="about-cta-btn"
            onClick={() => onNavigate("contact")}
            className="bg-[#81314c] hover:bg-[#69233b] text-white text-xs font-semibold uppercase tracking-widest font-sans px-8 py-3.5 rounded-full shadow-md"
          >
            Start Pre-Consultation
          </button>
        </div>

      </div>
    </div>
  );
};
