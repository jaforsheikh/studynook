"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import GoogleButton from "@/components/auth/GoogleButton";
import { authClient } from "@/lib/auth-client";

import {
  ArrowRight,
  CheckCircle2,
  LockKeyhole,
  Mail,
  User2,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordRules = useMemo(() => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
    };
  }, [password]);

  const isPasswordValid =
    passwordRules.length && passwordRules.uppercase && passwordRules.lowercase;

  const handleRegister = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName || !cleanEmail || !password) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (!isPasswordValid) {
      toast.error("Password does not meet the requirements.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await authClient.signUp.email({
        name: cleanName,
        email: cleanEmail,
        password,
        callbackURL: "/dashboard",
      });

      if (res?.error) {
        toast.error(res.error.message || "Registration failed.");
        setIsSubmitting(false);
        return;
      }

      toast.success("Account created successfully.");
      router.replace("/dashboard");
      router.refresh();
    } catch (error) {
      console.log("Registration error:", error);
      toast.error("Registration failed.");
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
            Create Account
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            Join StudyNook to book study rooms and manage your listings.
          </p>
        </div>

        <form onSubmit={handleRegister} className="mt-10 space-y-5">
          <InputBox
            icon={User2}
            label="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
          />

          <InputBox
            icon={Mail}
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />

          <InputBox
            icon={LockKeyhole}
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create password"
          />

          <div className="space-y-2 text-xs">
            <PasswordRule valid={passwordRules.length} text="At least 8 characters" />
            <PasswordRule valid={passwordRules.uppercase} text="At least one uppercase letter" />
            <PasswordRule valid={passwordRules.lowercase} text="At least one lowercase letter" />
          </div>

          <button
            type="submit"
            disabled={!isPasswordValid || isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-400 px-6 py-4 text-sm font-black text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
            <ArrowRight className="h-5 w-5" />
          </button>
        </form>

        <Divider />
        <GoogleButton text="Sign up with Google" />

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-400">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-emerald-300 hover:text-emerald-200">
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

function InputBox({ icon: Icon, label, type, value, onChange, placeholder }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-300">
        {label}
      </label>
      <div className="flex items-center gap-3 rounded-2xl border border-emerald-900/40 bg-[#06110e] px-4 py-4">
        <Icon className="h-5 w-5 text-emerald-400" />
        <input
          type={type}
          required
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
        />
      </div>
    </div>
  );
}

function PasswordRule({ valid, text }) {
  return (
    <div className={`flex items-center gap-2 ${valid ? "text-emerald-300" : "text-slate-500"}`}>
      {valid ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
      <span>{text}</span>
    </div>
  );
}

function Divider() {
  return (
    <div className="my-6 flex items-center gap-4">
      <div className="h-px flex-1 bg-emerald-900/40" />
      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
        Or
      </span>
      <div className="h-px flex-1 bg-emerald-900/40" />
    </div>
  );
}