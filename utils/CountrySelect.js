"use client";

import { useEffect, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  Search,
  X,
} from "lucide-react";

import countries from "./countries";

export default function CountrySelect({
  value,
  onChange,
  name = "nationality",
  placeholder = "Select your nationality",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const listboxId = `${name}-listbox`;

  // ============================================================
  // FILTER COUNTRIES
  // ============================================================

  const filteredCountries = countries.filter((country) =>
    country.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // ============================================================
  // SELECTED COUNTRY
  // ============================================================

  const selectedCountry = countries.find(
    (country) => country.code === value
  );

  // ============================================================
  // CLOSE WHEN CLICKING OUTSIDE
  // ============================================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setSearch("");
        setHighlightedIndex(0);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // ============================================================
  // ESCAPE KEY
  // ============================================================

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setSearch("");
        setHighlightedIndex(0);
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  // ============================================================
  // TOGGLE DROPDOWN
  // ============================================================

  const handleToggle = () => {
    setIsOpen((previous) => {
      const nextState = !previous;

      if (nextState) {
        setTimeout(() => {
          inputRef.current?.focus();
        }, 0);
      } else {
        setSearch("");
        setHighlightedIndex(0);
      }

      return nextState;
    });
  };

  // ============================================================
  // SELECT COUNTRY
  // ============================================================

  const handleSelect = (country) => {
    onChange(country.code);

    setIsOpen(false);
    setSearch("");
    setHighlightedIndex(0);
  };

  // ============================================================
  // CLEAR COUNTRY
  // ============================================================

  const handleClear = (event) => {
    event.stopPropagation();

    onChange("");

    setIsOpen(false);
    setSearch("");
    setHighlightedIndex(0);
  };

  // ============================================================
  // KEYBOARD NAVIGATION
  // ============================================================

  const handleKeyDown = (event) => {
    if (!isOpen) {
      if (
        event.key === "Enter" ||
        event.key === "ArrowDown" ||
        event.key === " "
      ) {
        event.preventDefault();
        handleToggle();
      }

      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      setHighlightedIndex((previous) =>
        previous <
        filteredCountries.length - 1
          ? previous + 1
          : 0
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      setHighlightedIndex((previous) =>
        previous > 0
          ? previous - 1
          : filteredCountries.length - 1
      );
    }

    if (event.key === "Enter") {
      event.preventDefault();

      if (filteredCountries.length > 0) {
        handleSelect(
          filteredCountries[highlightedIndex]
        );
      }
    }

    if (event.key === "Escape") {
      event.preventDefault();

      setIsOpen(false);
      setSearch("");
      setHighlightedIndex(0);
    }
  };

  // ============================================================
  // RESET HIGHLIGHT WHEN SEARCH CHANGES
  // ============================================================

  useEffect(() => {
    setHighlightedIndex(0);
  }, [search]);

  // ============================================================
  // RETURN
  // ============================================================

  return (
    <div
      ref={containerRef}
      className="relative w-full"
    >
      {/* ======================================================
          HIDDEN INPUT
      ======================================================= */}

      <input
        type="hidden"
        name={name}
        value={value || ""}
        readOnly
      />

      {/* ======================================================
          MAIN SELECT BOX
      ======================================================= */}

      <button
        type="button"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        className="
          flex
          h-[52px]
          w-full
          items-center
          justify-between
          rounded-xl
          border
          border-[#124d56]/15
          bg-white
          px-4
          text-left
          text-sm
          outline-none
          transition-all
          duration-300
          hover:border-[#124d56]/25
          focus:border-[#F58634]
          focus:ring-4
          focus:ring-[#F58634]/10
        "
      >
        {/* SELECTED NAME */}

        <span
          className={
            selectedCountry
              ? "text-[#0B3C49]"
              : "text-[#124d56]/35"
          }
        >
          {selectedCountry
            ? selectedCountry.name
            : placeholder}
        </span>

        {/* RIGHT SIDE */}

        <div className="flex items-center gap-2">
          {selectedCountry && (
            <span
              role="button"
              tabIndex={0}
              aria-label="Clear nationality"
              onClick={handleClear}
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" ||
                  event.key === " "
                ) {
                  event.preventDefault();
                  handleClear(event);
                }
              }}
              className="
                rounded-full
                p-1
                text-[#124d56]/35
                transition
                hover:bg-[#F2FAFB]
                hover:text-[#124d56]
              "
            >
              <X size={15} />
            </span>
          )}

          <ChevronDown
            size={18}
            strokeWidth={1.8}
            className={`
              text-[#124d56]/55
              transition-transform
              duration-300
              ${isOpen ? "rotate-180" : ""}
            `}
          />
        </div>
      </button>

      {/* ======================================================
          DROPDOWN
      ======================================================= */}

      {isOpen && (
        <div
          className="
            absolute
            left-0
            right-0
            top-full
            z-[10020]
            mt-2
            overflow-hidden
            rounded-xl
            border
            border-[#124d56]/10
            bg-white
            shadow-[0_20px_60px_rgba(6,27,31,0.18)]
          "
        >
          {/* ==================================================
              SEARCH
          =================================================== */}

          <div className="border-b border-[#124d56]/10 p-3">
            <div className="relative">
              <Search
                size={17}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-[#124d56]/35
                "
              />

              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Search country..."
                role="searchbox"
                aria-autocomplete="list"
                className="
                  h-[44px]
                  w-full
                  rounded-lg
                  border
                  border-[#124d56]/10
                  bg-[#F2FAFB]
                  py-2.5
                  pl-10
                  pr-3
                  text-sm
                  text-[#0B3C49]
                  outline-none
                  transition
                  focus:border-[#F58634]
                  focus:bg-white
                "
              />
            </div>
          </div>

          {/* ==================================================
              COUNTRY LIST
          =================================================== */}

          <div
            className="
              max-h-64
              overflow-y-auto
            "
            role="listbox"
            id={listboxId}
            aria-label="Countries"
          >
            {filteredCountries.length > 0 ? (
              filteredCountries.map(
                (country, index) => {
                  const isHighlighted =
                    index === highlightedIndex;

                  const isSelected =
                    country.code === value;

                  return (
                    <button
                      key={country.code}
                      id={`${name}-option-${country.code}`}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() =>
                        handleSelect(country)
                      }
                      onMouseEnter={() =>
                        setHighlightedIndex(index)
                      }
                      className={`
                        flex
                        w-full
                        items-center
                        justify-between
                        px-4
                        py-3
                        text-left
                        text-sm
                        transition
                        ${
                          isHighlighted
                            ? "bg-[#F2FAFB]"
                            : "bg-white"
                        }
                        ${
                          isSelected
                            ? "font-semibold text-[#124d56]"
                            : "text-[#0B3C49]"
                        }
                      `}
                    >
                      <span>
                        {country.name}
                      </span>

                      {isSelected && (
                        <Check
                          size={17}
                          className="text-[#124d56]"
                        />
                      )}
                    </button>
                  );
                }
              )
            ) : (
              <div className="px-4 py-8 text-center">
                <p className="text-sm text-[#124d56]/50">
                  No country found
                </p>

                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="
                    mt-2
                    text-sm
                    font-medium
                    text-[#F58634]
                    hover:underline
                  "
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}