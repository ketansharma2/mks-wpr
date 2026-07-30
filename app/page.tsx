'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { UserCog, Users, Lock, Mail, ArrowRight } from 'lucide-react';
import authService from "@/services/auth.service";
import { getErrorMessage } from "@/lib/api-error";
type UserRole = 'MEMBER' | 'ADMIN';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('MEMBER');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    setLoading(true);
    setError("");

    const response = await authService.login({
      email,
      password,
    });
    

    if (!response.success) {
      setError(response.message);
      return;
    }

    const user = response.data.user;

    if (user.role === "ADMIN") {
      router.push("/admin");
    } else {
      router.push("/member");
    }
  } catch (err: unknown) {
     setError(getErrorMessage(err));
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-100 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none py-10">
      
      {/* Soft Ambient Light Backdrops (Clean White/Blue Theme) */}
      <div className="absolute top-1/3 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[340px] sm:w-[550px] lg:w-[700px] h-[340px] sm:h-[450px] bg-blue-400/15 rounded-full blur-[100px] sm:blur-[160px] pointer-events-none animate-pulse" />
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-sky-400/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />
      
      {/* Crisp Technical Grid Overlay for Light Theme */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c70a_1px,transparent_1px),linear-gradient(to_bottom,#0284c70a_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />

      <div className="max-w-[440px] w-full relative z-10 mx-auto">
        
        {/* Brand & Logo Header */}
        <div className="flex items-center gap-4 sm:gap-5 mb-6 sm:mb-8 text-left bg-white/80 p-2 sm:p-2 rounded-2xl border border-slate-200/80 shadow-sm backdrop-blur-md">
          
          {/* Logo Left Container with Dark Invert/Filter so dark logo appears properly on white */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 flex items-center justify-center relative">
            <Image
              src="/MKS_logo2.png"
              alt="MKS Logo"
              width={120}
              height={120}
              className="object-contain w-full h-full  drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
              priority
            />
          </div>
          
          {/* Text Right Container */}
          <div className="flex-1 min-w-0">
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight truncate">
              INDUSTRIAL SOLUTIONS
            </h1>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
              Daily Progress & Reporting System
            </p>
          </div>
        </div>

        {/* Elevated White Glass Card */}
        <div className="bg-white/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.08),0_0_0_1px_rgba(255,255,255,0.8)_inset] relative">
          
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent rounded-t-3xl pointer-events-none" />

          {/* Role Switcher Tabs */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-6 sm:mb-8 border border-slate-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)]">
            <button
              type="button"
              onClick={() => setSelectedRole('MEMBER')}
              className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 text-[11px] sm:text-xs font-semibold rounded-xl transition-all duration-300 ${
                selectedRole === 'MEMBER'
                  ? 'bg-gradient-to-b from-blue-500 to-blue-600 text-white shadow-[0_4px_14px_rgba(37,99,235,0.35),0_1px_2px_rgba(255,255,255,0.2)_inset]'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Team Member
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole('ADMIN')}
              className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 text-[11px] sm:text-xs font-semibold rounded-xl transition-all duration-300 ${
                selectedRole === 'ADMIN'
                  ? 'bg-gradient-to-b from-blue-500 to-blue-600 text-white shadow-[0_4px_14px_rgba(37,99,235,0.35),0_1px_2px_rgba(255,255,255,0.2)_inset]'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCog className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Administrator
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1.5 sm:mb-2">
                Work Email
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 transition-colors group-focus-within:text-blue-600" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@mks.com"
                  className="w-full pl-11 pr-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-xs sm:text-sm placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1.5 sm:mb-2">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 transition-colors group-focus-within:text-blue-600" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-xs sm:text-sm placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center text-slate-600 cursor-pointer hover:text-slate-900">
                <input type="checkbox" className="h-4 w-4 bg-slate-100 text-blue-600 focus:ring-blue-500 border-slate-300 rounded cursor-pointer" />
                <span className="ml-2 font-medium">Remember me</span>
              </label>
              <a href="#" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 sm:py-3.5 px-4 bg-gradient-to-b from-blue-500 to-blue-600 text-white font-semibold text-xs sm:text-sm rounded-2xl shadow-[0_8px_20px_rgba(37,99,235,0.35),0_1px_2px_rgba(255,255,255,0.25)_inset] hover:from-blue-600 hover:to-blue-700 active:translate-y-[1px] transition-all"
            >
              {loading
  ? "Signing In..."
  : `Sign In to ${
      selectedRole === "ADMIN"
        ? "Admin"
        : "Member"
    } Portal`}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
          {error && (
  <div className="mb-4 rounded-xl bg-red-100 border border-red-300 p-3 text-sm text-red-700">
    {error}
  </div>
)}
        </div>

        <p className="text-center text-xs text-slate-500 mt-6 tracking-wide font-medium">
          © 2026 MKS Industrial Solutions. All rights reserved.
        </p>
      </div>
    </div>
  );
}