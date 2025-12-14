import React from "react";
import { useNavigate } from "react-router-dom";
import { Activity, BarChart2, Bell, ShieldCheck } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0b0f1a] to-black text-white flex flex-col">

      {/* MAIN HERO SECTION */}
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
              onClick={() => navigate("/live/dashboard")}
              className="px-6 py-3 border border-white/20 rounded-lg text-lg 
                         hover:border-blue-400 hover:text-blue-400 transition-all"
            >
              Live Dashboard
            </button>
          </div>
        </div>

        {/* RIGHT SIDE — ILLUSTRATION */}
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

      {/* ================================ */}
      {/* 1️⃣ — TRUSTED BY SECTION */}
      {/* ================================ */}
      <section className="py-16 border-t border-white/5 bg-white/5 backdrop-blur-xl">
        <h3 className="text-center text-xl text-gray-300 mb-8">Trusted by teams worldwide</h3>

        <div className="flex items-center justify-center gap-10 opacity-70 flex-wrap px-6">
          <img src="https://dummyimage.com/120x40/2d2d2d/ffffff&text=TechNova" className="h-10" />
          <img src="https://dummyimage.com/120x40/2d2d2d/ffffff&text=CodeWorks" className="h-10" />
          <img src="https://dummyimage.com/120x40/2d2d2d/ffffff&text=CloudSys" className="h-10" />
          <img src="https://dummyimage.com/120x40/2d2d2d/ffffff&text=NeoAPI" className="h-10" />
        </div>
      </section>

      {/* ================================ */}
      {/* 2️⃣ — SLA MONITORING SHOWCASE */}
      {/* ================================ */}
      <section className="max-w-7xl mx-auto px-8 md:px-12 py-20">
        <h3 className="text-3xl font-bold mb-10 text-center">
          Instant Visibility Into Your API Health
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card */}
          <div className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-xl shadow-lg">
            <h4 className="font-semibold text-lg">API Uptime</h4>
            <p className="text-gray-400 text-sm mt-2">Track availability in real time.</p>
            <div className="w-full bg-gray-800 h-3 mt-4 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 w-[98%]"></div>
            </div>
            <p className="text-green-400 text-sm mt-2">99.8% uptime</p>
          </div>

          {/* Card */}
          <div className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-xl shadow-lg">
            <h4 className="font-semibold text-lg">Latency Monitoring</h4>
            <p className="text-gray-400 text-sm mt-2">Detect performance degradation.</p>
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex justify-between text-gray-400 text-sm">
                <span>Avg:</span> <span>120ms</span>
              </div>
              <div className="flex justify-between text-gray-400 text-sm">
                <span>P95:</span> <span>320ms</span>
              </div>
              <div className="flex justify-between text-gray-400 text-sm">
                <span>P99:</span> <span>450ms</span>
              </div>
            </div>
          </div>

          {/* Card */}
          <div className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-xl shadow-lg">
            <h4 className="font-semibold text-lg">Incidents Timeline</h4>
            <p className="text-gray-400 text-sm mt-2">Outages & recoveries at a glance.</p>
            <ul className="mt-4 space-y-2 text-sm text-gray-300">
              <li>• 2 min outage — resolved</li>
              <li>• High latency spike — yesterday</li>
              <li>• Scheduled maintenance — 3 days ago</li>
            </ul>
          </div>

        </div>
      </section>

      {/* ================================ */}
      {/* 3️⃣ — TESTIMONIALS */}
      {/* ================================ */}
      <section className="py-20 bg-white/5 backdrop-blur-lg border-t border-white/10">
        <h3 className="text-3xl font-bold text-center mb-12">What Our Users Say</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-8">
          
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl shadow-xl">
            <p className="text-gray-300">
              “The SLA dashboard saved our team during multiple outages.
              Alerts were instant. Amazing tool!”
            </p>
            <p className="text-blue-400 mt-4 font-semibold">— DevOps Lead</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-xl shadow-xl">
            <p className="text-gray-300">
              “Latency analytics helped us diagnose API bottlenecks in minutes.
              A must-have for any SaaS team.”
            </p>
            <p className="text-blue-400 mt-4 font-semibold">— Backend Engineer</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-xl shadow-xl">
            <p className="text-gray-300">
              “Simple, powerful & beautifully designed. Monitoring has never felt this effortless.”
            </p>
            <p className="text-blue-400 mt-4 font-semibold">— CTO</p>
          </div>

        </div>
      </section>

      {/* ================================ */}
      {/* 4️⃣ — FINAL CTA SECTION */}
      {/* ================================ */}
      <section className="py-24 text-center max-w-4xl mx-auto px-8">
        <h3 className="text-4xl font-bold mb-6">
          Ready to Monitor Smarter?
        </h3>

        <p className="text-gray-400 text-lg mb-8">
          Start tracking uptime, incidents & latency in minutes.
        </p>

        <button
          onClick={() => navigate("/user/signup")}
          className="px-10 py-4 text-lg bg-blue-600 rounded-xl 
                     shadow-[0_0_30px_rgba(59,130,246,0.5)]
                     hover:bg-blue-700 transition-all"
        >
          Create Free Account
        </button>
      </section>

      {/* Extra Spacing */}
      <div className="h-20"></div>
    </div>
  );
};

export default LandingPage;
