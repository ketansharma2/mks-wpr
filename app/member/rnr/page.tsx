'use client';

import { useState } from 'react';
import Sidebar from '@/app/components/layout/sidebar/sidebar';
import { Plus, Trash2, Edit2, Save, CheckCircle2, ExternalLink } from 'lucide-react';
import { useEffect } from "react";
import roleOverviewService from "@/services/roleOverview.service";
import { getErrorMessage } from "@/lib/api-error";
import rnrService from "@/services/rnr.service";
import fixedTaskService from "@/services/fixedTask.service";
interface RnrItem {
  _id: string;
  role: string;
  description: string;
  endGoal: string;
  timings: string;
  guideline: string;
  process: string;
  limitations: string;
}

interface FixedTaskItem {
  _id: string;
  assignedBy: string;
  task: string;
  frequency: string;
  uploadClosing: string;
}

interface RoleOverview {
  name: string;
  designation: string;
  subject: string;
  object: string;
  goal: string;
}

export default function RnrPage() {
  const [effectiveDate] = useState('21st Oct');
 const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [overview, setOverview] = useState<RoleOverview>({
  name: "",
  designation: "",
  subject: "",
  object: "",
  goal: "",
});
  const [isOverviewSaved, setIsOverviewSaved] = useState(false);

  const [rnrItems, setRnrItems] = useState<RnrItem[]>([]);
  
  const [rnrForm, setRnrForm] = useState({ role: '', description: '', endGoal: '', timings: '', guideline: '', process: '', limitations: '' });

  const [fixedTasks, setFixedTasks] = useState<FixedTaskItem[]>([]);
  const [editingFixedId, setEditingFixedId] = useState<string | null>(null);
  const [fixedForm, setFixedForm] = useState({ assignedBy: '', task: '', frequency: 'Daily', uploadClosing: '' });
  const [editingRnrId, setEditingRnrId] = useState<string | null>(null);
  const handleOverviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOverview({ ...overview, [e.target.name]: e.target.value });
    setIsOverviewSaved(false);
  };




useEffect(() => {
  handleGetOverview();
  handleGetRnr();
  handleGetFixedTasks();
}, []);

const handleGetFixedTasks = async () => {
  try {
    setLoading(true);
    setError("");

    const response = await fixedTaskService.getTasks();

    if (!response.success) {
      setError(response.message);
      return;
    }

    setFixedTasks(response.data);
  } catch (err: unknown) {
    setError(getErrorMessage(err));
  } finally {
    setLoading(false);
  }
};

const handleFixedSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    setLoading(true);
    setError("");

    let response;

    if (editingFixedId !== null) {
      response = await fixedTaskService.updateTask(
        editingFixedId.toString(),
        fixedForm
      );
    } else {
      response = await fixedTaskService.createTask(fixedForm);
    }

    if (!response.success) {
      setError(response.message);
      return;
    }

    await handleGetFixedTasks();

    setEditingFixedId(null);

    setFixedForm({
      assignedBy: "",
      task: "",
      frequency: "Daily",
      uploadClosing: "",
    });
  } catch (err: unknown) {
    setError(getErrorMessage(err));
  } finally {
    setLoading(false);
  }
};

const handleDeleteFixedTask = async (id: string) => {
  try {
    setLoading(true);
    setError("");

    const response = await fixedTaskService.deleteTask(id.toString());

    if (!response.success) {
      setError(response.message);
      return;
    }

    await handleGetFixedTasks();
  } catch (err: unknown) {
    setError(getErrorMessage(err));
  } finally {
    setLoading(false);
  }
};

const handleDeleteRnr = async (id: string) => {
  try {
    setLoading(true);
    setError("");

    const response = await rnrService.deleteTask(id.toString());

    if (!response.success) {
      setError(response.message);
      return;
    }

    await handleGetRnr();
  } catch (err: unknown) {
    setError(getErrorMessage(err));
  } finally {
    setLoading(false);
  }
};

