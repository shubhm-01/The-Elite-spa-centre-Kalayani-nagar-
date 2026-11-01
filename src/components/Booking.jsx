import React, { useEffect, useState } from 'react';
import { S } from '../data/catalog.js';

const initialValues = { name: '', phone: '', date: '', time: '', notes: '' };

function localDateTime() {
  const now = new Date();
  const date = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('-');
  const time = [String(now.getHours()).padStart(2, '0'), String(now.getMinutes()).padStart(2, '0')].join(':');
  return { date, time };
}

export default function Booking({ service = 'Spa appointment' }) {
  const [values, setValues] = useState(initialValues);
  const [selectedService, setSelectedService] = useState(service);
  const [today, setToday] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setToday(localDateTime().date);
    const requestedSlug = new URLSearchParams(window.location.search).get('service');
    if (requestedSlug) {
      const match = S.find((item) => item.slug === requestedSlug);
      if (match) setSelectedService(match.name);
    }
  }, []);

  function update(event) {
    setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function submit(event) {
    event.preventDefault();
    setError('');

    const digits = values.phone.replace(/\D/g, '');
    const validIndianPhone = (digits.length === 10 && /^[6-9]/.test(digits)) ||
      (digits.length === 12 && digits.startsWith('91') && /^[6-9]/.test(digits.slice(2)));

    if (!validIndianPhone) {
      setError('Enter a valid 10-digit Indian mobile number, with or without +91.');
      return;
    }

    const current = localDateTime();
    if (!values.date || values.date < current.date) {
      setError('Choose today or a future date.');
      return;
    }
    if (values.date === current.date && values.time && values.time < current.time) {
      setError('Choose a future time, or select another date.');
      return;
    }

    const message = [
      'Booking enquiry for The Elite Spa Centre',
      'Treatment: ' + selectedService,
      'Name: ' + values.name.trim(),
      'Mobile: ' + values.phone.trim(),
      'Preferred date: ' + values.date,
      'Preferred time: ' + values.time,
      'Notes: ' + (values.notes.trim() || 'None'),
      '',
      'Please confirm availability and the final price. This is an enquiry, not a confirmed appointment.'
    ].join('\n');

    window.location.assign('https://wa.me/919199561258?text=' + encodeURIComponent(message));
  }

  return (
    <form className="form" onSubmit={submit}>
      <p className="selected-service" aria-live="polite">Selected treatment: <strong>{selectedService}</strong></p>
      <label htmlFor="booking-name">Name</label>
      <input id="booking-name" name="name" autoComplete="name" maxLength={80} required value={values.name} onChange={update} />
      <label htmlFor="booking-phone">Mobile number</label>
      <input id="booking-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={15} pattern="(?:\+?91[ -]?)?[6-9][0-9]{9}" title="Enter a valid 10-digit Indian mobile number, with or without +91." required value={values.phone} onChange={update} />
      <label htmlFor="booking-date">Preferred date</label>
      <input id="booking-date" name="date" type="date" min={today || undefined} required value={values.date} onChange={update} />
      <label htmlFor="booking-time">Preferred time</label>
      <input id="booking-time" name="time" type="time" required value={values.time} onChange={update} />
      <label htmlFor="booking-notes">Notes (optional)</label>
      <textarea id="booking-notes" name="notes" maxLength={500} rows={4} value={values.notes} onChange={update} />
      {error ? <p className="form-error" role="alert">{error}</p> : null}
      <button type="submit">Request booking on WhatsApp ↗</button>
      <small id="booking-note">Your request opens WhatsApp. The spa must confirm availability and final pricing; no appointment is reserved by this form.</small>
    </form>
  );
}
