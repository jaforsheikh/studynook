import { Bell, LockKeyhole, Mail, User2 } from "lucide-react";

export default function SettingsPage() {
  return (
    <div>
      <div>
        <span className="rounded-full border border-emerald-800/40 bg-emerald-900/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
          Account Settings
        </span>

        <h1 className="mt-6 text-4xl font-black tracking-tight text-white">
          Profile & Security
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">
          Manage your profile, email, password, and notification preferences.
        </p>
      </div>

      <form className="mt-12 space-y-8">
        <div className="rounded-[32px] border border-emerald-900/30 bg-white/[0.03] p-8">
          <h2 className="text-2xl font-black text-white">Profile Info</h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="flex items-center gap-3 rounded-2xl border border-emerald-900/40 bg-[#06110e] px-5 py-4">
              <User2 className="h-5 w-5 text-emerald-400" />
              <input
                placeholder="Full name"
                className="w-full bg-transparent text-sm text-white outline-none"
              />
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-emerald-900/40 bg-[#06110e] px-5 py-4">
              <Mail className="h-5 w-5 text-emerald-400" />
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-transparent text-sm text-white outline-none"
              />
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-emerald-900/30 bg-white/[0.03] p-8">
          <h2 className="text-2xl font-black text-white">Security</h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="flex items-center gap-3 rounded-2xl border border-emerald-900/40 bg-[#06110e] px-5 py-4">
              <LockKeyhole className="h-5 w-5 text-emerald-400" />
              <input
                type="password"
                placeholder="New password"
                className="w-full bg-transparent text-sm text-white outline-none"
              />
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-emerald-900/40 bg-[#06110e] px-5 py-4">
              <LockKeyhole className="h-5 w-5 text-emerald-400" />
              <input
                type="password"
                placeholder="Confirm password"
                className="w-full bg-transparent text-sm text-white outline-none"
              />
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-emerald-900/30 bg-white/[0.03] p-8">
          <div className="flex items-center gap-3">
            <Bell className="h-6 w-6 text-emerald-400" />
            <h2 className="text-2xl font-black text-white">Notifications</h2>
          </div>

          <div className="mt-6 space-y-4">
            {["Booking confirmation", "Payment updates", "Room approval", "Promotional emails"].map(
              (item) => (
                <label
                  key={item}
                  className="flex items-center justify-between rounded-2xl border border-emerald-900/40 bg-[#06110e] px-5 py-4 text-sm font-semibold text-slate-300"
                >
                  {item}
                  <input type="checkbox" defaultChecked />
                </label>
              )
            )}
          </div>
        </div>

        <button className="rounded-2xl bg-amber-400 px-8 py-4 text-sm font-black text-slate-950 hover:bg-amber-300">
          Save Changes
        </button>
      </form>
    </div>
  );
}