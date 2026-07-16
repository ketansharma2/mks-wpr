'use client';

import { useState } from 'react';
import Link from 'next/link';
import AdminSidebar from '@/app/components/layout/sidebar/admin-sidebar';
import { Users, FileText, Building, HelpCircle, ShieldCheck, ArrowUpRight, ExternalLink } from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats] = useState({
    totalMembers: 12,
    activeTasksWPR: 28,
    pendingSupportTickets: 2,
    companyDocs: 4
  });

  const [recentActivities] = useState([
    { id: 1, type: 'WPR', text: 'Sonu Rana submitted task WPR: WPR Sheet Automation', time: '10m ago', status: 'Completed' },
    { id: 2, type: 'SUPPORT', text: 'Neha Sharma raised a support ticket regarding Google Sheets validator', time: '1h ago', status: 'Pending' },
    { id: 3, type: 'MEMBER', text: 'Aman Verma profile credentials updated by Admin', time: '3h ago', status: 'Active' },
    { id: 4, type: 'HIERARCHY', text: 'New Canva Hierarchy PDF chart version uploaded', time: '1d ago', status: 'Updated' },
  ]);

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
                <h3 className="text-xl font-black text-slate-900 mt-0.5">{stats.activeTasksWPR}</h3>
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
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Support Tickets</span>
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
    {recentActivities.map((act) => (
      <div key={act.id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="px-2 py-1 bg-blue-100 text-blue-700 font-bold rounded-lg text-[10px] flex-shrink-0">
            {act.type}
          </span>
          <p className="font-semibold text-slate-900 truncate">{act.text}</p>
        </div>
        
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <span className="text-[10px] text-slate-400 font-mono">{act.time}</span>
          <span className={`px-2 py-0.5 rounded font-semibold text-[10px] whitespace-nowrap ${
            act.status === 'Completed' || act.status === 'Active' || act.status === 'Updated' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-amber-50 text-amber-700 border border-amber-100'
          }`}>
            {act.status}
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