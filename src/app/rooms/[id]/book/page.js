import Link from "next/link";
import { rooms } from "@/data/rooms";
import BookingCalendar from "@/components/booking/BookingCalendar";
import { ArrowLeft } from "lucide-react";

export default async function BookRoomPage({ params }) {
  const { id } = await params;

  const room = rooms.find(
    (item) =>
      item.id?.toString() === id ||
      item._id?.toString() === id ||
      item.slug === id
  );

  if (!room) {
    return (
      <main className="min-h-screen bg-[#06110e] px-6 py-24 text-white">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-4xl font-black">Room not found</h1>

          <Link href="/rooms" className="mt-6 inline-block text-emerald-300">
            Back to rooms
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#06110e] px-6 py-24 text-white">
      <div className="mx-auto max-w-5xl">
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
            Book {room.title || room.name}
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