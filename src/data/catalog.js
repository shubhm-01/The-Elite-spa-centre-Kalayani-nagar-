export const B = {
  name: 'The Elite Spa Centre',
  phone: '+919199561258',
  phoneDisplay: '+91 91995 61258',
  whatsappNumber: '919199561258',
  streetAddress: 'Ground Floor, Vascon Mariplex Mall, Cybage Tower Road, next to Taco Bell, Marigold Complex, Kalyani Nagar',
  shortAddress: 'Vascon Mariplex Mall, Cybage Tower Road, next to Taco Bell, Kalyani Nagar, Pune 411014',
  address: 'Ground Floor, Vascon Mariplex Mall, Cybage Tower Road, next to Taco Bell, Marigold Complex, Kalyani Nagar, Pune, Maharashtra 411014',
  postalCode: '411014',
  latitude: 18.5457,
  longitude: 73.9066,
  hours: '8:00 AM – 3:00 AM',
  hoursFull: 'Open Daily 8:00 AM – 3:00 AM',
  maps: 'https://maps.google.com/maps?cid=684197034070702602',
  heroPoster: 'https://images.pexels.com/photos/7031704/pexels-photo-7031704.jpeg?auto=compress&cs=tinysrgb&w=1600',
  heroVideos: [
    'https://videos.pexels.com/video-files/5793219/5793219-uhd_2560_1440_25fps.mp4',
    'https://videos.pexels.com/video-files/6750877/6750877-hd_1920_1080_25fps.mp4',
    'https://cdn.pixabay.com/video/2015/09/06/701-138504820_medium.mp4'
  ]
};

