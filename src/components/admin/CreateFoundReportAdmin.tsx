"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Upload, X, AlertCircle } from "lucide-react";
import { useFoundReportForm } from "@/hooks/useFoundReportForm";

export default function CreateFoundReportAdmin() {
  const {
    data,
    updateField,
    previewUrl,
    handleImage,
    removeImage,
    submit,
    loading,
    errorMsg,
  } = useFoundReportForm({ isAdmin: true, redirectUrl: "/dashboard/admin/found-reports" });

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Informasi Barang Temuan</CardTitle>
        <CardDescription>
          Lengkapi form di bawah untuk mencatat barang yang ditemukan
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {errorMsg && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errorMsg}</AlertDescription>
          </Alert>
        )}

        {/* Nama Barang */}
        <div className="space-y-2">
          <Label>Nama Barang *</Label>
          <Input
            value={data.namaBarang}
            onChange={(e) => updateField("namaBarang", e.target.value)}
            disabled={loading}
            placeholder="Contoh: Dompet coklat"
          />
        </div>

        {/* Lokasi Ditemukan */}
        <div className="space-y-2">
          <Label>Lokasi Ditemukan *</Label>
          <Input
            value={data.lokasiTemu}
            onChange={(e) => updateField("lokasiTemu", e.target.value)}
            disabled={loading}
            placeholder="Contoh: Musholla lantai 2"
          />
        </div>

        {/* Deskripsi */}
        <div className="space-y-2">
          <Label>Deskripsi</Label>
          <Textarea
            value={data.deskripsi}
            onChange={(e) => updateField("deskripsi", e.target.value)}
            disabled={loading}
            rows={4}
            className="resize-none"
            placeholder="Tambahkan detail barang..."
          />
        </div>

        {/* Upload Foto */}
        <div className="space-y-2">
          <Label>Foto Barang</Label>

          {!previewUrl ? (
            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition-colors">
              <div className="flex flex-col items-center justify-center py-6">
                <Upload className="h-10 w-10 text-muted-foreground mb-3" />
                <p className="text-sm text-muted-foreground">Klik atau drag & drop</p>
                <p className="text-xs text-muted-foreground">PNG, JPG, JPEG (max 5MB)</p>
              </div>

              <Input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImage(e.target.files?.[0] ?? null)}
              />
            </label>
          ) : (
            <div className="relative w-full border rounded-lg overflow-hidden group">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-contain bg-muted"
              />

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={removeImage}
                  className="gap-1"
                >
                  <X className="h-4 w-4" /> Hapus
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => history.back()}
            disabled={loading}
          >
            Batal
          </Button>

          <Button
            className="flex-1 gap-2"
            disabled={loading}
            onClick={submit}
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Menyimpan..." : "Simpan Laporan"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
