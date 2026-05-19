import Link from "next/link";
import { ArrowRight, Building2, CalendarCheck, CreditCard, ShieldCheck } from "lucide-react";

export default function BecomeHostPage() {
  return (
    <main className="min-h-screen bg-[#06110e] py-24">
      <div className="mx-auto max-w-7xl px-4">
        <section className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="rounded-full border border-emerald-800/40 bg-emerald-900/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
              Become a Host
            </span>

            <h1 className="mt-6 text-5xl font-black leading-tight text-white">
              Turn your study space into hourly income.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
              List your library room, private study space, or group room on StudyNook and manage bookings from one dashboard.
            </p>

            <Link
              href="/dashboard/rooms/new"
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-amber-400 px-7 py-4 text-sm font-black text-slate-950 hover:bg-amber-300"
            >
              Add Your Room
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="rounded-[36px] border border-emerald-900/30 bg-white/[0.03] p-8">
            <div className="grid gap-5">
              {[
                { icon: Building2, title: "Create Room Listing", text: "Add photos, amenities, location, capacity, and hourly pricing." },
                { icon: CalendarCheck, title: "Manage Availability", text: "Control booking slots, room timing, and availability calendar." },
                { icon: CreditCard, title: "Receive Payments", text: "Accept secure payments through Stripe or SSLCommerz." },
                { icon: ShieldCheck, title: "Admin Verified", text: "Listings can be approved and monitored for platform quality." },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="rounded-3xl bg-[#06110e] p-6">
                    <Icon className="h-7 w-7 text-emerald-400" />
                    <h3 className="mt-4 text-xl font-black text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-400">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}