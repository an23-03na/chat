"use client";
import React from "react";
import { useAuth } from "@/hooks/auth/use-auth";

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = (props) => {
  const { children } = props;
  const { isAuthUser } = useAuth();

  if (isAuthUser) {
    return <p>...loading</p>;
  }
  return <>{children}</>;
};
