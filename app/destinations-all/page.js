import { buildMetadata } from "../../lib/buildMetadata";
import { getDestinations } from "../../lib/serverApi";
import Destination_All from "../../components/pages/Destination_All";

export const metadata = buildMetadata({
  title: "Destinations | Times India Travels",
  description:
    "Explore inspiring destinations across India and Asia with Times India Travels. Discover cultural heritage, royal cities, mountains, spirituality and unforgettable landscapes.",
  path: "/destinations-all",
  imageAlt: "Destinations Times India Travels , Luxury Tours & Travel in India",
});

export const revalidate = 300;

export default async function Page() {
  const response = await getDestinations();
  const destinations = Array.isArray(response?.destinations) ? response.destinations : [];
  return <Destination_All initialDestinations={destinations} />;
}
