"use client";

import { useUser } from "@/hooks/useUser";
import LostReportForm from "@/components/User/LostReport/LostReportForm";

import { AppSidebar } from "@/components/AppSidebar";
import { SiteHeader } from "@/components/SiteHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LostReportCreatePage() {
  const { user, loading } = useUser();

  if (loading) {
    return <p className="text-center mt-20">Memuat data user...</p>;
  }

  if (!user) {
    return (
      <p className="text-center mt-20 text-red-500">
        Tidak ada akses. Silakan login kembali.
      </p>
    );
  }

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      {/* Sidebar */}
      <AppSidebar
        role={user.role}
        user={{
          name: user.name,
          email: user.email,
        }}
      />

      <SidebarInset>
        {/* Header Global */}
        <SiteHeader />

        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* LOCAL HEADER */}
          <div className="flex items-center gap-3">
            <div className="space-y-1">
  <h1 className="text-3xl font-bold tracking-tight">
    Buat Laporan Hilang
  </h1>
  <p className="text-sm text-muted-foreground">
    Deskripsi singkat halaman kamu
  </p>
</div>

          </div>

          <LostReportForm />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
