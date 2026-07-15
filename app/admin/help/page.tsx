'use client';

import { useState } from 'react';
import AdminSidebar from '@/app/components/layout/sidebar/admin-sidebar';
import { HelpCircle, ShieldCheck, CheckCircle2, Calendar, Search, Filter, MessageSquare, X } from 'lucide-react';

export default function AdminHelpPage() {
  // Helper for today's date format (YYYY-MM-DD)
  const getTodayDate = () => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  };

  const todayStr = getTodayDate();

  // Mock member issues database
  const [memberIssues, setMemberIssues] = useState([
    { id: 1, memberName: 'Sonu Rana', department: 'Technical', issueDate: '2026-07-12', issue: 'Faced minor latency while loading the WPR task summary table during morning sync.', status: 'Pending', resolvedDate: '-', remark: '-' },
    { id: 2, memberName: 'Aman Verma', department: 'Operations', issueDate: '2026-07-10', issue: 'Requesting permission update for accessing monthly maintenance report templates.', status: 'Resolved', resolvedDate: '2026-07-11', remark: 'Permissions updated successfully.' },
    { id: 3, memberName: 'Neha Sharma', department: 'Sales', issueDate: '2026-07-14', issue: 'Unable to attach Google Sheets deliverable link to Task #1. Please check URL input validator.', status: 'Pending', resolvedDate: '-', remark: '-' },
  ]);

  // Filters State
  const [startDate, setStartDate] = useState('2026-07-01');
  const [endDate, setEndDate] = useState(todayStr);
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal State for updating status & remark
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIssueId, setActiveIssueId] = useState<number | null>(null);
  const [newStatus, setNewStatus] = useState('Resolved');
  const [newRemark, setNewRemark] = useState('');

  const openUpdateModal = (id: number, currentRemark: string, currentStatus: string) => {
    setActiveIssueId(id);
    setNewStatus(currentStatus === 'Pending' ? 'Resolved' : currentStatus);
    setNewRemark(currentRemark === '-' ? '' : currentRemark);
    setIsModalOpen(true);
  };

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeIssueId === null) return;

    setMemberIssues(prev =>
      prev.map(item => {
        if (item.id === activeIssueId) {
          return {
            ...item,
            status: newStatus,
            resolvedDate: newStatus === 'Resolved' ? todayStr : '-',
            remark: newRemark.trim() ? newRemark : 'No remarks provided'
          };
        }
        return item;
      })
    );

    setIsModalOpen(false);
    setActiveIssueId(null);
    setNewRemark('');
  };

  // Filter logic
  const filteredIssues = memberIssues.filter(item => {
    let matchesDate = item.issueDate >= startDate && item.issueDate <= endDate;
    let matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesDate && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row select-none">
      
      {/* Admin Sidebar */}
      <AdminSidebar />

      {/* Main Workspace */}
      <main className="flex-1 p-4 sm:p-4 lg:p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-4">
          
          {/* Header Banner */}
          <div className="bg-white p-5 sm:p-4 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Help & Member Issue Logs
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Audit support tickets, track resolution status, and update administrative remarks.
              </p>
            </div>
          </div>

          {/* FILTER CONTROLS BAR */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-3 text-xs">
            
            <div className="flex items-center gap-2 w-full lg:w-auto">
              <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                <Filter className="w-4 h-4" />
              </div>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="w-full lg:w-48 bg-slate-50 border border-slate-200 text-slate-900 px-3 py-2 rounded-xl font-semibold outline-none focus:border-blue-500"
              >
                <option value="All">Status: All</option>
                <option value="Pending">Pending</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            {/* Date Range Inputs */}
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-end">
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

          </div>

          {/* ISSUES TABLE CONTAINER */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Member Support Tickets Log</h3>
              </div>
              <span className="text-xs font-semibold px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100">
                {filteredIssues.length} Records Found
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
                  <tr>
                    <th className="p-3">Issue Date</th>
                    <th className="p-3">Member Name</th>
                    <th className="p-3">Department</th>
                    <th className="p-3">Reported Issue</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Resolved Date</th>
                    <th className="p-3">Remark</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredIssues.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center py-8 text-slate-400 italic">
                        No support tickets found matching the selected filters.
                      </td>
                    </tr>
                  ) : (
                    filteredIssues.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/60 transition">
                        <td className="p-3 font-mono text-slate-500">{item.issueDate}</td>
                        <td className="p-3 font-bold text-slate-900">{item.memberName}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-semibold text-[11px]">
                            {item.department}
                          </span>
                        </td>
                        <td className="p-3 text-slate-800 max-w-xs truncate" title={item.issue}>{item.issue}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded font-semibold text-[10px] ${
                            item.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-amber-50 text-amber-700 border border-amber-100'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="p-3 font-mono text-slate-600">{item.resolvedDate}</td>
                        <td className="p-3 text-slate-600 max-w-xs truncate" title={item.remark}>{item.remark}</td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => openUpdateModal(item.id, item.remark, item.status)}
                            className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded-xl transition border border-blue-200"
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>

      {/* UPDATE STATUS & REMARK MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl text-slate-800">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-600" /> Update Ticket Resolution
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-900 p-1 rounded-lg hover:bg-slate-200/60 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="p-6 space-y-4 text-xs">
              
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Update Status</label>
                <select
                  value={newStatus}
                  onChange={e => setNewStatus(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 outline-none focus:border-blue-500 font-semibold"
                >
                  <option value="Pending">Pending</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Administrative Remark</label>
                <textarea
                  rows={3}
                  value={newRemark}
                  onChange={e => setNewRemark(e.target.value)}
                  placeholder="Enter resolution notes or instructions..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 outline-none focus:border-blue-500 resize-none font-medium"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl flex items-center gap-1.5 transition shadow-sm"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Save Changes
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}