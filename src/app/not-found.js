import Link from "next/link";
import { ArrowLeft, Home, SearchX } from "lucide-react";

export default function NotFoundPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#06110e] px-4 py-24">
      
      <div className="absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-2xl text-center">
        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-4xl border border-emerald-900/40 bg-white/3 text-emerald-400 backdrop-blur-xl">
          <SearchX className="h-14 w-14" />
        </div>

        <h1 className="mt-10 text-7xl font-black tracking-tight text-white md:text-8xl"> 
          404
        </h1>

        <h2 className="mt-6 text-4xl font-black tracking-tight text-white">
          Page Not Found
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-400">
          The page you are looking for does not exist, may have been moved,
          or the URL might be incorrect.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-400 px-7 py-4 text-sm font-black text-slate-950 transition hover:bg-amber-300"
          >
            <Home className="h-5 w-5" />
            Back To Home
          </Link>

          <Link
            href="/rooms"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-900/40 bg-white/3 px-7 py-4 text-sm font-black text-white transition hover:border-emerald-600"
          >
            <ArrowLeft className="h-5 w-5" />
            Browse Rooms
          </Link>
        </div>

        <div className="mt-16 flex items-center justify-center gap-6 text-sm text-slate-500">
          <span>StudyNook</span>
          <span>•</span>
          <span>Premium Study Spaces</span>
        </div>
      </div>
    </main>
  );
}