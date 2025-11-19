"use client";

import { DashboardLayout } from "@/components/AppSidebar";
import { useUser } from "@/hooks/useUser";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// IMPORT FORM MU DI SINI
import LostReportForm from "@/components/User/LostReport/LostReportForm";;

export default function YourPage() {
  const { user: currentUser, loading: userLoading } = useUser();

  if (userLoading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading user...
      </div>
    );

  if (!currentUser)
    return (
      <div className="flex min-h-screen items-center justify-center text-red-600">
        Harus login!
      </div>
    );

  return (
    <DashboardLayout
      role={currentUser.role}
      user={{
        name: currentUser.name,
        email: currentUser.email,
      }}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard/user">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Buat Laporan Hilang
            </h1>
            <p className="text-sm text-muted-foreground">
              Deskripsi singkat halaman kamu
            </p>
          </div>
        </div>

        {/* Form */}
        <LostReportForm />
      </div>
    </DashboardLayout>
  );
}
