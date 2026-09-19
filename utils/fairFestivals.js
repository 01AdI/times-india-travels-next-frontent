export const fairFestivals = [
  {
    id: "khajuraho-dance-festival",
    slug: "khajuraho-dance-festival",
    title: "Khajuraho Dance Festival",
    location: "Khajuraho, Madhya Pradesh",
    image:
      "https://res.cloudinary.com/giz8nvjr/image/upload/v1789720804/Khajuraho-blog-1.jpg",
    shortDescription:
      "Experience India's classical dance traditions against the beautifully illuminated Khajuraho temples during this celebrated week-long cultural festival.",
    fullDescription:
      "Khajuraho Dance Festival, organised by the Madhya Pradesh Kala Parishad, is a one-week festival of classical dances held annually against the spectacular backdrop of the magnificently lit Khajuraho temples in Chhatarpur district of Madhya Pradesh state in central India. The festival is conducted in February and March.",
  },
  {
    id: "khatushyam-ji-fair",
    slug: "khatushyam-ji-fair",
    title: "Khatushyam Ji Fair",
    location: "Khatu Shyam Ji, Rajasthan",
    image:
      "https://res.cloudinary.com/giz8nvjr/image/upload/v1789721010/sikar_1519611132-600x450.jpg",
    shortDescription:
      "Join thousands of devotees at the annual Khatu Shyam Ji Fair, a vibrant three-day celebration of faith and devotion in Rajasthan.",
    fullDescription:
      "Khatu Shyamji Temple is an important pilgrimage site in Rajasthan. Lakhs of Krishna followers gather at the annual fair from Phalgun Sudi Dashmi to Dwadashi. The Khatu Shyamji Fair of Rajasthan lasts for three days. It is one of the prominent festivals of Rajasthan.",
  },
  {
    id: "holi-festival-of-colors",
    slug: "holi-festival-of-colors",
    title: "Holi – Festival of Colors",
    location: "Across India",
    image:
      "https://res.cloudinary.com/giz8nvjr/image/upload/v1789721009/holi.jpg",
    shortDescription:
      "Celebrate Holi with vibrant colours, joyful gatherings and age-old traditions during one of India's most lively and colourful festivals.",
    fullDescription:
      "The festival of colours is Holi, it is vibrant and filled with beautiful colours. Holi is considered as one of major festival in India. It is celebrated in the month of Phalgun on full moon day according to Hindu calendar.",
  },
];

export function getFairFestivalBySlug(slug) {
  return fairFestivals.find((festival) => festival.slug === slug);
}