"use client";

import { LoadingOverlay } from "@/components/admin/LoadingOverlay";

export function FullscreenLoader({ validating }: { validating: boolean }) {
  return (
    <LoadingOverlay
      label={validating ? "Memperbarui data..." : "Memuat data..."}
    />
  );
}
