export const B={name:'The Elite Spa Centre',phone:'+919199561258',address:'Ground Floor, Vascon Mariplex Mall, Cybage Tower Rd, next to Taco Bell, Marigold Complex, Kalyani Nagar, Pune, Maharashtra 411014',hours:'Every day · 7:00 AM – 2:00 AM',maps:'https://maps.app.goo.gl/8PpKLABUKdKyjYdv6'};
const pex=(id)=>'https://images.pexels.com/photos/'+id+'/pexels-photo-'+id+'.jpeg?w=1200';
const uns=(id)=>'https://images.unsplash.com/'+id+'?auto=format&fit=crop&w=1200&q=85';
export const S=[
['signature-relaxation','Signature Relaxation Massage','60 min',999,'Massage',pex(5240675)],
['swedish','Swedish Massage','60 min',1499,'Massage',uns('photo-1544161515-4ab6ce6db874')],
['deep-tissue','Deep Tissue Massage','60 min',1799,'Massage',uns('photo-1600334129128-685c5582fd35')],
['aromatherapy','Aromatherapy Massage','60 min',1599,'Massage',pex(7795767)],
['hot-stone','Hot Stone Massage','75 min',2199,'Massage','https://images.pexels.com/photos/36593691/pexels-photo-36593691.jpeg?w=1200'],
['balinese','Balinese Massage','60 min',1899,'Massage',uns('photo-1519823551278-64ac92734fb1')],
['thai','Thai Yoga Massage','60 min',1799,'Massage',uns('photo-1571019613454-1cb2f99b2d8b')],
['sports-recovery','Sports Recovery Massage','60 min',1999,'Massage',uns('photo-1517836357463-d25dfeac3438')],
['couples','Couple Spa Ritual','60 min',2999,'Couples',uns('photo-1529636798458-92182e662485')],
['head-shoulder','Head, Neck & Shoulder','30 min',699,'Express',uns('photo-1599447421416-3414500d18a5')],
['foot-reflexology','Foot Reflexology','30 min',599,'Express','https://images.pexels.com/photos/6628700/pexels-photo-6628700.jpeg?w=1200'],
['back-relief','Back & Neck Massage','30 min',799,'Express',uns('photo-1600334129128-685c5582fd35')],
['prenatal','Prenatal Wellness Massage','45 min',1499,'Specialised',uns('photo-1531983412531-1f49a365ffed')],
['lymphatic','Gentle Lymphatic Wellness','45 min',1499,'Specialised',uns('photo-1570172619644-dfd03ed5d881')],
['body-polish','Full Body Polish','60 min',1699,'Body Care',uns('photo-1608248543803-ba4f8c70ae0b')],
['body-scrub','Body Scrub Ritual','45 min',1299,'Body Care',uns('photo-1601049541289-9b1b7bbbfe19')],
['body-wrap','Hydrating Body Wrap','60 min',1899,'Body Care',uns('photo-1596755389378-c31d21fd1273')],
['foot-spa','Luxury Foot Spa','45 min',999,'Body Care','https://images.pexels.com/photos/8021144/pexels-photo-8021144.jpeg?w=1200'],
['facial','Signature Glow Facial','60 min',1499,'Skin Care',uns('photo-1570172619644-dfd03ed5d881')],
['four-hand','Four-Hand Relaxation','60 min',2999,'Premium',uns('photo-1540555700478-4be289fbecef')],
['executive-reset','Executive Reset','45 min',1299,'Premium',uns('photo-1596178065887-1198b6148b2b')],
['abhyanga','Ayurvedic-Inspired Abhyanga','60 min',1799,'Massage',pex(7795767)],
['herbal-potli','Herbal Potli Massage','60 min',1999,'Massage',uns('photo-1600334129128-685c5582fd35')],
['candle','Warm Candle Oil Massage','60 min',1899,'Massage',pex(7795767)],
['scalp','Scalp & Hair Spa Ritual','45 min',1199,'Skin Care',uns('photo-1608248543803-ba4f8c70ae0b')],
['mini-reset','Mini Relaxation Session','20 min',499,'Express',uns('photo-1544161515-4ab6ce6db874')]
].map(([slug,name,duration,price,category,image])=>({slug,name,duration,price,category,image,description:name+' wellness ritual with professional consultation, comfort preferences and clear treatment boundaries.'}));
const products=[
['Aromatherapy Massage Oil · 500 ml',599,'Massage Oils'],['Sandalwood Massage Oil · 210 ml',249,'Massage Oils'],['Lavender Massage Oil · 210 ml',410,'Massage Oils'],['Coconut Massage Oil · 500 ml',499,'Massage Oils'],['Almond Massage Oil · 200 ml',349,'Massage Oils'],['Jasmine Massage Oil · 200 ml',399,'Massage Oils'],['Rose Essential Oil · 15 ml',295,'Essential Oils'],['Lavender Essential Oil · 15 ml',349,'Essential Oils'],['Peppermint Essential Oil · 15 ml',299,'Essential Oils'],['Eucalyptus Essential Oil · 15 ml',299,'Essential Oils'],['Tea Tree Essential Oil · 15 ml',329,'Essential Oils'],['Lemongrass Essential Oil · 15 ml',289,'Essential Oils'],['Aroma Diffuser',899,'Aromatherapy'],['Reed Diffuser Set',699,'Aromatherapy'],['Aromatherapy Candle',499,'Aromatherapy'],['Himalayan Pink Bath Salt · 500 g',299,'Bath & Soak'],['Lavender Epsom Salt · 500 g',349,'Bath & Soak'],['Rose Bath Soak',399,'Bath & Soak'],['Bath Bomb Set · 4 pcs',599,'Bath & Soak'],['Lemongrass Body Scrub · 200 g',799,'Body Scrubs'],['Coffee Body Scrub · 200 g',499,'Body Scrubs'],['Sugar Body Polish · 250 g',549,'Body Scrubs'],['Aloe Vera Body Gel',299,'Body Care'],['Aromatherapy Body Lotion',499,'Body Care'],['Shea Butter Body Cream',599,'Body Care'],['Hydrating Body Butter',649,'Body Care'],['Vitamin C Face Serum',699,'Skin Care'],['Hyaluronic Face Serum',799,'Skin Care'],['Gentle Face Cleanser',399,'Skin Care'],['Hydrating Face Mask Pack',349,'Skin Care'],['Gua Sha Facial Tool',499,'Beauty Tools'],['Jade Face Roller',599,'Beauty Tools'],['Wooden Body Massage Roller',699,'Beauty Tools'],['Dry Body Brush',349,'Beauty Tools'],['Herbal Massage Potli · 250 g',350,'Spa Essentials'],['Spa Headband & Wristband Set',249,'Spa Essentials'],['Luxury Spa Gift Box',1499,'Gift Sets'],['Couple Wellness Gift Hamper',1999,'Gift Sets'],['Foot Soak Salt',399,'Foot Care'],['Foot Cream',299,'Foot Care']
];
const productImages=[
uns('photo-1608248543803-ba4f8c70ae0b'),pex(7795767),uns('photo-1596755389378-c31d21fd1273'),uns('photo-1608571423902-eed4a5ad8108'),uns('photo-1570172619644-dfd03ed5d881'),uns('photo-1601049541289-9b1b7bbbfe19'),pex(6724305),uns('photo-1598440947619-2c35fc9aa908')
];
export const P=products.map(([name,price,category],i)=>({name,price,category,image:productImages[i%productImages.length],id:'sku-'+(i+1)}));
