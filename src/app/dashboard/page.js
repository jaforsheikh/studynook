"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  Building2,
  Wallet,
  BadgeDollarSign,
} from "lucide-react";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalListings: 0,
    totalBookings: 0,
    totalSpent: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardStats = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("studynook-user"));

        if (!user?.email) {
          setLoading(false);
          return;
        }

        const response = await fetch(
          `http://localhost:5000/api/dashboard/stats/${user.email}`
        );

        const data = await response.json();

        if (data.success) {
          setStats(data.stats);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardStats();
  }, []);

  const cards = [
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: CalendarDays,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Rooms Listed",
      value: stats.totalListings,
      icon: Building2,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
    },
    {
      title: "Total Spent",
      value: `৳${stats.totalSpent}`,
      icon: Wallet,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      title: "Room Revenue",
      value: `৳${stats.totalRevenue}`,
      icon: BadgeDollarSign,
      color: "text-pink-400",
      bg: "bg-pink-500/10",
    },
  ];

  return (
    <main className="min-h-screen bg-[#03110f] text-white">
      <section className="border-b border-emerald-900/20 px-6 py-10">
        <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.3em] text-emerald-300">
          Dashboard Overview
        </span>

        <div className="mt-6 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-amber-400 text-3xl">
            👋
          </div>

          <div>
            <h1 className="text-4xl font-black tracking-tight">
              Welcome Back
            </h1>

            <p className="mt-2 max-w-2xl text-lg text-slate-400">
              Monitor your bookings, room listings, revenue, and activity from
              one centralized dashboard.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 px-6 py-10 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-[32px] border border-emerald-900/20 bg-gradient-to-br from-[#071815] to-[#04110f] p-7"
            >
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl ${card.bg}`}
              >
                <Icon className={`h-8 w-8 ${card.color}`} />
              </div>

              <div className="mt-8">
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                  {card.title}
                </h3>

                <div className="mt-4 text-5xl font-black tracking-tight">
                  {loading ? "..." : card.value}
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}