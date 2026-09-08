import { useState } from "react";
import { useNavigate } from "react-router";
import { Mail, Lock, Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";
import { adminLogin } from "../services/adminApi";

const NAVY = "#101A2E";
const GOLD = "#C9A24B";
const CREAM = "#F4EFE4";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({ ...previous, [name]: value }));

    if (error) setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!formData.email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!formData.password) {
      setError("Password is required.");
      return;
    }

    try {
      setLoading(true);
      await adminLogin(formData.email.trim(), formData.password);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message || "Unable to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12"
      style={{ backgroundColor: NAVY }}
    >
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full opacity-[0.12] blur-3xl"
        style={{ backgroundColor: GOLD }}
      />

      <div className="relative w-full max-w-md">
        <div className="mb-10 text-center">
          <div
            className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border"
            style={{ borderColor: `${GOLD}40`, backgroundColor: `${GOLD}0D` }}
          >
            <ShieldCheck size={22} strokeWidth={1.6} style={{ color: GOLD }} />
          </div>

          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-[1px] w-10" style={{ backgroundColor: GOLD }} />
            <span
              className="font-['Inter'] text-xs uppercase tracking-[0.3em]"
              style={{ color: GOLD }}
            >
              Times India Travels
            </span>
            <span className="h-[1px] w-10" style={{ backgroundColor: GOLD }} />
          </div>

          <h1 className="font-['Inter'] text-3xl font-medium text-[#F4EFE4] md:text-4xl">
            Admin Portal
          </h1>

          <p className="mt-3 font-['Inter'] text-sm text-[#C7BFA9]">
            Sign in to manage your travel platform.
          </p>
        </div>

        <div
          className="rounded-2xl p-7 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.5)] md:p-9"
          style={{ backgroundColor: CREAM }}
        >
          <div className="mb-7">
            <h2 className="font-['Inter'] text-xl font-medium text-[#101A2E]">
              Welcome back
            </h2>
            <p className="mt-1 font-['Inter'] text-sm text-[#101A2E]/60">
              Enter your administrator credentials.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
              <p className="font-['Inter'] text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="admin-email"
                className="mb-2 block font-['Inter'] text-xs uppercase tracking-[0.12em] text-[#101A2E]/70"
              >
                Email
              </label>

              <div className="relative">
                <Mail
                  size={16}
                  strokeWidth={1.7}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#101A2E]/35"
                />
                <input
                  id="admin-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  placeholder="admin@example.com"
                  disabled={loading}
                  className="w-full rounded-lg border border-[#101A2E]/15 bg-white py-3 pl-11 pr-4 text-[#101A2E] outline-none transition-all duration-300 focus:border-[#C9A24B] focus:ring-1 focus:ring-[#C9A24B] disabled:opacity-60"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="mb-2 block font-['Inter'] text-xs uppercase tracking-[0.12em] text-[#101A2E]/70"
              >
                Password
              </label>

              <div className="relative">
                <Lock
                  size={16}
                  strokeWidth={1.7}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#101A2E]/35"
                />
                <input
                  id="admin-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  disabled={loading}
                  className="w-full rounded-lg border border-[#101A2E]/15 bg-white py-3 pl-11 pr-11 text-[#101A2E] outline-none transition-all duration-300 focus:border-[#C9A24B] focus:ring-1 focus:ring-[#C9A24B] disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((show) => !show)}
                  tabIndex={-1}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#101A2E]/35 transition-colors hover:text-[#101A2E]/70"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff size={16} strokeWidth={1.7} />
                  ) : (
                    <Eye size={16} strokeWidth={1.7} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-[#101A2E] py-3.5 font-['Inter'] text-sm uppercase tracking-[0.08em] text-[#F4EFE4] transition-all duration-300 hover:bg-[#C9A24B] hover:text-[#101A2E] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading && <Loader2 size={15} strokeWidth={2} className="animate-spin" />}
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center font-['Inter'] text-xs text-[#C7BFA9]/60">
          Authorized personnel only.
        </p>
      </div>
    </main>
  );
}