'use client';

import { useEffect, useState } from "react";
import adminWprService from "@/services/adminWpr.service";
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
  const [taskPage, setTaskPage] = useState(1);
const [meetingPage, setMeetingPage] = useState(1);

const itemsPerPage = 10;
  // Filter States
  const [filterName, setFilterName] = useState('All');
  const [startDate, setStartDate] = useState(todayStr);
  const [endDate, setEndDate] = useState(todayStr);

  // Mock Master Tasks WPR records submitted across all members
 // Master Tasks WPR records submitted across all members with deadline and uploadClosing fields
const [allTasksWPR, setAllTasksWPR] = useState<any[]>([]);

const [allMeetingsWPR, setAllMeetingsWPR] = useState<any[]>([]);

const [loading, setLoading] = useState(false);

  // Unique member names for filter dropdown
const [memberList, setMemberList] = useState<any[]>([]);

const loadMembers = async () => {
  const res = await adminWprService.getMembers();
  setMemberList(res.data);};

useEffect(() => {
  loadMembers();
}, []);
useEffect(() => {
  setTaskPage(1);
  setMeetingPage(1);
  loadData();
}, [activeTab, filterName, startDate, endDate]);

const loadData = async () => {
  try {
    setLoading(true);

    const params = {
      memberId : filterName === "All" ? "" : filterName,
      startDate,
      endDate,
    };

    if (activeTab === "tasks") {
      const res =
        await adminWprService.getTasks(params);
       console.log("Fetched Tasks WPR:", res.data);

      setAllTasksWPR(res.data.items);
    } else {
      const res =
        await adminWprService.getMeetings(params);
       console.log("Fetched Meetings WPR:", res.data);
      setAllMeetingsWPR(res.data.items);
    }
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  // Filtered Tasks WPR logic
 const filteredTasks = allTasksWPR;
const filteredMeetings = allMeetingsWPR;

const taskTotalPages = Math.ceil(filteredTasks.length / itemsPerPage);
const meetingTotalPages = Math.ceil(filteredMeetings.length / itemsPerPage);

const paginatedTasks = filteredTasks.slice(
  (taskPage - 1) * itemsPerPage,
  taskPage * itemsPerPage
);

const paginatedMeetings = filteredMeetings.slice(
  (meetingPage - 1) * itemsPerPage,
  meetingPage * itemsPerPage
);
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
{memberList.map((member: any) => (
  <option key={member._id} value={member._id}>
    {member.name}
  </option>
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
          {paginatedTasks.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center py-8 text-slate-400 italic">
                No task WPR logs found for the selected filter criteria.
              </td>
            </tr>
          ) : (
            paginatedTasks.map((t) => (
              <tr key={t._id} className="hover:bg-slate-50/60 transition">
                <td className="p-3 font-bold text-slate-900">{t.user.name}</td>
                <td className="p-3 font-mono text-slate-500"> {new Date(t.date).toLocaleDateString("en-GB")}</td>
                <td className="p-3 font-mono text-slate-600"> {t.deadline
    ? new Date(t.deadline).toLocaleDateString("en-GB")
    : new Date(t.date).toLocaleDateString("en-GB")}</td>
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
      {filteredTasks.length > 0 && (
  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
    <p className="text-xs text-slate-500">
      Showing{" "}
      {(taskPage - 1) * itemsPerPage + 1}-
      {Math.min(taskPage * itemsPerPage, filteredTasks.length)}{" "}
      of {filteredTasks.length}
    </p>

    <div className="flex items-center gap-2">
      <button
        type="button"
        disabled={taskPage === 1}
        onClick={() => setTaskPage(prev => prev - 1)}
        className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      <span className="text-xs font-semibold text-slate-600">
        Page {taskPage} of {taskTotalPages}
      </span>

      <button
        type="button"
        disabled={taskPage === taskTotalPages}
        onClick={() => setTaskPage(prev => prev + 1)}
        className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  </div>
)}
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
          {paginatedMeetings.length === 0 ? (
            <tr>
              <td colSpan={9} className="text-center py-8 text-slate-400 italic">
                No meeting WPR logs found for the selected filter criteria.
              </td>
            </tr>
          ) : (
            paginatedMeetings.map((m) => (
              <tr key={m._id} className="hover:bg-slate-50/60 transition">
                <td className="p-3 font-mono text-slate-500">{new Date(m.date).toLocaleDateString("en-GB")}</td>
                <td className="p-3 font-bold text-slate-900">{m.user?.name || 'Unknown Member'}</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-semibold text-[11px]">
                    {m.user.department}
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
              {filteredMeetings.length > 0 && (
  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
    <p className="text-xs text-slate-500">
      Showing{" "}
      {(meetingPage - 1) * itemsPerPage + 1}-
      {Math.min(meetingPage * itemsPerPage, filteredMeetings.length)}{" "}
      of {filteredMeetings.length}
    </p>

    <div className="flex items-center gap-2">
      <button
        type="button"
        disabled={meetingPage === 1}
        onClick={() => setMeetingPage(prev => prev - 1)}
        className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      <span className="text-xs font-semibold text-slate-600">
        Page {meetingPage} of {meetingTotalPages}
      </span>

      <button
        type="button"
        disabled={meetingPage === meetingTotalPages}
        onClick={() => setMeetingPage(prev => prev + 1)}
        className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  </div>
)}
  </div>
)}

        </div>
      </main>
    </div>
  );
}