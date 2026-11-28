import React, { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  Award,
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  Flame,
  Lock,
  MapPin,
  MessageCircle,
  Moon,
  Phone,
  Plus,
  ShieldCheck,
  Sparkles,
  Star,
  X,
} from 'lucide-react';
import {
  B,
  FAQS,
  GUEST_REVIEWS,
  P,
  S,
  SANCTUARY_PROMISE,
  SENSORY_GALLERY,
  whatsappUrl,
} from '../data/catalog.js';
import { OFFERS } from '../data/offers.js';
import TiltTreatmentCard from './TiltTreatmentCard';
import RitualBuilder from './RitualBuilder';

gsap.registerPlugin(ScrollTrigger);

const MOOD_FILTERS = [
  'All Rituals',
  'Deep Stress Relief',
  'Couples Sanctuary',
  'Express 30-Min',
  'Body & Skin Care',
] as const;

type MoodFilter = (typeof MOOD_FILTERS)[number];

const TRUST_PILLARS = [
  { label: '4.9★ Google Rated', icon: Star },
  { label: 'Open till 3:00 AM', icon: Moon },
  { label: 'Private Candlelit Suites', icon: Flame },
  { label: 'Free Mall Parking', icon: Car },
];

const MARQUEE_ITEMS = [
  'Signature Relaxation • ₹999',
  'Open Daily 8:00 AM – 3:00 AM',
  'Couples Sanctuary • ₹1,999',
  'Deep Tissue Restoration',
  'Express Foot Reflexology • ₹699',
  'Vascon Mariplex Mall • Kalyani Nagar',
];

function GoogleGMark() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.3h6.45a5.52 5.52 0 0 1-2.39 3.62v3h3.87c2.26-2.08 3.56-5.15 3.56-8.65z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.07 7.93-2.91l-3.87-3c-1.07.72-2.45 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.95H1.29v3.1A12 12 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.29 14.29A7.2 7.2 0 0 1 4.91 12c0-.79.14-1.57.38-2.29V6.61H1.29A12 12 0 0 0 0 12c0 1.94.46 3.77 1.29 5.39l4-3.1z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.34.61 4.58 1.8l3.43-3.43C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.29 6.61l4 3.1C6.23 6.88 8.88 4.77 12 4.77z"
      />
    </svg>
  );
}

