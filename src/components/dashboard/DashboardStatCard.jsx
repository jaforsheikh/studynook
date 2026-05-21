export default function DashboardStatCard({
  title,
  value,
  icon: Icon,
  color = "bg-emerald-500/10 text-emerald-400",
}) {
  return (
    <div className="rounded-[28px] border border-emerald-900/30 bg-white/3 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-emerald-700/40">
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${color}`}
      >
        <Icon className="h-7 w-7" />
      </div>

      <h3 className="mt-6 text-4xl font-black text-white">{value}</h3>

      <p className="mt-2 text-sm font-medium text-slate-400">{title}</p>
    </div>
  );
}