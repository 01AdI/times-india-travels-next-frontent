import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";

import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

import { getAdminToken, clearAdminAuth } from "../utils/auth";
import { getCurrentAdmin } from "../services/adminApi";

const NAVY = "#101A2E";
const GOLD = "#C9A24B";
const BG = "#F5F7F6";

export default function AdminLayout() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAdminAuth = async () => {
      const token = getAdminToken();

      if (!token) {
        navigate("/login", { replace: true });
        setCheckingAuth(false);
        return;
      }

      try {
        const response = await getCurrentAdmin();
        setAdmin(response.admin);
      } catch (error) {
        console.error("Admin authentication failed:", error);
        clearAdminAuth();
        navigate("/login", { replace: true });
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAdminAuth();
  }, [navigate]);

  if (checkingAuth) {
    return (
      <main
        className="flex min-h-screen items-center justify-center"
        style={{ backgroundColor: NAVY }}
      >
        <div className="text-center">
          <div
            className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full"
            style={{ border: `1px solid ${GOLD}33` }}
          >
            <span
              className="font-['Inter'] text-[15px] font-semibold"
              style={{ color: GOLD }}
            >
              T
            </span>
          </div>

          <div
            className="mx-auto mb-5 h-7 w-7 animate-spin rounded-full"
            style={{
              border: `2px solid ${GOLD}26`,
              borderTopColor: GOLD,
            }}
          />

          <p className="font-['Inter'] text-[13px] tracking-wide text-[#C7BFA9]">
            Verifying administrator access
          </p>
        </div>
      </main>
    );
  }

  if (!admin) {
    return null;
  }

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: BG }}>
      <AdminSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader />

        <main className="flex-1 animate-[fadeIn_0.3s_ease-out] p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}