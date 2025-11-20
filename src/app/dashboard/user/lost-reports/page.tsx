"use client";

import LostReportTable from "@/components/User/LostReport/LostReportTable";
import { useUser } from "@/hooks/useUser";
import { withAuth } from "@/lib/withAuth";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SiteHeader } from "@/components/SiteHeader";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle } from "lucide-react";

function LostReportsPage() {
  const { user, loading } = useUser();

  // LOADING USER
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-3 rounded-lg bg-background p-6 shadow-lg">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Memuat data pengguna...</p>
        </div>
      </div>
    );
  }

  // IF NOT LOGIN
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Anda harus login untuk mengakses halaman ini!
          </AlertDescription>
        </Alert>
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
        user={{
          name: user.name,
          email: user.email,
        }}
      />

      <SidebarInset>
        {/* HEADER GLOBAL */}
        <SiteHeader />

        {/* MAIN CONTENT */}
        <div className="p-6 space-y-6">
          <div className="space-y-1">
  <h1 className="text-3xl font-bold tracking-tight">
    Laporan Hilang Saya
  </h1>
  <p className="text-muted-foreground">
    Kelola dan pantau laporan barang hilang Anda
  </p>
</div>


          <LostReportTable />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default withAuth(LostReportsPage);
