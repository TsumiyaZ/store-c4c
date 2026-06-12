"use client";

import { SessionProvider, useSession, signOut } from "next-auth/react";

export const NextAuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export { useSession, signOut };
