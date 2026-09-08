import { notFound } from "next/navigation";
import { buildMetadata } from "../../../lib/buildMetadata";
import { getTourCategories, getTourCategoryDetail } from "../../../lib/serverApi";
import TourPackage_category from "../../../components/pages/TourPackage_Category";

const VIRTUAL_CATEGORIES = {
  "most-popular": {
    id: "most-popular",
    name: "Most Popular Packages",
    tagline: "Our Most Loved Journeys",
    description: "Explore the journeys our travelers love most, carefully selected from across India for unforgettable experiences.",
    heroImage: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1600&auto=format&fit=crop",
    filter: "mostLoved",
  },
  "special-packages": {
    id: "special-packages",
    name: "Special Packages",
    tagline: "Curated for Every Traveler",
    description: "Luxury escapes, family vacations, honeymoon trips, and adventure tours crafted just for you.",
    heroImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1600&auto=format&fit=crop",
    filter: "specialPackage",
  },
};

export const revalidate = 300;

async function getCategoryData(category) {
  const normalized = category?.trim().toLowerCase();

  if (VIRTUAL_CATEGORIES[normalized]) {
    const response = await getTourCategories();
    const categories = Array.isArray(response?.categories) ? response.categories : [];
    const key = VIRTUAL_CATEGORIES[normalized].filter;
    const packages = categories.flatMap((item) =>
      Array.isArray(item.packages) ? item.packages.filter((pkg) => pkg?.[key] === true) : []
    );
    return { ...VIRTUAL_CATEGORIES[normalized], packages };
  }

  const response = await getTourCategoryDetail(normalized);
  return response?.category || null;
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const categoryData = await getCategoryData(category);
  const path = `/tours/${category}`;

  if (!categoryData) {
    return buildMetadata({
      title: "Tour Category Not Found | Times India Travels",
      description: "The tour category you're looking for doesn't exist or may have been removed.",
      path,
      noindex: true,
    });
  }

  return buildMetadata({
    title: `${categoryData.name} | India Tours | Times India Travels`,
    description: categoryData.description || `Explore ${categoryData.name} with Times India Travels. Discover carefully crafted tours and personalised journeys across India.`,
    path,
    image: categoryData.heroImage,
    imageAlt: `${categoryData.name} tour package - Times India Travels`,
  });
}

export default async function Page({ params }) {
  const { category } = await params;
  const categoryData = await getCategoryData(category);

  if (!categoryData) notFound();

  return <TourPackage_category initialCategory={categoryData} category={category} />;
}
