"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import * as yup from "yup";

import { SignupFormData } from "@/types/auth";
import { submitRegister } from "@/lib/api/auth";
import { ApiError } from "@/error/ApiError";

const schema = yup
  .object({
    name: yup.string().required("Nama harus diisi"),
    email: yup.string().email("Email tidak valid").required("Email harus diisi"),
    password: yup.string().min(6, "Password minimal 6 karakter").required("Password harus diisi"),
    notelp: yup.string().matches(/^\d+$/, "Nomor telepon harus angka").required("Nomor telepon harus diisi")
  })
  .required();

export function SignupForm(props: React.ComponentProps<typeof Card>) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<SignupFormData>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      const res = await submitRegister(data);
      alert("Akun berhasil dibuat!");
      reset();
      console.log("Registered:", res.user);
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        alert(error.message);
      } else {
        alert("Terjadi kesalahan tidak diketahui");
      }
    }
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Enter your details below to create your account</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input id="name" {...register("name")} />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" {...register("password")} />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </Field>

            <Field>
              <FieldLabel htmlFor="notelp">Nomor Telepon</FieldLabel>
              <Input id="notelp" {...register("notelp")} />
              {errors.notelp && <p className="text-red-500">{errors.notelp.message}</p>}
            </Field>

            <FieldGroup>
              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : "Create Account"}
                </Button>
              </Field>
            </FieldGroup>

            <FieldDescription className="px-6 text-center">
              Already have an account? <Link href="/login">Sign in</Link>
            </FieldDescription>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
