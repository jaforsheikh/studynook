import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

// New X (Twitter) logo as inline SVG since lucide-react still uses the old bird icon.
function XIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com", Icon: Facebook },
  { label: "X", href: "https://x.com", Icon: XIcon },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: Linkedin },
  { label: "Instagram", href: "https://instagram.com", Icon: Instagram },
];

export default function Footer() {
  return (
    <footer className="border-t border-emerald-900/30 bg-[#06110e] py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
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

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-emerald-900/40 bg-white/[0.03] text-slate-400 transition hover:border-emerald-600 hover:text-emerald-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
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

          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-white">
              Contact
            </h3>

            <div className="mt-5 space-y-3">
              <a
                href="mailto:support@studynook.com"
                className="flex items-start gap-3 text-sm text-slate-400 hover:text-emerald-300"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <span>support@studynook.com</span>
              </a>

              <a
                href="tel:+8801700000000"
                className="flex items-start gap-3 text-sm text-slate-400 hover:text-emerald-300"
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <span>+880 1700-000000</span>
              </a>

              <div className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <span>Dhanmondi, Dhaka, Bangladesh</span>
              </div>
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
