"use client";

import { useEffect, useMemo, useState } from "react";
import { getRooms } from "@/services/roomService";
import RoomCard from "@/components/rooms/RoomCard";
import RoomFilters from "@/components/rooms/RoomFilters";
import EmptyState from "@/components/shared/EmptyState";
import { toast } from "sonner";

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [activeFilter, setActiveFilter] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getRooms();

        if (data.success) {
          setRooms(data.rooms);
        } else {
          toast.error(data.message || "Failed to load rooms.");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to load rooms.");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const roomName = room.name || room.title || "";

      const matchSearch = roomName
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchLocation = location
        ? room.location?.toLowerCase().includes(location.toLowerCase())
        : true;

      let matchCapacity = true;

      if (capacity === "1") {
        matchCapacity = Number(room.capacity) === 1;
      }

      if (capacity === "2-4") {
        matchCapacity =
          Number(room.capacity) >= 2 && Number(room.capacity) <= 4;
      }

      if (capacity === "5") {
        matchCapacity = Number(room.capacity) >= 5;
      }

      if (capacity === "10") {
        matchCapacity = Number(room.capacity) >= 10;
      }

      let matchQuickFilter = true;

      if (activeFilter === "available") {
        matchQuickFilter = room.availableToday === true;
      }

      if (activeFilter === "quiet") {
        matchQuickFilter = room.amenities?.includes("Quiet Zone");
      }

      if (activeFilter === "group") {
        matchQuickFilter = Number(room.capacity) >= 4;
      }

      if (activeFilter === "premium") {
        matchQuickFilter = Number(room.price) >= 300;
      }

      return matchSearch && matchLocation && matchCapacity && matchQuickFilter;
    });
  }, [rooms, search, location, capacity, activeFilter]);

  const clearFilters = () => {
    setSearch("");
    setLocation("");
    setCapacity("");
    setActiveFilter("");
  };

  const quickButtons = [
    { label: "Available Today", value: "available" },
    { label: "Quiet Zone", value: "quiet" },
    { label: "Group Study", value: "group" },
    { label: "Premium", value: "premium" },
  ];

  if (loading) {
    return (
      <main className="min-h-screen bg-[#06110e] px-4 py-24">
        <div className="mx-auto max-w-7xl rounded-[32px] border border-emerald-900/30 bg-white/[0.03] p-10">
          <p className="text-slate-400">Loading rooms...</p>
        </div>
      </main>
    );
  }

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
              Real-time updated availability and pricing from MongoDB.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {quickButtons.map((item) => (
              <button
                key={item.value}
                type="button"
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
                type="button"
                onClick={clearFilters}
                className="rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-500/20"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        <div className="mt-14">
          {filteredRooms.length === 0 ? (
            <EmptyState
              title="No rooms found"
              description="Try changing your search, location, capacity, or quick filters."
              actionText="Clear Filters"
              actionHref="/rooms"
            />
          ) : (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {filteredRooms.map((room) => (
                <RoomCard key={room._id} room={room} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
