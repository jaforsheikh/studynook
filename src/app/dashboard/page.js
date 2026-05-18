import {
  CalendarCheck,
  CreditCard,
  Building2,
  Star,
} from "lucide-react";

const stats = [
  {
    title: "Total Bookings",
    value: "24",
    icon: CalendarCheck,
    color: "bg-emerald-500/10 text-emerald-400",
  },
  {
    title: "Rooms Listed",
    value: "6",
    icon: Building2,
    color: "bg-cyan-500/10 text-cyan-400",
  },
  {
    title: "Total Payments",
    value: "৳12,450",
    icon: CreditCard,
    color: "bg-amber-500/10 text-amber-400",
  },
  {
    title: "Average Rating",
    value: "4.9",
    icon: Star,
    color: "bg-pink-500/10 text-pink-400",
  },
];

export default function DashboardPage() {
  return (
    <div>
      {/* PAGE HEADER */}
      <div>
        <span className="rounded-full border border-emerald-800/40 bg-emerald-900/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
          Dashboard Overview
        </span>

        <h1 className="mt-6 text-4xl font-black tracking-tight text-white">
          Welcome back 👋
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">
          Monitor your study room bookings, room listings,
          revenue, and activity from one centralized dashboard.
        </p>
      </div>

      {/* STATS */}
      <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-[28px] border border-emerald-900/30 bg-white/[0.03] p-6 backdrop-blur-xl"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.color}`}
              >
                <Icon className="h-7 w-7" />
              </div>

              <h3 className="mt-6 text-4xl font-black text-white">
                {item.value}
              </h3>

              <p className="mt-2 text-sm font-medium text-slate-400">
                {item.title}
              </p>
            </div>
          );
        })}
      </div>

      {/* RECENT BOOKINGS */}
      <div className="mt-14 rounded-[32px] border border-emerald-900/30 bg-white/[0.03] p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-white">
              Recent Bookings
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Latest room booking activities
            </p>
          </div>

          <button className="rounded-2xl border border-emerald-800/40 bg-emerald-900/20 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-600">
            View All
          </button>
        </div>

        {/* TABLE */}
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[700px] border-separate border-spacing-y-3">
            <thead>
              <tr>
                <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Room
                </th>

                <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Date
                </th>

                <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Duration
                </th>

                <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Price
                </th>

                <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="rounded-2xl bg-[#06110e]">
                <td className="rounded-l-2xl px-4 py-5 text-sm font-semibold text-white">
                  Quiet Pod 3A
                </td>

                <td className="px-4 py-5 text-sm text-slate-400">
                  18 May 2026
                </td>

                <td className="px-4 py-5 text-sm text-slate-400">
                  2 Hours
                </td>

                <td className="px-4 py-5 text-sm font-bold text-amber-400">
                  ৳240
                </td>

                <td className="rounded-r-2xl px-4 py-5">
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300">
                    Confirmed
                  </span>
                </td>
              </tr>

              <tr className="rounded-2xl bg-[#06110e]">
                <td className="rounded-l-2xl px-4 py-5 text-sm font-semibold text-white">
                  Skyline Focus Suite
                </td>

                <td className="px-4 py-5 text-sm text-slate-400">
                  20 May 2026
                </td>

                <td className="px-4 py-5 text-sm text-slate-400">
                  3 Hours
                </td>

                <td className="px-4 py-5 text-sm font-bold text-amber-400">
                  ৳1260
                </td>

                <td className="rounded-r-2xl px-4 py-5">
                  <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-300">
                    Upcoming
                  </span>
                </td>
              </tr>

              <tr className="rounded-2xl bg-[#06110e]">
                <td className="rounded-l-2xl px-4 py-5 text-sm font-semibold text-white">
                  Group Studio West
                </td>

                <td className="px-4 py-5 text-sm text-slate-400">
                  10 May 2026
                </td>

                <td className="px-4 py-5 text-sm text-slate-400">
                  1 Hour
                </td>

                <td className="px-4 py-5 text-sm font-bold text-amber-400">
                  ৳250
                </td>

                <td className="rounded-r-2xl px-4 py-5">
                  <span className="rounded-full bg-slate-700 px-3 py-1 text-xs font-bold text-slate-300">
                    Completed
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}