const handleGetRnr = async () => {
  try {
    setLoading(true);
    setError("");

    const response = await rnrService.getTasks();

    if (!response.success) {
      setError(response.message);
      return;
    }

    setRnrItems(response.data);
  } catch (err: unknown) {
    setError(getErrorMessage(err));
  } finally {
    setLoading(false);
  }
};


const handleRnrSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    setLoading(true);
    setError("");

    let response;

    if (editingRnrId !== null) {
      response = await rnrService.updateTask(
        editingRnrId.toString(),
        rnrForm
      );
    } else {
      response = await rnrService.createTask(rnrForm);
    }

    if (!response.success) {
      setError(response.message);
      return;
    }

    await handleGetRnr();

    setEditingRnrId(null);

    setRnrForm({
      role: "",
      description: "",
      endGoal: "",
      timings: "",
      guideline: "",
      process: "",
      limitations: "",
    });
  } catch (err: unknown) {
    setError(getErrorMessage(err));
  } finally {
    setLoading(false);
  }
};

const handleGetOverview = async () => {
  try {
    setLoading(true);
    setError("");

    const response = await roleOverviewService.get();

    if (!response.success) {
      setError(response.message);
      return;
    }

    setOverview(
  response.data ?? {
    name: "",
    designation: "",
    subject: "",
    object: "",
    goal: "",
  }
);
  } catch (err: unknown) {
    setError(getErrorMessage(err));
  } finally {
    setLoading(false);
  }
};

const handleSaveOverview = async () => {
  try {
    setLoading(true);
    setError("");

    const response = await roleOverviewService.save(overview);

    if (!response.success) {
      setError(response.message);
      return;
    }

    setIsOverviewSaved(true);
  } catch (err: unknown) {
    setError(getErrorMessage(err));
  } finally {
    setLoading(false);
  }
};

 


  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row select-none" style={{ fontFamily: 'Cambria, serif' }}>
      <Sidebar />

      <main className="flex-1 p-3 sm:p-5 lg:p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-4">
          
          {/* TOP BANNER */}
         <div className="bg-white text-slate-900 text-center py-2.5 px-4 rounded-2xl shadow-sm border border-slate-200">
  <h1 className="text-sm sm:text-base font-bold uppercase tracking-wider text-slate-900">
    Roles and Responsibilities
  </h1>
</div>
{/* SECTION 1: ROLE OVERVIEW */}
<section className="bg-sky-50/40 p-4 rounded-xl border border-sky-200 shadow-sm space-y-3">
  <div className="flex items-center justify-between border-b border-sky-100 pb-2">
    <div className="bg-sky-100/70 border border-sky-200 py-1.5 px-3 rounded-lg text-sky-900 text-xs font-bold uppercase tracking-wide">
      Role Overview
    </div>
   <div className="flex items-center gap-2">
      {isOverviewSaved && (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-[11px] rounded-full border border-emerald-200">
          <CheckCircle2 className="w-3 h-3" /> Saved
        </span>
      )}
      <button
  type="button"
  onClick={handleSaveOverview}
  className="..."
>
  <Save className="w-3.5 h-3.5" />
  {loading ? "Saving..." : "Save Overview"}
