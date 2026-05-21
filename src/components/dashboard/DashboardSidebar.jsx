import Link from "next/link";
import {
  LayoutDashboard,
  CalendarCheck,
  Building2,
  PlusCircle,
  Settings,
  ShieldCheck,
  LogOut,
} from "lucide-react";

const navItems = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Bookings",
    href: "/dashboard/bookings",
    icon: CalendarCheck,
  },
  {
    label: "My Rooms",
    href: "/dashboard/rooms",
    icon: Building2,
  },
  {
    label: "Add Room",
    href: "/dashboard/rooms/new",
    icon: PlusCircle,
  },
  {
    label: "Admin",
    href: "/dashboard/admin",
    icon: ShieldCheck,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function DashboardSidebar() {
  return (
    <aside className="hidden min-h-screen w-72 border-r border-emerald-900/30 bg-[#06110e] p-6 lg:block">
      <Link href="/" className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-xl font-black text-white">
          S
        </div>

        <div>
          <h2 className="text-xl font-black text-white">StudyNook</h2>
          <p className="text-xs text-slate-500">Dashboard</p>
        </div>
      </Link>

      <nav className="mt-10 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-400 transition hover:bg-emerald-500/10 hover:text-emerald-300"
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-10 rounded-3xl border border-emerald-900/30 bg-white/3 p-5">
        <p className="text-sm font-bold text-white">Upgrade to Host</p>
        <p className="mt-2 text-xs leading-6 text-slate-500">
          List your study rooms and start earning from hourly bookings.
        </p>

        <Link
          href="/become-host"
          className="mt-4 block rounded-2xl bg-amber-400 px-4 py-3 text-center text-sm font-black text-slate-950"
        >
          Become Host
        </Link>
      </div>

      <button className="mt-10 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-500 transition hover:bg-red-500/10 hover:text-red-300">
        <LogOut className="h-5 w-5" />
        Logout
      </button>
    </aside>
  );
}