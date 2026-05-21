import Image from "next/image";
import Link from "next/link";
import { Layers, MapPin, Star, Users, Wifi } from "lucide-react";

const fallbackImage =
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80";

export default function RoomCard({ room }) {
  const roomId = room._id || room.id || room.slug;
  const title = room.title || room.name || "Study Room";
  const image = room.image || room.imageUrl || fallbackImage;

  return (
    <div className="overflow-hidden rounded-[32px] border border-emerald-900/40 bg-[#071510]">
      <div className="relative h-72 w-full">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      <div className="p-7">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-3xl font-black text-white">{title}</h3>

          <span className="flex items-center gap-1 rounded-full bg-amber-400/10 px-3 py-1 text-sm font-bold text-amber-300">
            <Star className="h-4 w-4 fill-current" />
            {room.rating || "4.8"}
          </span>
        </div>

        <p className="mt-4 flex items-center gap-2 text-slate-400">
          <MapPin className="h-5 w-5 text-emerald-400" />
          {room.location || "Location not set"}
        </p>

        <p className="mt-6 line-clamp-3 text-slate-400">
          {room.description || "A quiet study space for focused work."}
        </p>

        <div className="mt-6 flex flex-wrap gap-5 text-slate-300">
          <span className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-emerald-400" />
            {room.floor || "Floor N/A"}
          </span>

          <span className="flex items-center gap-2">
            <Users className="h-5 w-5 text-emerald-400" />
            {room.capacity || 1} People
          </span>

          <span className="flex items-center gap-2">
            <Wifi className="h-5 w-5 text-emerald-400" />
            Wi-Fi
          </span>
        </div>

        <Link
          href={`/rooms/${roomId}`}
          className="mt-8 flex w-full items-center justify-center rounded-2xl bg-amber-400 px-6 py-5 text-base font-black text-slate-950 transition hover:bg-amber-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
