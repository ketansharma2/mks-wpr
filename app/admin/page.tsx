'use client';

import { useEffect, useState } from "react";
import adminDashboardService from "@/services/adminDashboard.service";
import Link from 'next/link';
import AdminSidebar from '@/app/components/layout/sidebar/admin-sidebar';
import { Users, FileText, Building, HelpCircle, ShieldCheck, ArrowUpRight, ExternalLink } from 'lucide-react';
import activityLogService from "@/services/activityLog.service";
export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
  totalMembers: 0,
  todayWprSubmitted: 0,
  pendingSupportTickets: 0,
  companyDocs: 0,
});

  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [activityLogs, setActivityLogs] = useState<any[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchDashboard();
}, []);

const fetchDashboard = async () => {
  try {
    setLoading(true);

  const [dashboard, logs] = await Promise.all([
  adminDashboardService.getDashboard(),
  activityLogService.getLogs({
    limit: 10,
  }),
]);
    setStats({
      totalMembers:
    dashboard.data.stats.totalMembers,

  todayWprSubmitted:
    dashboard.data.stats.todayWprSubmitted,

  pendingSupportTickets:
    dashboard.data.stats.pendingIssues,

  companyDocs:
    dashboard.data.stats.totalRoleOverview,
    });
    setActivityLogs(logs.data.items);
    
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row select-none">
      
      {/* Admin Sidebar */}
      <AdminSidebar />

      {/* Main Workspace */}
      <main className="flex-1 p-3 sm:p-5 lg:p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-4">
          
          {/* Header Banner with Compact Quick Links on Upper Right */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div>
              
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                Admin Command Dashboard
              </h1>
            </div>

            {/* Quick Navigation Pills on Upper Right */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
              <Link href="/admin/members" className="px-3 py-1.5 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200/80 rounded-xl transition flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-blue-600" /> Members
              </Link>
              <Link href="/admin/wpr" className="px-3 py-1.5 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200/80 rounded-xl transition flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-indigo-600" /> WPR
              </Link>
              <Link href="/admin/rnr" className="px-3 py-1.5 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200/80 rounded-xl transition flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-amber-600" /> R&R
              </Link>
              <Link href="/admin/hierarchy" className="px-3 py-1.5 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200/80 rounded-xl transition flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-emerald-600" /> Hierarchy
              </Link>
              <Link href="/admin/help" className="px-3 py-1.5 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200/80 rounded-xl transition flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-rose-600" /> Help
              </Link>
            </div>
          </div>

          {/* COMPACT METRICS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            <Link href="/admin/members" className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm hover:border-blue-300 transition group flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Team Members</span>
                <h3 className="text-xl font-black text-slate-900 mt-0.5">{stats.totalMembers}</h3>
              </div>
              <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-105 transition">
                <Users className="w-4 h-4" />
              </div>
            </Link>

            <Link href="/admin/wpr" className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm hover:border-blue-300 transition group flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">WPR Execution</span>
                <h3 className="text-xl font-black text-slate-900 mt-0.5">{stats.todayWprSubmitted}</h3>
              </div>
              <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-105 transition">
                <FileText className="w-4 h-4" />
              </div>
            </Link>

            <Link href="/admin/hierarchy" className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm hover:border-blue-300 transition group flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Company Docs</span>
                <h3 className="text-xl font-black text-slate-900 mt-0.5">{stats.companyDocs}</h3>
              </div>
              <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 group-hover:scale-105 transition">
                <Building className="w-4 h-4" />
              </div>
            </Link>

            <Link href="/admin/help" className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm hover:border-blue-300 transition group flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pending Tickets</span>
                <h3 className="text-xl font-black text-slate-900 mt-0.5">{stats.pendingSupportTickets}</h3>
              </div>
              <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 group-hover:scale-105 transition">
                <HelpCircle className="w-4 h-4" />
              </div>
            </Link>

          </div>

          {/* RECENT SYSTEM ACTIVITY FEED */}
<div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Live System Activity Logs</h3>
    <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">Live Sync</span>
  </div>

  <div className="space-y-2">
  {activityLogs.map((log: any) => (
    <div
      key={log._id}
      className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between gap-3 text-xs"
    >
      <div className="flex items-center gap-3 min-w-0">
        <span className="px-2 py-1 bg-blue-100 text-blue-700 font-bold rounded-lg text-[10px]">
          {log.module}
        </span>

        <div className="min-w-0">
          <p className="font-semibold text-slate-900 truncate">
            {log.description}
          </p>

          <p className="text-[11px] text-slate-500">
            {log.name} • {log.role}
          </p>
        </div>
      </div>

      <div className="text-right flex-shrink-0">
        <p className="text-[10px] text-slate-400">
          {new Date(log.createdAt).toLocaleString("en-IN")}
        </p>

        <span className="inline-block mt-1 px-2 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-semibold">
          {log.action}
        </span>
      </div>
    </div>
  ))}
</div>
</div>

        </div>
      </main>
    </div>
  );
}