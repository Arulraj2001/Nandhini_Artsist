import React from "react";
import { MessageSquare, Phone, Instagram } from "lucide-react";
import { WebsiteSettings } from "../types";

interface FloatingButtonsProps {
  settings: WebsiteSettings;
}

export const FloatingButtons: React.FC<FloatingButtonsProps> = ({ settings }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      {/* WhatsApp Button */}
      {settings.whatsappNumber && (
        <a
          id="btn-whatsapp-floating"
          href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 bg-[#25D366] text-white rounded-full shadow-md hover:scale-110 active:scale-95 transition-all duration-300 group relative"
          title="Chat on WhatsApp"
        >
          <MessageSquare className="w-5 h-5 fill-white" />
          <span className="absolute right-12 scale-0 group-hover:scale-100 bg-gray-950 text-white text-[10px] px-2.5 py-1 rounded shadow-md whitespace-nowrap transition-all duration-200">
            WhatsApp
          </span>
        </a>
      )}

      {/* Instagram Button */}
      {settings.instagramUrl && (
        <a
          id="btn-instagram-floating"
          href={settings.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white rounded-full shadow-md hover:scale-110 active:scale-95 transition-all duration-300 group relative"
          title="Follow on Instagram"
        >
          <Instagram className="w-4.5 h-4.5" />
          <span className="absolute right-12 scale-0 group-hover:scale-100 bg-gray-950 text-white text-[10px] px-2.5 py-1 rounded shadow-md whitespace-nowrap transition-all duration-200">
            Instagram
          </span>
        </a>
      )}

      {/* Call Button */}
      {settings.contactPhone && (
        <a
          id="btn-call-floating"
          href={`tel:${settings.contactPhone}`}
          className="flex items-center justify-center w-10 h-10 bg-[#81314c] text-white rounded-full shadow-md hover:scale-110 active:scale-95 transition-all duration-300 group relative"
          title="Call Now"
        >
          <Phone className="w-4.5 h-4.5 fill-white" />
          <span className="absolute right-12 scale-0 group-hover:scale-100 bg-gray-950 text-white text-[10px] px-2.5 py-1 rounded shadow-md whitespace-nowrap transition-all duration-200">
            Call
          </span>
        </a>
      )}
    </div>
  );
};
