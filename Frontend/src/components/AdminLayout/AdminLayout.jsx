import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
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
} from "lucide-react";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true); // DESKTOP: sidebar open

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/admin/dashboard" },
    { name: "Manage APIs", icon: <Network size={18} />, path: "/admin/apis" },
    { name: "Thresholds", icon: <Settings size={18} />, path: "/admin/thresholds" },
    { name: "Alerts", icon: <Bell size={18} />, path: "/admin/alerts" },
    { name: "Users", icon: <Users size={18} />, path: "/admin/users" },
    { name: "Incidents", icon: <AlertTriangle size={18} />, path: "/admin/incidents" },
    { name: "SLA Reports", icon: <BarChart size={18} />, path: "/admin/reports" },
    { name: "System Settings", icon: <Settings size={18} />, path: "/admin/system" },
  ];

  return (
    <div className="flex h-screen bg-[#0b0f1a] text-white overflow-hidden">

      {/* MOBILE OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static top-0 left-0 h-full z-40
          bg-white/5 backdrop-blur-xl border-r border-white/10
          transition-all duration-300 ease-in-out

          ${open ? "w-64" : "w-20"} 
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >

        {/* HEADER — PERFECT HAMBURGER ALIGNMENT */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">

          {/* Always aligned toggle button */}
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded hover:bg-white/10 transition flex items-center justify-center"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Logo */}
          <h1
            className={`text-xl font-bold transition-all duration-300 
              ${!open && "opacity-0 -translate-x-3 pointer-events-none"}
            `}
          >
            SLA<span className="text-blue-500">Admin</span>
          </h1>
        </div>

        {/* MENU */}
        <nav className="mt-4 flex flex-col gap-1">
          {menuItems.map((item, i) => (
            <button
              key={i}
              onClick={() => {
                navigate(item.path);
                if (window.innerWidth < 750) setOpen(false);
              }}
              className="w-full flex items-center gap-4 px-5 py-3 
                         hover:bg-white/10 text-gray-300 rounded-lg transition"
            >
              {item.icon}
              <span className={`${!open && "hidden"} text-sm`}>
                {item.name}
              </span>
            </button>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main
        className={`
          flex-1 p-6 overflow-y-auto transition-all duration-300
          ${open ? "md:ml-5" : "md:ml-5"}
        `}
      >
        <Outlet />
      </main>

      {/* FLOATING MOBILE BUTTON */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="md:hidden fixed top-4 left-4 bg-blue-600 p-3 rounded-lg shadow-lg"
        >
          <Menu size={20} />
        </button>
      )}
    </div>
  );
};

export default AdminLayout;
