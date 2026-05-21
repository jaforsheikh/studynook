"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { getRoomById, updateRoom } from "@/services/roomService";

import {
  ArrowLeft,
  Building2,
  ImageIcon,
  Layers,
  MapPin,
  Save,
  Users,
  Wallet,
} from "lucide-react";

import { toast } from "sonner";

const amenitiesList = [
  "Wi-Fi",
  "Whiteboard",
  "Projector",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

export default function EditRoomPage() {
  const router = useRouter();
  const params = useParams();

  const roomId = params.slug;

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    location: "",
    floor: "",
    capacity: "",
    price: "",
    description: "",
    amenities: [],
  });

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const data = await getRoomById(roomId);

        if (data.success) {
          const room = data.room;

          setFormData({
            name: room.name || "",
            image: room.image || "",
            location: room.location || "",
            floor: room.floor || "",
            capacity: room.capacity || "",
            price: room.price || "",
            description: room.description || "",
            amenities: room.amenities || [],
          });
        } else {
          toast.error(data.message || "Room not found.");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to load room.");
      } finally {
        setLoading(false);
      }
    };

    if (roomId) {
      fetchRoom();
    }
  }, [roomId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAmenity = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((item) => item !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.image || !formData.location || !formData.price) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      const payload = {
        ...formData,
        capacity: Number(formData.capacity),
        price: Number(formData.price),
      };

      const data = await updateRoom(roomId, payload);

      if (data.success) {
        toast.success("Room updated successfully.");
        router.push("/dashboard/my-listings");
      } else {
        toast.error(data.message || "Failed to update room.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  if (loading) {
    return (
      <div className="rounded-4xl border border-emerald-900/30 bg-white/3 p-10">
        <p className="text-slate-400">Loading room information...</p>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/dashboard/my-listings"
        className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-emerald-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to listings
      </Link>

      <div className="mt-8">
        <span className="rounded-full border border-emerald-800/40 bg-emerald-900/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
          Edit Room
        </span>

        <h1 className="mt-6 text-4xl font-black tracking-tight text-white">
          Update Room Listing
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">
          Update your room information, pricing, amenities, and image details.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-10 rounded-4xl border border-emerald-900/30 bg-white/3 p-8"
      >
        <h2 className="text-2xl font-black text-white">Room Information</h2>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <InputBox
            icon={Building2}
            label="Room Name *"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Premium Silent Room"
          />

          <InputBox
            icon={MapPin}
            label="Location *"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Dhanmondi, Dhaka"
          />

          <InputBox
            icon={Wallet}
            label="Hourly Price *"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="120"
          />

          <InputBox
            icon={Users}
            label="Capacity"
            name="capacity"
            type="number"
            value={formData.capacity}
            onChange={handleChange}
            placeholder="4"
          />

          <InputBox
            icon={Layers}
            label="Floor"
            name="floor"
            value={formData.floor}
            onChange={handleChange}
            placeholder="3rd Floor"
          />

          <InputBox
            icon={ImageIcon}
            label="Image URL *"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://images.unsplash.com/..."
          />
        </div>

        <div className="mt-6">
          <label className="mb-3 block text-sm font-bold text-slate-300">
            Description
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            placeholder="Describe your study room..."
            className="w-full rounded-2xl border border-emerald-900/40 bg-[#06110e] px-5 py-4 text-white outline-none placeholder:text-slate-500"
          />
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-black text-white">Amenities</h3>

          <div className="mt-5 flex flex-wrap gap-3">
            {amenitiesList.map((amenity) => {
              const active = formData.amenities.includes(amenity);

              return (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => handleAmenity(amenity)}
                  className={`rounded-full border px-5 py-3 text-sm font-bold transition ${
                    active
                      ? "border-amber-400 bg-amber-400 text-slate-950"
                      : "border-emerald-900/40 bg-[#06110e] text-slate-300 hover:border-emerald-500"
                  }`}
                >
                  {amenity}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-amber-400 px-8 py-4 text-sm font-black text-slate-950 transition hover:bg-amber-300"
        >
          <Save className="h-5 w-5" />
          Update Room
        </button>
      </form>
    </div>
  );
}

function InputBox({
  icon: Icon,
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div>
      <label className="mb-3 block text-sm font-bold text-slate-300">
        {label}
      </label>

      <div className="flex items-center gap-3 rounded-2xl border border-emerald-900/40 bg-[#06110e] px-5 py-4">
        <Icon className="h-5 w-5 text-emerald-400" />

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
        />
      </div>
    </div>
  );
}