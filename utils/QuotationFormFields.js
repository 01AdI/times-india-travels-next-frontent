import { ChevronDown } from "lucide-react";

// Shared Tailwind classes used by every quotation/enquiry form's inputs,
// selects, and labels. Kept as plain strings (not a component) so each form
// can still compose them with its own conditional classes where needed.
export const inputClass =
  "w-full h-[52px] rounded-xl border border-[#124d56]/15 bg-white px-4 py-3 text-sm text-[#0B3C49] placeholder:text-[#124d56]/35 outline-none transition-all duration-300 focus:border-[#F58634] focus:ring-4 focus:ring-[#F58634]/10 disabled:cursor-not-allowed disabled:opacity-60";

export const labelClass =
  "block mb-2 text-[10px] sm:text-[11px] uppercase tracking-[0.16em] font-semibold text-[#124d56]/65";

export const selectClass = `${inputClass} cursor-pointer appearance-none pl-4 pr-12`;

// Wraps a native <select> with the chevron icon every form uses.
export function SelectWrapper({ children }) {
  return (
    <div className="relative w-full">
      {children}

      <ChevronDown
        size={18}
        strokeWidth={1.8}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#124d56]/55"
        aria-hidden="true"
      />
    </div>
  );
}

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const CURRENT_YEAR = new Date().getFullYear();

export const YEAR_OPTIONS = Array.from(
  { length: 15 },
  (_, index) => CURRENT_YEAR + index
);
