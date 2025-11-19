"use client";

import { useUser } from "@/hooks/useUser";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";
import { AxiosError } from "axios";
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Save, 
  Loader2,
  Shield,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

interface FormData {
  name: string;
  email: string;
  notelp?: string;
  password?: string;
}

export default function ProfilePage() {
  const { user, loading } = useUser();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    notelp: "",
    password: "",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-black font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-black font-medium">Anda harus login!</p>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const payload = { ...formData };
      if (!payload.password) delete payload.password;

      await api.put(`/users/${user.id}`, payload);
      setMessage({ type: 'success', text: 'Profile berhasil diperbarui!' });
      setFormData({ ...formData, password: "" });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      setMessage({ 
        type: 'error', 
        text: err.response?.data.message || "Gagal menyimpan profile" 
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-black">
          Profile
        </h1>
        <p className="text-black/70 text-lg">
          Manage your personal information
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1 shadow-md bg-white rounded-xl">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32 border-2 border-gray-300">
                <AvatarFallback className="bg-gray-200 text-black text-3xl font-light">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="text-center space-y-2 w-full">
                <h2 className="text-xl font-bold text-black">{user.name}</h2>
                <p className="text-sm text-black/70">{user.email}</p>
                <Badge variant="outline" className="border-gray-300 bg-gray-100 text-black font-medium">
                  <Shield className="h-3 w-3 mr-1" strokeWidth={1.5} />
                  {user.role}
                </Badge>
              </div>

              <Separator className="bg-gray-300" />

              <div className="w-full space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                  <span className="text-xs text-black/70 font-medium">Account Status</span>
                  <Badge variant="outline" className="border-emerald-500/30 bg-emerald-100 text-emerald-600 text-xs">
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                  <span className="text-xs text-black/70 font-medium">Member Since</span>
                  <span className="text-xs text-black font-medium">{new Date().getFullYear()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Form */}
        <Card className="lg:col-span-2 shadow-md bg-white rounded-xl">
          <CardHeader className="border-b border-gray-300">
            <CardTitle className="text-lg font-bold text-black tracking-wide">
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {message && (
              <div className={`flex items-center gap-3 p-4 rounded-lg border ${
                message.type === 'success' 
                  ? 'bg-emerald-100 border-emerald-300' 
                  : 'bg-red-100 border-red-300'
              }`}>
                {message.type === 'success' ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" strokeWidth={1.5} />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-600" strokeWidth={1.5} />
                )}
                <span className={`text-sm font-medium ${
                  message.type === 'success' ? 'text-emerald-700' : 'text-red-700'
                }`}>
                  {message.text}
                </span>
              </div>
            )}

            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-black font-medium text-sm flex items-center gap-2">
                  <User className="h-4 w-4" strokeWidth={1.5} />
                  Full Name
                </Label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 text-black placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-black font-medium text-sm flex items-center gap-2">
                  <Mail className="h-4 w-4" strokeWidth={1.5} />
                  Email Address
                </Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 text-black placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-black font-medium text-sm flex items-center gap-2">
                  <Phone className="h-4 w-4" strokeWidth={1.5} />
                  Phone Number
                </Label>
                <Input
                  type="text"
                  name="notelp"
                  value={formData.notelp}
                  onChange={handleChange}
                  placeholder="Optional"
                  className="bg-white border border-gray-300 text-black placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <Separator className="bg-gray-300" />

              <div className="space-y-2">
                <Label className="text-black font-medium text-sm flex items-center gap-2">
                  <Lock className="h-4 w-4" strokeWidth={1.5} />
                  New Password
                </Label>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Leave empty to keep current password"
                  className="bg-white border border-gray-300 text-black placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <p className="text-xs text-black/70 font-medium">
                  Password must be at least 8 characters long
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button
  onClick={handleSave}
  disabled={saving}
  className="bg-black text-white hover:bg-gray-900 focus:ring-2 focus:ring-gray-700 focus:ring-offset-1 font-medium transition-all duration-200"
>
  {saving ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" strokeWidth={1.5} />
      Saving...
    </>
  ) : (
    <>
      <Save className="mr-2 h-4 w-4" strokeWidth={1.5} />
      Save Changes
    </>
  )}
</Button>

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
