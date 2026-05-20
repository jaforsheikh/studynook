export default function SectionHeading({
  badge,
  title,
  description,
  center = false,
}) {
  return (
    <div className={center ? "text-center" : ""}>
      {badge && (
        <span className="rounded-full border border-emerald-800/40 bg-emerald-900/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
          {badge}
        </span>
      )}

      <h2 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl">
        {title}
      </h2>

      {description && (
        <p
          className={`mt-5 text-lg leading-8 text-slate-400 ${
            center ? "mx-auto max-w-3xl" : "max-w-3xl"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}