"use client";

import useSWR from "swr";
import { api } from "@/lib/api";
import { lostReportsFetcher } from "@/lib/fetchers/lostReportsFetcher";
import { LostReportsLoader } from "./LostReportsLoader";
import { LostReportsEmptyState } from "./LostReportsEmptyState";
import { LostReportsStatusBadge } from "./LostReportsStatusBadge";
import { LostReportsDetailDialog } from "./LostReportsDetailDialog";
import { LostReportsConfirmDialog } from "./LostReportsConfirmDialog";
import { LostReportAdmin } from "@/types/lost-report";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Check, X, Eye, Loader2, FileSearch, MapPin } from "lucide-react";
import { useState } from "react";

export default function LostReportsTable() {
  const { data, error, mutate, isValidating } = useSWR("/lost", lostReportsFetcher);

  const [loadingAction, setLoadingAction] = useState<number | null>(null);
  const [selectedReport, setSelectedReport] = useState<LostReportAdmin | null>(null);
  const [confirmAction, setConfirmAction] = useState<{
    id: number;
    status: "APPROVED" | "REJECTED";
  } | null>(null);

  const isLoading = !data && !error;

  async function handleStatus(id: number, status: "APPROVED" | "REJECTED") {
    setLoadingAction(id);
    try {
      await api.patch(`/lost/${id}/status`, { status });
      mutate();
    } finally {
      setLoadingAction(null);
      setConfirmAction(null);
    }
  }

  return (
    <>
      {(isLoading || isValidating) && (
        <LostReportsLoader
          label={isLoading ? "Memuat laporan..." : "Memperbarui laporan..."}
        />
      )}

      <Card>
        <CardHeader>
          <CardTitle>Daftar Laporan</CardTitle>
          <CardDescription>Tinjau laporan pengguna</CardDescription>
        </CardHeader>

        <CardContent>
          {error && <p className="text-red-500">Gagal memuat laporan.</p>}

          {isLoading && <p>Loading...</p>}

          {data?.length === 0 && <LostReportsEmptyState />}

          {data && data.length > 0 && (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Barang</TableHead>
                    <TableHead>Deskripsi</TableHead>
                    <TableHead>Lokasi</TableHead>
                    <TableHead>Pelapor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {data.map((r, i) => (
                    <TableRow key={r.id}>
                      <TableCell>{i + 1}</TableCell>

                      {/* Barang */}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {r.imageUrl ? (
                            <Avatar className="h-12 w-12 rounded-md">
                              <AvatarImage src={r.imageUrl} className="object-cover" />
                              <AvatarFallback>{r.namaBarang.charAt(0)}</AvatarFallback>
                            </Avatar>
                          ) : (
                            <FileSearch className="h-8 w-8 text-muted-foreground" />
                          )}
                          {r.namaBarang}
                        </div>
                      </TableCell>

                      {/* Deskripsi */}
                      <TableCell className="max-w-[200px] truncate text-sm text-muted-foreground">
                        {r.deskripsi}
                      </TableCell>

                      {/* Lokasi */}
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          {r.lokasiHilang}
                        </div>
                      </TableCell>

                      {/* Pelapor */}
                      <TableCell className="text-sm">
                        {r.user.name}
                        <br />
                        <span className="text-xs text-muted-foreground">
                          {r.user.email}
                        </span>
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <LostReportsStatusBadge status={r.status} />
                      </TableCell>

                      {/* Aksi */}
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          {r.status === "PENDING" && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  setConfirmAction({ id: r.id, status: "APPROVED" })
                                }
                                disabled={loadingAction === r.id}
                              >
                                {loadingAction === r.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Check className="h-4 w-4" />
                                )}
                              </Button>

                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  setConfirmAction({ id: r.id, status: "REJECTED" })
                                }
                                disabled={loadingAction === r.id}
                              >
                                {loadingAction === r.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <X className="h-4 w-4" />
                                )}
                              </Button>
                            </>
                          )}

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedReport(r)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <LostReportsDetailDialog
        report={selectedReport}
        onClose={() => setSelectedReport(null)}
      />

      <LostReportsConfirmDialog
        action={confirmAction}
        onCancel={() => setConfirmAction(null)}
        onConfirm={() =>
          confirmAction && handleStatus(confirmAction.id, confirmAction.status)
        }
      />
    </>
  );
}
