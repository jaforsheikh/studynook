"use client";

import { useEffect, useState } from "react";

import RoomCard from "@/components/rooms/RoomCard";
import EmptyState from "@/components/shared/EmptyState";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://studynook-server-beta.vercel.app";

export default function FeaturedRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <section className="bg-[#06110e] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="rounded-full border border-emerald-800/40 bg-emerald-900/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
            Featured Rooms
          </span>

          <h2 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Popular Study Spaces
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-400">
            Explore premium study environments designed for focus,
            collaboration, and productivity.
          </p>
        </div>

        {loading ? (
          <div className="mt-14 rounded-[32px] border border-emerald-900/30 bg-white/[0.03] p-10">
            <p className="text-slate-400">
              Loading featured rooms...
            </p>
          </div>
        ) : rooms.length === 0 ? (
          <div className="mt-14">
            <EmptyState
              title="No featured rooms yet"
              description="No study rooms have been added yet."
              actionText="Add Room"
              actionHref="/dashboard/rooms/new"
            />
          </div>
        ) : (
          <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {rooms.map((room) => (
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