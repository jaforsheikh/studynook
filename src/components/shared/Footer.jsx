import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-emerald-900/30 bg-[#06110e] py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-xl font-black text-white">
                S
              </div>

              <div>
                <h2 className="text-xl font-black text-white">StudyNook</h2>
                <p className="text-xs text-slate-500">Book study spaces</p>
              </div>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
              StudyNook helps students find and book quiet libraries, private
              rooms, and premium study spaces with real-time availability.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-white">
              Platform
            </h3>

            <div className="mt-5 space-y-3">
              <Link href="/rooms" className="block text-sm text-slate-400 hover:text-emerald-300">
                Study Rooms
              </Link>

              <Link href="/dashboard" className="block text-sm text-slate-400 hover:text-emerald-300">
                Dashboard
              </Link>

              <Link href="/become-host" className="block text-sm text-slate-400 hover:text-emerald-300">
                List Your Room
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-white">
              Account
            </h3>

            <div className="mt-5 space-y-3">
              <Link href="/login" className="block text-sm text-slate-400 hover:text-emerald-300">
                Login
              </Link>

              <Link href="/register" className="block text-sm text-slate-400 hover:text-emerald-300">
                Create Account
              </Link>

              <Link href="/dashboard/bookings" className="block text-sm text-slate-400 hover:text-emerald-300">
                My Bookings
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-emerald-900/30 pt-6 text-sm text-slate-500">
          © 2026 StudyNook. All rights reserved.
        </div>
      </div>
    </footer>
  );
}