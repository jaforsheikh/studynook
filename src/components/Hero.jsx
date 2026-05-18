import Image from "next/image";
import { CalendarDays, MapPin, Search, Users } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-emerald-50 via-white to-slate-50">
      <div className="mx-auto grid min-h-187 max-w-7xl items-center gap-16 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        
        {/* LEFT CONTENT */}
        <div>
          <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            Smart Study Room Booking Platform
          </span>

          <h1 className="mt-6 text-5xl font-black leading-tight tracking-tight text-slate-950 lg:text-6xl">
            Find Your Perfect
            <span className="block text-emerald-600">
              Study Space
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Book quiet libraries, private study rooms, and premium workspaces
            with real-time availability and hourly booking.
          </p>

          {/* SEARCH BOX */}
          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-900/10">
            <div className="grid gap-4 md:grid-cols-4">

              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-4">
                <MapPin className="h-5 w-5 text-emerald-600" />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-4">
                <CalendarDays className="h-5 w-5 text-emerald-600" />
                <input
                  type="date"
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-4">
                <Users className="h-5 w-5 text-emerald-600" />

                <select className="w-full bg-transparent text-sm outline-none">
                  <option>1 Person</option>
                  <option>2-4 People</option>
                  <option>5+ People</option>
                </select>
              </div>

              <button className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-600/30 transition hover:bg-emerald-700">
                <Search className="h-5 w-5" />
                Search
              </button>

            </div>
          </div>

          {/* STATS */}
          <div className="mt-10 flex flex-wrap gap-8">
            <div>
              <h3 className="text-3xl font-black text-slate-950">500+</h3>
              <p className="text-slate-600">Study Rooms</p>
            </div>

            <div>
              <h3 className="text-3xl font-black text-slate-950">10k+</h3>
              <p className="text-slate-600">Students</p>
            </div>

            <div>
              <h3 className="text-3xl font-black text-slate-950">4.9★</h3>
              <p className="text-slate-600">User Rating</p>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-emerald-200 blur-3xl"></div>

          <div className="relative overflow-hidden rounded-4xlborder border-white/40 bg-white shadow-2xl shadow-slate-900/20">
            <Image
              src="/assets/hero.png"
              alt="Study Room"
              width={900}
              height={700}
              className="h-162 w-full object-cover"
              priority
            />

            {/* FLOATING CARD */}
            <div className="absolute bottom-6 left-6 right-6 rounded-3xl border border-white/30 bg-white/90 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-slate-950">
                    Premium Silent Room
                  </h3>

                  <p className="mt-1 text-sm text-slate-600">
                    Dhanmondi, Dhaka
                  </p>
                </div>

                <div className="rounded-2xl bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700">
                  Available
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Starting From</p>

                  <h4 className="text-2xl font-black text-slate-950">
                    ৳120/hr
                  </h4>
                </div>

                <button className="rounded-2xl bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-600">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}