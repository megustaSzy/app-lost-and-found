"use client";

import { useState } from "react";
import { login, LoginPayload } from "@/services/authService";
import { AxiosError } from "axios";

export function useLogin() {
  const [loading, setLoading] = useState(false);

  const submitLogin = async (payload: LoginPayload) => {
    setLoading(true);
    try {
      const res = await login(payload);
      return res;
    } catch (err) {
      let message = "Login gagal!";
      if (err instanceof AxiosError) {
        message = err.response?.data?.message || message;
      }
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { submitLogin, loading };
}
