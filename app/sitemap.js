import { SITE_URL } from "../lib/buildMetadata";
import API_BASE_URL from "../utils/apiConfigPublic";

async function safeGet(endpoint) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function getAllBlogs() {
  const first = await safeGet("/blog?page=1&limit=50");
  if (!first?.data) return [];

  let blogs = [...first.data];
  const totalPages = first.pagination?.totalPages || 1;

  for (let page = 2; page <= totalPages; page += 1) {
    const next = await safeGet(`/blog?page=${page}&limit=50`);
    if (next?.data) blogs = blogs.concat(next.data);
  }

  return blogs;
}

export default async function sitemap() {
  const entries = new Map();

  const addUrl = (path, lastModified) => {
    if (!path) return;
    const url = `${SITE_URL}${path}`;
    const existing = entries.get(url);

    if (
      lastModified &&
      (!existing?.lastModified ||
        new Date(lastModified) > new Date(existing.lastModified))
    ) {
      entries.set(url, { url, lastModified: new Date(lastModified) });
      return;
    }

    if (!existing) {
      entries.set(url, { url });
    }
  };

  const staticPages = [
    "/",
    "/about-us",
    "/tours",
    "/destinations-all",
    "/car-rental",
    "/blog",
    "/contact-us",
    "/testimonials",
    "/disclaimer",
    "/terms-and-condition",
    "/privacy-policy",
    "/refund-policy",
  ];
  staticPages.forEach((page) => addUrl(page));

  // Tour categories + every package nested under them (unpaginated on
  // this endpoint, so we get the full package list without hitting the
  // /tour-package route's 100-item cap).
  const categoryData = await safeGet("/tour-category");
  const categories = categoryData?.categories || [];

  categories.forEach((category) => {
    if (category?.id) {
      addUrl(`/tours/${encodeURIComponent(category.id)}`, category.updatedAt);
    }

    (category?.packages || []).forEach((pkg) => {
      if (!pkg?.id || !pkg?.categorySlug) return;
      addUrl(
        `/tours/${encodeURIComponent(pkg.categorySlug)}/${encodeURIComponent(
          pkg.id
        )}`,
        pkg.updatedAt
      );
    });
  });

  const destinationData = await safeGet("/destination");
  (destinationData?.destinations || []).forEach((destination) => {
    if (!destination?.id) return;
    addUrl(
      `/destinations/${encodeURIComponent(destination.id)}`,
      destination.updatedAt
    );
  });

  const blogs = await getAllBlogs();
  blogs.forEach((blog) => {
    if (!blog?.slug) return;
    addUrl(
      `/blog/${encodeURIComponent(blog.slug)}`,
      blog.updatedAt || blog.publishedAt
    );
  });

  return Array.from(entries.values());
}
