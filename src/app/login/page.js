"use client";

import Link from "next/link";
import { useState } from "react";

import GoogleButton from "@/components/auth/GoogleButton";
import { authClient } from "@/lib/auth-client";

import { ArrowRight, LockKeyhole, Mail } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      toast.error("Please enter email and password.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await authClient.signIn.email({
        email: cleanEmail,
        password,
        callbackURL: "/dashboard",
      });

      if (res?.error) {
        toast.error(res.error.message || "Invalid email or password.");
        setIsSubmitting(false);
        return;
      }

      toast.success("Login successful.");
      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);
      toast.error("Invalid email or password.");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#06110e] px-4 py-20">
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative w-full max-w-md overflow-hidden rounded-[36px] border border-emerald-900/30 bg-white/[0.04] p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-500 text-2xl font-black text-white shadow-lg shadow-emerald-500/30">
            S
          </div>
        </div>

        <div className="mt-8 text-center">
          <h1 className="text-4xl font-black tracking-tight text-white">
            Welcome Back
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            Login to manage bookings, explore study spaces, and access your
            dashboard.
          </p>
        </div>

        <form onSubmit={handleLogin} className="mt-10 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-300">
              Email Address
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-emerald-900/40 bg-[#06110e] px-4 py-4">
              <Mail className="h-5 w-5 text-emerald-400" />

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-300">
              Password
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-emerald-900/40 bg-[#06110e] px-4 py-4">
              <LockKeyhole className="h-5 w-5 text-emerald-400" />

              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-400 px-6 py-4 text-sm font-black text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Logging in..." : "Login to StudyNook"}
            <ArrowRight className="h-5 w-5" />
          </button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-emerald-900/40" />

          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Or
          </span>

          <div className="h-px flex-1 bg-emerald-900/40" />
        </div>

        <GoogleButton text="Continue with Google" />

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-bold text-emerald-300 hover:text-emerald-200"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}