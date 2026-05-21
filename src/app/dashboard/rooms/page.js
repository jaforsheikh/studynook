"use client";

import { useMemo, useState } from "react";
import { rooms } from "@/data/rooms";

import RoomCard from "@/components/rooms/RoomCard";
import RoomFilters from "@/components/rooms/RoomFilters";

export default function RoomsPage() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [activeFilter, setActiveFilter] = useState("");

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const matchSearch = room.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchLocation = location
        ? room.location.toLowerCase().includes(location.toLowerCase())
        : true;

      let matchCapacity = true;

      if (capacity === "1") {
        matchCapacity = room.capacity === 1;
      }

      if (capacity === "2-4") {
        matchCapacity = room.capacity >= 2 && room.capacity <= 4;
      }

      if (capacity === "5") {
        matchCapacity = room.capacity >= 5;
      }

      if (capacity === "10") {
        matchCapacity = room.capacity >= 10;
      }

      let matchQuickFilter = true;

      if (activeFilter === "available") {
        matchQuickFilter = room.availableToday === true;
      }

      if (activeFilter === "quiet") {
        matchQuickFilter = room.amenities.includes("Quiet Zone");
      }

      if (activeFilter === "group") {
        matchQuickFilter = room.capacity >= 4;
      }

      if (activeFilter === "premium") {
        matchQuickFilter = room.price >= 300;
      }

      return matchSearch && matchLocation && matchCapacity && matchQuickFilter;
    });
  }, [search, location, capacity, activeFilter]);

  const quickButtons = [
    { label: "Available Today", value: "available" },
    { label: "Quiet Zone", value: "quiet" },
    { label: "Group Study", value: "group" },
    { label: "Premium", value: "premium" },
  ];

  const clearFilters = () => {
    setSearch("");
    setLocation("");
    setCapacity("");
    setActiveFilter("");
  };

  return (
    <main className="min-h-screen bg-[#06110e] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl">
          <span className="rounded-full border border-emerald-800/40 bg-emerald-900/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
            Study Spaces
          </span>

          <h1 className="mt-6 text-5xl font-black tracking-tight text-white">
            Explore All Study Rooms
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-400">
            Discover modern libraries, collaborative rooms, silent spaces, and
            premium study environments built for productivity.
          </p>
        </div>

        <div className="mt-14">
          <RoomFilters
            search={search}
            setSearch={setSearch}
            location={location}
            setLocation={setLocation}
            capacity={capacity}
            setCapacity={setCapacity}
          />
        </div>

        <div className="mt-10 flex flex-col gap-4 rounded-[28px] border border-emerald-900/30 bg-white/[0.03] p-6 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-2xl font-black text-white">
              {filteredRooms.length} Rooms Found
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Real-time updated availability and pricing
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {quickButtons.map((item) => (
              <button
                key={item.value}
                onClick={() =>
                  setActiveFilter(activeFilter === item.value ? "" : item.value)
                }
                className={`rounded-2xl border px-5 py-3 text-sm font-semibold transition ${
                  activeFilter === item.value
                    ? "border-emerald-500 bg-emerald-500 text-white"
                    : "border-emerald-900/40 text-slate-300 hover:border-emerald-700 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}

            {(search || location || capacity || activeFilter) && (
              <button
                onClick={clearFilters}
                className="rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-500/20"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {filteredRooms.length > 0 ? (
          <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filteredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        ) : (
          <div className="mt-14 rounded-4xl border border-emerald-900/30 bg-white/3 p-12 text-center">
            <h2 className="text-3xl font-black text-white">No rooms found</h2>

            <p className="mt-3 text-slate-400">
              Try changing your search, location, capacity, or quick filters.
            </p>

            <button
              onClick={clearFilters}
              className="mt-6 rounded-2xl bg-amber-400 px-6 py-4 text-sm font-black text-slate-950 hover:bg-amber-300"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}