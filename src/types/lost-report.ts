export interface LostReportAdmin {
  id: number;
  namaBarang: string;
  deskripsi: string;
  lokasiHilang: string;
  imageUrl?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";

  user: {
    id: number;
    name: string;
    email: string;
    notelp?: string;
  };
}
