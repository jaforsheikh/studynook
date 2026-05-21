import Image from "next/image";
import Link from "next/link";
import {
  Layers,
  MapPin,
  Star,
  Users,
  Wifi,
} from "lucide-react";

export default function RoomCard({ room }) {
  const roomId = room._id || room.id || room.slug;

  return (
    <div className="group overflow-hidden rounded-[32px] border border-emerald-900/40 bg-[#071510] transition duration-300 hover:-translate-y-1 hover:border-emerald-500/40">

      {/* IMAGE */}
      <div className="relative h-72 w-full overflow-hidden">
        <Image
          src={room.image}
          alt={room.title || room.name}
          fill
          unoptimized
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* RATING */}
        <div className="absolute right-5 top-5 flex items-center gap-1 rounded-full bg-amber-400 px-3 py-1 text-sm font-black text-slate-950">
          <Star className="h-4 w-4 fill-slate-950" />
          {room.rating}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-7">
        <h3 className="text-3xl font-black text-white">
          {room.title || room.name}
        </h3>

        {/* LOCATION */}
        <div className="mt-4 flex items-center gap-2 text-slate-400">
          <MapPin className="h-5 w-5 text-emerald-400" />
          <span>{room.location}</span>
        </div>

        {/* DESCRIPTION */}
        <p className="mt-6 line-clamp-3 text-slate-400">
          {room.description}
        </p>

        {/* INFO */}
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

        {/* PRICE */}
        <div className="mt-7 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">
              Starting From
            </p>

            <h4 className="text-3xl font-black text-amber-400">
              ৳{room.price}
            </h4>
          </div>

          <div className="text-right">
            <p className="text-sm text-slate-500">
              Capacity
            </p>

            <p className="font-bold text-white">
              {room.capacity} Seats
            </p>
          </div>
        </div>

        {/* BUTTON */}
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