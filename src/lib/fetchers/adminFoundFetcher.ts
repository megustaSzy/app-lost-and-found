import { api } from "@/lib/api";
import { AdminFoundReport } from "@/types/foundReports";

export const adminFoundFetcher = (url: string): Promise<AdminFoundReport[]> =>
  api.get(url).then(res => res.data.data);
