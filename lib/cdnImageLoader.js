export default function cdnImageLoader({ src, width, quality }) {
  const q = quality || 75;

  if (src.includes("res.cloudinary.com") && src.includes("/upload/")) {
    const optimizedWidth = Math.min(width, 1920);

    return src.replace(
      "/upload/",
      `/upload/f_auto,q_auto:eco,w_${optimizedWidth},c_limit/`
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
