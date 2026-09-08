import { notFound } from "next/navigation";
import { buildMetadata } from "../../../lib/buildMetadata";
import { getDestinationDetail } from "../../../lib/serverApi";
import DestinationStructuredData from "../../../components/StructuredData/DestinationStructuredData";
import Destination from "../../../components/pages/Destination";

export const revalidate = 300;

async function getDestination(id) {
  const data = await getDestinationDetail(id);
  return data?.destination || null;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const destination = await getDestination(id);
  const path = `/destinations/${id}`;

  if (!destination) {
    return buildMetadata({
      title: "Destination Not Found | Times India Travels",
      description: "The destination you are looking for does not exist or may have been removed.",
      path,
      noindex: true,
    });
  }

  return buildMetadata({
    title: `${destination.name} Travel & Tours | Times India Travels`,
    description: destination.description || `Explore ${destination.name} with Times India Travels.`,
    path,
    image: destination.heroImage,
    imageAlt: `${destination.name} travel with Times India Travels`,
  });
}

export default async function Page({ params }) {
  const { id } = await params;
  const destination = await getDestination(id);

  if (!destination) notFound();

  return (
    <>
      <DestinationStructuredData destination={destination} />
      <Destination initialDestination={destination} id={id} />
    </>
  );
}
