export interface ExpertProduct {
  profession: string;
  name: string;
  imgSrc: string;
  productLink: string;
  internalLink: string; // Added this new field
  price: string;
  features: string[];
}

export const ExpertData: ExpertProduct[] = [
  {
    profession: 'Leg Compression Massager',
    name: 'ITCPRL',
    imgSrc: 'https://m.media-amazon.com/images/I/71MsgtkbTRL._AC_SX569_.jpg',
    internalLink: '/blog/best-leg-compression-massager', // Added internal link
    price: '$99.99',
    features: [
      "3 pressure intensities",
      "Heat therapy",
      "Fits all sizes",
      "Full leg massager"
    ]
  },
  {
    profession: 'Red Light Therapy Facial Massager',
    name: 'Doset',
    imgSrc: 'https://m.media-amazon.com/images/I/71e7e75Ko5L._SX425_.jpg',
    internalLink: '/blog/best-red-light-therapy-facial-massager', // Added internal link
    price: '$39.99',
    features: [
      "Curved arc massage head",
      "Vibration, red light, heating",
      "USB Rechargable",
      "Better absorption of creams/serums"
    ]
  },
  {
    profession: 'Sleep Aid Device',
    name: 'Magicteam',
    imgSrc: 'https://m.media-amazon.com/images/I/71GiXGIsylL._AC_SX679_.jpg',
    internalLink: '/blog/best-sleep-aid-device', // Added internal link
    price: '$21.99',
    features: [
      "20 non-looping sleep sounds",
      "32 volume levels",
      "Timer and memory settings",
      "Adults and kids"
    ]
  },
  {
    profession: 'Pain Management for Back Pain',
    name: 'Guganas',
    imgSrc: 'https://m.media-amazon.com/images/I/717M05QlZKL._AC_SX569_.jpg',
    internalLink: '/blog/best-device-for-back-pain-management', // Added internal link
    price: '$118.59',
    features: [
      "Smart airbag traction",
      "3-level heat",
      "20 electrotherapy levels",
      "Like a professional back cracker"
    ]
  }
];

export interface ProductFeature {
  imgSrc: string;
  heading: string;
  subheading: string;
}

export const FeaturesData: ProductFeature[] = [
  {
    imgSrc: '/images/wellness1.jpg',
    heading: "Massage",
    subheading: "Relieve tension",
  },
  {
    imgSrc: '/images/wellness6.jpg',
    heading: "Lymph Flow",
    subheading: "Reduce appearance of cellulite",
  },
  {
    imgSrc: '/images/wellness12.jpg',
    heading: "Skin Glow",
    subheading: "Get glowing skin",
  },
  {
    imgSrc: '/images/wellness3.jpg',
    heading: "Pain Relief",
    subheading: "Relieve pain in specific areas",
  }
];