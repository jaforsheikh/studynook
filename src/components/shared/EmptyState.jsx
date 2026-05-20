import Link from "next/link";
import { SearchX } from "lucide-react";

export default function EmptyState({
  title = "No data found",
  description = "There is nothing to show right now.",
  actionText,
  actionHref,
  icon: Icon = SearchX,
}) {
  return (
    <div className="rounded-[32px] border border-emerald-900/30 bg-white/[0.03] p-12 text-center backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-500/10 text-emerald-400">
        <Icon className="h-10 w-10" />
      </div>

      <h2 className="mt-6 text-3xl font-black text-white">{title}</h2>

      <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-400">
        {description}
      </p>

      {actionText && actionHref && (
        <Link
          href={actionHref}
          className="mt-6 inline-flex rounded-2xl bg-amber-400 px-6 py-4 text-sm font-black text-slate-950 transition hover:bg-amber-300"
        >
          {actionText}
        </Link>
      )}
    </div>
  );
}