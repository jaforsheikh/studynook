"use client";

import { useState } from "react";
import { CalendarDays, Clock, CreditCard } from "lucide-react";
import { toast } from "sonner";

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
  const [date, setDate] = useState("");
  const [selectedSlots, setSelectedSlots] = useState([]);

  const toggleSlot = (slot) => {
    if (selectedSlots.includes(slot)) {
      setSelectedSlots(
        selectedSlots.filter((item) => item !== slot)
      );
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  const totalPrice =
    selectedSlots.length * Number(room.price);

  const handleBooking = async () => {
    try {
      if (!date) {
        toast.error("Please select a booking date.");
        return;
      }

      if (selectedSlots.length === 0) {
        toast.error("Please select at least one time slot.");
        return;
      }

      const bookingData = {
        roomId: room.id || room._id,
        roomName: room.title || room.name,
        date,
        slots: selectedSlots,
        totalPrice,
      };

      const response = await fetch(
        "http://localhost:5000/api/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Booking created successfully!");

        console.log(data);

        setSelectedSlots([]);
      } else {
        toast.error("Booking failed.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
      
      <div className="rounded-[32px] border border-emerald-900/30 bg-gradient-to-b from-[#071411] to-[#06110e] p-8">
        
        <h2 className="text-4xl font-black text-white">
          Select Time Slots
        </h2>

        <p className="mt-4 text-lg leading-8 text-slate-400">
          Choose a date and one or more hourly slots for
          your booking.
        </p>

        <div className="mt-10">
          
          <label className="mb-4 block text-xl font-bold text-white">
            Booking Date
          </label>

          <div className="relative">
            
            <CalendarDays className="pointer-events-none absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-emerald-400" />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-20 w-full rounded-[24px] border border-emerald-900/40 bg-[#02110d] pl-16 pr-6 text-lg font-semibold text-white outline-none transition focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="mt-12">
          
          <div className="mb-6 flex items-center gap-3">
            <Clock className="h-7 w-7 text-emerald-400" />

            <h3 className="text-2xl font-black text-white">
              Available Time Slots
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {timeSlots.map((slot) => {
              const active =
                selectedSlots.includes(slot);

              return (
                <button
                  key={slot}
                  onClick={() => toggleSlot(slot)}
                  className={`h-16 rounded-[20px] border text-lg font-black transition ${
                    active
                      ? "border-amber-400 bg-amber-400 text-black"
                      : "border-emerald-900/40 bg-[#02110d] text-white hover:border-emerald-500"
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="rounded-[32px] border border-emerald-900/30 bg-gradient-to-b from-[#071411] to-[#06110e] p-8">
        
        <h2 className="text-4xl font-black text-white">
          Booking Summary
        </h2>

        <div className="mt-10 space-y-6">
          
          <div className="flex items-center justify-between border-b border-emerald-900/20 pb-5">
            <span className="text-xl text-slate-400">
              Room
            </span>

            <span className="text-xl font-black text-white">
              {room.title || room.name}
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-emerald-900/20 pb-5">
            <span className="text-xl text-slate-400">
              Date
            </span>

            <span className="text-xl font-black text-white">
              {date || "Not selected"}
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-emerald-900/20 pb-5">
            <span className="text-xl text-slate-400">
              Selected Slots
            </span>

            <span className="text-xl font-black text-white">
              {selectedSlots.length}
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-emerald-900/20 pb-5">
            <span className="text-xl text-slate-400">
              Hourly Price
            </span>

            <span className="text-xl font-black text-white">
              ৳{room.price}
            </span>
          </div>
        </div>

        <div className="mt-10 rounded-[28px] bg-[#02110d] p-8">
          
          <div className="flex items-center justify-between">
            
            <span className="text-2xl text-slate-400">
              Total
            </span>

            <span className="text-6xl font-black text-amber-400">
              ৳{totalPrice}
            </span>
          </div>
        </div>

        <button
          onClick={handleBooking}
          className="mt-10 flex h-20 w-full items-center justify-center gap-3 rounded-[24px] bg-amber-400 text-2xl font-black text-black transition hover:bg-amber-300"
        >
          <CreditCard className="h-7 w-7" />

          Confirm Booking
        </button>

        <p className="mt-6 text-center text-lg leading-8 text-slate-500">
          Backend will verify room availability before
          confirming.
        </p>
      </div>
    </div>
  );
}