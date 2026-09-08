import { buildMetadata } from "../../lib/buildMetadata";
import { getTourCategories } from "../../lib/serverApi";
import TourPackage from "../../components/pages/TourPackages";

export const metadata = buildMetadata({
  title: "Tour Packages | Private & Luxury Tours",
  description:
    "Explore carefully crafted India tour packages with Times India Travels. Discover Rajasthan, Delhi, Agra, Jaipur, Kerala and more with personalised travel experiences.",
  path: "/tours",
  imageAlt: "Times India Travels Tour Packages , Luxury Tours & Travel in India",
});

export const revalidate = 300;

export default async function Page() {
  const response = await getTourCategories();
  const categories = Array.isArray(response?.categories) ? response.categories : [];

  return <TourPackage initialCategories={categories} />;
}
