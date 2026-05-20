"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RequireAuth({ children }) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  /*
    TEMP AUTH CHECK
    Later this will come from Better Auth / JWT
  */

  useEffect(() => {
    const fakeUser = localStorage.getItem("studynook-user");

    if (!fakeUser) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-emerald-900 border-t-emerald-400" />

          <h2 className="mt-6 text-2xl font-black text-white">
            Checking Authentication...
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Verifying your StudyNook session.
          </p>
        </div>
      </div>
    );
  }

  return children;
}