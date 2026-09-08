"use client";

import { useEffect, useRef, useState } from "react";

import {
  X,
  Star,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Trash2,
  Quote,
} from "lucide-react";

import { createTestimonial } from "../../services/PublicApi";

// ============================================================
// STAR SELECTOR
// ============================================================

function StarSelector({ rating, onChange }) {
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          aria-label={`Give ${star} star${star > 1 ? "s" : ""}`}
          className="
            cursor-pointer
            rounded-md
            p-1
            transition-transform
            duration-200
            hover:scale-110
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#F58634]/40
          "
        >
          <Star
            className={`
              h-7
              w-7
              transition-all
              duration-200
              sm:h-8
              sm:w-8
              ${
                star <= rating
                  ? "fill-[#F58634] text-[#F58634]"
                  : "fill-transparent text-[#123138]/20"
              }
            `}
          />
        </button>
      ))}
    </div>
  );
}

// ============================================================
// FIELD LABEL
// ============================================================

function FieldLabel({ children, required = false }) {
  return (
    <label
      className="
        mb-2
        block
        font-['Inter']
        text-[10px]
        font-semibold
        uppercase
        tracking-[0.2em]
        text-[#123138]/55
      "
    >
      {children}

      {required && (
        <span className="ml-1 text-[#F58634]">*</span>
      )}
    </label>
  );
}

// ============================================================
// CREATE TESTIMONIAL
// ============================================================

export default function Create_Testimonials({ onClose }) {
  // ==========================================================
  // STATE
  // ==========================================================

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);

  // ==========================================================
  // LOCK BODY SCROLL
  // ==========================================================

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // ==========================================================
  // ESCAPE KEY
  // ==========================================================

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !isSubmitting) {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSubmitting, onClose]);

  // ==========================================================
  // CLEAN PREVIEW URL
  // ==========================================================

  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  // ==========================================================
  // FILE SELECT
  // ==========================================================

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");

    // --------------------------------------------------------
    // FILE TYPE
    // --------------------------------------------------------

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");

      event.target.value = "";
      return;
    }

    // --------------------------------------------------------
    // FILE SIZE
    // 5 MB
    // --------------------------------------------------------

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setError("Please choose an image smaller than 5 MB.");

      event.target.value = "";
      return;
    }

    // --------------------------------------------------------
    // CLEAN OLD PREVIEW
    // --------------------------------------------------------

    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview);
    }

    // --------------------------------------------------------
    // SET FILE
    // --------------------------------------------------------

    setAvatar(file);

    const previewUrl = URL.createObjectURL(file);

    setAvatarPreview(previewUrl);
  };

  // ==========================================================
  // REMOVE AVATAR
  // ==========================================================

  const removeAvatar = () => {
    setAvatar(null);

    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview);
    }

    setAvatarPreview("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ==========================================================
  // VALIDATION
  // ==========================================================

  const validateForm = () => {
    if (!name.trim()) {
      return "Please enter your name.";
    }

    if (name.trim().length < 2) {
      return "Please enter a valid name.";
    }

    if (!review.trim()) {
      return "Please write your review.";
    }

    if (review.trim().length < 10) {
      return "Your review should be at least 10 characters long.";
    }

    if (!rating) {
      return "Please select a rating.";
    }

    return null;
  };

  // ==========================================================
  // SUBMIT
  // ==========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    setError("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsSubmitting(true);

      // ======================================================
      // FORM DATA
      // ======================================================

      const formData = new FormData();

      formData.append("name", name.trim());

      formData.append(
        "location",
        location.trim()
      );

      formData.append(
        "review",
        review.trim()
      );

      formData.append(
        "rating",
        String(rating)
      );

      if (avatar) {
        formData.append("avatar", avatar);
      }

      // ======================================================
      // API
      // ======================================================

      await createTestimonial(formData);

      // ======================================================
      // SUCCESS
      // ======================================================

      setIsSuccess(true);
    } catch (err) {
      console.error(
        "Create testimonial error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Something went wrong while submitting your testimonial. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ==========================================================
  // SUCCESS SCREEN
  // ==========================================================

  if (isSuccess) {
    return (
      <div
        className="
          fixed
          inset-0
          z-[9999]
          flex
          items-center
          justify-center
          overflow-y-auto
          bg-[#07191D]/70
          p-4
          backdrop-blur-md
          sm:p-6
        "
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            onClose?.();
          }
        }}
      >
        <div
          className="
            relative
            w-full
            max-w-lg
            overflow-hidden
            rounded-[2rem]
            border
            border-white/50
            bg-[#F2FAFB]
            shadow-[0_35px_100px_-25px_rgba(0,0,0,0.45)]
          "
        >
          {/* TOP ACCENT */}

          <div
            className="
              h-1.5
              w-full
              bg-gradient-to-r
              from-[#1EA5BE]
              via-[#F58634]
              to-[#1EA5BE]
            "
          />

          <div className="px-7 py-12 text-center sm:px-10">
            {/* ICON */}

            <div
              className="
                mx-auto
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-[#1EA5BE]/10
                text-[#1EA5BE]
              "
            >
              <CheckCircle2
                className="h-10 w-10"
                strokeWidth={1.7}
              />
            </div>

            {/* LABEL */}

            <p
              className="
                mt-7
                font-['Inter']
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.3em]
                text-[#F58634]
              "
            >
              Thank You
            </p>

            {/* TITLE */}

            <h2
              className="
                mt-3
                font-['Fraunces']
                text-3xl
                font-medium
                leading-tight
                text-[#123138]
                sm:text-4xl
              "
            >
              Your Story Has Been Shared
            </h2>

            {/* DESCRIPTION */}

            <p
              className="
                mx-auto
                mt-5
                max-w-md
                font-['Inter']
                text-sm
                leading-7
                text-[#123138]/60
              "
            >
              Thank you for taking the time
              to share your experience with
              Times India Travels.
            </p>

            {/* NOTICE */}

            <div
              className="
                mx-auto
                mt-7
                max-w-md
                rounded-2xl
                border
                border-[#F58634]/15
                bg-white/70
                px-5
                py-4
                text-left
              "
            >
              <div className="flex gap-3">
                <Quote
                  className="
                    mt-0.5
                    h-5
                    w-5
                    shrink-0
                    text-[#F58634]/50
                  "
                  fill="currentColor"
                />

                <p
                  className="
                    font-['Inter']
                    text-xs
                    leading-6
                    text-[#123138]/60
                  "
                >
                  Your testimonial has been
                  submitted for review. Once
                  approved by our team, it will
                  appear on our traveller stories.
                </p>
              </div>
            </div>

            {/* CLOSE */}

            <button
              type="button"
              onClick={() => onClose?.()}
              className="
                mt-8
                inline-flex
                cursor-pointer
                items-center
                justify-center
                rounded-full
                bg-[#123138]
                px-7
                py-3.5
                font-['Inter']
                text-sm
                font-semibold
                text-white
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#0C272C]
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#123138]/40
              "
            >
              Continue Exploring
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================
  // MAIN MODAL
  // ==========================================================

  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        overflow-y-auto
        bg-[#07191D]/70
        p-4
        backdrop-blur-md
        sm:p-6
      "
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !isSubmitting
        ) {
          onClose?.();
        }
      }}
    >
      {/* ====================================================
          MODAL POSITIONING
      ==================================================== */}

      <div
        className="
          flex
          min-h-full
          items-start
          justify-center
        "
      >
        {/* ==================================================
            MODAL
        ================================================== */}

        <div
          className="
            relative
            my-2
            flex
            max-h-[calc(100vh-1rem)]
            w-full
            max-w-2xl
            flex-col
            overflow-hidden
            rounded-[2rem]
            border
            border-white/50
            bg-[#F2FAFB]
            shadow-[0_35px_100px_-25px_rgba(0,0,0,0.45)]
            sm:my-4
            sm:max-h-[calc(100vh-2rem)]
          "
        >
          {/* ==================================================
              TOP ACCENT
          ================================================== */}

          <div
            className="
              h-1.5
              w-full
              shrink-0
              bg-gradient-to-r
              from-[#1EA5BE]
              via-[#F58634]
              to-[#1EA5BE]
            "
          />

          {/* ==================================================
              CLOSE BUTTON
          ================================================== */}

          <button
            type="button"
            onClick={() =>
              !isSubmitting && onClose?.()
            }
            disabled={isSubmitting}
            aria-label="Close testimonial form"
            className="
              absolute
              right-5
              top-5
              z-20
              flex
              h-10
              w-10
              cursor-pointer
              items-center
              justify-center
              rounded-full
              border
              border-[#123138]/10
              bg-white/80
              text-[#123138]/60
              backdrop-blur
              transition-all
              duration-300
              hover:border-[#F58634]/30
              hover:bg-white
              hover:text-[#F58634]
              disabled:cursor-not-allowed
              disabled:opacity-40
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#F58634]/40
            "
          >
            <X className="h-4 w-4" />
          </button>

          {/* ==================================================
              HEADER
          ================================================== */}

          <div
            className="
              shrink-0
              border-b
              border-[#123138]/8
              px-6
              pb-7
              pt-9
              sm:px-9
              sm:pt-10
            "
          >
            <div
              className="
                flex
                items-start
                gap-4
                pr-10
              "
            >
              {/* ICON */}

              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#F58634]/10
                  text-[#F58634]
                "
              >
                <Quote
                  className="h-6 w-6"
                  fill="currentColor"
                />
              </div>

              {/* TITLE */}

              <div>
                <p
                  className="
                    font-['Inter']
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.3em]
                    text-[#1EA5BE]
                  "
                >
                  Traveller Stories
                </p>

                <h2
                  className="
                    mt-2
                    font-['Fraunces']
                    text-3xl
                    font-medium
                    leading-tight
                    text-[#123138]
                    sm:text-4xl
                  "
                >
                  Write Your Testimonial
                </h2>
              </div>
            </div>

            <p
              className="
                mt-5
                max-w-xl
                font-['Inter']
                text-sm
                leading-7
                text-[#123138]/55
              "
            >
              We'd love to hear about your
              journey with Times India Travels.
              Share your experience and help
              fellow travellers discover their
              next adventure.
            </p>
          </div>

          {/* ==================================================
              SCROLLABLE FORM AREA
          ================================================== */}

          <div
            className="
              min-h-0
              flex-1
              overflow-y-auto
              overscroll-contain
            "
          >
            <form
              onSubmit={handleSubmit}
              className="
                px-6
                py-7
                sm:px-9
                sm:py-9
              "
            >
              {/* ==================================================
                  ERROR
              ================================================== */}

              {error && (
                <div
                  className="
                    mb-7
                    flex
                    items-start
                    gap-3
                    rounded-2xl
                    border
                    border-red-200
                    bg-red-50
                    px-4
                    py-3.5
                    text-red-700
                  "
                >
                  <AlertCircle
                    className="
                      mt-0.5
                      h-4
                      w-4
                      shrink-0
                    "
                  />

                  <p
                    className="
                      font-['Inter']
                      text-xs
                      leading-5
                    "
                  >
                    {error}
                  </p>
                </div>
              )}

              {/* ==================================================
                  NAME + LOCATION
              ================================================== */}

              <div
                className="
                  grid
                  grid-cols-1
                  gap-5
                  sm:grid-cols-2
                "
              >
                {/* NAME */}

                <div>
                  <FieldLabel required>
                    Your Name
                  </FieldLabel>

                  <input
                    type="text"
                    value={name}
                    onChange={(event) =>
                      setName(event.target.value)
                    }
                    placeholder="e.g. David Smith"
                    maxLength={100}
                    disabled={isSubmitting}
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-[#123138]/10
                      bg-white/80
                      px-4
                      font-['Inter']
                      text-sm
                      text-[#123138]
                      outline-none
                      transition-all
                      duration-300
                      placeholder:text-[#123138]/30
                      focus:border-[#1EA5BE]/40
                      focus:bg-white
                      focus:ring-4
                      focus:ring-[#1EA5BE]/5
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  />
                </div>

                {/* LOCATION */}

                <div>
                  <FieldLabel>
                    Location
                  </FieldLabel>

                  <input
                    type="text"
                    value={location}
                    onChange={(event) =>
                      setLocation(
                        event.target.value
                      )
                    }
                    placeholder="e.g. London, UK"
                    maxLength={100}
                    disabled={isSubmitting}
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-[#123138]/10
                      bg-white/80
                      px-4
                      font-['Inter']
                      text-sm
                      text-[#123138]
                      outline-none
                      transition-all
                      duration-300
                      placeholder:text-[#123138]/30
                      focus:border-[#1EA5BE]/40
                      focus:bg-white
                      focus:ring-4
                      focus:ring-[#1EA5BE]/5
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  />
                </div>
              </div>

              {/* ==================================================
                  RATING
              ================================================== */}

              <div className="mt-7">
                <FieldLabel required>
                  Your Rating
                </FieldLabel>

                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    gap-4
                  "
                >
                  <StarSelector
                    rating={rating}
                    onChange={setRating}
                  />

                  <span
                    className="
                      font-['Inter']
                      text-xs
                      font-medium
                      text-[#123138]/45
                    "
                  >
                    {rating === 0
                      ? "Select a rating"
                      : `${rating} out of 5`}
                  </span>
                </div>
              </div>

              {/* ==================================================
                  REVIEW
              ================================================== */}

              <div className="mt-7">
                <FieldLabel required>
                  Your Experience
                </FieldLabel>

                <textarea
                  value={review}
                  onChange={(event) =>
                    setReview(
                      event.target.value
                    )
                  }
                  placeholder="Tell us about your journey, the places you visited, and what made your experience memorable..."
                  rows={7}
                  maxLength={3000}
                  disabled={isSubmitting}
                  className="
                    block
                    min-h-[170px]
                    w-full
                    resize-y
                    rounded-2xl
                    border
                    border-[#123138]/10
                    bg-white/80
                    px-4
                    py-4
                    font-['Inter']
                    text-sm
                    leading-7
                    text-[#123138]
                    outline-none
                    transition-all
                    duration-300
                    placeholder:text-[#123138]/30
                    focus:border-[#1EA5BE]/40
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#1EA5BE]/5
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                />

                <div
                  className="
                    mt-2
                    flex
                    justify-end
                    font-['Inter']
                    text-[10px]
                    text-[#123138]/30
                  "
                >
                  {review.length}/3000
                </div>
              </div>

              {/* ==================================================
                  AVATAR
              ================================================== */}

              <div className="mt-7">
                <FieldLabel>
                  Profile Photo
                </FieldLabel>

                {!avatarPreview ? (
                  <button
                    type="button"
                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                    disabled={isSubmitting}
                    className="
                      group
                      flex
                      min-h-[120px]
                      w-full
                      cursor-pointer
                      flex-col
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-dashed
                      border-[#123138]/15
                      bg-white/50
                      px-6
                      py-6
                      transition-all
                      duration-300
                      hover:border-[#F58634]/40
                      hover:bg-white
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                      focus:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[#F58634]/40
                    "
                  >
                    <div
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-full
                        bg-[#1EA5BE]/10
                        text-[#1EA5BE]
                        transition-transform
                        duration-300
                        group-hover:scale-105
                      "
                    >
                      <Upload className="h-5 w-5" />
                    </div>

                    <p
                      className="
                        mt-3
                        font-['Inter']
                        text-xs
                        font-semibold
                        text-[#123138]/65
                      "
                    >
                      Upload your photo
                    </p>

                    <p
                      className="
                        mt-1
                        font-['Inter']
                        text-[10px]
                        text-[#123138]/35
                      "
                    >
                      JPG, PNG or WEBP · Max 5 MB
                    </p>
                  </button>
                ) : (
                  <div
                    className="
                      flex
                      items-center
                      gap-4
                      rounded-2xl
                      border
                      border-[#123138]/10
                      bg-white/70
                      p-3
                    "
                  >
                    <img
                      src={avatarPreview}
                      alt="Profile preview"
                      className="
                        h-20
                        w-20
                        shrink-0
                        rounded-xl
                        object-cover
                      "
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <ImageIcon
                          className="
                            h-4
                            w-4
                            shrink-0
                            text-[#1EA5BE]
                          "
                        />

                        <p
                          className="
                            truncate
                            font-['Inter']
                            text-xs
                            font-medium
                            text-[#123138]
                          "
                        >
                          {avatar?.name}
                        </p>
                      </div>

                      <p
                        className="
                          mt-1
                          font-['Inter']
                          text-[10px]
                          text-[#123138]/35
                        "
                      >
                        Photo ready to upload
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={removeAvatar}
                      disabled={isSubmitting}
                      aria-label="Remove photo"
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        cursor-pointer
                        items-center
                        justify-center
                        rounded-full
                        text-[#123138]/35
                        transition-all
                        duration-300
                        hover:bg-red-50
                        hover:text-red-500
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                      "
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>

              {/* ==================================================
                  NOTICE
              ================================================== */}

              <div
                className="
                  mt-7
                  flex
                  items-start
                  gap-3
                  rounded-2xl
                  border
                  border-[#1EA5BE]/10
                  bg-[#1EA5BE]/[0.04]
                  px-4
                  py-4
                "
              >
                <CheckCircle2
                  className="
                    mt-0.5
                    h-4
                    w-4
                    shrink-0
                    text-[#1EA5BE]
                  "
                />

                <p
                  className="
                    font-['Inter']
                    text-[11px]
                    leading-5
                    text-[#123138]/50
                  "
                >
                  Your testimonial will be reviewed
                  by our team before it appears
                  publicly on the website.
                </p>
              </div>

              {/* ==================================================
                  ACTIONS
              ================================================== */}

              <div
                className="
                  mt-8
                  flex
                  flex-col-reverse
                  gap-3
                  pb-1
                  sm:flex-row
                  sm:justify-end
                "
              >
                {/* CANCEL */}

                <button
                  type="button"
                  onClick={() =>
                    onClose?.()
                  }
                  disabled={isSubmitting}
                  className="
                    inline-flex
                    h-12
                    cursor-pointer
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#123138]/10
                    bg-white
                    px-6
                    font-['Inter']
                    text-sm
                    font-semibold
                    text-[#123138]/65
                    transition-all
                    duration-300
                    hover:border-[#123138]/20
                    hover:bg-[#123138]/[0.03]
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  Cancel
                </button>

                {/* SUBMIT */}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    group
                    inline-flex
                    h-12
                    cursor-pointer
                    items-center
                    justify-center
                    gap-2.5
                    rounded-full
                    bg-[#F58634]
                    px-7
                    font-['Inter']
                    text-sm
                    font-semibold
                    text-white
                    shadow-[0_12px_30px_-10px_rgba(245,134,52,0.5)]
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:bg-[#D9701F]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                    disabled:hover:translate-y-0
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#F58634]/40
                  "
                >
                  {isSubmitting ? (
                    <>
                      <Loader2
                        className="
                          h-4
                          w-4
                          animate-spin
                        "
                      />

                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Testimonial

                      <span
                        className="
                          transition-transform
                          duration-300
                          group-hover:translate-x-0.5
                        "
                      >
                        →
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}