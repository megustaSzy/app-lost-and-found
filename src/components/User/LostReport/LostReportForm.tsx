"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { AxiosError } from "axios";

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
import { AlertCircle, Upload, X, Loader2, CheckCircle2 } from "lucide-react";

interface LostData {
  namaBarang: string;
  deskripsi: string;
  lokasiHilang: string;
}

interface LostReportResponse {
  id: number;
  namaBarang: string;
  deskripsi: string;
  lokasiHilang: string;
}

interface ErrorResponse {
  message: string;
}

export default function LostReportForm() {
  const router = useRouter();

  const [form, setForm] = useState<LostData>({
    namaBarang: "",
    deskripsi: "",
    lokasiHilang: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("Ukuran file maksimal 5MB");
      return;
    }

    setImageFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    setErrorMsg("");
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const { data } = await api.post<LostReportResponse>("/lost", form);
      const lostReportId = data.id;

      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        await api.post(`/image/lost-report/${lostReportId}/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setSuccessMsg("Laporan berhasil dibuat!");
      setForm({ namaBarang: "", deskripsi: "", lokasiHilang: "" });
      handleRemoveImage();

      setTimeout(() => router.push("/dashboard/user/lost-reports"), 1500);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data) {
        const errorData = error.response.data as ErrorResponse;
        setErrorMsg(errorData.message || "Gagal membuat laporan");
      } else if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg("Gagal membuat laporan");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Informasi Barang Hilang</CardTitle>
        <CardDescription>
          Lengkapi data berikut untuk melaporkan barang yang hilang
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {errorMsg && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errorMsg}</AlertDescription>
          </Alert>
        )}

        {successMsg && (
          <Alert className="border-green-300 bg-green-50 text-green-800">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>{successMsg}</AlertDescription>
          </Alert>
        )}

        {/* Nama Barang */}
        <div className="space-y-2">
          <Label htmlFor="namaBarang">
            Nama Barang <span className="text-destructive">*</span>
          </Label>
          <Input
            id="namaBarang"
            name="namaBarang"
            placeholder="Contoh: Dompet kulit coklat"
            value={form.namaBarang}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        {/* Lokasi Hilang */}
        <div className="space-y-2">
          <Label htmlFor="lokasiHilang">
            Lokasi Hilang <span className="text-destructive">*</span>
          </Label>
          <Input
            id="lokasiHilang"
            name="lokasiHilang"
            placeholder="Contoh: Gedung A Lantai 2"
            value={form.lokasiHilang}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        {/* Deskripsi */}
        <div className="space-y-2">
          <Label htmlFor="deskripsi">Deskripsi</Label>
          <Textarea
            id="deskripsi"
            name="deskripsi"
            placeholder="Tambahkan detail seperti warna, ciri khas, dll..."
            rows={4}
            className="resize-none"
            value={form.deskripsi}
            disabled={loading}
            onChange={handleChange}
          />
        </div>

        {/* Upload Foto */}
        <div className="space-y-2">
          <Label>Foto Barang (Opsional)</Label>

          {!previewUrl ? (
            <label
              htmlFor="imagefile"
              className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="flex flex-col items-center py-6">
                <Upload className="h-10 w-10 text-muted-foreground mb-3" />
                <p className="text-sm text-muted-foreground mb-1">
                  <span className="font-semibold">Klik untuk upload</span> atau
                  drag & drop
                </p>
                <p className="text-xs text-muted-foreground">
                  JPG, JPEG, PNG (Maks. 5MB)
                </p>
              </div>
              <Input
                id="imagefile"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
                disabled={loading}
              />
            </label>
          ) : (
            <div className="relative w-full rounded-lg overflow-hidden border group">
              <div className="aspect-video w-full">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-contain bg-muted"
                />
              </div>

              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="gap-2"
                  onClick={handleRemoveImage}
                >
                  <X className="h-4 w-4" />
                  Hapus Foto
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Button */}
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => router.back()}
            disabled={loading}
          >
            Batal
          </Button>

          <Button
            type="button"
            className="flex-1 gap-2"
            disabled={
              loading ||
              !form.namaBarang.trim() ||
              !form.lokasiHilang.trim()
            }
            onClick={handleSubmit}
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Menyimpan..." : "Simpan Laporan"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}