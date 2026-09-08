import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  ArrowLeft,
  ImagePlus,
  Video,
  Link as LinkIcon,
  Save,
  X,
  MonitorPlay,
  Upload,
} from "lucide-react";

import {
  createAdminHero,
} from "../../services/adminApi";

export default function AdminHomeHeroCreate() {
  const navigate = useNavigate();
  const location = useLocation();

  const nextOrder = location.state?.nextOrder ?? 0;
  
  const [formData, setFormData] = useState({
    place: "",
    line: "",
    mediaType: "image",
    mediaUrl: "",
    active: true,
    order: nextOrder,
  });

  const [mediaFile, setMediaFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleMediaTypeChange = (type) => {
    setFormData((previous) => ({
      ...previous,
      mediaType: type,
      mediaUrl: "",
    }));

    setMediaFile(null);
    setPreviewUrl("");
    setError("");
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const expectedType =
      formData.mediaType === "image"
        ? "image/"
        : "video/";

    if (!file.type.startsWith(expectedType)) {
      setError(
        `Please select a valid ${formData.mediaType} file.`
      );
      return;
    }

    const maxSize =
      formData.mediaType === "image"
        ? 10 * 1024 * 1024
        : 100 * 1024 * 1024;

    if (file.size > maxSize) {
      setError(
        formData.mediaType === "image"
          ? "Image size must be less than 10MB."
          : "Video size must be less than 100MB."
      );
      return;
    }

    setError("");
    setMediaFile(file);

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    setFormData((previous) => ({
      ...previous,
      mediaUrl: "",
    }));
  };

  useEffect(() => {
    if (
      !mediaFile &&
      formData.mediaUrl.trim()
    ) {
      setPreviewUrl(
        formData.mediaUrl.trim()
      );
    }

    if (
      !mediaFile &&
      !formData.mediaUrl.trim()
    ) {
      setPreviewUrl("");
    }
  }, [
    formData.mediaUrl,
    mediaFile,
  ]);

  const removeMedia = () => {
    setMediaFile(null);
    setPreviewUrl("");

    setFormData((previous) => ({
      ...previous,
      mediaUrl: "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      if (!formData.place.trim()) {
        setError("Place is required.");
        return;
      }

      if (!formData.line.trim()) {
        setError("Hero line is required.");
        return;
      }

      if (
        !mediaFile &&
        !formData.mediaUrl.trim()
      ) {
        setError(
          "Please upload media or provide a media URL."
        );
        return;
      }

      const numericOrder = Number(
        formData.order
      );

      if (
        !Number.isInteger(numericOrder) ||
        numericOrder < 0
      ) {
        setError(
          "Display order must be a valid non-negative number."
        );
        return;
      }

      const response =
        await createAdminHero({
          place: formData.place,
          line: formData.line,
          mediaType: formData.mediaType,
          media: mediaFile,
          mediaUrl: formData.mediaUrl,
          active: formData.active,
          order: numericOrder,
        });

      setSuccess(
        response?.message ||
          "Hero slide created successfully."
      );

      setTimeout(() => {
        navigate("/home-hero");
      }, 700);
    } catch (error) {
      console.error(
        "Failed to create hero slide:",
        error
      );

      setError(
        error.message ||
          "Something went wrong while creating the hero slide."
      );
    } finally {
      setSaving(false);
    }
  };

  const renderPreview = () => {
    if (!previewUrl) {
      return (
        <div className="h-full min-h-[360px] flex flex-col items-center justify-center bg-[#0B1720] text-white">
          <MonitorPlay
            size={38}
            strokeWidth={1}
            className="text-white/30"
          />

          <p className="mt-4 text-sm text-white/50">
            Media preview
          </p>

          <p className="mt-1 text-[10px] text-white/30">
            Upload a file or enter a URL
          </p>
        </div>
      );
    }

    if (
      formData.mediaType === "video"
    ) {
      return (
        <video
          src={previewUrl}
          controls
          muted
          playsInline
          className="w-full h-full min-h-[360px] object-cover"
        />
      );
    }

    return (
      <img
        src={previewUrl}
        alt="Hero preview"
        className="w-full h-full min-h-[360px] object-cover"
      />
    );
  };

  return (
    <section className="space-y-7">

      <div>

        <button
          type="button"
          onClick={() =>
            navigate("/home-hero")
          }
          className="inline-flex items-center gap-2 text-xs text-[#68717D] hover:text-[#101A2E]"
        >
          <ArrowLeft size={14} />
          Back to Home Hero
        </button>

        <p className="mt-5 text-[10px] uppercase tracking-[0.22em] text-[#C9A24B]">
          Homepage Management
        </p>

        <h2 className="mt-2 text-2xl md:text-3xl font-medium text-[#101A2E]">
          Create Hero Slide
        </h2>

        <p className="mt-2 text-sm text-[#6F7782]">
          Create a premium visual introduction for your
          homepage.
        </p>

      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4">
          <p className="text-sm text-red-600">
            {error}
          </p>
        </div>
      )}

      {success && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4">
          <p className="text-sm text-emerald-600">
            {success}
          </p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 xl:grid-cols-[1fr_0.95fr] gap-6"
      >

        <div className="space-y-6">

          {/* CONTENT */}

          <div className="bg-white border border-[#101A2E]/8 rounded-2xl p-6">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-9 h-9 rounded-xl bg-[#101A2E]/5 flex items-center justify-center">
                <MonitorPlay
                  size={17}
                  className="text-[#101A2E]"
                />
              </div>

              <div>
                <h3 className="text-sm font-medium text-[#101A2E]">
                  Hero Content
                </h3>

                <p className="text-xs text-[#8A929D] mt-1">
                  Define the text displayed over the hero.
                </p>
              </div>

            </div>

            <div className="space-y-5">

              {/* PLACE */}

              <div>

                <label className="block text-xs font-medium text-[#4E5762] mb-2">
                  Place / Destination *
                </label>

                <input
                  type="text"
                  name="place"
                  value={formData.place}
                  onChange={handleChange}
                  placeholder="Rajasthan"
                  className="w-full h-11 px-4 rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] text-sm text-[#101A2E] outline-none focus:border-[#C9A24B]"
                />

              </div>

              {/* LINE */}

              <div>

                <label className="block text-xs font-medium text-[#4E5762] mb-2">
                  Hero Line *
                </label>

                <textarea
                  name="line"
                  value={formData.line}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Where every journey becomes a story."
                  className="w-full px-4 py-3 rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] text-sm leading-6 text-[#101A2E] outline-none resize-none focus:border-[#C9A24B]"
                />

              </div>

            </div>

          </div>

          {/* MEDIA */}

          <div className="bg-white border border-[#101A2E]/8 rounded-2xl p-6">

            <div className="flex items-center justify-between">

              <div>
                <h3 className="text-sm font-medium text-[#101A2E]">
                  Hero Media
                </h3>

                <p className="mt-1 text-xs text-[#8A929D]">
                  Choose an image or cinematic video.
                </p>
              </div>

            </div>

            {/* TYPE */}

            <div className="mt-5 grid grid-cols-2 gap-3">

              <button
                type="button"
                onClick={() =>
                  handleMediaTypeChange("image")
                }
                className={`h-12 rounded-xl border flex items-center justify-center gap-2 text-xs transition-all ${
                  formData.mediaType === "image"
                    ? "border-[#C9A24B] bg-[#C9A24B]/8 text-[#101A2E]"
                    : "border-[#101A2E]/10 bg-[#F8F9F9] text-[#68717D]"
                }`}
              >
                <ImagePlus size={15} />
                Image
              </button>

              <button
                type="button"
                onClick={() =>
                  handleMediaTypeChange("video")
                }
                className={`h-12 rounded-xl border flex items-center justify-center gap-2 text-xs transition-all ${
                  formData.mediaType === "video"
                    ? "border-[#C9A24B] bg-[#C9A24B]/8 text-[#101A2E]"
                    : "border-[#101A2E]/10 bg-[#F8F9F9] text-[#68717D]"
                }`}
              >
                <Video size={15} />
                Video
              </button>

            </div>

            {/* URL */}

            <div className="mt-5">

              <label className="block text-xs font-medium text-[#4E5762] mb-2">
                {formData.mediaType === "image"
                  ? "Image URL"
                  : "Video URL"}
              </label>

              <div className="relative">

                <LinkIcon
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9AA1AA]"
                />

                <input
                  type="url"
                  name="mediaUrl"
                  value={formData.mediaUrl}
                  onChange={(event) => {
                    setMediaFile(null);
                    handleChange(event);
                  }}
                  placeholder={
                    formData.mediaType === "image"
                      ? "https://example.com/image.jpg"
                      : "https://example.com/video.mp4"
                  }
                  className="w-full h-11 pl-11 pr-4 rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] text-sm text-[#101A2E] outline-none focus:border-[#C9A24B]"
                />

              </div>

            </div>

            {/* DIVIDER */}

            <div className="flex items-center gap-3 my-5">

              <div className="flex-1 h-px bg-[#101A2E]/8" />

              <span className="text-[10px] uppercase tracking-widest text-[#9AA1AA]">
                or
              </span>

              <div className="flex-1 h-px bg-[#101A2E]/8" />

            </div>

            {/* UPLOAD */}

            <label className="flex items-center justify-center gap-2 h-12 rounded-xl border border-dashed border-[#101A2E]/15 bg-[#F8F9F9] cursor-pointer hover:border-[#C9A24B] transition-colors text-xs text-[#68717D]">

              <Upload size={15} />

              Upload {formData.mediaType}

              <input
                type="file"
                accept={
                  formData.mediaType === "image"
                    ? "image/*"
                    : "video/*"
                }
                onChange={handleFileChange}
                className="hidden"
              />

            </label>

            {mediaFile && (
              <div className="mt-3 flex items-center justify-between px-3 py-2 rounded-lg bg-[#F8F9F9]">

                <p className="text-xs text-[#68717D] truncate">
                  {mediaFile.name}
                </p>

                <button
                  type="button"
                  onClick={removeMedia}
                  className="ml-3 text-red-500"
                >
                  <X size={14} />
                </button>

              </div>
            )}

          </div>

          {/* SETTINGS */}

          <div className="bg-white border border-[#101A2E]/8 rounded-2xl p-6">

            <h3 className="text-sm font-medium text-[#101A2E]">
              Display Settings
            </h3>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* ORDER */}

              <div>

                <label className="block text-xs font-medium text-[#4E5762] mb-2">
                  Display Order
                </label>

                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  readOnly
                  className="w-full h-11 px-4 rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] text-sm text-[#101A2E] outline-none focus:border-[#C9A24B]"
                />
                <p className="mt-2 text-[10px] text-[#9AA1AA]">
                  Automatically assigned based on the current hero slides.
                </p>

              </div>

              {/* ACTIVE */}

              <div>

                <label className="block text-xs font-medium text-[#4E5762] mb-2">
                  Visibility
                </label>

                <label className="h-11 px-4 rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] flex items-center gap-3 cursor-pointer">

                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(event) =>
                      setFormData((previous) => ({
                        ...previous,
                        active:
                          event.target.checked,
                      }))
                    }
                    className="w-4 h-4 accent-[#C9A24B]"
                  />

                  <span className="text-sm text-[#68717D]">
                    Active on homepage
                  </span>

                </label>

              </div>

            </div>

          </div>

        </div>

        <div className="xl:sticky xl:top-6 self-start">

          <div className="bg-white border border-[#101A2E]/8 rounded-2xl overflow-hidden">

            <div className="px-6 py-4 border-b border-[#101A2E]/8">

              <div className="flex items-center justify-between">

                <div>
                  <h3 className="text-sm font-medium text-[#101A2E]">
                    Live Preview
                  </h3>

                  <p className="text-[10px] text-[#8A929D] mt-1">
                    Homepage hero appearance
                  </p>
                </div>

                <span className="text-[9px] uppercase tracking-widest text-[#C9A24B]">
                  Preview
                </span>

              </div>

            </div>

            <div className="relative aspect-[4/5] overflow-hidden bg-[#0B1720]">

              {previewUrl ? (
                <>
                  {renderPreview()}

                  <div className="absolute inset-0 bg-black/35" />

                  <div className="absolute inset-x-0 bottom-0 p-7 text-white">

                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/65">
                      {formData.place ||
                        "Destination"}
                    </p>

                    <h4 className="mt-3 text-2xl font-light leading-tight">
                      {formData.line ||
                        "Your hero headline goes here."}
                    </h4>

                  </div>
                </>
              ) : (
                renderPreview()
              )}

            </div>

          </div>

        </div>

      </form>

      <div className="flex justify-end gap-3">

        <button
          type="button"
          onClick={() =>
            navigate("/home-hero")
          }
          className="h-11 px-5 rounded-xl border border-[#101A2E]/10 bg-white text-xs text-[#101A2E] hover:bg-[#F8F9F9]"
        >
          Cancel
        </button>

        <button
          type="submit"
          form=""
          disabled={saving}
          onClick={() => {
            document
              .querySelector(
                "form"
              )
              ?.requestSubmit();
          }}
          className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-[#101A2E] text-white text-xs hover:bg-[#C9A24B] hover:text-[#101A2E] disabled:opacity-50"
        >
          {saving ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save size={14} />
          )}

          {saving
            ? "Creating..."
            : "Create Hero Slide"}
        </button>

      </div>

    </section>
  );
}
