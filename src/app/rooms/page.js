"use client";

import { useEffect, useMemo, useState } from "react";
import RoomCard from "@/components/rooms/RoomCard";
import RoomFilters from "@/components/rooms/RoomFilters";
import EmptyState from "@/components/shared/EmptyState";
import { getRooms } from "@/services/roomService";

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getRooms();

        if (data?.success) {
          setRooms(data.rooms || []);
        } else {
          setRooms([]);
        }
      } catch (error) {
        console.log("Rooms fetch error:", error);
        setRooms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const name = (room.name || room.title || "").toLowerCase();
      const roomLocation = room.location || "";

      const matchesSearch = name.includes(search.toLowerCase());

      const matchesLocation = location
        ? roomLocation.toLowerCase().includes(location.toLowerCase())
        : true;

      const matchesCapacity = capacity
        ? Number(room.capacity || 0) >= Number(capacity)
        : true;

      return matchesSearch && matchesLocation && matchesCapacity;
    });
  }, [rooms, search, location, capacity]);

  return (
    <main className="min-h-screen bg-[#06110e] px-4 py-24 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <span className="rounded-full border border-emerald-800/40 bg-emerald-900/20 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-emerald-300">
          Study Rooms
        </span>

        <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl">
              Explore Study Rooms
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
              Find quiet pods, group studios, reading lounges, and premium study
              spaces with real-time booking-ready data.
            </p>
          </div>
        </div>

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

        {loading ? (
          <div className="mt-12 rounded-[32px] border border-emerald-900/30 bg-white/[0.03] p-10">
            <p className="text-slate-400">Loading rooms...</p>
          </div>
        ) : filteredRooms.length === 0 ? (
          <div className="mt-12">
            <EmptyState
              title="No rooms found"
              description="Try changing your filters or add a new room."
              actionText="Add Room"
              actionHref="/dashboard/rooms/new"
            />
          </div>
        ) : (
          <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filteredRooms.map((room) => (
              <RoomCard key={room._id || room.slug} room={room} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}