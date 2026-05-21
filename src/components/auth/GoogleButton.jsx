"use client";

import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function GoogleButton({ text = "Continue with Google" }) {
  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (error) {
      console.log(error);
      toast.error("Google login failed.");
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-6 py-4 text-sm font-black text-slate-950 transition hover:bg-slate-100"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-950 text-xs font-black text-white">
        G
      </span>
      {text}
    </button>
  );
}