export const destinations = [
  {
    id: "india",
    name: "India",
    tagline: "One word for diversity.",
    description:
      "Home to graciousness with a hearty adherence to tradition, India is one word for diversity. From the snow-crowned Himalayas to the ocean, ancient temples to modern cities, India has the competence of beguiling all your five senses.",
    heroImage:"https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1800&q=85",
    heroImagePublicId: "destinations/india-hero",
    category: [
      {
        id: "north-india",
        name: "North India",
        tagline: "Majestic mountains, royal legacies.",
        description:
          "Banded together by the snow-crowned Himalayas and blessed by the Ganges, North India charms with royal palaces, the Taj Mahal, and the ancient step wells of Rajasthan.",
        heroImage: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da",
        heroImagePublicId: "tour-categories/north-india-hero",
        destinations: ["india"],
        destinations_gallery: [
          {
            url: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da",
            caption: "Amber Fort, Rajasthan",
            publicId: "tour-categories/north-india/gallery-1",
          },
          {
            url: "https://images.unsplash.com/photo-1564507592333-c60657eea523",
            caption: "Taj Mahal, Agra",
            publicId: "tour-categories/north-india/gallery-2",
          },
          {
            url: "https://images.unsplash.com/photo-1566837945700-30057527ade0",
            caption: "Dal Lake, Srinagar",
            publicId: "tour-categories/north-india/gallery-3",
          },
        ],
        package: [
          {
            id: "golden-triangle",
            name: "Golden Triangle Tour",
            duration: "6 Days / 5 Nights",
            price: 45000,
            image: "https://images.unsplash.com/photo-1564507592333-c60657eea523",
            summary: "Delhi, Agra, and Jaipur in one unforgettable trip.",
          },
          {
            id: "kashmir-tour",
            name: "Kashmir Paradise Tour",
            duration: "5 Days / 4 Nights",
            price: 38000,
            image: "https://images.unsplash.com/photo-1566837945700-30057527ade0",
            summary: "Srinagar, Gulmarg, and Pahalgam scenic tour.",
          },
        ],
      },
      {
        id: "south-india",
        name: "South India",
        tagline: "Backwaters, temples, spice trails.",
        description:
          "Embracing a striking contrast with the peaks of the North, South India is India's misty heartland — backwaters, classical temples, spice gardens, and emerald tea plantations of the Western Ghats.",
        heroImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944",
        heroImagePublicId: "tour-categories/south-india-hero",
        destinations: ["india"],
        destinations_gallery: [
          {
            url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944",
            caption: "Kerala Backwaters",
            publicId: "tour-categories/south-india/gallery-1",
          },
          {
            url: "https://images.unsplash.com/photo-1602301413562-c0e3a3d5f7f8",
            caption: "Houseboat, Alleppey",
            publicId: "tour-categories/south-india/gallery-2",
          },
        ],
        package: [
          {
            id: "kerala-backwaters",
            name: "Kerala Backwaters Tour",
            duration: "4 Days / 3 Nights",
            price: 32000,
            image: "https://images.unsplash.com/photo-1602301413562-c0e3a3d5f7f8",
            summary: "Houseboat stay and scenic backwater cruises.",
          },
          {
            id: "temple-trail",
            name: "Tamil Nadu Temple Trail",
            duration: "5 Days / 4 Nights",
            price: 29000,
            image: "https://images.unsplash.com/photo-1587474260584-136574528ed5",
            summary: "Madurai, Thanjavur, and Rameswaram temples.",
          },
        ],
      },
      {
        id: "east-india",
        name: "East India",
        tagline: "Tea gardens, hills, heritage.",
        description:
          "A kaleidoscope of cultures and ethnicities, East India is dotted with tea plantations, waterfalls, sun temples, and toy trains of the British era, along with Buddhist monasteries.",
        heroImage: "https://images.unsplash.com/photo-1544634076-a90160ddf22e",
        heroImagePublicId: "tour-categories/east-india-hero",
        destinations: ["india"],
        destinations_gallery: [
          {
            url: "https://images.unsplash.com/photo-1544634076-a90160ddf22e",
            caption: "Tea gardens, Darjeeling",
            publicId: "tour-categories/east-india/gallery-1",
          },
        ],
        package: [
          {
            id: "darjeeling-gangtok",
            name: "Darjeeling & Gangtok Tour",
            duration: "6 Days / 5 Nights",
            price: 34000,
            image: "https://images.unsplash.com/photo-1544634076-a90160ddf22e",
            summary: "Tea gardens, monasteries, and mountain views.",
          },
        ],
      },
      {
        id: "west-india",
        name: "West India",
        tagline: "Deserts, palaces, coastlines.",
        description:
          "The most diverse of them all, West India spans Gandhi's legacy in Ahmedabad, the craft villages of Kutch, the cave temples of Ellora and Ajanta, and the palm-fringed beaches of Mumbai and Goa.",
        heroImage: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da",
        heroImagePublicId: "tour-categories/west-india-hero",
        destinations: ["india"],
        destinations_gallery: [
          {
            url: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da",
            caption: "Mehrangarh Fort, Jodhpur",
            publicId: "tour-categories/west-india/gallery-1",
          },
          {
            url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2",
            caption: "Goa Beaches",
            publicId: "tour-categories/west-india/gallery-2",
          },
        ],
        package: [
          {
            id: "rajasthan-heritage",
            name: "Rajasthan Heritage Tour",
            duration: "7 Days / 6 Nights",
            price: 52000,
            image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da",
            summary: "Jaipur, Udaipur, Jodhpur, and Jaisalmer.",
          },
          {
            id: "goa-beaches",
            name: "Goa Beach Escape",
            duration: "4 Days / 3 Nights",
            price: 21000,
            image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2",
            summary: "Beaches, nightlife, and Portuguese heritage.",
          },
        ],
      },
    ],
  },
  {
    id: "bhutan",
    name: "Bhutan",
    tagline: "The Land of the Thunder Dragon.",
    description:
      "Bhutan is known for its monasteries, fortresses, and dramatic Himalayan landscapes, along with its unique philosophy of Gross National Happiness.",
    heroImage: "https://i.pinimg.com/736x/a0/5b/e1/a05be1e29a75853b56accd4922e72c2c.jpg",
    heroImagePublicId: "destinations/bhutan-hero",
    category: [
      {
        id: "bhutan-general",
        name: "Bhutan Tours",
        tagline: "Monasteries in the clouds.",
        description:
          "Explore Thimphu, Paro, and Punakha — monasteries, fortresses, and mountain trails set against the Himalayas.",
        heroImage: "https://images.unsplash.com/photo-1553856622-b0d17e5f2b09",
        heroImagePublicId: "tour-categories/bhutan-general-hero",
        destinations: ["bhutan"],
        destinations_gallery: [
          {
            url: "https://images.unsplash.com/photo-1553856622-b0d17e5f2b09",
            caption: "Tiger's Nest Monastery",
            publicId: "tour-categories/bhutan-general/gallery-1",
          },
        ],
        package: [
          {
            id: "bhutan-classic",
            name: "Classic Bhutan Tour",
            duration: "5 Days / 4 Nights",
            price: 60000,
            image: "https://images.unsplash.com/photo-1553856622-b0d17e5f2b09",
            summary: "Tiger's Nest Monastery, Thimphu, and Punakha Dzong.",
          },
        ],
      },
    ],
  },
  {
    id: "sri-lanka",
    name: "Sri Lanka",
    tagline: "Pearl of the Indian Ocean.",
    description:
      "Sri Lanka offers golden beaches, ancient ruins, lush tea plantations, and wildlife safaris, all within a compact island.",
    heroImage: "https://i.pinimg.com/1200x/7a/fb/18/7afb1867ab39dcc0187ca69d9318d791.jpg",
    heroImagePublicId: "destinations/sri-lanka-hero",
    category: [
      {
        id: "sri-lanka-general",
        name: "Sri Lanka Tours",
        tagline: "Beaches, culture, and wildlife.",
        description:
          "Beaches, culture, and wildlife across Kandy, Nuwara Eliya, Galle, and Colombo.",
        heroImage: "https://images.unsplash.com/photo-1546708770-599ba7fa6a3b",
        heroImagePublicId: "tour-categories/sri-lanka-general-hero",
        destinations: ["sri-lanka"],
        destinations_gallery: [
          {
            url: "https://images.unsplash.com/photo-1546708770-599ba7fa6a3b",
            caption: "Galle Fort",
            publicId: "tour-categories/sri-lanka-general/gallery-1",
          },
        ],
        package: [
          {
            id: "sri-lanka-explorer",
            name: "Sri Lanka Explorer",
            duration: "6 Days / 5 Nights",
            price: 48000,
            image: "https://images.unsplash.com/photo-1546708770-599ba7fa6a3b",
            summary: "Kandy, Nuwara Eliya, Galle, and Colombo.",
          },
        ],
      },
    ],
  },
  {
    id: "nepal",
    name: "Nepal",
    tagline: "Home of the Himalayas.",
    description:
      "Nepal is famous for Everest, ancient temples, and rich Sherpa culture, offering both adventure and spirituality.",
    heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1800&q=85",
    heroImagePublicId: "destinations/nepal-hero",
    category: [
      {
        id: "nepal-general",
        name: "Nepal Tours",
        tagline: "Kathmandu to the Himalayas.",
        description:
          "Kathmandu, Pokhara, and the trekking routes leading toward Everest.",
        heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
        heroImagePublicId: "tour-categories/nepal-general-hero",
        destinations: ["nepal"],
        destinations_gallery: [
          {
            url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
            caption: "Annapurna Range, Pokhara",
            publicId: "tour-categories/nepal-general/gallery-1",
          },
        ],
        package: [
          {
            id: "nepal-heritage",
            name: "Nepal Heritage & Nature Tour",
            duration: "6 Days / 5 Nights",
            price: 42000,
            image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
            summary: "Kathmandu Durbar Square, Pokhara, and Chitwan.",
          },
        ],
      },
    ],
  },
];
