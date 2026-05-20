"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getRoomById } from "@/services/roomService";
import BookingCalendar from "@/components/booking/BookingCalendar";
import EmptyState from "@/components/shared/EmptyState";

import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function BookRoomPage() {
  const params = useParams();
  const id = params.id;

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const data = await getRoomById(id);

        if (data.success) {
          setRoom(data.room);
        } else {
          toast.error(data.message || "Room not found.");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to load room.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRoom();
    }
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#06110e] px-6 py-24 text-white">
        <div className="mx-auto max-w-5xl rounded-[32px] border border-emerald-900/30 bg-white/[0.03] p-10">
          <p className="text-slate-400">Loading booking page...</p>
        </div>
      </main>
    );
  }

  if (!room) {
    return (
      <main className="min-h-screen bg-[#06110e] px-6 py-24 text-white">
        <div className="mx-auto max-w-5xl">
          <EmptyState
            title="Room not found"
            description="This room does not exist or may have been removed."
            actionText="Back to Rooms"
            actionHref="/rooms"
          />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#06110e] px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        <Link
          href={`/rooms/${id}`}
          className="mb-10 inline-flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-emerald-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to room details
        </Link>

        <div className="mb-10">
          <span className="rounded-full border border-emerald-800/40 bg-emerald-900/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
            Book Room
          </span>

          <h1 className="mt-6 text-5xl font-black tracking-tight text-white">
            Book {room.name}
          </h1>

          <p className="mt-4 text-lg leading-8 text-slate-400">
            Select your date and available time slots to reserve this room.
          </p>
        </div>

        <BookingCalendar room={room} />
      </div>
    </main>
  );
}