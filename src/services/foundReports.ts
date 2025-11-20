import { api } from "@/lib/api";
import type { CreateFoundReportPayload } from "@/types/foundReports";

interface CreateFoundReportResponse {
  success: boolean;
  message: string;
  data?: any; // bisa disesuaikan
}

export async function createFoundReport(
  payload: CreateFoundReportPayload
): Promise<CreateFoundReportResponse> {
  
  const formData = new FormData();
  formData.append("namaBarang", payload.namaBarang);
  formData.append("deskripsi", payload.deskripsi);
  formData.append("lokasiTemu", payload.lokasiTemu);

  if (payload.image) {
    formData.append("image", payload.image);
  }

  const res = await api.post<CreateFoundReportResponse>("/found", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
}
