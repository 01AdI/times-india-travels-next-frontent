"use client";

import { useEffect, useState } from "react";
import { Mail, ArrowRight } from "lucide-react";
import Floating_Quotation_Form from "./Floating_Quotation_Form";
import { usePathname } from "next/navigation";

export default function FloatingQuoteButton() {
  
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAttention, setIsAttention] = useState(false);


  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered && !isFormOpen) {
        setIsAttention(true);

        // Animation duration
        setTimeout(() => {
          setIsAttention(false);
        }, 900);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered, isFormOpen]);


  const handleOpenForm = () => {
    setIsFormOpen(true);
    setIsAttention(false);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

    if (isAdminRoute) {
    return null;
  }

  return (
    <>
      <div
        className="
          fixed
          right-0
          top-1/2
          -translate-y-1/2
          z-[9990]
        "
      >
        <button
          type="button"
          onClick={handleOpenForm}
          onMouseEnter={() => {
            setIsHovered(true);
            setIsAttention(false);
          }}
          onMouseLeave={() => setIsHovered(false)}
          aria-label="Get enquiry"
          aria-haspopup="dialog"
          className={`
            group
            relative
            flex
            h-[54px]
            items-center
            overflow-hidden
            rounded-l-2xl
            border
            border-white/15
            bg-[#F58634]
            text-white

            shadow-[0_12px_35px_-10px_rgba(0,0,0,0.4)]

            transition-all
            duration-400
            ease-out

            hover:bg-[#D9701F]
            hover:shadow-[0_15px_40px_-10px_rgba(245,134,52,0.55)]

            ${
              isHovered
                ? "w-[158px]"
                : "w-[54px]"
            }

            ${
              isAttention
                ? "animate-[enquiryAttention_0.9s_ease-in-out]"
                : ""
            }
          `}
        >

          <span
            className="
              pointer-events-none
              absolute
              left-0
              right-0
              top-0
              h-px
              bg-white/30
            "
          />

          <span
            className="
              flex
              h-[54px]
              w-[54px]
              shrink-0
              items-center
              justify-center
            "
          >
            <Mail
              className={`
                h-[21px]
                w-[21px]
                transition-transform
                duration-300

                ${
                  isAttention
                    ? "rotate-[-8deg] scale-110"
                    : "group-hover:scale-110"
                }
              `}
              strokeWidth={1.9}
            />
          </span>

          <span
            className={`
              flex
              items-center
              gap-2
              whitespace-nowrap
              pr-4

              font-['Inter']
              text-[12px]
              font-semibold
              uppercase
              tracking-[0.12em]

              transition-all
              duration-300

              ${
                isHovered
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-3 opacity-0"
              }
            `}
          >
            Get Enquiry

            <ArrowRight
              className="
                h-3.5
                w-3.5
                transition-transform
                duration-300
                group-hover:translate-x-0.5
              "
            />
          </span>
        </button>
      </div>

      {isFormOpen && (
        <Floating_Quotation_Form
          onClose={handleCloseForm}
        />
      )}


      <style>
        {`
          @keyframes enquiryAttention {

            0% {
              transform: translateX(0) scale(1);
            }

            20% {
              transform: translateX(-6px) scale(1.04);
            }

            40% {
              transform: translateX(3px) scale(1.02);
            }

            60% {
              transform: translateX(-3px) scale(1.01);
            }

            80% {
              transform: translateX(1px) scale(1);
            }

            100% {
              transform: translateX(0) scale(1);
            }
          }
        `}
      </style>
    </>
  );
}