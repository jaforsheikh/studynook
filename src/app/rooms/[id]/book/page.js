"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CalendarCheck, MapPin, Users } from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { getRoomById } from "@/services/roomService";
import BookingCalendar from "@/components/booking/BookingCalendar";
import EmptyState from "@/components/shared/EmptyState";

export default function BookRoomPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const { data: session, isPending } = authClient.useSession();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("Please login first to book a room.");
      router.replace("/login");
    }
  }, [isPending, session, router]);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const data = await getRoomById(id);

        if (data?.success) {
          setRoom(data.room);
        } else {
          toast.error(data?.message || "Room not found.");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to load room.");
      } finally {
        setLoading(false);
      }
    };

    if (id && session?.user) {
      fetchRoom();
    }
  }, [id, session]);

  if (isPending || loading) {
    return (
      <main className="min-h-screen bg-[#06110e] px-6 py-24 text-white">
        <div className="mx-auto max-w-7xl rounded-[32px] border border-emerald-900/30 bg-white/[0.03] p-10">
          <p className="text-slate-400">Loading booking page...</p>
        </div>
      </main>
    );
  }

  if (!room) {
    return (
      <main className="min-h-screen bg-[#06110e] px-6 py-24 text-white">
        <div className="mx-auto max-w-7xl">
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

  const image = room.image || "/assets/rooms/quiet-pod.jpg";

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

        <div className="grid gap-10 lg:grid-cols-[1fr_480px]">
          <section className="overflow-hidden rounded-[36px] border border-emerald-900/30 bg-white/[0.03]">
            <div className="relative h-[420px] w-full">
              <Image
                src={image}
                alt={room.name || "Study room"}
                fill
                unoptimized
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-8 left-8 right-8">
                <span className="rounded-full border border-emerald-400/30 bg-emerald-500/20 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-emerald-200">
                  Secure Booking
                </span>

                <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">
                  Book {room.name}
                </h1>

                <div className="mt-5 flex flex-wrap gap-5 text-sm font-semibold text-slate-200">
                  <span className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-emerald-400" />
                    {room.location}
                  </span>

                  <span className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-emerald-400" />
                    Up to {room.capacity} people
                  </span>

                  <span className="flex items-center gap-2">
                    <CalendarCheck className="h-5 w-5 text-emerald-400" />
                    ৳{room.price}/hour
                  </span>
                </div>
              </div>
            </div>

            <div className="p-8">
              <h2 className="text-2xl font-black text-white">
                Booking Information
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                Select a booking date and available time slots. Your booking
                will be saved to MongoDB and shown inside your dashboard.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <InfoCard title="Room" value={room.name} />
                <InfoCard title="Location" value={room.location} />
                <InfoCard title="Hourly Price" value={`৳${room.price}`} />
              </div>
            </div>
          </section>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <BookingCalendar room={room} />
          </aside>
        </div>
      </div>
    </main>
  );
}

function InfoCard({ title, value }) {
  return (
    <div className="rounded-3xl border border-emerald-900/30 bg-[#06110e] p-5">
      <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
        {title}
      </p>

      <p className="mt-2 font-black text-white">{value}</p>
    </div>
  );
}