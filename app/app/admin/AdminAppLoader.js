"use client";

import dynamic from "next/dynamic";
import AdminLoading from "../../legacy-utils/AdminLoading";

const AdminApp = dynamic(() => import("./AdminApp"), {
  ssr: false,
  loading: () => <AdminLoading />,
});

export default function AdminAppLoader() {
  return <AdminApp />;
}