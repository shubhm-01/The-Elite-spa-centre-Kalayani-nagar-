import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { whatsappUrl } from '../data/catalog.js';
import { SpotlightCard } from './LuxuryMotionPrimitives';

export interface ServiceItem {
  slug: string;
  name: string;
  duration: string;
  price: number;
  priceQualifier?: string;
  category?: string;
  moods?: string[];
  image: string;
  description: string;
}

interface TiltTreatmentCardProps {
  service: ServiceItem;
}

export default function TiltTreatmentCard({ service }: TiltTreatmentCardProps) {
  const [imgError, setImgError] = useState(false);

  const bookingMsg = `Hello The Elite Spa Centre, I would like to book ${service.name} (${service.duration} • ₹${service.price.toLocaleString('en-IN')}) at your Kalyani Nagar sanctuary.`;

  return (
    <SpotlightCard className="card-hover-zoom flex flex-col justify-between h-full active:scale-[0.985]">
      {/* 1. Large High-Res Photo (aspect-[4/3]) */}
      <a
        href={`/services/${service.slug}/`}
        className="relative block aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#1F1C19] via-[#12100e] to-[#0a0908]"
        aria-label={`View details for ${service.name}`}
      >
        {!imgError ? (
          <img
            src={service.image}
            alt={service.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-8 text-center bg-gradient-to-br from-[#211C16] to-[#0a0908]">
            <span className="font-serif text-[28px] text-[#E5C158]">{service.name}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#12100e] via-transparent to-transparent pointer-events-none" />
      </a>

      {/* Clean Spacious Card Content */}
      <div className="relative z-10 p-7 flex flex-col flex-1 justify-between gap-6">
        <div className="space-y-3">
          {/* 2. Large Editorial Treatment Title */}
          <h3 className="font-serif text-[26px] sm:text-[28px] font-medium text-[#F4EFE6] leading-[1.18] transition-colors">
            <a href={`/services/${service.slug}/`} className="focus:outline-none">
              {service.name}
            </a>
          </h3>

          {/* 3. Concise 1-Sentence Punchy Benefit (17px Soft Ivory) */}
          <p className="text-[17px] text-[#F4EFE6]/90 leading-[1.6]">
            {service.description}
          </p>
        </div>

        {/* 4. Single Clean Bottom Row: Duration • Price + Bold Book CTA */}
        <div className="pt-5 border-t border-[#F4EFE6]/12 flex flex-wrap items-center justify-between gap-4">
          <span className="text-[20px] sm:text-[22px] font-bold text-[#E5C158] tabular-nums whitespace-nowrap">
            {service.duration} • ₹{service.price.toLocaleString('en-IN')}
          </span>

          <a
            href={whatsappUrl(bookingMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 min-h-[48px] py-3 px-6 rounded-full bg-[#E5C158] hover:bg-[#F0D58C] active:scale-[0.98] text-[#0a0908] text-[16px] font-semibold transition-all duration-200 whitespace-nowrap shrink-0"
          >
            <span>Book</span>
            <ArrowRight className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
          </a>
        </div>
      </div>
    </SpotlightCard>
  );
}
