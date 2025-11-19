"use client";

import useSWR from "swr";
import { DashboardLayout } from "@/components/AppSidebar";
import { useUser } from "@/hooks/useUser";

import { UsersHeader } from "@/components/admin/users/UserHeader";
import { UsersCard } from "@/components/admin/users/UsersCard";
import { UsersTable } from "@/components/admin/UsersTable";
import { UnauthenticatedAlert } from "@/components/errors/UnauthenticatedAlert";
import { FullscreenLoader } from "@/components/loaders/FullscreenLoader";

import { usersFetcher } from "@/lib/fetchers/usersFetcher";

export default function UsersPage() {
  const { user: currentUser, loading: userLoading } = useUser();

  const {
    data: users,
    error,
    isValidating,
  } = useSWR("/users", usersFetcher, {
    revalidateOnFocus: false,
  });

  const isLoading = userLoading || (!users && !error);

  if (!currentUser && !userLoading) {
    return <UnauthenticatedAlert />;
  }

  return (
    <DashboardLayout
      role={currentUser?.role || "User"}
      user={{
        name: currentUser?.name || "",
        email: currentUser?.email || "",
      }}
    >
      {(isLoading || isValidating) && (
        <FullscreenLoader validating={isValidating} />
      )}

      <div className="space-y-6">
        <UsersHeader count={users?.length || 0} />

        <UsersCard>
          <UsersTable
            data={users}
            error={error}
            isLoading={isLoading}
            isValidating={isValidating}
          />
        </UsersCard>
      </div>
    </DashboardLayout>
  );
}
