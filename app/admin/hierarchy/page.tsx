'use client';

import { useState } from 'react';
import AdminSidebar from '@/app/components/layout/sidebar/admin-sidebar';
import { Building, ShieldCheck, ExternalLink, Network, LayoutTemplate, Save, CheckCircle2 } from 'lucide-react';

export default function AdminHierarchyPage() {
  const [departments] = useState([
    { id: 1, name: 'Executive Management', head: 'Vijyant Malik', membersCount: 2, description: 'Overall company strategy, operational governance, and financial approvals.' },
    { id: 2, name: 'Technical / IT Department', head: 'Sonu Rana', membersCount: 5, description: 'Software engineering, data analytics, automation scripts, and portal maintenance.' },
    { id: 3, name: 'Operations & Floor', head: 'Aman Verma', membersCount: 4, description: 'Assembly line supervision, safety audits, and mechanical tolerances.' },
    { id: 4, name: 'Sales & Marketing', head: 'Neha Sharma', membersCount: 3, description: 'Client acquisition, regional target allocations, and pipeline revenue tracking.' },
  ]);

  const [canvaUrl, setCanvaUrl] = useState('https://www.canva.com/design/DAF...');
  const [inputUrl, setInputUrl] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveCanvaLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl) return;

    setCanvaUrl(inputUrl);
    setSaveSuccess(true);
    setInputUrl('');

    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row select-none">
      
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-semibold tracking-wider uppercase mb-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Organizational Structure
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Hierarchy Chart & Canva Integration
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Departmental hierarchy cards aur Canva chart view ko yahan manage karein.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Network className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Departmental Hierarchy Tree</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {departments.map((dept) => (
                <div key={dept.id} className="bg-slate-50 border border-slate-200/80 p-5 rounded-2xl space-y-3 flex flex-col justify-between hover:border-blue-300 transition group">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-700 rounded-md">
                      {dept.membersCount} Personnel
                    </span>
                    <h4 className="font-extrabold text-slate-900 text-sm group-hover:text-blue-600 transition">{dept.name}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{dept.description}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-200/60 text-[11px]">
                    <span className="text-slate-400 font-semibold">Head / Lead:</span> <strong className="text-slate-800">{dept.head}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm lg:col-span-2 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <LayoutTemplate className="w-5 h-5 text-purple-600" />
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Live Canva Hierarchy Chart Preview</h3>
                  </div>
                </div>
              </div>

              <div className="w-full h-[320px] bg-gradient-to-br from-slate-50 to-purple-50/40 rounded-2xl border border-slate-200 p-8 flex flex-col items-center justify-center text-center space-y-4 my-auto">
                <div className="w-14 h-14 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-600 shadow-sm">
                  <LayoutTemplate className="w-7 h-7" />
                </div>
                <div className="space-y-1 max-w-md">
                  <h4 className="font-bold text-slate-900 text-sm">View Company Hierarchy Chart on Canva</h4>
                  <p className="text-xs text-slate-500">
                    Canva ki security restrictions ki wajah se chart ko direct page par embed nahi kiya ja sakta. Aap niche diye gaye button se click karke full view dekh sakte hain.
                  </p>
                </div>
                <a
                  href={canvaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl transition inline-flex items-center gap-2 shadow-sm"
                >
                  <ExternalLink className="w-4 h-4" /> Open Chart in Canva
                </a>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Save className="w-5 h-5 text-blue-600" />
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Update Canva Link</h3>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Naya Canva share link yahan paste karein.
                </p>
              </div>

              <form onSubmit={handleSaveCanvaLink} className="space-y-4 text-xs">
                
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Canva Design URL</label>
                  <input
                    type="url"
                    required
                    value={inputUrl}
                    onChange={e => setInputUrl(e.target.value)}
                    placeholder="https://www.canva.com/design/..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 outline-none focus:border-blue-500 font-semibold"
                  />
                </div>

                {saveSuccess && (
                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold rounded-xl text-center flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Canva link updated successfully!
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition shadow-sm"
                >
                  <Save className="w-4 h-4" /> Update Link
                </button>
              </form>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}