"use client";

import useSWR from "swr";
import { useUser } from "@/hooks/useUser";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SiteHeader } from "@/components/SiteHeader";

import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MapPin, FileSearch, Eye } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FullscreenLoader } from "@/components/loaders/FullscreenLoader";

import { adminFoundFetcher } from "@/lib/fetchers/adminFoundFetcher";
import { AdminFoundReport } from "@/types/foundReports";

export default function AdminFoundReportsPage() {
  const { user, loading: userLoading } = useUser();

  const { data, error, isValidating } = useSWR(
    "/found/foundreports/admin",
    adminFoundFetcher
  );

  const [selectedReport, setSelectedReport] = useState<AdminFoundReport | null>(null);

  const isLoading = userLoading || (!data && !error);

  if (!user && !userLoading) {
    return <p className="text-red-600 p-4">Silahkan login untuk mengakses halaman ini.</p>;
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      PENDING: { variant: "secondary" as const, label: "Pending" },
      CLAIMED: { variant: "default" as const, label: "Ditemukan" },
      REJECTED: { variant: "destructive" as const, label: "Ditolak" },
    };
    return variants[status as keyof typeof variants] || { variant: "secondary", label: status || "Unknown" };
  };

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <AppSidebar
        role={user?.role || "User"}
        user={{
          name: user?.name || "",
          email: user?.email || "",
        }}
      />

      <SidebarInset>
        <SiteHeader />

        {isLoading && <FullscreenLoader validating={isValidating} />}

        <div className="p-6 space-y-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Laporan Penemuan Admin</h1>
            <p className="text-muted-foreground">
              Barang yang dilaporkan oleh admin
            </p>
          </div>

          <Card>
            <div className="relative">
              {(isLoading || isValidating) && <FullscreenLoader validating={isValidating} />}

              {error ? (
                <p className="text-red-600">Gagal memuat laporan.</p>
              ) : isLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-20 w-full" />
                </div>
              ) : data && data.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>No</TableHead>
                        <TableHead>Barang</TableHead>
                        <TableHead>Deskripsi</TableHead>
                        <TableHead>Lokasi</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Detail</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.map((report, idx) => (
                        <TableRow key={report.id}>
                          <TableCell>{idx + 1}</TableCell>
                          <TableCell>{report.namaBarang}</TableCell>
                          <TableCell className="max-w-[200px] truncate text-sm text-muted-foreground">{report.deskripsi}</TableCell>
                          <TableCell className="flex items-center gap-1 text-sm">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            {report.lokasiTemu}
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStatusBadge(report.statusFound).variant}>
                              {getStatusBadge(report.statusFound).label}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button size="sm" variant="outline" onClick={() => setSelectedReport(report)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FileSearch className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold">Belum ada laporan penemuan</h3>
                  <p className="text-sm text-muted-foreground">Laporan dari admin akan muncul di sini</p>
                </div>
              )}
            </div>
          </Card>

          {/* Modal detail */}
          <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Detail Laporan</DialogTitle>
              </DialogHeader>
              {selectedReport && (
                <div className="space-y-4">
                  <p><strong>Nama Barang:</strong> {selectedReport.namaBarang}</p>
                  <p><strong>Deskripsi:</strong> {selectedReport.deskripsi}</p>
                  <p><strong>Lokasi:</strong> {selectedReport.lokasiTemu}</p>
                  <p><strong>Status:</strong> {selectedReport.statusFound}</p>
                  <p><strong>Pelapor:</strong> Admin</p>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedReport(null)}>Tutup</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
