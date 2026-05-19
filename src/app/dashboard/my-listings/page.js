import Link from "next/link";
import Image from "next/image";
import { rooms } from "@/data/rooms";
import { Edit, PlusCircle, Trash2, Users, Star } from "lucide-react";

export default function MyListingsPage() {
  return (
    <div>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="rounded-full border border-emerald-800/40 bg-emerald-900/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
            My Listings
          </span>

          <h1 className="mt-6 text-4xl font-black tracking-tight text-white">
            Manage Your Room Listings
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">
            Edit, update, or remove the study rooms you have listed.
          </p>
        </div>

        <Link
          href="/dashboard/rooms/new"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-400 px-6 py-4 text-sm font-black text-slate-950 hover:bg-amber-300"
        >
          <PlusCircle className="h-5 w-5" />
          Add New Room
        </Link>
      </div>

      <div className="mt-12 grid gap-6">
        {rooms.slice(0, 4).map((room) => (
          <div
            key={room.id}
            className="rounded-[30px] border border-emerald-900/30 bg-white/[0.03] p-5 backdrop-blur-xl"
          >
            <div className="grid gap-6 lg:grid-cols-[220px_1fr_auto] lg:items-center">
              <div className="overflow-hidden rounded-3xl">
                <Image
                  src={room.image}
                  alt={room.title}
                  width={500}
                  height={350}
                  className="h-44 w-full object-cover lg:h-36"
                />
              </div>

              <div>
                <h2 className="text-2xl font-black text-white">
                  {room.title}
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                  {room.location} · {room.floor}
                </p>

                <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-400">
                  <span className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-emerald-400" />
                    {room.capacity} People
                  </span>

                  <span className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    {room.rating}
                  </span>

                  <span className="font-bold text-amber-400">
                    ৳{room.price}/hr
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Link
                  href={`/dashboard/my-listings/${room.slug}/edit`}
                  className="inline-flex items-center gap-2 rounded-2xl border border-emerald-900/40 px-5 py-3 text-sm font-bold text-slate-300 hover:border-emerald-600 hover:text-white"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Link>

                <button className="inline-flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-sm font-bold text-red-300 hover:bg-red-500/20">
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}