"use client";

import useSWR, { SWRResponse } from "swr";
import { api } from "@/lib/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FileSearch, MapPin, Eye } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { LoadingOverlay } from "@/components/admin/LoadingOverlay";

interface FoundReportAdmin {
  id: number;
  namaBarang?: string;
  deskripsi?: string;
  lokasiTemu?: string;
  lostReport?: {
    id: number;
    namaBarang: string;
    deskripsi: string;
    lokasiHilang: string;
    imageUrl?: string;
    user?: {
      name: string;
      notelp?: string;
    };
  };
  statusFound: "PENDING" | "CLAIMED" | "APPROVED";
}

const fetcher = (url: string): Promise<FoundReportAdmin[]> =>
  api.get(url).then((res) => res.data.data as FoundReportAdmin[]);

export default function FoundReportAdminTable() {

  const { data, error, isValidating }: SWRResponse<FoundReportAdmin[], Error> =

    useSWR("/found/foundreports/admin", fetcher);

  const [selectedReport, setSelectedReport] = useState<FoundReportAdmin | null>(
    null
  );

  const isLoading = !data && !error;

  const getStatusBadge = (status?: string) => {
    const variants = {
      PENDING: { variant: "secondary" as const, label: "Pending" },
      CLAIMED: { variant: "default" as const, label: "Ditemukan" },
      APPROVED: { variant: "default" as const, label: "Disetujui" },
    };
    return (
      variants[status as keyof typeof variants] || {
        variant: "secondary",
        label: status || "Unknown",
      }
    );
  };

  const getNamaBarang = (report: FoundReportAdmin) =>
    report.lostReport?.namaBarang || report.namaBarang || "-";

  const getDeskripsi = (report: FoundReportAdmin) =>
    report.lostReport?.deskripsi || report.deskripsi || "-";

  const getLokasi = (report: FoundReportAdmin) =>
    report.lostReport?.lokasiHilang || report.lokasiTemu || "-";

  const getPelapor = (report: FoundReportAdmin) =>
    report.lostReport?.user?.name || "Admin";

  const getTelp = (report: FoundReportAdmin) =>
    report.lostReport?.user?.notelp || "";

  const getAvatarLetter = (report: FoundReportAdmin) =>
    report.lostReport?.user?.name?.charAt(0).toUpperCase() || "A";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Laporan Barang Ditemukan</CardTitle>
        <CardDescription>Tinjau laporan yang sudah ditemukan</CardDescription>
      </CardHeader>

      <CardContent className="relative">
        {(isLoading || isValidating) && (
          <LoadingOverlay
            label={isLoading ? "Memuat data..." : "Memperbarui data..."}
          />
        )}

        {error ? (
          <p className="text-red-600">Gagal memuat data laporan.</p>
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
                  <TableHead className="w-[60px]">No</TableHead>
                  <TableHead>Barang</TableHead>
                  <TableHead>Deskripsi</TableHead>
                  <TableHead>Lokasi</TableHead>
                  <TableHead>Pelapor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Detail</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((report, idx) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{idx + 1}</TableCell>
                    <TableCell>{getNamaBarang(report)}</TableCell>
                    <TableCell className="max-w-[200px] truncate text-sm text-muted-foreground">
                      {getDeskripsi(report)}
                    </TableCell>
                    <TableCell className="flex items-center gap-1 text-sm">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      {getLokasi(report)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{getAvatarLetter(report)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{getPelapor(report)}</p>
                          {getTelp(report) && (
                            <p className="text-xs text-muted-foreground">
                              📞 {getTelp(report)}
                            </p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadge(report.statusFound).variant}>
                        {getStatusBadge(report.statusFound).label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedReport(report)}
                      >
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
            <h3 className="text-lg font-semibold">Belum ada laporan</h3>
            <p className="text-sm text-muted-foreground">
              Laporan barang ditemukan akan muncul di sini
            </p>
          </div>
        )}
      </CardContent>

      {/* Modal detail report */}
      <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detail Laporan</DialogTitle>
          </DialogHeader>

          {selectedReport && (
            <div className="space-y-4">
              <p>
                <strong>Nama Barang:</strong> {getNamaBarang(selectedReport)}
              </p>
              <p>
                <strong>Deskripsi:</strong> {getDeskripsi(selectedReport)}
              </p>
              <p className="flex items-center gap-1">
                <MapPin className="h-3 w-3 text-muted-foreground" />
                {getLokasi(selectedReport)}
              </p>
              <p>
                <strong>Status:</strong> {selectedReport.statusFound}
              </p>
              <p>
                <strong>Pelapor:</strong> {getPelapor(selectedReport)}
              </p>
              {getTelp(selectedReport) && (
                <p>
                  <strong>No. Telp:</strong> {getTelp(selectedReport)}
                </p>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedReport(null)}>
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
