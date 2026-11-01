export const B = {
  name: 'The Elite Spa Centre',
  phone: '+919199561258',
  address: 'Ground Floor, Vascon Mariplex Mall, Cybage Tower Rd, next to Taco Bell, Marigold Complex, Kalyani Nagar, Pune, Maharashtra 411014',
  hours: 'Every day · 7:00 AM – 2:00 AM',
  maps: 'https://maps.app.goo.gl/8PpKLABUKdKyjYdv6'
};

const pex = (id) => 'https://images.pexels.com/photos/' + id + '/pexels-photo-' + id + '.jpeg?w=1200';
const uns = (id) => 'https://images.unsplash.com/' + id + '?auto=format&fit=crop&w=1200&q=85';

// Individually selected Pexels photographs. These are illustrative stock images, not photographs of this venue.
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

// Treatment previews are free-to-use Pexels clips; only services with relevant footage receive a player.
const serviceVideos = {
  'signature-relaxation': { src: 'https://videos.pexels.com/video-files/5793219/5793219-uhd_2560_1440_25fps.mp4', page: 'https://www.pexels.com/video/worker-giving-back-massage-5793219/', credit: 'Yan Krukau' },
  'swedish': { src: 'https://videos.pexels.com/video-files/5793212/5793212-uhd_2560_1440_25fps.mp4', page: 'https://www.pexels.com/video/woman-receiving-body-massage-5793212/', credit: 'Yan Krukau' },
  'deep-tissue': { src: 'https://videos.pexels.com/video-files/5793210/5793210-uhd_2560_1440_25fps.mp4', page: 'https://www.pexels.com/video/massagist-giving-a-body-massage-in-a-woman-5793210/', credit: 'Yan Krukau' },
  'aromatherapy': { src: 'https://videos.pexels.com/video-files/6629661/6629661-uhd_1440_2732_25fps.mp4', page: 'https://www.pexels.com/video/pouring-massage-oil-onto-the-back-6629661/', credit: 'KoolShooters' },
  'hot-stone': { src: 'https://videos.pexels.com/video-files/6750877/6750877-hd_1920_1080_25fps.mp4', page: 'https://www.pexels.com/video/person-having-a-hot-stone-massage-6750877/', credit: 'Anna Tarazevich' },
  'thai': { src: 'https://videos.pexels.com/video-files/14896248/14896248-hd_1080_1920_30fps.mp4', page: 'https://www.pexels.com/video/a-young-woman-receiving-a-thai-massage-14896248/', credit: '23 Audiovisual' },
  'head-shoulder': { src: 'https://videos.pexels.com/video-files/6628566/6628566-uhd_2732_1440_25fps.mp4', page: 'https://www.pexels.com/video/a-masseuse-giving-a-head-massage-to-a-woman-6628566/', credit: 'KoolShooters' },
  'foot-reflexology': { src: 'https://videos.pexels.com/video-files/7754519/7754519-hd_1920_1080_30fps.mp4', page: 'https://www.pexels.com/video/person-having-foot-massage-7754519/', credit: 'RDNE Stock project' },
  'back-relief': { src: 'https://videos.pexels.com/video-files/6629704/6629704-uhd_1440_2732_25fps.mp4', page: 'https://www.pexels.com/video/woman-getting-a-back-massage-6629704/', credit: 'KoolShooters' },
  'body-scrub': { src: 'https://videos.pexels.com/video-files/9154529/9154529-uhd_2732_1440_25fps.mp4', page: 'https://www.pexels.com/video/a-man-scrubbing-a-woman-s-back-using-green-leaves-9154529/', credit: 'Ron Lach' },
  'facial': { src: 'https://videos.pexels.com/video-files/31797385/13546189_1080_1920_60fps.mp4', page: 'https://www.pexels.com/video/relaxing-spa-facial-treatment-session-31797385/', credit: 'Татьяна Рогова' },
  'herbal-potli': { src: 'https://videos.pexels.com/video-files/6629915/6629915-uhd_1440_2732_25fps.mp4', page: 'https://www.pexels.com/video/a-woman-having-a-massage-6629915/', credit: 'Kaboompics' },
  'candle': { src: 'https://videos.pexels.com/video-files/6628247/6628247-uhd_1440_2732_25fps.mp4', page: 'https://www.pexels.com/video/woman-lighting-candles-6628247/', credit: 'KoolShooters' }
};

