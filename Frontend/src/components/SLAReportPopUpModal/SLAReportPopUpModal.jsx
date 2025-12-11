import React from "react";
import { XCircle, Timer, Gauge, Percent, AlertCircle, CheckCircle2, TrendingUp } from "lucide-react";

const SLAReportPopUpModal = ({ report, onClose }) => {
  if (!report) return null;

  const getUptimeColor = (uptime) => {
    if (uptime >= 99.9) return "text-green-400";
    if (uptime >= 99) return "text-yellow-400";
    return "text-red-400";
  };

  const getLatencyColor = (latency) => {
    if (latency < 200) return "text-green-400";
    if (latency < 500) return "text-yellow-400";
    return "text-red-400";
  };

  const getUptimeBgColor = (uptime) => {
    if (uptime >= 99.9) return "bg-green-500/20 border-green-500/30";
    if (uptime >= 99) return "bg-yellow-500/20 border-yellow-500/30";
    return "bg-red-500/20 border-red-500/30";
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-lg 
                  flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gradient-to-br from-slate-900 to-slate-800 
                    border border-white/20 rounded-2xl 
                    p-8 w-full max-w-md text-white 
                    shadow-[0_0_40px_rgba(0,0,0,0.6)] 
                    relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 hover:text-red-400 
                     transition-colors duration-200 hover:scale-110"
          aria-label="Close modal"
        >
          <XCircle size={28} />
        </button>

        {/* Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-center mb-1">
            SLA Report
          </h2>
          {report.apiName && (
            <p className="text-blue-400 text-sm text-center font-medium">
              {report.apiName}
            </p>
          )}
          <p className="text-gray-500 text-xs text-center mt-1">
            API ID: {report.apiId?.substring(0, 8)}...
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="space-y-4">
          {/* Uptime Percentage */}
          <div className={`p-5 rounded-xl border transition-colors duration-200
                          ${getUptimeBgColor(report.uptimePercentage)}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Percent className="text-blue-400" size={24} />
                </div>
                <div>
                  <span className="text-gray-300 text-sm font-medium">Uptime</span>
                  <p className="text-xs text-gray-500">Overall availability</p>
                </div>
              </div>
              <span className={`font-bold text-2xl ${getUptimeColor(report.uptimePercentage)}`}>
                {report.uptimePercentage?.toFixed(2)}%
              </span>
            </div>
          </div>

          {/* Avg Latency */}
          <div className="bg-white/5 p-5 rounded-xl border border-white/10 
                          hover:bg-white/10 transition-colors duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Gauge className="text-green-400" size={24} />
                </div>
                <div>
                  <span className="text-gray-300 text-sm font-medium">Avg Latency</span>
                  <p className="text-xs text-gray-500">Response time</p>
                </div>
              </div>
              <span className={`font-bold text-2xl ${getLatencyColor(report.avgLatency)}`}>
                {report.avgLatency} ms
              </span>
            </div>
          </div>

          {/* Total Downtime */}
          <div className="bg-white/5 p-5 rounded-xl border border-white/10 
                          hover:bg-white/10 transition-colors duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <Timer className="text-red-400" size={24} />
                </div>
                <div>
                  <span className="text-gray-300 text-sm font-medium">Total Downtime</span>
                  <p className="text-xs text-gray-500">In monitoring period</p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-bold text-2xl text-red-400 block">
                  {report.totalDowntimeMinutes}
                </span>
                <span className="text-xs text-gray-500">minutes</span>
              </div>
            </div>
          </div>

          {/* Additional Metrics if available */}
          {report.totalRequests && (
            <div className="bg-white/5 p-5 rounded-xl border border-white/10 
                            hover:bg-white/10 transition-colors duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <TrendingUp className="text-purple-400" size={24} />
                  </div>
                  <div>
                    <span className="text-gray-300 text-sm font-medium">Total Requests</span>
                    <p className="text-xs text-gray-500">Monitoring checks</p>
                  </div>
                </div>
                <span className="font-bold text-2xl text-purple-400">
                  {report.totalRequests.toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* SLA Status Badge */}
        <div className={`mt-6 p-4 rounded-lg border transition-colors duration-200
                        ${report.uptimePercentage >= 99.9 
                          ? 'bg-green-500/10 border-green-500/30' 
                          : 'bg-yellow-500/10 border-yellow-500/30'}`}>
          <div className="flex items-center justify-center gap-2">
            {report.uptimePercentage >= 99.9 ? (
              <>
                <CheckCircle2 className="text-green-400" size={20} />
                <span className="text-green-400 font-semibold">SLA Target Met (99.9%+)</span>
              </>
            ) : (
              <>
                <AlertCircle className="text-yellow-400" size={20} />
                <span className="text-yellow-400 font-semibold">
                  Below SLA Target ({(99.9 - report.uptimePercentage).toFixed(2)}% gap)
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SLAReportPopUpModal;