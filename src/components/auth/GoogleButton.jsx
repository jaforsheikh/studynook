"use client";

import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  "https://studynook-eight.vercel.app";

export default function GoogleButton({
  text = "Continue with Google",
}) {
  const handleGoogle = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",

        callbackURL: "https://studynook-eight.vercel.app/dashboard",

        fetchOptions: {
          credentials: "include",
        },
      });
    } catch (error) {
      console.log("Google login error:", error);

      toast.error(
        error?.message || "Google sign-in failed."
      );
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogle}
      className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl border border-emerald-900/40 bg-white px-6 text-sm font-black text-slate-900 transition duration-300 hover:bg-slate-100"
    >
      <FcGoogle className="h-5 w-5" />

      <span>{text}</span>
    </button>
  );
}