import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import { LUXURY_EASE, computeMagneticOffset } from '../utils/motionHelpers';

function useFinePointer(): boolean {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return fine;
}

/**
 * Aceternity UI-style slow-moving warm Amber/Gold Aurora Glow blur.
 * Animates strictly transform & opacity; pauses automatically under prefers-reduced-motion.
 */
export function AuroraGlow({
  className = '',
  variant = 'hero',
}: {
  className?: string;
  variant?: 'hero' | 'bundles';
}) {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <motion.div
        animate={
          reduced
            ? undefined
            : {
                x: variant === 'hero' ? ['-6%', '7%', '-4%'] : ['5%', '-6%', '5%'],
                y: variant === 'hero' ? ['-4%', '6%', '-4%'] : ['4%', '-5%', '4%'],
                scale: [1, 1.12, 1],
                opacity: [0.55, 0.85, 0.55],
              }
        }
        transition={{
          duration: variant === 'hero' ? 16 : 19,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute rounded-full bg-amber-500/10 blur-[120px] will-change-transform ${
          variant === 'hero'
            ? '-top-24 -left-16 w-[340px] h-[340px] sm:w-[540px] sm:h-[540px]'
            : 'top-6 left-1/4 w-[320px] h-[320px] sm:w-[520px] sm:h-[520px]'
        }`}
      />
      <motion.div
        animate={
          reduced
            ? undefined
            : {
                x: variant === 'hero' ? ['6%', '-8%', '6%'] : ['-5%', '7%', '-5%'],
                y: variant === 'hero' ? ['5%', '-4%', '5%'] : ['-4%', '6%', '-4%'],
                scale: [1.05, 0.94, 1.05],
                opacity: [0.42, 0.72, 0.42],
              }
        }
        transition={{
          duration: variant === 'hero' ? 20 : 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute rounded-full bg-[#D4AF37]/10 blur-[120px] will-change-transform ${
          variant === 'hero'
            ? 'bottom-4 -right-20 w-[300px] h-[300px] sm:w-[460px] sm:h-[460px]'
            : '-bottom-16 right-8 w-[300px] h-[300px] sm:w-[440px] sm:h-[440px]'
        }`}
      />
    </div>
  );
}

/**
 * React Bits / 21st.dev-style Word-by-Word Split-Text Reveal.
 * Subtle blur-to-sharp + fade-up with calm luxury cubic-bezier pacing.
 */
export interface SplitWord {
  text: string;
  accent?: boolean;
}

export function SplitTextReveal({
  words,
  id,
  className = '',
}: {
  words: SplitWord[];
  id?: string;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <h1 id={id} className={className}>
      {words.map((word, index) => (
        <React.Fragment key={`${word.text}-${index}`}>
          <motion.span
            initial={
              reduced
                ? { opacity: 1 }
                : { opacity: 0, y: 18, filter: 'blur(6px)' }
            }
            animate={
              reduced
                ? { opacity: 1 }
                : { opacity: 1, y: 0, filter: 'blur(0px)' }
            }
            transition={{
              duration: 0.85,
              delay: reduced ? 0 : 0.08 + index * 0.1,
              ease: LUXURY_EASE,
            }}
            className="inline-block will-change-transform"
          >
            {word.accent ? (
              <em className="italic font-normal shiny-gold-text">{word.text}</em>
            ) : (
              word.text
            )}
          </motion.span>
          {index < words.length - 1 ? ' ' : null}
        </React.Fragment>
      ))}
    </h1>
  );
}

/**
 * 21st.dev-style Magnetic Hover Anchor/Button.
 * Gently attracts toward cursor on desktop fine pointers; automatically disabled on touch & reduced motion.
 */
interface MagneticAnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  maxShift?: number;
}

export function MagneticAnchor({
  children,
  className = '',
  maxShift = 9,
  ...rest
}: MagneticAnchorProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const isFinePointer = useFinePointer();
  const reduced = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 260, damping: 22, mass: 0.45 });
  const y = useSpring(rawY, { stiffness: 260, damping: 22, mass: 0.45 });

  const enableMagnetic = isFinePointer && !reduced;

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!enableMagnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offset = computeMagneticOffset(e.clientX, e.clientY, rect, maxShift);
    rawX.set(offset.x);
    rawY.set(offset.y);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.a
      ref={ref}
      style={enableMagnetic ? { x, y } : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      {...(rest as any)}
    >
      {children}
    </motion.a>
  );
}

/**
 * Aceternity UI-style Dark Obsidian Glass Spotlight Card.
 * Renders `bg-[#12100e]/90 border border-amber-500/15` with a desktop-only
 * mouse-tracking golden radial glow (zero React re-renders on mousemove).
 */
export function SpotlightCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const isFinePointer = useFinePointer();
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);

  const spotlightBg = useMotionTemplate`radial-gradient(360px circle at ${mouseX}px ${mouseY}px, rgba(229, 193, 88, 0.16), rgba(212, 175, 55, 0.05) 45%, transparent 75%)`;
  const borderGlowBg = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, rgba(229, 193, 88, 0.55), transparent 72%)`;

  const enableSpotlight = isFinePointer && !reduced;

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!enableSpotlight || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        if (enableSpotlight) setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      className={`group relative rounded-3xl bg-[#12100e]/90 backdrop-blur-md border border-amber-500/15 overflow-hidden transition-colors duration-300 ${
        enableSpotlight ? 'hover:border-amber-500/35' : ''
      } ${className}`}
    >
      {enableSpotlight && (
        <>
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 rounded-3xl transition-opacity duration-300"
            style={{
              background: spotlightBg,
              opacity: hovered ? 1 : 0,
            }}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 rounded-3xl transition-opacity duration-300"
            style={{
              padding: '1px',
              background: borderGlowBg,
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              opacity: hovered ? 1 : 0,
            }}
          />
        </>
      )}
      {children}
    </article>
  );
}
