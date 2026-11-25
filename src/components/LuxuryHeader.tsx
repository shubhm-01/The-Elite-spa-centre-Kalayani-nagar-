import React, { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight, Phone, MessageCircle } from 'lucide-react';
import { B, whatsappUrl } from '../data/catalog.js';

interface LuxuryHeaderProps {
  currentPath?: string;
}

const NAV_LINKS = [
  { label: 'Rituals', href: '/services/' },
  { label: 'Bundles', href: '/offers/' },
  { label: 'Shop', href: '/shop/' },
  { label: 'Gallery', href: '/gallery/' },
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
            ? 'bg-[#09090B]/90 backdrop-blur-xl border-b border-[#D4AF37]/20 py-3.5'
            : 'bg-gradient-to-b from-[#09090B]/85 via-[#09090B]/40 to-transparent py-4 sm:py-5 border-b border-transparent'
        }`}
      >
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Clean single-line brand wordmark */}
          <a
            href="/"
            className="font-serif text-xl sm:text-2xl font-medium tracking-[0.14em] uppercase text-[#F5F5F0] hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0"
            aria-label="The Elite Spa Centre home"
          >
            The Elite Spa
          </a>

          {/* Zone 2: 5 concise single-line navigation links */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-7 lg:gap-9">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === '/'
                  ? currentPath === '/'
                  : currentPath.startsWith(link.href);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-medium tracking-[0.14em] uppercase whitespace-nowrap shrink-0 transition-colors relative pb-1 ${
                    active
                      ? 'text-[#D4AF37]'
                      : 'text-[#F5F5F0]/80 hover:text-[#F5F5F0]'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute left-0 right-0 bottom-0 h-px bg-[#D4AF37]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action + Mobile Drawer Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="/booking/"
              className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#D4AF37] hover:bg-[#E8CB6D] text-[#09090B] text-xs font-semibold tracking-[0.12em] uppercase transition-all duration-200 whitespace-nowrap shrink-0"
            >
              <span>Book Now</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#D4AF37]/30 bg-[#121215]/80 text-[#F5F5F0] hover:border-[#D4AF37] transition-colors"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Sanctuary Drawer */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        <div
          className="absolute inset-0 bg-[#09090B]/95 backdrop-blur-2xl"
          onClick={() => setMenuOpen(false)}
        />
        <div className="relative h-full flex flex-col justify-between p-6 pt-5 overflow-y-auto">
          <div className="flex items-center justify-between border-b border-[#D4AF37]/15 pb-4">
            <a
              href="/"
              onClick={() => setMenuOpen(false)}
              className="font-serif text-xl tracking-[0.14em] uppercase text-[#F5F5F0]"
            >
              The Elite Spa
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="w-10 h-10 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#F5F5F0]"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-5 py-8" aria-label="Mobile navigation">
            <a
              href="/"
              onClick={() => setMenuOpen(false)}
              className="font-serif text-3xl text-[#F5F5F0] hover:text-[#D4AF37] transition-colors"
            >
              Home
            </a>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-serif text-3xl text-[#F5F5F0] hover:text-[#D4AF37] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/wellness-journal/"
              onClick={() => setMenuOpen(false)}
              className="font-serif text-3xl text-[#F5F5F0]/80 hover:text-[#D4AF37] transition-colors"
            >
              Wellness Journal
            </a>
            <a
              href="/about/"
              onClick={() => setMenuOpen(false)}
              className="font-serif text-3xl text-[#F5F5F0]/80 hover:text-[#D4AF37] transition-colors"
            >
              About Us
            </a>
          </nav>

          <div className="border-t border-[#D4AF37]/20 pt-6 space-y-3">
            <p className="text-xs tracking-[0.14em] uppercase text-[#D4AF37]">
              Open Daily · 8:00 AM – 3:00 AM
            </p>
            <p className="text-xs text-[#B0AEA6] leading-relaxed">
              {B.shortAddress}
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={whatsappUrl('Hello The Elite Spa Centre, I would like to book a spa ritual in Kalyani Nagar.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#D4AF37] text-[#09090B] text-xs font-semibold tracking-wider uppercase"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
              <a
                href={`tel:${B.phone}`}
                className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full border border-[#D4AF37]/40 text-[#F5F5F0] text-xs font-semibold tracking-wider uppercase"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
