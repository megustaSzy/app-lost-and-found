import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createLostReport } from "@/services/lostReports";
import type { CreateLostReportPayload } from "@/types/lostReports";

interface UseLostReportFormOptions {
  redirectUrl?: string;
}

export function useLostReportForm(options?: UseLostReportFormOptions) {
  const router = useRouter();
  const redirectUrl = options?.redirectUrl || "/dashboard/user/lost-reports";

  const [data, setData] = useState<CreateLostReportPayload>({
    namaBarang: "",
    deskripsi: "",
    lokasiHilang: "",
    image: null,
  });

  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Update field
  function updateField<K extends keyof CreateLostReportPayload>(
    key: K,
    value: CreateLostReportPayload[K]
  ) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  // Handle image select
  function handleImage(file: File | null) {
    if (!file) {
      removeImage();
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("Ukuran file maksimal 5MB");
      return;
    }

    updateField("image", file);

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
    setErrorMsg("");
  }

  // Remove image
  function removeImage() {
    updateField("image", null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl("");
  }

  // Submit form
  async function submit() {
    if (!data.namaBarang.trim()) return setErrorMsg("Nama barang harus diisi");
    if (!data.lokasiHilang.trim()) return setErrorMsg("Lokasi kehilangan harus diisi");

    setLoading(true);
    setErrorMsg("");

    try {
      const formData = new FormData();
      formData.append("namaBarang", data.namaBarang);
      formData.append("deskripsi", data.deskripsi || "");
      formData.append("lokasiHilang", data.lokasiHilang);
      if (data.image) formData.append("image", data.image);

      const res = await createLostReport(formData);

      if (res.success) {
        router.push(redirectUrl);
      } else {
        setErrorMsg(res.message || "Gagal membuat laporan");
      }
    } catch (err: any) {
      const message = err?.response?.data?.message || err?.message || "Gagal membuat laporan";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  }

  // Clean up preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

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
