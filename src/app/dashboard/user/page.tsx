"use client";

import { DashboardLayout } from "@/components/AppSidebar";
import { useUser } from "@/hooks/useUser";
import useSWR from "swr";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSearch, CheckCircle2, Users, TrendingUp, Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const lostMeFetcher = (url: string) => api.get(url).then((res) => res.data.data);
const foundFetcher = (url: string) => api.get(url).then((res) => res.data.data);

export default function UserDashboard() {
  const { user: currentUser, loading: userLoading } = useUser();

  const { data: myLostReports } = useSWR(currentUser ? "/lost/me" : null, lostMeFetcher);
  const { data: foundReports } = useSWR(currentUser ? "/found" : null, foundFetcher);

  if (userLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-3 rounded-lg bg-background p-6 shadow-lg">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Memuat data pengguna...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Anda harus login untuk mengakses dashboard ini!</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!myLostReports || !foundReports) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-slate-600 font-medium">Memuat dashboard Anda...</p>
        </div>
      </div>
    );
  }

  const statsData = [
    { title: "Laporan Hilang Saya", value: myLostReports.length, icon: FileSearch, gradient: "from-orange-500 to-red-500", bgGradient: "from-orange-50 to-red-50", iconColor: "text-orange-600" },
    { title: "Laporan Ditemukan", value: foundReports.length, icon: CheckCircle2, gradient: "from-emerald-500 to-teal-500", bgGradient: "from-emerald-50 to-teal-50", iconColor: "text-emerald-600" },
  ];

  const chartData = [
    { name: "Hilang Saya", jumlah: myLostReports.length, fill: "#f97316" },
    { name: "Ditemukan", jumlah: foundReports.length, fill: "#10b981" },
  ];

  const totalReports = myLostReports.length + foundReports.length;

  return (
    <DashboardLayout user={{ name: currentUser.name, email: currentUser.email }} role={currentUser.role}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Dashboard User
          </h1>
          <p className="text-slate-600 text-lg">Pantau laporan hilang Anda dan statistik terkait</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {statsData.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className={`relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br ${stat.bgGradient}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                      <p className="text-4xl font-bold text-slate-900">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-xl bg-white shadow-md ${stat.iconColor}`}>
                      <Icon className="w-7 h-7" />
                    </div>
                  </div>
                  <div className={`mt-4 h-1.5 rounded-full bg-gradient-to-r ${stat.gradient}`}></div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Chart & Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-800">Statistik Laporan</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#64748b" style={{ fontSize: '14px', fontWeight: 500 }} />
                  <YAxis stroke="#64748b" style={{ fontSize: '14px', fontWeight: 500 }} />
                  <Tooltip contentStyle={{ backgroundColor: "white", border: "none", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }} />
                  <Bar dataKey="jumlah" radius={[8, 8, 0, 0]} fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Summary Card */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-violet-500 to-purple-600 text-white">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Ringkasan Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl backdrop-blur">
                  <div className="flex items-center gap-3">
                    <FileSearch className="w-6 h-6" />
                    <span className="font-medium">Total Laporan</span>
                  </div>
                  <span className="text-2xl font-bold">{totalReports}</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl backdrop-blur">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6" />
                    <span className="font-medium">Tingkat Penemuan</span>
                  </div>
                  <span className="text-2xl font-bold">
                    {totalReports > 0 ? Math.round((foundReports.length / totalReports) * 100) : 0}%
                  </span>
                </div>
              </div>
              <div className="pt-4 border-t border-white/20">
                <p className="text-sm text-white/80">Dashboard diperbarui secara real-time</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
