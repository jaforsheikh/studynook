"use client";

import { MapPin, Search, SlidersHorizontal } from "lucide-react";

export default function RoomFilters({
  search,
  setSearch,
  location,
  setLocation,
  capacity,
  setCapacity,
}) {
  return (
    <div className="rounded-[28px] border border-emerald-900/30 bg-white/[0.03] p-5 backdrop-blur-xl">
      <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr_1fr]">
        
        <div className="flex items-center gap-3 rounded-2xl bg-[#06110e] px-4 py-4">
          <Search className="h-5 w-5 text-emerald-400" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search room name..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          />
        </div>

        <div className="flex items-center gap-3 rounded-2xl bg-[#06110e] px-4 py-4">
          <MapPin className="h-5 w-5 text-emerald-400" />

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full cursor-pointer bg-[#06110e] text-sm text-white outline-none"
          >
            <option value="">All Locations</option>
            <option value="Dhanmondi">Dhanmondi</option>
            <option value="Gulshan">Gulshan</option>
            <option value="Banani">Banani</option>
            <option value="Uttara">Uttara</option>
            <option value="Mirpur">Mirpur</option>
            <option value="Bashundhara">Bashundhara</option>
            <option value="Farmgate">Farmgate</option>
            <option value="Wari">Wari</option>
            <option value="Tejgaon">Tejgaon</option>
          </select>
        </div>

        <div className="flex items-center gap-3 rounded-2xl bg-[#06110e] px-4 py-4">
          <SlidersHorizontal className="h-5 w-5 text-emerald-400" />

          <select
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className="w-full cursor-pointer bg-[#06110e] text-sm text-white outline-none"
          >
            <option value="">Any Capacity</option>
            <option value="1">1 Person</option>
            <option value="2-4">2-4 People</option>
            <option value="5">5+ People</option>
            <option value="10">10+ People</option>
          </select>
        </div>
      </div>
    </div>
  );
}