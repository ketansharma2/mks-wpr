'use client';
import { useEffect, useState } from "react";
import adminMemberService from "@/services/adminMember.service";
import Link from 'next/link';
import AdminSidebar from '@/app/components/layout/sidebar/admin-sidebar';
import { Users, UserPlus, ShieldCheck, Mail, Lock, Building, Briefcase, Edit3, X, Check, Search, Eye, EyeOff } from 'lucide-react';

export default function AdminMembersPage() {
  // Helper for today's date format
  const getTodayDate = () => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  };


  // Members list state with all requested schema fields
  const [members, setMembers] = useState<any[]>([]);
const [loading, setLoading] = useState(false);

  // State to toggle password visibility row-wise or globally for admin view
  const [showPasswords, setShowPasswords] = useState<Record<number, boolean>>({});

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');

  // Modal states (Add & Edit)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeMemberId, setActiveMemberId] = useState<number | null>(null);

  // Form Fields State
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formDepartment, setFormDepartment] = useState('Technical');
  const [formDesignation, setFormDesignation] = useState('');
  const [formUserType, setFormUserType] = useState('MEMBER');
  const [formStatus, setFormStatus] = useState('Active');
  const [successMsg, setSuccessMsg] = useState(false);

  const togglePasswordVisibility = (id: number) => {
    setShowPasswords(prev => ({ ...prev, [id]: !prev[id] }));
  };


   const handleAddMember = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  await adminMemberService.createMember({
    name: formName,
    email: formEmail,
    password: formPassword,
    department: formDepartment,
    designation: formDesignation,
    role: formUserType,
    isActive: formStatus === "Active",
  });

  await fetchMembers();

  setIsAddModalOpen(false);

  resetForm();
};

  // Handle Add Member Form Submit
 

  // Open Edit Modal
  const handleOpenEdit = async (
  member: any
) => {

  const response =
    await adminMemberService.getMember(
      member._id
    );

  const data = response.data;

  setActiveMemberId(data._id);

  setFormName(data.name);

  setFormEmail(data.email);

  setFormPassword("");

  setFormDepartment(data.department);

  setFormDesignation(data.designation);

  setFormUserType(data.role);

  setFormStatus(
    data.isActive ? "Active" : "Inactive"
  );

  setIsEditModalOpen(true);
};

  // Handle Edit Member Form Submit
  const handleUpdateMember = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  if (!activeMemberId) return;

  await adminMemberService.updateMember(
    String(activeMemberId),
    {
      name: formName,
      email: formEmail,
      password: formPassword,
      department: formDepartment,
      designation: formDesignation,
      role: formUserType,
      isActive: formStatus === "Active",
    }
  );

  await fetchMembers();

  setIsEditModalOpen(false);

  resetForm();
};

  const resetForm = () => {
    setFormName('');
    setFormEmail('');
    setFormPassword('');
    setFormDepartment('Technical');
    setFormDesignation('');
    setFormUserType('MEMBER');
    setFormStatus('Active');
  };

  // Filtered members calculation
  const filteredMembers = members.filter(m => {
    let matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.email.toLowerCase().includes(searchQuery.toLowerCase());
    let matchesDept = deptFilter === 'All' || m.department === deptFilter;
    return matchesSearch && matchesDept;
  });


useEffect(() => {
  fetchMembers();
}, []);

