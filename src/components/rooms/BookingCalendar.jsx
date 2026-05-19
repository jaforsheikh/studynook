"use client";

import { useMemo, useState } from "react";
import { CalendarDays, Clock, CheckCircle2 } from "lucide-react";

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

const bookedSlots = ["10:00 AM", "03:00 PM"];

export default function BookingCalendar({ room }) {
  const [date, setDate] = useState("");
  const [selectedSlots, setSelectedSlots] = useState([]);

  const totalPrice = useMemo(() => {
    return selectedSlots.length * room.price;
  }, [selectedSlots, room.price]);

  const handleSlotClick = (slot) => {
    if (bookedSlots.includes(slot)) return;

    setSelectedSlots((prev) =>
      prev.includes(slot)
        ? prev.filter((item) => item !== slot)
        : [...prev, slot]
    );
  };

  return (
    <div className="rounded-[32px] border border-emerald-900/40 bg-white/[0.03] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <h3 className="text-2xl font-black text-white">Book This Room</h3>

      <p className="mt-2 text-sm text-slate-400">
        Select date and hourly slots. Backend will later verify real-time
        availability.
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
            className="w-full bg-transparent text-sm text-white outline-none"
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
            const isBooked = bookedSlots.includes(slot);
            const isSelected = selectedSlots.includes(slot);

            return (
              <button
                key={slot}
                type="button"
                disabled={isBooked}
                onClick={() => handleSlotClick(slot)}
                className={`rounded-2xl border px-4 py-3 text-sm font-bold transition ${
                  isBooked
                    ? "cursor-not-allowed border-red-500/20 bg-red-500/10 text-red-300"
                    : isSelected
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
          <span className="font-bold text-amber-400">৳{room.price}</span>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-emerald-900/40 pt-3">
          <span className="text-sm font-bold text-white">Total</span>
          <span className="text-2xl font-black text-amber-400">
            ৳{totalPrice}
          </span>
        </div>
      </div>

      <button
        disabled={!date || selectedSlots.length === 0}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-400 px-6 py-4 text-sm font-black text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
      >
        <CheckCircle2 className="h-5 w-5" />
        Continue Booking
      </button>
    </div>
  );
}