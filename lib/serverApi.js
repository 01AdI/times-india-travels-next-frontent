import { cache } from "react";
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

export const getTourCategoryDetail = cache((id) =>
  serverGet(`/tour-category/${encodeURIComponent(id)}`)
);

export const getTourCategories = cache(() => serverGet("/tour-category"));

export const getTourCategoryNavigation = cache(() =>
  serverGet("/tour-category/navigation")
);

export const getTourPackages = cache((query = "") =>
  serverGet(`/tour-package${query}`)
);

export const getTourPackageDetail = cache((id) =>
  serverGet(`/tour-package/${encodeURIComponent(id)}`)
);

export const getDestinationDetail = cache((id) =>
  serverGet(`/destination/${encodeURIComponent(id)}`)
);

export const getDestinations = cache(() => serverGet("/destination"));

export const getDestinationSummaries = cache(() =>
  serverGet("/destination/summary")
);

export const getBlogBySlug = cache((slug) =>
  serverGet(`/blog/${encodeURIComponent(slug)}`)
);

export const getBlogs = cache((page = 1, limit = 50) =>
  serverGet(`/blog?page=${page}&limit=${limit}`)
);

export const getTestimonials = cache(() => serverGet("/testimonials"));

export const getTestimonialDetail = cache((id) =>
  serverGet(`/testimonials/${encodeURIComponent(id)}`)
);

export const getHomeHeroSlides = cache(() => serverGet("/home-hero"));

export const getHomePageTestimonials = cache(() => serverGet("/testimonials/homepage"));
