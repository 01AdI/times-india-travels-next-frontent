import StructuredData from "../components/StructuredData";

const SITE_URL = "https://www.timesindiatravels.com";

const globalSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TravelAgency",
      "@id": `${SITE_URL}/#organization`,
      name: "Times India Travels",
      url: SITE_URL,

      logo: {
        "@type": "ImageObject",
        url: "https://res.cloudinary.com/images-backend/image/upload/v1788451645/times_logo_id07ua.png",
      },

      image:
        "https://res.cloudinary.com/images-backend/image/upload/v1788451645/times_logo_id07ua.png",

      telephone: "+91 9610605261",

      email: "tours@timesindiatravels.com",

      address: {
        "@type": "PostalAddress",
        streetAddress:
          "C2/106, Flat No S2, 2nd Floor, Sneh Villa, Chitrakoot Scheme",
        addressLocality: "Jaipur",
        addressRegion: "Rajasthan",
        postalCode: "302021",
        addressCountry: "IN",
      },

      sameAs: [
        "https://www.facebook.com/timesindiatravelsofficial",
        "https://twitter.com/times_travels",
        "https://www.instagram.com/timesindiatravels/",
        "https://www.linkedin.com/in/times-india-travels-1a92633b/",
      ],
    },

    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Times India Travels",

      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
    },
  ],
};

export default function GlobalStructuredData() {
  return <StructuredData id="global" data={globalSchema} />;
}