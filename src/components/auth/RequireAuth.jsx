"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RequireAuth({ children }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#06110e] text-white">
        <div className="text-center">
          <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-emerald-900 border-t-emerald-400" />

          <h2 className="mt-6 text-2xl font-black">
            Checking Authentication...
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Verifying your StudyNook session.
          </p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return children;
}