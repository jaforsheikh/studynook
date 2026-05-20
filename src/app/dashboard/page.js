import DashboardStatCard from "@/components/dashboard/DashboardStatCard";

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
      <div>
        <span className="rounded-full border border-emerald-800/40 bg-emerald-900/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
          Dashboard Overview
        </span>

        <h1 className="mt-6 text-4xl font-black tracking-tight text-white">
          Welcome back 👋
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">
          Monitor your study room bookings, room listings, revenue, and activity
          from one centralized dashboard.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <DashboardStatCard
            key={item.title}
            title={item.title}
            value={item.value}
            icon={item.icon}
            color={item.color}
          />
        ))}
      </div>

      <div className="mt-14 rounded-[32px] border border-emerald-900/30 bg-white/[0.03] p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-white">Recent Bookings</h2>
            <p className="mt-2 text-sm text-slate-400">
              Latest room booking activities
            </p>
          </div>

          <button className="rounded-2xl border border-emerald-800/40 bg-emerald-900/20 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-600">
            View All
          </button>
        </div>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[700px] border-separate border-spacing-y-3">
            <thead>
              <tr>
                {["Room", "Date", "Duration", "Price", "Status"].map((head) => (
                  <th
                    key={head}
                    className="text-left text-xs font-bold uppercase tracking-wider text-slate-500"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              <BookingRow
                room="Quiet Pod 3A"
                date="18 May 2026"
                duration="2 Hours"
                price="৳240"
                status="Confirmed"
                statusClass="bg-emerald-500/10 text-emerald-300"
              />

              <BookingRow
                room="Skyline Focus Suite"
                date="20 May 2026"
                duration="3 Hours"
                price="৳1260"
                status="Upcoming"
                statusClass="bg-cyan-500/10 text-cyan-300"
              />

              <BookingRow
                room="Group Studio West"
                date="10 May 2026"
                duration="1 Hour"
                price="৳250"
                status="Completed"
                statusClass="bg-slate-700 text-slate-300"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function BookingRow({ room, date, duration, price, status, statusClass }) {
  return (
    <tr className="rounded-2xl bg-[#06110e]">
      <td className="rounded-l-2xl px-4 py-5 text-sm font-semibold text-white">
        {room}
      </td>

      <td className="px-4 py-5 text-sm text-slate-400">{date}</td>

      <td className="px-4 py-5 text-sm text-slate-400">{duration}</td>

      <td className="px-4 py-5 text-sm font-bold text-amber-400">{price}</td>

      <td className="rounded-r-2xl px-4 py-5">
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusClass}`}>
          {status}
        </span>
      </td>
    </tr>
  );
}