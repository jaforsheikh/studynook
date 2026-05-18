import { CalendarCheck, Clock, MapPin, XCircle } from "lucide-react";

const bookings = [
  {
    id: 1,
    room: "Quiet Pod 3A",
    location: "Dhanmondi, Dhaka",
    date: "18 May 2026",
    time: "10:00 AM - 12:00 PM",
    price: "৳240",
    status: "Confirmed",
  },
  {
    id: 2,
    room: "Skyline Focus Suite",
    location: "Bashundhara, Dhaka",
    date: "20 May 2026",
    time: "2:00 PM - 5:00 PM",
    price: "৳1260",
    status: "Upcoming",
  },
  {
    id: 3,
    room: "Group Studio West",
    location: "Gulshan, Dhaka",
    date: "10 May 2026",
    time: "4:00 PM - 5:00 PM",
    price: "৳250",
    status: "Completed",
  },
];

export default function BookingsPage() {
  return (
    <div>
      <div>
        <span className="rounded-full border border-emerald-800/40 bg-emerald-900/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
          My Bookings
        </span>

        <h1 className="mt-6 text-4xl font-black tracking-tight text-white">
          Manage Your Bookings
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">
          View upcoming, past, and cancelled study room bookings.
        </p>
      </div>

      <div className="mt-12 grid gap-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="rounded-[30px] border border-emerald-900/30 bg-white/[0.03] p-6 backdrop-blur-xl"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-2xl font-black text-white">
                  {booking.room}
                </h2>

                <div className="mt-4 flex flex-wrap gap-5 text-sm text-slate-400">
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-emerald-400" />
                    {booking.location}
                  </span>

                  <span className="flex items-center gap-2">
                    <CalendarCheck className="h-4 w-4 text-emerald-400" />
                    {booking.date}
                  </span>

                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-emerald-400" />
                    {booking.time}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div>
                  <p className="text-xs text-slate-500">Total Price</p>
                  <p className="text-xl font-black text-amber-400">
                    {booking.price}
                  </p>
                </div>

                <span className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-bold text-emerald-300">
                  {booking.status}
                </span>

                {booking.status !== "Completed" && (
                  <button className="flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-sm font-bold text-red-300 transition hover:bg-red-500/20">
                    <XCircle className="h-4 w-4" />
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}