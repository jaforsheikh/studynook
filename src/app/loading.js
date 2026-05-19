export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#06110e] px-4">
      <div className="text-center">
        <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-emerald-900 border-t-emerald-400" />

        <h2 className="mt-8 text-2xl font-black text-white">
          Loading StudyNook...
        </h2>

        <p className="mt-3 text-sm text-slate-400">
          Preparing your study room experience.
        </p>
      </div>
    </main>
  );
}