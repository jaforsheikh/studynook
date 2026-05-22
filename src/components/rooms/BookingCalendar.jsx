"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://studynook-server-beta.vercel.app";

const timeSlots = [
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
];

export default function BookingCalendar({ room }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [date, setDate] = useState("");
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roomId = room?._id || room?.id || room?.slug;
  const roomName = room?.name || room?.title || "Study Room";
  const hourlyPrice = Number(room?.price || 0);

  const totalPrice = useMemo(
    () => selectedSlots.length * hourlyPrice,
    [selectedSlots, hourlyPrice]
  );

  const canBook = date && selectedSlots.length > 0 && !isSubmitting;

  const handleSlotClick = (slot) => {
    setSelectedSlots((prev) =>
      prev.includes(slot)
        ? prev.filter((item) => item !== slot)
        : [...prev, slot]
    );
  };

  const handleBooking = async () => {
    if (!session?.user) {
      toast.error("Please login first to book this room.");
      router.push("/login");
      return;
    }

    if (!date) {
      toast.error("Please select booking date.");
      return;
    }

    if (selectedSlots.length === 0) {
      toast.error("Please select at least one time slot.");
      return;
    }

    if (!roomId) {
      toast.error("Room information is missing.");
      return;
    }

    setIsSubmitting(true);

    try {
      const bookingData = {
        roomId,
        roomName,
        bookingDate: date,
        slots: selectedSlots,
        totalPrice,
        userEmail: session.user.email,
        userName: session.user.name,
        status: "confirmed",
      };

      const res = await fetch(`${API_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || "Booking failed.");
        setIsSubmitting(false);
        return;
      }

      toast.success("Booking confirmed successfully!");
      setDate("");
      setSelectedSlots([]);
      router.push("/dashboard/bookings");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,1.05fr)]">
      <section className="rounded-[34px] border border-emerald-500/10 bg-[#071713]/95 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-7">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-emerald-300">
          <ShieldCheck className="h-3.5 w-3.5" />
          Secure
        </span>

        <h3 className="mt-4 max-w-[260px] text-3xl font-black leading-[0.95] tracking-[-0.04em] text-white">
          Select Time Slots
        </h3>

        <p className="mt-3 max-w-xs text-sm leading-6 text-slate-400">
          Choose a date and one or more hourly slots for your booking.
        </p>

        <label className="mt-7 block">
          <span className="mb-3 block text-sm font-black text-white">
            Booking Date
          </span>

          <div className="flex items-center gap-3 rounded-[22px] border border-emerald-500/10 bg-[#03100d] px-4 py-4 transition focus-within:border-emerald-400/40">
            <CalendarDays className="h-5 w-5 shrink-0 text-emerald-400" />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-transparent text-sm font-bold text-white outline-none [color-scheme:dark]"
            />
          </div>
        </label>

        <div className="mt-7">
          <div className="mb-4 flex items-center gap-2 text-sm font-black text-white">
            <Clock className="h-4 w-4 text-emerald-400" />
            Available Time Slots
          </div>

          <div className="grid grid-cols-2 gap-3">
            {timeSlots.map((slot) => {
              const isSelected = selectedSlots.includes(slot);

              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => handleSlotClick(slot)}
                  className={`min-h-[50px] rounded-2xl border px-3 text-sm font-black transition ${
                    isSelected
                      ? "border-emerald-300 bg-emerald-400 text-[#03100d] shadow-lg shadow-emerald-950/30"
                      : "border-emerald-500/10 bg-[#03100d] text-slate-200 hover:-translate-y-0.5 hover:border-emerald-400/35 hover:text-white"
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="rounded-[34px] border border-emerald-500/10 bg-[#071713]/95 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-7">
        <h3 className="text-3xl font-black leading-[0.95] tracking-[-0.04em] text-white">
          Booking Summary
        </h3>

        <div className="mt-8">
          <SummaryRow label="Room" value={roomName} />
          <SummaryRow label="Date" value={date || "Not selected"} />
          <SummaryRow label="Selected Slots" value={selectedSlots.length} />
          <SummaryRow label="Hourly Price" value={`৳${hourlyPrice}`} />
        </div>

        <div className="mt-8 rounded-[28px] bg-[#020c09] p-6">
          <p className="text-sm font-medium text-slate-400">Total</p>
          <p className="mt-1 text-6xl font-black tracking-[-0.06em] text-amber-400">
            ৳{totalPrice}
          </p>
        </div>

        <button
          type="button"
          onClick={handleBooking}
          disabled={!canBook}
          className="mt-7 flex w-full items-center justify-center gap-2 rounded-[22px] bg-amber-400 px-6 py-4 text-sm font-black text-slate-950 shadow-xl shadow-amber-950/20 transition hover:-translate-y-0.5 hover:bg-amber-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400 disabled:hover:translate-y-0"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Confirming...
            </>
          ) : (
            <>
              <CheckCircle2 className="h-5 w-5" />
              Confirm Booking
            </>
          )}
        </button>

        {!session?.user && (
          <p className="mt-5 text-center text-sm leading-6 text-slate-500">
            Login is required before booking confirmation.
          </p>
        )}
      </section>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/5 py-4 last:border-b-0">
      <span className="text-sm font-medium text-slate-400">{label}</span>
      <span className="text-right text-sm font-black text-white">{value}</span>
    </div>
  );
}