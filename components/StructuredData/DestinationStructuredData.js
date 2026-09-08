import StructuredData from "../StructuredData";

const SITE_URL = "https://www.timesindiatravels.com";

export default function DestinationStructuredData({ destination }) {
  if (!destination) return null;

  const destinationUrl =
    `${SITE_URL}/destinations/${destination.id}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",

    "@id": `${destinationUrl}#destination`,

    name: destination.name,

    description: destination.description,

    url: destinationUrl,

    ...(destination.heroImage && {
      image: destination.heroImage,
    }),

    subjectOf: {
      "@type": "WebPage",
      "@id": `${destinationUrl}#webpage`,
      url: destinationUrl,
      name: `${destination.name} Travel & Tours | Times India Travels`,
    },
  };

  return (
    <StructuredData
      id={`destination-${destination.id}`}
      data={schema}
    />
  );
}