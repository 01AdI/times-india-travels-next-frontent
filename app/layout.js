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

const SITE_URL = "https://www.timesindiatravels.com";
const DEFAULT_TITLE = "Times India Travels | Luxury Tours & Travel in India";
const DEFAULT_DESCRIPTION =
  "Discover unforgettable journeys across India and Asia with Times India Travels. Explore curated tours, destinations, travel experiences and personalised holidays.";
const DEFAULT_IMAGE = `${SITE_URL}/images/times_logo.png`;


export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  authors: [{ name: "Times India Travels" }],
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
  icons: {
    icon: "/images/fevicon.png",
    apple: "/images/fevicon_app.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
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

export default function RootLayout({ children }) {
  return (
    <html lang="en-US" 
    className="h-full antialiased" 
    suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,500&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col isolate">
        <GlobalStructuredData />
        <ReduxProvider>
          <AOSProvider>
            <ScrollToTop />
            <Navbar/>
            <main className="flex-1">{children}</main>
            <Footer />
            <FloatingQuoteButton />
          </AOSProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}