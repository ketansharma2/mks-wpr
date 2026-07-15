'use client';

import { useState } from 'react';
import Link from 'next/link';
import AdminSidebar from '@/app/components/layout/sidebar/admin-sidebar';
import { 
  LayoutDashboard, 
  Users, 
  ClipboardList, 
  FileText, 
  ShieldCheck, 
  ArrowRight, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Briefcase,
  Building
} from 'lucide-react';

export default function AdminDashboardPage() {
  // Admin KPI metrics state
  const [stats] = useState({
    totalMembers: 14,
    activeTasks: 38,
    pendingApprovals: 7,
    completedToday: 19,
    systemHealth: 'Optimal',
  });

  // Recent team activity logs
  const [recentActivities] = useState([
    { id: 1, member: 'Sonu Rana', action: 'Submitted closing summary for Q2 Sales Pipeline', time: '10 mins ago', type: 'task' },
    { id: 2, member: 'Aman Verma', action: 'Logged WPR for Assembly Line Maintenance', time: '25 mins ago', type: 'wpr' },
    { id: 3, member: 'Neha Sharma', action: 'Updated task status to In Progress', time: '1 hour ago', type: 'task' },
  ]);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row select-none">
      
      {/* Admin Sidebar */}
      <AdminSidebar />

      {/* Main Admin Workspace */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Admin Welcome Greeting Banner */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-semibold tracking-wider uppercase mb-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Administrator Control Center
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Welcome back, Admin
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Monitor team operations, review WPR submissions, and dispatch task directives across departments.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/admin/tasks"
                className="flex items-center gap-1.5 py-2.5 px-4 bg-gradient-to-b from-blue-500 to-blue-600 text-white font-semibold text-xs rounded-xl shadow-sm hover:from-blue-600 hover:to-blue-700 transition"
              >
                <ClipboardList className="w-4 h-4" /> Manage Directives
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* ADMIN KPI SUMMARY CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Team Members</span>
                <h3 className="text-2xl font-black text-slate-900">{stats.totalMembers}</h3>
                <span className="text-[10px] text-emerald-600 font-semibold">12 Active Today</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <Users className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Active Task Directives</span>
                <h3 className="text-2xl font-black text-slate-900">{stats.activeTasks}</h3>
                <span className="text-[10px] text-blue-600 font-semibold">Across Departments</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <ClipboardList className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Pending Reviews</span>
                <h3 className="text-2xl font-black text-slate-900">{stats.pendingApprovals}</h3>
                <span className="text-[10px] text-amber-600 font-semibold">Closing Summaries</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                <Clock className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Completed Today</span>
                <h3 className="text-2xl font-black text-slate-900">{stats.completedToday}</h3>
                <span className="text-[10px] text-emerald-600 font-semibold">On-time Deliverables</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>

          </div>

          {/* QUICK ACTIONS & RECENT ACTIVITY */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Quick Actions Panel */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Quick Management</h3>
              
              <div className="space-y-2.5 text-xs">
                <Link 
                  href="/admin/tasks"
                  className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-blue-50/50 border border-slate-200/80 hover:border-blue-200 rounded-2xl transition group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                      +
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 group-hover:text-blue-600 transition">Assign New Task</p>
                      <span className="text-[11px] text-slate-500">Dispatch directives to team members</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition" />
                </Link>

                <Link 
                  href="/admin/members"
                  className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-blue-50/50 border border-slate-200/80 hover:border-blue-200 rounded-2xl transition group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                      👥
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 group-hover:text-blue-600 transition">View Members Directory</p>
                      <span className="text-[11px] text-slate-500">Inspect departmental personnel</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition" />
                </Link>

                <Link 
                  href="/admin/wpr"
                  className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-blue-50/50 border border-slate-200/80 hover:border-blue-200 rounded-2xl transition group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                      📊
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 group-hover:text-blue-600 transition">Audit WPR Reports</p>
                      <span className="text-[11px] text-slate-500">Review daily work progress logs</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition" />
                </Link>
              </div>
            </div>

            {/* Recent Live Team Activity Feed */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Recent Team Activity Stream</h3>
                <span className="text-[11px] text-slate-400 font-medium">Live Feed</span>
              </div>

              <div className="space-y-3">
                {recentActivities.map((act) => (
                  <div key={act.id} className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold flex-shrink-0">
                        {act.member[0]}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{act.member} <span className="font-normal text-slate-600">— {act.action}</span></p>
                        <span className="text-[10px] text-slate-400">{act.time}</span>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-semibold text-slate-600 whitespace-nowrap shadow-2xs">
                      {act.type.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}