import {
  ImagePlus,
  MapPin,
  Users,
  Wallet,
} from "lucide-react";

export default function AddRoomPage() {
  return (
    <div>
      {/* HEADER */}
      <div>
        <span className="rounded-full border border-emerald-800/40 bg-emerald-900/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
          Add Study Room
        </span>

        <h1 className="mt-6 text-4xl font-black tracking-tight text-white">
          Create New Room Listing
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">
          Add your study room details, amenities, pricing,
          and availability to start receiving bookings.
        </p>
      </div>

      {/* FORM */}
      <form className="mt-12 space-y-8">
        
        {/* BASIC INFO */}
        <div className="rounded-[32px] border border-emerald-900/30 bg-white/[0.03] p-8 backdrop-blur-xl">
          <h2 className="text-2xl font-black text-white">
            Basic Information
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            
            {/* ROOM NAME */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Room Name
              </label>

              <input
                type="text"
                placeholder="Enter room name"
                className="w-full rounded-2xl border border-emerald-900/40 bg-[#06110e] px-5 py-4 text-sm text-white outline-none placeholder:text-slate-500"
              />
            </div>

            {/* LOCATION */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Location
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-emerald-900/40 bg-[#06110e] px-5 py-4">
                <MapPin className="h-5 w-5 text-emerald-400" />

                <input
                  type="text"
                  placeholder="Dhanmondi, Dhaka"
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* PRICE */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Hourly Price
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-emerald-900/40 bg-[#06110e] px-5 py-4">
                <Wallet className="h-5 w-5 text-emerald-400" />

                <input
                  type="number"
                  placeholder="120"
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* CAPACITY */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Capacity
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-emerald-900/40 bg-[#06110e] px-5 py-4">
                <Users className="h-5 w-5 text-emerald-400" />

                <input
                  type="number"
                  placeholder="4"
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                />
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold text-slate-300">
              Description
            </label>

            <textarea
              rows={6}
              placeholder="Describe your study room..."
              className="w-full rounded-2xl border border-emerald-900/40 bg-[#06110e] px-5 py-4 text-sm text-white outline-none placeholder:text-slate-500"
            ></textarea>
          </div>
        </div>

        {/* AMENITIES */}
        <div className="rounded-[32px] border border-emerald-900/30 bg-white/[0.03] p-8 backdrop-blur-xl">
          <h2 className="text-2xl font-black text-white">
            Amenities
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Wi-Fi",
              "Air Conditioning",
              "Whiteboard",
              "Projector",
              "Coffee",
              "Silent Zone",
              "Parking",
              "Power Outlets",
            ].map((item) => (
              <label
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-emerald-900/40 bg-[#06110e] px-5 py-4 text-sm font-medium text-slate-300"
              >
                <input type="checkbox" />
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* IMAGE UPLOAD */}
        <div className="rounded-[32px] border border-dashed border-emerald-800/40 bg-white/[0.03] p-10 text-center backdrop-blur-xl">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-500/10 text-emerald-400">
            <ImagePlus className="h-10 w-10" />
          </div>

          <h3 className="mt-6 text-2xl font-black text-white">
            Upload Room Images
          </h3>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            Upload high-quality images to attract more bookings.
          </p>

          <button
            type="button"
            className="mt-6 rounded-2xl border border-emerald-800/40 bg-emerald-900/20 px-6 py-4 text-sm font-bold text-white hover:bg-emerald-600"
          >
            Choose Images
          </button>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full rounded-2xl bg-amber-400 px-6 py-5 text-sm font-black text-slate-950 transition hover:bg-amber-300"
        >
          Publish Room Listing
        </button>
      </form>
    </div>
  );
}