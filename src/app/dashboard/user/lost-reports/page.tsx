"use client";

import LostReportTable from "@/components/User/LostReport/LostReportTable";
import { DashboardLayout } from "@/components/AppSidebar";
import { useUser } from "@/hooks/useUser";
import { withAuth } from "@/lib/withAuth";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle } from "lucide-react";

function LostReportsPage() {
  const { user: currentUser, loading: userLoading } = useUser();

  if (userLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-3 rounded-lg bg-background p-6 shadow-lg">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Memuat data pengguna...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
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
    <DashboardLayout
      role={currentUser.role}
      user={{ name: currentUser.name, email: currentUser.email }}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Laporan Hilang Saya</h1>
          <p className="text-muted-foreground">
            Kelola dan pantau laporan barang hilang Anda
          </p>
        </div>
        <LostReportTable />
      </div>
    </DashboardLayout>
  );
}

export default withAuth(LostReportsPage);