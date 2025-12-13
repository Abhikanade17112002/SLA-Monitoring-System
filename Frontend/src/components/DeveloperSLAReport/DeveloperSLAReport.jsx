import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BarChart3, AlertCircle, XCircle, CheckCircle2, Clock, Activity } from "lucide-react";
import SLAReportPopUpModal from "../SLAReportPopUpModal/SLAReportPopUpModal";
import axios from "axios";

const DeveloperSLAReport = () => {
  const { monitoredApis } = useSelector((state) => state.monitor);
  const [selectedReport, setSelectedReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingApiId, setLoadingApiId] = useState(null);
  const [error, setError] = useState(null);

  const fetchReport = async (apiId) => {
    try {
      setLoading(true);
      setLoadingApiId(apiId);
      setError(null);

      const res = await axios.get(
        `${import.meta.env.VITE_METRICS_SERVICE_BASE_URL}/api/${apiId}/sla-summary`,
        {
            headers :{
                Authorization : `${JSON.parse( localStorage.getItem("jwtToken") )}`
            }
        }
      );
      const data = await res.data ;
      console.log("This Is The Response From SLA");
      console.log(data);
      setSelectedReport({
        apiId,
        apiName: monitoredApis.find(api => api.apiId === apiId)?.apiName,
        ...res.data,
      });
      setLoading(false);
      
    } catch (err) {
      setError(`Failed to fetch SLA report: ${err.response?.data?.message || err.message}`);
      console.error("Error fetching SLA report:", err);
    } finally {
      setLoading(false);
      setLoadingApiId(null);
    }
  };

  const formatLastChecked = (timestamp) => {
    if (!timestamp) return "Never";
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return `${Math.floor(diffMins / 1440)}d ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <BarChart3 size={32} className="text-blue-400" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold tracking-wide text-white">
                SLA Reports
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                Monitor API performance and service level agreements
              </p>
            </div>
          </div>
          
          {/* Summary Stats */}
          <div className="hidden md:flex items-center gap-4">
            <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2">
              <p className="text-gray-400 text-xs">Total APIs</p>
              <p className="text-white text-xl font-bold">{monitoredApis.length}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2">
              <p className="text-gray-400 text-xs">Active</p>
              <p className="text-green-400 text-xl font-bold">
                {monitoredApis.filter(api => api.active && api.lastStatusUp).length}
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2">
              <p className="text-gray-400 text-xs">Down</p>
              <p className="text-red-400 text-xl font-bold">
                {monitoredApis.filter(api => api.active && !api.lastStatusUp).length}
              </p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 
                          rounded-lg flex items-center gap-3 text-red-400 animate-fadeIn">
            <AlertCircle size={20} />
            <span className="flex-1">{error}</span>
            <button 
              onClick={() => setError(null)}
              className="ml-auto hover:text-red-300 transition-colors"
            >
              <XCircle size={20} />
            </button>
          </div>
        )}

        {/* API List */}
        {monitoredApis.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <BarChart3 size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg">No monitored APIs found</p>
            <p className="text-sm mt-2">Add APIs to start monitoring their performance</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {monitoredApis.map((api) => (
              <div
                key={api.apiId}
                className="bg-white/5 backdrop-blur-xl border border-white/10 
                           p-6 rounded-xl shadow-lg hover:shadow-xl
                           hover:border-white/20 hover:-translate-y-1
                           transition-all duration-300"
              >
                {/* Header with Status Badge */}
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-xl font-semibold text-white flex-1 pr-2">
                    {api.apiName}
                  </h2>
                  {api.active ? (
                    api.lastStatusUp ? (
                      <span className="flex items-center gap-1 bg-green-500/20 text-green-400 
                                     text-xs font-semibold px-2 py-1 rounded-full border border-green-500/30">
                        <CheckCircle2 size={12} />
                        UP
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 bg-red-500/20 text-red-400 
                                     text-xs font-semibold px-2 py-1 rounded-full border border-red-500/30">
                        <XCircle size={12} />
                        DOWN
                      </span>
                    )
                  ) : (
                    <span className="flex items-center gap-1 bg-gray-500/20 text-gray-400 
                                   text-xs font-semibold px-2 py-1 rounded-full border border-gray-500/30">
                      <Activity size={12} />
                      INACTIVE
                    </span>
                  )}
                </div>

                {/* API URL */}
                <p className="text-gray-400 text-sm truncate mb-4 font-mono" title={api.apiUrl}>
                  {api.apiUrl}
                </p>

                {/* Metadata Grid */}
                <div className="space-y-2 mb-4">
                  {/* Owner Email */}
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500 min-w-[80px]">Owner:</span>
                    <span className="text-gray-300 truncate" title={api.ownerEmail}>
                      {api.ownerEmail}
                    </span>
                  </div>

                  {/* Monitor Frequency */}
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500 min-w-[80px]">Frequency:</span>
                    <span className="text-gray-300">
                      Every {api.monitorFrequencySec}s
                    </span>
                  </div>

                  {/* Last Checked */}
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500 min-w-[80px]">Last Check:</span>
                    <span className="text-gray-300 flex items-center gap-1">
                      <Clock size={12} />
                      {formatLastChecked(api.lastCheckedAt)}
                    </span>
                  </div>

                  {/* Threshold Config */}
                  {api.thresholdConfig && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-500 min-w-[80px]">Threshold:</span>
                      <span className="text-gray-300">
                        {api.thresholdConfig.maxResponseTimeMs}ms
                      </span>
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 my-4"></div>

                {/* Button */}
                <button
                  onClick={() => fetchReport(api.apiId)}
                  disabled={loading && loadingApiId === api.apiId}
                  className="w-full py-3 bg-blue-600 rounded-lg text-white font-medium
                             hover:bg-blue-700 active:scale-[0.98]
                             disabled:opacity-50 disabled:cursor-not-allowed
                             transition-all duration-200 
                             shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
                >
                  {loading && loadingApiId === api.apiId ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white 
                                      rounded-full animate-spin" />
                      Loading Report...
                    </span>
                  ) : (
                    "View SLA Report"
                  )}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* SLA Report Modal */}
        {selectedReport && (
          <SLAReportPopUpModal
            report={selectedReport}
            onClose={() => setSelectedReport(null)}
          />
        )}
      </div>
    </div>
  );
};

export default DeveloperSLAReport;
