import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Users,
  Star,
  Wifi,
  Layers3,
} from "lucide-react";

export default function RoomCard({ room }) {
  return (
    <div className="group overflow-hidden rounded-[28px] border border-emerald-950/40 bg-[#071411] shadow-xl shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-emerald-700/40">
      
      {/* IMAGE */}
      <div className="relative overflow-hidden">
        <Image
          src={room.image}
          alt={room.title}
          width={700}
          height={500}
          className="h-60 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {room.availableToday ? "Available Today" : "Booked"}
        </div>

        <div className="absolute right-4 top-4 rounded-full bg-amber-400 px-3 py-1 text-sm font-bold text-slate-950">
          ৳{room.price}/hr
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-white">
              {room.title}
            </h3>

            <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">
              <MapPin className="h-4 w-4 text-emerald-400" />
              {room.location}
            </div>
          </div>

          <div className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-300">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            {room.rating}
          </div>
        </div>

        <p className="mt-4 line-clamp-2 text-sm leading-7 text-slate-400">
          {room.description}
        </p>

        {/* INFO */}
        <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <Layers3 className="h-4 w-4 text-emerald-400" />
            {room.floor}
          </div>

          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-emerald-400" />
            {room.capacity} People
          </div>

          <div className="flex items-center gap-2">
            <Wifi className="h-4 w-4 text-emerald-400" />
            Wi-Fi
          </div>
        </div>

        {/* AMENITIES */}
        <div className="mt-5 flex flex-wrap gap-2">
          {room.amenities.map((item, index) => (
            <span
              key={index}
              className="rounded-full border border-emerald-900/50 bg-emerald-950/30 px-3 py-1 text-xs font-medium text-emerald-100"
            >
              {item}
            </span>
          ))}
        </div>

        {/* BUTTON */}
        <Link
          href={`/rooms/${room.id}`}
          className="mt-6 flex items-center justify-center rounded-2xl bg-amber-400 px-5 py-4 text-sm font-bold text-slate-950 transition hover:bg-amber-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}