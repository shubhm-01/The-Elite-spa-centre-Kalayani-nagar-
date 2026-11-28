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
        className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-4 mb-12"
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
              className={`py-3.5 px-6 rounded-full text-[16px] sm:text-[17px] font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                active
                  ? 'bg-[#E5C158] text-[#09090B]'
                  : 'bg-[#121215] text-[#F5F5F0] border border-[#F5F5F0]/18 hover:border-[#E5C158]/60'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((service) => (
          <TiltTreatmentCard key={service.slug} service={service} />
        ))}
      </div>
    </div>
  );
}
