import Link from "next/link";
import {
  ArrowRight,
  LockKeyhole,
  Mail,
  User2,
} from "lucide-react";

export default function RegisterPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#06110e] px-4 py-20">
      
      {/* BG EFFECTS */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl"></div>

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"></div>

      {/* CARD */}
      <div className="relative w-full max-w-md overflow-hidden rounded-[36px] border border-emerald-900/30 bg-white/[0.04] p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
        
        {/* LOGO */}
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-500 text-2xl font-black text-white shadow-lg shadow-emerald-500/30">
            S
          </div>
        </div>

        {/* HEADING */}
        <div className="mt-8 text-center">
          <h1 className="text-4xl font-black tracking-tight text-white">
            Create Account
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            Join StudyNook to book study rooms, manage bookings,
            and explore premium learning spaces.
          </p>
        </div>

        {/* FORM */}
        <form className="mt-10 space-y-5">
          
          {/* NAME */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-300">
              Full Name
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-emerald-900/40 bg-[#06110e] px-4 py-4">
              <User2 className="h-5 w-5 text-emerald-400" />

              <input
                type="text"
                placeholder="Your full name"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-300">
              Email Address
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-emerald-900/40 bg-[#06110e] px-4 py-4">
              <Mail className="h-5 w-5 text-emerald-400" />

              <input
                type="email"
                placeholder="you@example.com"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-300">
              Password
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-emerald-900/40 bg-[#06110e] px-4 py-4">
              <LockKeyhole className="h-5 w-5 text-emerald-400" />

              <input
                type="password"
                placeholder="Create password"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-300">
              Confirm Password
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-emerald-900/40 bg-[#06110e] px-4 py-4">
              <LockKeyhole className="h-5 w-5 text-emerald-400" />

              <input
                type="password"
                placeholder="Confirm password"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* TERMS */}
          <label className="flex items-start gap-3 text-sm leading-6 text-slate-400">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-emerald-700 bg-transparent"
            />

            I agree to the Terms & Conditions and Privacy Policy.
          </label>

          {/* BUTTON */}
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-400 px-6 py-4 text-sm font-black text-slate-950 transition hover:bg-amber-300"
          >
            Create Account
            <ArrowRight className="h-5 w-5" />
          </button>
        </form>
{/* google register      */}
<a
  href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`}
  className="mt-4 flex w-full items-center justify-center gap-3 rounded-2xl border border-emerald-900/40 bg-white px-6 py-4 text-sm font-black text-slate-950 transition hover:bg-slate-100"
>
  <span className="text-lg">G</span>
  Continue with Google
</a>
        {/* FOOTER */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-400">
            Already have an account?{" "}

            <Link
              href="/login"
              className="font-bold text-emerald-300 hover:text-emerald-200"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}