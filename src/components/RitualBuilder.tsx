import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, MessageCircle, User, Users } from 'lucide-react';
import { B } from '../data/catalog.js';
import {
  RITUAL_TIME_SLOTS,
  buildRitualWhatsAppUrl,
  calculateRitualPrice,
  formatINR,
  getDurationOptions,
  type DurationOption,
  type GuestOption,
  type TimeSlotOption,
} from '../utils/ritualPricing';
import { LUXURY_EASE } from '../utils/motionHelpers';
import { MagneticAnchor } from './LuxuryMotionPrimitives';

function RollingPriceTicker({ amount }: { amount: number }) {
  const formatted = formatINR(amount);

  return (
    <span
      data-testid="ritual-builder-price"
      className="inline-flex items-baseline overflow-hidden font-serif text-[36px] sm:text-[42px] font-bold text-[#E5C158] tabular-nums leading-none"
      aria-live="polite"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={formatted}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -24, opacity: 0 }}
          transition={{ duration: 0.35, ease: LUXURY_EASE }}
          className="inline-block"
        >
          {formatted}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function RitualBuilder() {
  const [guests, setGuests] = useState<GuestOption>('Solo');
  const [duration, setDuration] = useState<DurationOption>(60);
  const [timeSlot, setTimeSlot] = useState<TimeSlotOption>('Late Night (10 PM – 3 AM)');

  const durationOptions = useMemo(() => getDurationOptions(guests), [guests]);
  const totalPrice = useMemo(
    () => calculateRitualPrice(guests, duration),
    [guests, duration]
  );

  const whatsappHref = useMemo(
    () =>
      buildRitualWhatsAppUrl(B.whatsappNumber, {
        guests,
        durationMins: duration,
        timeSlot,
      }),
    [guests, duration, timeSlot]
  );

  return (
    <section
      id="ritual-builder"
      aria-labelledby="ritual-builder-heading"
      className="py-20 sm:py-28 max-w-[1380px] mx-auto px-5 sm:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.85, ease: LUXURY_EASE }}
        className="rounded-3xl bg-[#12100e]/90 backdrop-blur-xl border border-amber-500/15 p-7 sm:p-10 lg:p-14 relative overflow-hidden"
      >
        <div className="max-w-3xl mb-10">
          <p className="text-[15px] font-semibold tracking-[0.06em] uppercase text-[#D4AF7A] mb-3">
            15-Second Quick Ritual Builder
          </p>
          <h2
            id="ritual-builder-heading"
            className="font-serif text-[34px] sm:text-[42px] lg:text-[48px] font-medium text-[#F4EFE6] leading-[1.12] mb-3"
          >
            Tailor Your Suite in <em className="italic font-normal text-[#E5C158]">Three Taps.</em>
          </h2>
          <p className="text-[17px] sm:text-[18px] text-[#F4EFE6]/90 leading-[1.6]">
            Select your guests, session length, and preferred time window for instant WhatsApp confirmation at Vascon Mariplex Mall.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Interactive Controls with Framer Motion layoutId Sliding Active Pill */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Guests */}
            <div>
              <p className="text-[16px] font-semibold text-[#D4AF7A] mb-3.5">
                1. Select Guests
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 p-1.5 rounded-2xl bg-[#0B0A09]/70 border border-[#F4EFE6]/12">
                {(['Solo', 'Couple'] as const).map((option) => {
                  const active = guests === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      data-testid={`builder-guest-${option.toLowerCase()}`}
                      onClick={() => setGuests(option)}
                      aria-pressed={active}
                      className="relative min-h-[58px] py-4 px-5 rounded-xl text-left transition-transform active:scale-[0.98] cursor-pointer"
                    >
                      {active && (
                        <motion.span
                          layoutId="builder-guest-pill"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                          className="absolute inset-0 rounded-xl bg-[#D4AF7A]/20 border border-[#E5C158]"
                        />
                      )}
                      <span className="relative z-10 flex items-center justify-between gap-3">
                        <span className="flex items-center gap-3">
                          {option === 'Solo' ? (
                            <User
                              className={`w-5 h-5 ${active ? 'text-[#E5C158]' : 'text-[#F4EFE6]/80'}`}
                              strokeWidth={1.5}
                              aria-hidden="true"
                            />
                          ) : (
                            <Users
                              className={`w-5 h-5 ${active ? 'text-[#E5C158]' : 'text-[#F4EFE6]/80'}`}
                              strokeWidth={1.5}
                              aria-hidden="true"
                            />
                          )}
                          <span className="text-[18px] font-semibold text-[#F4EFE6]">
                            {option === 'Solo' ? 'Solo Guest' : 'Couple Suite'}
                          </span>
                        </span>
                        <span
                          className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                            active
                              ? 'border-[#E5C158] bg-[#E5C158] text-[#0B0A09]'
                              : 'border-[#F4EFE6]/30'
                          }`}
                        >
                          {active && <Check className="w-3.5 h-3.5 stroke-[3]" aria-hidden="true" />}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Duration */}
            <div>
              <p className="text-[16px] font-semibold text-[#D4AF7A] mb-3.5">
                2. Choose Duration
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 p-1.5 rounded-2xl bg-[#0B0A09]/70 border border-[#F4EFE6]/12">
                {durationOptions.map(({ mins, price }) => {
                  const active = duration === mins;
                  return (
                    <button
                      key={mins}
                      type="button"
                      data-testid={`builder-duration-${mins}`}
                      onClick={() => setDuration(mins)}
                      aria-pressed={active}
                      className="relative min-h-[76px] py-4 px-5 rounded-xl text-left transition-transform active:scale-[0.98] cursor-pointer"
                    >
                      {active && (
                        <motion.span
                          layoutId="builder-duration-pill"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                          className="absolute inset-0 rounded-xl bg-[#D4AF7A]/20 border border-[#E5C158]"
                        />
                      )}
                      <span className="relative z-10 block">
                        <span className="block text-[18px] font-semibold text-[#F4EFE6] mb-1">
                          {mins} Mins
                        </span>
                        <span className="block text-[22px] font-bold text-[#E5C158] tabular-nums">
                          {formatINR(price)}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Preferred Time */}
            <div>
              <p className="text-[16px] font-semibold text-[#D4AF7A] mb-3.5">
                3. Preferred Time
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-1.5 rounded-2xl bg-[#0B0A09]/70 border border-[#F4EFE6]/12">
                {RITUAL_TIME_SLOTS.map((slot) => {
                  const active = timeSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTimeSlot(slot)}
                      aria-pressed={active}
                      className="relative min-h-[54px] py-3.5 px-4 rounded-xl text-center transition-transform active:scale-[0.98] cursor-pointer"
                    >
                      {active && (
                        <motion.span
                          layoutId="builder-time-pill"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                          className="absolute inset-0 rounded-xl bg-[#E5C158]"
                        />
                      )}
                      <span
                        className={`relative z-10 text-[16px] font-semibold transition-colors ${
                          active ? 'text-[#0B0A09]' : 'text-[#F4EFE6]'
                        }`}
                      >
                        {slot}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Live Summary & Rolling Price Ticker */}
          <div className="lg:col-span-5 flex">
            <div className="w-full rounded-3xl bg-[#0B0A09]/92 border border-[#D4AF7A]/30 p-7 sm:p-8 flex flex-col justify-between gap-8">
              <div className="space-y-6">
                <h3 className="font-serif text-[28px] font-medium text-[#F4EFE6]">
                  Your Sanctuary Selection
                </h3>

                <dl className="divide-y divide-[#F4EFE6]/12 text-[17px]">
                  <div className="py-4 flex items-center justify-between gap-4">
                    <dt className="text-[#F4EFE6]/82">Suite</dt>
                    <dd className="font-semibold text-[#F4EFE6]">
                      {guests === 'Solo' ? 'Solo Private Suite' : 'Couples Candlelit Suite'}
                    </dd>
                  </div>
                  <div className="py-4 flex items-center justify-between gap-4">
                    <dt className="text-[#F4EFE6]/82">Duration</dt>
                    <dd className="font-semibold text-[#F4EFE6] tabular-nums">
                      {duration} Mins
                    </dd>
                  </div>
                  <div className="py-4 flex items-center justify-between gap-4">
                    <dt className="text-[#F4EFE6]/82">Time Window</dt>
                    <dd className="font-semibold text-[#F4EFE6] text-right">
                      {timeSlot}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="pt-6 border-t border-[#D4AF7A]/25 space-y-6">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-[17px] font-medium text-[#F4EFE6]/90">
                    Total Ritual Rate
                  </span>
                  <RollingPriceTicker amount={totalPrice} />
                </div>

                <MagneticAnchor
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="ritual-builder-wa-cta"
                  className="cta-shimmer w-full min-h-[56px] inline-flex items-center justify-center gap-2.5 py-4 px-7 rounded-full bg-[#E5C158] hover:bg-[#F0D58C] active:scale-[0.98] text-[#0a0908] text-[16px] sm:text-[17px] font-semibold transition-colors duration-200 text-center"
                >
                  <MessageCircle className="w-5 h-5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                  <span>Check Instant Availability on WhatsApp</span>
                </MagneticAnchor>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
