import StructuredData from "../StructuredData";

const SITE_URL = "https://www.timesindiatravels.com";

export default function CarRentalStructuredData() {
  const pageUrl = `${SITE_URL}/car-rental`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    serviceType: "Chauffeur-driven car rental",
    name: "Car Rental | Times India Travels",
    description:
      "Chauffeur-driven car rentals across India with transparent pricing and experienced drivers.",
    url: pageUrl,
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    provider: {
      "@type": "TravelAgency",
      "@id": `${SITE_URL}/#organization`,
      name: "Times India Travels",
      url: SITE_URL,
    },
  };

  return <StructuredData id="car-rental-service" data={schema} />;
}
