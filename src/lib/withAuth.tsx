"use client";

import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function withAuth<P extends object = object>(Component: React.ComponentType<P>) {
  return function ProtectedComponent(props: P) {
    const { user, loading } = useUser();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push("/login");
      }
    }, [loading, user, router]);

    if (loading || !user) {
      return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
    }

    return <Component {...props} />;
  };
}