export function whatsappUrl(message) {
  return `https://wa.me/${B.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

const serviceImages = {
  'signature-relaxation': 'https://images.pexels.com/photos/3881009/pexels-photo-3881009.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'swedish': 'https://images.pexels.com/photos/3865792/pexels-photo-3865792.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'deep-tissue': 'https://images.pexels.com/photos/5793808/pexels-photo-5793808.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'aromatherapy': 'https://images.pexels.com/photos/6621442/pexels-photo-6621442.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'hot-stone': 'https://images.pexels.com/photos/5240636/pexels-photo-5240636.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'balinese': 'https://images.pexels.com/photos/6560282/pexels-photo-6560282.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'thai': 'https://images.pexels.com/photos/34821383/pexels-photo-34821383/free-photo-of-thai-massage-therapy-session-for-health-and-relaxation.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'sports-recovery': 'https://images.pexels.com/photos/29807420/pexels-photo-29807420/free-photo-of-professional-sports-massage-therapy-session.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'couples': 'https://images.pexels.com/photos/7365442/pexels-photo-7365442.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'head-shoulder': 'https://images.pexels.com/photos/6629549/pexels-photo-6629549.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'foot-reflexology': 'https://images.pexels.com/photos/4599388/pexels-photo-4599388.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'back-relief': 'https://images.pexels.com/photos/16246680/pexels-photo-16246680/free-photo-of-woman-hands-on-man-back-during-massage.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'prenatal': 'https://images.pexels.com/photos/19666196/pexels-photo-19666196/free-photo-of-pregnant-woman-relaxing-in-a-massage-parlour.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'lymphatic': 'https://images.pexels.com/photos/5888094/pexels-photo-5888094.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'body-polish': 'https://images.pexels.com/photos/9589409/pexels-photo-9589409.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'body-scrub': 'https://images.pexels.com/photos/7795646/pexels-photo-7795646.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'body-wrap': 'https://images.pexels.com/photos/18127464/pexels-photo-18127464/free-photo-of-hands-of-a-masseur-wrapping-a-leg.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'foot-spa': 'https://images.pexels.com/photos/5240679/pexels-photo-5240679.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'facial': 'https://images.pexels.com/photos/7446667/pexels-photo-7446667.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'four-hand': 'https://images.pexels.com/photos/5888081/pexels-photo-5888081.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'executive-reset': 'https://images.pexels.com/photos/7598366/pexels-photo-7598366.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'abhyanga': 'https://images.pexels.com/photos/7239303/pexels-photo-7239303.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'herbal-potli': 'https://images.pexels.com/photos/6187852/pexels-photo-6187852.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'candle': 'https://images.pexels.com/photos/6628531/pexels-photo-6628531.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'scalp': 'https://images.pexels.com/photos/23349908/pexels-photo-23349908/free-photo-of-a-hairdresser-washing-womans-hair.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'mini-reset': 'https://images.pexels.com/photos/6899538/pexels-photo-6899538.jpeg?auto=compress&cs=tinysrgb&w=1200'
};

const serviceVideos = {
  'signature-relaxation': { src: 'https://videos.pexels.com/video-files/5793219/5793219-uhd_2560_1440_25fps.mp4' },
  'swedish': { src: 'https://videos.pexels.com/video-files/5793212/5793212-uhd_2560_1440_25fps.mp4' },
  'deep-tissue': { src: 'https://videos.pexels.com/video-files/5793210/5793210-uhd_2560_1440_25fps.mp4' },
  'aromatherapy': { src: 'https://videos.pexels.com/video-files/6629661/6629661-uhd_1440_2732_25fps.mp4' },
  'hot-stone': { src: 'https://videos.pexels.com/video-files/6750877/6750877-hd_1920_1080_25fps.mp4' },
  'thai': { src: 'https://videos.pexels.com/video-files/14896248/14896248-hd_1080_1920_30fps.mp4' },
  'head-shoulder': { src: 'https://videos.pexels.com/video-files/6628566/6628566-uhd_2732_1440_25fps.mp4' },
  'foot-reflexology': { src: 'https://videos.pexels.com/video-files/7754519/7754519-hd_1920_1080_30fps.mp4' },
  'back-relief': { src: 'https://videos.pexels.com/video-files/6629704/6629704-uhd_1440_2732_25fps.mp4' },
  'body-scrub': { src: 'https://videos.pexels.com/video-files/9154529/9154529-uhd_2732_1440_25fps.mp4' },
  'facial': { src: 'https://videos.pexels.com/video-files/31797385/13546189_1080_1920_60fps.mp4' },
  'herbal-potli': { src: 'https://videos.pexels.com/video-files/6629915/6629915-uhd_1440_2732_25fps.mp4' },
  'candle': { src: 'https://videos.pexels.com/video-files/6628247/6628247-uhd_1440_2732_25fps.mp4' }
};

// Concise, punchy 1-sentence benefits (10-15 words max) for effortless luxury legibility
const serviceDescriptions = {
  'signature-relaxation': 'Long, flowing full-body strokes with warm botanical oil to melt away daily fatigue.',
  'swedish': 'Classic rhythmic kneading tailored to your comfort to boost circulation and restore calm.',
  'deep-tissue': 'Slow, deliberate myofascial pressure targeting stubborn knots and deep muscular stiffness.',
  'aromatherapy': 'Pure lavender, sandalwood, and eucalyptus oil blends paired with soothing full-body strokes.',
  'hot-stone': 'Heated volcanic basalt stones glide along tense muscles for profound radiant warmth.',
  'balinese': 'Gentle island stretches, acupressure, and warm aromatic oils for total mind-body harmony.',
  'thai': 'Assisted passive yoga stretching and rhythmic compressions to unlock deep joint mobility.',
  'sports-recovery': 'Focused recovery bodywork that flushes fatigue and speeds post-workout muscular repair.',
  'couples': 'Synchronized side-by-side full-body therapies inside a private, candlelit sanctuary for two.',
  'head-shoulder': 'Targeted scalp, temple, neck, and shoulder relief that erases heavy screen fatigue.',
  'foot-reflexology': 'Precision acupressure across key foot zones to calm the nervous system instantly.',
  'back-relief': 'Concentrated spinal and shoulder decompression crafted for fast upper-back tension release.',
  'prenatal': 'Nurturing side-lying maternity bodywork with gentle support to ease lower-back strain.',
  'lymphatic': 'Feather-light rhythmic drainage strokes that reduce fluid retention and leave you lighter.',
  'body-polish': 'Fine-grain botanical exfoliation and deep hydration that reveals velvet-smooth, luminous skin.',
  'body-scrub': 'Mineral-rich aromatic scrub therapy to buff away dullness and deeply soften skin.',
  'body-wrap': 'Cocooning botanical mask that replenishes moisture and restores supple, glowing skin.',
  'foot-spa': 'Warm herbal soak, mineral exfoliation, and lower-leg massage for effortless grounding.',
  'facial': 'Deep cleanse, lymphatic facial sculpting, and botanical hydration for immediate radiance.',
  'four-hand': 'Two master therapists move in mirrored harmony for an enveloping sensory escape.',
  'executive-reset': 'Focused 45-minute back, neck, and scalp recalibration built for demanding workdays.',
  'abhyanga': 'Traditional warm Ayurvedic herbal oil therapy to deeply nourish and ground energy.',
  'herbal-potli': 'Warm hand-tied aromatic herbal poultices pressed rhythmically along tight muscles.',
  'candle': 'Warm melted soy and shea butter candle oil poured gently for ultra-silky relaxation.',
  'scalp': 'Nourishing warm oil scalp massage and botanical ritual to dissolve cranial tension.',
  'mini-reset': 'A focused 30-minute sanctuary pause targeting your chosen area of stress.'
};

export const SERVICE_PRICING = {
  basePrice: 999,
  baseMinutes: 60,
  additionalMinutes: 30,
  additionalPrice: 400,
  couplesBasePrice: 1999,
  fourHandBasePrice: 1499,
  expressBasePrice: 699
};

export function getServicePrice(slug, duration) {
  if (slug === 'couples') {
    const minutes = Number.parseInt(duration, 10) || 60;
    const extraBlocks = Math.ceil(Math.max(0, minutes - 60) / 30);
    return SERVICE_PRICING.couplesBasePrice + extraBlocks * SERVICE_PRICING.additionalPrice;
  }
  if (slug === 'four-hand') {
    const minutes = Number.parseInt(duration, 10) || 60;
    const extraBlocks = Math.ceil(Math.max(0, minutes - 60) / 30);
    return SERVICE_PRICING.fourHandBasePrice + extraBlocks * SERVICE_PRICING.additionalPrice;
  }
  if (['foot-reflexology', 'head-shoulder', 'back-relief', 'mini-reset'].includes(slug)) {
    return SERVICE_PRICING.expressBasePrice;
  }
  const minutes = Number.parseInt(duration, 10) || SERVICE_PRICING.baseMinutes;
  const extraBlocks = Math.ceil(Math.max(0, minutes - SERVICE_PRICING.baseMinutes) / SERVICE_PRICING.additionalMinutes);
  return SERVICE_PRICING.basePrice + extraBlocks * SERVICE_PRICING.additionalPrice;
}

/** @type {Array<[string, string, string, string, string[], boolean]>} */
const rawServices = [
  ['signature-relaxation', 'Signature Relaxation Massage', '60 Min', 'Massage', ['Deep Stress Relief'], true],
  ['deep-tissue', 'Deep Tissue Massage', '60 Min', 'Massage', ['Deep Stress Relief'], true],
  ['couples', 'Couples Spa Ritual', '60 Min', 'Couples', ['Couples Sanctuary'], true],
  ['aromatherapy', 'Aromatherapy Massage', '60 Min', 'Massage', ['Deep Stress Relief', 'Couples Sanctuary'], true],
  ['foot-reflexology', 'Express Foot Reflexology', '30–45 Min', 'Express', ['Express 30-Min'], true],
  ['facial', 'Signature Glow Facial', '60 Min', 'Skin Care', ['Body & Skin Care'], true],
  ['swedish', 'Swedish Massage', '60 Min', 'Massage', ['Deep Stress Relief'], false],
  ['hot-stone', 'Hot Stone Massage', '75 Min', 'Massage', ['Deep Stress Relief'], false],
  ['balinese', 'Balinese Massage', '60 Min', 'Massage', ['Deep Stress Relief'], false],
  ['body-polish', 'Full Body Polish', '60 Min', 'Body Care', ['Body & Skin Care'], false],
  ['head-shoulder', 'Head, Neck & Shoulder', '30 Min', 'Express', ['Express 30-Min'], false],
  ['candle', 'Warm Candle Oil Massage', '60 Min', 'Massage', ['Couples Sanctuary', 'Deep Stress Relief'], false],
  ['thai', 'Thai Yoga Massage', '60 Min', 'Massage', ['Deep Stress Relief'], false],
  ['sports-recovery', 'Sports Recovery Massage', '60 Min', 'Massage', ['Deep Stress Relief'], false],
  ['back-relief', 'Back & Neck Relief', '30 Min', 'Express', ['Express 30-Min'], false],
  ['prenatal', 'Prenatal Wellness Massage', '45 Min', 'Specialised', ['Body & Skin Care'], false],
  ['lymphatic', 'Gentle Lymphatic Wellness', '45 Min', 'Specialised', ['Body & Skin Care'], false],
  ['body-scrub', 'Body Scrub Ritual', '45 Min', 'Body Care', ['Body & Skin Care'], false],
  ['body-wrap', 'Hydrating Body Wrap', '60 Min', 'Body Care', ['Body & Skin Care'], false],
  ['foot-spa', 'Luxury Foot Spa', '45 Min', 'Body Care', ['Body & Skin Care', 'Express 30-Min'], false],
  ['four-hand', 'Four-Hand Royal Ritual', '60 Min', 'Premium', ['Couples Sanctuary', 'Deep Stress Relief'], false],
  ['executive-reset', 'Executive Reset', '45 Min', 'Premium', ['Express 30-Min'], false],
  ['abhyanga', 'Ayurvedic Abhyanga Ritual', '60 Min', 'Massage', ['Deep Stress Relief'], false],
  ['herbal-potli', 'Herbal Potli Massage', '60 Min', 'Massage', ['Deep Stress Relief'], false],
  ['scalp', 'Scalp & Hair Spa Ritual', '45 Min', 'Skin Care', ['Body & Skin Care'], false],
  ['mini-reset', 'Mini Express Pause', '30 Min', 'Express', ['Express 30-Min'], false]
];

export const S = rawServices.map(([slug, name, duration, category, moods, featuredOnHome]) => {
  const price = getServicePrice(slug, duration);
  const priceQualifier = slug === 'couples'
    ? 'Per Couple'
    : slug === 'four-hand'
      ? 'Two Therapists'
      : 'Per Guest';
  return {
    slug,
    name,
    duration,
    price,
    priceQualifier,
    pricingNote: 'Extend any 60-minute session by +₹400 per extra 30 minutes (90 Min ₹1,399 · 120 Min ₹1,799).',
    category,
    moods,
    featuredOnHome,
    image: serviceImages[slug],
    video: serviceVideos[slug]?.src,
    videoPoster: serviceImages[slug],
    description: serviceDescriptions[slug]
  };
});

export const SENSORY_GALLERY = [
  {
    id: 'suite-candle',
    categoryTag: '01 · Candlelit Suite',
    title: 'Candlelit Private Suites',
    image: 'https://images.pexels.com/photos/11774389/pexels-photo-11774389.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    id: 'architectural-room',
    categoryTag: '02 · Treatment Chamber',
    title: 'Serene Treatment Chambers',
    image: 'https://images.pexels.com/photos/35546242/pexels-photo-35546242/free-photo-of-modern-spa-treatment-room-with-elegant-design.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    id: 'basalt-stones',
    categoryTag: '03 · Basalt Therapy',
    title: 'Volcanic Basalt Stone Rituals',
    image: 'https://images.pexels.com/photos/36593691/pexels-photo-36593691.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    id: 'botanical-oils',
    categoryTag: '04 · Pure Botanicals',
    title: 'Warm Botanical Infusions',
    image: 'https://images.pexels.com/photos/7795767/pexels-photo-7795767.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    id: 'tranquil-sanctuary',
    categoryTag: '05 · Arrival Lounge',
    title: 'Tranquil Arrival Lounge',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'velvet-linen',
    categoryTag: '06 · Linen & Steam',
    title: 'Sensory Linen & Steam',
    image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'foot-sanctuary',
    categoryTag: '07 · Foot Sanctuary',
    title: 'Reflexology & Foot Sanctuary',
    image: 'https://images.pexels.com/photos/8021144/pexels-photo-8021144.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    id: 'muscle-restoration',
    categoryTag: '08 · Master Bodywork',
    title: 'Master-Led Bodywork',
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1200&q=85'
  }
];

export const SANCTUARY_PROMISE = [
  {
    id: 'hygiene',
    icon: 'sparkles',
    title: '100% Hygienic & Sanitized',
    description: 'Freshly laundered cotton linens, sanitized suites, and sealed botanical oils prepared anew before every guest.'
  },
  {
    id: 'therapists',
    icon: 'award',
    title: 'Certified & Skilled Therapists',
    description: 'Trained wellness professionals attentive to your preferred pressure, focus areas, and complete comfort.'
  },
  {
    id: 'location',
    icon: 'shield',
    title: 'Safe Mall Location & Parking',
    description: 'Secure Ground Floor sanctuary inside Vascon Mariplex Mall with well-lit access and complimentary parking till 3:00 AM.'
  },
  {
    id: 'privacy',
    icon: 'lock',
    title: 'Complete Privacy',
    description: 'Acoustic soundproofing and private candlelit chambers designed for unhurried calm for solo guests and couples.'
  }
];

export const GUEST_REVIEWS = [
  {
    name: 'Aarav Kulkarni',
    location: 'Kalyani Nagar, Pune',
    ritual: '90-Min Deep Tissue · 11:30 PM',
    rating: '5.0',
    quote: 'Walking into a candlelit suite at 11:30 PM after late client calls is unmatched in Pune. My lower-back stiffness vanished after one 90-minute Deep Tissue session.'
  },
  {
    name: 'Meera & Siddharth Deshmukh',
    location: 'Koregaon Park, Pune',
    ritual: 'The Couple Retreat',
    rating: '5.0',
    quote: 'Booked the Couple Retreat on WhatsApp in two minutes. Spotless suites, warm aromatic oils, and attentive therapists who customized our pressure perfectly.'
  },
  {
    name: 'Rohan Malhotra',
    location: 'Viman Nagar, Pune',
    ritual: 'Late-Night Signature Relaxation',
    rating: '4.9',
    quote: 'Landed at Pune Airport past midnight and headed straight to Vascon Mariplex Mall. Starting at ₹999 for this level of calm and hygiene makes it my go-to sanctuary.'
  },
  {
    name: 'Ananya Joshi',
    location: 'Kharadi, Pune',
    ritual: 'The Glow Ritual & Reflexology',
    rating: '5.0',
    quote: 'Feels genuinely five-star without pretense. The Signature Glow Facial paired with the botanical scrub left my skin luminous for days.'
  },
  {
    name: 'Vikramaditya Nair',
    location: 'Magarpatta, Pune',
    ritual: '75-Min Hot Stone Therapy',
    rating: '4.9',
    quote: 'Warm volcanic stones and sandalwood oil melted weeks of travel fatigue. Effortless mall parking and instant WhatsApp slot confirmation.'
  }
];

export const FAQS = [
  {
    question: 'How quickly can I reserve a private suite?',
    answer: 'Simply choose your guests, duration, and time in our Quick Ritual Builder or tap Book on WhatsApp. Our concierge welcomes you with instant suite confirmation within minutes — even for late-night visits.'
  },
  {
    question: 'Is late-night visiting safe and comfortable for solo guests and couples?',
    answer: 'Yes. We are located on the Ground Floor of Vascon Mariplex Mall with round-the-clock security, well-lit complimentary parking, and quiet private suites open nightly until 3:00 AM.'
  },
  {
    question: 'How does pricing work if I want to extend my session?',
    answer: 'Signature 60-minute full-body rituals start at ₹999, with unhurried 30-minute extensions at +₹400 (90 Mins ₹1,399 · 120 Mins ₹1,799). Couples rituals start at ₹1,999 and express reflexology at ₹699.'
  },
  {
    question: 'Can my therapist tailor the pressure and warm oils to my mood?',
    answer: 'Of course. Every visit opens with a brief personal welcome where you select light, medium, or firm pressure, focus zones, and your favorite warm botanical essential oil blend.'
  },
  {
    question: 'Do I need to bring anything with me for my ritual?',
    answer: 'Nothing at all — simply arrive and exhale. Freshly laundered linens, plush robes, warm herbal tea, and sanitized shower amenities await inside your suite.'
  }
];

/** @type {Array<[string, number, string]>} */
const products = [
  ['Aromatherapy Massage Oil · 500 ml', 599, 'Massage Oils'],
  ['Sandalwood Massage Oil · 210 ml', 249, 'Massage Oils'],
  ['Lavender Massage Oil · 210 ml', 410, 'Massage Oils'],
  ['Coconut Massage Oil · 500 ml', 499, 'Massage Oils'],
  ['Almond Massage Oil · 200 ml', 349, 'Massage Oils'],
  ['Jasmine Massage Oil · 200 ml', 399, 'Massage Oils'],
  ['Rose Essential Oil · 15 ml', 295, 'Essential Oils'],
  ['Lavender Essential Oil · 15 ml', 349, 'Essential Oils'],
  ['Peppermint Essential Oil · 15 ml', 299, 'Essential Oils'],
  ['Eucalyptus Essential Oil · 15 ml', 299, 'Essential Oils'],
  ['Tea Tree Essential Oil · 15 ml', 329, 'Essential Oils'],
  ['Lemongrass Essential Oil · 15 ml', 289, 'Essential Oils'],
  ['Aroma Diffuser', 899, 'Aromatherapy'],
  ['Reed Diffuser Set', 699, 'Aromatherapy'],
  ['Aromatherapy Candle', 499, 'Aromatherapy'],
  ['Himalayan Pink Bath Salt · 500 g', 299, 'Bath & Soak'],
  ['Lavender Epsom Salt · 500 g', 349, 'Bath & Soak'],
  ['Rose Bath Soak', 399, 'Bath & Soak'],
  ['Bath Bomb Set · 4 pcs', 599, 'Bath & Soak'],
  ['Lemongrass Body Scrub · 200 g', 799, 'Body Scrubs'],
  ['Coffee Body Scrub · 200 g', 499, 'Body Scrubs'],
  ['Sugar Body Polish · 250 g', 549, 'Body Scrubs'],
  ['Aloe Vera Body Gel', 299, 'Body Care'],
  ['Aromatherapy Body Lotion', 499, 'Body Care'],
  ['Shea Butter Body Cream', 599, 'Body Care'],
  ['Hydrating Body Butter', 649, 'Body Care'],
  ['Vitamin C Face Serum', 699, 'Skin Care'],
  ['Hyaluronic Face Serum', 799, 'Skin Care'],
  ['Gentle Face Cleanser', 399, 'Skin Care'],
  ['Hydrating Face Mask Pack', 349, 'Skin Care'],
  ['Gua Sha Facial Tool', 499, 'Beauty Tools'],
  ['Jade Face Roller', 599, 'Beauty Tools'],
  ['Wooden Body Massage Roller', 699, 'Beauty Tools'],
  ['Dry Body Brush', 349, 'Beauty Tools'],
  ['Herbal Massage Potli · 250 g', 350, 'Spa Essentials'],
  ['Spa Headband & Wristband Set', 249, 'Spa Essentials'],
  ['Luxury Spa Gift Box', 1499, 'Gift Sets'],
  ['Couple Wellness Gift Hamper', 1999, 'Gift Sets'],
  ['Foot Soak Salt', 399, 'Foot Care'],
  ['Foot Cream', 299, 'Foot Care'],
  ['Botanical Room & Linen Mist · 100 ml', 549, 'Home Fragrance'],
  ['Natural Loofah Bath Sponge', 249, 'Bath Accessories'],
  ['Signature Spa Bathrobe', 1299, 'Spa Essentials'],
  ['Plush Spa Towel Set', 699, 'Spa Essentials'],
  ['Hand & Foot Repair Cream · 100 ml', 349, 'Foot Care'],
  ['Facial Cleansing Brush', 399, 'Beauty Tools'],
  ['Jade & Gua Sha Ritual Set', 699, 'Beauty Tools'],
  ['At-home Spa Gift Hamper', 1799, 'Gift Sets'],
  ['Aromatherapy Candle Duo', 499, 'Aromatherapy']
];

const productImages = [
  'https://images.pexels.com/photos/6693959/pexels-photo-6693959.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/40557461/pexels-photo-40557461/free-photo-of-elegant-flat-lay-of-olive-oil-dropper-bottle.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/6693968/pexels-photo-6693968.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/3865678/pexels-photo-3865678.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/7797743/pexels-photo-7797743.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/11741336/pexels-photo-11741336.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/6694147/pexels-photo-6694147.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/7795759/pexels-photo-7795759.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/6724384/pexels-photo-6724384.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/12256510/pexels-photo-12256510.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/3865695/pexels-photo-3865695.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/6724414/pexels-photo-6724414.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/7795827/pexels-photo-7795827.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/7795823/pexels-photo-7795823.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/15852128/pexels-photo-15852128/free-photo-of-gardenia-perfume-and-candle.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/11635428/pexels-photo-11635428.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/14438192/pexels-photo-14438192.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/18083316/pexels-photo-18083316/free-photo-of-salt-for-bathing-on-bathtub-edge.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/11635430/pexels-photo-11635430.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/6037892/pexels-photo-6037892.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/20421581/pexels-photo-20421581/free-photo-of-cream-jars-and-rose-on-wooden-table.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/36375335/pexels-photo-36375335/free-photo-of-strawberry-body-scrub-with-red-berries.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/15807396/pexels-photo-15807396/free-photo-of-fruit-cream-in-jar.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/6690879/pexels-photo-6690879.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/12572310/pexels-photo-12572310.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/9775222/pexels-photo-9775222.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/7797734/pexels-photo-7797734.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/31251033/pexels-photo-31251033/free-photo-of-minimalist-skincare-serum-bottle-flat-lay.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/8100816/pexels-photo-8100816.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/34939703/pexels-photo-34939703/free-photo-of-elegant-minimalist-skincare-product-flatlay.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/8903614/pexels-photo-8903614.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/3735620/pexels-photo-3735620.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/6417994/pexels-photo-6417994.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/10712764/pexels-photo-10712764.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/6560262/pexels-photo-6560262.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/6628528/pexels-photo-6628528.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/8015477/pexels-photo-8015477.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/30696651/pexels-photo-30696651/free-photo-of-relaxing-spa-basket-with-aromatherapy-and-massagers.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/11635423/pexels-photo-11635423.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/14890559/pexels-photo-14890559.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/6486620/pexels-photo-6486620.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/7262871/pexels-photo-7262871.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/22598409/pexels-photo-22598409/free-photo-of-top-view-of-neatly-folded-towels-and-a-bathrobe.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/6188050/pexels-photo-6188050.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/6476086/pexels-photo-6476086.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/6621434/pexels-photo-6621434.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/17555293/pexels-photo-17555293/free-photo-of-gift-box-on-a-table.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/6724359/pexels-photo-6724359.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/6563887/pexels-photo-6563887.jpeg?auto=compress&cs=tinysrgb&w=1200'
];

export const P = products.map(([name, price, category], index) => ({
  name,
  price,
  category,
  image: productImages[index % productImages.length],
  id: 'sku-' + (index + 1)
}));

// Clean 4-card featured Apothecary selection for homepage
export const FEATURED_SHOP_PRODUCTS = [
  P[0], // Aromatherapy Massage Oil ₹599
  P[1], // Sandalwood Massage Oil ₹249
  P[2], // Lavender Massage Oil ₹410
  P[3], // Coconut Massage Oil ₹499
];
