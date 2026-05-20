"use client";

import { Bell, LogOut, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import MobileDashboardMenu from "./MobileDashboardMenu";

export default function DashboardTopbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("studynook-user");
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-emerald-900/30 bg-[#06110e]/90 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-white sm:text-2xl">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage bookings, rooms, and account activity.
          </p>
        </div>

        <div className="hidden max-w-md flex-1 items-center gap-3 rounded-2xl border border-emerald-900/30 bg-white/[0.03] px-4 py-3 md:flex">
          <Search className="h-5 w-5 text-emerald-400" />

          <input
            type="text"
            placeholder="Search dashboard..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <button className="grid h-11 w-11 place-items-center rounded-2xl border border-emerald-900/30 bg-white/[0.03] text-slate-300">
            <Bell className="h-5 w-5" />
          </button>

          <button
            onClick={handleLogout}
            className="hidden items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-300 transition hover:bg-red-500/20 sm:flex"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>

          <MobileDashboardMenu />

          <div className="hidden h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-sm font-black text-white sm:flex">
            U
          </div>
        </div>
      </div>
    </header>
  );
}