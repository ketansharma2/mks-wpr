'use client';

import { useState } from 'react';
import AdminSidebar from '@/app/components/layout/sidebar/admin-sidebar';
import { Building, ShieldCheck, FileText, Upload, Trash2, ExternalLink, Network, CheckCircle2 } from 'lucide-react';

export default function AdminHierarchyPage() {
  const [departments] = useState([
    { id: 1, name: 'Executive Management', head: 'Vijyant Malik', membersCount: 2, description: 'Overall company strategy, operational governance, and financial approvals.' },
    { id: 2, name: 'Technical / IT Department', head: 'Sonu Rana', membersCount: 5, description: 'Software engineering, data analytics, automation scripts, and portal maintenance.' },
    { id: 3, name: 'Operations & Floor', head: 'Aman Verma', membersCount: 4, description: 'Assembly line supervision, safety audits, and mechanical tolerances.' },
    { id: 4, name: 'Sales & Marketing', head: 'Neha Sharma', membersCount: 3, description: 'Client acquisition, regional target allocations, and pipeline revenue tracking.' },
  ]);

  // PDF state for Canva downloaded PDF chart
  const [pdfDocuments, setPdfDocuments] = useState([
    { id: 1, title: 'Company Master Organizational Hierarchy Chart', uploadDate: '2026-07-15', fileSize: '1.8 MB', fileUrl: '#' },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleUploadPDF = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const newPdfObj = {
      id: pdfDocuments.length + 1,
      title: newTitle,
      uploadDate: new Date().toISOString().split('T')[0],
      fileSize: selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB` : '1.5 MB',
      fileUrl: '#'
    };

    setPdfDocuments([...pdfDocuments, newPdfObj]);
    setUploadSuccess(true);
    setNewTitle('');
    setSelectedFile(null);

    setTimeout(() => setUploadSuccess(false), 3000);
  };

  const handleDeletePDF = (id: number) => {
    if (confirm('Are you sure you want to delete this PDF?')) {
      setPdfDocuments(pdfDocuments.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row select-none">
      
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          
          <div className="bg-white p-3 sm:p-4 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Company Hierarchy Chart & PDFs
              </h1>
              
            </div>
          </div>

         

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-rose-600" />
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Your Uploaded PDFs</h3>
                </div>
                <span className="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-700 rounded-full border border-slate-200">
                  {pdfDocuments.length} Documents
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs whitespace-nowrap">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
                    <tr>
                      <th className="p-3">Document Title</th>
                      <th className="p-3">Upload Date</th>
                      <th className="p-3">Size</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {pdfDocuments.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="text-center py-8 text-slate-400 italic">
                          No PDF uploaded yet.
                        </td>
                      </tr>
                    ) : (
                      pdfDocuments.map((doc) => (
                        <tr key={doc.id} className="hover:bg-slate-50/60 transition">
                          <td className="p-3 font-bold text-slate-900 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-rose-500 flex-shrink-0" />
                            {doc.title}
                          </td>
                          <td className="p-3 font-mono text-slate-500">{doc.uploadDate}</td>
                          <td className="p-3 font-mono text-slate-600">{doc.fileSize}</td>
                          <td className="p-3 text-right space-x-2">
                            <a
                              href={doc.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded-lg transition inline-flex items-center gap-1 border border-blue-200"
                            >
                              <ExternalLink className="w-3 h-3" /> View PDF
                            </a>
                            <button
                              onClick={() => handleDeletePDF(doc.id)}
                              className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition inline-flex items-center"
                              title="Delete PDF"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-blue-600" />
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Upload PDF</h3>
                </div>
                
              </div>

              <form onSubmit={handleUploadPDF} className="space-y-4 text-xs">
                
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Document Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    placeholder="e.g. Company Hierarchy Chart"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 outline-none focus:border-blue-500 font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Select PDF File</label>
                  <input
                    type="file"
                    accept=".pdf"
                    required
                    onChange={e => setSelectedFile(e.target.files ? e.target.files[0] : null)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-slate-500 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                  />
                </div>

                {uploadSuccess && (
                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold rounded-xl text-center flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> PDF uploaded successfully!
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition shadow-sm"
                >
                  <Upload className="w-4 h-4" /> Upload PDF
                </button>
              </form>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}