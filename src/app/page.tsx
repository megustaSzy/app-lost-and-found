"use client"
import React, { useState } from 'react';
import { Search, MapPin, Bell, Shield, ChevronRight, Menu, X, Gamepad2, Package, ArrowRight, Phone, Mail, Facebook, Instagram, Twitter, Clock, Users, CheckCircle2 } from 'lucide-react';

export default function LostFoundLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    { icon: <Search className="w-5 h-5" />, title: "Pencarian Cepat", desc: "Temukan barang hilang dengan sistem pencarian canggih berbasis lokasi dan kategori" },
    { icon: <Bell className="w-5 h-5" />, title: "Notifikasi Real-time", desc: "Dapatkan pemberitahuan instan ketika barang Anda ditemukan oleh mitra kami" },
    { icon: <Shield className="w-5 h-5" />, title: "Verifikasi Aman", desc: "Sistem verifikasi kepemilikan yang aman untuk mencegah penipuan" },
    { icon: <Gamepad2 className="w-5 h-5" />, title: "Mitra Rental PS", desc: "Jaringan luas mitra rental PlayStation siap membantu menemukan barang Anda" },
  ];

  const stats = [
    { value: "500+", label: "Mitra Rental PS", icon: <Gamepad2 className="w-4 h-4" /> },
    { value: "10,000+", label: "Barang Ditemukan", icon: <Package className="w-4 h-4" /> },
    { value: "98%", label: "Tingkat Keberhasilan", icon: <CheckCircle2 className="w-4 h-4" /> },
    { value: "24/7", label: "Dukungan", icon: <Clock className="w-4 h-4" /> },
  ];

  const steps = [
    { num: "01", title: "Laporkan Barang", desc: "Buat laporan kehilangan dengan detail lengkap dan foto barang" },
    { num: "02", title: "Pencarian Otomatis", desc: "Sistem kami akan mencocokkan dengan barang temuan di seluruh mitra" },
    { num: "03", title: "Verifikasi", desc: "Buktikan kepemilikan Anda melalui proses verifikasi aman" },
    { num: "04", title: "Ambil Barang", desc: "Kunjungi mitra terdekat untuk mengambil barang Anda" },
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-900 antialiased">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center">
                <Package className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-semibold text-neutral-900">FindIt</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-neutral-500 hover:text-neutral-900 transition-colors text-sm">Fitur</a>
              <a href="#how" className="text-neutral-500 hover:text-neutral-900 transition-colors text-sm">Cara Kerja</a>
              <a href="#partners" className="text-neutral-500 hover:text-neutral-900 transition-colors text-sm">Mitra</a>
              <a href="#contact" className="text-neutral-500 hover:text-neutral-900 transition-colors text-sm">Kontak</a>
            </nav>

            <div className="hidden md:flex items-center gap-2">
              <button className="px-4 py-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                Login
              </button>
              <button className="px-4 py-2 text-sm font-medium bg-neutral-900 text-white hover:bg-neutral-800 rounded-lg transition-colors">
                Register
              </button>
            </div>

            <button className="md:hidden p-2 text-neutral-500 hover:text-neutral-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-neutral-200">
            <div className="px-4 py-4 space-y-1">
              <a href="#features" className="block text-neutral-500 hover:text-neutral-900 py-2 text-sm">Fitur</a>
              <a href="#how" className="block text-neutral-500 hover:text-neutral-900 py-2 text-sm">Cara Kerja</a>
              <a href="#partners" className="block text-neutral-500 hover:text-neutral-900 py-2 text-sm">Mitra</a>
              <a href="#contact" className="block text-neutral-500 hover:text-neutral-900 py-2 text-sm">Kontak</a>
              <div className="pt-3 flex gap-2">
                <button className="flex-1 px-4 py-2.5 text-sm border border-neutral-200 rounded-lg text-neutral-600 hover:bg-neutral-50 transition-colors">Login</button>
                <button className="flex-1 px-4 py-2.5 text-sm font-medium bg-neutral-900 text-white rounded-lg">Register</button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 via-white to-white" />
        
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-100 rounded-full border border-neutral-200 mb-6">
              <Gamepad2 className="w-3.5 h-3.5 text-neutral-500" />
              <span className="text-xs text-neutral-600">Bekerjasama dengan 500+ Rental PlayStation</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 leading-tight tracking-tight">
              Temukan Barang
              <span className="block text-neutral-400">Hilang Anda</span>
            </h1>
            
            <p className="text-base text-neutral-500 mb-8 max-w-xl mx-auto leading-relaxed">
              Platform lost and found pertama yang terintegrasi dengan jaringan mitra rental PlayStation se-Indonesia.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium bg-neutral-900 text-white hover:bg-neutral-800 rounded-lg transition-colors flex items-center justify-center gap-2">
                Laporkan Kehilangan
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium border border-neutral-300 hover:bg-neutral-50 rounded-lg transition-colors flex items-center justify-center gap-2 text-neutral-700">
                <Search className="w-4 h-4" />
                Cari Barang Temuan
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map((stat, i) => (
              <div key={i} className="text-center p-5 bg-neutral-50 rounded-xl border border-neutral-200/80">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-neutral-400">{stat.icon}</span>
                  <span className="text-2xl font-semibold text-neutral-900">{stat.value}</span>
                </div>
                <div className="text-xs text-neutral-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-3 text-neutral-900">Fitur Unggulan</h2>
            <p className="text-neutral-500 text-sm max-w-lg mx-auto">Sistem canggih untuk membantu Anda menemukan barang hilang dengan cepat dan aman</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <div key={i} className="group p-5 bg-white rounded-xl border border-neutral-200 hover:border-neutral-300 hover:shadow-sm transition-all">
                <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center text-neutral-600 mb-4 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                  {f.icon}
                </div>
                <h3 className="text-sm font-medium mb-2 text-neutral-900">{f.title}</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-16 px-4 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-3 text-neutral-900">Cara Kerja</h2>
            <p className="text-neutral-500 text-sm max-w-lg mx-auto">Empat langkah mudah untuk menemukan barang hilang Anda</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((s, i) => (
              <div key={i} className="relative p-5 bg-white rounded-xl border border-neutral-200">
                <div className="text-3xl font-bold text-neutral-200 mb-3">{s.num}</div>
                <h3 className="text-sm font-medium mb-2 text-neutral-900">{s.title}</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">{s.desc}</p>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                    <ChevronRight className="w-4 h-4 text-neutral-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-neutral-900 rounded-2xl p-6 sm:p-10">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-800 rounded-full mb-4">
                  <Gamepad2 className="w-3.5 h-3.5 text-neutral-400" />
                  <span className="text-xs text-neutral-300">Mitra Rental PS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-semibold mb-3 text-white">Bergabung Sebagai Mitra</h2>
                <p className="text-neutral-400 text-sm mb-6 leading-relaxed">Jadikan rental PlayStation Anda sebagai titik pengumpulan barang temuan. Bantu komunitas dan tingkatkan reputasi bisnis Anda!</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <button className="px-5 py-2.5 text-sm font-medium bg-white text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors">
                    Daftar Jadi Mitra
                  </button>
                  <button className="px-5 py-2.5 text-sm font-medium border border-neutral-700 rounded-lg hover:bg-neutral-800 transition-colors text-neutral-300">
                    Pelajari Lebih Lanjut
                  </button>
                </div>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-3 w-full max-w-sm">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square bg-neutral-800 rounded-xl flex items-center justify-center">
                    <Gamepad2 className="w-8 h-8 text-neutral-600" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-neutral-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-3 text-neutral-900">Siap Menemukan Barang Anda?</h2>
          <p className="text-neutral-500 text-sm mb-6">Bergabung dengan ribuan pengguna yang telah menemukan barang hilang mereka melalui FindIt</p>
          <button className="px-6 py-2.5 text-sm font-medium bg-neutral-900 text-white hover:bg-neutral-800 rounded-lg transition-colors inline-flex items-center gap-2">
            Login untuk Memulai
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-white border-t border-neutral-200 pt-12 pb-6 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center">
                  <Package className="w-4 h-4 text-white" />
                </div>
                <span className="text-base font-semibold text-neutral-900">FindIt</span>
              </div>
              <p className="text-xs text-neutral-500 mb-4 leading-relaxed">Platform lost and found terintegrasi dengan mitra rental PlayStation se-Indonesia.</p>
              <div className="flex gap-2">
                {[Facebook, Instagram, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-8 h-8 bg-neutral-100 rounded-lg flex items-center justify-center hover:bg-neutral-200 transition-colors">
                    <Icon className="w-4 h-4 text-neutral-500" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-4 text-neutral-900">Layanan</h4>
              <ul className="space-y-2.5 text-xs text-neutral-500">
                <li><a href="#" className="hover:text-neutral-900 transition-colors">Laporkan Kehilangan</a></li>
                <li><a href="#" className="hover:text-neutral-900 transition-colors">Cari Barang Temuan</a></li>
                <li><a href="#" className="hover:text-neutral-900 transition-colors">Daftar Mitra</a></li>
                <li><a href="#" className="hover:text-neutral-900 transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-4 text-neutral-900">Perusahaan</h4>
              <ul className="space-y-2.5 text-xs text-neutral-500">
                <li><a href="#" className="hover:text-neutral-900 transition-colors">Tentang Kami</a></li>
                <li><a href="#" className="hover:text-neutral-900 transition-colors">Karir</a></li>
                <li><a href="#" className="hover:text-neutral-900 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-neutral-900 transition-colors">Syarat & Ketentuan</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-4 text-neutral-900">Kontak</h4>
              <ul className="space-y-2.5 text-xs text-neutral-500">
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" />
                  <span>support@findit.id</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5" />
                  <span>+62 812 3456 7890</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 mt-0.5" />
                  <span>Jl. Contoh No. 123, Jakarta Selatan</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-neutral-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-neutral-400">© 2025 FindIt. All rights reserved.</p>
            <div className="flex gap-6 text-xs text-neutral-400">
              <a href="#" className="hover:text-neutral-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-neutral-600 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// "use client"

// import React, { useState } from 'react';
// import { Search, MapPin, Bell, Shield, ChevronRight, Menu, X, Gamepad2, Package, ArrowRight, Phone, Mail, Facebook, Instagram, Twitter, Clock, Users, CheckCircle2 } from 'lucide-react';
// import Link from 'next/link';

// export default function LostFoundLanding() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const features = [
//     { icon: <Search className="w-5 h-5" />, title: "Pencarian Cepat", desc: "Temukan barang hilang dengan sistem pencarian canggih berbasis lokasi dan kategori" },
//     { icon: <Bell className="w-5 h-5" />, title: "Notifikasi Real-time", desc: "Dapatkan pemberitahuan instan ketika barang Anda ditemukan oleh mitra kami" },
//     { icon: <Shield className="w-5 h-5" />, title: "Verifikasi Aman", desc: "Sistem verifikasi kepemilikan yang aman untuk mencegah penipuan" },
//     { icon: <Gamepad2 className="w-5 h-5" />, title: "Mitra Rental PS", desc: "Jaringan luas mitra rental PlayStation siap membantu menemukan barang Anda" },
//   ];

//   const stats = [
//     { value: "500+", label: "Mitra Rental PS", icon: <Gamepad2 className="w-4 h-4" /> },
//     { value: "10,000+", label: "Barang Ditemukan", icon: <Package className="w-4 h-4" /> },
//     { value: "98%", label: "Tingkat Keberhasilan", icon: <CheckCircle2 className="w-4 h-4" /> },
//     { value: "24/7", label: "Dukungan", icon: <Clock className="w-4 h-4" /> },
//   ];

//   const steps = [
//     { num: "01", title: "Laporkan Barang", desc: "Buat laporan kehilangan dengan detail lengkap dan foto barang" },
//     { num: "02", title: "Pencarian Otomatis", desc: "Sistem kami akan mencocokkan dengan barang temuan di seluruh mitra" },
//     { num: "03", title: "Verifikasi", desc: "Buktikan kepemilikan Anda melalui proses verifikasi aman" },
//     { num: "04", title: "Ambil Barang", desc: "Kunjungi mitra terdekat untuk mengambil barang Anda" },
//   ];

//   return (
//     <div className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
//       {/* Header */}
//       <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/50">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6">
//           <div className="flex items-center justify-between h-14">
//             <div className="flex items-center gap-2.5">
//               <div className="w-8 h-8 bg-neutral-800 rounded-lg flex items-center justify-center border border-neutral-700/50">
//                 <Package className="w-4 h-4 text-neutral-300" />
//               </div>
//               <span className="text-base font-semibold text-neutral-100">FindIt</span>
//             </div>
            
//             <nav className="hidden md:flex items-center gap-6">
//               <a href="#features" className="text-neutral-400 hover:text-neutral-100 transition-colors text-sm">Fitur</a>
//               <a href="#how" className="text-neutral-400 hover:text-neutral-100 transition-colors text-sm">Cara Kerja</a>
//               <a href="#partners" className="text-neutral-400 hover:text-neutral-100 transition-colors text-sm">Mitra</a>
//               <a href="#contact" className="text-neutral-400 hover:text-neutral-100 transition-colors text-sm">Kontak</a>
//             </nav>

//             <div className="hidden md:flex items-center gap-2">
//               <Link href="/login">
//                 <button className="px-4 py-2 text-sm text-neutral-400 hover:text-neutral-100 transition-colors">
//                   Login
//                 </button>
//               </Link>
//               <Link href="/signup">
//                 <button className="px-4 py-2 text-sm font-medium bg-neutral-100 text-neutral-900 hover:bg-neutral-200 rounded-lg transition-colors">
//                   Register
//                 </button>
//               </Link>
//             </div>

//             <button className="md:hidden p-2 text-neutral-400 hover:text-neutral-100" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
//               {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
//             </button>
//           </div>
//         </div>

//         {mobileMenuOpen && (
//           <div className="md:hidden bg-neutral-900 border-b border-neutral-800/50">
//             <div className="px-4 py-4 space-y-1">
//               <a href="#features" className="block text-neutral-400 hover:text-neutral-100 py-2 text-sm">Fitur</a>
//               <a href="#how" className="block text-neutral-400 hover:text-neutral-100 py-2 text-sm">Cara Kerja</a>
//               <a href="#partners" className="block text-neutral-400 hover:text-neutral-100 py-2 text-sm">Mitra</a>
//               <a href="#contact" className="block text-neutral-400 hover:text-neutral-100 py-2 text-sm">Kontak</a>
//               <div className="pt-3 flex gap-2">
//                 <button className="flex-1 px-4 py-2.5 text-sm border border-neutral-800 rounded-lg text-neutral-300 hover:bg-neutral-800 transition-colors">Login</button>
//                 <button className="flex-1 px-4 py-2.5 text-sm font-medium bg-neutral-100 text-neutral-900 rounded-lg">Register</button>
//               </div>
//             </div>
//           </div>
//         )}
//       </header>

//       {/* Hero Section */}
//       <section className="relative pt-28 pb-16 px-4">
//         <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 via-transparent to-transparent" />
        
//         <div className="max-w-6xl mx-auto relative">
//           <div className="text-center max-w-3xl mx-auto">
//             <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-900 rounded-full border border-neutral-800 mb-6">
//               <Gamepad2 className="w-3.5 h-3.5 text-neutral-500" />
//               <span className="text-xs text-neutral-400">Bekerjasama dengan 500+ Rental PlayStation</span>
//             </div>
            
//             <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 leading-tight tracking-tight">
//               Temukan Barang
//               <span className="block text-neutral-500">Hilang Anda</span>
//             </h1>
            
//             <p className="text-base text-neutral-500 mb-8 max-w-xl mx-auto leading-relaxed">
//               Platform lost and found pertama yang terintegrasi dengan jaringan mitra rental PlayStation se-Indonesia.
//             </p>

//             <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
//               <button className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium bg-neutral-100 text-neutral-900 hover:bg-neutral-200 rounded-lg transition-colors flex items-center justify-center gap-2">
//                 Laporkan Kehilangan
//                 <ArrowRight className="w-4 h-4" />
//               </button>
//               <button className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium border border-neutral-800 hover:bg-neutral-900 rounded-lg transition-colors flex items-center justify-center gap-2 text-neutral-300">
//                 <Search className="w-4 h-4" />
//                 Cari Barang Temuan
//               </button>
//             </div>
//           </div>

//           {/* Stats */}
//           <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3">
//             {stats.map((stat, i) => (
//               <div key={i} className="text-center p-5 bg-neutral-900/50 rounded-xl border border-neutral-800/50">
//                 <div className="flex items-center justify-center gap-2 mb-1">
//                   <span className="text-neutral-600">{stat.icon}</span>
//                   <span className="text-2xl font-semibold text-neutral-100">{stat.value}</span>
//                 </div>
//                 <div className="text-xs text-neutral-500">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="py-16 px-4">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-12">
//             <h2 className="text-2xl sm:text-3xl font-semibold mb-3">Fitur Unggulan</h2>
//             <p className="text-neutral-500 text-sm max-w-lg mx-auto">Sistem canggih untuk membantu Anda menemukan barang hilang dengan cepat dan aman</p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
//             {features.map((f, i) => (
//               <div key={i} className="group p-5 bg-neutral-900/30 rounded-xl border border-neutral-800/50 hover:border-neutral-700/50 hover:bg-neutral-900/50 transition-all">
//                 <div className="w-10 h-10 bg-neutral-800/50 rounded-lg flex items-center justify-center text-neutral-400 mb-4 group-hover:text-neutral-300 transition-colors">
//                   {f.icon}
//                 </div>
//                 <h3 className="text-sm font-medium mb-2 text-neutral-200">{f.title}</h3>
//                 <p className="text-xs text-neutral-500 leading-relaxed">{f.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* How It Works */}
//       <section id="how" className="py-16 px-4 bg-neutral-900/30">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-12">
//             <h2 className="text-2xl sm:text-3xl font-semibold mb-3">Cara Kerja</h2>
//             <p className="text-neutral-500 text-sm max-w-lg mx-auto">Empat langkah mudah untuk menemukan barang hilang Anda</p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
//             {steps.map((s, i) => (
//               <div key={i} className="relative p-5 bg-neutral-900/50 rounded-xl border border-neutral-800/50">
//                 <div className="text-3xl font-bold text-neutral-800 mb-3">{s.num}</div>
//                 <h3 className="text-sm font-medium mb-2 text-neutral-200">{s.title}</h3>
//                 <p className="text-xs text-neutral-500 leading-relaxed">{s.desc}</p>
//                 {i < 3 && (
//                   <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2">
//                     <ChevronRight className="w-4 h-4 text-neutral-700" />
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Partners Section */}
//       <section id="partners" className="py-16 px-4">
//         <div className="max-w-6xl mx-auto">
//           <div className="bg-neutral-900/50 rounded-2xl p-6 sm:p-10 border border-neutral-800/50">
//             <div className="flex flex-col lg:flex-row items-center gap-8">
//               <div className="flex-1 text-center lg:text-left">
//                 <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-800/50 rounded-full mb-4">
//                   <Gamepad2 className="w-3.5 h-3.5 text-neutral-500" />
//                   <span className="text-xs text-neutral-400">Mitra Rental PS</span>
//                 </div>
//                 <h2 className="text-2xl sm:text-3xl font-semibold mb-3">Bergabung Sebagai Mitra</h2>
//                 <p className="text-neutral-500 text-sm mb-6 leading-relaxed">Jadikan rental PlayStation Anda sebagai titik pengumpulan barang temuan. Bantu komunitas dan tingkatkan reputasi bisnis Anda!</p>
//                 <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
//                   <button className="px-5 py-2.5 text-sm font-medium bg-neutral-100 text-neutral-900 rounded-lg hover:bg-neutral-200 transition-colors">
//                     Daftar Jadi Mitra
//                   </button>
//                   <button className="px-5 py-2.5 text-sm font-medium border border-neutral-700 rounded-lg hover:bg-neutral-800 transition-colors text-neutral-300">
//                     Pelajari Lebih Lanjut
//                   </button>
//                 </div>
//               </div>
//               <div className="flex-1 grid grid-cols-2 gap-3 w-full max-w-sm">
//                 {[...Array(4)].map((_, i) => (
//                   <div key={i} className="aspect-square bg-neutral-800/30 rounded-xl flex items-center justify-center border border-neutral-800/50">
//                     <Gamepad2 className="w-8 h-8 text-neutral-700" />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-16 px-4">
//         <div className="max-w-2xl mx-auto text-center">
//           <h2 className="text-2xl sm:text-3xl font-semibold mb-3">Siap Menemukan Barang Anda?</h2>
//           <p className="text-neutral-500 text-sm mb-6">Bergabung dengan ribuan pengguna yang telah menemukan barang hilang mereka melalui FindIt</p>
//           <button className="px-6 py-2.5 text-sm font-medium bg-neutral-100 text-neutral-900 hover:bg-neutral-200 rounded-lg transition-colors inline-flex items-center gap-2">
//             Login untuk Memulai
//             <ArrowRight className="w-4 h-4" />
//           </button>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer id="contact" className="bg-neutral-900/50 border-t border-neutral-800/50 pt-12 pb-6 px-4">
//         <div className="max-w-6xl mx-auto">
//           <div className="grid md:grid-cols-4 gap-8 mb-10">
//             <div>
//               <div className="flex items-center gap-2.5 mb-4">
//                 <div className="w-8 h-8 bg-neutral-800 rounded-lg flex items-center justify-center border border-neutral-700/50">
//                   <Package className="w-4 h-4 text-neutral-300" />
//                 </div>
//                 <span className="text-base font-semibold">FindIt</span>
//               </div>
//               <p className="text-xs text-neutral-500 mb-4 leading-relaxed">Platform lost and found terintegrasi dengan mitra rental PlayStation se-Indonesia.</p>
//               <div className="flex gap-2">
//                 {[Facebook, Instagram, Twitter].map((Icon, i) => (
//                   <a key={i} href="#" className="w-8 h-8 bg-neutral-800/50 rounded-lg flex items-center justify-center hover:bg-neutral-800 transition-colors border border-neutral-800/50">
//                     <Icon className="w-4 h-4 text-neutral-500" />
//                   </a>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <h4 className="text-sm font-medium mb-4 text-neutral-200">Layanan</h4>
//               <ul className="space-y-2.5 text-xs text-neutral-500">
//                 <li><a href="#" className="hover:text-neutral-300 transition-colors">Laporkan Kehilangan</a></li>
//                 <li><a href="#" className="hover:text-neutral-300 transition-colors">Cari Barang Temuan</a></li>
//                 <li><a href="#" className="hover:text-neutral-300 transition-colors">Daftar Mitra</a></li>
//                 <li><a href="#" className="hover:text-neutral-300 transition-colors">FAQ</a></li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="text-sm font-medium mb-4 text-neutral-200">Perusahaan</h4>
//               <ul className="space-y-2.5 text-xs text-neutral-500">
//                 <li><a href="#" className="hover:text-neutral-300 transition-colors">Tentang Kami</a></li>
//                 <li><a href="#" className="hover:text-neutral-300 transition-colors">Karir</a></li>
//                 <li><a href="#" className="hover:text-neutral-300 transition-colors">Blog</a></li>
//                 <li><a href="#" className="hover:text-neutral-300 transition-colors">Syarat & Ketentuan</a></li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="text-sm font-medium mb-4 text-neutral-200">Kontak</h4>
//               <ul className="space-y-2.5 text-xs text-neutral-500">
//                 <li className="flex items-center gap-2">
//                   <Mail className="w-3.5 h-3.5" />
//                   <span>support@findit.id</span>
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <Phone className="w-3.5 h-3.5" />
//                   <span>+62 812 3456 7890</span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <MapPin className="w-3.5 h-3.5 mt-0.5" />
//                   <span>Jl. Contoh No. 123, Jakarta Selatan</span>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="border-t border-neutral-800/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
//             <p className="text-xs text-neutral-600">© 2025 FindIt. All rights reserved.</p>
//             <div className="flex gap-6 text-xs text-neutral-600">
//               <a href="#" className="hover:text-neutral-400 transition-colors">Privacy Policy</a>
//               <a href="#" className="hover:text-neutral-400 transition-colors">Terms of Service</a>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }