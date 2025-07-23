// data.ts
export interface ProductFeature {
  imgSrc: string;
  heading: string;
  subheading: string;
  path: string;
}

export interface ExpertProduct {
  profession: string;
  name: string;
  imgSrc: string;
  productLink: string;
  price: string;
  features: string[];
}

export const FeaturesData: ProductFeature[] = [
  {
    imgSrc: '/images/wellness11.jpg',
    heading: "Home Medical Equipment",
    subheading: "Medical equipment to aid the body and bodily functions",
    path: "/search/medical%20equipment"
  },
  {
    imgSrc: '/images/wellness5.jpg',
    heading: "Pain Management",
    subheading: "Ten machines and other devices for sciatica, back and neck pain",
    path: "/search/pain"
  },
  {
    imgSrc: '/images/wellness13.jpg',
    heading: "Skincare Devices",
    subheading: "Red light therapy and microcurrent devices for anti aging",
    path: "/search/skincare"
  },
  {
    imgSrc: '/images/wellness8.jpg',
    heading: "Stress Relief Methods",
    subheading: "Vagus nerve stimulators, massagers and sleep devices to help with stress reduction",
    path: "/search/stress"
  }
];

export const ExpertData: ExpertProduct[] = [
  {
    profession: 'Automatic Cat Feeder',
    name: 'PETLIBRO',
    imgSrc: 'https://m.media-amazon.com/images/I/41IyqubT+HL._SL500_.jpg',
    productLink: 'https://www.amazon.com/dp/B0B1TMLL3F/?tag=petgadgetinsider',
    price: '$69.99',
    features: [
      "Smart APP Control: Wi-Fi enabled for remote feeding",
      "10 meals per day with 1-48 portions per meal",
      "10-second voice recording for meal calls",
      "5L capacity with freshness preservation"
    ]
  },
  {
    profession: 'Automatic Feeder',
    name: 'IMIPAW',
    imgSrc: 'https://m.media-amazon.com/images/I/31smh+Fyk0L._SL500_.jpg',
    productLink: 'https://www.amazon.com/dp/B0BR5VST5N/?tag=petgadgetinsider',
    price: '$35.99',
    features: [
      "Programmable timed feeding",
      "3L/12 cup capacity",
      "Dual power supply (adapter + batteries)",
      "Easy to use LCD screen"
    ]
  },
  {
    profession: 'Automatic Feeder',
    name: 'VOLUAS',
    imgSrc: 'https://m.media-amazon.com/images/I/31FCol5w8TL._SL500_.jpg',
    productLink: 'https://www.amazon.com/dp/B09LD2CD1L/?tag=petgadgetinsider',
    price: '$54.99',
    features: [
      "4L/16.9 cup capacity",
      "Voice record meal call (10 seconds)",
      "1-4 meals with 0-40 portion choices",
      "Wired or battery power"
    ]
  },
  {
    profession: 'Dual Cat Feeder',
    name: 'oneisall',
    imgSrc: 'https://m.media-amazon.com/images/I/41IyqubT+HL._SL500_.jpg',
    path: "/blog/smart-app-best-automatic-cat-feeder-app-control",
    price: '$50.99',
    features: [
      "Designed for 2 cats (separate bowls)",
      "5L/20 cups capacity",
      "10-second voice recorder",
      "Up to 6 meals a day"
    ]
  }
];

// DIAGNOSTIC UTILITY (Add this to your homepage component)
/*
export const LinkDebugger = () => {
  useEffect(() => {
    const links = document.querySelectorAll('a[href*="amazon.com"]');
    links.forEach(link => {
      console.log(`Link text: ${link.textContent}`);
      console.log(`Original href: ${link.getAttribute('href')}`);
      console.log(`Resolved href: ${link.href}`);
      console.log('---');
    });
  }, []);

  return null;
};
*/