</button>
    </div>
  </div>

  <div className="overflow-x-auto border border-sky-200 rounded-lg bg-white">
    <div className="min-w-[900px] grid grid-cols-5 divide-x divide-sky-100 text-xs">
      {(() => {
        const handleAutoResize = (e: React.FormEvent<HTMLTextAreaElement>) => {
          const target = e.currentTarget;
          target.style.height = 'auto';
          target.style.height = `${target.scrollHeight}px`;
        };

        return (
          <>
            <div className="p-2 space-y-1 flex flex-col">
              <label className="block font-bold uppercase text-[10px] text-slate-500">Name</label>
              <textarea name="name" rows={1} value={overview?.name ?? ""} onChange={handleOverviewChange} onInput={handleAutoResize} className="w-full p-1.5 bg-slate-50/60 border border-sky-100 rounded text-xs text-slate-900 focus:border-blue-600 outline-none resize-none overflow-hidden" style={{ minHeight: '38px' }} />
            </div>
            <div className="p-2 space-y-1 flex flex-col">
              <label className="block font-bold uppercase text-[10px] text-slate-500">Designation</label>
              <textarea name="designation" rows={1} value={overview?.designation} onChange={handleOverviewChange} onInput={handleAutoResize} className="w-full p-1.5 bg-slate-50/60 border border-sky-100 rounded text-xs text-slate-900 focus:border-blue-600 outline-none resize-none overflow-hidden" style={{ minHeight: '38px' }} />
            </div>
            <div className="p-2 space-y-1 flex flex-col">
              <label className="block font-bold uppercase text-[10px] text-slate-500">Subject</label>
              <textarea name="subject" rows={1} value={overview?.subject} onChange={handleOverviewChange} onInput={handleAutoResize} className="w-full p-1.5 bg-slate-50/60 border border-sky-100 rounded text-xs text-slate-900 focus:border-blue-600 outline-none resize-none overflow-hidden" style={{ minHeight: '38px' }} />
            </div>
            <div className="p-2 space-y-1 flex flex-col">
              <label className="block font-bold uppercase text-[10px] text-slate-500">Object</label>
              <textarea name="object" rows={1} value={overview?.object} onChange={handleOverviewChange} onInput={handleAutoResize} className="w-full p-1.5 bg-slate-50/60 border border-sky-100 rounded text-xs text-slate-900 focus:border-blue-600 outline-none resize-none overflow-hidden" style={{ minHeight: '38px' }} />
            </div>
            <div className="p-2 space-y-1 flex flex-col">
              <label className="block font-bold uppercase text-[10px] text-slate-500">Goal</label>
              <textarea name="goal" rows={1} value={overview?.goal} onChange={handleOverviewChange} onInput={handleAutoResize} className="w-full p-1.5 bg-slate-50/60 border border-sky-100 rounded text-xs text-slate-900 focus:border-blue-600 outline-none resize-none overflow-hidden" style={{ minHeight: '38px' }} />
            </div>
          </>
        );
      })()}
    </div>
  </div>
</section>

          {/* SECTION 2: R&R MATRIX TABLE */}
<section className="bg-amber-50/30 p-4 rounded-xl border border-amber-200 shadow-sm space-y-3">
  <div className="bg-amber-100/70 border border-amber-200 py-1.5 px-3 rounded-lg text-amber-900 text-xs font-bold uppercase tracking-wide text-center">
  Roles and Responsibilities
</div>

  <form onSubmit={handleRnrSubmit} className="bg-white p-3 rounded-xl border border-amber-200 space-y-2">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
      <input type="text" placeholder="Role & Responsibility" value={rnrForm.role} onChange={e => setRnrForm({...rnrForm, role: e.target.value})} className="px-2.5 py-1.5 bg-slate-50 border border-amber-200 rounded-lg outline-none focus:border-blue-600 text-slate-900" required />
      <input type="text" placeholder="Description" value={rnrForm.description} onChange={e => setRnrForm({...rnrForm, description: e.target.value})} className="px-2.5 py-1.5 bg-slate-50 border border-amber-200 rounded-lg outline-none focus:border-blue-600 text-slate-900" />
      <input type="text" placeholder="End Goal" value={rnrForm.endGoal} onChange={e => setRnrForm({...rnrForm, endGoal: e.target.value})} className="px-2.5 py-1.5 bg-slate-50 border border-amber-200 rounded-lg outline-none focus:border-blue-600 text-slate-900" />
      <input type="text" placeholder="Timings" value={rnrForm.timings} onChange={e => setRnrForm({...rnrForm, timings: e.target.value})} className="px-2.5 py-1.5 bg-slate-50 border border-amber-200 rounded-lg outline-none focus:border-blue-600 text-slate-900" />
      
      <input type="text" placeholder="Guideline" value={rnrForm.guideline} onChange={e => setRnrForm({...rnrForm, guideline: e.target.value})} className="px-2.5 py-1.5 bg-slate-50 border border-amber-200 rounded-lg outline-none focus:border-blue-600 text-slate-900" />
      <input 
  type="text" 
  placeholder="Process & Limitations" 
  value={rnrForm.process} 
  onChange={e => setRnrForm({...rnrForm, process: e.target.value, limitations: e.target.value})} 
  className="px-2.5 py-1.5 bg-slate-50 border border-amber-200 rounded-lg outline-none focus:border-blue-600 text-slate-900" 
