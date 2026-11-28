import React, { useEffect, useState } from 'react';
import { MessageCircle, Calendar, Clock } from 'lucide-react';
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

    const durationText = isExpress ? selectedItem.duration : `${values.duration} Mins`;

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
      className="glass-panel rounded-3xl p-7 sm:p-10 space-y-6"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-4 pb-6 border-b border-[#F5F5F0]/14">
        <h3 className="font-serif text-[28px] sm:text-[32px] font-medium text-[#F5F5F0]">
          {selectedItem.name}
        </h3>
        <strong className="font-serif text-[32px] sm:text-[36px] font-bold text-[#E5C158] tabular-nums">
          ₹{computedPrice.toLocaleString('en-IN')}
        </strong>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <label className="block space-y-2.5">
          <span className="text-[16px] font-semibold text-[#F5F5F0]">Choose Ritual</span>
          <select
            value={selectedSlug}
            onChange={(e) => setSelectedSlug(e.target.value)}
            className="w-full px-4 py-4 rounded-2xl bg-[#09090B] border border-[#F5F5F0]/20 focus:border-[#E5C158] text-[16px] text-[#F5F5F0] outline-none"
          >
            {S.map((item) => (
              <option key={item.slug} value={item.slug} className="bg-[#09090B] text-[#F5F5F0]">
                {item.name} — ₹{item.price.toLocaleString('en-IN')}
              </option>
            ))}
          </select>
        </label>

        {!isExpress ? (
          <label className="block space-y-2.5">
            <span className="text-[16px] font-semibold text-[#F5F5F0]">Duration</span>
            <select
              name="duration"
              value={values.duration}
              onChange={update}
              className="w-full px-4 py-4 rounded-2xl bg-[#09090B] border border-[#F5F5F0]/20 focus:border-[#E5C158] text-[16px] text-[#F5F5F0] outline-none"
            >
              <option value="60" className="bg-[#09090B]">
                60 Mins • ₹{getServicePrice(selectedItem.slug, '60 min').toLocaleString('en-IN')}
              </option>
              <option value="90" className="bg-[#09090B]">
                90 Mins • ₹{getServicePrice(selectedItem.slug, '90 min').toLocaleString('en-IN')}
              </option>
              <option value="120" className="bg-[#09090B]">
                120 Mins • ₹{getServicePrice(selectedItem.slug, '120 min').toLocaleString('en-IN')}
              </option>
            </select>
          </label>
        ) : (
          <div className="space-y-2.5">
            <span className="block text-[16px] font-semibold text-[#F5F5F0]">Duration</span>
            <div className="px-4 py-4 rounded-2xl bg-[#09090B]/70 border border-[#F5F5F0]/15 text-[16px] text-[#F5F5F0]">
              {selectedItem.duration}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <label className="block space-y-2.5">
          <span className="text-[16px] font-semibold text-[#F5F5F0]">Your Name</span>
          <input
            id="booking-name"
            name="name"
            autoComplete="name"
            maxLength={80}
            required
            placeholder="Full name"
            value={values.name}
            onChange={update}
            className="w-full px-4 py-4 rounded-2xl bg-[#09090B] border border-[#F5F5F0]/20 focus:border-[#E5C158] text-[16px] text-[#F5F5F0] placeholder:text-[#F5F5F0]/50 outline-none"
          />
        </label>

        <label className="block space-y-2.5">
          <span className="text-[16px] font-semibold text-[#F5F5F0]">Mobile Number</span>
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
            className="w-full px-4 py-4 rounded-2xl bg-[#09090B] border border-[#F5F5F0]/20 focus:border-[#E5C158] text-[16px] text-[#F5F5F0] placeholder:text-[#F5F5F0]/50 outline-none"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <label className="block space-y-2.5">
          <span className="inline-flex items-center gap-2 text-[16px] font-semibold text-[#F5F5F0]">
            <Calendar className="w-4 h-4 text-[#E5C158]" aria-hidden="true" />
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
            className="w-full px-4 py-4 rounded-2xl bg-[#09090B] border border-[#F5F5F0]/20 focus:border-[#E5C158] text-[16px] text-[#F5F5F0] outline-none [color-scheme:dark]"
          />
        </label>

        <label className="block space-y-2.5">
          <span className="inline-flex items-center gap-2 text-[16px] font-semibold text-[#F5F5F0]">
            <Clock className="w-4 h-4 text-[#E5C158]" aria-hidden="true" />
            Preferred Time (8 AM – 3 AM)
          </span>
          <input
            id="booking-time"
            name="time"
            type="time"
            required
            value={values.time}
            onChange={update}
            className="w-full px-4 py-4 rounded-2xl bg-[#09090B] border border-[#F5F5F0]/20 focus:border-[#E5C158] text-[16px] text-[#F5F5F0] outline-none [color-scheme:dark]"
          />
        </label>
      </div>

      <label className="block space-y-2.5">
        <span className="text-[16px] font-semibold text-[#F5F5F0]">
          Pressure &amp; Oil Preferences (Optional)
        </span>
        <textarea
          id="booking-notes"
          name="notes"
          maxLength={500}
          rows={3}
          placeholder="Medium-firm pressure on shoulders, lavender oil, couple suite..."
          value={values.notes}
          onChange={update}
          className="w-full px-4 py-4 rounded-2xl bg-[#09090B] border border-[#F5F5F0]/20 focus:border-[#E5C158] text-[16px] text-[#F5F5F0] placeholder:text-[#F5F5F0]/50 outline-none resize-none"
        />
      </label>

      {error ? (
        <p className="text-[16px] font-medium text-red-300 bg-red-950/50 border border-red-400/40 rounded-2xl px-5 py-4" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        className="cta-gold-pulse w-full inline-flex items-center justify-center gap-2.5 py-4 px-7 rounded-full bg-[#E5C158] hover:bg-[#F2D77E] text-[#09090B] text-[17px] font-semibold transition-all cursor-pointer"
      >
        <MessageCircle className="w-5 h-5" aria-hidden="true" />
        <span>Check Instant Availability on WhatsApp</span>
      </button>

      <p className="text-[15px] text-[#F5F5F0]/90 text-center">
        Open Daily 8:00 AM – 3:00 AM • Vascon Mariplex Mall, Kalyani Nagar
      </p>
    </form>
  );
}
