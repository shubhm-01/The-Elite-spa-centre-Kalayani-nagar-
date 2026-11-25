import React, { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
  Star,
  User,
  Users,
  Check,
  ShoppingBag,
} from 'lucide-react';
import {
  B,
  S,
  SENSORY_GALLERY,
  GUEST_REVIEWS,
  FAQS,
  FEATURED_SHOP_PRODUCTS,
  whatsappUrl,
} from '../data/catalog.js';
import { OFFERS } from '../data/offers.js';
import TiltTreatmentCard from './TiltTreatmentCard';

gsap.registerPlugin(ScrollTrigger);

const MOOD_FILTERS = [
  'All Rituals',
  'Deep Stress Relief',
  'Couples Sanctuary',
  'Express 30-Min',
  'Body & Skin Care',
] as const;

type MoodFilter = (typeof MOOD_FILTERS)[number];

const TIME_SLOTS = [
  'Today Evening',
  'Late Night (10 PM – 3 AM)',
  'Tomorrow',
] as const;

const MARQUEE_ITEMS = [
  'Signature Relaxation · ₹999',
  'Open Daily 8:00 AM – 3:00 AM',
  'Deep Tissue Restoration',
  'Couples Sanctuary · ₹1,999',
  'Volcanic Hot Stone Therapy',
  'Express Foot Reflexology · ₹699',
  'Vascon Mariplex Mall · Kalyani Nagar',
  'Pure Botanical Essential Oils',
];

