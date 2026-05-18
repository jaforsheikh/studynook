import Link from "next/link";
import { ArrowRight } from "lucide-react";

import RoomCard from "./RoomCard";
import { rooms } from "@/data/rooms";

export default function FeaturedRooms() {
  return (
    <section className="bg-[#06110e] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          
          <div className="max-w-2xl">
            <span className="rounded-full border border-emerald-800/40 bg-emerald-900/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
              Featured Rooms
            </span>

            <h2 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl">
              Discover Premium Study Spaces
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-400">
              Hand-picked modern study environments designed for deep focus,
              collaboration, and productivity.
            </p>
          </div>

          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 rounded-2xl border border-emerald-800/40 bg-emerald-900/20 px-6 py-4 text-sm font-bold text-white transition hover:border-emerald-600 hover:bg-emerald-600"
          >
            View All Rooms
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {/* GRID */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {rooms.slice(0, 6).map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </section>
  );
}