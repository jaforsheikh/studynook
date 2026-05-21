"use client";

import { useState } from "react";

import {
  Bell,
  Camera,
  LockKeyhole,
  Mail,
  Save,
  User,
} from "lucide-react";

import { toast } from "sonner";

export default function SettingsPage() {
  const [preview, setPreview] = useState(
    "https://i.pravatar.cc/300?img=12"
  );

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);

    toast.success("Profile photo selected.");
  };

  const handleSave = () => {
    toast.success("Profile updated successfully.");
  };

  return (
    <main className="min-h-screen bg-[#06110e] p-6 lg:p-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.3em] text-emerald-300">
            Account Settings
          </span>

          <h1 className="mt-6 text-5xl font-black tracking-tight text-white">
            Profile & Security
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">
            Manage your profile, profile image, email, password, and
            notification preferences.
          </p>
        </div>

        <div className="grid gap-8">
          {/* PROFILE CARD */}
          <div className="rounded-[32px] border border-emerald-900/30 bg-white/[0.03] p-8 backdrop-blur-xl">
            <h2 className="mb-8 text-3xl font-black text-white">
              Profile Information
            </h2>

            <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
              {/* IMAGE */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img
                    src={preview}
                    alt="Profile"
                    className="h-48 w-48 rounded-[32px] border-4 border-emerald-500/20 object-cover shadow-2xl shadow-emerald-500/10"
                  />

                  <label className="absolute bottom-3 right-3 flex h-14 w-14 cursor-pointer items-center justify-center rounded-2xl bg-amber-400 text-slate-950 shadow-lg transition hover:scale-105">
                    <Camera className="h-6 w-6" />

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImage}
                      className="hidden"
                    />
                  </label>
                </div>

                <p className="mt-5 text-center text-sm leading-7 text-slate-400">
                  Upload a premium professional profile photo.
                  <br />
                  JPG, PNG supported.
                </p>
              </div>

              {/* FORM */}
              <div className="grid gap-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  <div>
                    <label className="mb-3 block text-sm font-bold text-slate-300">
                      Full Name
                    </label>

                    <div className="flex items-center gap-3 rounded-2xl border border-emerald-900/40 bg-[#06110e] px-5 py-4">
                      <User className="h-5 w-5 text-emerald-400" />

                      <input
                        type="text"
                        placeholder="Your full name"
                        className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-3 block text-sm font-bold text-slate-300">
                      Email Address
                    </label>

                    <div className="flex items-center gap-3 rounded-2xl border border-emerald-900/40 bg-[#06110e] px-5 py-4">
                      <Mail className="h-5 w-5 text-emerald-400" />

                      <input
                        type="email"
                        placeholder="you@example.com"
                        className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  <div>
                    <label className="mb-3 block text-sm font-bold text-slate-300">
                      New Password
                    </label>

                    <div className="flex items-center gap-3 rounded-2xl border border-emerald-900/40 bg-[#06110e] px-5 py-4">
                      <LockKeyhole className="h-5 w-5 text-emerald-400" />

                      <input
                        type="password"
                        placeholder="Enter new password"
                        className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-3 block text-sm font-bold text-slate-300">
                      Confirm Password
                    </label>

                    <div className="flex items-center gap-3 rounded-2xl border border-emerald-900/40 bg-[#06110e] px-5 py-4">
                      <LockKeyhole className="h-5 w-5 text-emerald-400" />

                      <input
                        type="password"
                        placeholder="Confirm password"
                        className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSave}
                  className="mt-4 flex w-fit items-center gap-3 rounded-2xl bg-amber-400 px-8 py-4 text-sm font-black text-slate-950 transition hover:bg-amber-300"
                >
                  <Save className="h-5 w-5" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          {/* NOTIFICATIONS */}
          <div className="rounded-4xl border border-emerald-900/30 bg-white/3 p-8 backdrop-blur-xl">
            <div className="mb-8 flex items-center gap-3">
              <Bell className="h-7 w-7 text-emerald-400" />

              <h2 className="text-3xl font-black text-white">
                Notifications
              </h2>
            </div>

            <div className="space-y-5">
              {[
                "Booking confirmations",
                "Payment updates",
                "Room approvals",
                "Promotional emails",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-2xl border border-emerald-900/20 bg-[#06110e] px-6 py-5"
                >
                  <div>
                    <h3 className="font-bold text-white">{item}</h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Receive notifications about {item.toLowerCase()}.
                    </p>
                  </div>

                  <input type="checkbox" defaultChecked />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}