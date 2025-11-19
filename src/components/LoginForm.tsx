"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
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

  const { register, handleSubmit, formState: { errors }, setError } =
    useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await submitLogin(data);

      if (res.user.role === "Admin") {
        router.push("/dashboard/admin");
      } else {
        router.push("/dashboard/user");
      }
    } catch (err: any) {
      setError("password", { type: "server", message: err.message });
      alert(err.message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Masukkan email dan password Anda</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input type="email" {...register("email", { required: "Email wajib diisi" })} />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </Field>

            <Field>
              <FieldLabel>Password</FieldLabel>
              <Input type="password" {...register("password", { required: "Password wajib diisi" })} />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </Field>

            <Field>
              <Button type="submit" disabled={loading}>
                {loading ? "Loading..." : "Login"}
              </Button>
            </Field>
          </FieldGroup>

          <FieldDescription className="px-6 text-center">
            Belum punya akun? <Link href="/signup">Sign up</Link>
          </FieldDescription>
        </form>
      </CardContent>
    </Card>
  );
}
