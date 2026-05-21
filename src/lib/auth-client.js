import { createAuthClient } from "better-auth/react";

const API_URL =
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
  "https://studynook-server-2.onrender.com";

export const authClient = createAuthClient({
  baseURL: API_URL,
  fetchOptions: {
    credentials: "include",
  },
});

export const { signIn, signUp, signOut, useSession, getSession } = authClient;