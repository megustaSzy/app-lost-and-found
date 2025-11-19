"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

import { FoundReportUser } from "@/types/found";

export function FoundReportsDetailDialog({
  report,
  onClose,
}: {
  report: FoundReportUser | null;
  onClose: () => void;
}) {

  return (
    <Dialog open={!!report} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detail Barang</DialogTitle>
        </DialogHeader>

        {report && (
          <div className="space-y-4">
            <p><strong>Nama Barang:</strong> {report.namaBarang}</p>
            <p><strong>Deskripsi:</strong> {report.deskripsi || "-"}</p>

            <p className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-muted-foreground" />
              {report.lokasiTemu}
            </p>

            {report.imageUrl && (
              <img src={report.imageUrl} className="w-full rounded-lg" />
            )}
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Tutup</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
