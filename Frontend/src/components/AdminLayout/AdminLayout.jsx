

import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Settings,
  AlertTriangle,
  Bell,
  Users,
  BarChart,
  Network,
  Menu,
  X,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { handleLogOut} from "../../store/slices/AuthSlice/AuthSlice";


const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch() ;
    const { user } = useSelector((state) => state.auth);

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin/dashboard" },
    { name: "Manage APIs", icon: <Network size={20} />, path: "/admin/apis" },
    { name: "Alerts", icon: <Bell size={20} />, path: "/admin/alerts" },
    { name: "Users", icon: <Users size={20} />, path: "/admin/users" },
    { name: "Incidents", icon: <AlertTriangle size={20} />, path: "/admin/incidents" },
    { name: "SLA Reports", icon: <BarChart size={20} />, path: "/admin/reports" },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
    dispatch(handleLogOut())
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">

      {/* MOBILE OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden z-30 animate-fade-in"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static top-0 left-0 h-full z-40
          backdrop-blur-2xl bg-gradient-to-b from-gray-900/95 to-gray-950/95
          border-r border-white/10
          transition-all duration-300 ease-in-out
          shadow-2xl

          ${open ? "w-72" : "w-20"} 
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >

        {/* HEADER */}
        <div className="flex items-center gap-3 px-5 py-6 border-b border-white/10">
          {/* Toggle Button */}
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-xl hover:bg-white/10 transition-all transform hover:scale-110 flex items-center justify-center backdrop-blur-sm"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <div
            className={`flex items-center gap-2 transition-all duration-300 ${
              !open && "opacity-0 -translate-x-3 pointer-events-none"
            }`}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50">
              <Network size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                SLA Monitor
              </h1>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* MENU */}
        <nav className="mt-6 px-3 flex flex-col gap-2">
          {menuItems.map((item, i) => {
            const active = isActive(item.path);
            return (
              <button
                key={i}
                onClick={() => {
                  navigate(item.path);
                  if (window.innerWidth < 768) setOpen(false);
                }}
                className={`
                  group relative w-full flex items-center gap-4 px-4 py-3.5 
                  rounded-xl transition-all duration-200
                  ${active 
                    ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-white shadow-lg shadow-cyan-500/20" 
                    : "hover:bg-white/10 text-gray-300 hover:text-white border border-transparent"
                  }
                `}
              >
                {/* Active Indicator */}
                {active && (
                  <div className="absolute left-0 w-1 h-8 bg-gradient-to-b from-cyan-500 to-purple-500 rounded-r-full" />
                )}

                {/* Icon */}
                <div className={`${active ? "text-cyan-400" : "text-gray-400 group-hover:text-cyan-400"} transition-colors`}>
                  {item.icon}
                </div>

                {/* Label */}
                <span className={`${!open && "hidden"} text-sm font-medium flex-1 text-left`}>
                  {item.name}
                </span>

                {/* Arrow for active item */}
                {active && open && (
                  <ChevronRight size={16} className="text-cyan-400" />
                )}
              </button>
            );
          })}
        </nav>

        {/* BOTTOM SECTION - USER & LOGOUT */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/10 backdrop-blur-xl bg-gray-900/50">
          {/* User Profile */}
          {open && (
            <div className="mb-3 px-4 py-3 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                  {
                   user && user.firstName[0] +" " + user.lastName[0]
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{user && user.firstName +" " + user.lastName}</p>
                  <p className="text-xs text-gray-400 truncate">{user && user.emailId}</p>
                </div>
              </div>
            </div>
          )}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl
                       bg-gradient-to-r from-red-500/20 to-pink-500/20 
                       hover:from-red-500/30 hover:to-pink-500/30
                       text-red-300 hover:text-red-200
                       border border-red-500/30 hover:border-red-500/50
                       transition-all transform hover:scale-105 shadow-lg hover:shadow-red-500/30"
          >
            <LogOut size={20} className="text-red-400" />
            <span className={`${!open && "hidden"} text-sm font-semibold`}>
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Bar */}
        <div className="sticky top-0 z-20 backdrop-blur-xl bg-gray-900/80 border-b border-white/10 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {menuItems.find(item => item.path === location.pathname)?.name || "Admin Panel"}
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-3">
              <button className="p-3 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-all relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              <button className="p-3 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          <Outlet />
        </div>
      </main>

      {/* FLOATING MOBILE BUTTON */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="md:hidden fixed bottom-6 left-6 bg-gradient-to-r from-cyan-500 to-purple-500 p-4 rounded-2xl shadow-2xl shadow-purple-500/50 z-50 transform hover:scale-110 transition-all"
        >
          <Menu size={24} />
        </button>
      )}
    </div>
  );
};

export default AdminLayout;