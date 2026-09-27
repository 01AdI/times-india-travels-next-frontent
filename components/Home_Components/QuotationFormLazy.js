"use client";

import dynamic from "next/dynamic";

// Code-split: this is the lowest section on the page and pulls in
// react-phone-input-2 + react-datepicker. Loading it lazily keeps that
// weight off the initial render of everything above the fold.
// next/dynamic with { ssr: false } must live inside a Client Component,
// which is why this one-line wrapper exists separately from Home.js.
const Home_Quotation_form = dynamic(
  () => import("./Home_Quotation_form"),
  { ssr: false }
);

export default function QuotationFormLazy() {
  return <Home_Quotation_form />;
}
