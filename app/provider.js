"use client";
import { AddProvider } from "@/redux/provider";
import { SessionProvider } from "next-auth/react";

export default function AuthProvider({ children }) {
  return (
    <SessionProvider>
      <AddProvider>{children}</AddProvider>
    </SessionProvider>
  );
}
