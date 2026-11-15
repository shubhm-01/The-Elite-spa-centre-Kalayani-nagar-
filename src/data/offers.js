import { S, P } from './catalog.js';

const service = (slug) => S.find((item) => item.slug === slug);
const product = (name) => P.find((item) => item.name === name);

// Suggested introductory bundles. Their displayed package prices and terms need centre approval.
export const OFFERS = [
  {
    id: 'everyday-reset',
    code: 'ELITE1699',
    title: 'The Everyday Reset',
    eyebrow: 'MOST-LOVED RESET',
    description: 'A full-body pause followed by a focused head, neck and shoulder ritual.',
    items: [service('signature-relaxation').name, service('head-shoulder').name],
    regularPrice: service('signature-relaxation').price + service('head-shoulder').price, offerPrice: 1699, savings: service('signature-relaxation').price + service('head-shoulder').price - 1699,
    image: service('signature-relaxation').image, kind: 'treatment'
  },
  {
    id: 'glow-ritual',
    code: 'GLOW1699',
    title: 'The Glow Ritual',
    eyebrow: 'SKIN & BODY CARE',
    description: 'Pair a facial skincare ritual with a body scrub for a head-to-toe refresh.',
    items: [service('facial').name, service('body-scrub').name],
    regularPrice: service('facial').price + service('body-scrub').price, offerPrice: 1699, savings: service('facial').price + service('body-scrub').price - 1699,
    image: service('facial').image, kind: 'treatment'
  },
  {
    id: 'couple-retreat',
    code: 'COUPLE3499',
    title: 'The Couple Retreat',
    eyebrow: 'FOR TWO',
    description: 'A shared spa ritual plus two foot-spa sessions, subject to room and therapist availability.',
    items: [service('couples').name, 'Two ' + service('foot-spa').name + ' sessions'],
    regularPrice: service('couples').price + (2 * service('foot-spa').price), offerPrice: 3499, savings: service('couples').price + (2 * service('foot-spa').price) - 3499,
    image: service('couples').image, kind: 'treatment'
  },
  {
    id: 'deep-unwind',
    code: 'UNWIND2099',
    title: 'The Deep Unwind',
    eyebrow: 'LONGER SPA ESCAPE',
    description: 'A warm-stone ritual paired with aromatic-oil massage for a longer spa break.',
    items: [service('hot-stone').name, service('aromatherapy').name],
    regularPrice: service('hot-stone').price + service('aromatherapy').price, offerPrice: 2099, savings: service('hot-stone').price + service('aromatherapy').price - 2099,
    image: service('hot-stone').image, kind: 'treatment'
  },
  {
    id: 'home-spa-kit',
    code: 'HOME1199',
    title: 'The At-home Spa Kit',
    eyebrow: 'THE WELLNESS SHOP',
    description: 'A massage oil, bath soak and body scrub to build a simple self-care ritual at home.',
    items: [
      product('Aromatherapy Massage Oil · 500 ml').name,
      product('Himalayan Pink Bath Salt · 500 g').name,
      product('Coffee Body Scrub · 200 g').name
    ],
    regularPrice: 1397, offerPrice: 1199, savings: 198,
    image: product('Aromatherapy Massage Oil · 500 ml').image, kind: 'shop'
  }
];
