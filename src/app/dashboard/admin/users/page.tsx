"use client";

import useSWR from "swr";
import { useUser } from "@/hooks/useUser";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SiteHeader } from "@/components/SiteHeader";

import { UsersHeader } from "@/components/admin/users/UserHeader";
import { UsersCard } from "@/components/admin/users/UsersCard";
import { UsersTable } from "@/components/admin/UsersTable";

import { UnauthenticatedAlert } from "@/components/errors/UnauthenticatedAlert";
import { FullscreenLoader } from "@/components/loaders/FullscreenLoader";

import { usersFetcher } from "@/lib/fetchers/usersFetcher";

export default function UsersPage() {
  const { user, loading: userLoading } = useUser();

  const {
    data: users,
    error,
    isValidating,
  } = useSWR("/users", usersFetcher, {
    revalidateOnFocus: false,
  });

  const isLoading = userLoading || (!users && !error);

  // Jika tidak login
  if (!user && !userLoading) {
    return <UnauthenticatedAlert />;
  }

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      {/* SIDEBAR */}
      <AppSidebar
        role={user?.role || "User"}
        user={{
          name: user?.name || "",
          email: user?.email || "",
        }}
      />

      <SidebarInset>
        {/* HEADER GLOBAL */}
        <SiteHeader />

        {/* LOADING */}
        {(isLoading || isValidating) && (
          <FullscreenLoader validating={isValidating} />
        )}

        {/* MAIN CONTENT */}
        <div className="p-6 space-y-6">
          {/* Hal ini dibuat konsisten dengan halaman lainnya */}
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Manajemen Pengguna</h1>
            <p className="text-muted-foreground">
              Kelola dan pantau semua pengguna terdaftar
            </p>
          </div>
          
          <UsersCard>
            <UsersTable
              data={users}
              error={error}
              isLoading={isLoading}
              isValidating={isValidating}
            />
          </UsersCard>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
