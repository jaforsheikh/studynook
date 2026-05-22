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
      <main className="min-h-screen bg-[#04100d] px-4 py-24 text-white sm:px-6">
        <div className="mx-auto max-w-7xl rounded-[32px] border border-emerald-500/10 bg-white/[0.03] p-8">
          <p className="text-sm font-medium text-slate-400">
            Loading booking page...
          </p>
        </div>
      </main>
    );
  }

  if (!room) {
    return (
      <main className="min-h-screen bg-[#04100d] px-4 py-24 text-white sm:px-6">
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
    <main className="min-h-screen overflow-hidden bg-[#04100d] px-4 py-24 text-white sm:px-6">
      <div className="mx-auto max-w-7xl">
        <Link
          href={`/rooms/${id}`}
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-300 transition hover:text-emerald-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to room details
        </Link>

        <div className="grid items-start gap-8">
          <section className="overflow-hidden rounded-[34px] border border-emerald-500/10 bg-[#071713]/90 shadow-2xl shadow-black/30">
            <div className="relative h-[360px] w-full overflow-hidden sm:h-[430px] lg:h-[500px]">
              <Image
                src={image}
                alt={room.name || "Study room"}
                fill
                unoptimized
                priority
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#071713] to-transparent" />

              <div className="absolute bottom-7 left-5 right-5 sm:bottom-9 sm:left-8 sm:right-8">
                <span className="inline-flex rounded-full border border-emerald-300/25 bg-emerald-400/15 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-emerald-200">
                  Secure Booking
                </span>

                <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[0.95] tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
                  Book {room.name}
                </h1>

                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-slate-100">
                  <MetaItem icon={MapPin} value={room.location} />
                  <MetaItem
                    icon={Users}
                    value={`Up to ${room.capacity} people`}
                  />
                  <MetaItem
                    icon={CalendarCheck}
                    value={`৳${room.price}/hour`}
                  />
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
              <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                    Booking Information
                  </h2>

                  <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                    Select a booking date and available time slots. Your booking
                    will be saved to MongoDB and shown inside your dashboard.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                  <InfoCard title="Room" value={room.name} />
                  <InfoCard title="Location" value={room.location} />
                  <InfoCard title="Hourly Price" value={`৳${room.price}`} />
                </div>
              </div>
            </div>
          </section>

          <aside className="xl:sticky xl:top-28">
            <BookingCalendar room={room} />
          </aside>
        </div>
      </div>
    </main>
  );
}

function MetaItem({ icon: Icon, value }) {
  return (
    <span className="inline-flex items-center gap-2">
      <Icon className="h-5 w-5 shrink-0 text-emerald-400" />
      <span>{value}</span>
    </span>
  );
}

function InfoCard({ title, value }) {
  return (
    <div className="min-h-[96px] rounded-[24px] border border-emerald-500/10 bg-[#03100d] p-5 shadow-xl shadow-black/10 transition hover:-translate-y-1 hover:border-emerald-400/25 hover:bg-[#041510]">
      <p className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-500">
        {title}
      </p>

      <p className="mt-3 text-base font-black leading-snug text-white">
        {value}
      </p>
    </div>
  );
}