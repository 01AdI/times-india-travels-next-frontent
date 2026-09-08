import { buildMetadata } from "../../lib/buildMetadata";
import PayOnline from "../../components/pages/Pay_Online";

export const metadata = buildMetadata({
  title: "Pay Online | Times India Travels",
  description:
    "Make a secure payment for your Times India Travels booking or travel arrangements.",
  path: "/pay-online",
  imageAlt: "Secure online payment - Times India Travels",
});

export default function Page() {
  return <PayOnline />;
}
