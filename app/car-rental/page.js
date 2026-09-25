import { buildMetadata } from "../../lib/buildMetadata";
import CarRentalStructuredData from "../../components/StructuredData/CarRentalStructuredData";
import CarRental from "../../components/pages/CarRental";

export const metadata = buildMetadata({
  title: "Car Rental | Times India Travels",
  description:
    "Book reliable, chauffeur-driven car rentals across India with Times India Travels — comfortable fleets, transparent pricing and experienced drivers.",
  path: "/car-rental",
  keywords: [
    "car rental India",
    "chauffeur driven car India",
    "India car hire",
    "private car rental tours",
  ],
  imageAlt: "Car rental Times India Travels , Luxury Tours & Travel in India",
});

export default function Page() {
  return (
    <>
      <CarRentalStructuredData />
      <CarRental />
    </>
  );
}
