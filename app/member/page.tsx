'use client';

import { useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/app/components/layout/sidebar/sidebar';
import { FileText, ClipboardList, CheckCircle2, Clock, ArrowRight, TrendingUp, Calendar, ShieldCheck, CheckSquare, Users, AlertCircle, PlayCircle, XCircle } from 'lucide-react';

export default function MemberDashboardPage() {
  // Helper for today's date format (YYYY-MM-DD)
  const getTodayDate = () => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  };

  const todayStr = getTodayDate();

  const [startDate, setStartDate] = useState(todayStr);
  const [endDate, setEndDate] = useState(todayStr);

  // Monthly KPI Stats state
  const [stats] = useState({
    totalTasks: 45,
    completed: 32,
    notStarted: 4,
    inProgress: 6,
    onHold: 2,
    cancelled: 1,
    totalMeetingsAttended: 18,
    wprStreak: 14,
  });

  // Simulated live tasks & meetings list (jismein aaj ki date ke records honge)
  const [todayTasks] = useState([
    { id: 1, date: todayStr, task: 'WPR Sheet Fill', trgtMin: '30', type: 'Fixed', status: 'Not Started' },
    { id: 2, date: todayStr, task: 'Client Sourcing Data Analysis', trgtMin: '120', type: 'Dynamic', status: 'In Progress' },
    { id: 3, date: todayStr, task: 'Assembly Line Technical Check', trgtMin: '60', type: 'Fixed', status: 'Completed' },
  ]);

  const [todayMeetings] = useState([
    { id: 1, date: todayStr, meeting: 'Morning Operations Sync with Manager', durationMin: '30', status: 'Completed' },
    { id: 2, date: todayStr, task: 'Technical Architecture Review', durationMin: '45', status: 'Scheduled' },
  ]);

  // Calculations for Today's Summary
  const totalTargetMinutes = todayTasks.reduce((acc, curr) => acc + (Number(curr.trgtMin) || 0), 0);
  const totalMeetingMinutes = todayMeetings.reduce((acc, curr) => acc + (Number(curr.durationMin) || 0), 0);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row select-none">
      
      {/* 3D Expandable Sidebar */}
      <Sidebar />

      {/* Main Dashboard Workspace */}
      <main className="flex-1 p-4 sm:p-4 lg:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-4">
          
          {/* Welcome Greeting Banner (Made more compact & clean white theme) */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                Welcome back, Sonu Rana
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Here is your daily execution overview and reporting summary.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/member/wpr"
                className="flex items-center gap-1.5 py-2 px-4 bg-gradient-to-b from-blue-500 to-blue-600 text-white font-semibold text-xs rounded-xl shadow-sm hover:from-blue-600 hover:to-blue-700 transition"
              >
                <FileText className="w-3.5 h-3.5" /> Open WPR Portal
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* SECTION 1: WPR REPORT SUMMARY CARDS CONTAINER WITH LIGHT BACKGROUND */}
<div className="bg-slate-50/70 border-slate-200 p-5 sm:p-6 rounded-3xl space-y-4 shadow-sm">
  
  {/* Header with Inline Date Filter on the Right */}
  <div className="bg-white border border-sky-100 p-3 sm:px-4 sm:py-3 rounded-2xl shadow-sm flex flex-col lg:flex-row items-center justify-between gap-3 text-slate-800">
    
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
        <FileText className="w-4 h-4" />
      </div>
      <div>
        <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900">WPR Report Summary</h3>
      </div>
    </div>

    {/* Inline Date Inputs & Apply Button */}
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200">
        <span className="text-[10px] text-slate-500 font-semibold">From:</span>
        <input 
          type="date" 
          value={startDate} 
          onChange={e => {
            const val = e.target.value;
            setStartDate(val);
          }} 
          style={{ colorScheme: 'light' }}
          className="bg-transparent text-slate-900 font-medium text-[11px] outline-none"
        />
      </div>

      <span className="text-slate-400 font-bold">to</span>

      <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200">
        <span className="text-[10px] text-slate-500 font-semibold">To:</span>
        <input 
          type="date" 
          value={endDate} 
          onChange={e => {
            const val = e.target.value;
            setEndDate(val);
          }} 
          style={{ colorScheme: 'light' }}
          className="bg-transparent text-slate-900 font-medium text-[11px] outline-none"
        />
      </div>

      <button 
        type="button"
        onClick={() => {
          console.log("Filtering WPR summary for range:", startDate, "to", endDate);
        }}
        className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs transition shadow-sm"
      >
        Apply
      </button>
    </div>

  </div>

  {/* Summary Cards Grid */}
  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
    
    <div className="bg-gradient-to-b from-white to-slate-50/80 p-3.5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group">
      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-slate-600 transition">Total Tasks</span>
      <span className="text-xl sm:text-2xl font-black text-slate-900 mt-2 tracking-tight">{stats.totalTasks}</span>
    </div>

    <div className="bg-gradient-to-b from-emerald-50/60 to-white p-3.5 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300 flex flex-col justify-between group">
      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Completed</span>
      <span className="text-xl sm:text-2xl font-black text-emerald-950 mt-2 tracking-tight">{stats.completed}</span>
    </div>

    <div className="bg-gradient-to-b from-slate-50 to-white p-3.5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group">
      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Not Started</span>
      <span className="text-xl sm:text-2xl font-black text-slate-900 mt-2 tracking-tight">{stats.notStarted}</span>
    </div>

    <div className="bg-gradient-to-b from-blue-50/60 to-white p-3.5 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 flex flex-col justify-between group">
      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">In Progress</span>
      <span className="text-xl sm:text-2xl font-black text-blue-950 mt-2 tracking-tight">{stats.inProgress}</span>
    </div>

    <div className="bg-gradient-to-b from-amber-50/60 to-white p-3.5 rounded-2xl border border-amber-100 shadow-sm hover:shadow-md hover:border-amber-200 transition-all duration-300 flex flex-col justify-between group">
      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">On Hold</span>
      <span className="text-xl sm:text-2xl font-black text-amber-950 mt-2 tracking-tight">{stats.onHold}</span>
    </div>

    <div className="bg-gradient-to-b from-rose-50/60 to-white p-3.5 rounded-2xl border border-rose-100 shadow-sm hover:shadow-md hover:border-rose-200 transition-all duration-300 flex flex-col justify-between group">
      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600">Cancelled</span>
      <span className="text-xl sm:text-2xl font-black text-rose-950 mt-2 tracking-tight">{stats.cancelled}</span>
    </div>

    <div className="bg-gradient-to-b from-indigo-50/60 to-white p-3.5 rounded-2xl border border-indigo-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-300 flex flex-col justify-between group">
      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">Meetings</span>
      <span className="text-xl sm:text-2xl font-black text-indigo-950 mt-2 tracking-tight">{stats.totalMeetingsAttended}</span>
    </div>

    <div className="bg-gradient-to-b from-violet-50/60 to-white p-3.5 rounded-2xl border border-violet-100 shadow-sm hover:shadow-md hover:border-violet-200 transition-all duration-300 flex flex-col justify-between group">
      <span className="text-[10px] font-bold uppercase tracking-wider text-violet-600">WPR Streak</span>
      <span className="text-xl sm:text-2xl font-black text-violet-950 mt-2 tracking-tight">{stats.wprStreak} <span className="text-xs font-semibold text-violet-500">Days</span></span>
    </div>

  </div>
</div>

         {/* SECTION 2 & 3 COMBINED: TODAY EXECUTION CONTAINER WITH BACKGROUND */}
{/* SECTION 2 & 3 COMBINED: TODAY EXECUTION CONTAINER WITH LIGHT BLUE BACKGROUND */}
<div className="bg-sky-50/70 border border-sky-100 p-5 sm:p-6 rounded-3xl space-y-5 shadow-sm">
  
  {/* Today View Heading & Total Metrics */}
  <div className="bg-white border border-sky-100 p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
    <div>
      <h2 className="text-base sm:text-lg font-bold text-slate-900">Today&apos;s Execution View ({todayStr})</h2>
    </div>
    <div className="flex flex-wrap items-center gap-3 text-xs">
      <div className="bg-sky-50/80 px-3 py-1.5 rounded-xl border border-sky-100">
        <span className="text-slate-500">Total Task Target:</span> <strong className="text-amber-700">{totalTargetMinutes} mins</strong>
      </div>
      <div className="bg-sky-50/80 px-3 py-1.5 rounded-xl border border-sky-100">
        <span className="text-slate-500">Total Meeting Time:</span> <strong className="text-blue-700">{totalMeetingMinutes} mins</strong>
      </div>
    </div>
  </div>

  {/* Two Separate Divs (Today Tasks & Today Meetings) */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    
    {/* Today Tasks Div */}
    <div className="bg-white p-6 rounded-3xl border border-sky-100 shadow-sm flex flex-col justify-between space-y-4">
      <div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Today&apos;s Tasks</h3>
          </div>
          <Link
            href="/member/wpr"
            className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-[11px] rounded-lg flex items-center gap-1.5 transition shadow-sm"
          >
            Update Tasks <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-2.5">
          {todayTasks.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-4">No tasks logged for today.</p>
          ) : (
            todayTasks.map((t) => (
              <div key={t.id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between gap-3 text-xs">
                <div>
                  <p className="font-bold text-slate-900">{t.task}</p>
                  <span className="text-[10px] text-slate-500">Target: {t.trgtMin || '0'} mins | Type: {t.type}</span>
                </div>
                <span className="px-2 py-1 bg-white font-semibold text-slate-700 border border-slate-200 rounded-lg shadow-2xs whitespace-nowrap">
                  {t.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>

    {/* Today Meetings Div */}
    <div className="bg-white p-6 rounded-3xl border border-sky-100 shadow-sm flex flex-col justify-between space-y-4">
      <div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Today&apos;s Meetings</h3>
          </div>
          <Link
            href="/member/wpr"
            className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-[11px] rounded-lg flex items-center gap-1.5 transition shadow-sm"
          >
            Update Meetings <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-2.5">
          {todayMeetings.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-4">No meetings scheduled for today.</p>
          ) : (
            todayMeetings.map((m) => (
              <div key={m.id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between gap-3 text-xs">
                <div>
                  <p className="font-bold text-slate-900">{m.meeting}</p>
                  <span className="text-[10px] text-slate-500">Duration: {m.durationMin || '0'} mins</span>
                </div>
                <span className="px-2 py-1 bg-white font-semibold text-slate-700 border border-slate-200 rounded-lg shadow-2xs whitespace-nowrap">
                  {m.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>

  </div>

</div>

        </div>
      </main>
    </div>
  );
}