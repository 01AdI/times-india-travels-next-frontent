import { buildMetadata } from "../lib/buildMetadata";
import { getHomeHeroSlides, getHomePageTestimonials, getDestinations } from "../lib/serverApi";
import Home from "../components/pages/Home";

export const metadata = buildMetadata({
  title: "Times India Travels | Luxury Tours & Travel in India",
  description:
    "Discover unforgettable journeys across India and Asia with Times India Travels. Explore curated tours, destinations, travel experiences and personalised holidays.",
  path: "/",
  imageAlt: "Times India Travels , Luxury Tours & Travel in India",
});

// Revalidate the server-fetched homepage data periodically (ISR) so key
// content (hero, testimonials, destinations) is present in the
// server-rendered HTML instead of only appearing after client-side
// fetches resolve.
export const revalidate = 300;

export default async function Page() {
  const [heroData, testimonialsData, destinationsData] = await Promise.all([
    getHomeHeroSlides(),
    getHomePageTestimonials(),
    getDestinations(),
  ]);

  const initialHeroSlides = Array.isArray(heroData?.data) ? heroData.data : [];
  const initialTestimonials = Array.isArray(testimonialsData?.data)
    ? testimonialsData.data
    : [];
  const initialDestinations = Array.isArray(destinationsData?.destinations)
    ? destinationsData.destinations
    : [];

  return (
    <Home
      initialHeroSlides={initialHeroSlides}
      initialTestimonials={initialTestimonials}
      initialDestinations={initialDestinations}
    />
  );
}
