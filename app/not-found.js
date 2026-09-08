import NotFound from "../utils/NotFound";

export const metadata = {
  title: "Page Not Found | Times India Travels",
  robots: { index: false, follow: true },
};

export default function NotFoundPage() {
  return <NotFound />;
}
