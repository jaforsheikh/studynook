import Link from "next/link";
import Image from "next/image";
import { rooms } from "@/data/rooms";
import {
  ArrowLeft,
  CalendarCheck,
  Clock,
  DollarSign,
  Layers,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
  Wifi,
} from "lucide-react";

export default async function RoomDetailsPage({ params }) {
  const { id } = await params;

  const room = rooms.find(
    (item) =>
      item.id?.toString() === id ||
      item._id?.toString() === id ||
      item.slug === id
  );

  if (!room) {
    return (
      <main className="min-h-screen bg-[#06110e] px-6 py-24 text-white">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-black">Room not found</h1>

          <Link href="/rooms" className="mt-6 inline-block text-emerald-300">
            Back to rooms
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#06110e] px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/rooms"
          className="mb-10 inline-flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-emerald-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all rooms
        </Link>

        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.75fr]">
          <section>
            <div className="relative h-[480px] overflow-hidden rounded-[34px] border border-emerald-900/30">
              <Image
                src={room.image}
                alt={room.title || room.name}
                fill
                className="object-cover"
              />

              <div className="absolute left-5 top-5 rounded-full bg-emerald-500/90 px-5 py-2 text-sm font-black text-white">
                {room.availableToday ? "Available Today" : "Booked"}
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div>
                <h1 className="text-5xl font-black tracking-tight text-white">
                  {room.title || room.name}
                </h1>

                <p className="mt-3 text-sm font-semibold text-slate-500">
                  Listed May 17, 2026
                </p>
              </div>

              <span className="rounded-full bg-emerald-500/10 px-5 py-2 text-sm font-bold text-emerald-300">
                {room.bookingCount || 8} bookings
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-5 text-slate-400">
              <InfoLine icon={MapPin} text={room.location} />
              <InfoLine icon={Layers} text={room.floor} />
              <InfoLine icon={Users} text={`Up to ${room.capacity} people`} />
              <InfoLine icon={Wifi} text="High-speed Wi-Fi" />
            </div>

            <p className="mt-8 max-w-4xl text-lg leading-9 text-slate-300">
              {room.description}
            </p>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <HighlightCard
                icon={Clock}
                title="Hourly Booking"
                text="Book flexible hourly slots based on your study schedule."
              />

              <HighlightCard
                icon={ShieldCheck}
                title="Verified Space"
                text="Managed study environment with controlled availability."
              />

              <HighlightCard
                icon={Sparkles}
                title="Clean & Focused"
                text="Designed for productive sessions, projects, and deep work."
              />

              <HighlightCard
                icon={CalendarCheck}
                title="Real-time Slots"
                text="Availability will be verified during booking confirmation."
              />
            </div>

            <DetailsSection title="Amenities">
              <div className="flex flex-wrap gap-3">
                {room.amenities?.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-emerald-900/50 bg-emerald-500/5 px-4 py-2 text-sm font-semibold text-emerald-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </DetailsSection>

            <DetailsSection title="House Rules">
              <ul className="grid gap-3 text-sm leading-7 text-slate-300 md:grid-cols-2">
                <li>• Keep the room clean after use.</li>
                <li>• No loud music or disruptive behavior.</li>
                <li>• Arrive within 10 minutes of your booked slot.</li>
                <li>• Cancel future bookings from your dashboard if needed.</li>
                <li>• Outside food may depend on room policy.</li>
                <li>• Respect other students and library users.</li>
              </ul>
            </DetailsSection>

            <DetailsSection title="Location & Access">
              <div className="rounded-[28px] border border-emerald-900/30 bg-white/[0.03] p-6">
                <p className="flex items-center gap-2 text-lg font-bold text-white">
                  <MapPin className="h-5 w-5 text-emerald-400" />
                  {room.location}
                </p>

                <p className="mt-3 text-sm leading-7 text-slate-400">
                  Exact access instructions will be visible after successful
                  booking confirmation. Please check in with the listed room
                  owner or library desk before entering the room.
                </p>
              </div>
            </DetailsSection>
          </section>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[32px] border border-emerald-900/40 bg-white/[0.04] p-8 backdrop-blur-xl">
              <div className="flex items-end justify-between">
                <h2 className="text-4xl font-black text-amber-400">
                  ৳{room.price}
                </h2>

                <span className="text-sm font-semibold text-slate-400">
                  per hour
                </span>
              </div>

              <div className="mt-8 space-y-4 text-slate-300">
                <InfoLine icon={Layers} text={room.floor} />
                <InfoLine icon={Users} text={`Up to ${room.capacity} people`} />
                <InfoLine
                  icon={DollarSign}
                  text={`${room.bookingCount || 8} total bookings`}
                />
              </div>

              <Link
                href={`/rooms/${id}/book`}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-400 px-6 py-5 text-sm font-black text-slate-950 transition hover:bg-amber-300"
              >
                <CalendarCheck className="h-5 w-5" />
                Book This Room
              </Link>

              <p className="mt-4 text-center text-xs leading-6 text-slate-500">
                Booking confirmation depends on selected date and time
                availability.
              </p>
            </div>

            <div className="rounded-[32px] border border-emerald-900/40 bg-white/[0.04] p-8">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                Listed By
              </p>

              <div className="mt-5 flex items-center gap-4">
                <div className="h-14 w-14 overflow-hidden rounded-full bg-emerald-500/20">
                  <Image
                    src="/assets/avatar.jpg"
                    alt="Owner"
                    width={56}
                    height={56}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div>
                  <h3 className="font-black text-white">Maya Chen</h3>
                  <p className="text-sm text-emerald-200">
                    maya@studynook.demo
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-emerald-900/40 bg-emerald-500/5 p-8">
              <h3 className="text-xl font-black text-white">
                Booking Safety Note
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                StudyNook prevents double bookings by checking room, date, and
                time-slot conflicts before confirming a reservation.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function InfoLine({ icon: Icon, text }) {
  return (
    <span className="flex items-center gap-2 text-sm font-semibold">
      <Icon className="h-5 w-5 text-emerald-400" />
      {text}
    </span>
  );
}

function HighlightCard({ icon: Icon, title, text }) {
  return (
    <div className="rounded-[28px] border border-emerald-900/30 bg-white/[0.03] p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
        <Icon className="h-6 w-6" />
      </div>

      <h3 className="mt-5 text-lg font-black text-white">{title}</h3>

      <p className="mt-2 text-sm leading-7 text-slate-400">{text}</p>
    </div>
  );
}

function DetailsSection({ title, children }) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-black text-white">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}