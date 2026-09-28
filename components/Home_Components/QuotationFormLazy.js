"use client";

import dynamic from "next/dynamic";

const Home_Quotation_form = dynamic(
  () => import("./Home_Quotation_form"),
  { ssr: false }
);

export default function QuotationFormLazy() {
  return <Home_Quotation_form />;
}