const serviceDescriptions = {
  'signature-relaxation': 'A 60-minute relaxation massage enquiry in Kalyani Nagar, Pune, with flowing movements and time to settle into a calmer pace. Tell the team your preferred pressure and areas to avoid before the session.',
  swedish: 'A 60-minute Swedish-style massage using familiar flowing massage movements. Discuss your pressure preference, comfort and any areas you would like the therapist to avoid when you request an appointment.',
  'deep-tissue': 'A 60-minute focused massage enquiry for guests who prefer firmer pressure. Pressure should remain comfortable; share your preferences and any relevant injuries or health concerns with the spa team before booking.',
  aromatherapy: 'A 60-minute aromatherapy massage enquiry combining a relaxing massage with aromatic oils. Ask which oils are available and mention any fragrance sensitivities or allergies before confirming.',
  'hot-stone': 'A 75-minute warm-stone relaxation ritual. Ask the team about stone temperature and suitability, and let the therapist know immediately if any warmth feels uncomfortable.',
  balinese: 'A 60-minute Balinese-inspired massage enquiry with flowing full-body movements. Your therapist can discuss pressure and comfort preferences before the session begins.',
  thai: 'A 60-minute Thai-inspired massage enquiry that may include assisted stretching and compression. Tell the team about your mobility, comfort and pressure preferences before requesting a session.',
  'sports-recovery': 'A 60-minute sports recovery massage enquiry for active guests. Share your activity level and preferred pressure; this is a wellness service and is not a substitute for assessment or treatment by a healthcare professional.',
  couples: 'A 60-minute couples spa enquiry for two guests. Each guest can discuss individual pressure and comfort preferences; confirm room availability and the final package price with the team.',
  'head-shoulder': 'A 30-minute head, neck and shoulder massage enquiry for a shorter wellness break. Tell the therapist about your pressure preference and any areas of discomfort before the session.',
  'foot-reflexology': 'A 30-minute foot massage and reflexology-style wellness enquiry. Share any foot sensitivity, skin concerns or health conditions with the spa team before confirming suitability.',
  'back-relief': 'A 30-minute back and neck massage enquiry focused on your preferred comfort and pressure. For persistent pain or an injury, seek advice from a qualified healthcare professional before booking.',
  prenatal: 'A 45-minute prenatal wellness enquiry only. Please consult your maternity healthcare professional first and ask the spa to confirm therapist training, positioning and suitability before requesting an appointment.',
  lymphatic: 'A 45-minute gentle lymphatic-style wellness enquiry. This service is not medical treatment; consult your healthcare professional and ask the spa to confirm qualifications and suitability before booking.',
  'body-polish': 'A 60-minute body polishing ritual enquiry. Ask which products and exfoliation options are available, and mention sensitive skin or known ingredient allergies before your visit.',
  'body-scrub': 'A 45-minute body scrub ritual enquiry using an exfoliating body-care product. Discuss skin sensitivity, preferred products and any ingredient allergies with the team before confirming.',
  'body-wrap': 'A 60-minute hydrating body wrap enquiry. Ask about the products used and share any skin sensitivities or ingredient allergies before the session.',
  'foot-spa': 'A 45-minute foot spa enquiry combining a relaxing foot-care ritual with time to unwind. Let the team know about skin sensitivity or foot concerns before confirming.',
  facial: 'A 60-minute facial skincare ritual enquiry. Ask which products are used and share your skin type, sensitivities and known allergies with the team before the appointment.',
  'four-hand': 'A 60-minute four-hand relaxation massage enquiry with two therapists. Confirm therapist availability and discuss pressure, draping and personal comfort preferences before booking.',
  'executive-reset': 'A 45-minute executive reset enquiry for a focused wellness break. Tell the team which areas you would like prioritised and your preferred pressure before the session.',
  abhyanga: 'A 60-minute Abhyanga-inspired oil massage enquiry drawing on a traditional wellness ritual. Ask which oils are available and mention allergies or sensitivities before confirming.',
  'herbal-potli': 'A 60-minute herbal potli massage enquiry using warm herbal pouches. Confirm pouch temperature and ingredients with the team, and mention any allergies or skin sensitivities.',
  candle: 'A 60-minute warm candle-oil massage enquiry. Ask which oils are used and confirm a comfortable temperature before the session; share any fragrance or ingredient sensitivities.',
  scalp: 'A 45-minute scalp and hair spa ritual enquiry. Ask about the products available and mention scalp sensitivities, skin conditions or ingredient allergies before booking.',
  'mini-reset': 'A 20-minute mini relaxation session for a shorter pause in your day. Tell the team which area you would like them to focus on and your preferred pressure.'
};

