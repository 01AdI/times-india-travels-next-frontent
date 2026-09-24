import "./globals.css";
import "aos/dist/aos.css";

import "react-phone-input-2/lib/style.css";
import "react-datepicker/dist/react-datepicker.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingQuoteButton from "../components/FloatingQuoteButton";
import ReduxProvider from "../components/ReduxProvider";
import AOSProvider from "../components/AOSProvider";
import ScrollToTop from "../utils/ScrollToTop";
import GlobalStructuredData from "../utils/GlobalStructuredData";
import { getTourCategoryNavigation } from "../lib/serverApi";

const SITE_URL = "https://www.timesindiatravels.com";
const DEFAULT_TITLE = "Times India Travels | Luxury Tours & Travel in India";
const DEFAULT_DESCRIPTION =
  "Discover unforgettable journeys across India and Asia with Times India Travels. Explore curated tours, destinations, travel experiences and personalised holidays.";
const DEFAULT_IMAGE = `${SITE_URL}/images/times_logo.png`;


export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  applicationName: "Times India Travels",
  authors: [{ name: "Times India Travels" }],
  creator: "Times India Travels",
  publisher: "Times India Travels",
  category: "travel",
  formatDetection: {
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/images/fevicon.png",
    apple: "/images/fevicon_app.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Times India Travels",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    images: [{ url: DEFAULT_IMAGE, alt: "Times India Travels" }],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description:
      "Explore curated tours, destinations and unforgettable travel experiences with Times India Travels.",
    images: [{ url: DEFAULT_IMAGE, alt: "Times India Travels" }],
  },
};

export const viewport = {
  themeColor: "#123138",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

// Revalidate the server-fetched tour categories (used by the Navbar
// dropdown and Footer links on every page) every 5 minutes via ISR.
export const revalidate = 300;

export default async function RootLayout({ children }) {
  const categoryData = await getTourCategoryNavigation();
  const initialCategories = Array.isArray(categoryData?.categories)
    ? categoryData.categories
    : [];

  return (
    <html lang="en-US" 
    className="h-full antialiased" 
    suppressHydrationWarning
    >

      <body className="min-h-full flex flex-col isolate">
        <GlobalStructuredData />
        <ReduxProvider>
          <AOSProvider>
            <ScrollToTop />
            <Navbar initialCategories={initialCategories}/>
            <main className="flex-1">{children}</main>
            <Footer initialCategories={initialCategories} />
            <FloatingQuoteButton />
          </AOSProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}