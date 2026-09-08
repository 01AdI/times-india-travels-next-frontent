import { useEffect, useState } from "react";
import { Link } from "react-router";

import {
  Users,
  UserPlus,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Clock3,
  ArrowUpRight,
  FileText,
  Car,
  MessageSquare,
  Globe2,
  MapPin,
  Package,
} from "lucide-react";

import { getDashboardStats, getTourEnquiries } from "../services/adminApi";

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const [statsResponse, enquiriesResponse] = await Promise.all([
          getDashboardStats(),
          getTourEnquiries({ page: 1, limit: 5 }),
        ]);

        setDashboardData(statsResponse?.data || {});

        const enquiries =
          enquiriesResponse?.data?.enquiries ||
          enquiriesResponse?.enquiries ||
          enquiriesResponse?.data?.items ||
          enquiriesResponse?.items ||
          [];

        setRecentEnquiries(Array.isArray(enquiries) ? enquiries.slice(0, 5) : []);
      } catch (error) {
        setError(error.message || "Unable to load dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-5 h-8 w-8 animate-spin rounded-full border-2 border-[#C9A24B]/30 border-t-[#C9A24B]" />
          <p className="text-sm text-[#101A2E]/55">Loading dashboard...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
            <AlertTriangle size={20} className="text-red-500" />
          </div>
          <h2 className="text-xl font-medium text-[#101A2E]">
            Unable to load dashboard
          </h2>
          <p className="mt-2 text-sm text-[#101A2E]/50">{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-5 cursor-pointer rounded-lg bg-[#101A2E] px-5 py-2.5 text-sm text-[#F4EFE4] transition-all duration-300 hover:bg-[#C9A24B] hover:text-[#101A2E]"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  const overview = dashboardData?.overview || {};
  const risk = dashboardData?.risk || {};
  const period = dashboardData?.period || {};

  const topNationalities = dashboardData?.topNationalities || [];
  const topIpCountries = dashboardData?.topIpCountries || [];
  const topTourPackages = dashboardData?.topTourPackages || [];

  const stats = {
    totalEnquiries: overview.total || 0,
    newEnquiries: overview.new || 0,
    confirmed: overview.confirmed || 0,
    highRisk: risk.highRisk || 0,
  };

  const enquiryStatusValues = [
    { label: "New", value: overview.new || 0 },
    { label: "Contacted", value: overview.contacted || 0 },
    { label: "Quotation Sent", value: overview.quotationSent || 0 },
    { label: "Follow Up", value: overview.followUp || 0 },
    { label: "Confirmed", value: overview.confirmed || 0 },
    { label: "Cancelled", value: overview.cancelled || 0 },
  ];

  const enquiryStatus = enquiryStatusValues.map((item) => ({
    ...item,
    percentage:
      stats.totalEnquiries > 0
        ? Math.round((item.value / stats.totalEnquiries) * 100)
        : 0,
  }));

  const riskData = [
    { label: "Normal", value: risk.normal || 0 },
    { label: "Suspicious", value: risk.suspicious || 0 },
    { label: "High Risk", value: risk.highRisk || 0 },
  ];

  const statCards = [
    { title: "Total Enquiries", value: stats.totalEnquiries, description: "All tour enquiries", icon: Users },
    { title: "New Enquiries", value: stats.newEnquiries, description: "Awaiting first contact", icon: UserPlus },
    { title: "Confirmed", value: stats.confirmed, description: "Successfully converted", icon: CheckCircle2 },
    { title: "High Risk", value: stats.highRisk, description: "Requires attention", icon: AlertTriangle },
  ];

  const normalizeStatus = (status) => {
    if (!status) return "";
    return String(status).trim().toLowerCase().replace(/_/g, "-").replace(/\s+/g, "-");
  };

  const getStatusLabel = (status) => {
    const normalized = normalizeStatus(status);
    const labels = {
      new: "New",
      contacted: "Contacted",
      "quotation-sent": "Quotation Sent",
      "follow-up": "Follow Up",
      confirmed: "Confirmed",
      cancelled: "Cancelled",
    };
    return labels[normalized] || status || "Unknown";
  };

  const getRiskLabel = (riskLevel) => {
    const normalized = String(riskLevel || "").trim().toLowerCase().replace(/_/g, "-").replace(/\s+/g, "-");
    if (normalized === "high-risk" || normalized === "high") return "High Risk";
    if (normalized === "suspicious" || normalized === "medium") return "Suspicious";
    return "Normal";
  };

  const getRiskClasses = (riskLevel) => {
    const label = getRiskLabel(riskLevel);
    if (label === "High Risk") return "bg-red-50 text-red-600 border-red-100";
    if (label === "Suspicious") return "bg-amber-50 text-amber-600 border-amber-100";
    return "bg-emerald-50 text-emerald-600 border-emerald-100";
  };

  const getStatusClasses = (status) => {
    const normalized = normalizeStatus(status);
    if (normalized === "confirmed") return "bg-emerald-50 text-emerald-600";
    if (normalized === "cancelled") return "bg-red-50 text-red-600";
    if (normalized === "new") return "bg-blue-50 text-blue-600";
    return "bg-[#C9A24B]/10 text-[#8B6D24]";
  };

  const formatDate = (date) => {
    if (!date) return "—";
    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) return "—";
    return parsedDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getEnquiryName = (enquiry) =>
    enquiry.name || enquiry.fullName || enquiry.customerName || "Unknown customer";

  const getEnquiryEmail = (enquiry) => enquiry.email || enquiry.customerEmail || "No email";

  const getEnquiryPackage = (enquiry) =>
    enquiry.package || enquiry.tourPackage || enquiry.tourPackageName || enquiry.packageName || "Custom enquiry";

  const getEnquiryDate = (enquiry) =>
    enquiry.createdAt || enquiry.created_at || enquiry.submittedAt || enquiry.date;

  const getEnquiryId = (enquiry) => enquiry._id || enquiry.id;

  return (
    <div className="space-y-8">
      <section>
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#C9A24B]">
              Overview
            </p>
            <h1 className="text-3xl font-medium text-[#101A2E] md:text-4xl">
              Dashboard
            </h1>
            <p className="mt-2 text-sm text-[#101A2E]/55">
              Monitor enquiries, leads and business activity.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-[#101A2E]/50">
            <Clock3 size={16} />
            <span>Live dashboard data</span>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-[#101A2E]/8 bg-white p-5 transition-shadow duration-300 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#101A2E]">
                  <Icon size={19} className="text-[#C9A24B]" />
                </div>
                <div className="flex items-center gap-1 text-xs text-emerald-600">
                  <TrendingUp size={13} />
                  Live
                </div>
              </div>

              <div className="mt-6">
                <p className="text-xs uppercase tracking-[0.08em] text-[#101A2E]/50">
                  {stat.title}
                </p>
                <p className="mt-1 text-3xl font-medium text-[#101A2E]">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-[#101A2E]/45">{stat.description}</p>
              </div>
            </div>
          );
        })}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-[#101A2E]/8 bg-white p-6 xl:col-span-2">
          <div className="mb-7 flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#C9A24B]">
                Enquiries
              </p>
              <h2 className="mt-1 text-xl font-medium text-[#101A2E]">
                Enquiry Overview
              </h2>
            </div>

            <Link
              to="/tour-enquiries"
              className="cursor-pointer flex items-center gap-1 text-xs text-[#101A2E]/55 transition-colors hover:text-[#C9A24B]"
            >
              View all
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="space-y-5">
            {enquiryStatus.map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-[#101A2E]/70">{item.label}</span>
                  <span className="text-sm font-medium text-[#101A2E]">
                    {item.value}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-[#101A2E]/6">
                  <div
                    className="h-full rounded-full bg-[#C9A24B] transition-all duration-700"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#101A2E]/8 bg-white p-6">
          <div className="mb-7">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#C9A24B]">
              Security
            </p>
            <h2 className="mt-1 text-xl font-medium text-[#101A2E]">Lead Risk</h2>
          </div>

          <div className="space-y-5">
            {riskData.map((item) => {
              const percentage =
                stats.totalEnquiries > 0
                  ? (item.value / stats.totalEnquiries) * 100
                  : 0;

              const isHighRisk = item.label === "High Risk";
              const isSuspicious = item.label === "Suspicious";

              return (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          isHighRisk
                            ? "bg-red-500"
                            : isSuspicious
                            ? "bg-amber-500"
                            : "bg-emerald-500"
                        }`}
                      />
                      <span className="text-sm text-[#101A2E]/70">{item.label}</span>
                    </div>

                    <span className="text-sm font-medium text-[#101A2E]">
                      {item.value}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-[#101A2E]/6">
                    <div
                      className={`h-full rounded-full ${
                        isHighRisk
                          ? "bg-red-500"
                          : isSuspicious
                          ? "bg-amber-500"
                          : "bg-emerald-500"
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-7 border-t border-[#101A2E]/8 pt-5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#101A2E]/50">Requires attention</span>
              <span className="text-sm font-medium text-red-600">
                {stats.highRisk}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "Today", value: period.today || 0, description: "Enquiries received today" },
          { label: "This Week", value: period.thisWeek || 0, description: "Enquiries this week" },
          { label: "This Month", value: period.thisMonth || 0, description: "Enquiries this month" },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl border border-[#101A2E]/8 bg-white p-5">
            <p className="text-xs uppercase tracking-[0.08em] text-[#101A2E]/45">
              {item.label}
            </p>
            <p className="mt-2 text-2xl font-medium text-[#101A2E]">{item.value}</p>
            <p className="mt-1 text-xs text-[#101A2E]/45">{item.description}</p>
          </div>
        ))}
      </section>

      <section>
        <div className="mb-5">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#C9A24B]">
            Lead Intelligence
          </p>
          <h2 className="mt-1 text-xl font-medium text-[#101A2E]">Lead Insights</h2>
          <p className="mt-1 text-xs text-[#101A2E]/45">
            Understand where your enquiries are coming from and which tours
            attract the most interest.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {[
            {
              eyebrow: "Traveller Profile",
              title: "Top Nationalities",
              icon: Globe2,
              data: topNationalities,
              emptyText: "No nationality data available yet.",
              barKey: "country",
              barColor: "bg-[#C9A24B]",
            },
            {
              eyebrow: "Visitor Origin",
              title: "Top Visitor Countries",
              icon: MapPin,
              data: topIpCountries,
              emptyText: "No visitor location data available yet.",
              barKey: "country",
              barColor: "bg-[#101A2E]",
            },
            {
              eyebrow: "Tour Demand",
              title: "Most Requested Tours",
              icon: Package,
              data: topTourPackages,
              emptyText: "No tour package data available yet.",
              barKey: "name",
              barColor: "bg-[#C9A24B]",
            },
          ].map((panel) => {
            const Icon = panel.icon;
            const maxCount = panel.data[0]?.count || 1;

            return (
              <div
                key={panel.title}
                className="rounded-2xl border border-[#101A2E]/8 bg-white p-6"
              >
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-[#C9A24B]">
                      {panel.eyebrow}
                    </p>
                    <h3 className="mt-1 text-lg font-medium text-[#101A2E]">
                      {panel.title}
                    </h3>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#101A2E]">
                    <Icon size={18} className="text-[#C9A24B]" />
                  </div>
                </div>

                {panel.data.length === 0 ? (
                  <div className="py-8 text-center">
                    <Icon size={22} className="mx-auto text-[#101A2E]/20" />
                    <p className="mt-3 text-xs text-[#101A2E]/40">
                      {panel.emptyText}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {panel.data.slice(0, 5).map((item, index) => {
                      const percentage = (item.count / maxCount) * 100;
                      const label = item[panel.barKey];

                      return (
                        <div key={`${label}-${index}`}>
                          <div className="mb-1.5 flex items-center justify-between">
                            <div className="flex min-w-0 items-center gap-2">
                              <span className="w-4 text-[10px] text-[#101A2E]/35">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                              <span
                                className="truncate text-sm text-[#101A2E]/70"
                                title={label}
                              >
                                {label}
                              </span>
                            </div>
                            <span className="text-xs font-medium text-[#101A2E]">
                              {item.count}
                            </span>
                          </div>

                          <div className="ml-6 h-1.5 overflow-hidden rounded-full bg-[#101A2E]/6">
                            <div
                              className={`h-full rounded-full ${panel.barColor} transition-all duration-700`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <div className="mb-4">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#C9A24B]">
            Management
          </p>
          <h2 className="mt-1 text-xl font-medium text-[#101A2E]">Quick Actions</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              to: "/tour-enquiries",
              icon: MessageSquare,
              title: "Tour Enquiries",
              description: "Review and manage customer enquiries.",
            },
            {
              to: "/car-rental-enquiries",
              icon: Car,
              title: "Car Rentals",
              description: "Manage incoming car rental requests.",
            },
            {
              to: "/blogs",
              icon: FileText,
              title: "Content",
              description: "Manage website content and media.",
            },
          ].map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.to}
                to={action.to}
                className="cursor-pointer group rounded-2xl border border-[#101A2E]/8 bg-white p-5 text-left transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#101A2E]">
                    <Icon size={18} className="text-[#C9A24B]" />
                  </div>
                  <ArrowUpRight
                    size={17}
                    className="text-[#101A2E]/30 transition-colors group-hover:text-[#C9A24B]"
                  />
                </div>

                <h3 className="mt-5 font-medium text-[#101A2E]">{action.title}</h3>
                <p className="mt-1 text-xs text-[#101A2E]/45">{action.description}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-[#101A2E]/8 bg-white">
        <div className="flex items-center justify-between p-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#C9A24B]">
              Latest activity
            </p>
            <h2 className="mt-1 text-xl font-medium text-[#101A2E]">
              Recent Enquiries
            </h2>
          </div>

          <Link
            to="/tour-enquiries"
            className="cursor-pointer flex items-center gap-1 text-xs text-[#101A2E]/55 transition-colors hover:text-[#C9A24B]"
          >
            View all
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead>
              <tr className="border-y border-[#101A2E]/8 bg-[#101A2E]/[0.025]">
                <th className="px-6 py-3 text-left text-[10px] font-medium uppercase tracking-[0.12em] text-[#101A2E]/45">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-[10px] font-medium uppercase tracking-[0.12em] text-[#101A2E]/45">
                  Tour Package
                </th>
                <th className="px-6 py-3 text-left text-[10px] font-medium uppercase tracking-[0.12em] text-[#101A2E]/45">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-[10px] font-medium uppercase tracking-[0.12em] text-[#101A2E]/45">
                  Risk
                </th>
                <th className="px-6 py-3 text-right text-[10px] font-medium uppercase tracking-[0.12em] text-[#101A2E]/45">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {recentEnquiries.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <MessageSquare size={24} className="mx-auto text-[#101A2E]/20" />
                    <p className="mt-3 text-sm text-[#101A2E]/50">No enquiries yet.</p>
                  </td>
                </tr>
              ) : (
                recentEnquiries.map((enquiry) => {
                  const enquiryId = getEnquiryId(enquiry);
                  const status = normalizeStatus(enquiry.status);
                  const riskLevel = enquiry.riskLevel || enquiry.risk || "normal";

                  return (
                    <tr
                      key={enquiryId}
                      className="border-b border-[#101A2E]/6 transition-colors last:border-b-0 hover:bg-[#101A2E]/[0.02]"
                    >
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-[#101A2E]">
                          {getEnquiryName(enquiry)}
                        </p>
                        <p className="mt-0.5 text-xs text-[#101A2E]/40">
                          {getEnquiryEmail(enquiry)}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-sm text-[#101A2E]/65">
                          {getEnquiryPackage(enquiry)}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${getStatusClasses(status)}`}
                        >
                          {getStatusLabel(status)}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium ${getRiskClasses(riskLevel)}`}
                        >
                          {getRiskLabel(riskLevel)}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <span className="text-xs text-[#101A2E]/45">
                          {formatDate(getEnquiryDate(enquiry))}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}