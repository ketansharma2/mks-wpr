'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { LayoutDashboard, Users, ClipboardList, FileText, BookOpen , LogOut, Menu, X, User, ShieldCheck, Mail, Lock, Building, Briefcase, HelpCircle, Send } from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Admin Profile editable/view states
  const [profileData, setProfileData] = useState({
    fullName: 'System Administrator',
    designation: 'Chief Operations Administrator',
    department: 'Management',
    email: 'admin@mksindustrial.com',
    password: 'Admin@MKS2026'
  });

  // Support / Issue form state
  const [issueText, setIssueText] = useState('');
  const [issueSubmitted, setIssueSubmitted] = useState(false);

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'WPR', href: '/admin/wpr', icon: FileText },
    { label: 'R&R', href: '/admin/rnr', icon: BookOpen },
    { label: 'Hierarchy', href: '/admin/hierarchy', icon: Building },
    { label: 'Team Members', href: '/admin/members', icon: Users },
    { label: 'Help & Support', href: '/admin/help', icon: HelpCircle },

  ];

  const handleIssueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueText.trim()) return;
    setIssueSubmitted(true);
    setIssueText('');
    setTimeout(() => setIssueSubmitted(false), 3000);
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-white text-slate-900 flex items-center justify-between p-4 border-b border-slate-200 sticky top-0 z-50 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 relative flex-shrink-0 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden p-1">
            <Image src="/MKS_Logo2.png" alt="MKS Logo" width={40} height={40} className="w-full h-full object-cover rounded-lg" priority />
          </div>
          <span className="text-sm font-bold tracking-wider">MKS Industrial Solutions</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-950/40 z-40 md:hidden backdrop-blur-xs"
        />
      )}

      {/* Hover-to-Expand 3D Admin Sidebar Container */}
      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed md:sticky top-0 h-screen bg-white/95 backdrop-blur-2xl text-slate-700 flex flex-col border-r border-slate-200 shadow-[15px_0_40px_rgba(0,0,0,0.05),1px_0_0_rgba(255,255,255,0.8)_inset] justify-between z-50 transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0 w-72' : '-translate-x-full md:translate-x-0'
        } ${isHovered ? 'md:w-72' : 'md:w-24'}`}
      >
        <div className="p-4 md:p-6 flex flex-col h-full overflow-hidden">
          
          {/* Logo & Brand Header */}
          <div className={`flex flex-col mb-6 pb-5 border-b border-slate-200 relative transition-all duration-300 ${!isHovered ? 'md:items-center' : 'items-start'} gap-3`}>
            <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent pointer-events-none" />
            
            {/* Logo Icon */}
            <div className="w-16 h-16 mx-auto flex-shrink-0 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center shadow-xs relative overflow-hidden p-0">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none" />
              <Image
                src="/MKS_Logo2.png"
                alt="MKS Logo"
                width={100}
                height={100}
                className="w-full h-full object-contain rounded-xl relative z-10"
                priority
              />
            </div>

            {/* Company Name */}
            <div className={`transition-opacity duration-300 overflow-hidden text-center w-full ${!isHovered && 'md:hidden'}`}>
              <h2 className="text-sm font-bold text-slate-900 tracking-wide uppercase leading-tight">INDUSTRIAL SOLUTIONS</h2>
            </div>
          </div>
          
          {/* Navigation Items */}
          <nav className="space-y-2.5 text-sm font-medium flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  title={!isHovered ? item.label : undefined}
                  className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-300 group whitespace-nowrap overflow-hidden ${
                    isActive
                      ? 'bg-gradient-to-b from-blue-500 to-blue-600 text-white font-semibold shadow-[0_6px_20px_rgba(37,99,235,0.35),0_1px_2px_rgba(255,255,255,0.2)_inset] md:translate-x-0'
                      : 'hover:bg-slate-100 hover:text-slate-900 text-slate-600'
                  } ${!isHovered && 'md:justify-center'}`}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isActive ? 'scale-110 text-white' : 'group-hover:scale-110 group-hover:text-blue-600 text-slate-500'}`} />
                  <span className={`tracking-wide text-sm sm:text-sm transition-opacity duration-300 ${!isHovered && 'md:hidden'}`}>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Admin Profile Card Clickable */}
        <div 
          onClick={() => setProfileModalOpen(true)}
          className={`mx-4 mb-3 p-3 bg-slate-50 border border-slate-200 rounded-2xl transition-all duration-300 flex items-center gap-3.5 cursor-pointer hover:border-blue-400 hover:bg-blue-50/40 group ${!isHovered && 'md:justify-center md:mx-2 md:p-2'}`}
          title={!isHovered ? 'Administrator' : undefined}
        >
          <div className="w-10 h-10 flex-shrink-0 bg-blue-100 border border-blue-200 rounded-xl flex items-center justify-center text-blue-600 font-bold group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className={`transition-opacity duration-300 whitespace-nowrap overflow-hidden ${!isHovered && 'md:hidden'}`}>
            <h4 className="text-sm font-bold text-slate-900 leading-tight">Admin</h4>
            <span className="text-xs text-blue-600 font-semibold">Superuser</span>
          </div>
        </div>

        {/* Log Out Section */}
        <div className="p-4 md:p-6 border-t border-slate-200 bg-slate-50/60 overflow-hidden whitespace-nowrap">
          <Link
            href="/"
            title={!isHovered ? 'Log Out' : undefined}
            className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-rose-600 hover:bg-rose-50 hover:text-rose-700 text-xs sm:text-sm font-semibold transition-all duration-300 ${!isHovered && 'md:justify-center'}`}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className={`transition-opacity duration-300 ${!isHovered && 'md:hidden'}`}>Log Out</span>
          </Link>
        </div>
      </aside>

      {/* ADMIN PROFILE & SETTINGS MODAL */}
      {profileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl text-slate-800">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-base">Admin Profile & Settings</h3>
              </div>
              <button 
                onClick={() => setProfileModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-200/60 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
              
              {/* Profile Details Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600">Administrator Credentials</h4>
                  <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-xs px-2.5 py-1 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-100 transition font-semibold"
                  >
                    {isEditing ? 'Save Profile' : 'Edit Profile'}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* Full Name */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-slate-500 flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-blue-600" /> Administrator Name</span>
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={profileData.fullName} 
                        onChange={e => setProfileData({...profileData, fullName: e.target.value})}
                        className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-slate-900 outline-none"
                      />
                    ) : (
                      <p className="font-bold text-slate-900 text-sm">{profileData.fullName}</p>
                    )}
                  </div>

                  {/* Designation */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-slate-500 flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-blue-600" /> Designation</span>
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={profileData.designation} 
                        onChange={e => setProfileData({...profileData, designation: e.target.value})}
                        className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-slate-900 outline-none"
                      />
                    ) : (
                      <p className="font-bold text-slate-900 text-sm">{profileData.designation}</p>
                    )}
                  </div>

                  {/* Department */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-slate-500 flex items-center gap-1.5"><Building className="w-3.5 h-3.5 text-blue-600" /> Department</span>
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={profileData.department} 
                        onChange={e => setProfileData({...profileData, department: e.target.value})}
                        className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-slate-900 outline-none"
                      />
                    ) : (
                      <p className="font-bold text-slate-900 text-sm">{profileData.department}</p>
                    )}
                  </div>

                  {/* Email (Locked) */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-slate-500 flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-blue-600" /> Email (Locked)</span>
                    <p className="font-bold text-slate-700 text-sm truncate">{profileData.email}</p>
                  </div>

                  {/* Password */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1 sm:col-span-2">
                    <span className="text-slate-500 flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-blue-600" /> Password (Secure)</span>
                    <p className="font-mono font-bold text-slate-900 text-sm">{profileData.password}</p>
                  </div>
                </div>
              </div>

              
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button 
                onClick={() => setProfileModalOpen(false)}
                className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-semibold transition"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}