"use client";

import { toast } from "sonner";

export default function GoogleButton({ text = "Continue with Google" }) {
  const handleGoogleLogin = () => {
    toast.info("Google login will connect after Better Auth setup.");

    // Later Better Auth integration:
    // authClient.signIn.social({
    //   provider: "google",
    //   callbackURL: "/dashboard",
    // });
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="flex w-full items-center justify-center gap-3 rounded-2xl border border-emerald-900/40 bg-white px-6 py-4 text-sm font-black text-slate-950 transition hover:bg-slate-100"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-950 text-xs font-black text-white">
        G
      </span>

      {text}
    </button>
  );
}