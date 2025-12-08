


import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { handleLogOut } from "../../store/slices/AuthSlice/AuthSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

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
    navigate("/user/signin");
  };

  return (
    <nav className="w-full bg-white/10 backdrop-blur-lg border-b border-white/20 fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-white cursor-pointer flex items-center gap-1"
        >
          SLA
          <span className="text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.9)]">
            Monitor
          </span>
        </div>

        {/* Center Navigation */}
        <div className="hidden md:flex gap-8 text-white/80 font-medium">
          <button onClick={() => navigate("/dashboard")} className="hover:text-white transition">Dashboard</button>
          <button onClick={() => navigate("/reports")} className="hover:text-white transition">Reports</button>
          <button onClick={() => navigate("/alerts")} className="hover:text-white transition">Alerts</button>
        </div>

        {/* Right Section */}
        {user == null ? (
          <button
            onClick={() => navigate("/user/signin")}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 
                       transition-all text-white shadow-lg"
          >
            Sign In
          </button>
        ) : (
          <div className="relative" ref={dropdownRef}>
            {/* Profile Button */}
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3 bg-white/10 px-3 py-2 rounded-xl 
                         hover:bg-white/20 transition-all backdrop-blur-md"
            >
              {/* Avatar */}
              <div className="w-9 h-9 rounded-full bg-gradient-to-br 
                              from-blue-500 to-blue-700 flex items-center justify-center 
                              text-white font-semibold shadow-md">
                {user?.firstName?.charAt(0)?.toUpperCase() + " " + user?.lastName?.charAt(0)?.toUpperCase()}
              </div>

              <span className="text-white font-medium hidden sm:block">
                {user?.name}
              </span>

              {/* Chevron */}
              <svg
                className={`w-4 h-4 text-white transition-transform duration-300 ${
                  open ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <Link to={"admin/dashboard"}>asa</Link>

            {/* Dropdown */}
            {open && (
              <div
                className="absolute right-0 mt-3 w-48 bg-gray-100 rounded-xl shadow-2xl py-2 
                           animate-fadeIn origin-top border border-gray-100"
              >
                <button
                  onClick={() => navigate("/user/profile")}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  👤 Profile
                </button>

                <hr className="my-1" />

                <button
                  onClick={handleLogoutClick}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                >
                  🔓 Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
