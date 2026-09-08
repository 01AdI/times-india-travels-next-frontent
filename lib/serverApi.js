// Server-side data fetching, used inside Server Components and
// generateMetadata(). Hits the exact same Express REST API your
// current React app talks to — the backend does not change at all.

import API_BASE_URL from "../utils/apiConfigPublic";

// Revalidate content pages every 5 minutes (ISR) so new/edited tours,
// destinations, and blog posts show up without a full redeploy, while
// still being served as pre-rendered HTML for speed + SEO.
const REVALIDATE_SECONDS = 300;

async function serverGet(endpoint) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    console.error(`serverGet failed for ${endpoint}:`, error.message);
    return null;
  }
}

export const getTourCategoryDetail = (id) =>
  serverGet(`/tour-category/${encodeURIComponent(id)}`);

export const getTourCategories = () => serverGet("/tour-category");

export const getTourPackages = (query = "") =>
  serverGet(`/tour-package${query}`);

export const getTourPackageDetail = (id) =>
  serverGet(`/tour-package/${encodeURIComponent(id)}`);

export const getDestinationDetail = (id) =>
  serverGet(`/destination/${encodeURIComponent(id)}`);

export const getDestinations = () => serverGet("/destination");

export const getBlogBySlug = (slug) =>
  serverGet(`/blog/${encodeURIComponent(slug)}`);

export const getBlogs = (page = 1, limit = 50) =>
  serverGet(`/blog?page=${page}&limit=${limit}`);

export const getTestimonials = () => serverGet("/testimonials");

export const getTestimonialDetail = (id) =>
  serverGet(`/testimonials/${encodeURIComponent(id)}`);
