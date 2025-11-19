import { api } from "@/lib/api";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: number;
    email: string;
    role: string;
  };
  accessToken: string;
  refreshToken: string;
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const res = await api.post("/auth/login", payload);
  return res.data;
}
