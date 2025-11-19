import { api } from "@/lib/api";
import { LostReportAdmin } from "@/types/lost-report";

export const lostReportsFetcher = (url: string): Promise<LostReportAdmin[]> =>
  api.get(url).then((res) => res.data.data);
