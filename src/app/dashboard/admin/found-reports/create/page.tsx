"use client";

import { useUser } from "@/hooks/useUser";
import CreateFoundReportAdmin from "@/components/admin/CreateFoundReportAdmin";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { AppSidebar } from "@/components/AppSidebar";
import { SiteHeader } from "@/components/SiteHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function CreateFoundReportPage() {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Memuat data user...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-600">
        Harus login!
      </div>
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
        user={{ name: user.name, email: user.email }}
      />

      <SidebarInset>
        {/* Header */}
        <SiteHeader />

        {/* MAIN CONTENT */}
        <div className="p-6 space-y-6">
          {/* Header Page */}
          <div className="flex items-center gap-3">
            <Link href="/dashboard/admin/found-reports">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </Link>

            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Buat Laporan Penemuan
              </h1>
              <p className="text-sm text-muted-foreground">
                Tambahkan barang temuan baru ke dalam sistem
              </p>
            </div>
          </div>

          {/* Form */}
          <CreateFoundReportAdmin />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
