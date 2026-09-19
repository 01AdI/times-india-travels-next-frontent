import StructuredData from "../StructuredData";

const SITE_URL = "https://www.timesindiatravels.com";

/**
 * Service schema for the car rental page. There's no per-vehicle detail
 * page/API in this codebase (the fleet is rendered from a static list in
 * CarRental_Fleet.js), so this describes the rental service as a whole
 * rather than individual `Product` offers - safer than inventing prices
 * or availability data that isn't actually on the page.
 */
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