export default function HomeExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const sensoryTrackRef = useRef<HTMLDivElement>(null);
  const bundlesTrackRef = useRef<HTMLDivElement>(null);
  const shopTrackRef = useRef<HTMLDivElement>(null);

  // Interactive states
  const [activeMood, setActiveMood] = useState<MoodFilter>('All Rituals');
  const [builderGuests, setBuilderGuests] = useState<'Solo' | 'Couple'>('Solo');
  const [builderDuration, setBuilderDuration] = useState<60 | 90 | 120>(60);
  const [builderTime, setBuilderTime] = useState<(typeof TIME_SLOTS)[number]>('Late Night (10 PM – 3 AM)');
  const [activeReview, setActiveReview] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [videoReady, setVideoReady] = useState(false);

  // Filtered rituals (featured 12 on All Rituals, or all matching mood rituals)
  const visibleRituals = useMemo(() => {
    if (activeMood === 'All Rituals') {
      return S.filter((item) => item.featuredOnHome).slice(0, 9);
    }
    return S.filter((item) => item.moods?.includes(activeMood)).slice(0, 9);
  }, [activeMood]);

  // Dynamic Quick Ritual Builder Pricing
  const durationOptions = useMemo(() => {
    const base = builderGuests === 'Couple' ? 1999 : 999;
    return [
      { mins: 60 as const, price: base },
      { mins: 90 as const, price: base + 400 },
      { mins: 120 as const, price: base + 800 },
    ];
  }, [builderGuests]);

  const currentBuilderPrice = useMemo(() => {
    const found = durationOptions.find((d) => d.mins === builderDuration);
    return found ? found.price : durationOptions[0].price;
  }, [durationOptions, builderDuration]);

  const ritualBuilderWhatsappHref = useMemo(() => {
    const msg = [
      'Hello The Elite Spa Centre (Kalyani Nagar),',
      'I would like to check instant availability for my custom ritual:',
      `• Guests: ${builderGuests}`,
      `• Duration: ${builderDuration} Minutes`,
      `• Preferred Time: ${builderTime}`,
      `• Ritual Rate: ₹${currentBuilderPrice.toLocaleString('en-IN')}`,
      '',
      'Please confirm the earliest available suite.'
    ].join('\n');
    return whatsappUrl(msg);
  }, [builderGuests, builderDuration, builderTime, currentBuilderPrice]);

  // GSAP ScrollTrigger Choreography
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Hero kinetic entrance
      gsap.from('.hero-reveal', {
        y: 36,
        opacity: 0,
        duration: 1.05,
        stagger: 0.12,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });

      // Subtle hero parallax depth on scroll
      gsap.to('.hero-media-layer', {
        yPercent: 16,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Section reveal choreography
      gsap.utils.toArray<HTMLElement>('.reveal-section').forEach((section) => {
        gsap.from(section, {
          y: 32,
          opacity: 0,
          duration: 0.85,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: section,
            start: 'top 84%',
            once: true,
          },
        });
      });

      // Horizontal parallax drift for Sensory Gallery strip on desktop
      if (sensoryTrackRef.current && window.innerWidth >= 1024) {
        gsap.fromTo(
          '.sensory-parallax-item',
          { y: 18 },
          {
            y: -18,
            stagger: 0.06,
            ease: 'none',
            scrollTrigger: {
              trigger: '.sensory-section',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Smooth card animation when switching Mood filter
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !cardsGridRef.current) return;
    const cards = cardsGridRef.current.querySelectorAll('.mood-card-wrapper');
    if (!cards.length) return;
    gsap.fromTo(
      cards,
      { y: 20, opacity: 0, scale: 0.98 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.45,
        stagger: 0.05,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
      }
    );
  }, [activeMood]);

  // Helper to scroll horizontal carousels cleanly
  const scrollCarousel = (ref: React.RefObject<HTMLDivElement | null>, direction: 'prev' | 'next') => {
    const el = ref.current;
    if (!el) return;
    const amount = Math.max(300, el.clientWidth * 0.72);
    el.scrollBy({
      left: direction === 'next' ? amount : -amount,
      behavior: 'smooth',
    });
  };

  return (
    <div ref={containerRef} className="bg-[#09090B] text-[#F5F5F0]">
      {/* =================================================================
          1. FULL-SCREEN CINEMATIC VIDEO HERO
      ================================================================== */}
      <section
        className="hero-section relative min-h-[100svh] flex items-center overflow-hidden pt-24 pb-20 sm:pt-28 sm:pb-24"
        aria-labelledby="hero-headline"
      >
        {/* Video & High-Res Poster Backdrop */}
        <div className="hero-media-layer absolute inset-0 z-0 overflow-hidden">
          <img
            src={B.heroPoster}
            alt="Candlelit luxury spa sanctuary at The Elite Spa Centre, Kalyani Nagar"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover scale-105 brightness-[0.55] saturate-[0.85]"
          />
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={B.heroPoster}
            onCanPlay={() => setVideoReady(true)}
            aria-hidden="true"
            className={`absolute inset-0 w-full h-full object-cover scale-105 brightness-[0.52] saturate-[0.85] transition-opacity duration-1000 ${
              videoReady ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {B.heroVideos.map((src) => (
              <source key={src} src={src} type="video/mp4" />
            ))}
          </video>
        </div>

        {/* Rich Obsidian Cinematic Vignette */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              'linear-gradient(105deg, rgba(9,9,11,0.92) 0%, rgba(9,9,11,0.68) 48%, rgba(9,9,11,0.38) 100%), linear-gradient(180deg, rgba(9,9,11,0.45) 0%, rgba(9,9,11,0.12) 45%, #09090B 100%)',
          }}
        />

        {/* Ambient Subtle Champagne Radial Glow */}
        <div
          className="absolute -left-32 top-1/3 w-[520px] h-[520px] rounded-full pointer-events-none z-[1] opacity-25 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.35), transparent 70%)' }}
        />

        {/* Hero Foreground */}
        <div className="relative z-10 max-w-[1380px] mx-auto w-full px-5 sm:px-8">
          <div className="max-w-3xl">
            {/* Live Pulsing Late-Night USP Status Badge */}
            <div className="hero-reveal inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#121215]/80 backdrop-blur-xl border border-[#D4AF37]/35 mb-7 sm:mb-9">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="live-beacon-ring absolute inline-flex h-full w-full rounded-full bg-[#D4AF37]" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4AF37]" />
              </span>
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.14em] uppercase text-[#F5F5F0]">
                OPEN DAILY • 8:00 AM – 3:00 AM <span className="text-[#D4AF37]">(LATE NIGHT SPA)</span>
              </span>
            </div>

            {/* Kinetic Editorial Headline */}
            <h1
              id="hero-headline"
              className="hero-reveal font-serif text-[clamp(3.3rem,8vw,6.8rem)] font-medium leading-[0.98] tracking-[-0.02em] text-[#F5F5F0] mb-6"
            >
              Make Space <br />
              For <em className="italic font-normal text-[#D4AF37]">Yourself.</em>
            </h1>

            {/* Confident Luxury Value Proposition */}
            <p className="hero-reveal text-base sm:text-lg text-[#F5F5F0]/80 leading-relaxed max-w-xl mb-9">
              Kalyani Nagar’s dark-sanctuary destination for restorative massage, candlelit couples suites, and botanical body rituals — open daily until 3:00 AM, starting at{' '}
              <span className="text-[#F5F5F0] font-semibold tabular-nums">₹999</span>.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="hero-reveal flex flex-wrap items-center gap-4">
              <a
                href={whatsappUrl('Hello The Elite Spa Centre, I would like to book a spa ritual at your Kalyani Nagar centre. Please share available timings.')}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-gold-pulse inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-[#D4AF37] hover:bg-[#E8CB6D] text-[#09090B] text-xs sm:text-sm font-bold tracking-[0.1em] uppercase transition-all duration-200 whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Book on WhatsApp</span>
              </a>

              <a
                href={`tel:${B.phone}`}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-[#121215]/75 hover:bg-[#1A1A1F] backdrop-blur-md border border-[#D4AF37]/35 hover:border-[#D4AF37] text-[#F5F5F0] text-xs sm:text-sm font-semibold tracking-[0.08em] uppercase transition-all duration-200 whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
                <span>Call {B.phoneDisplay}</span>
              </a>
            </div>

            {/* Quiet Sanctuary Grounding Metadata */}
            <div className="hero-reveal mt-10 pt-6 border-t border-[#F5F5F0]/12 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#B0AEA6]">
              <span className="inline-flex items-center gap-1.5 text-[#F5F5F0]/90">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
                Vascon Mariplex Mall, Kalyani Nagar, Pune
              </span>
              <span aria-hidden="true" className="hidden sm:inline text-[#D4AF37]/50">·</span>
              <span>4.9★ Rated Luxury Sanctuary</span>
              <span aria-hidden="true" className="hidden sm:inline text-[#D4AF37]/50">·</span>
              <span>60-Min Therapies From ₹999</span>
            </div>
          </div>
        </div>

        {/* Scroll Cue */}
        <a
          href="#explore-rituals"
          className="hidden sm:inline-flex items-center gap-2 absolute bottom-8 right-8 z-10 text-[11px] tracking-[0.2em] uppercase text-[#F5F5F0]/60 hover:text-[#D4AF37] transition-colors"
        >
          <span>Explore Rituals</span>
          <ChevronDown className="w-4 h-4 animate-bounce" aria-hidden="true" />
        </a>
      </section>

      {/* =================================================================
          2. EXPLORE BY MOOD + 3D TILT TREATMENT CARDS
      ================================================================== */}
      <section
        id="explore-rituals"
        className="reveal-section relative py-20 sm:py-28 max-w-[1380px] mx-auto px-5 sm:px-8"
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#D4AF37] mb-3">
              Curated Wellness Rituals
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[56px] font-medium text-[#F5F5F0] leading-[1.08]">
              Explore by <em className="italic font-normal text-[#D4AF37]">Mood.</em>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm sm:text-base text-[#B0AEA6] leading-relaxed">
              Full-body 60-minute therapies start at <span className="text-[#F5F5F0] font-medium">₹999</span> (+₹400 per extra 30 mins), Couples Sanctuary at <span className="text-[#F5F5F0] font-medium">₹1,999</span>, and Express Foot Reflexology at <span className="text-[#F5F5F0] font-medium">₹699</span>.
            </p>
          </div>
        </div>

        {/* Interactive Mood Filter Bar */}
        <div
          role="tablist"
          aria-label="Filter spa rituals by mood"
          className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-3 mb-10"
        >
          {MOOD_FILTERS.map((mood) => {
            const isActive = activeMood === mood;
            return (
              <button
                key={mood}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveMood(mood)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-[0.08em] uppercase transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#D4AF37] text-[#09090B] shadow-[0_8px_24px_-6px_rgba(212,175,55,0.5)]'
                    : 'bg-[#121215] text-[#F5F5F0]/75 border border-[#F5F5F0]/12 hover:border-[#D4AF37]/50 hover:text-[#F5F5F0]'
                }`}
              >
                {mood}
              </button>
            );
          })}
        </div>

        {/* 3D Tilt Cards Grid */}
        <div
          ref={cardsGridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7"
        >
          {visibleRituals.map((service) => (
            <div key={service.slug} className="mood-card-wrapper">
              <TiltTreatmentCard service={service} />
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="/services/"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-[#D4AF37]/35 hover:border-[#D4AF37] bg-[#121215]/70 hover:bg-[#1A1A1F] text-xs font-semibold tracking-[0.14em] uppercase text-[#F5F5F0] transition-all"
          >
            <span>Explore Full Menu of {S.length} Rituals</span>
            <ArrowRight className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
          </a>
        </div>
      </section>

      {/* =================================================================
          3. 15-SECOND INTERACTIVE "QUICK RITUAL BUILDER" WIDGET
      ================================================================== */}
      <section
        id="ritual-builder"
        className="reveal-section relative py-16 sm:py-24 max-w-[1380px] mx-auto px-5 sm:px-8"
      >
        <div className="glass-panel rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden">
          {/* Subtle decorative radial gold glow */}
          <div
            className="absolute -top-24 -right-24 w-80 h-80 rounded-full pointer-events-none opacity-25 blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.45), transparent 70%)' }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Left Controls */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#D4AF37] mb-2.5">
                  15-Second Quick Ritual Builder
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#F5F5F0] leading-tight">
                  Tailor Your <em className="italic font-normal text-[#D4AF37]">Sanctuary Session.</em>
                </h2>
                <p className="text-sm text-[#B0AEA6] mt-2">
                  Tap your preferences below to generate an instant priority booking message for our Kalyani Nagar concierge.
                </p>
              </div>

              {/* Step 1: Guests */}
              <div>
                <span className="block text-xs font-semibold tracking-[0.15em] uppercase text-[#F5F5F0]/80 mb-3">
                  01. Select Guests
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {(['Solo', 'Couple'] as const).map((option) => {
                    const active = builderGuests === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setBuilderGuests(option)}
                        className={`flex items-center justify-between px-5 py-4 rounded-xl border text-left transition-all cursor-pointer ${
                          active
                            ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#F5F5F0]'
                            : 'bg-[#09090B]/60 border-[#F5F5F0]/10 text-[#B0AEA6] hover:border-[#D4AF37]/40 hover:text-[#F5F5F0]'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          {option === 'Solo' ? (
                            <User className={`w-4 h-4 ${active ? 'text-[#D4AF37]' : 'text-[#B0AEA6]'}`} />
                          ) : (
                            <Users className={`w-4 h-4 ${active ? 'text-[#D4AF37]' : 'text-[#B0AEA6]'}`} />
                          )}
                          <span>
                            <strong className="block text-sm font-semibold">{option}</strong>
                            <span className="text-xs text-[#B0AEA6]">
                              {option === 'Solo' ? 'Private suite · 1 Guest' : 'Candlelit suite · 2 Guests'}
                            </span>
                          </span>
                        </span>
                        <span className={`w-5 h-5 rounded-full border flex items-center justify-center ${active ? 'border-[#D4AF37] bg-[#D4AF37] text-[#09090B]' : 'border-[#F5F5F0]/25'}`}>
                          {active && <Check className="w-3 h-3 stroke-[3]" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Duration */}
              <div>
                <span className="block text-xs font-semibold tracking-[0.15em] uppercase text-[#F5F5F0]/80 mb-3">
                  02. Choose Duration
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {durationOptions.map(({ mins, price }) => {
                    const active = builderDuration === mins;
                    return (
                      <button
                        key={mins}
                        type="button"
                        onClick={() => setBuilderDuration(mins)}
                        className={`px-4 py-4 rounded-xl border text-left transition-all cursor-pointer ${
                          active
                            ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#F5F5F0]'
                            : 'bg-[#09090B]/60 border-[#F5F5F0]/10 text-[#B0AEA6] hover:border-[#D4AF37]/40 hover:text-[#F5F5F0]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-semibold">{mins} Mins</span>
                          <Clock className={`w-3.5 h-3.5 ${active ? 'text-[#D4AF37]' : 'text-[#B0AEA6]/60'}`} />
                        </div>
                        <span className="font-serif text-xl font-semibold text-[#D4AF37] tabular-nums">
                          ₹{price.toLocaleString('en-IN')}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Preferred Time */}
              <div>
                <span className="block text-xs font-semibold tracking-[0.15em] uppercase text-[#F5F5F0]/80 mb-3">
                  03. Preferred Time Window
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {TIME_SLOTS.map((slot) => {
                    const active = builderTime === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setBuilderTime(slot)}
                        className={`px-4 py-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer text-center ${
                          active
                            ? 'bg-[#D4AF37] border-[#D4AF37] text-[#09090B] font-semibold'
                            : 'bg-[#09090B]/60 border-[#F5F5F0]/10 text-[#F5F5F0]/80 hover:border-[#D4AF37]/40'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Live Summary & Direct WhatsApp Trigger */}
            <div className="lg:col-span-5 flex">
              <div className="w-full rounded-2xl bg-[#09090B]/90 border border-[#D4AF37]/25 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[#F5F5F0]/10">
                    <span className="text-xs font-semibold tracking-[0.16em] uppercase text-[#D4AF37]">
                      Your Curated Summary
                    </span>
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
                  </div>

                  <dl className="divide-y divide-[#F5F5F0]/10 my-6 text-sm">
                    <div className="py-3.5 flex items-center justify-between gap-4">
                      <dt className="text-[#B0AEA6]">Suite Type</dt>
                      <dd className="font-medium text-[#F5F5F0]">
                        {builderGuests === 'Solo' ? 'Solo Private Suite' : 'Couples Candlelit Suite'}
                      </dd>
                    </div>
                    <div className="py-3.5 flex items-center justify-between gap-4">
                      <dt className="text-[#B0AEA6]">Therapy Length</dt>
                      <dd className="font-medium text-[#F5F5F0] tabular-nums">{builderDuration} Minutes</dd>
                    </div>
                    <div className="py-3.5 flex items-center justify-between gap-4">
                      <dt className="text-[#B0AEA6]">Time Window</dt>
                      <dd className="font-medium text-[#F5F5F0] text-right">{builderTime}</dd>
                    </div>
                    <div className="py-3.5 flex items-center justify-between gap-4">
                      <dt className="text-[#B0AEA6]">Location</dt>
                      <dd className="font-medium text-[#F5F5F0]">Vascon Mariplex Mall</dd>
                    </div>
                  </dl>
                </div>

                <div className="pt-5 border-t border-[#D4AF37]/20">
                  <div className="flex items-baseline justify-between mb-6">
                    <span className="text-xs tracking-[0.14em] uppercase text-[#B0AEA6]">
                      Ritual Investment
                    </span>
                    <span className="font-serif text-4xl font-semibold text-[#D4AF37] tabular-nums">
                      ₹{currentBuilderPrice.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <a
                    href={ritualBuilderWhatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-gold-pulse w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-[#D4AF37] hover:bg-[#E8CB6D] text-[#09090B] text-xs sm:text-sm font-bold tracking-[0.08em] uppercase transition-all duration-200 text-center"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Check Instant Availability on WhatsApp</span>
                  </a>

                  <p className="text-[11px] text-[#B0AEA6] text-center mt-3.5">
                    Instant concierge response · Open daily until 3:00 AM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          4. THE SENSORY GALLERY (HORIZONTAL PARALLAX STRIP)
      ================================================================== */}
      <section className="sensory-section reveal-section py-20 sm:py-28 overflow-hidden">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#D4AF37] mb-3">
              The Sensory Gallery
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-medium text-[#F5F5F0] leading-tight">
              Candlelight, Warm Oils &amp; <em className="italic font-normal text-[#D4AF37]">Stillness.</em>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollCarousel(sensoryTrackRef, 'prev')}
              className="w-11 h-11 rounded-full border border-[#D4AF37]/30 bg-[#121215] hover:border-[#D4AF37] hover:text-[#D4AF37] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Scroll sensory gallery left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollCarousel(sensoryTrackRef, 'next')}
              className="w-11 h-11 rounded-full border border-[#D4AF37]/30 bg-[#121215] hover:border-[#D4AF37] hover:text-[#D4AF37] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Scroll sensory gallery right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <a
              href="/gallery/"
              className="hidden sm:inline-flex items-center gap-1.5 ml-2 text-xs font-semibold tracking-[0.14em] uppercase text-[#D4AF37] hover:text-[#E8CB6D] transition-colors"
            >
              <span>Full Gallery</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Horizontal Parallax Strip */}
        <div
          ref={sensoryTrackRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto no-scrollbar px-5 sm:px-8 lg:px-[max(2rem,calc((100vw-1380px)/2+2rem))] pb-6 snap-x snap-mandatory"
        >
          {SENSORY_GALLERY.map((slide, idx) => (
            <figure
              key={slide.id}
              className={`sensory-parallax-item group relative shrink-0 snap-start rounded-2xl overflow-hidden border border-[#D4AF37]/20 bg-[#121215] ${
                idx % 2 === 0
                  ? 'w-[80vw] sm:w-[360px] lg:w-[400px] h-[420px] sm:h-[470px]'
                  : 'w-[80vw] sm:w-[320px] lg:w-[350px] h-[420px] sm:h-[470px]'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090B]/95 via-[#09090B]/25 to-transparent" />
              <figcaption className="absolute bottom-0 inset-x-0 p-6">
                <span className="block text-[11px] tracking-[0.18em] uppercase text-[#D4AF37] mb-1.5">
                  0{idx + 1} · Sensory Suite
                </span>
                <strong className="block font-serif text-2xl font-medium text-[#F5F5F0]">
                  {slide.title}
                </strong>
                <span className="block text-xs text-[#B0AEA6] mt-1">{slide.subtitle}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* =================================================================
          5. INFINITE MARQUEE + 4.9★ PUNE GUEST REVIEWS
      ================================================================== */}
      <section className="py-10 sm:py-16">
        {/* Magic UI Infinite Marquee Ticker */}
        <div className="relative overflow-hidden border-y border-[#D4AF37]/20 bg-[#121215]/70 py-5 mb-20">
          <div className="marquee-track">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex items-center gap-10 pr-10" aria-hidden={dup === 1}>
                {MARQUEE_ITEMS.map((item) => (
                  <span
                    key={`${dup}-${item}`}
                    className="inline-flex items-center gap-10 font-serif text-xl sm:text-2xl tracking-wide text-[#F5F5F0]/90 whitespace-nowrap"
                  >
                    <span>{item}</span>
                    <span className="text-[#D4AF37] text-sm" aria-hidden="true">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* 4.9★ Pune Guest Reviews Slider */}
        <div className="reveal-section max-w-[1380px] mx-auto px-5 sm:px-8">
          <div className="glass-panel rounded-3xl p-7 sm:p-11 lg:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-4 space-y-4">
                <div className="inline-flex items-center gap-1.5 text-[#D4AF37]">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" aria-hidden="true" />
                  ))}
                  <span className="ml-2 text-xs font-semibold tracking-[0.14em] uppercase text-[#F5F5F0] tabular-nums">
                    4.9 / 5.0 Rating
                  </span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-medium text-[#F5F5F0] leading-[1.1]">
                  Loved Across <em className="italic font-normal text-[#D4AF37]">Pune.</em>
                </h2>
                <p className="text-sm text-[#B0AEA6] leading-relaxed">
                  From late-night business travelers landing at Pune Airport to couples celebrating quiet evenings in Kalyani Nagar.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveReview((prev) => (prev === 0 ? GUEST_REVIEWS.length - 1 : prev - 1))
                    }
                    className="w-11 h-11 rounded-full border border-[#D4AF37]/30 hover:border-[#D4AF37] bg-[#09090B]/70 text-[#F5F5F0] hover:text-[#D4AF37] flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Previous guest review"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveReview((prev) => (prev === GUEST_REVIEWS.length - 1 ? 0 : prev + 1))
                    }
                    className="w-11 h-11 rounded-full border border-[#D4AF37]/30 hover:border-[#D4AF37] bg-[#09090B]/70 text-[#F5F5F0] hover:text-[#D4AF37] flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Next guest review"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <span className="text-xs text-[#B0AEA6] ml-2 tabular-nums">
                    0{activeReview + 1} / 0{GUEST_REVIEWS.length}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-8">
                <blockquote className="rounded-2xl bg-[#09090B]/75 border border-[#F5F5F0]/8 p-7 sm:p-10">
                  <p className="font-serif text-2xl sm:text-3xl text-[#F5F5F0] leading-snug mb-8">
                    “{GUEST_REVIEWS[activeReview].quote}”
                  </p>
                  <footer className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-[#F5F5F0]/10">
                    <div>
                      <strong className="block text-sm font-semibold text-[#F5F5F0]">
                        {GUEST_REVIEWS[activeReview].name}
                      </strong>
                      <span className="text-xs text-[#B0AEA6]">
                        {GUEST_REVIEWS[activeReview].location} · {GUEST_REVIEWS[activeReview].ritual}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {GUEST_REVIEWS.map((rev, idx) => (
                        <button
                          key={rev.name}
                          type="button"
                          onClick={() => setActiveReview(idx)}
                          aria-label={`Read review by ${rev.name}`}
                          className={`h-1.5 rounded-full transition-all cursor-pointer ${
                            idx === activeReview ? 'w-7 bg-[#D4AF37]' : 'w-2 bg-[#F5F5F0]/25 hover:bg-[#F5F5F0]/50'
                          }`}
                        />
                      ))}
                    </div>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          6A. CURATED BUNDLES CAROUSEL (SINGLE UNIFIED OFFERS SLIDER)
      ================================================================== */}
      <section id="curated-bundles" className="reveal-section py-20 sm:py-24">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#D4AF37] mb-3">
              The Elite Privilege
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-medium text-[#F5F5F0] leading-tight">
              Curated <em className="italic font-normal text-[#D4AF37]">Ritual Bundles.</em>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollCarousel(bundlesTrackRef, 'prev')}
              className="w-11 h-11 rounded-full border border-[#D4AF37]/30 bg-[#121215] hover:border-[#D4AF37] hover:text-[#D4AF37] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Previous curated bundle"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollCarousel(bundlesTrackRef, 'next')}
              className="w-11 h-11 rounded-full border border-[#D4AF37]/30 bg-[#121215] hover:border-[#D4AF37] hover:text-[#D4AF37] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Next curated bundle"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <a
              href="/offers/"
              className="hidden sm:inline-flex items-center gap-1.5 ml-2 text-xs font-semibold tracking-[0.14em] uppercase text-[#D4AF37] hover:text-[#E8CB6D] transition-colors"
            >
              <span>All Bundles</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div
          ref={bundlesTrackRef}
          className="flex gap-6 overflow-x-auto no-scrollbar px-5 sm:px-8 lg:px-[max(2rem,calc((100vw-1380px)/2+2rem))] pb-4 snap-x snap-mandatory"
        >
          {OFFERS.map((offer) => {
            const msg = `Hello The Elite Spa Centre, I would like to book ${offer.title} (${offer.code}) at ₹${offer.offerPrice.toLocaleString('en-IN')}. Included: ${offer.items.join(' + ')}.`;
            return (
              <article
                key={offer.id}
                className="group shrink-0 snap-start w-[86vw] sm:w-[400px] lg:w-[420px] rounded-2xl bg-[#121215] border border-[#D4AF37]/25 overflow-hidden flex flex-col justify-between transition-colors hover:border-[#D4AF37]/60"
              >
                <div className="relative h-56 overflow-hidden bg-[#1A1A1F]">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-[#121215]/30 to-transparent" />
                  <span className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-[#D4AF37] text-[#09090B] text-[11px] font-bold tracking-wider uppercase tabular-nums">
                    Save ₹{offer.savings.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#D4AF37] mb-1.5">
                    {offer.eyebrow}
                  </span>
                  <h3 className="font-serif text-3xl font-medium text-[#F5F5F0] mb-2">
                    {offer.title}
                  </h3>
                  <p className="text-sm text-[#B0AEA6] leading-relaxed mb-4">
                    {offer.description}
                  </p>

                  <ul className="space-y-2 mb-6 text-xs text-[#F5F5F0]/85">
                    {offer.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-4 border-t border-[#F5F5F0]/10 flex items-center justify-between gap-4">
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-serif text-3xl font-semibold text-[#F5F5F0] tabular-nums">
                        ₹{offer.offerPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-sm text-[#B0AEA6] line-through tabular-nums">
                        ₹{offer.regularPrice.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <a
                      href={whatsappUrl(msg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D4AF37] hover:bg-[#E8CB6D] text-[#09090B] text-xs font-bold tracking-wider uppercase transition-colors whitespace-nowrap"
                    >
                      <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Book Bundle</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* =================================================================
          6B. WELLNESS SHOP PRODUCT CAROUSEL (SINGLE UNIFIED SHOP SLIDER)
      ================================================================== */}
      <section id="wellness-shop" className="reveal-section py-16 sm:py-24">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#D4AF37] mb-3">
              The Elite Apothecary
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-medium text-[#F5F5F0] leading-tight">
              Bring the Ritual <em className="italic font-normal text-[#D4AF37]">Home.</em>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollCarousel(shopTrackRef, 'prev')}
              className="w-11 h-11 rounded-full border border-[#D4AF37]/30 bg-[#121215] hover:border-[#D4AF37] hover:text-[#D4AF37] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Scroll wellness shop left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollCarousel(shopTrackRef, 'next')}
              className="w-11 h-11 rounded-full border border-[#D4AF37]/30 bg-[#121215] hover:border-[#D4AF37] hover:text-[#D4AF37] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Scroll wellness shop right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <a
              href="/shop/"
              className="hidden sm:inline-flex items-center gap-1.5 ml-2 text-xs font-semibold tracking-[0.14em] uppercase text-[#D4AF37] hover:text-[#E8CB6D] transition-colors"
            >
              <span>Shop All 49 Essentials</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div
          ref={shopTrackRef}
          className="flex gap-5 overflow-x-auto no-scrollbar px-5 sm:px-8 lg:px-[max(2rem,calc((100vw-1380px)/2+2rem))] pb-4 snap-x snap-mandatory"
        >
          {FEATURED_SHOP_PRODUCTS.map((product) => {
            const orderMsg = `Hello The Elite Spa Centre, I would like to order "${product.name}" (₹${product.price.toLocaleString('en-IN')}) from The Elite Wellness Shop.`;
            return (
              <article
                key={product.id}
                className="group shrink-0 snap-start w-[76vw] sm:w-[290px] lg:w-[305px] rounded-2xl bg-[#121215] border border-[#F5F5F0]/10 hover:border-[#D4AF37]/45 overflow-hidden flex flex-col justify-between transition-all duration-300"
              >
                <div className="relative h-56 overflow-hidden bg-[#1A1A1F]">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-transparent to-transparent" />
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <span className="text-[11px] tracking-[0.14em] uppercase text-[#D4AF37]/90 mb-1">
                    {product.category}
                  </span>
                  <h3 className="font-serif text-xl font-medium text-[#F5F5F0] leading-snug mb-4">
                    {product.name}
                  </h3>

                  <div className="mt-auto pt-4 border-t border-[#F5F5F0]/10 flex items-center justify-between gap-2">
                    <span className="font-serif text-2xl font-semibold text-[#F5F5F0] tabular-nums">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>

                    <a
                      href={whatsappUrl(orderMsg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/10 hover:bg-[#D4AF37] text-[#E8CB6D] hover:text-[#09090B] text-[11px] font-semibold tracking-wider uppercase transition-all whitespace-nowrap"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Order</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center sm:hidden px-5">
          <a
            href="/shop/"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase text-[#D4AF37]"
          >
            <span>Explore Full Wellness Shop</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* =================================================================
          7. KALYANI NAGAR LOCATION CARD + DARK GOOGLE MAP + ACCORDION FAQ
      ================================================================== */}
      <section
        id="location"
        className="reveal-section py-20 sm:py-28 max-w-[1380px] mx-auto px-5 sm:px-8"
      >
        <div className="mb-12">
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#D4AF37] mb-3">
            Visit The Sanctuary
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-medium text-[#F5F5F0] leading-tight">
            Find Us in <em className="italic font-normal text-[#D4AF37]">Kalyani Nagar.</em>
          </h2>
        </div>

        {/* Location Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch mb-20">
          {/* Dark Luxury Location Card */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-7 sm:p-9 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold tracking-[0.16em] uppercase text-[#D4AF37]">
                  The Elite Spa Centre · Pune
                </span>
                <h3 className="font-serif text-3xl font-medium text-[#F5F5F0] mt-2">
                  Vascon Mariplex Mall
                </h3>
              </div>

              <div className="space-y-4 text-sm text-[#B0AEA6]">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="leading-relaxed text-[#F5F5F0]/85">{B.address}</p>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-[#F5F5F0]">Open Daily · 8:00 AM – 3:00 AM</p>
                    <p className="text-xs text-[#B0AEA6] mt-0.5">
                      Late-night sanctuary slots &amp; complimentary mall parking available.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <a
                      href={`tel:${B.phone}`}
                      className="font-semibold text-[#F5F5F0] hover:text-[#D4AF37] transition-colors"
                    >
                      {B.phoneDisplay}
                    </a>
                    <p className="text-xs text-[#B0AEA6] mt-0.5">Direct Call &amp; Instant WhatsApp Concierge</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-[#F5F5F0]/10 flex flex-col sm:flex-row gap-3">
              <a
                href={B.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-[#D4AF37] hover:bg-[#E8CB6D] text-[#09090B] text-xs font-bold tracking-[0.1em] uppercase transition-colors whitespace-nowrap"
              >
                <MapPin className="w-4 h-4" aria-hidden="true" />
                <span>Get Directions</span>
              </a>
              <a
                href={whatsappUrl('Hello The Elite Spa Centre, please share directions and available timings for today at Vascon Mariplex Mall.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border border-[#D4AF37]/35 hover:border-[#D4AF37] text-[#F5F5F0] text-xs font-semibold tracking-[0.1em] uppercase transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Styled Dark Google Maps Embed */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-[#D4AF37]/25 bg-[#121215] min-h-[360px] lg:min-h-full relative">
            <iframe
              title="The Elite Spa Centre at Vascon Mariplex Mall, Kalyani Nagar, Pune"
              src={`https://www.google.com/maps?q=Vascon+Mariplex+Mall,+Cybage+Tower+Road,+Kalyani+Nagar,+Pune+411014&z=16&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="dark-map-frame w-full h-full min-h-[360px] border-0"
            />
          </div>
        </div>

        {/* Clean Expandable Accordion FAQ */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#D4AF37] mb-3">
              Good To Know
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#F5F5F0]">
              Frequently Asked <em className="italic font-normal text-[#D4AF37]">Questions.</em>
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.question}
                  className={`rounded-2xl border transition-colors ${
                    isOpen
                      ? 'bg-[#121215] border-[#D4AF37]/40'
                      : 'bg-[#121215]/60 border-[#F5F5F0]/10 hover:border-[#D4AF37]/25'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                  >
                    <span className="font-serif text-xl sm:text-2xl font-medium text-[#F5F5F0]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#D4AF37] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-sm sm:text-base text-[#B0AEA6] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
