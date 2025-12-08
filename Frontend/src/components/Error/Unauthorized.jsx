import React from "react";
import { useNavigate } from "react-router-dom";
import { ShieldAlert } from "lucide-react";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center 
                    bg-gradient-to-b from-black via-[#0b0f1a] to-black text-white px-4">

      <div className="w-full max-w-md bg-white/5 backdrop-blur-2xl 
                      border border-white/10 rounded-2xl p-10 
                      shadow-[0_0_40px_rgba(0,0,0,0.6)] text-center">

        <div className="flex justify-center mb-4">
          <ShieldAlert className="w-16 h-16 text-yellow-400 
                                  drop-shadow-[0_0_12px_rgba(255,215,0,0.5)]" />
        </div>

        <h1 className="text-6xl font-extrabold tracking-wide text-white">
          403
        </h1>

        <h2 className="text-2xl font-semibold mt-4 text-gray-300">
          Unauthorized Access
        </h2>

        <p className="text-gray-400 mt-2 text-sm">
          You don't have permission to view this page.  
          Please contact your admin if this is a mistake.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-6 w-full py-3 bg-blue-600 rounded-xl 
                     hover:bg-blue-700 transition-all
                     shadow-[0_0_20px_rgba(59,130,246,0.7)]
                     hover:shadow-blue-500/40"
        >
          Return to Dashboard
        </button>
      </div>

      <p className="mt-6 text-gray-500 text-xs">
        © {new Date().getFullYear()} SLA Monitor
      </p>
    </div>
  );
};

export default Unauthorized;
