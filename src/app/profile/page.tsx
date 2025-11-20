"use client";

import { useUser } from "@/hooks/useUser";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { AxiosError } from "axios";

import { AppSidebar } from "@/components/AppSidebar";
import { SiteHeader } from "@/components/SiteHeader";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { ProfileAlert } from "@/components/profile/ProfileAlert";

interface FormData {
  name: string;
  email: string;
  notelp?: string;
  password?: string;
}

interface MessageType {
  type: "success" | "error";
  text: string;
}

export default function ProfilePage() {
  const { user, loading, refreshUser } = useUser(); // ⬅ tambahkan refreshUser

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    notelp: "",
    password: "",
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<MessageType | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        notelp: user.notelp || "",
        password: "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const payload: FormData = { ...formData };
      if (!payload.password) delete payload.password;

      await api.put(`/users/${user!.id}`, payload);

      // 🔥 AUTO REFRESH USER TANPA RELOAD
      await refreshUser();

      setMessage({ type: "success", text: "Profile berhasil diperbarui!" });

      setFormData({ ...formData, password: "" });
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setMessage({
        type: "error",
        text: error.response?.data.message || "Gagal menyimpan profile",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <div className="p-10">Anda harus login!</div>;
  }

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <AppSidebar
        role={user.role}
        user={{ name: user.name, email: user.email }}
      />

      <SidebarInset>
        <SiteHeader />

        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 space-y-8">
          <ProfileHeader />
          <ProfileAlert message={message} />

          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <ProfileCard user={user} />
            </div>

            <div className="lg:col-span-2">
              <ProfileForm
                formData={formData}
                handleChange={handleChange}
                handleSave={handleSave}
                saving={saving}
              />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
