import React, { useRef, useState } from 'react';
import { ArrowUpRight, MessageCircle, Clock } from 'lucide-react';
import { whatsappUrl } from '../data/catalog.js';

export interface ServiceItem {
  slug: string;
  name: string;
  duration: string;
  price: number;
  priceQualifier: string;
  category: string;
  moods?: string[];
  image: string;
  description: string;
}

interface TiltTreatmentCardProps {
  service: ServiceItem;
}

export default function TiltTreatmentCard({ service }: TiltTreatmentCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    el.style.setProperty('--mouse-x', `${x}px`);
    el.style.setProperty('--mouse-y', `${y}px`);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4.5;
    const rotateY = ((x - centerX) / centerX) * 4.5;

    el.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  const bookingMsg = `Hello The Elite Spa Centre, I would like to book the ${service.name} (${service.duration}, starting at ₹${service.price.toLocaleString('en-IN')}) at your Kalyani Nagar sanctuary. Please share available slots.`;

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="tilt-card group relative rounded-2xl bg-[#121215]/90 border border-[#D4AF37]/20 overflow-hidden flex flex-col justify-between h-full"
    >
      {/* Visual Media Container */}
      <div className="relative h-60 sm:h-64 overflow-hidden bg-gradient-to-br from-[#1A1A1F] via-[#121215] to-[#09090B]">
        {!imgError ? (
          <img
            src={service.image}
            alt={`${service.name} at The Elite Spa Centre, Kalyani Nagar`}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-6 text-center bg-gradient-to-br from-[#1d1912] to-[#09090B]">
            <span className="font-serif text-2xl text-[#D4AF37]/80">{service.name}</span>
          </div>
        )}

        {/* Measured dark contrast scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-[#121215]/25 to-transparent pointer-events-none" />

        {/* Duration Indicator */}
        <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#09090B]/75 backdrop-blur-md border border-[#D4AF37]/25 text-[11px] font-medium tracking-wide text-[#F5F5F0]">
          <Clock className="w-3 h-3 text-[#D4AF37]" aria-hidden="true" />
          <span>{service.duration}</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative z-10 p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2 text-xs text-[#D4AF37]/90 tracking-[0.12em] uppercase mb-2">
          <span>{service.category}</span>
          <span className="text-[#B0AEA6] tracking-normal normal-case">{service.priceQualifier}</span>
        </div>

        <h3 className="font-serif text-2xl sm:text-[26px] font-medium text-[#F5F5F0] leading-tight mb-2.5 group-hover:text-[#E8CB6D] transition-colors">
          <a href={`/services/${service.slug}/`} className="focus:outline-none">
            {service.name}
          </a>
        </h3>

        <p className="text-sm text-[#B0AEA6] leading-relaxed line-clamp-2 mb-6">
          {service.description}
        </p>

        {/* Pricing + Conversion Row */}
        <div className="mt-auto pt-4 border-t border-[#F5F5F0]/10 flex items-center justify-between gap-3">
          <div>
            <span className="block text-[11px] text-[#B0AEA6] leading-none mb-1">Starting at</span>
            <span className="font-serif text-2xl font-semibold text-[#F5F5F0] tabular-nums">
              ₹{service.price.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`/services/${service.slug}/`}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#F5F5F0]/15 text-[#F5F5F0]/80 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
              aria-label={`View details for ${service.name}`}
              title="View ritual details"
            >
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href={whatsappUrl(bookingMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#D4AF37] hover:bg-[#E8CB6D] text-[#09090B] text-xs font-semibold tracking-wider uppercase transition-all duration-200 whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Book</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
