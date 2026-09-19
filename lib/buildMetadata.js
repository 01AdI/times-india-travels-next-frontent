const SITE_URL = "https://www.timesindiatravels.com";
const DEFAULT_IMAGE = `${SITE_URL}/images/times_logo.png`;

function cleanText(value) {
  return String(value ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(value, maxLength) {
  const text = cleanText(value);
  if (text.length <= maxLength) return text;
  const shortened = text.slice(0, maxLength - 1).replace(/\s+\S*$/, "").trim();
  return `${shortened}…`;
}

export function buildMetadata({
  title,
  description,
  path,
  keywords,
  image = DEFAULT_IMAGE,
  imageAlt,
  noindex = false,
}) {
  const safePath = path || "/";
  const safeTitle = truncate(title || "Times India Travels", 70);
  const safeDescription = truncate(
    description ||
      "Discover unforgettable journeys across India and Asia with Times India Travels.",
    160
  );
  const canonical = `${SITE_URL}${safePath}`;
  const safeImage = image || DEFAULT_IMAGE;

  return {
    metadataBase: new URL(SITE_URL),
    title: safeTitle,
    description: safeDescription,
    ...(keywords?.length
      ? { keywords: keywords.map((keyword) => cleanText(keyword)).filter(Boolean) }
      : {}),
    alternates: {
      canonical: safePath,
    },
    robots: noindex
      ? {
          index: false,
          follow: true,
          "max-image-preview": "large",
        }
      : {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
    openGraph: {
      title: safeTitle,
      description: safeDescription,
      url: canonical,
      type: "website",
      locale: "en_IN",
      siteName: "Times India Travels",
      images: [
        {
          url: safeImage,
          alt: cleanText(imageAlt || safeTitle),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: safeTitle,
      description: safeDescription,
      images: [safeImage],
    },
  };
}

export { SITE_URL, DEFAULT_IMAGE };
