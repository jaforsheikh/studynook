"use client";

import { FcGoogle } from "react-icons/fc";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://studynook-server-2.onrender.com";

export default function GoogleButton() {
  const handleGoogleLogin = async () => {
    window.location.href =
      `${API_URL}/api/auth/sign-in/google?callbackURL=` +
      encodeURIComponent("https://studynook-eight.vercel.app/dashboard");
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center gap-3 rounded-2xl bg-white py-4 font-semibold text-black transition hover:bg-gray-100"
    >
      <FcGoogle className="text-2xl" />
      Continue with Google
    </button>
  );
}