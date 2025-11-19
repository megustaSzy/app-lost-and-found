"use client";

import { useState } from "react";
import { useFoundReports } from "@/hooks/useFoundReports";
import { useUser } from "@/hooks/useUser";
import { withAuth } from "@/lib/withAuth";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { DashboardLayout } from "@/components/AppSidebar";
import { FileSearch, Loader2, AlertCircle } from "lucide-react";

import { FoundReportsTable } from "@/components/FoundReports/FoundReportsTable";
import { FoundReportsEmpty } from "@/components/FoundReports/FoundReportsEmpty";
import { FoundReportsDetailDialog } from "@/components/FoundReports/FoundReportsDetailDialog";

import { FoundReportUser } from "@/types/found";

function UserFoundReportPage() {
  const { user: currentUser, loading: userLoading } = useUser();
  const { data, error, isLoading } = useFoundReports();
  const [selectedReport, setSelectedReport] =
    useState<FoundReportUser | null>(null);

  // ===========================
  // LOADING USER
  // ===========================
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

  // ===========================
  // USER BELUM LOGIN
  // ===========================
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

  // ===========================
  // PAGE CONTENT
  // ===========================
  return (
    <DashboardLayout
      role={currentUser.role}
      user={{ name: currentUser.name, email: currentUser.email }}
    >
      <div className="space-y-6 p-6">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Laporan Barang Ditemukan</h1>
            <p className="text-muted-foreground">
              Daftar laporan barang yang sudah ditemukan
            </p>
          </div>

          <div className="flex items-center gap-2">
            <FileSearch className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {data?.length || 0} laporan
            </span>
          </div>
        </div>

        {/* TABLE */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Barang Ditemukan</CardTitle>
            <CardDescription>
              Lihat detail barang yang sudah dilaporkan
            </CardDescription>
          </CardHeader>

          <CardContent>
            {isLoading && (
              <div className="space-y-3">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            )}

            {error && (
              <p className="text-red-600">Gagal memuat data laporan.</p>
            )}

            {!isLoading && data?.length ? (
              <FoundReportsTable data={data} onSelect={setSelectedReport} />
            ) : (
              !isLoading && <FoundReportsEmpty />
            )}
          </CardContent>
        </Card>

        {/* DETAIL DIALOG */}
        <FoundReportsDetailDialog
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      </div>
    </DashboardLayout>
  );
}

export default withAuth(UserFoundReportPage);
