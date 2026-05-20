"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import EmptyState from "@/components/shared/EmptyState";
import { CalendarCheck, Clock, CreditCard, XCircle } from "lucide-react";
import { toast } from "sonner";

export default function MyBookingsPage() {
  const { data: session, isPending } = authClient.useSession();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const userEmail = session?.user?.email;

  useEffect(() => {
    if (!userEmail) return;

    const fetchBookings = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/bookings/my-bookings/${userEmail}`,
          {
            credentials: "include",
          }
        );

        const data = await res.json();

        if (data.success) {
          setBookings(data.bookings);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userEmail]);

  const handleCancel = async (id) => {
    const confirmCancel = confirm("Are you sure you want to cancel this booking?");

    if (!confirmCancel) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/bookings/${id}/cancel`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Booking cancelled successfully.");

        setBookings((prev) =>
          prev.map((booking) =>
            booking._id === id
              ? { ...booking, status: "cancelled" }
              : booking
          )
        );
      } else {
        toast.error(data.message || "Cancel failed.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  if (isPending || loading) {
    return (
      <div className="rounded-[32px] border border-emerald-900/30 bg-white/[0.03] p-10">
        <p className="text-slate-400">Loading your bookings...</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <span className="rounded-full border border-emerald-800/40 bg-emerald-900/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
          My Bookings
        </span>

        <h1 className="mt-6 text-4xl font-black tracking-tight text-white">
          Your Room Bookings
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">
          View your confirmed and cancelled study room reservations.
        </p>
      </div>

      <div className="mt-10">
        {bookings.length === 0 ? (
          <EmptyState
            title="No bookings yet"
            description="You have not booked any study room yet. Browse available rooms and reserve your preferred slot."
            actionText="Browse Rooms"
            actionHref="/rooms"
          />
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="rounded-[30px] border border-emerald-900/30 bg-white/[0.03] p-6 backdrop-blur-xl"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-black text-white">
                        {booking.roomName}
                      </h2>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          booking.status === "cancelled"
                            ? "bg-red-500/10 text-red-300"
                            : "bg-emerald-500/10 text-emerald-300"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-5 text-sm text-slate-400">
                      <span className="flex items-center gap-2">
                        <CalendarCheck className="h-4 w-4 text-emerald-400" />
                        {booking.bookingDate}
                      </span>

                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-emerald-400" />
                        {booking.slots?.join(", ")}
                      </span>

                      <span className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-amber-400" />
                        ৳{booking.totalPrice}
                      </span>
                    </div>
                  </div>

                  {booking.status !== "cancelled" && (
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="flex items-center justify-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-sm font-bold text-red-300 transition hover:bg-red-500/20"
                    >
                      <XCircle className="h-4 w-4" />
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}