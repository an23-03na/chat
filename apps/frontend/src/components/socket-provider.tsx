// components/socket-provider.tsx
"use client";
import { useEffect, useRef } from "react";
import { useAuth } from "@/hooks/auth/use-auth";

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { authUser, socket, socketConnect } = useAuth();
  const connecting = useRef(false); // защита от гонки

  useEffect(() => {
    if (authUser && !socket && !connecting.current) {
      connecting.current = true;
      socketConnect(authUser);
    }
    if (!authUser) connecting.current = false;
  }, [authUser, socket, socketConnect]);

  return children;
}
