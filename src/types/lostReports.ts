export interface CreateLostReportPayload {
  namaBarang: string;
  deskripsi?: string;
  lokasiHilang: string;
  image: File | null;
}
