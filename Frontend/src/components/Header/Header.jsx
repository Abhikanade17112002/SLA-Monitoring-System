// components/Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <nav
      className="w-full bg-white/5 backdrop-blur-xl border-b border-white/10
                 fixed top-0 left-0 z-50 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide text-white">
          SLA<span className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">
            Monitor
          </span>
        </h1>

        {/* Right Button */}
        <button
          onClick={() => navigate("/user/signin")}
          className="px-5 py-2 rounded-lg bg-blue-600/80 hover:bg-blue-700 
                     shadow-[0_0_12px_rgba(59,130,246,0.6)] hover:shadow-blue-500/50 
                     transition-all text-white font-medium"
        >
          Sign In
        </button>
      </div>
    </nav>
  );
};

export default Header;
