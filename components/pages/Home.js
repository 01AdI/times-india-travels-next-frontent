"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import Home_HeroSection from "../home_components/HeroSection_home";
import Home_approved_by_govSection from "../home_components/Home_approved_by_govSection";
import Home_TimeIndia_WelcomeSection from "../home_components/Home_TimeIndia_WelcomeSection";
import Home_TripAdvisor from "../home_components/Home_TripAdvisor";
import Home_WhyChooseUs_2 from "../home_components/Home_WhyChooseUs_2";
import Home_Client_Video from "../home_components/Home_Client_Video";
import Home_Client_Testimonials from "../home_components/Home_Client_Testimonials";
import DestinationSection from "../home_components/DestinationSection";
import Affiliations from "../home_components/Affiliations";
import Home_Travel_Grid from "../home_components/Home_Travel_Grid";
import Home_Qautation_form from "../home_components/Home_Qautation_form";

export default function Home() {
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
      <Home_HeroSection />
      <Home_approved_by_govSection />
      <Home_TimeIndia_WelcomeSection />
      <Home_TripAdvisor />
      <Home_WhyChooseUs_2 />
      <Home_Client_Video />
      <Home_Client_Testimonials />
      <DestinationSection />
      <Affiliations />
      <Home_Travel_Grid />
      <Home_Qautation_form />
    </>
  );
}
