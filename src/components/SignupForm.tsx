"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import * as yup from "yup";
import { User, Mail, Lock, Phone, ArrowRight, Loader2 } from "lucide-react";
import { SignupFormData } from "@/types/auth";
import { submitRegister } from "@/lib/api/auth";
import { ApiError } from "@/error/ApiError";

const schema = yup.object({
  name: yup.string().required("Nama harus diisi"),
  email: yup.string().email("Email tidak valid").required("Email harus diisi"),
  password: yup.string().min(6, "Password minimal 6 karakter").required("Password harus diisi"),
  notelp: yup.string().matches(/^\d+$/, "Nomor telepon harus angka").required("Nomor telepon harus diisi")
}).required();

export function SignupForm(props: React.ComponentProps<typeof Card>) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<SignupFormData>({ resolver: yupResolver(schema) });
  const onSubmit = async (data: SignupFormData) => {
    try { const res = await submitRegister(data); alert("Akun berhasil dibuat!"); reset(); console.log("Registered:", res.user); }
    catch (error: unknown) { if (error instanceof ApiError) alert(error.message); else alert("Terjadi kesalahan tidak diketahui"); }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-neutral-50">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-neutral-900 rounded-xl flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <circle cx="11" cy="11" r="6" stroke="white" strokeWidth="2" />
              <path d="M16 16L20 20" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <circle cx="18" cy="6" r="2.5" fill="white" />
            </svg>
          </div>
          <div>
            <span className="text-xl font-bold text-neutral-900">LnF</span>
            <p className="text-[10px] text-neutral-900 uppercase tracking-wider">Lost & Found</p>
          </div>
        </div>

        <Card className="border-neutral-200 shadow-sm" {...props}>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-neutral-900">Buat Akun Baru</CardTitle>
            <CardDescription className="text-neutral-900 text-sm">Masukkan data diri Anda untuk membuat akun</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
              <FieldGroup className="space-y-2">
                <Field>
                  <FieldLabel htmlFor="name" className="text-sm font-bold text-neutral-900">Nama Lengkap</FieldLabel>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-900" />
                    <Input id="name" placeholder="John Doe" className="pl-10 h-10 border-neutral-200" {...register("name")} />
                  </div>
                  {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                </Field>

                <Field>
                  <FieldLabel htmlFor="email" className="text-sm font-bold text-neutral-900">Email</FieldLabel>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-900" />
                    <Input id="email" type="email" placeholder="nama@email.com" className="pl-10 h-10 border-neutral-200" {...register("email")} />
                  </div>
                  {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                </Field>

                <Field>
                  <FieldLabel htmlFor="password" className="text-sm font-bold text-neutral-900">Password</FieldLabel>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-900" />
                    <Input id="password" type="password" placeholder="Minimal 6 karakter" className="pl-10 h-10 border-neutral-200" {...register("password")} />
                  </div>
                  {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
                </Field>

                <Field>
                  <FieldLabel htmlFor="notelp" className="text-sm font-bold text-neutral-900">Nomor Telepon</FieldLabel>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-900" />
                    <Input id="notelp" placeholder="081234567890" className="pl-10 h-10 border-neutral-200" {...register("notelp")} />
                  </div>
                  {errors.notelp && <p className="text-xs text-red-500">{errors.notelp.message}</p>}
                </Field>

                <Button type="submit" disabled={isSubmitting} className="w-full h-10 bg-neutral-900 hover:bg-neutral-800 text-white font-bold">
                  {isSubmitting ? <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" />Memproses...</span> : <span className="flex items-center gap-2">Buat Akun<ArrowRight className="h-4 w-4" /></span>}
                </Button>
              </FieldGroup>
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-neutral-200"></div></div>
              <div className="relative flex justify-center text-xs"><span className="bg-white px-3 text-neutral-900 font-bold">atau</span></div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" type="button" className="h-10 border-neutral-200 text-neutral-900 font-bold">
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>Google
              </Button>
              <Button variant="outline" type="button" className="h-10 border-neutral-200 text-neutral-900 font-bold">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>GitHub
              </Button>
            </div>

            <p className="text-center text-sm text-neutral-900 mt-4">
              Sudah punya akun? <Link href="/login" className="font-bold text-neutral-900 hover:underline">Masuk</Link>
            </p>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-neutral-900 mt-4">
          Dengan mendaftar, Anda menyetujui <Link href="/terms" className="underline font-bold hover:text-neutral-600">Syarat & Ketentuan</Link> dan <Link href="/privacy" className="underline font-bold hover:text-neutral-600">Kebijakan Privasi</Link>
        </p>
      </div>
    </div>
  );
}
