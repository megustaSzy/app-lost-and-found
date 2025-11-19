import { api } from "@/lib/api";
import type { CreateFoundReportPayload } from "@/types/foundReports";

export async function createFoundReport(payload: CreateFoundReportPayload) {
  const formData = new FormData();
  formData.append("namaBarang", payload.namaBarang);
  formData.append("deskripsi", payload.deskripsi);
  formData.append("lokasiTemu", payload.lokasiTemu);

  if (payload.image) {
    formData.append("image", payload.image);
  }

  const res = await api.post("/found", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
}
