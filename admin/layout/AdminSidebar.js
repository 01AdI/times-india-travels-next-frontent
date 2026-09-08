import {
  LayoutDashboard,
  ClipboardList,
  CarFront,
  MessageSquareQuote,
  Newspaper,
  Images,
  Users,
  Film,
  Package,
  FolderTree,
  MapPin,
  CreditCard,
} from "lucide-react";

import { NavLink } from "react-router";

const GOLD = "#C9A24B";

const navigation = [
  {
    section: "Overview",
    items: [
      { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard, end: true },
    ],
  },
  {
    section: "Enquiries",
    items: [
      { name: "Tour Enquiries", path: "/tour-enquiries", icon: ClipboardList },
      { name: "Car Rentals", path: "/car-rental-enquiries", icon: CarFront },
      { name: "Pay Now", path: "/pay-now", icon: CreditCard,},

    ],
  },
  {
    section: "Catalog",
    items: [
      { name: "Tour Packages", path: "/tour-packages", icon: Package },
      { name: "Tour Categories", path: "/tour-categories", icon: FolderTree },
      { name: "Destinations", path: "/destinations", icon: MapPin },
    ],
  },
  {
    section: "Content",
    items: [
      { name: "Testimonials", path: "/testimonials", icon: MessageSquareQuote },
      { name: "Client Reviews", path: "/client-review-videos", icon: Film },
      { name: "Blogs", path: "/blogs", icon: Newspaper },
      { name: "Home Hero", path: "/home-hero", icon: Images },
      { name: "Client Gallery", path: "/client-gallery", icon: Images },
    ],
  },
  {
    section: "Team",
    items: [
      { name: "Admin Management", path: "/admin-management", icon: Users },
    ],
  },
];

export default function AdminSidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-[250px] shrink-0 flex-col bg-[#101A2E] text-[#F4EFE4] lg:flex">
      <div className="px-7 pb-7 pt-8">
        <div className="flex items-center gap-3">
          <div>
            <img
              src="https://res.cloudinary.com/images-backend/image/upload/v1786170474/times_logo_dyybpz.png"
              alt="Times India Travels"
              className="h-auto w-42 object-contain"
            />
          </div>
        </div>
        <p className="mt-7 font-['Inter'] text-[10px] uppercase tracking-[0.22em] text-[#8F99A8]">
          Administration
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 pb-4">
        {navigation.map((group) => (
          <div key={group.section} className="mb-5">
            <p className="mb-1.5 px-3.5 font-['Inter'] text-[10px] font-medium uppercase tracking-[0.16em] text-[#5C6675]">
              {group.section}
            </p>

            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.end}
                    className={({ isActive }) =>
                      [
                        "group flex items-center gap-3 rounded-lg px-3.5 py-2.5",
                        "font-['Inter'] text-[13px] tracking-[0.02em]",
                        "transition-all duration-200",
                        isActive
                          ? "bg-[#C9A24B]/10 text-[#C9A24B]"
                          : "text-[#B7BEC9] hover:bg-white/[0.04] hover:text-[#F4EFE4]",
                      ].join(" ")
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          size={16}
                          strokeWidth={1.6}
                          className={
                            isActive
                              ? "text-[#C9A24B]"
                              : "text-[#7F8998] group-hover:text-[#C9A24B]"
                          }
                        />
                        <span>{item.name}</span>
                        {isActive && (
                          <span
                            className="ml-auto h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: GOLD }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 px-7 py-4">
        <p className="font-['Inter'] text-[10px] tracking-[0.08em] text-[#5C6675]">
          Times India Travels · Admin Console
        </p>
      </div>
    </aside>
  );
}