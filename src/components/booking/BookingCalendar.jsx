"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Clock3 } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const API_BASE_URL =
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

const months = [
  { label: "January", value: "01" },
  { label: "February", value: "02" },
  { label: "March", value: "03" },
  { label: "April", value: "04" },
  { label: "May", value: "05" },
  { label: "June", value: "06" },
  { label: "July", value: "07" },
  { label: "August", value: "08" },
  { label: "September", value: "09" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];

export default function BookingCalendar({ room }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("2026");
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedDate = day && month && year ? `${year}-${month}-${day}` : "";

  const totalPrice = useMemo(() => {
    return selectedSlots.length * Number(room?.price || 0);
  }, [selectedSlots, room?.price]);

  const toggleSlot = (slot) => {
    setSelectedSlots((prev) =>
      prev.includes(slot)
        ? prev.filter((item) => item !== slot)
        : [...prev, slot]
    );
  };

  const handleBooking = async () => {
    if (isSubmitting) return;

    if (!session?.user) {
      toast.error("Please login first to book this room.");
      router.push("/login");
      return;
    }

    if (!selectedDate) {
      toast.error("Please select booking date.");
      return;
    }

    if (selectedSlots.length === 0) {
      toast.error("Please select at least one time slot.");
      return;
    }

    setIsSubmitting(true);

    try {
      const bookingData = {
        roomId: room?._id || room?.id || room?.slug,
        roomName: room?.name || room?.title || "Study Room",
        bookingDate: selectedDate,
        slots: selectedSlots,
        totalPrice,
        userEmail: session.user.email,
        userName: session.user.name || session.user.email,
      };

      const res = await fetch(`${API_BASE_URL}/api/bookings`, {
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
      setDay("");
      setMonth("");
      setSelectedSlots([]);
      router.push("/dashboard/bookings");
      router.refresh();
    } catch (error) {
      console.log("Booking error:", error);
      toast.error("Something went wrong.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
      <div className="rounded-[32px] border border-emerald-900/30 bg-[#071411] p-8">
        <h2 className="text-4xl font-black text-white">Select Time Slots</h2>

        <p className="mt-4 text-lg text-slate-400">
          Choose a date and one or more hourly slots for your booking.
        </p>

        <div className="mt-10">
          <label className="mb-4 block text-xl font-black text-white">
            Booking Date
          </label>

          <div className="grid gap-4 sm:grid-cols-3">
            <select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="h-16 rounded-2xl border border-emerald-900/40 bg-[#02110d] px-5 text-white outline-none"
            >
              <option value="">Day</option>
              {Array.from({ length: 31 }, (_, i) => {
                const value = String(i + 1).padStart(2, "0");
                return (
                  <option key={value} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>

            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="h-16 rounded-2xl border border-emerald-900/40 bg-[#02110d] px-5 text-white outline-none"
            >
              <option value="">Month</option>
              {months.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>

            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="h-16 rounded-2xl border border-emerald-900/40 bg-[#02110d] px-5 text-white outline-none"
            >
              <option value="2026">2026</option>
              <option value="2027">2027</option>
            </select>
          </div>
        </div>

        <div className="mt-12">
          <div className="mb-6 flex items-center gap-3">
            <Clock3 className="h-7 w-7 text-emerald-400" />

            <h3 className="text-2xl font-black text-white">
              Available Time Slots
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {timeSlots.map((slot) => {
              const active = selectedSlots.includes(slot);

              return (
                <button
                  key={slot}
                  type="button"
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

      <aside className="rounded-[32px] border border-emerald-900/30 bg-[#071411] p-8">
        <h2 className="text-4xl font-black text-white">Booking Summary</h2>

        <div className="mt-10 space-y-6">
          <SummaryRow label="Room" value={room?.name || room?.title || "Study Room"} />
          <SummaryRow label="Date" value={selectedDate || "Not selected"} />
          <SummaryRow label="Selected Slots" value={selectedSlots.length} />
          <SummaryRow label="Hourly Price" value={`৳${room?.price || 0}`} />
        </div>

        <div className="mt-10 rounded-[28px] bg-[#02110d] p-8">
          <p className="text-xl text-slate-400">Total</p>

          <h3 className="mt-3 text-6xl font-black text-amber-400">
            ৳{totalPrice}
          </h3>
        </div>

        <button
          type="button"
          onClick={handleBooking}
          disabled={!selectedDate || selectedSlots.length === 0 || isSubmitting}
          className="mt-10 flex h-20 w-full items-center justify-center rounded-[24px] bg-amber-400 text-2xl font-black text-black transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
        >
          {isSubmitting ? "Confirming..." : "Confirm Booking"}
        </button>

        <p className="mt-6 text-center text-lg text-slate-500">
          Login is required before booking confirmation.
        </p>
      </aside>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-emerald-900/30 pb-5">
      <span className="text-lg text-slate-400">{label}</span>
      <span className="text-right text-lg font-black text-white">{value}</span>
    </div>
  );
}