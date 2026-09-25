import { buildMetadata } from "../../lib/buildMetadata";
import { getDestinationSummaries } from "../../lib/serverApi";
import Destination_All from "../../components/pages/Destination_All";

export const metadata = buildMetadata({
  title: "Destinations | Times India Travels",
  description:
    "Explore inspiring destinations across India and Asia with Times India Travels. Discover cultural heritage, royal cities, mountains, spirituality and unforgettable landscapes.",
  path: "/destinations-all",
  keywords: [
    "India destinations",
    "places to visit in India",
    "India travel destinations",
    "top India tourist places",
  ],
  imageAlt: "Destinations Times India Travels , Luxury Tours & Travel in India",
});

export const revalidate = 300;

export default async function Page() {
  const response = await getDestinationSummaries();
  const destinations = Array.isArray(response?.destinations) ? response.destinations : [];
  return <Destination_All initialDestinations={destinations} />;
}