const fetchMembers = async () => {
  try {
    setLoading(true);

    const response =
      await adminMemberService.getMembers();

    setMembers(response.data.items);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row select-none">
      
      {/* Admin Sidebar */}
      <AdminSidebar />

      {/* Main Workspace */}
      <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Header Banner */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-semibold tracking-wider uppercase mb-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> User Management
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Team Members Directory
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Onboard personnel, review login passwords, assign roles (Admin/Member), and manage active statuses.
              </p>
            </div>
            <button
              onClick={() => { resetForm(); setIsAddModalOpen(true); }}
              className="flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-b from-blue-500 to-blue-600 text-white font-semibold text-xs rounded-xl shadow-sm hover:from-blue-600 hover:to-blue-700 transition"
            >
              <UserPlus className="w-4 h-4" /> Add New Member
            </button>
          </div>

          {/* Members Table Section with Search & Filters */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search by name or email..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <select
                  value={deptFilter}
                  onChange={e => setDeptFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-700 px-3 py-2 rounded-xl text-xs font-semibold outline-none"
                >
                  <option value="All">Dept: All</option>
                  <option value="Technical">Technical</option>
                  <option value="Operations">Operations</option>
                  <option value="Sales">Sales</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="HR">HR</option>
                </select>

                <span className="text-xs font-semibold px-3 py-1.5 bg-blue-50 text-blue-700 rounded-xl border border-blue-100">
                  {filteredMembers.length} Members
                </span>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
                  <tr>
                    <th className="p-3">Create Date</th>
                    <th className="p-3">Member Name</th>
                    <th className="p-3">Work Email</th>
                    <th className="p-3">Password (Admin View)</th>
                    <th className="p-3">Department</th>
                    <th className="p-3">Designation</th>
                    <th className="p-3">User Type</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredMembers.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="text-center py-8 text-slate-400 italic">
                        No team members found matching your search.
                      </td>
                    </tr>
                  ) : (
                    filteredMembers.map((member) => (
                      <tr key={member._id} className="hover:bg-slate-50/65 transition">
                        <td className="p-3 font-mono text-slate-500">{new Date(member.createdAt).toLocaleDateString()}</td>
                        <td className="p-3 font-bold text-slate-900 flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                            {member.name[0]}
                          </div>
                          {member.name}
                        </td>
                        <td className="p-3 text-slate-600 font-mono">{member.email}</td>
                        <td className="p-3 font-mono text-slate-700">
                          <div className="inline-flex items-center gap-2 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200">
                            <span>{showPasswords[member._id] ? member.password : '••••••••'}</span>
                            <button 
                              onClick={() => togglePasswordVisibility(member._id)} 
                              className="text-slate-400 hover:text-slate-700 transition"
                              title={showPasswords[member._id] ? 'Hide Password' : 'Reveal Password'}
                            >
                              {showPasswords[member._id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </td>
                        <td className="p-3">
                          <span className="px-2.5 py-1 bg-slate-100 font-semibold text-slate-700 rounded-lg border border-slate-200 text-[11px]">
                            {member.department}
                          </span>
                        </td>
                        <td className="p-3 text-slate-600">{member.designation}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded font-semibold text-[10px] ${
                            member.role === 'ADMIN' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' : 'bg-blue-50 text-blue-700 border border-blue-100'
                          }`}>
                            {member.role}
                          </span>
                        </td>
                        <td className="p-3">
                          <span
  className={`px-2 py-0.5 rounded font-semibold text-[10px] ${
    member.isActive
      ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
      : "bg-rose-50 text-rose-700 border border-rose-100"
  }`}
>
  {member.isActive ? "Active" : "Inactive"}
</span>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => handleOpenEdit(member)}
                            className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded-xl transition border border-blue-200 flex items-center gap-1 ml-auto"
                          >
                            <Edit3 className="w-3.5 h-3.5" /> Edit
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

      {/* ADD MEMBER MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl text-slate-800">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-blue-600" /> Onboard New Team Member
              </h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-900 p-1 rounded-lg hover:bg-slate-200/60 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="p-6 space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={e => setFormName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 outline-none focus:border-blue-500 font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Work Email (Login ID)</label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={e => setFormEmail(e.target.value)}
                    placeholder="rahul@mksindustrial.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Password</label>
                <input
                  type="text"
                  required
                  value={formPassword}
                  onChange={e => setFormPassword(e.target.value)}
                  placeholder="Set initial password..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 outline-none focus:border-blue-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Department</label>
                  <select
                    value={formDepartment}
                    onChange={e => setFormDepartment(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 outline-none focus:border-blue-500 font-semibold"
                  >
                    <option value="Technical">Technical</option>
                    <option value="Operations">Operations</option>
                    <option value="Sales">Sales</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="HR">HR</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Designation</label>
                  <input
                    type="text"
                    value={formDesignation}
                    onChange={e => setFormDesignation(e.target.value)}
                    placeholder="e.g. Developer"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">User Type</label>
                  <select
                    value={formUserType}
                    onChange={e => setFormUserType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 outline-none focus:border-blue-500 font-semibold"
                  >
                    <option value="MEMBER">MEMBER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Status</label>
                  <select
                    value={formStatus}
                    onChange={e => setFormStatus(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 outline-none focus:border-blue-500 font-semibold"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {successMsg && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold rounded-xl text-center">
                  ✓ Member added successfully!
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl flex items-center gap-1.5 transition shadow-sm"
                >
                  <Check className="w-3.5 h-3.5" /> Save Member
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* EDIT MEMBER MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl text-slate-800">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-blue-600" /> Edit Member Credentials & Role
              </h3>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="text-slate-400 hover:text-slate-900 p-1 rounded-lg hover:bg-slate-200/60 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateMember} className="p-6 space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={e => setFormName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 outline-none focus:border-blue-500 font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Work Email (Login ID)</label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={e => setFormEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Password</label>
                <input
                  type="text"
                  required={!isEditModalOpen}
                  value={formPassword}
                  onChange={e => setFormPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 outline-none focus:border-blue-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Department</label>
                  <select
                    value={formDepartment}
                    onChange={e => setFormDepartment(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 outline-none focus:border-blue-500 font-semibold"
                  >
                    <option value="Technical">Technical</option>
                    <option value="Operations">Operations</option>
                    <option value="Sales">Sales</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="HR">HR</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Designation</label>
                  <input
                    type="text"
                    value={formDesignation}
                    onChange={e => setFormDesignation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">User Type</label>
                  <select
                    value={formUserType}
                    onChange={e => setFormUserType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 outline-none focus:border-blue-500 font-semibold"
                  >
                    <option value="MEMBER">MEMBER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Status</label>
                  <select
                    value={formStatus}
                    onChange={e => setFormStatus(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 outline-none focus:border-blue-500 font-semibold"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {successMsg && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold rounded-xl text-center">
                  ✓ Member updated successfully!
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl flex items-center gap-1.5 transition shadow-sm"
                >
                  <Check className="w-3.5 h-3.5" /> Save Changes
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}