export const S = [
  ['signature-relaxation', 'Signature Relaxation Massage', '60 min', 999, 'Massage', pex(5240675)],
  ['swedish', 'Swedish Massage', '60 min', 1499, 'Massage', uns('photo-1544161515-4ab6ce6db874')],
  ['deep-tissue', 'Deep Tissue Massage', '60 min', 1799, 'Massage', uns('photo-1600334129128-685c5582fd35')],
  ['aromatherapy', 'Aromatherapy Massage', '60 min', 1599, 'Massage', pex(7795767)],
  ['hot-stone', 'Hot Stone Massage', '75 min', 2199, 'Massage', 'https://images.pexels.com/photos/36593691/pexels-photo-36593691.jpeg?w=1200'],
  ['balinese', 'Balinese Massage', '60 min', 1899, 'Massage', uns('photo-1519823551278-64ac92734fb1')],
  ['thai', 'Thai Yoga Massage', '60 min', 1799, 'Massage', uns('photo-1571019613454-1cb2f99b2d8b')],
  ['sports-recovery', 'Sports Recovery Massage', '60 min', 1999, 'Massage', uns('photo-1517836357463-d25dfeac3438')],
  ['couples', 'Couple Spa Ritual', '60 min', 2999, 'Couples', uns('photo-1529636798458-92182e662485')],
  ['head-shoulder', 'Head, Neck & Shoulder', '30 min', 699, 'Express', uns('photo-1599447421416-3414500d18a5')],
  ['foot-reflexology', 'Foot Reflexology', '30 min', 599, 'Express', 'https://images.pexels.com/photos/6628700/pexels-photo-6628700.jpeg?w=1200'],
  ['back-relief', 'Back & Neck Massage', '30 min', 799, 'Express', uns('photo-1600334129128-685c5582fd35')],
  ['prenatal', 'Prenatal Wellness Massage', '45 min', 1499, 'Specialised', uns('photo-1531983412531-1f49a365ffed')],
  ['lymphatic', 'Gentle Lymphatic Wellness', '45 min', 1499, 'Specialised', uns('photo-1570172619644-dfd03ed5d881')],
  ['body-polish', 'Full Body Polish', '60 min', 1699, 'Body Care', uns('photo-1608248543803-ba4f8c70ae0b')],
  ['body-scrub', 'Body Scrub Ritual', '45 min', 1299, 'Body Care', uns('photo-1601049541289-9b1b7bbbfe19')],
  ['body-wrap', 'Hydrating Body Wrap', '60 min', 1899, 'Body Care', uns('photo-1596755389378-c31d21fd1273')],
  ['foot-spa', 'Luxury Foot Spa', '45 min', 999, 'Body Care', 'https://images.pexels.com/photos/8021144/pexels-photo-8021144.jpeg?w=1200'],
  ['facial', 'Signature Glow Facial', '60 min', 1499, 'Skin Care', uns('photo-1570172619644-dfd03ed5d881')],
  ['four-hand', 'Four-Hand Relaxation', '60 min', 2999, 'Premium', uns('photo-1540555700478-4be289fbecef')],
  ['executive-reset', 'Executive Reset', '45 min', 1299, 'Premium', uns('photo-1596178065887-1198b6148b2b')],
  ['abhyanga', 'Ayurvedic-Inspired Abhyanga', '60 min', 1799, 'Massage', pex(7795767)],
  ['herbal-potli', 'Herbal Potli Massage', '60 min', 1999, 'Massage', uns('photo-1600334129128-685c5582fd35')],
  ['candle', 'Warm Candle Oil Massage', '60 min', 1899, 'Massage', pex(7795767)],
  ['scalp', 'Scalp & Hair Spa Ritual', '45 min', 1199, 'Skin Care', uns('photo-1608248543803-ba4f8c70ae0b')],
  ['mini-reset', 'Mini Relaxation Session', '20 min', 499, 'Express', uns('photo-1544161515-4ab6ce6db874')]
].map(([slug, name, duration, price, category, image]) => ({
  slug,
  name,
  duration,
  price,
  category,
  image: serviceImages[slug] || image,
  video: serviceVideos[slug]?.src,
  videoPage: serviceVideos[slug]?.page,
  videoCredit: serviceVideos[slug]?.credit,
  videoPoster: serviceImages[slug] || image,
  description: serviceDescriptions[slug] || name + ' at The Elite Spa Centre in Kalyani Nagar, Pune. Discuss your preferences and suitability with the team before requesting an appointment.'
}));

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
  ['Foot Cream', 299, 'Foot Care']
];

const productImages = [
  uns('photo-1608248543803-ba4f8c70ae0b'),
  pex(7795767),
  uns('photo-1596755389378-c31d21fd1273'),
  uns('photo-1608571423902-eed4a5ad8108'),
  uns('photo-1570172619644-dfd03ed5d881'),
  uns('photo-1601049541289-9b1b7bbbfe19'),
  pex(6724305),
  uns('photo-1598440947619-2c35fc9aa908')
];

export const P = products.map(([name, price, category], index) => ({
  name,
  price,
  category,
  image: productImages[index % productImages.length],
  id: 'sku-' + (index + 1)
}));
