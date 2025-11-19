"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MapPin, Eye } from "lucide-react";

import { FoundReportUser } from "@/types/found";

export function FoundReportsTable({
  data,
  onSelect,
}: {
  data: FoundReportUser[];
  onSelect: (report: FoundReportUser) => void;
}) {

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Barang</TableHead>
          <TableHead>Deskripsi</TableHead>
          <TableHead>Lokasi</TableHead>
          <TableHead className="text-right">Detail</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((report, idx) => (
          <TableRow key={report.id}>
            <TableCell>{idx + 1}</TableCell>
            <TableCell>{report.namaBarang}</TableCell>

            <TableCell className="truncate max-w-[200px]">
              {report.deskripsi || "-"}
            </TableCell>

            <TableCell className="flex items-center gap-1 text-sm">
              <MapPin className="h-3 w-3 text-muted-foreground" />
              {report.lokasiTemu}
            </TableCell>

            <TableCell className="text-right">
              <Button size="sm" variant="outline" onClick={() => onSelect(report)}>
                <Eye className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
