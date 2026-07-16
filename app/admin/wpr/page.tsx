'use client';

import { useState } from 'react';
import AdminSidebar from '@/app/components/layout/sidebar/admin-sidebar';
import { FileText, Users, Calendar } from 'lucide-react';

export default function AdminWPRHubPage() {
  // Helper for today's date format (YYYY-MM-DD)
  const getTodayDate = () => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  };

  const todayStr = getTodayDate();

  // Active Tab state ('tasks' or 'meetings')
  const [activeTab, setActiveTab] = useState<'tasks' | 'meetings'>('tasks');

  // Filter States
  const [filterName, setFilterName] = useState('All');
  const [startDate, setStartDate] = useState(todayStr);
  const [endDate, setEndDate] = useState(todayStr);

  // Mock Master Tasks WPR records submitted across all members
 // Master Tasks WPR records submitted across all members with deadline and uploadClosing fields
  const [allTasksWPR] = useState([
    { id: 1, memberName: 'Sonu Rana', department: 'Technical', date: todayStr, deadline: todayStr, task: 'WPR Sheet Automation', trgtMin: '30', type: 'Fixed', status: 'Completed', uploadClosing: 'https://docs.google.com/spreadsheets/d/1DEREIFk0989UfUZrgVM8py_B8eSKJdfcUQjONp1C-QI/edit' },
    { id: 2, memberName: 'Sonu Rana', department: 'Technical', date: todayStr, deadline: todayStr, task: 'Client Sourcing Data Analysis', trgtMin: '120', type: 'Dynamic', status: 'In Progress', uploadClosing: '-' },
    { id: 3, memberName: 'Aman Verma', department: 'Operations', date: todayStr, deadline: todayStr, task: 'Assembly Line Technical Check', trgtMin: '60', type: 'Fixed', status: 'Completed', uploadClosing: '-' },
    { id: 4, memberName: 'Neha Sharma', department: 'Sales', date: '2026-07-14', deadline: '2026-07-14', task: 'Regional Target Allocation', trgtMin: '90', type: 'Dynamic', status: 'Completed', uploadClosing: '-' },
  ]);

  // Mock Master Meetings WPR records submitted across all members
 // Master Meetings WPR records submitted across all members with coPerson, timeSlot, and notes fields
  const [allMeetingsWPR] = useState([
    { id: 1, memberName: 'Sonu Rana', department: 'Technical', date: todayStr, coPerson: 'Vijyant Malik', meeting: 'Morning Operations Sync with Manager', durationMin: '30', timeSlot: '09:30 - 10:00', status: 'Completed', notes: 'Discussed daily sprint deliverables.' },
    { id: 2, memberName: 'Sonu Rana', department: 'Technical', date: todayStr, coPerson: 'Nitin', meeting: 'Technical Architecture Review', durationMin: '45', timeSlot: '11:00 - 11:45', status: 'Scheduled', notes: 'Reviewing Next.js component hierarchy.' },
    { id: 3, memberName: 'Aman Verma', department: 'Operations', date: todayStr, coPerson: 'Pardeep Chahal', meeting: 'Floor Safety Audit', durationMin: '60', timeSlot: '14:00 - 15:00', status: 'Completed', notes: 'Verified mechanical tolerances.' },
    { id: 4, memberName: 'Neha Sharma', department: 'Sales', date: '2026-07-14', coPerson: 'Satender Sharma', meeting: 'Client Sourcing Strategy', durationMin: '45', timeSlot: '16:00 - 16:45', status: 'Completed', notes: 'Allocated North sector pipeline targets.' },
  ]);

  // Unique member names for filter dropdown
  const memberList = ['All', 'Sonu Rana', 'Aman Verma', 'Neha Sharma'];

  // Filtered Tasks WPR logic
  const filteredTasks = allTasksWPR.filter(item => {
    let matchesName = filterName === 'All' || item.memberName === filterName;
    let matchesDate = item.date >= startDate && item.date <= endDate;
    return matchesName && matchesDate;
  });

  // Filtered Meetings WPR logic
  const filteredMeetings = allMeetingsWPR.filter(item => {
    let matchesName = filterName === 'All' || item.memberName === filterName;
    let matchesDate = item.date >= startDate && item.date <= endDate;
    return matchesName && matchesDate;
  });

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row select-none">
      
      {/* Admin Sidebar */}
      <AdminSidebar />

      {/* Main Workspace */}
      <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Header Banner */}
          <div className="bg-white p-3 sm:p-4 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Work Progress Reports
              </h1>
              
            </div>
          </div>

        {/* ADVANCED FILTER BAR (Single Consolidated Row) */}
