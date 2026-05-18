"use client";

import { useMemo, useState } from "react";
import { rooms } from "@/data/rooms";
import RoomCard from "@/components/rooms/RoomCard";
import RoomFilters from "@/components/rooms/RoomFilters";

export default function RoomsPage() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const searchMatch = room.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const locationMatch = location
        ? room.location.toLowerCase().includes(location.toLowerCase())
        : true;

      let capacityMatch = true;

      if (capacity === "1") capacityMatch = room.capacity === 1;
      if (capacity === "2-4") capacityMatch = room.capacity >= 2 && room.capacity <= 4;
      if (capacity === "5") capacityMatch = room.capacity >= 5;
      if (capacity === "10") capacityMatch = room.capacity >= 10;

      return searchMatch && locationMatch && capacityMatch;
    });
  }, [search, location, capacity]);

  return (
    <main className="min-h-screen bg-[#06110e] py-24">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="text-5xl font-black text-white">
          Explore All Study Rooms
        </h1>

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

        <div className="mt-10 rounded-[28px] border border-emerald-900/30 bg-white/[0.03] p-6">
          <h3 className="text-2xl font-black text-white">
            {filteredRooms.length} Rooms Found
          </h3>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </main>
  );
}