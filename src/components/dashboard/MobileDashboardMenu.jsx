"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Building2,
  CalendarCheck,
  LayoutDashboard,
  LogOut,
  Menu,
  PlusCircle,
  Settings,
  ShieldCheck,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Bookings", href: "/dashboard/bookings", icon: CalendarCheck },
  { label: "My Listings", href: "/dashboard/my-listings", icon: Building2 },
  { label: "Add Room", href: "/dashboard/add-room", icon: PlusCircle },
  { label: "Admin", href: "/dashboard/admin", icon: ShieldCheck },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function MobileDashboardMenu() {
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await authClient.signOut();

      setOpen(false);
      toast.success("Logged out successfully.");
      window.location.href = "/login";
    } catch (error) {
      console.log(error);
      toast.error("Logout failed.");
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="grid h-11 w-11 place-items-center rounded-2xl border border-emerald-900/30 bg-white/3 text-slate-300 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <aside className="relative z-10 h-full w-[86%] max-w-sm border-r border-emerald-900/30 bg-[#06110e] p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-xl font-black text-white">
                  S
                </div>

                <div>
                  <h2 className="text-xl font-black text-white">StudyNook</h2>
                  <p className="text-xs text-slate-500">Dashboard</p>
                </div>
              </Link>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-2xl border border-emerald-900/30 bg-white/3 text-slate-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-10 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-400 transition hover:bg-emerald-500/10 hover:text-emerald-300"
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-10 flex w-full items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-500/20"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </aside>
        </div>
      )}
    </>
  );
}