export default function cdnImageLoader({ src, width, quality }) {
  const q = quality || 75;

  // Cloudinary: res.cloudinary.com/<cloud>/image/upload/<version>/<path>
  // Insert an f_auto,q_auto,w_<width> transformation right after
  // "/upload/" so Cloudinary's edge resizes/compresses/reformats it.
  if (src.includes("res.cloudinary.com") && src.includes("/upload/")) {
    return src.replace(
      "/upload/",
      `/upload/f_auto,q_auto:${q === 75 ? "good" : q},w_${width}/`
    );
  }

  // Unsplash supports width/quality/auto-format via query params.
  if (src.includes("images.unsplash.com")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(q));
    url.searchParams.set("auto", "format");
    return url.toString();
  }

  // Pexels supports width via query params too.
  if (src.includes("images.pexels.com")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    return url.toString();
  }

  return src;
}