'use client';

import { useState } from 'react';
import AdminSidebar from '@/app/components/layout/sidebar/admin-sidebar';
import { CheckCircle2, ExternalLink, Users } from 'lucide-react';

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

export default function AdminRNRPage() {
  const [selectedMember, setSelectedMember] = useState('Sonu Rana');

  // Master R&R Database mapped by member name (exact replica of member view)
  const masterRnrDatabase: Record<string, MemberRnrData> = {
    'Sonu Rana': {
      overview: {
        name: 'Sonu Rana',
        designation: 'Data Analyst',
        subject: 'Data Analysis & Business Intelligence',
        object: 'Process, and analyze data to provide actionable insights that support business decision-making.',
        goal: 'Ensure accurate reporting and improve data-driven decision.',
      },
      rnrItems: [
        { id: 1, role: 'Reporting & Dashboarding', description: 'Create reports, dashboards, and visualizations for management', endGoal: 'Easy-to-understand insights for quick decisions', timings: 'Weekly/Monthly', guideline: 'Follow company reporting standards', process: 'Dashboard may require frequent updates', limitations: 'Standard data pipeline' },
        { id: 2, role: 'KPI Monitoring', description: 'Track key performance indicators and trends across departments', endGoal: 'Identify growth opportunities or issues', timings: 'Weekly', guideline: 'Use predefined KPIs', process: 'KPIs need periodic validation', limitations: 'Data dependency' },
        { id: 3, role: 'Data Analysis', description: 'Analyze structured/unstructured data, Identify trends & insights', endGoal: 'Actionable business insights', timings: 'Daily', guideline: 'Use approved tools', process: 'Extraction & cleaning', limitations: 'Limited by dataset quality' },
        { id: 4, role: 'Data Format Redesign', description: "Organize sheet's data structure and redesign its format for clarity, readability, and easier updates", endGoal: 'User-friendly sheet, easy to maintain and update', timings: 'As needed', guideline: 'Follow spreadsheet best practices: clear headings, proper formatting, and logical structure', process: 'Redesign may require multiple iterations, dependent on management feedback', limitations: 'Scope adjustments' }
      ],
      fixedTasks: [
        { id: 1, assignedBy: 'Self', task: 'WPR Sheet Fill', frequency: 'Daily', uploadClosing: 'https://docs.google.com/spreadsheets/d/1DEREIFk0989UfUZrgVM8py_B8eSKJdfcUQjONp1C-QI/edit' },
        { id: 2, assignedBy: 'S.Sir', task: 'Data Management Report Submit (9:00)', frequency: 'Daily', uploadClosing: '-' },
        { id: 3, assignedBy: 'Ajay', task: 'Team Handling', frequency: 'Daily', uploadClosing: '-' },
      ]
    },
    'Aman Verma': {
      overview: {
        name: 'Aman Verma',
        designation: 'Operations Floor Supervisor',
        subject: 'Industrial Assembly & Safety',
        object: 'Inspect factory floor assembly lines and enforce safety guidelines across shifts.',
        goal: 'Reduce downtime and maintain zero-incident safety ratings.',
      },
      rnrItems: [
        { id: 1, role: 'Assembly Line Check', description: 'Inspect machinery and verify operational tolerances', endGoal: 'Smooth continuous manufacturing execution', timings: 'Daily', guideline: 'Follow ISO safety standards', process: 'Morning shift inspection protocol', limitations: 'Hardware availability' },
        { id: 2, role: 'Safety Compliance Audit', description: 'Conduct surprise floor audits and verify PPE adherence', endGoal: 'Zero workplace injuries', timings: 'Weekly', guideline: 'Strict adherence to rulebook', process: 'Checklist verification', limitations: 'Staff cooperation' }
      ],
      fixedTasks: [
        { id: 1, assignedBy: 'Vijyant Malik', task: 'Morning Shift Mechanical Audit', frequency: 'Daily', uploadClosing: '-' },
        { id: 2, assignedBy: 'Self', task: 'Safety Checklist Verification', frequency: 'Daily', uploadClosing: '-' }
      ]
    },
    'Neha Sharma': {
      overview: {
        name: 'Neha Sharma',
        designation: 'Sales Executive',
        subject: 'Regional Client Sourcing & Revenue',
        object: 'Manage client acquisition pipelines and distribute regional monthly targets.',
        goal: 'Achieve monthly conversion benchmarks and expand client base.',
      },
      rnrItems: [
        { id: 1, role: 'Client Sourcing', description: 'Identify prospective corporate accounts and establish dialogue', endGoal: 'High conversion lead generation', timings: 'Daily', guideline: 'Follow outreach playbook', process: 'Cold calling & email pitching', limitations: 'Market response time' },
        { id: 2, role: 'Pipeline Review', description: 'Update status of ongoing sales negotiations', endGoal: 'Accurate revenue forecasting', timings: 'Weekly', guideline: 'Maintain CRM accuracy', process: 'Weekly review meeting', limitations: 'Client budget constraints' }
      ],
      fixedTasks: [
        { id: 1, assignedBy: 'Satender sharma', task: 'Regional Sales Pipeline Report', frequency: 'Weekly', uploadClosing: '-' },
        { id: 2, assignedBy: 'Self', task: 'Inbound Inquiry Follow-up', frequency: 'Daily', uploadClosing: '-' }
      ]
    }
  };

  const memberList = Object.keys(masterRnrDatabase);
  const currentData = masterRnrDatabase[selectedMember] || masterRnrDatabase['Sonu Rana'];

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
              {memberList.map(name => (
                <option key={name} value={name}>{name} — ({masterRnrDatabase[name].overview.designation})</option>
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
                  <p className="p-1.5 text-xs font-bold text-slate-900">{currentData.overview.name}</p>
                </div>
                <div className="p-2 space-y-1 flex flex-col bg-slate-50/40">
                  <span className="block font-bold uppercase text-[10px] text-slate-500">Designation</span>
                  <p className="p-1.5 text-xs font-bold text-slate-900">{currentData.overview.designation}</p>
                </div>
                <div className="p-2 space-y-1 flex flex-col bg-slate-50/40">
                  <span className="block font-bold uppercase text-[10px] text-slate-500">Subject</span>
                  <p className="p-1.5 text-xs text-slate-900">{currentData.overview.subject}</p>
                </div>
                <div className="p-2 space-y-1 flex flex-col bg-slate-50/40">
                  <span className="block font-bold uppercase text-[10px] text-slate-500">Object</span>
                  <p className="p-1.5 text-xs text-slate-900">{currentData.overview.object}</p>
                </div>
                <div className="p-2 space-y-1 flex flex-col bg-slate-50/40">
                  <span className="block font-bold uppercase text-[10px] text-slate-500">Goal</span>
                  <p className="p-1.5 text-xs text-slate-900">{currentData.overview.goal}</p>
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
                    currentData.rnrItems.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-amber-50/45 transition-all duration-200 align-top">
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
                    currentData.fixedTasks.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-emerald-50/45 transition-all duration-200 align-top">
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