export interface CreateFoundReportPayload {
  namaBarang: string;
  deskripsi: string;
  lokasiTemu: string;
  image?: File | null;
}

export interface ApiError {
  message: string;
}