<div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col xl:flex-row items-center justify-between gap-3">
  
  {/* Member Selector */}
  <div className="flex items-center gap-2 w-full xl:w-auto">
    <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
      <Users className="w-4 h-4" />
    </div>
    <select
      value={filterName}
      onChange={e => setFilterName(e.target.value)}
      className="w-full xl:w-56 bg-slate-50 border border-slate-200 text-slate-900 px-3 py-2 rounded-xl text-xs font-semibold outline-none focus:border-blue-500"
    >
      <option value="All">Filter by Member: All</option>
      {memberList.filter(m => m !== 'All').map(name => (
        <option key={name} value={name}>{name}</option>
      ))}
    </select>
  </div>

  {/* Date Range Inputs */}
  <div className="flex flex-wrap items-center gap-2 text-xs w-full xl:w-auto justify-start xl:justify-center">
    
    <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-2 rounded-xl border border-slate-200">
      <Calendar className="w-3.5 h-3.5 text-blue-600" />
      <span className="text-[10px] text-slate-500 font-semibold">From:</span>
      <input 
        type="date" 
        value={startDate} 
        onChange={e => setStartDate(e.target.value)} 
        style={{ colorScheme: 'light' }}
        className="bg-transparent text-slate-900 font-medium text-[11px] outline-none"
      />
    </div>

    <span className="text-slate-400 font-bold">to</span>

    <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-2 rounded-xl border border-slate-200">
      <Calendar className="w-3.5 h-3.5 text-blue-600" />
      <span className="text-[10px] text-slate-500 font-semibold">To:</span>
      <input 
        type="date" 
        value={endDate} 
        onChange={e => setEndDate(e.target.value)} 
        style={{ colorScheme: 'light' }}
        className="bg-transparent text-slate-900 font-medium text-[11px] outline-none"
      />
    </div>

  </div>

  {/* TAB SWITCHER (WPR Tasks vs WPR Meetings) */}
  <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 w-full xl:w-auto">
    <button
      type="button"
      onClick={() => setActiveTab('tasks')}
      className={`flex-1 xl:flex-none flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl transition ${
        activeTab === 'tasks' 
          ? 'bg-blue-600 text-white shadow-sm' 
          : 'text-slate-600 hover:text-slate-900'
      }`}
    >
      <FileText className="w-3.5 h-3.5" /> Tasks ({filteredTasks.length})
    </button>
    <button
      type="button"
      onClick={() => setActiveTab('meetings')}
      className={`flex-1 xl:flex-none flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl transition ${
        activeTab === 'meetings' 
          ? 'bg-blue-600 text-white shadow-sm' 
          : 'text-slate-600 hover:text-slate-900'
      }`}
    >
      <Users className="w-3.5 h-3.5" /> Meetings ({filteredMeetings.length})
    </button>
  </div>

</div>

          {/* TAB CONTENT: TASKS TABLE */}
{activeTab === 'tasks' && (
  <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Member Tasks Execution Records</h3>
      <span className="text-xs text-slate-500">Showing records from {startDate} to {endDate}</span>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs whitespace-nowrap">
        <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
          <tr>
            <th className="p-3">Member Name</th>
            <th className="p-3">Date</th>
            <th className="p-3">Deadline</th>
            <th className="p-3">Task Directive</th>
            <th className="p-3">Target (Mins)</th>
            <th className="p-3">Type</th>
            <th className="p-3">Status</th>
            <th className="p-3">Upload / Closing Link</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {filteredTasks.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center py-8 text-slate-400 italic">
                No task WPR logs found for the selected filter criteria.
              </td>
            </tr>
          ) : (
            filteredTasks.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50/60 transition">
                <td className="p-3 font-bold text-slate-900">{t.memberName}</td>
                <td className="p-3 font-mono text-slate-500">{t.date}</td>
                <td className="p-3 font-mono text-slate-600">{t.deadline || t.date}</td>
                <td className="p-3 font-semibold text-slate-900">{t.task}</td>
                <td className="p-3 font-mono text-amber-700 font-semibold">{t.trgtMin} mins</td>
                <td className="p-3 text-slate-600">{t.type}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded font-semibold text-[10px] ${
                    t.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                    t.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                    'bg-amber-50 text-amber-700 border border-amber-100'
                  }`}>
                    {t.status}
                  </span>
                </td>
                <td className="p-3 text-slate-600 max-w-xs truncate">
                  {t.uploadClosing && t.uploadClosing !== '-' ? (
                    <a href={t.uploadClosing} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                      {t.uploadClosing}
                    </a>
                  ) : (
                    <span>-</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
)}

         {/* TAB CONTENT: MEETINGS TABLE */}
{activeTab === 'meetings' && (
  <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Member Meetings Logs</h3>
      <span className="text-xs text-slate-500">Showing records from {startDate} to {endDate}</span>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs whitespace-nowrap">
        <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
          <tr>
            <th className="p-3">Date</th>
            <th className="p-3">Member Name</th>
            <th className="p-3">Department</th>
            <th className="p-3">Co-Person</th>
            <th className="p-3">Meeting Title</th>
            <th className="p-3">Duration (Mins)</th>
            <th className="p-3">Time Slot</th>
            <th className="p-3">Status</th>
            <th className="p-3">Notes</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {filteredMeetings.length === 0 ? (
            <tr>
              <td colSpan={9} className="text-center py-8 text-slate-400 italic">
                No meeting WPR logs found for the selected filter criteria.
              </td>
            </tr>
          ) : (
            filteredMeetings.map((m) => (
              <tr key={m.id} className="hover:bg-slate-50/60 transition">
                <td className="p-3 font-mono text-slate-500">{m.date}</td>
                <td className="p-3 font-bold text-slate-900">{m.memberName}</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-semibold text-[11px]">
                    {m.department}
                  </span>
                </td>
                <td className="p-3 text-slate-700 font-medium">{m.coPerson || 'Client / Team'}</td>
                <td className="p-3 font-semibold text-slate-900">{m.meeting}</td>
                <td className="p-3 font-mono text-blue-700 font-semibold">{m.durationMin} mins</td>
                <td className="p-3 font-mono text-slate-600">{m.timeSlot || '09:30 - 10:00'}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded font-semibold text-[10px] ${
                    m.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                    'bg-blue-50 text-blue-700 border border-blue-100'
                  }`}>
                    {m.status}
                  </span>
                </td>
                <td className="p-3 text-slate-600 max-w-xs truncate" title={m.notes || 'No notes added'}>
                  {m.notes || 'Discussed operational sync'}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
)}

        </div>
      </main>
    </div>
  );
}