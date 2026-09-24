"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import dynamic from "next/dynamic";

import Home_HeroSection from "../Home_Components/HeroSection_home";
import Home_approved_by_govSection from "../Home_Components/Home_approved_by_govSection";
import Home_TimeIndia_WelcomeSection from "../Home_Components/Home_TimeIndia_WelcomeSection";
import Home_TripAdvisor from "../Home_Components/Home_TripAdvisor";
import Home_WhyChooseUs from "../Home_Components/Home_WhyChooseUs";
import Home_Client_Video from "../Home_Components/Home_Client_Video";
import Home_Client_Testimonials from "../Home_Components/Home_Client_Testimonials";
import DestinationSection from "../Home_Components/DestinationSection";
import Affiliations from "../Home_Components/Affiliations";
import Home_Travel_Grid from "../Home_Components/Home_Travel_Grid";

// Code-split: this is the lowest section on the page and pulls in
// react-phone-input-2 + react-datepicker. Loading it lazily keeps that
// weight off the initial render of everything above the fold.
const Home_Quotation_form = dynamic(
  () => import("../Home_Components/Home_Quotation_form"),
  { ssr: false }
);

export default function Home({
  initialHeroSlides = [],
  initialTestimonials = [],
  initialDestinations = [],
}) {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash === "#quatation") {
      const element = document.getElementById("quatation");
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [pathname]);

  return (
    <>
      <Home_HeroSection initialSlides={initialHeroSlides} />
      <Home_approved_by_govSection />
      <Home_TimeIndia_WelcomeSection />
      <Home_TripAdvisor />
      <Home_WhyChooseUs />
      <Home_Client_Video />
      <Home_Client_Testimonials initialTestimonials={initialTestimonials} />
      <DestinationSection initialDestinations={initialDestinations} />
      <Affiliations />
      <Home_Travel_Grid />
      <Home_Quotation_form />
    </>
  );
}
