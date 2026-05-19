import { rooms } from "@/data/rooms";
import { ArrowLeft, ImagePlus, MapPin, Users, Wallet } from "lucide-react";
import Link from "next/link";

export default async function EditRoomPage({ params }) {
  const { slug } = await params;

  const room = rooms.find((item) => item.slug === slug);

  if (!room) {
    return (
      <div>
        <h1 className="text-4xl font-black text-white">Room not found</h1>

        <Link
          href="/dashboard/my-listings"
          className="mt-6 inline-flex items-center gap-2 text-emerald-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to listings
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/dashboard/my-listings"
        className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-emerald-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to listings
      </Link>

      <div className="mt-8">
        <span className="rounded-full border border-emerald-800/40 bg-emerald-900/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
          Edit Room
        </span>

        <h1 className="mt-6 text-4xl font-black tracking-tight text-white">
          Update {room.title}
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">
          Update your room information, pricing, amenities, and image details.
        </p>
      </div>

      <form className="mt-12 space-y-8">
        <div className="rounded-[32px] border border-emerald-900/30 bg-white/[0.03] p-8 backdrop-blur-xl">
          <h2 className="text-2xl font-black text-white">
            Room Information
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Room Name
              </label>

              <input
                type="text"
                defaultValue={room.title}
                className="w-full rounded-2xl border border-emerald-900/40 bg-[#06110e] px-5 py-4 text-sm text-white outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Location
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-emerald-900/40 bg-[#06110e] px-5 py-4">
                <MapPin className="h-5 w-5 text-emerald-400" />

                <input
                  type="text"
                  defaultValue={room.location}
                  className="w-full bg-transparent text-sm text-white outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Hourly Price
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-emerald-900/40 bg-[#06110e] px-5 py-4">
                <Wallet className="h-5 w-5 text-emerald-400" />

                <input
                  type="number"
                  defaultValue={room.price}
                  className="w-full bg-transparent text-sm text-white outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Capacity
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-emerald-900/40 bg-[#06110e] px-5 py-4">
                <Users className="h-5 w-5 text-emerald-400" />

                <input
                  type="number"
                  defaultValue={room.capacity}
                  className="w-full bg-transparent text-sm text-white outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Floor
              </label>

              <input
                type="text"
                defaultValue={room.floor}
                className="w-full rounded-2xl border border-emerald-900/40 bg-[#06110e] px-5 py-4 text-sm text-white outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Image URL
              </label>

              <input
                type="text"
                defaultValue={room.image}
                className="w-full rounded-2xl border border-emerald-900/40 bg-[#06110e] px-5 py-4 text-sm text-white outline-none"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold text-slate-300">
              Description
            </label>

            <textarea
              rows={6}
              defaultValue={room.description}
              className="w-full rounded-2xl border border-emerald-900/40 bg-[#06110e] px-5 py-4 text-sm text-white outline-none"
            />
          </div>
        </div>

        <div className="rounded-[32px] border border-emerald-900/30 bg-white/[0.03] p-8 backdrop-blur-xl">
          <h2 className="text-2xl font-black text-white">Amenities</h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Wi-Fi",
              "Air Conditioning",
              "Whiteboard",
              "Projector",
              "Coffee",
              "Quiet Zone",
              "Parking",
              "Power Outlets",
            ].map((item) => (
              <label
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-emerald-900/40 bg-[#06110e] px-5 py-4 text-sm font-medium text-slate-300"
              >
                <input
                  type="checkbox"
                  defaultChecked={room.amenities.includes(item)}
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-4xl border border-dashed border-emerald-800/40 bg-white/[0.03] p-10 text-center backdrop-blur-xl">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-500/10 text-emerald-400">
            <ImagePlus className="h-10 w-10" />
          </div>

          <h3 className="mt-6 text-2xl font-black text-white">
            Replace Room Image
          </h3>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            For assignment simplicity, you can use image URL instead of upload.
          </p>
        </div>

        <button
          type="submit"
          className="w-full rounded-2xl bg-amber-400 px-6 py-5 text-sm font-black text-slate-950 transition hover:bg-amber-300"
        >
          Update Room
        </button>
      </form>
    </div>
  );
}