"use client"

import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export interface User {
  id: number;
  name: string;
  email: string;
  notelp: string;
  role: "Admin" | "User";
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get<{ success: boolean; user: User }>("/users/profile");
        setUser(res.data.user);
      } catch {
        setUser(null); // token invalid atau expired
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return { user, loading };
}
