import { rooms } from "@/data/rooms";
import RoomCard from "@/components/rooms/RoomCard";

export default function RoomsPage() {
  return (
    <main className="min-h-screen bg-[#06110e] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="max-w-3xl">
          <span className="rounded-full border border-emerald-800/40 bg-emerald-900/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
            Study Spaces
          </span>

          <h1 className="mt-6 text-5xl font-black tracking-tight text-white">
            Explore All Study Rooms
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-400">
            Discover modern libraries, collaborative rooms, silent spaces,
            and premium study environments built for productivity.
          </p>
        </div>

        {/* TOP BAR */}
        <div className="mt-14 flex flex-col gap-4 rounded-3xl border border-emerald-900/30 bg-white/[0.03] p-6 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          
          <div>
            <h3 className="text-xl font-bold text-white">
              {rooms.length} Rooms Available
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Updated with real-time availability
            </p>
          </div>

          {/* FILTERS */}
          <div className="flex flex-wrap gap-3">
            <button className="rounded-2xl border border-emerald-800/40 bg-emerald-900/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600">
              Available Today
            </button>

            <button className="rounded-2xl border border-emerald-900/40 bg-transparent px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-emerald-700 hover:text-white">
              Quiet Zone
            </button>

            <button className="rounded-2xl border border-emerald-900/40 bg-transparent px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-emerald-700 hover:text-white">
              Group Study
            </button>

            <button className="rounded-2xl border border-emerald-900/40 bg-transparent px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-emerald-700 hover:text-white">
              Premium
            </button>
          </div>
        </div>

        {/* GRID */}
        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </main>
  );
}