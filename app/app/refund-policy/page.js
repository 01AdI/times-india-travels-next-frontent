import { buildMetadata } from "../../lib/buildMetadata";
import RefundPolicy from "../../components/pages/Refund_Policy";

export const metadata = buildMetadata({
  title: "Refund Policy | Times India Travels",
  description:
    "Read the Times India Travels refund and cancellation policy for travel services and bookings.",
  path: "/refund-policy",
  imageAlt: "Refund Policy Times India Travels , Luxury Tours & Travel in India",
});

export default function Page() {
  return <RefundPolicy />;
}
