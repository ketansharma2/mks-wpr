'use client';

import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react';
import AdminSidebar from '@/app/components/layout/sidebar/admin-sidebar';
import { CheckCircle2, ExternalLink, Users } from 'lucide-react';
import adminRnrService from '@/services/adminRnr.service';

interface RnrItem {
  id: number;
  role: string;
  description: string;
  endGoal: string;
  timings: string;
  guideline: string;
  process: string;
  limitations: string;
}

interface FixedTaskItem {
  id: number;
  assignedBy: string;
  task: string;
  frequency: string;
  uploadClosing: string;
}

interface MemberRnrData {
  overview: {
    name: string;
    designation: string;
    subject: string;
    object: string;
    goal: string;
  };
  rnrItems: RnrItem[];
  fixedTasks: FixedTaskItem[];
}

interface Overview {
  name: string;
  designation: string;
  subject: string;
  object: string;
  goal: string;
  effectiveDate: string;
}

interface CurrentData {
  overview: Overview;
  rnrItems: any[];
  fixedTasks: any[];
}

export default function AdminRNRPage() {
  const [selectedMember, setSelectedMember] =
useState("");

const [members, setMembers] = useState([]);

const [currentData, setCurrentData] = useState<CurrentData>({
  overview: {
    name: '',
    designation: '',
    subject: '',
    object: '',
    goal: '',
    effectiveDate: '',
  },
  rnrItems: [],
  fixedTasks: [],
});

const [loading, setLoading] =
useState(false);


useEffect(() => {
    loadMembers();
}, []);

useEffect(() => {
    if(selectedMember){
        loadMemberData(selectedMember);
    }
}, [selectedMember]);

const loadMembers = async () => {
    const res =
      await adminRnrService.getMembers();

    setMembers(res.data.items);

    if(res.data.items.length){
        setSelectedMember(
            res.data.items[0]._id
        );
    }
};

const loadMemberData = async(id:string)=>{
    setLoading(true);

    try{

        const res =
        await adminRnrService.getMemberData(id);

        setCurrentData(res.data);

    }finally{
        setLoading(false);
    }
};

  // Master R&R Database mapped by member name (exact replica of member view)


  // const memberList = Object.keys(masterRnrDatabase);


  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row select-none" style={{ fontFamily: 'Cambria, serif' }}>
      <AdminSidebar />

      <main className="flex-1 p-3 sm:p-5 lg:p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-4">
          
          {/* TOP BANNER */}
          <div className="bg-white text-slate-900 text-center py-2.5 px-4 rounded-2xl shadow-sm border border-slate-200">
            <h1 className="text-sm sm:text-base font-bold uppercase tracking-wider text-slate-900">
              Roles and Responsibilities Audit
            </h1>
          </div>

          {/* MEMBER SELECTOR FILTER BAR */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Select Member:</span>
            </div>

            <select
              value={selectedMember}
              onChange={e => setSelectedMember(e.target.value)}
              className="w-full sm:w-72 bg-slate-50 border border-slate-200 text-slate-900 px-3.5 py-2 rounded-xl text-xs font-bold outline-none focus:border-blue-500 font-sans"
            >
              {members.map((member:any)=>(
<option
key={member._id}
value={member._id}
>
{member.name} ({member.designation})
</option>
))}
            </select>
          </div>

          {/* SECTION 1: ROLE OVERVIEW */}
          <section className="bg-sky-50/40 p-4 rounded-xl border border-sky-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-sky-100 pb-2">
              <div className="bg-sky-100/70 border border-sky-200 py-1.5 px-3 rounded-lg text-sky-900 text-xs font-bold uppercase tracking-wide">
                Role Overview
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-[11px] rounded-full border border-emerald-200 font-sans font-semibold">
                <CheckCircle2 className="w-3 h-3" /> Active Profile
              </span>
            </div>

            <div className="overflow-x-auto border border-sky-200 rounded-lg bg-white">
              <div className="min-w-[900px] grid grid-cols-5 divide-x divide-sky-100 text-xs">
                <div className="p-2 space-y-1 flex flex-col bg-slate-50/40">
                  <span className="block font-bold uppercase text-[10px] text-slate-500">Name</span>
                  <p className="p-1.5 text-xs font-bold text-slate-900">{currentData?.overview?.name}</p>
                </div>
                <div className="p-2 space-y-1 flex flex-col bg-slate-50/40">
                  <span className="block font-bold uppercase text-[10px] text-slate-500">Designation</span>
                  <p className="p-1.5 text-xs font-bold text-slate-900">{currentData?.overview?.designation}</p>
                </div>
                <div className="p-2 space-y-1 flex flex-col bg-slate-50/40">
                  <span className="block font-bold uppercase text-[10px] text-slate-500">Subject</span>
                  <p className="p-1.5 text-xs text-slate-900">{currentData?.overview?.subject}</p>
                </div>
                <div className="p-2 space-y-1 flex flex-col bg-slate-50/40">
                  <span className="block font-bold uppercase text-[10px] text-slate-500">Object</span>
                  <p className="p-1.5 text-xs text-slate-900">{currentData?.overview?.object}</p>
                </div>
                <div className="p-2 space-y-1 flex flex-col bg-slate-50/40">
                  <span className="block font-bold uppercase text-[10px] text-slate-500">Goal</span>
                  <p className="p-1.5 text-xs text-slate-900">{currentData?.overview?.goal}</p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: R&R MATRIX TABLE */}
          <section className="bg-amber-50/30 p-4 rounded-xl border border-amber-200 shadow-sm space-y-3">
            <div className="bg-amber-100/70 border border-amber-200 py-1.5 px-3 rounded-lg text-amber-900 text-xs font-bold uppercase tracking-wide text-center">
              Roles and Responsibilities
            </div>

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
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-100/50 bg-white">
                  {currentData.rnrItems.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-6 text-slate-400 italic">No R&R entries found for this member.</td>
                    </tr>
                  ) : (
                    currentData.rnrItems.map((item: { _id: Key | null | undefined; role: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; description: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; endGoal: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; timings: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; guideline: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; process: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; limitations: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }, idx: number) => (
                      <tr key={item._id} className="hover:bg-amber-50/45 transition-all duration-200 align-top">
                        <td className="p-2.5 font-semibold text-slate-400">{idx + 1}</td>
                        <td className="p-2.5 font-bold text-slate-900 whitespace-normal break-words">{item.role}</td>
                        <td className="p-2.5 text-slate-600 max-w-[200px] whitespace-normal break-words">{item.description}</td>
                        <td className="p-2.5 text-slate-600 max-w-[150px] whitespace-normal break-words">{item.endGoal}</td>
                        <td className="p-2.5 text-slate-600 whitespace-nowrap">{item.timings}</td>
                        <td className="p-2.5 text-slate-600 max-w-[180px] whitespace-normal break-words">{item.guideline}</td>
                        <td className="p-2.5 text-slate-600 max-w-[180px] whitespace-normal break-words">{item.process} / {item.limitations}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* SECTION 3: FIXED TASK TABLE */}
          <section className="bg-emerald-50/30 p-4 rounded-xl border border-emerald-200 shadow-sm space-y-3">
            <div className="bg-emerald-100/70 border border-emerald-200 py-1.5 px-3 rounded-lg text-emerald-900 text-xs font-bold uppercase tracking-wide text-center">
              Fixed Tasks Schedule
            </div>

            <div className="overflow-x-auto border border-emerald-200 rounded-lg bg-white">
              <table className="w-full text-left text-xs">
                <thead className="bg-emerald-100/60 text-emerald-900 uppercase tracking-wider font-bold border-b border-emerald-200 text-[10px]">
                  <tr>
                    <th className="p-2.5">S.N</th>
                    <th className="p-2.5">Assigned By</th>
                    <th className="p-2.5">Task</th>
                    <th className="p-2.5">Frequency</th>
                    <th className="p-2.5">Upload Closing Link</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-100/50 bg-white">
                  {currentData.fixedTasks.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-6 text-slate-400 italic">No fixed tasks assigned.</td>
                    </tr>
                  ) : (
                    currentData.fixedTasks.map((item: { _id: Key | null | undefined; assignedBy: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; task: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; frequency: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; uploadClosing: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }, idx: number) => (
                      <tr key={item._id} className="hover:bg-emerald-50/45 transition-all duration-200 align-top">
                        <td className="p-2.5 font-semibold text-slate-400">{idx + 1}</td>
                        <td className="p-2.5 font-semibold text-slate-800 whitespace-normal break-words">{item.assignedBy}</td>
                        <td className="p-2.5 font-bold text-slate-900 whitespace-normal break-words">{item.task}</td>
                        <td className="p-2.5 text-emerald-600 font-medium whitespace-nowrap">{item.frequency}</td>
                        <td className="p-2.5 whitespace-normal break-words">
                          {item.uploadClosing && item.uploadClosing !== '-' ? (
                            <a href={String(item.uploadClosing)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1 max-w-[200px] whitespace-normal break-all">
                              <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" /> {item.uploadClosing}
                            </a>
                          ) : (
                            <span className="text-slate-400">-</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}