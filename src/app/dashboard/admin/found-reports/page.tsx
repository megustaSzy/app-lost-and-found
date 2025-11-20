"use client";

import { useUser } from "@/hooks/useUser";
import FoundReportAdminTable from "@/components/admin/FoundReportAdminTable";

import { AppSidebar } from "@/components/AppSidebar";
import { SiteHeader } from "@/components/SiteHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function FoundReportsAdminPage() {
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
      <AppSidebar
        role={user.role}
        user={{
          name: user.name,
          email: user.email,
        }}
      />

      <SidebarInset>
        <SiteHeader />

        {/* MAIN CONTENT */}
        <div className="p-6 space-y-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">
              Laporan Ditemukan
            </h1>
            <p className="text-muted-foreground">
              Kelola dan tinjau semua laporan barang yang ditemukan
            </p>
          </div>

          <FoundReportAdminTable />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
