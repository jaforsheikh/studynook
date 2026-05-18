import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#06110e] border-t border-emerald-900/30 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-center sm:px-6 lg:px-8">
        <Link href="/" className="text-2xl font-black text-white">
          StudyNook
        </Link>

        <p className="text-sm text-slate-400">
          Book quiet study rooms, libraries, and premium learning spaces.
        </p>

        <p className="text-xs text-slate-500">
          © 2026 StudyNook. All rights reserved.
        </p>
      </div>
    </footer>
  );
}