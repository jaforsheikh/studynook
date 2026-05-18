import Image from "next/image";
import Link from "next/link";
import { rooms } from "@/data/rooms";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  Layers3,
  MapPin,
  Star,
  Users,
  Wifi,
} from "lucide-react";

export default function RoomDetailsPage({ params }) {
  const room = rooms.find((item) => item.id === params.id);

  if (!room) {
    return (
      <main className="min-h-screen bg-[#06110e] px-4 py-24 text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-black">Room not found</h1>

          <Link
            href="/rooms"
            className="mt-6 inline-flex items-center gap-2 text-emerald-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to rooms
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#06110e] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/rooms"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-emerald-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all rooms
        </Link>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
          <div>
            <div className="overflow-hidden rounded-4xl border border-emerald-900/40">
              <Image
                src={room.image}
                alt={room.title}
                width={1200}
                height={800}
                className="h-130 w-full object-cover"
                priority
              />
            </div>

            <div className="mt-10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                    {room.title}
                  </h1>

                  <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-emerald-400" />
                      {room.location}
                    </span>

                    <span className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      {room.rating} rating
                    </span>

                    <span className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-emerald-400" />
                      Up to {room.capacity} people
                    </span>
                  </div>
                </div>

                <span className="w-fit rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-bold text-emerald-300">
                  {room.availableToday ? "Available Today" : "Currently Booked"}
                </span>
              </div>

              <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-300">
                {room.description}
              </p>

              <div className="mt-10">
                <h2 className="text-2xl font-black text-white">Amenities</h2>

                <div className="mt-5 flex flex-wrap gap-3">
                  {room.amenities.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-emerald-800/40 bg-emerald-900/20 px-4 py-2 text-sm font-semibold text-emerald-100"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <aside className="h-fit rounded-4xl border border-emerald-900/40 bg-white/3 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl lg:sticky lg:top-24">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-slate-400">Starting from</p>
                <h3 className="text-4xl font-black text-amber-400">
                  ৳{room.price}
                  <span className="text-base font-semibold text-slate-400">
                    /hr
                  </span>
                </h3>
              </div>

              <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-bold text-emerald-300">
                {room.bookings} bookings
              </div>
            </div>

            <div className="mt-8 grid gap-4">
              <div className="flex items-center gap-3 rounded-2xl border border-emerald-900/30 bg-[#06110e] px-4 py-4 text-slate-300">
                <Layers3 className="h-5 w-5 text-emerald-400" />
                {room.floor}
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-emerald-900/30 bg-[#06110e] px-4 py-4 text-slate-300">
                <Users className="h-5 w-5 text-emerald-400" />
                Up to {room.capacity} people
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-emerald-900/30 bg-[#06110e] px-4 py-4 text-slate-300">
                <Wifi className="h-5 w-5 text-emerald-400" />
                High-speed Wi-Fi included
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-300">
                  Booking Date
                </span>
                <div className="flex items-center gap-3 rounded-2xl border border-emerald-900/40 bg-[#06110e] px-4 py-4">
                  <CalendarDays className="h-5 w-5 text-emerald-400" />
                  <input
                    type="date"
                    className="w-full bg-transparent text-sm text-white outline-none"
                  />
                </div>
              </label>

              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-300">
                    Start Time
                  </span>
                  <div className="flex items-center gap-3 rounded-2xl border border-emerald-900/40 bg-[#06110e] px-4 py-4">
                    <Clock className="h-5 w-5 text-emerald-400" />
                    <input
                      type="time"
                      className="w-full bg-transparent text-sm text-white outline-none"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-300">
                    End Time
                  </span>
                  <div className="flex items-center gap-3 rounded-2xl border border-emerald-900/40 bg-[#06110e] px-4 py-4">
                    <Clock className="h-5 w-5 text-emerald-400" />
                    <input
                      type="time"
                      className="w-full bg-transparent text-sm text-white outline-none"
                    />
                  </div>
                </label>
              </div>
            </div>

            <button className="mt-8 w-full rounded-2xl bg-amber-400 px-6 py-4 text-sm font-black text-slate-950 transition hover:bg-amber-300">
              Login to Book
            </button>

            <p className="mt-4 text-center text-xs text-slate-500">
              Real-time availability and conflict checking will be handled by
              backend API.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}