"use client";

import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function GoogleButton({
  text = "Continue with Google",
}) {
  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (error) {
      console.error(error);
      toast.error("Google login failed");
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center gap-3 rounded-2xl bg-white py-4 font-semibold text-black transition hover:bg-gray-100"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
        G
      </span>

      {text}
    </button>
  );
}