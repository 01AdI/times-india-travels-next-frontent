import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import {
  Bell,
  LogOut,
  User,
  Loader2,
  ChevronDown,
  Settings,
  ClipboardList,
  CarFront,
} from "lucide-react";
import {
  adminLogout,
  getCurrentAdmin,
  getTourEnquiries,
  getCarRentalEnquiries,
} from "../services/adminApi";

const NAVY = "#101A2E";
const GOLD = "#C9A24B";
const POLL_INTERVAL_MS = 60000;

const getRelativeTime = (date) => {
  if (!date) return "";

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "";

  const diffMs = Date.now() - parsed.getTime();
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;

  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;

  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay}d ago`;

  return parsed.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
};

const getEnquiryName = (enquiry) =>
  enquiry.name || enquiry.fullName || enquiry.customerName || "Unknown customer";

const getEnquiryDate = (enquiry) =>
  enquiry.createdAt || enquiry.created_at || enquiry.submittedAt || enquiry.date;

const getEnquiryId = (enquiry) => enquiry._id || enquiry.id;

export default function AdminHeader({
  title = "Dashboard",
  description = "Manage your Times India Travels website.",
}) {
  const [admin, setAdmin] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [notifLoading, setNotifLoading] = useState(true);

  const menuRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    const loadAdmin = async () => {
      try {
        const response = await getCurrentAdmin();
        setAdmin(response?.admin || null);
      } catch (error) {
        console.error("Failed to load current admin:", error);
      }
    };

    loadAdmin();
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadNotifications = async () => {
      try {
        const [tourResponse, carResponse] = await Promise.all([
          getTourEnquiries({ page: 1, limit: 5, status: "new" }),
          getCarRentalEnquiries({ page: 1, limit: 5, status: "new" }),
        ]);

        if (cancelled) return;

        const tourEnquiries =
          tourResponse?.data?.enquiries ||
          tourResponse?.enquiries ||
          tourResponse?.data?.items ||
          tourResponse?.items ||
          [];

        const carEnquiries =
          carResponse?.data?.enquiries ||
          carResponse?.enquiries ||
          carResponse?.data?.items ||
          carResponse?.items ||
          [];

        const merged = [
          ...tourEnquiries.map((enquiry) => ({
            id: getEnquiryId(enquiry),
            type: "tour",
            name: getEnquiryName(enquiry),
            date: getEnquiryDate(enquiry),
            href: "/tour-enquiries",
          })),
          ...carEnquiries.map((enquiry) => ({
            id: getEnquiryId(enquiry),
            type: "car",
            name: getEnquiryName(enquiry),
            date: getEnquiryDate(enquiry),
            href: "/car-rental-enquiries",
          })),
        ].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

        setNotifications(merged);
      } catch (error) {
        console.error("Failed to load notifications:", error);
      } finally {
        if (!cancelled) setNotifLoading(false);
      }
    };

    loadNotifications();
    const interval = setInterval(loadNotifications, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    if (loggingOut) return;

    try {
      setLoggingOut(true);
      await adminLogout();
      window.location.href = "/admin/login";
    } catch (error) {
      console.error("Admin logout error:", error);
      window.location.href = "/admin/login";
    } finally {
      setLoggingOut(false);
    }
  };

  const adminName = admin?.name || "Administrator";
  const adminEmail = admin?.email || "Admin account";
  const adminInitial = adminName.charAt(0).toUpperCase();

  return (
    <header
      className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b px-6 backdrop-blur-md md:px-10"
      style={{
        backgroundColor: "rgba(245, 247, 246, 0.92)",
        borderColor: "rgba(16, 26, 46, 0.08)",
      }}
    >
      <div className="min-w-0">
        <h1
          className="truncate font-['Inter'] text-[20px] font-semibold tracking-tight md:text-[22px]"
          style={{ color: NAVY }}
        >
          {title}
        </h1>
        <p className="mt-1 truncate font-['Inter'] text-[12px] text-[#6F7782]">
          {description}
        </p>
      </div>

      <div className="ml-6 flex shrink-0 items-center gap-2">
        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            aria-label="Notifications"
            onClick={() => setNotifOpen((open) => !open)}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#68717D] transition-colors duration-200 hover:bg-[#101A2E]/[0.06] hover:text-[#101A2E]"
          >
            <Bell size={18} strokeWidth={1.6} />
            {notifications.length > 0 && (
              <span
                className="absolute right-[9px] top-[9px] h-[7px] w-[7px] rounded-full ring-2"
                style={{ backgroundColor: GOLD, boxShadow: `0 0 0 2px #F5F7F6` }}
              />
            )}
          </button>

          {notifOpen && (
            <div
              className="absolute right-0 top-[calc(100%+10px)] w-80 overflow-hidden rounded-xl border bg-white shadow-[0_12px_32px_-8px_rgba(16,26,46,0.18)]"
              style={{ borderColor: "rgba(16,26,46,0.08)" }}
            >
              <div
                className="flex items-center justify-between border-b px-4 py-3"
                style={{ borderColor: "rgba(16,26,46,0.06)" }}
              >
                <span
                  className="font-['Inter'] text-[12px] font-semibold"
                  style={{ color: NAVY }}
                >
                  Notifications
                </span>
                {notifications.length > 0 && (
                  <span
                    className="rounded-full px-2 py-0.5 font-['Inter'] text-[10px] font-medium"
                    style={{ backgroundColor: `${GOLD}1A`, color: "#8B6D24" }}
                  >
                    {notifications.length} new
                  </span>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto">
                {notifLoading ? (
                  <div className="flex items-center justify-center gap-2 px-4 py-8">
                    <Loader2 size={15} className="animate-spin text-[#8B93A0]" />
                    <span className="font-['Inter'] text-[12px] text-[#8B93A0]">
                      Loading...
                    </span>
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="px-4 py-8 text-center font-['Inter'] text-[12px] text-[#8B93A0]">
                    You're all caught up.
                  </div>
                ) : (
                  notifications.map((item) => {
                    const Icon = item.type === "car" ? CarFront : ClipboardList;

                    return (
                      <Link
                        key={`${item.type}-${item.id}`}
                        to={item.href}
                        onClick={() => setNotifOpen(false)}
                        className="flex items-start gap-3 border-b px-4 py-3 transition-colors duration-150 last:border-b-0 hover:bg-[#101A2E]/[0.03]"
                        style={{ borderColor: "rgba(16,26,46,0.05)" }}
                      >
                        <div
                          className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                          style={{ backgroundColor: `${GOLD}1A` }}
                        >
                          <Icon size={14} style={{ color: "#8B6D24" }} strokeWidth={1.8} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p
                            className="truncate font-['Inter'] text-[12.5px] font-medium"
                            style={{ color: NAVY }}
                          >
                            {item.type === "car" ? "New car rental enquiry" : "New tour enquiry"}
                          </p>
                          <p className="truncate font-['Inter'] text-[11.5px] text-[#7A828D]">
                            {item.name}
                          </p>
                        </div>

                        <span className="shrink-0 whitespace-nowrap font-['Inter'] text-[10px] text-[#9AA2AC]">
                          {getRelativeTime(item.date)}
                        </span>
                      </Link>
                    );
                  })
                )}
              </div>

              {notifications.length > 0 && (
                <Link
                  to="/tour-enquiries"
                  onClick={() => setNotifOpen(false)}
                  className="block border-t px-4 py-2.5 text-center font-['Inter'] text-[11.5px] font-medium transition-colors duration-150 hover:bg-[#101A2E]/[0.03]"
                  style={{ borderColor: "rgba(16,26,46,0.06)", color: "#8B6D24" }}
                >
                  View all enquiries
                </Link>
              )}
            </div>
          )}
        </div>

        <div className="mx-1 h-7 w-px bg-[#101A2E]/10" />

        {/* Profile */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-2.5 transition-colors duration-200 hover:bg-[#101A2E]/[0.05]"
          >
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full transition-shadow duration-200"
              style={{
                backgroundColor: NAVY,
                boxShadow: menuOpen ? `0 0 0 2px #F5F7F6, 0 0 0 3.5px ${GOLD}` : "none",
              }}
            >
              {admin ? (
                <span
                  className="font-['Inter'] text-[13px] font-semibold"
                  style={{ color: GOLD }}
                >
                  {adminInitial}
                </span>
              ) : (
                <User size={16} strokeWidth={1.5} style={{ color: GOLD }} />
              )}
            </div>

            <div className="hidden max-w-[160px] text-left sm:block">
              <p
                className="truncate font-['Inter'] text-[12px] font-medium"
                style={{ color: NAVY }}
              >
                {adminName}
              </p>
              <p className="mt-0.5 truncate font-['Inter'] text-[10px] text-[#7A828D]">
                {adminEmail}
              </p>
            </div>

            <ChevronDown
              size={14}
              strokeWidth={1.8}
              className={`hidden shrink-0 text-[#8B93A0] transition-transform duration-200 sm:block ${
                menuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {menuOpen && (
            <div
              className="absolute right-0 top-[calc(100%+10px)] w-56 overflow-hidden rounded-xl border bg-white shadow-[0_12px_32px_-8px_rgba(16,26,46,0.18)]"
              style={{ borderColor: "rgba(16,26,46,0.08)" }}
            >
              <div
                className="border-b px-4 py-3"
                style={{ borderColor: "rgba(16,26,46,0.06)" }}
              >
                <p
                  className="truncate font-['Inter'] text-[13px] font-semibold"
                  style={{ color: NAVY }}
                >
                  {adminName}
                </p>
                <p className="mt-0.5 truncate font-['Inter'] text-[11px] text-[#7A828D]">
                  {adminEmail}
                </p>
              </div>

              <button
                type="button"
                className="flex w-full items-center gap-2.5 px-4 py-2.5 font-['Inter'] text-[12.5px] text-[#3C4552] transition-colors duration-150 hover:bg-[#101A2E]/[0.04]"
              >
                <Settings size={15} strokeWidth={1.7} className="text-[#8B93A0]" />
                Account settings
              </button>

              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex w-full items-center gap-2.5 border-t px-4 py-2.5 font-['Inter'] text-[12.5px] font-medium text-[#B4472E] transition-colors duration-150 hover:bg-[#B4472E]/[0.06] disabled:cursor-not-allowed disabled:opacity-50"
                style={{ borderColor: "rgba(16,26,46,0.06)" }}
              >
                {loggingOut ? (
                  <Loader2 size={15} strokeWidth={1.8} className="animate-spin" />
                ) : (
                  <LogOut size={15} strokeWidth={1.8} />
                )}
                {loggingOut ? "Signing out..." : "Sign out"}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}