import Image from "next/image";
import Link from "next/link";
import { rooms } from "@/data/rooms";
import BookingCalendar from "@/components/rooms/BookingCalendar";

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
<aside className="h-fit lg:sticky lg:top-24">
  <BookingCalendar room={room} />

  <div className="mt-6 rounded-32 border border-emerald-900/40 bg-white/3 p-6 backdrop-blur-xl">
    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
      Listed By
    </p>

    <div className="mt-4">
      <h4 className="font-black text-white">{room.owner.name}</h4>
      <p className="mt-1 text-sm text-slate-400">{room.owner.email}</p>
    </div>
  </div>
</aside>
        </div>
      </div>
    </main>
  );
}