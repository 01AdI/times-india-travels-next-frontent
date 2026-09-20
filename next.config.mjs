/** @type {import('next').NextConfig} */

const nextConfig = {

  compress: true,

  // Don't leak the framework in a response header.
  poweredByHeader: false,

  reactStrictMode: true,

  images: {
    loader: "custom",
    loaderFile: "./lib/cdnImageLoader.js",
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "www.timesindiatravels.com" },
      { protocol: "https", hostname: "i.pinimg.com" },
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
      { protocol: "https", hostname: "www.distinctdestinations.in" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  // Long-term caching for the static asset folder Next.js builds.
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico|css|js)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;