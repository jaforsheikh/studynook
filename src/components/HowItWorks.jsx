import {
  Search,
  CalendarClock,
  CreditCard,
  DoorOpen,
} from "lucide-react";

const steps = [
  {
    id: "01",
    icon: Search,
    title: "Search Study Rooms",
    description:
      "Find premium libraries and study spaces based on location, availability, capacity, and amenities.",
  },
  {
    id: "02",
    icon: CalendarClock,
    title: "Choose Time Slot",
    description:
      "Select your preferred date and hourly booking slot with real-time availability updates.",
  },
  {
    id: "03",
    icon: CreditCard,
    title: "Secure Payment",
    description:
      "Pay securely using Stripe or SSLCommerz with instant booking confirmation.",
  },
  {
    id: "04",
    icon: DoorOpen,
    title: "Start Studying",
    description:
      "Arrive at your booked room and enjoy a quiet, productive learning environment.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-[#06110e] to-[#0c1d18] py-24">
      
      {/* BG EFFECT */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full border border-emerald-700/30 bg-emerald-900/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
            Booking Process
          </span>

          <h2 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl">
            How StudyNook Works
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            Book your ideal study environment in just a few simple steps.
          </p>
        </div>

        {/* STEPS */}
        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.id}
                className="group relative overflow-hidden rounded-[30px] border border-emerald-900/30 bg-white/3 p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-emerald-700/40"
              >
                
                {/* NUMBER */}
                <div className="absolute right-6 top-6 text-5xl font-black text-white/5">
                  {step.id}
                </div>

                {/* ICON */}
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                  <Icon className="h-8 w-8" />
                </div>

                {/* CONTENT */}
                <h3 className="mt-8 text-2xl font-bold text-white">
                  {step.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-400">
                  {step.description}
                </p>

                {/* HOVER GLOW */}
                <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                  <div className="absolute bottom-0 left-0 h-1 w-full bg-linear-to-r from-emerald-400 to-cyan-400"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}