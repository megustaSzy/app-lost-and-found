import { useState } from "react";
import { useRouter } from "next/navigation";
import { createFoundReport } from "@/services/foundReports";
import type { CreateFoundReportPayload } from "@/types/foundReports";

export function useFoundReportForm() {
  const router = useRouter();

  const [data, setData] = useState<CreateFoundReportPayload>({
    namaBarang: "",
    deskripsi: "",
    lokasiTemu: "",
    image: null,
  });

  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  function updateField<K extends keyof CreateFoundReportPayload>(key: K, value: CreateFoundReportPayload[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function handleImage(file: File | null) {
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("Ukuran file maksimal 5MB");
      return;
    }

    updateField("image", file);

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  }

  function removeImage() {
    updateField("image", null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl("");
  }

  async function submit() {
    if (!data.namaBarang.trim()) return setErrorMsg("Nama barang harus diisi");
    if (!data.lokasiTemu.trim()) return setErrorMsg("Lokasi ditemukan harus diisi");

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await createFoundReport(data);

      if (res.success) {
        router.push("/dashboard/admin/found-reports");
      }
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } }).response?.data?.message ??
        "Gagal membuat laporan";

      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  }

  return {
    data,
    updateField,
    previewUrl,
    handleImage,
    removeImage,
    submit,
    loading,
    errorMsg,
  };
}
