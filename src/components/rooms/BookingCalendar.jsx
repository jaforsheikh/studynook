"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, CheckCircle2, Clock } from "lucide-react";
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

  const totalPrice = useMemo(() => {
    return selectedSlots.length * hourlyPrice;
  }, [selectedSlots, hourlyPrice]);

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
    <div className="rounded-[32px] border border-emerald-900/40 bg-white/[0.03] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <h3 className="text-2xl font-black text-white">Book This Room</h3>

      <p className="mt-2 text-sm text-slate-400">
        Select date and hourly slots. Your booking will be saved to MongoDB.
      </p>

      <label className="mt-6 block">
        <span className="mb-2 block text-sm font-semibold text-slate-300">
          Booking Date
        </span>

        <div className="flex items-center gap-3 rounded-2xl border border-emerald-900/40 bg-[#06110e] px-4 py-4">
          <CalendarDays className="h-5 w-5 text-emerald-400" />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-transparent text-sm text-white outline-none [color-scheme:dark]"
          />
        </div>
      </label>

      <div className="mt-6">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-300">
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
                className={`rounded-2xl border px-4 py-3 text-sm font-bold transition ${
                  isSelected
                    ? "border-emerald-500 bg-emerald-500 text-white"
                    : "border-emerald-900/40 bg-[#06110e] text-slate-300 hover:border-emerald-600 hover:text-white"
                }`}
              >
                {slot}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-emerald-900/40 bg-[#06110e] p-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-400">Selected Slots</span>
          <span className="font-bold text-white">{selectedSlots.length}</span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-slate-400">Hourly Price</span>
          <span className="font-bold text-amber-400">৳{hourlyPrice}</span>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-emerald-900/40 pt-3">
          <span className="text-sm font-bold text-white">Total</span>
          <span className="text-2xl font-black text-amber-400">
            ৳{totalPrice}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleBooking}
        disabled={!date || selectedSlots.length === 0 || isSubmitting}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-400 px-6 py-4 text-sm font-black text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
      >
        <CheckCircle2 className="h-5 w-5" />
        {isSubmitting ? "Confirming..." : "Confirm Booking"}
      </button>
    </div>
  );
}