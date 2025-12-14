import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { handleLogOut } from "../../store/slices/AuthSlice/AuthSlice";
import {
  LayoutDashboard,
  User,
  LogOut,
  Settings,
  Network,
  ChevronDown,
} from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  console.log("logging USer ");
  console.log(user);

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogoutClick = () => {
    dispatch(handleLogOut());
    navigate("/");
    setOpen(false);
  };

  return (
    <nav className="w-full backdrop-blur-2xl bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-gray-900/95 border-b border-white/10 fixed top-0 left-0 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50 group-hover:shadow-purple-500/70 transition-all transform group-hover:scale-110">
            <Network size={24} className="text-white" />
          </div>
          <div>
            <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              SLA Monitor
            </div>
            <div className="text-xs text-gray-400 -mt-1">
              Real-time API Monitoring
            </div>
          </div>
        </div>

        {/* Center Navigation */}
        <div className="hidden md:flex justify-end gap-2">
          {user && (
            <button
              onClick={() => {
                if (user?.role === "Admin") {
                  navigate("/admin/dashboard");
                } else if (user?.role === "Developer") {
                  navigate("/developer/dashboard");
                } else if (user?.role === "User") {
                  navigate("/user/dashboard");
                }
              }}
              className="border border-gray-500 flex items-center gap-2 px-4 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              <LayoutDashboard size={18} />
              {user != null && user?.role === "Admin"
                ? "Admin Dashboard"
                : user?.role === "Developer"
                ? "Developer Dashboard"
                : "User Dashboard"}
            </button>
          )}

          {/* Right Section */}
          {user == null ? (
            <button
              onClick={() => navigate("/user/signin")}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 
                       hover:from-cyan-600 hover:to-purple-600 transition-all text-white 
                       font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 
                       transform hover:scale-105"
            >
              Sign In
            </button>
          ) : (
            <div className="relative" ref={dropdownRef}>
              {/* Profile Button */}
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-3 backdrop-blur-xl bg-white/10 px-4 py-2.5 
                         rounded-xl hover:bg-white/20 transition-all border border-white/10
                         hover:border-white/20 shadow-lg"
              >
                {/* Avatar */}
                <div
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 
                              flex items-center justify-center text-white font-bold text-sm shadow-lg"
                >
                  {user?.firstName?.charAt(0)?.toUpperCase()}
                  {user?.lastName?.charAt(0)?.toUpperCase()}
                </div>

                <div className="hidden sm:block text-left">
                  <p className="text-white font-semibold text-sm">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {user?.email?.substring(0, 20)}...
                  </p>
                </div>

                {/* Chevron */}
                <ChevronDown
                  size={18}
                  className={`text-gray-300 transition-transform duration-300 ${
                    open ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {open && (
                <div
                  className="absolute right-0 mt-3 w-64 backdrop-blur-2xl bg-gray-900/95 
                             border border-white/10 rounded-2xl shadow-2xl py-2 
                             animate-slideDown origin-top overflow-hidden"
                >
                  {/* User Info Section */}
                  <div className="px-4 py-3 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 
                                    flex items-center justify-center text-white font-bold shadow-lg"
                      >
                        {user?.firstName?.charAt(0)?.toUpperCase()}
                        {user?.lastName?.charAt(0)?.toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm truncate">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-gray-400 text-xs truncate">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <button
                      onClick={() => {
                        navigate("/user/profile");
                        setOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 
                               hover:text-white hover:bg-white/10 transition-all"
                    >
                      <User size={18} />
                      <span className="font-medium">Profile</span>
                    </button>

                    <button
                      onClick={() => {
                        if (user?.role === "Admin") {
                          navigate("/admin/dashboard");
                        } else if (user?.role === "Developer") {
                          navigate("/developer/dashboard");
                        } else if (user?.role === "User") {
                          navigate("/user/dashboard");
                        }
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 
                               hover:text-white hover:bg-white/10 transition-all"
                    >
                      <LayoutDashboard size={18} />
                      <span className="font-medium">Dashboard</span>
                    </button>

                    <button
                      onClick={() => {
                        navigate("/user/settings");
                        setOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 
                               hover:text-white hover:bg-white/10 transition-all"
                    >
                      <Settings size={18} />
                      <span className="font-medium">Settings</span>
                    </button>
                  </div>

                  {/* Logout Section */}
                  <div className="border-t border-white/10 py-2">
                    <button
                      onClick={handleLogoutClick}
                      className="flex items-center gap-3 w-full px-4 py-3 
                               text-red-400 hover:text-red-300 hover:bg-red-500/10 
                               transition-all font-medium"
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </nav>
  );
};

export default Header;
