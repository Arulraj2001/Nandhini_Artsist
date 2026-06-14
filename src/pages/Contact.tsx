import React, { useState } from "react";
import { Mail, Phone, MapPin, Sparkles, Send, CheckCircle, Clock } from "lucide-react";
import { WebsiteSettings } from "../types";
import { api } from "../lib/api";

interface ContactProps {
  settings: WebsiteSettings;
  onBookingAdded?: () => void;
}

export const Contact: React.FC<ContactProps> = ({ settings, onBookingAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: "Bridal Makeup",
    eventDate: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [lastSubmission, setLastSubmission] = useState<any>(null);
  const [error, setError] = useState("");

  const eventTypes = [
    "Bridal Makeup",
    "Reception Glam",
    "Engagement Makeup",
    "Pre-Wedding Photoshoot",
    "Fashion Editorial",
    "Celebrity Party Guest",
    "Other Consultation"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.eventDate) {
      setError("Please fill out all required fields (*).");
      return;
    }

    try {
      setLoading(true);
      setError("");
      
      // Perform genuine POST request to express backend!
      await api.createContactMessage({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        eventType: formData.eventType,
        eventDate: formData.eventDate,
        message: formData.message,
      });

      setLastSubmission({
        name: formData.name,
        eventType: formData.eventType,
        eventDate: formData.eventDate
      });
      setSubmitted(true);
      setShowPopup(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        eventType: "Bridal Makeup",
        eventDate: "",
        message: "",
      });

      // Let parents know to refresh their lists
      if (onBookingAdded) {
        onBookingAdded();
      }
    } catch (err: any) {
      setError(err.message || "Failed to catalog your booking query.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fbfaf9] py-16 md:py-24" id="contact-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#81314c] bg-[#eddee3] px-3.5 py-1.5 rounded-full uppercase tracking-widest font-semibold font-sans mb-3">
            <Mail className="w-3.5 h-3.5" /> SECURING THE DATE
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-[#1F2937] tracking-tight">
            Reserve Your Consultation
          </h1>
          <p className="max-w-xl mx-auto text-sm md:text-base text-gray-500 font-sans mt-3">
            Have questions about pricing packages, outstation routing, or trial slots? Submit details below to unlock our custom booking pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch reveal">
          
          {/* Left Side: Professional Studio Coordinates */}
          <div className="lg:col-span-5 bg-[#1F2937] text-white p-8 md:p-12 rounded-3xl flex flex-col justify-between relative overflow-hidden shadow-xl border border-gray-800">
            {/* Background luxury gradient glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#81314c]/15 rounded-full filter blur-3xl pointer-events-none" />

            <div className="space-y-8">
              <div>
                <span className="text-[#81314c] text-xs font-sans uppercase tracking-widest font-bold">STUDIO CONTACTS</span>
                <h3 className="text-2xl font-serif text-white mt-1">Get in Touch</h3>
                <p className="text-xs text-gray-400 font-sans mt-1">Our concierge stands ready to reply inside 12-24 business hours.</p>
              </div>

              {/* coordinates list */}
              <ul className="space-y-6 font-sans text-sm md:text-base">
                {settings.contactAddress && (
                  <li className="flex items-start gap-4">
                    <span className="p-3 bg-white/5 text-[#81314c] rounded-full shrink-0">
                      <MapPin className="w-5 h-5" />
                    </span>
                    <div>
                      <span className="block text-xs uppercase text-gray-500 tracking-wider font-sans font-semibold">Address Coordinates</span>
                      <span className="text-gray-300 text-sm">{settings.contactAddress}</span>
                    </div>
                  </li>
                )}

                {settings.contactPhone && (
                  <li className="flex items-start gap-4">
                    <span className="p-3 bg-white/5 text-[#81314c] rounded-full shrink-0">
                      <Phone className="w-5 h-5" />
                    </span>
                    <div>
                      <span className="block text-xs uppercase text-gray-500 tracking-wider font-sans font-semibold">Voice Phone</span>
                      <a href={`tel:${settings.contactPhone}`} className="text-gray-300 text-sm hover:text-white transition-colors">
                        {settings.contactPhone}
                      </a>
                    </div>
                  </li>
                )}

                {settings.contactEmail && (
                  <li className="flex items-start gap-4">
                    <span className="p-3 bg-white/5 text-[#81314c] rounded-full shrink-0">
                      <Mail className="w-5 h-5" />
                    </span>
                    <div className="min-w-0">
                      <span className="block text-xs uppercase text-gray-500 tracking-wider font-sans font-semibold">Direct Email</span>
                      <a href={`mailto:${settings.contactEmail}`} className="text-[#81314c] text-sm hover:text-white transition-colors truncate block">
                        {settings.contactEmail}
                      </a>
                    </div>
                  </li>
                )}
              </ul>
            </div>

            {/* Social channels display */}
            <div className="pt-8 border-t border-gray-800 mt-12 space-y-4">
              <span className="block text-xs text-gray-500 uppercase tracking-widest font-semibold font-sans">Our Social Portfolios</span>
              <div className="flex gap-4">
                {settings.instagramUrl && (
                  <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#81314c] font-sans text-xs font-semibold uppercase tracking-widest flex items-center gap-1">
                    Instagram Portfolio &rarr;
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Side: Luxury Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-3xl border border-gray-150 shadow-sm">
            {submitted ? (
              <div className="text-center py-16 space-y-6">
                <div className="flex justify-center">
                  <CheckCircle className="w-16 h-16 text-[#81314c] animate-bounce" />
                </div>
                <h3 className="font-serif text-3xl text-[#1F2937] tracking-tight">Your Slot Query Has Been Logged!</h3>
                <p className="max-w-md mx-auto text-sm text-gray-500 font-sans leading-relaxed">
                  Thank you, lovely. Nandhini's schedule coordinator has registered your event details and date (with temporary pending hold). Expect email or voice call details very shortly!
                </p>
                <div className="pt-4">
                  <button
                    id="btn-submit-another"
                    onClick={() => setSubmitted(false)}
                    className="bg-[#81314c] hover:bg-[#69233b] text-white text-xs uppercase tracking-widest font-semibold font-sans px-6 py-3 rounded-full"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center md:text-left mb-6">
                  <span className="text-xs uppercase text-[#81314c] font-semibold tracking-widest font-sans">DIRECT SECURE LINE</span>
                  <h3 className="font-serif text-2xl text-[#1F2937] mt-0.5">Draft Your Booking Specifics</h3>
                </div>

                {error && (
                  <div className="bg-red-50 text-red-700 p-4 rounded-xl text-xs font-sans font-medium border border-red-100 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full" /> {error}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase font-sans tracking-wider font-semibold text-gray-500">
                      Your First & Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="input-contact-name"
                      type="text"
                      required
                      placeholder="e.g. Prianka Sen"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#fbfaf9] border border-gray-200 focus:border-[#81314c] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#81314c]"
                    />
                  </div>

                  {/* Phone field */}
                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase font-sans tracking-wider font-semibold text-gray-500">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="input-contact-phone"
                      type="tel"
                      required
                      placeholder="e.g. +91 99000 88776"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#fbfaf9] border border-gray-200 focus:border-[#81314c] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#81314c]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email field */}
                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase font-sans tracking-wider font-semibold text-gray-500">
                      Email Coordinates <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="input-contact-email"
                      type="email"
                      required
                      placeholder="e.g. prianka.sen@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#fbfaf9] border border-gray-200 focus:border-[#81314c] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#81314c]"
                    />
                  </div>

                  {/* Date field */}
                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase font-sans tracking-wider font-semibold text-gray-500">
                      Proposed Celebrated Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="input-contact-date"
                      type="date"
                      required
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      className="w-full bg-[#fbfaf9] border border-gray-200 focus:border-[#81314c] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#81314c]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Event Type selector */}
                  <div className="space-y-1 md:col-span-2">
                    <label className="block text-[10px] uppercase font-sans tracking-wider font-semibold text-gray-500">
                      Celebration Category
                    </label>
                    <select
                      id="input-contact-eventtype"
                      value={formData.eventType}
                      onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                      className="w-full bg-[#fbfaf9] border border-gray-200 focus:border-[#81314c] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#81314c]"
                    >
                      {eventTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message text area */}
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase font-sans tracking-wider font-semibold text-gray-500">
                    Tell Us About Your Vision & Dress Colors
                  </label>
                  <textarea
                    id="input-contact-message"
                    rows={4}
                    placeholder="Describe saree color patterns, accessories, hair styling expectations, or specific bridal notes..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#fbfaf9] border border-gray-200 focus:border-[#81314c] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#81314c]"
                  />
                </div>

                {/* Submit button */}
                <button
                  id="btn-contact-submit"
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#81314c] hover:bg-[#69233b] text-white text-xs font-semibold uppercase tracking-widest font-sans py-4.5 rounded-full shadow-lg transition-transform transform active:scale-98 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span>Registering Credentials...</span>
                  ) : (
                    <>
                      <Send className="w-4.5 h-4.5" /> Book Consultation & Save Date
                    </>
                  )}
                </button>
                <div className="flex justify-center items-center gap-1.5 text-[10px] text-gray-400 font-sans">
                  <Clock className="w-3.5 h-3.5 text-[#81314c]" /> Secure Hold lasts for 48 hours until manual team review.
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Interactive Studio Location Map */}
        {settings.googleMapsEmbedUrl && (
          <div className="mt-16 animate-fade-in" id="contact-map-block">
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-150 shadow-sm relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-2">
                <div>
                  <span className="text-xs uppercase text-[#81314c] font-semibold tracking-widest font-sans flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#e6c699]" /> Boutique Coordinates
                  </span>
                  <h3 className="font-serif text-2xl text-[#1F2937] mt-0.5">Visit Our Luxury Bangalore Studio</h3>
                </div>
                <p className="text-xs text-gray-400 font-sans max-w-sm md:text-right">
                  Located in Bangalore’s prime boutique district. Schedule a studio visit for a luxury look trial or saree draping consultation.
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-inner h-[380px] w-full bg-gray-50 relative">
                <iframe 
                  title="Nandhini Makeup Studio Bangalore Map"
                  src={settings.googleMapsEmbedUrl}
                  className="w-full h-full border-0 rounded-2xl"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Success Popup Notification Modal */}
      {showPopup && lastSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm flex items-center justify-center" id="contact-success-popup">
          <div className="relative bg-white text-gray-900 rounded-3xl max-w-md w-full p-8 md:p-10 shadow-2xl border border-gray-150 transform transition-all duration-350 scale-100 flex flex-col items-center text-center space-y-6">
            
            {/* Success Icon Animation Wrapper */}
            <div className="relative w-20 h-20 bg-[#eddee3] rounded-full flex items-center justify-center text-[#81314c] shadow-inner mb-2 animate-bounce">
              <CheckCircle className="w-10 h-10 stroke-[2]" />
              <div className="absolute -top-1 -right-1 bg-[#e6c699] text-white p-1 rounded-full">
                <Sparkles className="w-4 h-4 fill-current" />
              </div>
            </div>

            {/* Content info */}
            <div className="space-y-2.5">
              <span className="text-[10px] uppercase font-sans tracking-[0.25em] font-extrabold text-[#81314c]">
                Booking Request Secured
              </span>
              <h3 className="text-2xl font-serif text-[#1F2937] tracking-tight">
                Consultation Logged!
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm font-sans leading-relaxed">
                Thank you, lovely. Nandhini's coordinator has registered your request and holds a tentative schedule slot for you.
              </p>
            </div>

            {/* Event Summary Box */}
            <div className="bg-[#fbfaf9] border border-[#eddee3] p-4.5 rounded-2xl w-full text-left font-sans text-xs space-y-2.5 shadow-inner">
              <div className="flex justify-between border-b border-gray-100 pb-1.5">
                <span className="text-gray-400">Bride's Name:</span>
                <span className="font-semibold text-gray-700">{lastSubmission.name}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-1.5">
                <span className="text-gray-400">Celebration Category:</span>
                <span className="font-semibold text-gray-700">{lastSubmission.eventType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Celebrated Date:</span>
                <span className="font-semibold text-[#81314c]">
                  {new Date(lastSubmission.eventDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>

            {/* CTA action */}
            <button
              id="btn-close-success-popup"
              onClick={() => {
                setShowPopup(false);
                setSubmitted(false);
              }}
              className="w-full bg-[#81314c] hover:bg-[#69233b] text-white font-sans text-xs font-semibold uppercase tracking-widest py-4 rounded-full transition-transform transform active:scale-95 shadow-md shadow-[#81314c]/10"
            >
              Back to Contact Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
