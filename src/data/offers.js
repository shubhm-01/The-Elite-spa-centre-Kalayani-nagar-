import { S, P } from './catalog.js';

const service = (slug) => S.find((item) => item.slug === slug);
const product = (name) => P.find((item) => item.name === name);

// Suggested introductory bundles. Their displayed package prices and terms need centre approval.
export const OFFERS = [
  {
    id: 'everyday-reset',
    code: 'ELITE1499',
    title: 'The Everyday Reset',
    eyebrow: 'MOST-LOVED RESET',
    description: 'A full-body pause followed by a focused head, neck and shoulder ritual.',
    items: [service('signature-relaxation').name, service('head-shoulder').name],
    regularPrice: 1698, offerPrice: 1499, savings: 199,
    image: service('signature-relaxation').image, kind: 'treatment'
  },
  {
    id: 'glow-ritual',
    code: 'GLOW2499',
    title: 'The Glow Ritual',
    eyebrow: 'SKIN & BODY CARE',
    description: 'Pair a facial skincare ritual with a body scrub for a head-to-toe refresh.',
    items: [service('facial').name, service('body-scrub').name],
    regularPrice: 2798, offerPrice: 2499, savings: 299,
    image: service('facial').image, kind: 'treatment'
  },
  {
    id: 'couple-retreat',
    code: 'COUPLE4499',
    title: 'The Couple Retreat',
    eyebrow: 'FOR TWO',
    description: 'A shared spa ritual plus two foot-spa sessions, subject to room and therapist availability.',
    items: [service('couples').name, 'Two ' + service('foot-spa').name + ' sessions'],
    regularPrice: 4997, offerPrice: 4499, savings: 498,
    image: service('couples').image, kind: 'treatment'
  },
  {
    id: 'deep-unwind',
    code: 'UNWIND3299',
    title: 'The Deep Unwind',
    eyebrow: 'LONGER SPA ESCAPE',
    description: 'A warm-stone ritual paired with aromatic-oil massage for a longer spa break.',
    items: [service('hot-stone').name, service('aromatherapy').name],
    regularPrice: 3798, offerPrice: 3299, savings: 499,
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
