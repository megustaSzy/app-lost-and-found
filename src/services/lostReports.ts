import { api } from "@/lib/api";
import type { CreateLostReportPayload } from "@/types/lostReports";

interface CreateLostReportResponse {
  success: boolean;
  message: string;
  data?: any;
}

// User buat lost report
export async function createLostReport(
  formData: FormData
): Promise<CreateLostReportResponse> {
  const res = await api.post<CreateLostReportResponse>("/lost", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}
