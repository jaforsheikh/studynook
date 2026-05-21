"use client";

import { useEffect, useMemo, useState } from "react";

import RoomCard from "@/components/rooms/RoomCard";
import RoomFilters from "@/components/rooms/RoomFilters";
import EmptyState from "@/components/shared/EmptyState";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://studynook-server-beta.vercel.app";

export default function FeaturedRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");

  useEffect(() => {
    const fetchFeaturedRooms = async () => {
      try {
        const res = await fetch(`${API_URL}/api/rooms/latest`, {
          cache: "no-store",
        });

        const data = await res.json();

        if (data?.success) {
          setRooms(data.rooms || []);
        }
      } catch (error) {
        console.log("Featured rooms fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedRooms();
  }, []);

  /*
  FILTER LOGIC
  */
  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const roomName = (room.name || room.title || "").toLowerCase();

      const matchesSearch = roomName.includes(
        search.toLowerCase()
      );

      const matchesLocation = location
        ? room.location?.includes(location)
        : true;

      const matchesCapacity = capacity
        ? Number(room.capacity) >= Number(capacity)
        : true;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesCapacity
      );
    });
  }, [rooms, search, location, capacity]);

  return (
    <section className="relative overflow-hidden bg-[#06110e] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12),transparent_45%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-emerald-800/40 bg-emerald-900/20 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-emerald-300">
            Featured Rooms
          </span>

          <h2 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl xl:text-6xl">
            Popular Study Spaces
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-400">
            Explore premium study environments designed for
            focus, collaboration, and productivity.
          </p>
        </div>

        {/* FILTERS */}
        <div className="mt-12">
          <RoomFilters
            search={search}
            setSearch={setSearch}
            location={location}
            setLocation={setLocation}
            capacity={capacity}
            setCapacity={setCapacity}
          />
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="mt-14 rounded-4xl border border-emerald-900/30 bg-white/3 p-10 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent" />

              <p className="text-slate-400">
                Loading featured rooms...
              </p>
            </div>
          </div>
        ) : filteredRooms.length === 0 ? (
          /* EMPTY */
          <div className="mt-14">
            <EmptyState
              title="No rooms found"
              description="Try changing search filters or add new rooms."
              actionText="Add Room"
              actionHref="/dashboard/rooms/new"
            />
          </div>
        ) : (
          /* ROOMS GRID */
          <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filteredRooms.map((room) => (
              <RoomCard
                key={room._id || room.slug}
                room={room}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}