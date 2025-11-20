export interface CreateFoundReportPayload {
  namaBarang: string;
  deskripsi: string;
  lokasiTemu: string;
  image?: File | null;
}

export interface ApiError {
  message: string;
}

// Tambahan untuk data yang dikembalikan dari backend
export interface AdminFoundReport {
  id: number;
  namaBarang: string;
  deskripsi: string;
  lokasiTemu: string;
  imageUrl?: string;
  createdAt: string;
  statusFound: "PENDING" | "CLAIMED" | "REJECTED";
  createdByAdmin: boolean;
  adminId?: number | null;
  admin?: {
    name: string;
  } | null;
  lostReportId?: number | null;
}
