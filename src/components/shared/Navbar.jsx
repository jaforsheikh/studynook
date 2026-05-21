"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Building2,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  UserRound,
  X,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const navLinks = [
  { label: "Study Rooms", href: "/rooms" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "List Your Room", href: "/become-host" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();

  const isLoggedIn = Boolean(session?.user);

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      setOpen(false);
      toast.success("Logged out successfully.");
      window.location.href = "/login";
    } catch (error) {
      console.log(error);
      toast.error("Logout failed.");
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-900/30 bg-[#06110e]/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-xl font-black text-white shadow-lg shadow-emerald-500/25">
            S
          </div>

          <div>
            <h1 className="text-xl font-black tracking-tight text-white">
              StudyNook
            </h1>
            <p className="-mt-1 text-xs font-medium text-slate-500">
              Book study spaces
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-slate-300 transition hover:text-emerald-300"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 rounded-2xl border border-emerald-900/40 bg-white/[0.03] px-5 py-3 text-sm font-bold text-slate-300 transition hover:border-emerald-600 hover:text-white"
          >
            <Search className="h-4 w-4" />
            Search
          </Link>

          {!isPending && isLoggedIn ? (
            <>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-black text-white transition hover:bg-emerald-600"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-sm font-bold text-red-300 transition hover:bg-red-500/20"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          ) : (
            !isPending && (
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-2xl bg-amber-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-amber-300"
              >
                <UserRound className="h-4 w-4" />
                Login
              </Link>
            )
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="grid h-11 w-11 place-items-center rounded-2xl border border-emerald-900/40 bg-white/[0.03] text-white lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-emerald-900/30 bg-[#06110e] px-4 py-5 lg:hidden">
          <div className="space-y-3">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-300"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/rooms"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-300"
            >
              <Search className="h-4 w-4" />
              Search Rooms
            </Link>

            {!isPending && isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-300"
                >
                  <Building2 className="h-4 w-4" />
                  Dashboard
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm font-black text-red-300"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              !isPending && (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-amber-400 px-5 py-4 text-sm font-black text-slate-950"
                >
                  <UserRound className="h-4 w-4" />
                  Login
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
}