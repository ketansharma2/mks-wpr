'use client';

import { useState } from 'react';
import Sidebar from '@/app/components/layout/sidebar/sidebar';
import { Plus, Trash2, Users, CheckSquare, Calendar, Filter, Edit2 } from 'lucide-react';

interface WprItem {
  id: number;
  date: string;
  timeline: string;
  task: string;
  trgtMin: string;
  type: string;
  status: string;
  upload: string;
}

interface MeetingItem {
  id: number;
  date: string; // Format: YYYY-MM-DD
  dept: string;
  attendees: string;
  topic: string;
  time: string;
  propSlot: string;
  status: string;
  notes: string;
}

export default function WprPage() {
  const getTodayDate = () => new Date().toISOString().split('T')[0];
  const getYesterdayDate = () => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split('T')[0];
  };

  // Filter modes: 'preset' (Today/Yesterday dropdown) or 'range' (Date range)
  const [filterMode, setFilterMode] = useState<'preset' | 'range'>('preset');
  const [presetValue, setPresetValue] = useState<'today' | 'yesterday'>('today');
  const [startDate, setStartDate] = useState(getYesterdayDate());
  const [endDate, setEndDate] = useState(getTodayDate());

  // Master lists for all tasks & meetings with dates
 const [tasks, setTasks] = useState<WprItem[]>([
  { id: 1, date: getTodayDate(), timeline: '2026-07-13', task: 'Data Cleaning', trgtMin: '120', type: 'Fixed', status: 'Done', upload: '-' },
  { id: 2, date: getYesterdayDate(), timeline: '2026-07-12', task: 'Dashboard Update', trgtMin: '180', type: 'Variable', status: 'Done', upload: '-' },
  { id: 3, date: getYesterdayDate(), timeline: '2026-07-12', task: 'Team Brainstorming', trgtMin: '60', type: 'Team', status: 'In Progress', upload: '-' },
  { id: 4, date: getTodayDate(), timeline: '2026-07-13', task: 'Fix Bug #404', trgtMin: '45', type: 'Fixed', status: 'In Progress', upload: 'https://docs.google.com/...' },
  { id: 5, date: getYesterdayDate(), timeline: '2026-07-12', task: 'Weekly Report Generation', trgtMin: '90', type: 'Variable', status: 'Done', upload: '-' },
  { id: 6, date: getYesterdayDate(), timeline: '2026-07-12', task: 'Internal Audit', trgtMin: '120', type: 'Collab', status: 'On Hold', upload: '-' },
  { id: 7, date: getTodayDate(), timeline: '2026-07-13', task: 'Database Optimization', trgtMin: '200', type: 'Fixed', status: 'Not Started', upload: '-' },
  { id: 8, date: getTodayDate(), timeline: '2026-07-13', task: 'Create Presentations', trgtMin: '45', type: 'Unplanned', status: 'Done', upload: '-' },
]);

