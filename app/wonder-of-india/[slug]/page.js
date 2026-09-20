import { notFound } from "next/navigation";
import { getWonderBySlug, wondersOfIndia } from "@/utils/wondersOfIndia";
import Detail_Wonder_Of_India from "../../../components/pages/Detail_Wonder_Of_India";

export function generateStaticParams() {
  return wondersOfIndia.map((wonder) => ({
    slug: wonder.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const wonder = getWonderBySlug(slug);

  if (!wonder) {
    return {
      title: "Wonder of India | Times India Travels",
    };
  }

  return {
    title: `${wonder.title} | Wonders of India | Times India Travels`,
    description: wonder.shortDescription,
  };
}

export default async function WonderDetailsPage({ params }) {
  const { slug } = await params;
  const wonder = getWonderBySlug(slug);

  if (!wonder) {
    notFound();
  }

  return <Detail_Wonder_Of_India wonder={wonder} />;
}