/>
      <button type="submit" className="flex items-center justify-center gap-1.5 py-1.5 px-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-[11px] rounded-lg transition h-[30px]">
        <Plus className="w-3.5 h-3.5" /> {editingRnrId !== null ? 'Update Row' : 'Add Row'}
      </button>
    </div>
  </form>

  <div className="overflow-x-auto border border-amber-200 rounded-lg bg-white">
    <table className="w-full text-left text-xs">
      <thead className="bg-amber-100/60 text-amber-900 uppercase tracking-wider font-bold border-b border-amber-200 text-[10px]">
        <tr>
          <th className="p-2.5">S.N</th>
          <th className="p-2.5">Role & Responsibility</th>
          <th className="p-2.5">Description</th>
          <th className="p-2.5">End Goal</th>
          <th className="p-2.5">Timings</th>
          <th className="p-2.5">Guideline</th>
          <th className="p-2.5">Process & Limitations</th>
          <th className="p-2.5 text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-amber-100/50 bg-white">
        {rnrItems.map((item, idx) => (
          <tr key={item._id} className="group hover:bg-amber-50/45 transition-all duration-200 align-top">
            <td className="p-2.5 font-semibold text-slate-400">{idx + 1}</td>
            <td className="p-2.5 font-bold text-slate-900 whitespace-normal break-words">{item.role}</td>
            <td className="p-2.5 text-slate-600 max-w-[200px] whitespace-normal break-words">{item.description}</td>
            <td className="p-2.5 text-slate-600 max-w-[150px] whitespace-normal break-words">{item.endGoal}</td>
            <td className="p-2.5 text-slate-600 whitespace-nowrap">{item.timings}</td>
            <td className="p-2.5 text-slate-600 max-w-[180px] whitespace-normal break-words">{item.guideline}</td>
            <td className="p-2.5 text-slate-600 max-w-[180px] whitespace-normal break-words">{item.process} / {item.limitations}</td>
            <td className="p-2.5 text-right space-x-1 whitespace-nowrap">
              <button type="button" onClick={() => { setEditingRnrId(item._id); setRnrForm(item); }} className="p-1 text-blue-600 hover:bg-blue-50 rounded transition"><Edit2 className="w-3.5 h-3.5" /></button>
              <button
  type="button"
  onClick={() => handleDeleteRnr(item._id)}
  className="p-1 text-rose-600 hover:bg-rose-50 rounded transition"
>
  <Trash2 className="w-3.5 h-3.5" />
</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>

          {/* SECTION 3: FIXED TASK TABLE */}
{/* SECTION 3: FIXED TASK TABLE */}
<section className="bg-emerald-50/30 p-4 rounded-xl border border-emerald-200 shadow-sm space-y-3">
  <div className="bg-emerald-100/70 border border-emerald-200 py-1.5 px-3 rounded-lg text-emerald-900 text-xs font-bold uppercase tracking-wide text-center">
    Fixed Tasks Schedule
  </div>

  <form onSubmit={handleFixedSubmit} className="bg-white p-3 rounded-xl border border-emerald-200">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 text-xs items-center">
      <select 
        value={fixedForm.assignedBy} 
        onChange={e => setFixedForm({...fixedForm, assignedBy: e.target.value})} 
        className="px-2.5 py-1.5 bg-slate-50 border border-emerald-200 rounded-lg outline-none focus:border-blue-600 text-slate-900" 
        required
      >
        <option value="" disabled>Assigned By</option>
        <option value="Vijyant Malik">Vijyant Malik</option>
        <option value="Nitin">Nitin</option>
        <option value="Sachin">Sachin</option>
        <option value="Pardeep chahal">Pardeep chahal</option>
        <option value="Virender Kumar">Virender Kumar</option>
        <option value="Satender sharma">Satender sharma</option>
        <option value="S. Sir">S. Sir</option>
        <option value="Diwakar Tiwari">Diwakar Tiwari</option>
        <option value="Self">Self</option>
        <option value="Ashish">Ashish</option>
        <option value="Ketan Sharma">Ketan Sharma</option>
        <option value="R.Sharma">R.Sharma</option>
      </select>

      <input 
        type="text" 
        placeholder="Task Name" 
        value={fixedForm.task} 
        onChange={e => setFixedForm({...fixedForm, task: e.target.value})} 
        className="px-2.5 py-1.5 bg-slate-50 border border-emerald-200 rounded-lg outline-none focus:border-blue-600 text-slate-900" 
        required 
      />

      <select 
        value={fixedForm.frequency} 
        onChange={e => setFixedForm({...fixedForm, frequency: e.target.value})} 
        className="px-2.5 py-1.5 bg-slate-50 border border-emerald-200 rounded-lg outline-none focus:border-blue-600 text-slate-900"
      >
        <option value="Daily">Daily</option>
        <option value="Weekly">Weekly</option>
        <option value="Monthly">Monthly</option>
        <option value="Quarterly">Quarterly</option>
        <option value="Yearly">Yearly</option>
      </select>

      <input 
        type="text" 
        placeholder="Upload Closing Link / URL" 
        value={fixedForm.uploadClosing} 
        onChange={e => setFixedForm({...fixedForm, uploadClosing: e.target.value})} 
        className="px-2.5 py-1.5 bg-slate-50 border border-emerald-200 rounded-lg outline-none focus:border-blue-600 text-slate-900" 
      />
      
      <button type="submit" className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-[11px] rounded-lg transition h-[30px]">
        <Plus className="w-3.5 h-3.5" /> {editingFixedId !== null ? 'Update Task' : 'Add Task'}
      </button>
    </div>
  </form>

  <div className="overflow-x-auto border border-emerald-200 rounded-lg bg-white">
    <table className="w-full text-left text-xs">
      <thead className="bg-emerald-100/60 text-emerald-900 uppercase tracking-wider font-bold border-b border-emerald-200 text-[10px]">
        <tr>
          <th className="p-2.5">S.N</th>
          <th className="p-2.5">Assigned By</th>
          <th className="p-2.5">Task</th>
          <th className="p-2.5">Frequency</th>
          <th className="p-2.5">Upload Closing Link</th>
          <th className="p-2.5 text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-emerald-100/50 bg-white">
        {fixedTasks.map((item, idx) => (
          <tr key={item._id} className="group hover:bg-emerald-50/45 transition-all duration-200 align-top">
            <td className="p-2.5 font-semibold text-slate-400">{idx + 1}</td>
            <td className="p-2.5 font-semibold text-slate-800 whitespace-normal break-words">{item.assignedBy}</td>
            <td className="p-2.5 font-bold text-slate-900 whitespace-normal break-words">{item.task}</td>
            <td className="p-2.5 text-emerald-600 font-medium whitespace-nowrap">{item.frequency}</td>
            <td className="p-2.5 whitespace-normal break-words">
              {item.uploadClosing && item.uploadClosing !== '-' ? (
                <a href={item.uploadClosing} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1 max-w-[200px] whitespace-normal break-all">
                  <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" /> {item.uploadClosing}
                </a>
              ) : (
                <span className="text-slate-400">-</span>
              )}
            </td>
            <td className="p-2.5 text-right space-x-1 whitespace-nowrap">
              <button type="button" onClick={() => { setEditingFixedId(item._id); setFixedForm(item); }} className="p-1 text-blue-600 hover:bg-blue-50 rounded transition"><Edit2 className="w-3.5 h-3.5" /></button>
              <button type="button" onClick={() => handleDeleteFixedTask(item._id)} className="p-1 text-rose-600 hover:bg-rose-50 rounded transition"><Trash2 className="w-3.5 h-3.5" /></button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>
{error && (
  <div className="mb-4 rounded-xl bg-red-100 border border-red-300 p-3 text-sm text-red-700">
    {error}
  </div>
)}

        </div>
      </main>
    </div>
  );
}