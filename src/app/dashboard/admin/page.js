import {
  Users,
  Building2,
  CalendarCheck,
  CreditCard,
  ShieldCheck,
  Star,
} from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "1,248",
    icon: Users,
    color: "bg-emerald-500/10 text-emerald-400",
  },
  {
    title: "Total Rooms",
    value: "86",
    icon: Building2,
    color: "bg-cyan-500/10 text-cyan-400",
  },
  {
    title: "Total Bookings",
    value: "2,390",
    icon: CalendarCheck,
    color: "bg-amber-500/10 text-amber-400",
  },
  {
    title: "Revenue",
    value: "৳4.8L",
    icon: CreditCard,
    color: "bg-pink-500/10 text-pink-400",
  },
];

const pendingRooms = [
  {
    id: 1,
    name: "Metro Study Lounge",
    owner: "Rahim Hasan",
    location: "Uttara, Dhaka",
    status: "Pending Review",
  },
  {
    id: 2,
    name: "Focus Lab Premium",
    owner: "Nadia Islam",
    location: "Banani, Dhaka",
    status: "Pending Review",
  },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <div>
        <span className="rounded-full border border-emerald-800/40 bg-emerald-900/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
          Admin Control
        </span>

        <h1 className="mt-6 text-4xl font-black tracking-tight text-white">
          Platform Admin Dashboard
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">
          Monitor users, listings, bookings, payments, reviews, and platform activity.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-4xl border border-emerald-900/30 bg-white/3 p-6 backdrop-blur-xl"
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

      <div className="mt-14 grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-4xl border border-emerald-900/30 bg-white/3 p-6 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-emerald-400" />
            <h2 className="text-2xl font-black text-white">
              Pending Room Approvals
            </h2>
          </div>

          <div className="mt-8 space-y-4">
            {pendingRooms.map((room) => (
              <div
                key={room.id}
                className="rounded-3xl border border-emerald-900/30 bg-[#06110e] p-5"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h3 className="text-xl font-black text-white">
                      {room.name}
                    </h3>

                    <p className="mt-2 text-sm text-slate-400">
                      Owner: {room.owner} · {room.location}
                    </p>

                    <span className="mt-4 inline-flex rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-300">
                      {room.status}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <button className="rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-black text-white hover:bg-emerald-400">
                      Approve
                    </button>

                    <button className="rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-sm font-black text-red-300 hover:bg-red-500/20">
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-4xl border border-emerald-900/30 bg-white/[0.03] p-6 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <Star className="h-6 w-6 fill-amber-400 text-amber-400" />
            <h2 className="text-2xl font-black text-white">
              Review Moderation
            </h2>
          </div>

          <div className="mt-8 space-y-4">
            <div className="rounded-3xl border border-emerald-900/30 bg-[#06110e] p-5">
              <p className="text-sm leading-7 text-slate-300">
                “Room was clean, quiet, and perfect for exam preparation.”
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-bold text-white">
                  Quiet Pod 3A
                </span>

                <span className="text-sm font-bold text-amber-400">
                  5.0 ★
                </span>
              </div>
            </div>

            <div className="rounded-3xl border border-emerald-900/30 bg-[#06110e] p-5">
              <p className="text-sm leading-7 text-slate-300">
                “Good space, but Wi-Fi speed can be improved.”
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-bold text-white">
                  Group Studio West
                </span>

                <span className="text-sm font-bold text-amber-400">
                  4.0 ★
                </span>
              </div>
            </div>

            <button className="mt-4 w-full rounded-2xl border border-emerald-800/40 bg-emerald-900/20 px-5 py-4 text-sm font-black text-white hover:bg-emerald-600">
              View All Reviews
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}