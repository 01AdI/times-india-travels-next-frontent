"use client";

import { BrowserRouter } from "react-router";
import AdminRoute from "../../legacy-routes/AdminRoute";

export default function AdminApp() {
  return (
    <BrowserRouter basename="/admin">
      <AdminRoute />
    </BrowserRouter>
  );
}