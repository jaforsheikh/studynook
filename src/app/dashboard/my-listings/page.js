"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { deleteRoom, getMyListings } from "@/services/roomService";

import EmptyState from "@/components/shared/EmptyState";

import { Eye, MapPin, Pencil, Plus, Star, Trash2, Users } from "lucide-react";

import { toast } from "sonner";

export default function MyListingsPage() {
  const { data: session, isPending } = authClient.useSession();

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const userEmail = session?.user?.email;

  useEffect(() => {
    if (!userEmail) return;

    const fetchListings = async () => {
      try {
        const data = await getMyListings(userEmail);

        if (data.success) {
          setRooms(data.rooms);
        } else {
          toast.error(data.message || "Failed to load listings.");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to load listings.");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [userEmail]);

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this room?");

    if (!confirmDelete) return;

    try {
      const data = await deleteRoom(id);

      if (data.success) {
        toast.success("Room deleted successfully.");

        setRooms((prev) => prev.filter((room) => room._id !== id));
      } else {
        toast.error(data.message || "Failed to delete room.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  if (isPending || loading) {
    return (
      <div className="rounded-4xl border border-emerald-900/30 bg-white/3 p-10">
        <p className="text-slate-400">Loading your listings...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <span className="rounded-full border border-emerald-800/40 bg-emerald-900/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
            My Listings
          </span>

          <h1 className="mt-6 text-4xl font-black tracking-tight text-white">
            Manage Your Rooms
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">
            View, edit, and manage all your published study room listings.
          </p>
        </div>

        <Link
          href="/dashboard/add-room"
          className="inline-flex items-center gap-3 rounded-2xl bg-amber-400 px-6 py-4 text-sm font-black text-slate-950 transition hover:bg-amber-300"
        >
          <Plus className="h-5 w-5" />
          Add New Room
        </Link>
      </div>

      <div className="mt-10">
        {rooms.length === 0 ? (
          <EmptyState
            title="No room listings yet"
            description="You have not added any study rooms yet. Create your first room listing and start receiving bookings."
            actionText="Add New Room"
            actionHref="/dashboard/add-room"
          />
        ) : (
          <div className="grid gap-8 xl:grid-cols-2">
            {rooms.map((room) => (
              <div
                key={room._id}
                className="overflow-hidden rounded-4xl border border-emerald-900/30 bg-white/3 backdrop-blur-xl"
              >
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={room.image || "/assets/rooms/quiet-pod.jpg"}
                    alt={room.name || "Study room"}
                    fill
                    unoptimized
                    className="object-cover"
                  />

                  <div className="absolute left-5 top-5 rounded-full bg-emerald-500 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white">
                    Active
                  </div>

                  <div className="absolute right-5 top-5 rounded-full bg-black/60 px-4 py-2 text-sm font-bold text-white backdrop-blur-md">
                    ৳{room.price}/hr
                  </div>
                </div>

                <div className="p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-3xl font-black text-white">
                        {room.name}
                      </h2>

                      <div className="mt-3 flex items-center gap-2 text-slate-400">
                        <MapPin className="h-4 w-4 text-emerald-400" />
                        {room.location}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-2 text-sm font-bold text-emerald-300">
                      <Star className="h-4 w-4 fill-current" />
                      {room.rating || 4.8}
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-3 gap-4">
                    <MiniStat
                      label="Capacity"
                      value={room.capacity || 0}
                      icon={Users}
                    />

                    <MiniStat label="Bookings" value={room.bookingCount || 0} />

                    <MiniStat
                      label="Earnings"
                      value={`৳${(room.bookingCount || 0) * room.price}`}
                      highlight
                    />
                  </div>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link
                      href={`/rooms/${room._id}`}
                      className="inline-flex items-center gap-2 rounded-2xl border border-emerald-900/30 bg-[#06110e] px-5 py-3 text-sm font-bold text-white transition hover:border-emerald-500"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </Link>

                    <Link
                      href={`/dashboard/my-listings/${room._id}/edit`}
                      className="inline-flex items-center gap-2 rounded-2xl border border-blue-500/20 bg-blue-500/10 px-5 py-3 text-sm font-bold text-blue-300 transition hover:bg-blue-500/20"
                    >
                      <Pencil className="h-4 w-4" />
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(room._id)}
                      className="inline-flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-sm font-bold text-red-300 transition hover:bg-red-500/20"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MiniStat({ label, value, icon: Icon, highlight = false }) {
  return (
    <div className="rounded-2xl border border-emerald-900/20 bg-[#06110e] p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
        {label}
      </p>

      <div
        className={`mt-3 flex items-center gap-2 text-lg font-black ${
          highlight ? "text-amber-400" : "text-white"
        }`}
      >
        {Icon && <Icon className="h-5 w-5 text-emerald-400" />}
        {value}
      </div>
    </div>
  );
}
