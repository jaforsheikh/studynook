"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import GoogleButton from "@/components/auth/GoogleButton";
import {
  ArrowRight,
  CheckCircle2,
  ImageIcon,
  LockKeyhole,
  Mail,
  User2,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

export default function RegisterPage() {
  const [password, setPassword] = useState("");

  const passwordRules = useMemo(() => {
    return {
      length: password.length >= 6,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
    };
  }, [password]);

  const isPasswordValid =
    passwordRules.length && passwordRules.uppercase && passwordRules.lowercase;

  const handleRegister = (e) => {
    e.preventDefault();

    if (!isPasswordValid) {
      toast.error("Password does not meet the requirements.");
      return;
    }

    toast.success("Validation passed. Backend auth will connect later.");
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
            Create Account
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            Join StudyNook to book study rooms and manage your listings.
          </p>
        </div>

        <form onSubmit={handleRegister} className="mt-10 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-300">
              Full Name
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-emerald-900/40 bg-[#06110e] px-4 py-4">
              <User2 className="h-5 w-5 text-emerald-400" />
              <input
                type="text"
                required
                placeholder="Your full name"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-300">
              Email Address
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-emerald-900/40 bg-[#06110e] px-4 py-4">
              <Mail className="h-5 w-5 text-emerald-400" />
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-300">
              Photo URL
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-emerald-900/40 bg-[#06110e] px-4 py-4">
              <ImageIcon className="h-5 w-5 text-emerald-400" />
              <input
                type="url"
                required
                placeholder="https://example.com/photo.jpg"
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
                placeholder="Create password"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              />
            </div>

            <div className="mt-3 space-y-2 text-xs">
              <PasswordRule
                valid={passwordRules.length}
                text="At least 6 characters"
              />
              <PasswordRule
                valid={passwordRules.uppercase}
                text="At least one uppercase letter"
              />
              <PasswordRule
                valid={passwordRules.lowercase}
                text="At least one lowercase letter"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!isPasswordValid}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-400 px-6 py-4 text-sm font-black text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
          >
            Create Account
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

        <GoogleButton text="Sign up with Google" />

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-emerald-300 hover:text-emerald-200"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

function PasswordRule({ valid, text }) {
  return (
    <div
      className={`flex items-center gap-2 ${
        valid ? "text-emerald-300" : "text-slate-500"
      }`}
    >
      {valid ? (
        <CheckCircle2 className="h-4 w-4" />
      ) : (
        <XCircle className="h-4 w-4" />
      )}

      <span>{text}</span>
    </div>
  );
}