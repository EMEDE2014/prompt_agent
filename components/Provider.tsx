"use client";
import { SessionProvider } from "next-auth/react";

const Provider = ({ children, session }: any) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Provider;
