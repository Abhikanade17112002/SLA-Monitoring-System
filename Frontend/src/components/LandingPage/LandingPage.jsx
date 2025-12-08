// pages/LandingPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0b0f1a] to-black text-white flex flex-col">

      {/* Content Wrapper (push below navbar) */}
      <div className="flex flex-col md:flex-row items-center justify-between 
                      max-w-7xl mx-auto px-8 md:px-12 pt-32 pb-20 flex-1">

        {/* LEFT SIDE */}
        <div className="md:w-1/2 space-y-6">
          
          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-sm">
            Monitor APIs  
            <span className="block text-blue-500 drop-shadow-[0_0_12px_rgba(59,130,246,0.8)]">
              Before They Fail
            </span>
          </h2>

          <p className="text-gray-300 text-lg max-w-md leading-relaxed">
            Real-time uptime tracking · Latency insights · Incident alerts ·  
            SLA analytics — built for developers & engineering teams.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => navigate("/user/signup")}
              className="px-6 py-3 bg-blue-600 rounded-lg text-lg 
                         shadow-[0_0_20px_rgba(59,130,246,0.7)]
                         hover:bg-blue-700 hover:shadow-blue-500/60 transition-all"
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="px-6 py-3 border border-white/20 rounded-lg text-lg 
                         hover:border-blue-400 hover:text-blue-400 transition-all"
            >
              Live Dashboard
            </button>
          </div>
        </div>

        {/* RIGHT SIDE — GLASS CARD WITH ILLUSTRATION */}
        <div className="md:w-1/2 flex justify-center mt-12 md:mt-0">
          <div className="w-80 md:w-[420px] h-80 md:h-[420px] 
                          bg-white/5 border border-white/10 backdrop-blur-xl 
                          rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.4)]
                          flex items-center justify-center hover:scale-[1.03] transition-all duration-500">
            <img
              src="https://cdn-icons-png.flaticon.com/512/9068/9068643.png"
              alt="Monitoring Illustration"
              className="w-48 md:w-60 opacity-90 hover:scale-110 
                         transition-transform duration-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.7)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
