export default function cdnImageLoader({ src, width, quality }) {
  const q = quality || 75;

  if (src.includes("res.cloudinary.com") && src.includes("/upload/")) {
    return src.replace(
      "/upload/",
      `/upload/f_auto,q_${q},w_${width}/`
    );
  }

  if (src.includes("images.unsplash.com")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(q));
    url.searchParams.set("auto", "format");
    return url.toString();
  }

  if (src.includes("images.pexels.com")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    return url.toString();
  }

  return src;
}