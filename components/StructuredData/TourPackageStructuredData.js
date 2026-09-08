import StructuredData from "../StructuredData";

const SITE_URL = "https://www.timesindiatravels.com";

export default function TourPackageStructuredData({ tour, category, sub }) {
  if (!tour) return null;

  const tourUrl = `${SITE_URL}/tours/${category}/${sub}`;

  const images = [
    tour.heroImage,
    tour.thumbnail,
  ].filter(Boolean);

  const description =
    `${tour.name}, a ${tour.duration?.label || ""} journey through ` +
    `${Array.isArray(tour.route) ? tour.route.join(", ") : tour.route || "India"}. ` +
    `Explore the itinerary and plan your journey with Times India Travels.`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",

    "@id": `${tourUrl}#tour`,

    name: tour.name,

    description,

    url: tourUrl,

    ...(images.length > 0 && {
      image: images,
    }),

    ...(tour.duration?.days && {
      duration: `P${tour.duration.days}D`,
    }),

    provider: {
      "@type": "TravelAgency",
      "@id": `${SITE_URL}/#organization`,
      name: "Times India Travels",
      url: SITE_URL,
    },

    ...(Array.isArray(tour.route) &&
      tour.route.length > 0 && {
        itinerary: {
          "@type": "ItemList",
          itemListElement: tour.route.map((place, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: place,
          })),
        },
      }),
  };

  return (
    <StructuredData
      id={`tour-${tour.id}`}
      data={schema}
    />
  );
}