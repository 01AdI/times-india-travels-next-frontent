import { notFound } from "next/navigation";
import {
  fairFestivals,
  getFairFestivalBySlug,
} from "../../../utils/fairFestivals";
import Detail_Fair_Festival from "../../../components/pages/Detail_Fair_Festival";

export function generateStaticParams() {
  return fairFestivals.map((festival) => ({
    slug: festival.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const festival = getFairFestivalBySlug(slug);

  if (!festival) {
    return {
      title: "Fair & Festivals | Times India Travels",
      description:
        "Explore India's vibrant fairs, festivals, cultural celebrations and timeless traditions.",
    };
  }

  return {
    title: `${festival.title} | Times India Travels`,
    description: festival.shortDescription,
  };
}

export default async function FairFestivalDetailPage({ params }) {
  const { slug } = await params;

  const festival = getFairFestivalBySlug(slug);

  if (!festival) {
    notFound();
  }

  return <Detail_Fair_Festival festival={festival} />;
}