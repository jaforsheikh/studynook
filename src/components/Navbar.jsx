import Link from "next/link";
import { Menu, Search, UserRound } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/85 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
            <span className="text-lg font-black">S</span>
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight text-slate-950">
              StudyNook
            </h1>
            <p className="-mt-1 text-xs text-slate-500">Book study spaces</p>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/rooms" className="text-sm font-medium text-slate-600 hover:text-emerald-600">
            Study Rooms
          </Link>
          <Link href="/how-it-works" className="text-sm font-medium text-slate-600 hover:text-emerald-600">
            How It Works
          </Link>
          <Link href="/become-host" className="text-sm font-medium text-slate-600 hover:text-emerald-600">
            List Your Room
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/rooms"
            className="hidden rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 sm:flex"
          >
            <Search className="mr-2 h-4 w-4" />
            Search
          </Link>

          <Link
            href="/login"
            className="hidden rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 hover:bg-emerald-600 sm:flex"
          >
            <UserRound className="mr-2 h-4 w-4" />
            Login
          </Link>

          <button className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 md:hidden">
            <Menu className="h-5 w-5 text-slate-700" />
          </button>
        </div>
      </nav>
    </header>
  );
}