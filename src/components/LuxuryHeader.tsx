import React, { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight, Phone, MessageCircle } from 'lucide-react';
import { B, whatsappUrl } from '../data/catalog.js';

interface LuxuryHeaderProps {
  currentPath?: string;
}

// Strict 5-link luxury navigation bar: Rituals, Bundles, Gallery, Shop, Location
const NAV_LINKS = [
  { label: 'Rituals', href: '/services/' },
  { label: 'Bundles', href: '/offers/' },
  { label: 'Gallery', href: '/gallery/' },
  { label: 'Shop', href: '/shop/' },
  { label: 'Location', href: '/contact/' },
];

export default function LuxuryHeader({ currentPath = '/' }: LuxuryHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0B0A09]/84 backdrop-blur-xl border-b border-[#D4AF7A]/22 py-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
            : 'bg-gradient-to-b from-[#0B0A09]/85 via-[#0B0A09]/40 to-transparent py-4 sm:py-5 border-b border-transparent'
        }`}
      >
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="/"
            className="font-serif text-[22px] sm:text-[26px] font-medium tracking-[0.12em] uppercase text-[#F4EFE6] hover:text-[#D4AF7A] transition-colors whitespace-nowrap shrink-0"
            aria-label="The Elite Spa Centre home"
          >
            The Elite Spa
          </a>

          {/* Zone 2: Exactly 5 Concise 15px Nav Links */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === '/'
                  ? currentPath === '/'
                  : currentPath.startsWith(link.href);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-[15px] font-medium tracking-[0.04em] whitespace-nowrap shrink-0 transition-colors relative pb-1 ${
                    active
                      ? 'text-[#E5C158]'
                      : 'text-[#F4EFE6]/92 hover:text-[#D4AF7A]'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#E5C158]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Single Clear Gold CTA ("Book a Ritual") + Mobile Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="/booking/"
              className="hidden sm:inline-flex items-center gap-2 min-h-[48px] px-6 py-3 rounded-full bg-[#E5C158] hover:bg-[#F0D58C] active:scale-[0.98] text-[#0B0A09] text-[16px] font-semibold transition-all duration-200 whitespace-nowrap shrink-0"
            >
              <span>Book a Ritual</span>
              <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="lg:hidden inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#D4AF7A]/40 bg-[#161412]/88 text-[#F4EFE6] active:scale-[0.96] transition-transform cursor-pointer"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-5 h-5" strokeWidth={1.5} /> : <Menu className="w-5 h-5" strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Sanctuary Drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        <div
          className="absolute inset-0 bg-[#0B0A09]/96 backdrop-blur-2xl"
          onClick={() => setMenuOpen(false)}
        />
        <div className="relative h-full flex flex-col justify-between p-6 pt-5 overflow-y-auto">
          <div className="flex items-center justify-between border-b border-[#D4AF7A]/20 pb-4">
            <a
              href="/"
              onClick={() => setMenuOpen(false)}
              className="font-serif text-[24px] tracking-[0.12em] uppercase text-[#F4EFE6]"
            >
              The Elite Spa
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="w-12 h-12 rounded-full border border-[#D4AF7A]/40 flex items-center justify-center text-[#F4EFE6] active:scale-[0.96] cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          <nav className="flex flex-col gap-5 py-8" aria-label="Mobile navigation">
            <a
              href="/"
              onClick={() => setMenuOpen(false)}
              className="font-serif text-[32px] text-[#F4EFE6] hover:text-[#D4AF7A] transition-colors"
            >
              Home
            </a>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-serif text-[32px] text-[#F4EFE6] hover:text-[#D4AF7A] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/booking/"
              onClick={() => setMenuOpen(false)}
              className="font-serif text-[30px] text-[#E5C158] transition-colors"
            >
              Book a Ritual
            </a>
          </nav>

          <div className="border-t border-[#D4AF7A]/20 pt-6 space-y-4">
            <p className="text-[15px] font-semibold text-[#E5C158]">
              Open Daily 8:00 AM – 3:00 AM
            </p>
            <p className="text-[16px] text-[#F4EFE6]/90 leading-[1.6]">
              {B.shortAddress}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a
                href={whatsappUrl('Hello The Elite Spa Centre, I would like to book a spa ritual in Kalyani Nagar.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[52px] py-3.5 px-6 rounded-full bg-[#E5C158] text-[#0B0A09] text-[16px] font-semibold active:scale-[0.98]"
              >
                <MessageCircle className="w-5 h-5" strokeWidth={1.6} />
                <span>Book on WhatsApp</span>
              </a>
              <a
                href={`tel:${B.phone}`}
                className="inline-flex items-center justify-center gap-2 min-h-[52px] py-3.5 px-6 rounded-full border border-[#D4AF7A]/50 text-[#F4EFE6] text-[16px] font-semibold active:scale-[0.98]"
              >
                <Phone className="w-5 h-5 text-[#E5C158]" strokeWidth={1.6} />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
