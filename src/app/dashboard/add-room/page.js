"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { createRoom } from "@/services/roomService";
import {
  Building2,
  ImageIcon,
  Layers,
  MapPin,
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
  "Coffee",
  "Parking",
];

const roomImages = [
  "/assets/rooms/quiet-pod.jpg",
  "/assets/rooms/group-studio.jpg",
  "/assets/rooms/atrium-reading.jpg",
  "/assets/rooms/innovation-lab.jpg",
  "/assets/rooms/silent-carrel.jpg",
  "/assets/rooms/cedar-room.jpg",
  "/assets/rooms/skyline-suite.jpg",
  "/assets/rooms/green-leaf.jpg",
  "/assets/rooms/midnight-lounge.jpg",
  "/assets/rooms/brainstorm-studio.jpg",
];

export default function AddRoomPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [formData, setFormData] = useState({
    name: "",
    image: roomImages[0],
    location: "",
    floor: "",
    capacity: "",
    price: "",
    description: "",
    amenities: [],
    availableToday: true,
    rating: 4.8,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

    if (!session?.user) {
      toast.error("Please login first.");
      router.push("/login");
      return;
    }

    if (!formData.name || !formData.location || !formData.price) {
      toast.error("Please fill all required fields.");
      return;
    }

    const roomData = {
      ...formData,
      capacity: Number(formData.capacity) || 1,
      price: Number(formData.price) || 0,
      owner: {
        name: session.user.name,
        email: session.user.email,
      },
    };

    const data = await createRoom(roomData);

    if (data.success) {
      toast.success("Room added successfully.");
      router.push("/dashboard/my-listings");
    } else {
      toast.error(data.message || "Failed to add room.");
    }
  };

  return (
    <div>
      <span className="rounded-full border border-emerald-800/40 bg-emerald-900/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
        Add Study Room
      </span>

      <h1 className="mt-6 text-4xl font-black tracking-tight text-white">
        Create New Room Listing
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-10 rounded-4xl border border-emerald-900/30 bg-white/3 p-8"
      >
        <h2 className="text-2xl font-black text-white">Basic Information</h2>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <InputBox icon={Building2} label="Room Name *" name="name" value={formData.name} onChange={handleChange} placeholder="Premium Silent Room" />
          <InputBox icon={MapPin} label="Location *" name="location" value={formData.location} onChange={handleChange} placeholder="Dhanmondi, Dhaka" />
          <InputBox icon={Wallet} label="Hourly Price *" name="price" type="number" value={formData.price} onChange={handleChange} placeholder="120" />
          <InputBox icon={Users} label="Capacity" name="capacity" type="number" value={formData.capacity} onChange={handleChange} placeholder="4" />
          <InputBox icon={Layers} label="Floor" name="floor" value={formData.floor} onChange={handleChange} placeholder="3rd Floor" />

          <div>
            <label className="mb-3 block text-sm font-bold text-slate-300">
              Room Image *
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-emerald-900/40 bg-[#06110e] px-5 py-4">
              <ImageIcon className="h-5 w-5 text-emerald-400" />

              <select
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full bg-[#06110e] text-white outline-none"
              >
                {roomImages.map((image) => (
                  <option key={image} value={image}>
                    {image}
                  </option>
                ))}
              </select>
            </div>
          </div>
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
          className="mt-10 rounded-2xl bg-amber-400 px-8 py-4 text-sm font-black text-slate-950 transition hover:bg-amber-300"
        >
          Save Room Listing
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