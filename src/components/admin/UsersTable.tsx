// components/Admin/UsersTable.tsx
"use client";

import { AxiosError } from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface UsersTableProps {
  data: User[] | undefined;
  error: unknown;
  isLoading: boolean;
  isValidating: boolean;
}

export function UsersTable({ data, error, isLoading, isValidating }: UsersTableProps) {
  if (error) {
  return (
    <Alert variant="destructive">
      <AlertDescription>
        {error instanceof Error ? error.message : "Gagal mengambil data user"}
      </AlertDescription>
    </Alert>
  );
}


  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
    );
  }

  return (
    <div className="relative">
      {isValidating && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/50">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data.length > 0 ? (
              data.map((u, idx) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell>{u.name}</TableCell>
                  <TableCell className="text-muted-foreground">{u.email}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={u.role.toLowerCase() === "admin" ? "default" : "secondary"}
                    >
                      {u.role}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  Tidak ada data user
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}



// app/(admin)/users/page.tsx
