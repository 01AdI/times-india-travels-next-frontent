const SITE_URL = "https://www.timesindiatravels.com";
const DEFAULT_IMAGE = `${SITE_URL}/images/times_logo.png`;

/**
 * Builds a Next.js Metadata object for a page.
 *
 * @param {object} opts
 * @param {string} opts.title
 * @param {string} opts.description
 * @param {string} opts.path - route path starting with "/", e.g. "/About_Us"
 * @param {string} [opts.image] - absolute image URL
 * @param {string} [opts.imageAlt]
 * @param {boolean} [opts.noindex]
 */
export function buildMetadata({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  imageAlt,
  noindex = false,
}) {
  const canonical = `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noindex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      images: [{ url: image, alt: imageAlt || title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: image, alt: imageAlt || title }],
    },
  };
}

export { SITE_URL, DEFAULT_IMAGE };
