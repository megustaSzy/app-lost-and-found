"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/useLogin";

interface LoginFormData {
  email: string;
  password: string;
}

export function LoginForm() {
  const router = useRouter();
  const { submitLogin, loading } = useLogin();
  const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await submitLogin(data);
      router.push(res.user.role === "Admin" ? "/dashboard/admin" : "/dashboard/user");
    } catch (err: any) {
      setError("password", { type: "server", message: err.message });
      alert(err.message);
    }
  };

  return (
    <Card className="border-neutral-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-neutral-900">Login</CardTitle>
        <CardDescription className="text-sm text-neutral-900">Masukkan email dan password Anda</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <FieldGroup className="space-y-2">
            <Field>
              <FieldLabel className="text-sm font-bold text-neutral-900">Email</FieldLabel>
              <Input
                type="email"
                placeholder="nama@email.com"
                className="h-10 border-neutral-200"
                {...register("email", { required: "Email wajib diisi" })}
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </Field>

            <Field>
              <FieldLabel className="text-sm font-bold text-neutral-900">Password</FieldLabel>
              <Input
                type="password"
                placeholder="********"
                className="h-10 border-neutral-200"
                {...register("password", { required: "Password wajib diisi" })}
              />
              {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
            </Field>

            <Field>
              <Button type="submit" disabled={loading} className="w-full h-10 bg-neutral-900 hover:bg-neutral-800 text-white font-bold">
                {loading ? "Loading..." : "Login"}
              </Button>
            </Field>
          </FieldGroup>

          <p className="text-center text-sm text-neutral-900 mt-4">
            Belum punya akun? <Link href="/signup" className="font-bold hover:underline">Sign up</Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
