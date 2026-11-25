import React, { useMemo, useState } from 'react';
import { S } from '../data/catalog.js';
import TiltTreatmentCard from './TiltTreatmentCard';

const CATEGORIES = ['All Rituals', ...Array.from(new Set(S.map((item) => item.category)))];

export default function ServicesCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Rituals');

  const filtered = useMemo(() => {
    if (selectedCategory === 'All Rituals') return S;
    return S.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter rituals by category"
        className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-4 mb-10"
      >
        {CATEGORIES.map((category) => {
          const active = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-[0.1em] uppercase whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                active
                  ? 'bg-[#D4AF37] text-[#09090B]'
                  : 'bg-[#121215] text-[#F5F5F0]/80 border border-[#F5F5F0]/12 hover:border-[#D4AF37]/50'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
        {filtered.map((service) => (
          <TiltTreatmentCard key={service.slug} service={service} />
        ))}
      </div>
    </div>
  );
}
