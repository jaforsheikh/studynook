import Image from "next/image";
import Link from "next/link";
import { Layers, MapPin, Star, Users, Wifi } from "lucide-react";

export default function RoomCard({ room }) {
  const roomId = room._id || room.id || room.slug;

  return (
    <div className="overflow-hidden rounded-[32px] border border-emerald-900/40 bg-[#071510]">
      <div className="relative h-72 w-full">
        <Image
          src={room.image}
          alt={room.title || room.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-7">
        <h3 className="text-3xl font-black text-white">
          {room.title || room.name}
        </h3>

        <p className="mt-4 flex items-center gap-2 text-slate-400">
          <MapPin className="h-5 w-5 text-emerald-400" />
          {room.location}
        </p>

        <p className="mt-6 text-slate-400">{room.description}</p>

        <div className="mt-6 flex flex-wrap gap-5 text-slate-300">
          <span className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-emerald-400" />
            {room.floor}
          </span>

          <span className="flex items-center gap-2">
            <Users className="h-5 w-5 text-emerald-400" />
            {room.capacity} People
          </span>

          <span className="flex items-center gap-2">
            <Wifi className="h-5 w-5 text-emerald-400" />
            Wi-Fi
          </span>
        </div>

        <Link
          href={`/rooms/${roomId}`}
          className="mt-8 flex w-full items-center justify-center rounded-2xl bg-amber-400 px-6 py-5 text-base font-black text-slate-950"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}