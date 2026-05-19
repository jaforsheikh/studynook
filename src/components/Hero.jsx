"use client";

import { useRouter } from "next/navigation";
import { CalendarDays, MapPin, Search, Users } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Hero() {
  const router = useRouter();

  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [capacity, setCapacity] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (location) params.set("location", location);
    if (date) params.set("date", date);
    if (capacity) params.set("capacity", capacity);

    router.push(`/rooms?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-[#f3f7f5] pt-24">
      <div className="absolute left-1/2 top-20 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-emerald-300/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-16 px-4 py-20 lg:grid-cols-2 lg:items-center">
        {/* LEFT */}
        <div>
          <span className="inline-flex rounded-full bg-emerald-100 px-5 py-3 text-sm font-bold text-emerald-700">
            Smart Study Room Booking Platform
          </span>

          <h1 className="mt-8 text-6xl font-black leading-[0.95] tracking-tight text-slate-950 md:text-7xl">
            Find Your
            <br />
            Perfect
            <br />
            <span className="text-emerald-500">Study Space</span>
          </h1>

          <p className="mt-8 max-w-xl text-xl leading-9 text-slate-600">
            Book quiet libraries, private study rooms, and premium workspaces
            with real-time availability and hourly booking.
          </p>

          {/* SEARCH BAR */}
          <div className="mt-10 rounded-[32px] bg-white p-4 shadow-2xl shadow-black/5">
            <div className="grid gap-4 lg:grid-cols-4">
              {/* LOCATION */}
              <div className="flex items-center gap-3 rounded-2xl bg-slate-100 px-4 py-4">
                <MapPin className="h-5 w-5 text-emerald-500" />

                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-transparent text-sm font-medium outline-none"
                />
              </div>

              {/* DATE */}
              <div className="flex items-center gap-3 rounded-2xl bg-slate-100 px-4 py-4">
                <CalendarDays className="h-5 w-5 text-emerald-500" />

                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-transparent text-sm font-medium outline-none"
                />
              </div>

              {/* CAPACITY */}
              <div className="flex items-center gap-3 rounded-2xl bg-slate-100 px-4 py-4">
                <Users className="h-5 w-5 text-emerald-500" />

                <select
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  className="w-full bg-transparent text-sm font-medium outline-none"
                >
                  <option value="">Capacity</option>
                  <option value="1-2">1-2 People</option>
                  <option value="2-4">2-4 People</option>
                  <option value="4-6">4-6 People</option>
                  <option value="6-10">6-10 People</option>
                </select>
              </div>

              {/* BUTTON */}
              <button
                onClick={handleSearch}
                className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-4 text-sm font-black text-white transition hover:bg-emerald-600"
              >
                <Search className="h-5 w-5" />
                Search
              </button>
            </div>
          </div>

          {/* STATS */}
          <div className="mt-12 flex flex-wrap gap-10">
            <div>
              <h3 className="text-5xl font-black text-slate-950">500+</h3>
              <p className="mt-2 text-lg text-slate-600">Study Rooms</p>
            </div>

            <div>
              <h3 className="text-5xl font-black text-slate-950">10k+</h3>
              <p className="mt-2 text-lg text-slate-600">Students</p>
            </div>

            <div>
              <h3 className="text-5xl font-black text-slate-950">4.9★</h3>
              <p className="mt-2 text-lg text-slate-600">User Rating</p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative">
          <div className="overflow-hidden rounded-[40px]">
            <Image
              src="/assets/hero.png"
              alt="Study Room"
              width={900}
              height={1000}
              className="h-[780px] w-full object-cover"
              priority
            />
          </div>

          {/* FLOATING CARD */}
          <div className="absolute bottom-8 left-8 right-8 rounded-[32px] bg-white p-8 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-4xl font-black text-slate-950">
                  Premium Silent Room
                </h3>

                <p className="mt-2 text-lg text-slate-500">
                  Dhanmondi, Dhaka
                </p>
              </div>

              <span className="rounded-full bg-emerald-100 px-5 py-3 text-sm font-bold text-emerald-700">
                Available
              </span>
            </div>

            <div className="mt-8 flex items-end justify-between">
              <div>
                <p className="text-lg text-slate-500">Starting From</p>

                <h2 className="mt-1 text-5xl font-black text-slate-950">
                  ৳120/hr
                </h2>
              </div>

              <button
                onClick={() => router.push("/rooms/quiet-pod-3a")}
                className="rounded-2xl bg-emerald-500 px-8 py-5 text-lg font-black text-white transition hover:bg-emerald-600"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}