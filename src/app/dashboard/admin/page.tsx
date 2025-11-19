"use client";

import { useUser } from "@/hooks/useUser";
import { AppSidebar } from "@/components/AppSidebar";
import { SiteHeader } from "@/components/SiteHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { FileSearch, CheckCircle2, Users, TrendingUp } from "lucide-react";
import useSWR from "swr";

import { usersFetcher } from "@/lib/fetchers/usersFetcher";
import { lostReportsFetcher } from "@/lib/fetchers/lostReportsFetcher";
import { api } from "@/lib/api";

const foundFetcher = (url: string) => api.get(url).then(res => res.data.data);

export default function AdminDashboard() {
  const { user, loading: userLoading } = useUser();

  const { data: lostReports } = useSWR("/lost", lostReportsFetcher);
  const { data: foundReports } = useSWR("/found", foundFetcher);
  const { data: users } = useSWR("/users", usersFetcher, { revalidateOnFocus: false });

  if (userLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-slate-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!lostReports || !foundReports || !users) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-slate-600 font-medium">Memuat data chart...</p>
        </div>
      </div>
    );
  }

  const statsData = [
    {
      title: "Laporan Hilang",
      value: lostReports?.length || 0,
      icon: FileSearch,
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
      iconColor: "text-orange-600",
    },
    {
      title: "Laporan Ditemukan",
      value: foundReports?.length || 0,
      icon: CheckCircle2,
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50",
      iconColor: "text-emerald-600",
    },
    {
      title: "Total Users",
      value: users?.length || 0,
      icon: Users,
      gradient: "from-blue-500 to-indigo-500",
      bgGradient: "from-blue-50 to-indigo-50",
      iconColor: "text-blue-600",
    },
  ];

  const chartData = [
    { 
      name: "Hilang", 
      jumlah: lostReports?.length || 0,
      fill: "#f97316"
    },
    { 
      name: "Ditemukan", 
      jumlah: foundReports?.length || 0,
      fill: "#10b981"
    },
    { 
      name: "Users", 
      jumlah: users?.length || 0,
      fill: "#3b82f6"
    },
  ];

  const totalReports = (lostReports?.length || 0) + (foundReports?.length || 0);

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
          {/* Header Section */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Dashboard Admin
            </h1>
            <p className="text-slate-600 text-lg">
              Pantau dan kelola semua laporan dalam satu tempat
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statsData.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card 
                  key={stat.title}
                  className={`relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br ${stat.bgGradient}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3">
                        <p className="text-sm font-medium text-slate-600">
                          {stat.title}
                        </p>
                        <p className="text-4xl font-bold text-slate-900">
                          {stat.value}
                        </p>
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

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bar Chart */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-800">
                    Statistik Laporan
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#64748b"
                      style={{ fontSize: '14px', fontWeight: 500 }}
                    />
                    <YAxis 
                      stroke="#64748b"
                      style={{ fontSize: '14px', fontWeight: 500 }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      }}
                      cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                    />
                    <Bar 
                      dataKey="jumlah" 
                      radius={[8, 8, 0, 0]}
                      fill="#3b82f6"
                    />
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
                      {totalReports > 0 
                        ? Math.round((foundReports?.length / totalReports) * 100)
                        : 0}%
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl backdrop-blur">
                    <div className="flex items-center gap-3">
                      <Users className="w-6 h-6" />
                      <span className="font-medium">Active Users</span>
                    </div>
                    <span className="text-2xl font-bold">{users?.length || 0}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/20">
                  <p className="text-sm text-white/80">
                    Dashboard diperbarui secara real-time
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}