import React, { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { MessageCircle, Phone } from 'lucide-react';
import { B, whatsappUrl } from '../data/catalog.js';
import { LUXURY_EASE, shouldShowFloatingBar } from '../utils/motionHelpers';

const FLOAT_WA_HREF = whatsappUrl(
  'Hello The Elite Spa Centre, I would like to book a spa ritual at your Kalyani Nagar sanctuary.'
);

export default function FloatingConciergeBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const heroEl = document.getElementById('hero-section');
      const hasHero = Boolean(heroEl);
      const heroHeight = heroEl ? heroEl.offsetHeight : 0;
      setVisible(shouldShowFloatingBar(window.scrollY, heroHeight, hasHero));
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {visible && (
          <motion.div
            key="floating-concierge-bar"
            data-testid="floating-concierge-bar"
            initial={{ y: 96, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 96, opacity: 0 }}
            transition={{ duration: 0.75, ease: LUXURY_EASE }}
            aria-label="Quick contact actions"
            className="fixed bottom-0 inset-x-0 sm:inset-x-auto sm:bottom-5 sm:right-5 z-30 bg-[#0a0908]/92 sm:bg-transparent backdrop-blur-xl sm:backdrop-blur-none border-t border-amber-500/20 sm:border-t-0 px-4 py-3 sm:p-0 grid grid-cols-2 sm:flex sm:flex-col items-center sm:items-end gap-2.5 will-change-transform"
          >
            <div className="wa-breathe-wrap rounded-full w-full sm:w-auto">
              <a
                href={FLOAT_WA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Book on WhatsApp"
                className="relative z-10 w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[48px] px-4 sm:px-5 py-2.5 rounded-full bg-[#15803D] hover:bg-[#16A34A] active:scale-[0.97] text-[#F4EFE6] text-[15px] font-semibold shadow-[0_8px_28px_rgba(0,0,0,0.55)] border border-white/15 transition-transform duration-200 whitespace-nowrap"
              >
                <MessageCircle className="w-[17px] h-[17px]" strokeWidth={1.75} aria-hidden="true" />
                <span>WhatsApp</span>
              </a>
            </div>
            <a
              href={`tel:${B.phone}`}
              aria-label="Call The Elite Spa Centre"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[48px] px-4 sm:px-5 py-2.5 rounded-full bg-[#12100e]/95 hover:bg-[#1F1C19] active:scale-[0.97] backdrop-blur-md text-[#F4EFE6] text-[15px] font-semibold shadow-[0_8px_28px_rgba(0,0,0,0.55)] border border-amber-500/35 hover:border-[#E5C158] transition-transform duration-200 whitespace-nowrap"
            >
              <Phone className="w-[16px] h-[16px] text-[#E5C158]" strokeWidth={1.75} aria-hidden="true" />
              <span>Call Now</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
