"use client";

import useSWR, { SWRResponse } from "swr";
import { api } from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Trash2,
  Eye,
  Loader2,
  AlertCircle,
  FileSearch,
  MapPin,
  PlusCircle,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export interface LostReport {
  id: number;
  namaBarang: string;
  deskripsi: string;
  lokasiHilang: string;
  imageUrl?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt?: string;
}

const fetcher = (url: string): Promise<LostReport[]> =>
  api.get(url).then((res) => res.data.data as LostReport[]);

export default function LostReportTable() {
  const {
    data,
    error,
    mutate,
    isValidating,
  }: SWRResponse<LostReport[], Error> = useSWR("/lost/me", fetcher);

  const [loadingDelete, setLoadingDelete] = useState<number | null>(null);
  const [selectedReport, setSelectedReport] = useState<LostReport | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const isLoading = !data && !error;

  const handleDelete = async (id: number) => {
    setLoadingDelete(id);
    setDeleteConfirm(null);
    try {
      await api.delete(`/lost/${id}`);
      mutate(); // refresh data
    } catch {
      alert("Gagal menghapus laporan");
    } finally {
      setLoadingDelete(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      PENDING: { variant: "secondary" as const, label: "Menunggu", color: "text-yellow-600" },
      APPROVED: { variant: "default" as const, label: "Disetujui", color: "text-green-600" },
      REJECTED: { variant: "destructive" as const, label: "Ditolak", color: "text-red-600" },
    };
    return variants[status as keyof typeof variants] || variants.PENDING;
  };

  return (
    <>
      {/* Loading Overlay */}
      {(isLoading || isValidating) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3 rounded-lg bg-background p-6 shadow-lg">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">
              {isLoading ? "Memuat data..." : "Memperbarui data..."}
            </p>
          </div>
        </div>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Laporan Barang Hilang Saya</CardTitle>
              <CardDescription>
                Daftar semua laporan barang hilang yang telah Anda buat
              </CardDescription>
            </div>
            <Button asChild className="gap-2">
              <Link href="/dashboard/user/lost-reports/create">
                <PlusCircle className="h-4 w-4" />
                Buat Laporan Baru
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Gagal memuat data laporan. Silakan coba lagi.
              </AlertDescription>
            </Alert>
          ) : isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
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
                    <TableHead>Lokasi Hilang</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((report, idx) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{idx + 1}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {report.imageUrl ? (
                            <Avatar className="h-12 w-12 rounded-md">
                              <AvatarImage
                                src={report.imageUrl}
                                alt={report.namaBarang}
                                className="object-cover"
                              />
                              <AvatarFallback className="rounded-md">
                                {report.namaBarang.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted">
                              <FileSearch className="h-6 w-6 text-muted-foreground" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium">{report.namaBarang}</p>
                            {report.createdAt && (
                              <p className="text-xs text-muted-foreground">
                                {new Date(report.createdAt).toLocaleDateString('id-ID')}
                              </p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[200px]">
                        <p className="truncate text-sm text-muted-foreground">
                          {report.deskripsi}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          {report.lokasiHilang}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadge(report.status).variant}>
                          {getStatusBadge(report.status).label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 transition-all duration-200 hover:scale-110"
                            onClick={() => setSelectedReport(report)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600 hover:border-red-600 transition-all duration-200 hover:scale-110"
                            onClick={() => setDeleteConfirm(report.id)}
                            disabled={loadingDelete === report.id}
                          >
                            {loadingDelete === report.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
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
              <p className="text-sm text-muted-foreground mb-4">
                Anda belum membuat laporan barang hilang
              </p>
              <Button asChild className="gap-2">
                <Link href="/dashboard/user/lost-reports/create">
                  <PlusCircle className="h-4 w-4" />
                  Buat Laporan Pertama
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog
        open={!!selectedReport}
        onOpenChange={() => setSelectedReport(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detail Laporan Barang Hilang</DialogTitle>
            <DialogDescription>
              Informasi lengkap tentang laporan barang hilang Anda
            </DialogDescription>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-6">
              {selectedReport.imageUrl && (
                <div className="flex justify-center">
                  <img
                    src={selectedReport.imageUrl}
                    alt={selectedReport.namaBarang}
                    className="max-h-64 rounded-lg border object-cover"
                  />
                </div>
              )}
              <div className="grid gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Nama Barang
                  </label>
                  <p className="text-lg font-semibold">
                    {selectedReport.namaBarang}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Deskripsi
                  </label>
                  <p className="text-sm">{selectedReport.deskripsi}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Lokasi Hilang
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{selectedReport.lokasiHilang}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Status
                  </label>
                  <div className="mt-1">
                    <Badge
                      variant={getStatusBadge(selectedReport.status).variant}
                    >
                      {getStatusBadge(selectedReport.status).label}
                    </Badge>
                  </div>
                </div>
                {selectedReport.createdAt && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Tanggal Dibuat
                    </label>
                    <p className="text-sm">
                      {new Date(selectedReport.createdAt).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedReport(null)}>
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteConfirm}
        onOpenChange={() => setDeleteConfirm(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Laporan?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Laporan akan dihapus
              secara permanen dari sistem.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
              className="bg-red-600 hover:bg-red-700"
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}