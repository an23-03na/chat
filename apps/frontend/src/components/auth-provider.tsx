"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth/use-auth";

interface Props {
  children: React.ReactNode;
}

const publicRoutes = ["/login", "/signup"];

export const AuthProvider: React.FC<Props> = (props) => {
  const { children } = props;
  const { authUser, isAuthUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isPublicRoute = publicRoutes.includes(pathname);

  React.useEffect(() => {
    if (isAuthUser) return;
    if (!authUser && !isPublicRoute) {
      router.replace("/login");
    } else if (authUser && isPublicRoute) {
      router.replace("/");
    }
  }, [authUser, isAuthUser, isPublicRoute, router]);

  if (isAuthUser) {
    return <p>...loading</p>;
  }
  return <>{children}</>;
};