const [meetings, setMeetings] = useState<MeetingItem[]>([
  { id: 1, date: getTodayDate(), dept: 'All', attendees: 'Team Meet', topic: 'Daily Sync', time: '30', propSlot: 'Slot A', status: 'Completed', notes: 'Discussed project pipeline targets' },
  { id: 2, date: getYesterdayDate(), dept: 'HR', attendees: 'Jyoti Malhotra', topic: 'Management Review', time: '60', propSlot: 'Slot B', status: 'Completed', notes: 'Reviewed weekly KPIs' },
  { id: 3, date: getYesterdayDate(), dept: 'Sales', attendees: 'Sachin', topic: 'Lead Conversion', time: '45', propSlot: 'Slot A', status: 'Completed', notes: 'Closing potential leads' },
  { id: 4, date: getTodayDate(), dept: 'Technical', attendees: 'Nitin', topic: 'System Patch', time: '20', propSlot: 'Slot B', status: 'Scheduled', notes: 'Emergency patch deployment' },
  { id: 5, date: getYesterdayDate(), dept: 'HR', attendees: 'Pardeep chahal', topic: 'Policy Update', time: '30', propSlot: 'Slot C', status: 'Completed', notes: 'New attendance policy' },
  { id: 6, date: getYesterdayDate(), dept: 'Operations', attendees: 'Virender Kumar', topic: 'Supply Chain Sync', time: '40', propSlot: 'Slot A', status: 'On Hold', notes: 'Vendor delays update' },
  { id: 7, date: getTodayDate(), dept: 'CEO', attendees: 'Diwakar', topic: 'Q3 Strategy', time: '90', propSlot: 'Slot B', status: 'Proposal', notes: 'Q3 strategy draft review' },
  { id: 8, date: getTodayDate(), dept: 'Digital Mkg', attendees: 'Ketan Sharma', topic: 'Campaign Launch', time: '25', propSlot: 'Slot C', status: 'Scheduled', notes: 'Social media assets planning' },
]);

  // Form states
  const [taskForm, setTaskForm] = useState({ date: getTodayDate(), timeline: '', task: '', trgtMin: '', type: '', status: 'In Progress', upload: '' });
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [meetingForm, setMeetingForm] = useState({ date: getTodayDate(), dept: '', attendees: '', topic: '', time: '', propSlot: '', status: 'Scheduled', notes: '' });
  const [editingMeetingId, setEditingMeetingId] = useState<number | null>(null);

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskForm.task) return;
    if (editingTaskId !== null) {
      setTasks(tasks.map(i => i.id === editingTaskId ? { ...taskForm, id: editingTaskId } : i));
      setEditingTaskId(null);
    } else {
      setTasks([...tasks, { ...taskForm, id: Date.now() }]);
    }
    setTaskForm({ date: getTodayDate(), timeline: '', task: '', trgtMin: '', type: '', status: 'In Progress', upload: '' });
  };

  const handleMeetingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetingForm.topic) return;
    if (editingMeetingId !== null) {
      setMeetings(meetings.map(i => i.id === editingMeetingId ? { ...meetingForm, id: editingMeetingId } : i));
      setEditingMeetingId(null);
    } else {
      setMeetings([...meetings, { ...meetingForm, id: Date.now() }]);
    }
    setMeetingForm({ date: getTodayDate(), dept: '', attendees: '', topic: '', time: '', propSlot: '', status: 'Scheduled', notes: '' });
  };

  // Filter logic based on selection
  const filteredTasks = tasks.filter(item => {
    if (filterMode === 'preset') {
      const targetDate = presetValue === 'today' ? getTodayDate() : getYesterdayDate();
      return item.date === targetDate;
    } else {
      return item.date >= startDate && item.date <= endDate;
    }
  });

  const filteredMeetings = meetings.filter(item => {
    if (filterMode === 'preset') {
      const targetDate = presetValue === 'today' ? getTodayDate() : getYesterdayDate();
      return item.date === targetDate;
    } else {
      return item.date >= startDate && item.date <= endDate;
    }
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row select-none" style={{ fontFamily: 'Cambria, serif' }}>
      <Sidebar />

      <main className="flex-1 p-3 sm:p-5 lg:p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-5">
{/* TOP BANNER & STICKY OPEN FILTERS BAR */}
<div className="sticky top-0 z-20 bg-white py-3.5 px-4 rounded-2xl shadow-sm border border-slate-200 space-y-3 backdrop-blur-md bg-opacity-95">
  <div className="flex flex-col xl:flex-row items-center justify-between gap-3">
    <h1 className="text-sm sm:text-base font-bold uppercase tracking-wider text-slate-900">
      Work Progress Report (WPR)
    </h1>
    
    {/* Permanent Open Filters Group (Light Theme) */}
    <div className="flex flex-wrap items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200 text-xs text-slate-700">
      
      <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-xl border border-slate-200 shadow-2xs">
        <Filter className="w-3.5 h-3.5 text-blue-600" />
        <span className="text-[11px] text-slate-600 font-semibold">Quick:</span>
      </div>

      <button
        type="button"
        onClick={() => { setFilterMode('preset'); setPresetValue('today'); }}
        className={`px-3 py-1 rounded-xl font-semibold transition shadow-2xs ${filterMode === 'preset' && presetValue === 'today' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'}`}
      >
        Today
      </button>
      <button
        type="button"
        onClick={() => { setFilterMode('preset'); setPresetValue('yesterday'); }}
        className={`px-3 py-1 rounded-xl font-semibold transition shadow-2xs ${filterMode === 'preset' && presetValue === 'yesterday' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'}`}
      >
        Yesterday
      </button>

      <span className="text-slate-300 font-bold px-1">/</span>

      {/* Date Range Always Visible */}
      <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
        <Calendar className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
        <span className="text-[11px] text-slate-600 font-semibold">Range:</span>
        <input 
          type="date" 
          value={startDate} 
          onChange={e => { setFilterMode('range'); setStartDate(e.target.value); }} 
          style={{ colorScheme: 'light' }}
          className="bg-slate-50 text-slate-900 font-medium px-2 py-0.5 rounded text-[11px] border border-slate-200 outline-none"
        />
        <span className="text-[11px] text-slate-400">to</span>
        <input 
          type="date" 
          value={endDate} 
          onChange={e => { setFilterMode('range'); setEndDate(e.target.value); }} 
          style={{ colorScheme: 'light' }}
          className="bg-slate-50 text-slate-900 font-medium px-2 py-0.5 rounded text-[11px] border border-slate-200 outline-none"
        />
      </div>

    </div>
  </div>
</div>

{/* SECTION 1: TASK SECTION */}
<section className="bg-sky-50/30 p-4 rounded-xl border border-sky-200 shadow-sm space-y-3">
  
  {/* Heading with "Add Fixed Task" Button on the Right */}
  <div className="flex flex-col sm:flex-row items-center justify-between gap-2 bg-sky-100/70 border border-sky-200 py-2 px-3 rounded-lg text-sky-900 text-xs font-bold uppercase tracking-wide">
    <div className="flex items-center gap-1.5 mx-auto sm:mx-0">
      <CheckSquare className="w-4 h-4" /> Tasks List
    </div>

    {/* Auto-Add Fixed Tasks from RnR Button */}
    <button
      type="button"
      onClick={() => {
        const today = getTodayDate();
        
        // Aapke predefined RnR fixed/daily tasks list
        const fixedRnRTasks = [
          { task: 'WPR Sheet Fill', trgtMin: '', type: 'Fixed', status: 'Not Started', upload: '-' },
          { task: 'Daily Sync & Report Update', trgtMin: '', type: 'Fixed', status: 'Not Started', upload: '-' }
        ];

        // Check karein ki aaj ke liye ye tasks pehle se added toh nahi hain, agar nahi toh add kar dein
        const newTasksToAdd = fixedRnRTasks.filter(
          fixedTask => !tasks.some(t => t.date === today && t.task === fixedTask.task)
        );

        if (newTasksToAdd.length === 0) {
          alert('Today\'s fixed tasks are already added!');
          return;
        }

        const formattedNewTasks = newTasksToAdd.map((item, index) => ({
          id: Date.now() + index,
          date: today,
          timeline: today, // Deadline aaj ki date set ho jayegi kyuki daily task hai
          task: item.task,
          trgtMin: item.trgtMin,
          type: item.type,
          status: item.status,
          upload: item.upload
        }));

        setTasks([...tasks, ...formattedNewTasks]);
      }}
      className="px-3 py-1 bg-sky-700 hover:bg-sky-800 text-white rounded-md text-[11px] font-semibold transition shadow-sm  first-letter:uppercase tracking-normal"
    >
      + Add Fixed Task
    </button>
  </div>

  <form onSubmit={handleTaskSubmit} className="bg-white p-3 rounded-xl border border-sky-200">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-2 text-xs items-center">
      
      {/* Date is locked/disabled to current/today's date */}
      <input 
        type="date" 
        value={taskForm.date} 
        disabled 
        className="px-2 py-1.5 bg-slate-100 border border-sky-200 rounded-lg outline-none text-slate-500 cursor-not-allowed" 
      />
      
      {/* Deadline / Timeline as Date Input */}
      <input 
        type="date" 
        value={taskForm.timeline} 
        onChange={e => setTaskForm({...taskForm, timeline: e.target.value})} 
        className="px-2 py-1.5 bg-slate-50 border border-sky-200 rounded-lg outline-none focus:border-blue-600 text-slate-900" 
        placeholder="Deadline"
      />
      
      <input type="text" placeholder="Task" value={taskForm.task} onChange={e => setTaskForm({...taskForm, task: e.target.value})} className="px-2 py-1.5 bg-slate-50 border border-sky-200 rounded-lg outline-none focus:border-blue-600 text-slate-900" required />
      
      <input type="text" placeholder="Trgt(min)" value={taskForm.trgtMin} onChange={e => setTaskForm({...taskForm, trgtMin: e.target.value})} className="px-2 py-1.5 bg-slate-50 border border-sky-200 rounded-lg outline-none focus:border-blue-600 text-slate-900" />
      
      {/* Type Dropdown */}
      <select value={taskForm.type} onChange={e => setTaskForm({...taskForm, type: e.target.value})} className="px-2 py-1.5 bg-slate-50 border border-sky-200 rounded-lg outline-none focus:border-blue-600 text-slate-900">
        <option value="" disabled>Select Type</option>
        <option value="Fixed">Fixed</option>
        <option value="Variable">Variable</option>
        <option value="HOD Assigned">HOD Assigned</option>
        <option value="Collab">Collab</option>
        <option value="Team">Team</option>
        <option value="Unplanned">Unplanned</option>
      </select>
      
      {/* Status Dropdown */}
      <select value={taskForm.status} onChange={e => setTaskForm({...taskForm, status: e.target.value})} className="px-2 py-1.5 bg-slate-50 border border-sky-200 rounded-lg outline-none focus:border-blue-600 text-slate-900">
        <option value="Not Started">Not Started</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
        <option value="On Hold">On Hold</option>
        <option value="Cancelled">Cancelled</option>
      </select>
      
      <input type="text" placeholder="Upload Link" value={taskForm.upload} onChange={e => setTaskForm({...taskForm, upload: e.target.value})} className="px-2 py-1.5 bg-slate-50 border border-sky-200 rounded-lg outline-none focus:border-blue-600 text-slate-900" />
      
      <button type="submit" className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 bg-sky-700 hover:bg-sky-800 text-white font-semibold text-[11px] rounded-lg transition h-[30px]">
        <Plus className="w-3.5 h-3.5" /> {editingTaskId !== null ? 'Update' : 'Add Task'}
      </button>
    </div>
  </form>

  <div className="overflow-x-auto border border-sky-200 rounded-lg bg-white">
  <table className="w-full text-xs table-fixed">
    <thead className="bg-sky-100/60 text-sky-900 uppercase tracking-wider font-bold border-b border-sky-200 text-[10px]">
      <tr>
        <th className="p-2.5 w-[50px] text-left">S.N</th>
        <th className="p-2.5 w-[70px] text-left">Date</th>
        <th className="p-2.5 w-[95px] text-left">Deadline</th>
        <th className="p-2.5 w-[180px] text-left">Task</th>
        <th className="p-2.5 w-[75px] text-left">Trgt(min)</th>
        <th className="p-2.5 w-[70px] text-left">Type</th>
        <th className="p-2.5 w-[90px] text-left">Status</th>
        <th className="p-2.5 w-[70px] text-left">Upload</th>
        <th className="p-2.5 w-[75px] text-right">Actions</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-sky-100/50 bg-white">
      {filteredTasks.map((item, idx) => (
        <tr key={item.id} className="group hover:bg-sky-50/45 transition-all duration-200 align-top">
          <td className="p-2.5 font-semibold text-slate-400 text-left break-words">{idx + 1}</td>
          <td className="p-2.5 text-slate-500 text-left break-words">{item.date}</td>
          <td className="p-2.5 text-slate-700 text-left break-words">{item.timeline}</td>
          <td className="p-2.5 font-bold text-slate-900 text-left whitespace-normal break-words">{item.task}</td>
          <td className="p-2.5 text-sky-700 font-medium text-left break-words">{item.trgtMin}</td>
          <td className="p-2.5 text-slate-600 text-left whitespace-normal break-words">{item.type}</td>
          <td className="p-2.5 text-slate-600 text-left whitespace-normal break-words">{item.status}</td>
          <td className="p-2.5 text-left whitespace-normal break-words">
            {item.upload && item.upload !== '-' ? (
              <a href={item.upload} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                Link
              </a>
            ) : (
              <span className="text-slate-400">-</span>
            )}
          </td>
          <td className="p-2.5 text-right space-x-1 whitespace-nowrap">
            <button type="button" onClick={() => { setEditingTaskId(item.id); setTaskForm(item); }} className="p-1 text-blue-600 hover:bg-blue-50 rounded transition"><Edit2 className="w-3.5 h-3.5" /></button>
            <button type="button" onClick={() => setTasks(tasks.filter(i => i.id !== item.id))} className="p-1 text-rose-600 hover:bg-rose-50 rounded transition"><Trash2 className="w-3.5 h-3.5" /></button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
</section>

         {/* SECTION 2: MEETING SECTION */}
{/* SECTION 2: MEETING SECTION */}
<section className="bg-amber-50/30 p-4 rounded-xl border border-amber-200 shadow-sm space-y-3">
  <div className="bg-amber-100/70 border border-amber-200 py-1.5 px-3 rounded-lg text-amber-900 text-xs font-bold uppercase tracking-wide text-center flex items-center justify-center gap-1.5">
    <Users className="w-4 h-4" /> Meetings List
  </div>

 <form onSubmit={handleMeetingSubmit} className="bg-white p-3 rounded-xl border border-amber-200 space-y-2">
  {/* Row 1: All other fields */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2 text-xs items-center">
    <input 
      type="date" 
      value={meetingForm.date} 
      disabled 
      className="px-2.5 py-1.5 bg-slate-100 border border-amber-200 rounded-lg outline-none text-slate-500 cursor-not-allowed" 
    />
    
    <select value={meetingForm.dept} onChange={e => setMeetingForm({...meetingForm, dept: e.target.value})} className="px-2.5 py-1.5 bg-slate-50 border border-amber-200 rounded-lg outline-none focus:border-blue-600 text-slate-900" required>
      <option value="" disabled>Select Dept</option>
      <option value="Digital Mkg">Digital Mkg</option>
      <option value="HR">HR</option>
      <option value="Operations">Operations</option>
      <option value="Purchase">Purchase</option>
      <option value="Sales">Sales</option>
      <option value="CEO">CEO</option>
      <option value="All">All</option>
      <option value="Technical">Technical</option>
    </select>

    <select value={meetingForm.attendees} onChange={e => setMeetingForm({...meetingForm, attendees: e.target.value})} className="px-2.5 py-1.5 bg-slate-50 border border-amber-200 rounded-lg outline-none focus:border-blue-600 text-slate-900" required>
      <option value="" disabled>Co. Person</option>
      <option value="Diwakar">Diwakar</option>
      <option value="Jyoti Malhotra">Jyoti Malhotra</option>
      <option value="Vijyant Malik">Vijyant Malik</option>
      <option value="Nitin">Nitin</option>
      <option value="Sachin">Sachin</option>
      <option value="Pardeep chahal">Pardeep chahal</option>
      <option value="Virender Kumar">Virender Kumar</option>
      <option value="Ketan Sharma">Ketan Sharma</option>
      <option value="None">None</option>
      <option value="HOD Meet">HOD Meet</option>
      <option value="Team Meet">Team Meet</option>
    </select>

    <input type="text" placeholder="Meeting Title" value={meetingForm.topic} onChange={e => setMeetingForm({...meetingForm, topic: e.target.value})} className="px-2.5 py-1.5 bg-slate-50 border border-amber-200 rounded-lg outline-none focus:border-blue-600 text-slate-900" required />
    
    <input type="text" placeholder="Time (e.g. 30 min)" value={meetingForm.time} onChange={e => setMeetingForm({...meetingForm, time: e.target.value})} className="px-2.5 py-1.5 bg-slate-50 border border-amber-200 rounded-lg outline-none focus:border-blue-600 text-slate-900" />
    
    <input type="text" placeholder="Prop Slot" value={meetingForm.propSlot} onChange={e => setMeetingForm({...meetingForm, propSlot: e.target.value})} className="px-2.5 py-1.5 bg-slate-50 border border-amber-200 rounded-lg outline-none focus:border-blue-600 text-slate-900" />
    
    <select value={meetingForm.status} onChange={e => setMeetingForm({...meetingForm, status: e.target.value})} className="px-2.5 py-1.5 bg-slate-50 border border-amber-200 rounded-lg outline-none focus:border-blue-600 text-slate-900">
      <option value="Proposal">Proposal</option>
      <option value="Scheduled">Scheduled</option>
      <option value="Completed">Completed</option>
      <option value="On Hold">On Hold</option>
      <option value="Cancelled">Cancelled</option>
      <option value="Re Scheduled">Re Scheduled</option>
    </select>
  </div>

  {/* Row 2: Only Notes and Submit Button */}
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 text-xs items-center">
    <input type="text" placeholder="Notes / Discussion details" value={meetingForm.notes} onChange={e => setMeetingForm({...meetingForm, notes: e.target.value})} className="px-2.5 py-1.5 bg-slate-50 border border-amber-200 rounded-lg outline-none focus:border-blue-600 text-slate-900 lg:col-span-9" />
    
    <button type="submit" className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-[11px] rounded-lg transition h-[30px] lg:col-span-3">
      <Plus className="w-3.5 h-3.5" /> {editingMeetingId !== null ? 'Update Meeting' : 'Add Meeting'}
    </button>
  </div>
</form>

 <div className="overflow-x-auto border border-amber-200 rounded-lg bg-white">
  <table className="w-full text-xs table-fixed">
    <thead className="bg-amber-100/60 text-amber-900 uppercase tracking-wider font-bold border-b border-amber-200 text-[10px]">
      <tr>
        <th className="p-2.5 w-[45px] text-left">S.N</th>
        <th className="p-2.5 w-[90px] text-left">Date</th>
        <th className="p-2.5 w-[95px] text-left">Dept</th>
        <th className="p-2.5 w-[100px] text-left">Co.Person</th>
        <th className="p-2.5 w-[180px] text-left">Title</th>
        <th className="p-2.5 w-[75px] text-left">Time (min)</th>
        <th className="p-2.5 w-[90px] text-left">Prop Slot</th>
        <th className="p-2.5 w-[95px] text-left">Status</th>
        <th className="p-2.5 w-auto text-left">Notes</th>
        <th className="p-2.5 w-[75px] text-right">Actions</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-amber-100/50 bg-white">
      {filteredMeetings.map((item, idx) => (
        <tr key={item.id} className="group hover:bg-amber-50/45 transition-all duration-200 align-top">
          <td className="p-2.5 font-semibold text-slate-400 text-left break-words">{idx + 1}</td>
          <td className="p-2.5 text-slate-500 text-left break-words">{item.date}</td>
          <td className="p-2.5 text-slate-700 text-left break-words">{item.dept}</td>
          <td className="p-2.5 text-slate-700 text-left break-words">{item.attendees}</td>
          <td className="p-2.5 font-bold text-slate-900 text-left whitespace-normal break-words">{item.topic}</td>
          <td className="p-2.5 text-amber-700 font-medium text-left break-words">{item.time}</td>
          <td className="p-2.5 text-slate-600 text-left break-words">{item.propSlot}</td>
          <td className="p-2.5 text-amber-800 font-medium text-left break-words">{item.status}</td>
          <td className="p-2.5 text-slate-600 text-left whitespace-normal break-words">{item.notes}</td>
          <td className="p-2.5 text-right space-x-1 whitespace-nowrap">
            <button type="button" onClick={() => { setEditingMeetingId(item.id); setMeetingForm(item); }} className="p-1 text-blue-600 hover:bg-blue-50 rounded transition"><Edit2 className="w-3.5 h-3.5" /></button>
            <button type="button" onClick={() => setMeetings(meetings.filter(i => i.id !== item.id))} className="p-1 text-rose-600 hover:bg-rose-50 rounded transition"><Trash2 className="w-3.5 h-3.5" /></button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
</section>

        </div>
      </main>
    </div>
  );
}