function AnimatedRatingNumber({ target = 4.9 }: { target?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [display, setDisplay] = useState('4.9');

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(target.toFixed(1));
      return;
    }

    const start = 3.8;
    const duration = 900;
    const startTime = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (target - start) * eased;
      setDisplay(current.toFixed(1));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [inView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}

function PromiseIcon({ type }: { type: string }) {
  switch (type) {
    case 'sparkles':
      return <Sparkles className="w-6 h-6 text-[#E5C158]" strokeWidth={1.35} aria-hidden="true" />;
    case 'award':
      return <Award className="w-6 h-6 text-[#E5C158]" strokeWidth={1.35} aria-hidden="true" />;
    case 'shield':
      return <ShieldCheck className="w-6 h-6 text-[#E5C158]" strokeWidth={1.35} aria-hidden="true" />;
    default:
      return <Lock className="w-6 h-6 text-[#E5C158]" strokeWidth={1.35} aria-hidden="true" />;
  }
}

export default function HomeExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sensoryTrackRef = useRef<HTMLDivElement>(null);

  const [isDesktop, setIsDesktop] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const [activeMood, setActiveMood] = useState<MoodFilter>('All Rituals');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMood, setDrawerMood] = useState<MoodFilter>('All Rituals');

  const [activeSlide, setActiveSlide] = useState(0);
  const [activeReview, setActiveReview] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Mount background <video> strictly on desktop (>= 768px) to save mobile bandwidth & battery
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Show 6 best-selling editorial cards initially
  const visibleRituals = useMemo(() => {
    if (activeMood === 'All Rituals') {
      return S.filter((item) => item.featuredOnHome).slice(0, 6);
    }
    return S.filter((item) => item.moods?.includes(activeMood)).slice(0, 6);
  }, [activeMood]);

  // All 26 rituals inside expandable drawer
  const drawerRituals = useMemo(() => {
    if (drawerMood === 'All Rituals') return S;
    return S.filter((item) => item.moods?.includes(drawerMood));
  }, [drawerMood]);

  // Top 3 curated bundles: Everyday Reset, Couple Retreat, Glow Ritual
  const featuredBundles = useMemo(() => OFFERS.slice(0, 3), []);

  // Lock body scroll when full menu drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  // GSAP subtle desktop hero parallax (transform only, GPU-accelerated)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!containerRef.current || window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      gsap.to('.hero-media-layer', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Track active centered slide inside horizontal snap-scroll Sensory Gallery
  const handleSensoryScroll = () => {
    const track = sensoryTrackRef.current;
    if (!track) return;
    const slides = Array.from(track.querySelectorAll<HTMLElement>('[data-sensory-slide]'));
    if (!slides.length) return;

    const trackRect = track.getBoundingClientRect();
    const center = trackRect.left + trackRect.width / 2;

    let closestIdx = 0;
    let closestDist = Number.POSITIVE_INFINITY;

    slides.forEach((slide, idx) => {
      const rect = slide.getBoundingClientRect();
      const slideCenter = rect.left + rect.width / 2;
      const dist = Math.abs(slideCenter - center);
      if (dist < closestDist) {
        closestDist = dist;
        closestIdx = idx;
      }
    });

    setActiveSlide(closestIdx);
  };

  const scrollToSensorySlide = (index: number) => {
    const track = sensoryTrackRef.current;
    if (!track) return;
    const clamped = (index + SENSORY_GALLERY.length) % SENSORY_GALLERY.length;
    const target = track.querySelectorAll<HTMLElement>('[data-sensory-slide]')[clamped];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      setActiveSlide(clamped);
    }
  };

  return (
    <div ref={containerRef} className="bg-[#0B0A09] text-[#F4EFE6]">
      {/* =================================================================
          1. CLEAN 4-ELEMENT LUXURY HERO SECTION (ABOVE THE FOLD)
      ================================================================== */}
      <section
        className="hero-section relative min-h-[88svh] sm:min-h-[96svh] flex items-center overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-24"
        aria-labelledby="hero-headline"
      >
        {/* Background Media Layer: High-Priority Poster + Ken Burns + Desktop-Only Video */}
        <div className="hero-media-layer absolute inset-0 z-0 overflow-hidden">
          <img
            src={B.heroPoster}
            alt="Candlelit luxury spa sanctuary at The Elite Spa Centre, Kalyani Nagar"
            fetchPriority="high"
            referrerPolicy="no-referrer"
            className="hero-ken-burns w-full h-full object-cover brightness-[0.52] saturate-[0.88]"
          />
          {isDesktop && (
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={B.heroPoster}
              onCanPlay={() => setVideoReady(true)}
              aria-hidden="true"
              className={`absolute inset-0 w-full h-full object-cover brightness-[0.46] saturate-[0.88] transition-opacity duration-1000 ${
                videoReady ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {B.heroVideos.map((src) => (
                <source key={src} src={src} type="video/mp4" />
              ))}
            </video>
          )}
        </div>

        {/* Aceternity-Style Soft Golden Radial Spotlight + Deep Obsidian Vignette */}
        <div className="hero-spotlight absolute inset-0 z-[1] pointer-events-none" />
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              'linear-gradient(102deg, rgba(11,10,9,0.9) 0%, rgba(11,10,9,0.62) 52%, rgba(11,10,9,0.34) 100%), linear-gradient(180deg, rgba(11,10,9,0.38) 0%, rgba(11,10,9,0.12) 48%, #0B0A09 100%)',
          }}
        />

        {/* Hero Foreground — Strictly 4 Clean Breathable Elements */}
        <div className="relative z-10 max-w-[1380px] mx-auto w-full px-5 sm:px-8">
          <div className="max-w-3xl">
            {/* Element 1: Concise Top Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#161412]/84 backdrop-blur-xl border border-[#D4AF7A]/38 mb-7"
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="live-beacon-ring absolute inline-flex h-full w-full rounded-full bg-[#E5C158]" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E5C158]" />
              </span>
              <span className="text-[15px] font-medium text-[#F4EFE6]">
                Kalyani Nagar, Pune <span className="text-[#E5C158] font-semibold">• Open Daily till 3:00 AM</span>
              </span>
            </motion.div>

            {/* Element 2: Editorial Serif Main Headline (Blur-Fade Up 0.8s + Shiny Gold Accent) */}
            <motion.h1
              id="hero-headline"
              initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-[46px] sm:text-[60px] lg:text-[72px] font-medium leading-[1.03] tracking-[-0.015em] text-[#F4EFE6] mb-6"
            >
              Make Space For <em className="italic font-normal shiny-gold-text">Yourself.</em>
            </motion.h1>

            {/* Element 3: Clean 1-Line Sans-Serif Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="text-[18px] sm:text-[20px] text-[#F4EFE6]/92 leading-[1.6] max-w-2xl mb-10"
            >
              Candlelit private suites, botanical therapies &amp; late-night calm — starting at{' '}
              <strong className="text-[#E5C158] font-bold tabular-nums">₹999</strong>.
            </motion.p>

            {/* Element 4: Two Clear Buttons (Shimmer Gold WhatsApp + Subtle Outline Call Now) */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href={whatsappUrl('Hello The Elite Spa Centre, I would like to book a spa ritual at your Kalyani Nagar sanctuary.')}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-shimmer min-h-[56px] inline-flex items-center justify-center gap-2.5 py-4 px-8 rounded-full bg-[#E5C158] hover:bg-[#F0D58C] active:scale-[0.98] text-[#0B0A09] text-[16px] sm:text-[17px] font-semibold transition-all duration-200 whitespace-nowrap shadow-[0_12px_36px_rgba(229,193,88,0.28)]"
              >
                <MessageCircle className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
                <span>Book on WhatsApp</span>
              </a>

              <a
                href={`tel:${B.phone}`}
                className="min-h-[56px] inline-flex items-center justify-center gap-2.5 py-4 px-8 rounded-full bg-transparent hover:bg-[#161412]/75 active:scale-[0.98] backdrop-blur-md border border-[#D4AF7A]/50 hover:border-[#E5C158] text-[#F4EFE6] text-[16px] sm:text-[17px] font-semibold transition-all duration-200 whitespace-nowrap"
              >
                <Phone className="w-5 h-5 text-[#E5C158]" strokeWidth={1.5} aria-hidden="true" />
                <span>Call Now</span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =================================================================
          2. TRUST STRIP (4 THIN-STROKE LUXURY CREDENTIALS)
      ================================================================== */}
      <section
        aria-label="Sanctuary highlights"
        className="border-y border-[#D4AF7A]/20 bg-[#161412]/72 backdrop-blur-md"
      >
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 py-6">
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {TRUST_PILLARS.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="flex items-center justify-start lg:justify-center gap-3.5 text-[#F4EFE6]"
              >
                <span className="w-10 h-10 rounded-full border border-[#D4AF7A]/30 bg-[#0B0A09]/70 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#E5C158]" strokeWidth={1.35} aria-hidden="true" />
                </span>
                <span className="text-[15px] sm:text-[16px] font-medium text-[#F4EFE6] leading-snug">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* =================================================================
          3. SIGNATURE RITUALS (6 BEST-SELLING CARDS + FULL MENU DRAWER)
      ================================================================== */}
      <section
        id="explore-rituals"
        aria-labelledby="signature-rituals-heading"
        className="py-20 sm:py-28 max-w-[1380px] mx-auto px-5 sm:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10"
        >
          <div>
            <p className="text-[15px] font-semibold tracking-[0.06em] uppercase text-[#D4AF7A] mb-3">
              Curated Sanctuary Menu
            </p>
            <h2
              id="signature-rituals-heading"
              className="font-serif text-[34px] sm:text-[42px] lg:text-[48px] font-medium text-[#F4EFE6] leading-[1.12] mb-3"
            >
              Signature <em className="italic font-normal text-[#E5C158]">Rituals.</em>
            </h2>
            <p className="text-[17px] sm:text-[18px] text-[#F4EFE6]/90 leading-[1.6] max-w-2xl">
              Unhurried full-body bodywork, candlelit couples retreats, and targeted relief tailored to your mood.
            </p>
          </div>
        </motion.div>

        {/* Interactive Mood Filter Tabs with Smooth Sliding Pill */}
        <div
          role="tablist"
          aria-label="Filter rituals by mood"
          className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-4 mb-10"
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
                className="relative min-h-[48px] py-3 px-6 rounded-full text-[16px] font-semibold whitespace-nowrap shrink-0 active:scale-[0.98] transition-transform cursor-pointer"
              >
                {isActive ? (
                  <motion.span
                    layoutId="ritual-mood-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-[#E5C158]"
                  />
                ) : (
                  <span className="absolute inset-0 rounded-full bg-[#161412] border border-[#F4EFE6]/16" />
                )}
                <span
                  className={`relative z-10 transition-colors ${
                    isActive ? 'text-[#0B0A09]' : 'text-[#F4EFE6]'
                  }`}
                >
                  {mood}
                </span>
              </button>
            );
          })}
        </div>

        {/* 6 Best-Selling Cards with Staggered Reveal (once: true, 0.08s stagger) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
          {visibleRituals.map((service, index) => (
            <motion.div
              key={`${activeMood}-${service.slug}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.55,
                delay: Math.min(index * 0.08, 0.35),
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <TiltTreatmentCard service={service} />
            </motion.div>
          ))}
        </div>

        {/* Explore Full Menu (26 Rituals) Drawer Trigger */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            data-testid="explore-full-menu-btn"
            onClick={() => {
              setDrawerMood(activeMood);
              setDrawerOpen(true);
            }}
            className="min-h-[54px] inline-flex items-center justify-center gap-2.5 py-4 px-8 rounded-full border border-[#D4AF7A]/55 hover:border-[#E5C158] bg-[#161412] hover:bg-[#1F1C19] active:scale-[0.98] text-[16px] sm:text-[17px] font-semibold text-[#F4EFE6] transition-all cursor-pointer"
          >
            <span>Explore Full Menu ({S.length} Rituals)</span>
            <ArrowRight className="w-5 h-5 text-[#E5C158]" strokeWidth={1.6} aria-hidden="true" />
          </button>
        </div>
      </section>

      {/* =================================================================
          4. 15-SECOND QUICK RITUAL BUILDER (MID-PAGE HIGHLIGHT)
      ================================================================== */}
      <RitualBuilder />

      {/* =================================================================
          5. THE SANCTUARY PROMISE (4-PILLAR SAFETY, HYGIENE & PRIVACY)
      ================================================================== */}
      <section
        id="sanctuary-promise"
        aria-labelledby="sanctuary-promise-heading"
        className="py-20 sm:py-28 max-w-[1380px] mx-auto px-5 sm:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-12"
        >
          <p className="text-[15px] font-semibold tracking-[0.06em] uppercase text-[#D4AF7A] mb-3">
            The Sanctuary Promise
          </p>
          <h2
            id="sanctuary-promise-heading"
            className="font-serif text-[34px] sm:text-[42px] lg:text-[48px] font-medium text-[#F4EFE6] leading-[1.12] mb-3"
          >
            Unwavering Hygiene, Safety &amp; <em className="italic font-normal text-[#E5C158]">Privacy.</em>
          </h2>
          <p className="text-[17px] sm:text-[18px] text-[#F4EFE6]/90 leading-[1.6]">
            Whether you arrive after midday meetings or past midnight, every detail is thoughtfully upheld for complete peace of mind.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {SANCTUARY_PROMISE.map((pillar, idx) => (
            <motion.article
              key={pillar.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel card-hover-glow rounded-3xl p-7 flex flex-col gap-5 transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#0B0A09]/85 border border-[#D4AF7A]/35 flex items-center justify-center shrink-0">
                <PromiseIcon type={pillar.icon} />
              </div>
              <div className="space-y-2.5">
                <h3 className="font-serif text-[25px] font-medium text-[#F4EFE6] leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-[16px] sm:text-[17px] text-[#F4EFE6]/88 leading-[1.6]">
                  {pillar.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* =================================================================
          6. SENSORY GALLERY (SNAP-SCROLL FOCUS CAROUSEL + UNIQUE TAGS)
      ================================================================== */}
      <section
        aria-labelledby="sensory-gallery-heading"
        className="py-20 sm:py-28 overflow-hidden"
      >
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-[15px] font-semibold tracking-[0.06em] uppercase text-[#D4AF7A] mb-3">
              Inside Vascon Mariplex Mall
            </p>
            <h2
              id="sensory-gallery-heading"
              className="font-serif text-[34px] sm:text-[42px] lg:text-[48px] font-medium text-[#F4EFE6] leading-[1.12]"
            >
              The Sensory <em className="italic font-normal text-[#E5C158]">Gallery.</em>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollToSensorySlide(activeSlide - 1)}
              className="w-12 h-12 rounded-full border border-[#D4AF7A]/40 bg-[#161412] hover:border-[#E5C158] active:scale-[0.95] text-[#F4EFE6] hover:text-[#E5C158] flex items-center justify-center transition-all cursor-pointer"
              aria-label="Previous sanctuary image"
            >
              <ChevronLeft className="w-6 h-6" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => scrollToSensorySlide(activeSlide + 1)}
              className="w-12 h-12 rounded-full border border-[#D4AF7A]/40 bg-[#161412] hover:border-[#E5C158] active:scale-[0.95] text-[#F4EFE6] hover:text-[#E5C158] flex items-center justify-center transition-all cursor-pointer"
              aria-label="Next sanctuary image"
            >
              <ChevronRight className="w-6 h-6" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Horizontal Snap-Scroll Track: Centered Slide Bright & Full-Scale, Side Slides Gently Dimmed */}
        <div
          ref={sensoryTrackRef}
          onScroll={handleSensoryScroll}
          className="flex gap-6 overflow-x-auto no-scrollbar px-5 sm:px-8 lg:px-[max(2rem,calc((100vw-1380px)/2+2rem))] pb-6 snap-x snap-mandatory"
        >
          {SENSORY_GALLERY.map((slide, idx) => {
            const isCentered = idx === activeSlide;
            return (
              <figure
                key={slide.id}
                data-sensory-slide={idx}
                onClick={() => scrollToSensorySlide(idx)}
                className={`card-hover-zoom group relative shrink-0 snap-center rounded-3xl overflow-hidden border bg-[#161412] w-[86vw] sm:w-[490px] lg:w-[580px] h-[420px] sm:h-[500px] transition-all duration-500 cursor-pointer ${
                  isCentered
                    ? 'border-[#E5C158]/55 opacity-100 scale-100 shadow-[0_24px_56px_rgba(0,0,0,0.55)]'
                    : 'border-[#D4AF7A]/20 opacity-75 lg:opacity-65 lg:scale-[0.96]'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09]/92 via-[#0B0A09]/22 to-transparent" />
                <figcaption className="absolute bottom-0 inset-x-0 p-7 sm:p-8 space-y-2">
                  <span className="inline-block text-[15px] font-semibold tracking-[0.04em] text-[#E5C158]">
                    {slide.categoryTag}
                  </span>
                  <strong className="block font-serif text-[26px] sm:text-[30px] font-medium text-[#F4EFE6] leading-tight">
                    {slide.title}
                  </strong>
                </figcaption>
              </figure>
            );
          })}
        </div>

        {/* Slide Indicator Dots */}
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 mt-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {SENSORY_GALLERY.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => scrollToSensorySlide(idx)}
                aria-label={`View ${slide.title}`}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  idx === activeSlide
                    ? 'w-9 bg-[#E5C158]'
                    : 'w-2.5 bg-[#F4EFE6]/30 hover:bg-[#F4EFE6]/60'
                }`}
              />
            ))}
          </div>
          <a
            href="/gallery/"
            className="inline-flex items-center gap-2 text-[16px] font-semibold text-[#E5C158] hover:text-[#F0D58C] whitespace-nowrap"
          >
            <span>Open Full Gallery</span>
            <ArrowRight className="w-5 h-5" strokeWidth={1.6} aria-hidden="true" />
          </a>
        </div>
      </section>

      {/* =================================================================
          7. CURATED BUNDLES (TOP 3 + TRANSPARENT PRICE BREAK-UP)
      ================================================================== */}
      <section
        id="curated-bundles"
        aria-labelledby="curated-bundles-heading"
        className="py-20 sm:py-28 max-w-[1380px] mx-auto px-5 sm:px-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[15px] font-semibold tracking-[0.06em] uppercase text-[#D4AF7A] mb-3">
              Transparent Privilege Pricing
            </p>
            <h2
              id="curated-bundles-heading"
              className="font-serif text-[34px] sm:text-[42px] lg:text-[48px] font-medium text-[#F4EFE6] leading-[1.12] mb-3"
            >
              Curated <em className="italic font-normal text-[#E5C158]">Ritual Bundles.</em>
            </h2>
            <p className="text-[17px] sm:text-[18px] text-[#F4EFE6]/90 leading-[1.6]">
              Our three signature pairings with clear, itemized savings on every visit.
            </p>
          </div>
          <a
            href="/offers/"
            className="inline-flex items-center gap-2 text-[16px] font-semibold text-[#E5C158] hover:text-[#F0D58C] whitespace-nowrap"
          >
            <span>View All Bundles</span>
            <ArrowRight className="w-5 h-5" strokeWidth={1.6} aria-hidden="true" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredBundles.map((offer, idx) => {
            const msg = `Hello The Elite Spa Centre, I would like to book ${offer.title} (${offer.code}) at ₹${offer.offerPrice.toLocaleString('en-IN')}. Included: ${offer.items.join(' + ')}.`;
            return (
              <motion.article
                key={offer.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="card-hover-zoom card-hover-glow rounded-3xl bg-[#161412] border border-[#D4AF7A]/24 overflow-hidden flex flex-col justify-between transition-colors"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#1F1C19]">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161412] via-transparent to-transparent" />
                  <span className="absolute top-5 right-5 py-2 px-4 rounded-full bg-[#E5C158] text-[#0B0A09] text-[15px] font-bold tabular-nums">
                    Save ₹{offer.savings.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="p-7 flex flex-col flex-1 justify-between gap-6">
                  <div className="space-y-4">
                    <h3 className="font-serif text-[26px] sm:text-[28px] font-medium text-[#F4EFE6] leading-tight">
                      {offer.title}
                    </h3>

                    <ul className="space-y-3 text-[16px] sm:text-[17px] text-[#F4EFE6]/90 leading-[1.5]">
                      {offer.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-[#E5C158] shrink-0 mt-0.5" strokeWidth={2} aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Transparent Arithmetic Break-Up Pill */}
                    <div className="rounded-2xl bg-[#0B0A09]/85 border border-[#D4AF7A]/28 px-4 py-3 text-[15px] font-medium text-[#F4EFE6] tabular-nums">
                      {offer.priceBreakup}
                    </div>
                  </div>

                  <div className="pt-5 border-t border-[#F4EFE6]/12 space-y-5">
                    <div className="flex items-baseline gap-3">
                      <strong className="text-[26px] font-bold text-[#E5C158] tabular-nums">
                        ₹{offer.offerPrice.toLocaleString('en-IN')}
                      </strong>
                      <span className="text-[17px] text-[#F4EFE6]/65 line-through tabular-nums">
                        ₹{offer.regularPrice.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <a
                      href={whatsappUrl(msg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[52px] w-full inline-flex items-center justify-center gap-2 py-3.5 px-7 rounded-full bg-[#E5C158] hover:bg-[#F0D58C] active:scale-[0.98] text-[#0B0A09] text-[16px] sm:text-[17px] font-semibold transition-all"
                    >
                      <span>Book Bundle on WhatsApp</span>
                      <ArrowRight className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* =================================================================
          8. COMPACT APOTHECARY SHOP BANNER (EDITORIAL CONVERSION FOCUS)
      ================================================================== */}
      <section
        id="wellness-shop"
        aria-labelledby="apothecary-banner-heading"
        className="py-12 sm:py-20 max-w-[1380px] mx-auto px-5 sm:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden border border-[#D4AF7A]/28 bg-[#161412]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-center gap-6">
              <p className="text-[15px] font-semibold tracking-[0.06em] uppercase text-[#D4AF7A]">
                The Wellness Apothecary
              </p>
              <h2
                id="apothecary-banner-heading"
                className="font-serif text-[32px] sm:text-[42px] lg:text-[46px] font-medium text-[#F4EFE6] leading-[1.12]"
              >
                Bring the Ritual Home —{' '}
                <em className="italic font-normal text-[#E5C158]">
                  {P.length} Botanical Oils &amp; Scrubs
                </em>
              </h2>
              <p className="text-[17px] sm:text-[18px] text-[#F4EFE6]/90 leading-[1.6] max-w-xl">
                Cold-pressed sandalwood and lavender massage oils, Himalayan bath salts, and aromatic body polishes handcrafted for quiet nights at home.
              </p>
              <div className="pt-2">
                <a
                  href="/shop/"
                  className="min-h-[54px] inline-flex items-center justify-center gap-2.5 py-4 px-8 rounded-full bg-[#E5C158] hover:bg-[#F0D58C] active:scale-[0.98] text-[#0B0A09] text-[16px] sm:text-[17px] font-semibold transition-all"
                >
                  <span>Visit Wellness Shop</span>
                  <ArrowRight className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[260px] sm:min-h-[320px] overflow-hidden">
              <img
                src={P[0].image}
                alt="Botanical aromatherapy oils and spa scrubs from The Elite Spa Apothecary"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#161412] via-[#161412]/25 to-transparent" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* =================================================================
          9. MARQUEE + REAL GOOGLE REVIEWS + WARM CONCIERGE FAQS + DARK MAP
      ================================================================== */}
      <div className="relative overflow-hidden border-y border-[#D4AF7A]/20 bg-[#161412]/75 py-6 mt-10">
        <div className="marquee-track">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center gap-12 pr-12" aria-hidden={dup === 1}>
              {MARQUEE_ITEMS.map((item) => (
                <span
                  key={`${dup}-${item}`}
                  className="inline-flex items-center gap-12 font-serif text-[24px] sm:text-[28px] text-[#F4EFE6] whitespace-nowrap"
                >
                  <span>{item}</span>
                  <span className="text-[#E5C158] text-[18px]" aria-hidden="true">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Real Google Reviews Block */}
      <section
        aria-labelledby="google-reviews-heading"
        className="py-20 sm:py-28 max-w-[1380px] mx-auto px-5 sm:px-8"
      >
        <div className="glass-panel rounded-3xl p-7 sm:p-12 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#0B0A09]/85 border border-[#D4AF7A]/30">
                <GoogleGMark />
                <div className="flex items-center gap-1 text-[#E5C158]">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-[#E5C158] text-[#E5C158]" aria-hidden="true" />
                  ))}
                </div>
                <span className="text-[17px] font-bold text-[#F4EFE6]">
                  <AnimatedRatingNumber target={4.9} />★
                </span>
              </div>

              <h2
                id="google-reviews-heading"
                className="font-serif text-[34px] sm:text-[42px] font-medium text-[#F4EFE6] leading-[1.12]"
              >
                Verified Pune <em className="italic font-normal text-[#E5C158]">Guest Stories.</em>
              </h2>

              <p className="text-[16px] sm:text-[17px] text-[#F4EFE6]/90 leading-[1.6]">
                Based on <strong className="text-[#E5C158] font-semibold">250+ Verified Google Reviews</strong> from Kalyani Nagar, Koregaon Park, and Viman Nagar guests.
              </p>

              <div className="pt-1 flex flex-wrap items-center gap-4">
                <a
                  href={B.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[48px] inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full border border-[#D4AF7A]/50 hover:border-[#E5C158] bg-[#0B0A09]/80 text-[15px] sm:text-[16px] font-semibold text-[#E5C158] hover:text-[#F0D58C] transition-colors"
                >
                  <span>Read All Reviews on Google Maps</span>
                  <ExternalLink className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                </a>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() =>
                    setActiveReview((prev) => (prev === 0 ? GUEST_REVIEWS.length - 1 : prev - 1))
                  }
                  className="w-12 h-12 rounded-full border border-[#D4AF7A]/40 hover:border-[#E5C158] bg-[#0B0A09]/80 text-[#F4EFE6] hover:text-[#E5C158] active:scale-[0.95] flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Previous guest review"
                >
                  <ChevronLeft className="w-6 h-6" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveReview((prev) => (prev === GUEST_REVIEWS.length - 1 ? 0 : prev + 1))
                  }
                  className="w-12 h-12 rounded-full border border-[#D4AF7A]/40 hover:border-[#E5C158] bg-[#0B0A09]/80 text-[#F4EFE6] hover:text-[#E5C158] active:scale-[0.95] flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Next guest review"
                >
                  <ChevronRight className="w-6 h-6" strokeWidth={1.5} />
                </button>
                <span className="text-[16px] font-medium text-[#F4EFE6]/90 ml-2 tabular-nums">
                  {activeReview + 1} / {GUEST_REVIEWS.length}
                </span>
              </div>
            </div>

            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={GUEST_REVIEWS[activeReview].name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-3xl bg-[#0B0A09]/82 border border-[#F4EFE6]/12 p-7 sm:p-10"
                >
                  <p className="font-serif text-[22px] sm:text-[26px] text-[#F4EFE6] leading-[1.5] mb-8">
                    “{GUEST_REVIEWS[activeReview].quote}”
                  </p>
                  <footer className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#F4EFE6]/12">
                    <div>
                      <strong className="block text-[18px] font-semibold text-[#F4EFE6]">
                        {GUEST_REVIEWS[activeReview].name}
                      </strong>
                      <span className="block text-[15px] text-[#E5C158] mt-0.5">
                        {GUEST_REVIEWS[activeReview].location} • {GUEST_REVIEWS[activeReview].ritual}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {GUEST_REVIEWS.map((rev, idx) => (
                        <button
                          key={rev.name}
                          type="button"
                          onClick={() => setActiveReview(idx)}
                          aria-label={`Read review by ${rev.name}`}
                          className={`h-2.5 rounded-full transition-all cursor-pointer ${
                            idx === activeReview
                              ? 'w-8 bg-[#E5C158]'
                              : 'w-2.5 bg-[#F4EFE6]/30 hover:bg-[#F4EFE6]/60'
                          }`}
                        />
                      ))}
                    </div>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Warm Luxury Concierge FAQs (5 Questions, + rotating 45° into ×) */}
      <section
        id="concierge-faq"
        aria-labelledby="faq-heading"
        className="py-12 sm:py-20 max-w-[1040px] mx-auto px-5 sm:px-8"
      >
        <div className="mb-10">
          <p className="text-[15px] font-semibold tracking-[0.06em] uppercase text-[#D4AF7A] mb-3">
            Concierge Answers
          </p>
          <h2
            id="faq-heading"
            className="font-serif text-[34px] sm:text-[42px] lg:text-[48px] font-medium text-[#F4EFE6] leading-[1.12]"
          >
            Good to Know Before <em className="italic font-normal text-[#E5C158]">You Arrive.</em>
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={faq.question}
                className="rounded-2xl bg-[#161412] border border-[#D4AF7A]/22 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  data-testid={`faq-trigger-${idx}`}
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full min-h-[68px] py-5 px-6 sm:px-8 flex items-center justify-between gap-4 text-left cursor-pointer"
                >
                  <span className="font-serif text-[23px] sm:text-[26px] font-medium text-[#F4EFE6] leading-snug">
                    {faq.question}
                  </span>
                  <span
                    className={`w-10 h-10 rounded-full border border-[#D4AF7A]/40 flex items-center justify-center shrink-0 text-[#E5C158] transition-transform duration-300 ${
                      isOpen ? 'rotate-45 bg-[#E5C158]/15 border-[#E5C158]' : 'rotate-0'
                    }`}
                  >
                    <Plus className="w-5 h-5" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-8 pb-6 pt-1 text-[17px] text-[#F4EFE6]/90 leading-[1.65] border-t border-[#F4EFE6]/10">
                        <p className="pt-4">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* Location Card & Dark-Themed Embedded Google Map */}
      <section
        id="location"
        aria-labelledby="location-heading"
        className="py-20 sm:py-28 max-w-[1380px] mx-auto px-5 sm:px-8"
      >
        <div className="mb-10">
          <p className="text-[15px] font-semibold tracking-[0.06em] uppercase text-[#D4AF7A] mb-3">
            Sanctuary Address &amp; Parking
          </p>
          <h2
            id="location-heading"
            className="font-serif text-[34px] sm:text-[42px] lg:text-[48px] font-medium text-[#F4EFE6] leading-[1.12]"
          >
            Visit Us in <em className="italic font-normal text-[#E5C158]">Kalyani Nagar.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5 glass-panel rounded-3xl p-7 sm:p-10 flex flex-col justify-between gap-8">
            <div className="space-y-6">
              <h3 className="font-serif text-[28px] sm:text-[32px] font-medium text-[#F4EFE6]">
                Vascon Mariplex Mall
              </h3>

              <div className="space-y-5 text-[17px] text-[#F4EFE6]/90 leading-[1.6]">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-[#E5C158] shrink-0 mt-1" strokeWidth={1.5} aria-hidden="true" />
                  <p>{B.address}</p>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-[#E5C158] shrink-0 mt-1" strokeWidth={1.5} aria-hidden="true" />
                  <p className="font-semibold text-[#F4EFE6]">
                    Open Daily • 8:00 AM – 3:00 AM
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-[#E5C158] shrink-0 mt-1" strokeWidth={1.5} aria-hidden="true" />
                  <a
                    href={`tel:${B.phone}`}
                    className="font-semibold text-[#F4EFE6] hover:text-[#E5C158] transition-colors"
                  >
                    {B.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#F4EFE6]/12 flex flex-col sm:flex-row gap-3.5">
              <a
                href={B.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-h-[52px] inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#E5C158] hover:bg-[#F0D58C] active:scale-[0.98] text-[#0B0A09] text-[16px] font-semibold transition-all whitespace-nowrap"
              >
                <MapPin className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
                <span>Get Directions</span>
              </a>
              <a
                href={whatsappUrl('Hello The Elite Spa Centre, please share directions and available timings for today at Vascon Mariplex Mall.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-h-[52px] inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full border border-[#D4AF7A]/48 hover:border-[#E5C158] active:scale-[0.98] text-[#F4EFE6] text-[16px] font-semibold transition-all whitespace-nowrap"
              >
                <MessageCircle className="w-5 h-5 text-[#E5C158]" strokeWidth={1.6} aria-hidden="true" />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-[#D4AF7A]/25 bg-[#161412] min-h-[380px] sm:min-h-[440px]">
            <iframe
              title="The Elite Spa Centre Location Map — Vascon Mariplex Mall, Kalyani Nagar, Pune"
              src="https://www.google.com/maps?q=The+Elite+Spa+Centre,+Vascon+Mariplex+Mall,+Kalyani+Nagar,+Pune&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="dark-map-frame w-full h-full min-h-[380px] sm:min-h-[440px] border-0"
            />
          </div>
        </div>
      </section>

      {/* =================================================================
          EXPANDABLE FULL MENU MODAL DRAWER (ALL 26 RITUALS)
      ================================================================== */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 flex justify-end"
            role="dialog"
            aria-modal="true"
            aria-label="All 26 Signature Spa Rituals"
          >
            <div
              className="absolute inset-0 bg-[#0B0A09]/85 backdrop-blur-md"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-5xl bg-[#0B0A09] border-l border-[#D4AF7A]/25 h-full flex flex-col overflow-hidden"
            >
              <div className="p-6 sm:p-8 border-b border-[#D4AF7A]/20 flex items-center justify-between gap-4 bg-[#161412]">
                <div>
                  <h2 className="font-serif text-[30px] sm:text-[36px] font-medium text-[#F4EFE6] leading-tight">
                    Complete Sanctuary Menu ({drawerRituals.length})
                  </h2>
                  <p className="text-[16px] text-[#F4EFE6]/88 mt-1">
                    Tap any ritual to view details or reserve directly on WhatsApp.
                  </p>
                </div>
                <button
                  type="button"
                  data-testid="close-menu-drawer-btn"
                  onClick={() => setDrawerOpen(false)}
                  className="w-12 h-12 rounded-full border border-[#D4AF7A]/40 bg-[#0B0A09] hover:border-[#E5C158] text-[#F4EFE6] flex items-center justify-center shrink-0 cursor-pointer"
                  aria-label="Close full menu drawer"
                >
                  <X className="w-6 h-6" strokeWidth={1.6} />
                </button>
              </div>

              <div className="px-6 sm:px-8 py-4 border-b border-[#F4EFE6]/10 bg-[#161412]/70 flex items-center gap-2.5 overflow-x-auto no-scrollbar">
                {MOOD_FILTERS.map((mood) => {
                  const active = drawerMood === mood;
                  return (
                    <button
                      key={mood}
                      type="button"
                      onClick={() => setDrawerMood(mood)}
                      className={`min-h-[44px] py-2.5 px-5 rounded-full text-[15px] font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#E5C158] text-[#0B0A09]'
                          : 'bg-[#0B0A09] text-[#F4EFE6] border border-[#F4EFE6]/18 hover:border-[#D4AF7A]/60'
                      }`}
                    >
                      {mood}
                    </button>
                  );
                })}
              </div>

              <div className="flex-1 overflow-y-auto p-6 sm:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                  {drawerRituals.map((service) => (
                    <TiltTreatmentCard key={service.slug} service={service} />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
