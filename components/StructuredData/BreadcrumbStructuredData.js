import StructuredData from "../StructuredData";

const SITE_URL = "https://www.timesindiatravels.com";

/**
 * Generic BreadcrumbList JSON-LD.
 *
 * @param {object} props
 * @param {{name: string, path: string}[]} props.items - ordered trail,
 *   starting with Home, e.g.
 *   [{ name: "Home", path: "/" }, { name: "Destinations", path: "/destinations-all" }, { name: "Jaipur", path: "/destinations/jaipur" }]
 */
export default function BreadcrumbStructuredData({ items }) {
  if (!Array.isArray(items) || items.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };

  return (
    <StructuredData
      id={`breadcrumb-${items.map((i) => i.path).join("-")}`}
      data={schema}
    />
  );
}
