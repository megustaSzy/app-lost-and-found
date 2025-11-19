"use client";

import useSWR from "swr";
import { api } from "@/lib/api";
import { FoundReportUser } from "@/types/found";

const fetcher = (url: string) =>
  api.get(url).then((res) => res.data.data as FoundReportUser[]);

export function useFoundReports() {
  const { data, error, isValidating } = useSWR("/found", fetcher);

  return {
    data,
    error,
    isLoading: !data && !error,
    isValidating,
  };
}
