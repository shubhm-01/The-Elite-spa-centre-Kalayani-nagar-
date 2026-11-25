import React, { useEffect, useState } from 'react';
import { MessageCircle, Calendar, Clock, Sparkles } from 'lucide-react';
import { S, getServicePrice, whatsappUrl } from '../data/catalog.js';

const initialValues = { name: '', phone: '', date: '', time: '', duration: '60', notes: '' };

function localDateTime() {
  const now = new Date();
  const date = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0')
  ].join('-');
  const time = [
    String(now.getHours()).padStart(2, '0'),
    String(now.getMinutes()).padStart(2, '0')
  ].join(':');
  return { date, time };
}

export default function Booking({ service = 'Signature Relaxation Massage' }) {
  const [values, setValues] = useState(initialValues);
  const [selectedSlug, setSelectedSlug] = useState('signature-relaxation');
  const [today, setToday] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setToday(localDateTime().date);
    const requestedSlug = new URLSearchParams(window.location.search).get('service');
    if (requestedSlug) {
      const match = S.find((item) => item.slug === requestedSlug);
      if (match) {
        setSelectedSlug(match.slug);
        return;
      }
    }
    const byName = S.find((item) => item.name === service);
    if (byName) setSelectedSlug(byName.slug);
  }, [service]);

  const selectedItem = S.find((item) => item.slug === selectedSlug) || S[0];
  const isExpress = ['foot-reflexology', 'head-shoulder', 'back-relief', 'mini-reset'].includes(selectedItem.slug);
  const computedPrice = isExpress
    ? selectedItem.price
    : getServicePrice(selectedItem.slug, `${values.duration} min`);

  function update(event) {
    setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function submit(event) {
    event.preventDefault();
    setError('');

    const digits = values.phone.replace(/\D/g, '');
    const validIndianPhone =
      (digits.length === 10 && /^[6-9]/.test(digits)) ||
      (digits.length === 12 && digits.startsWith('91') && /^[6-9]/.test(digits.slice(2)));

    if (!validIndianPhone) {
      setError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    const current = localDateTime();
    if (!values.date || values.date < current.date) {
      setError('Please choose today or an upcoming date.');
      return;
    }

    const durationText = isExpress ? selectedItem.duration : `${values.duration} mins`;

    const message = [
      'Reservation Request — The Elite Spa Centre (Kalyani Nagar)',
      `• Ritual: ${selectedItem.name}`,
      `• Duration: ${durationText}`,
      `• Ritual Rate: ₹${computedPrice.toLocaleString('en-IN')}`,
      `• Guest Name: ${values.name.trim()}`,
      `• Mobile: ${values.phone.trim()}`,
      `• Preferred Date: ${values.date}`,
      `• Preferred Time: ${values.time}`,
      ...(values.notes.trim() ? [`• Preferences: ${values.notes.trim()}`] : []),
      '',
      'Please confirm suite availability.'
    ].join('\n');

    window.location.assign(whatsappUrl(message));
  }

  return (
    <form
      onSubmit={submit}
      className="glass-panel rounded-3xl p-6 sm:p-8 space-y-5"
    >
      <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#F5F5F0]/10">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#D4AF37]">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            Selected Sanctuary Ritual
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#F5F5F0] mt-1">
            {selectedItem.name}
          </h3>
        </div>
        <div className="text-right shrink-0">
          <span className="block text-[11px] text-[#B0AEA6]">Rate</span>
          <strong className="font-serif text-2xl sm:text-3xl text-[#D4AF37] tabular-nums">
            ₹{computedPrice.toLocaleString('en-IN')}
          </strong>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="block space-y-2">
          <span className="text-xs font-semibold tracking-[0.12em] uppercase text-[#F5F5F0]/80">
            Choose Ritual
          </span>
          <select
            value={selectedSlug}
            onChange={(e) => setSelectedSlug(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#09090B] border border-[#F5F5F0]/15 focus:border-[#D4AF37] text-sm text-[#F5F5F0] outline-none"
          >
            {S.map((item) => (
              <option key={item.slug} value={item.slug} className="bg-[#09090B] text-[#F5F5F0]">
                {item.name} — ₹{item.price.toLocaleString('en-IN')}
              </option>
            ))}
          </select>
        </label>

        {!isExpress ? (
          <label className="block space-y-2">
            <span className="text-xs font-semibold tracking-[0.12em] uppercase text-[#F5F5F0]/80">
              Session Duration
            </span>
            <select
              name="duration"
              value={values.duration}
              onChange={update}
              className="w-full px-4 py-3 rounded-xl bg-[#09090B] border border-[#F5F5F0]/15 focus:border-[#D4AF37] text-sm text-[#F5F5F0] outline-none"
            >
              <option value="60" className="bg-[#09090B]">
                60 Mins (₹{getServicePrice(selectedItem.slug, '60 min').toLocaleString('en-IN')})
              </option>
              <option value="90" className="bg-[#09090B]">
                90 Mins (₹{getServicePrice(selectedItem.slug, '90 min').toLocaleString('en-IN')})
              </option>
              <option value="120" className="bg-[#09090B]">
                120 Mins (₹{getServicePrice(selectedItem.slug, '120 min').toLocaleString('en-IN')})
              </option>
            </select>
          </label>
        ) : (
          <div className="space-y-2">
            <span className="text-xs font-semibold tracking-[0.12em] uppercase text-[#F5F5F0]/80">
              Session Duration
            </span>
            <div className="px-4 py-3 rounded-xl bg-[#09090B]/60 border border-[#F5F5F0]/10 text-sm text-[#F5F5F0]">
              {selectedItem.duration} · Express Session
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="block space-y-2">
          <span className="text-xs font-semibold tracking-[0.12em] uppercase text-[#F5F5F0]/80">
            Your Name
          </span>
          <input
            id="booking-name"
            name="name"
            autoComplete="name"
            maxLength={80}
            required
            placeholder="Full name"
            value={values.name}
            onChange={update}
            className="w-full px-4 py-3 rounded-xl bg-[#09090B] border border-[#F5F5F0]/15 focus:border-[#D4AF37] text-sm text-[#F5F5F0] placeholder:text-[#B0AEA6]/50 outline-none"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-xs font-semibold tracking-[0.12em] uppercase text-[#F5F5F0]/80">
            Mobile Number
          </span>
          <input
            id="booking-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={15}
            required
            placeholder="+91 98XXX XXXXX"
            value={values.phone}
            onChange={update}
            className="w-full px-4 py-3 rounded-xl bg-[#09090B] border border-[#F5F5F0]/15 focus:border-[#D4AF37] text-sm text-[#F5F5F0] placeholder:text-[#B0AEA6]/50 outline-none"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="block space-y-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.12em] uppercase text-[#F5F5F0]/80">
            <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
            Preferred Date
          </span>
          <input
            id="booking-date"
            name="date"
            type="date"
            min={today || undefined}
            required
            value={values.date}
            onChange={update}
            className="w-full px-4 py-3 rounded-xl bg-[#09090B] border border-[#F5F5F0]/15 focus:border-[#D4AF37] text-sm text-[#F5F5F0] outline-none [color-scheme:dark]"
          />
        </label>

        <label className="block space-y-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.12em] uppercase text-[#F5F5F0]/80">
            <Clock className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
            Preferred Time (8 AM – 3 AM)
          </span>
          <input
            id="booking-time"
            name="time"
            type="time"
            required
            value={values.time}
            onChange={update}
            className="w-full px-4 py-3 rounded-xl bg-[#09090B] border border-[#F5F5F0]/15 focus:border-[#D4AF37] text-sm text-[#F5F5F0] outline-none [color-scheme:dark]"
          />
        </label>
      </div>

      <label className="block space-y-2">
        <span className="text-xs font-semibold tracking-[0.12em] uppercase text-[#F5F5F0]/80">
          Pressure &amp; Aroma Preferences (Optional)
        </span>
        <textarea
          id="booking-notes"
          name="notes"
          maxLength={500}
          rows={3}
          placeholder="e.g., Medium-firm pressure on shoulders, lavender essential oil, couple suite..."
          value={values.notes}
          onChange={update}
          className="w-full px-4 py-3 rounded-xl bg-[#09090B] border border-[#F5F5F0]/15 focus:border-[#D4AF37] text-sm text-[#F5F5F0] placeholder:text-[#B0AEA6]/50 outline-none resize-none"
        />
      </label>

      {error ? (
        <p className="text-xs font-medium text-red-400 bg-red-950/40 border border-red-500/30 rounded-xl px-4 py-3" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        className="cta-gold-pulse w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-[#D4AF37] hover:bg-[#E8CB6D] text-[#09090B] text-xs sm:text-sm font-bold tracking-[0.1em] uppercase transition-all cursor-pointer"
      >
        <MessageCircle className="w-4 h-4" aria-hidden="true" />
        <span>Confirm Instant Availability on WhatsApp</span>
      </button>

      <p className="text-xs text-[#B0AEA6] text-center">
        Open daily 8:00 AM – 3:00 AM · Vascon Mariplex Mall, Kalyani Nagar, Pune
      </p>
    </form>
  );
}
