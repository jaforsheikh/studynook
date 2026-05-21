// frontend/src/lib/auth-client.js  (or .ts)
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // Point at the Render backend; better-auth will append /api/auth itself.
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL
        ?? "https://studynook-server-2.onrender.com",

  // CRITICAL: send/receive cookies across origins.
  fetchOptions: {
    credentials: "include",
  },
});

// Convenience re-exports (optional)
export const { signIn, signUp, signOut, useSession, getSession } = authClient;
