import React, { useEffect, useState } from "react";
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Mail, 
  Network,
  AlertCircle,
  RefreshCw
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTop60Alerts } from "../../store/slices/NotificationSlice/NotificationSlice";
import { useNavigate } from "react-router-dom";

const AlertList = () => {
  const navigate = useNavigate() ;
  const [alerts, setAlerts] = useState( JSON.parse(localStorage.getItem("alertsList")) || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const fetchAlerts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await dispatch(fetchTop60Alerts());

      if (response.type === "monitor/fetchAlerts/fulfilled") {
        console.log("Alerts ==> ");
        console.log( response.payload.notificationLogList);
        
        setAlerts( response.payload.notificationLogList);
        localStorage.setItem("alertsList",JSON.stringify(
             response.payload.notificationLogList
        ))
      }
          else if( response.payload === "Request failed with status code 401"){
      navigate("/sessionexpired") ;
    } 
 else if (response.type === "monitor/fetchAlerts/rejected") {
        setError(response.error?.message || "Failed to fetch alerts");
      }
    } catch (err) {
      console.error("Error fetching alerts:", err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const getAlertIcon = (type) => {
    switch (type) {
      case "DOWN":
        return <XCircle size={20} className="text-red-400" />;
      case "RECOVERED":
        return <CheckCircle size={20} className="text-green-400" />;
      default:
        return <AlertTriangle size={20} className="text-yellow-400" />;
    }
  };

  const getAlertStyle = (type) => {
    switch (type) {
      case "DOWN":
        return "from-red-500/20 to-red-600/20 border-red-500/30 text-red-300";
      case "RECOVERED":
        return "from-green-500/20 to-green-600/20 border-green-500/30 text-green-300";
      default:
        return "from-yellow-500/20 to-yellow-600/20 border-yellow-500/30 text-yellow-300";
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-12 shadow-2xl">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500 mx-auto"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 animate-ping opacity-20 mx-auto"></div>
          </div>
          <p className="text-gray-300 font-medium mt-6 text-lg">Loading alerts...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="backdrop-blur-xl bg-red-900/20 border border-red-500/30 rounded-2xl p-12 shadow-2xl">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle size={40} className="text-red-400" />
          </div>
          <h3 className="text-xl font-semibold text-red-300 mb-2">Error Loading Alerts</h3>
          <p className="text-red-200/80 mb-6">{error}</p>
          <button
            onClick={fetchAlerts}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-medium hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105 shadow-lg inline-flex items-center gap-2"
          >
            <RefreshCw size={18} />
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (!alerts || alerts.length === 0) {
    return (
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-12 shadow-2xl">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-700/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={40} className="text-gray-500" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No Alerts Found</h3>
          <p className="text-gray-400 mb-6">All systems are running smoothly</p>
          <button
            onClick={fetchAlerts}
            className="px-6 py-3 backdrop-blur-xl bg-white/10 border border-white/20 text-white rounded-xl font-medium hover:bg-white/20 transition-all inline-flex items-center gap-2"
          >
            <RefreshCw size={18} />
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
              <AlertTriangle size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Notification Alerts</h2>
              <p className="text-sm text-gray-400">{alerts.length} total alerts</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-3">
            <div className="backdrop-blur-xl bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-2">
              <p className="text-xs text-red-300 font-medium">Down</p>
              <p className="text-lg font-bold text-red-400">
                {alerts.filter(a => a.alertType === "DOWN").length}
              </p>
            </div>
            <div className="backdrop-blur-xl bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-2">
              <p className="text-xs text-green-300 font-medium">Recovered</p>
              <p className="text-lg font-bold text-green-400">
                {alerts.filter(a => a.alertType === "RECOVERED").length}
              </p>
            </div>
            <button
              onClick={fetchAlerts}
              className="p-2 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all transform hover:scale-105"
              title="Refresh alerts"
            >
              <RefreshCw size={20} className="text-gray-400 hover:text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Alert List */}
      <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
        {alerts.map((alert, index) => (
          <div
            key={alert.id || index}
            className={`
              border-b border-white/5 p-6 
              hover:bg-white/5 transition-all
              ${index === 0 ? 'bg-white/5' : ''}
            `}
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              
              {/* Left Section - Main Content */}
              <div className="flex-1 space-y-3 min-w-[300px]">
                
                {/* Alert Type Badge */}
                <div className="flex items-center gap-3 flex-wrap">
                  <div className={`
                    flex items-center gap-2 px-4 py-2 rounded-xl 
                    bg-gradient-to-r border font-semibold text-sm
                    ${getAlertStyle(alert.alertType)}
                  `}>
                    {getAlertIcon(alert.alertType)}
                    {alert.alertType}
                  </div>

                  {/* Status Badge */}
                  <div className={`
                    px-3 py-1 rounded-lg text-xs font-semibold
                    ${alert.status === "SUCCESS" 
                      ? "bg-green-500/20 text-green-300 border border-green-500/30" 
                      : "bg-red-500/20 text-red-300 border border-red-500/30"
                    }
                  `}>
                    {alert.status}
                  </div>
                </div>

                {/* Message */}
                <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-white text-sm leading-relaxed">{alert.message}</p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Network size={16} className="text-cyan-400" />
                    <span className="text-gray-400">API ID:</span>
                    <span className="text-gray-200 font-mono">{alert.apiId}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Mail size={16} className="text-purple-400" />
                    <span className="text-gray-400">Recipient:</span>
                    <span className="text-gray-200 truncate">{alert.recipientEmail}</span>
                  </div>
                </div>
              </div>

              {/* Right Section - Timestamp */}
              <div className="flex flex-col items-end gap-2 min-w-[160px]">
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock size={14} />
                  <span className="text-xs">
                    {new Date(alert.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-sm font-medium text-gray-300">
                  {new Date(alert.createdAt).toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10 bg-gradient-to-r from-white/5 to-transparent">
        <p className="text-center text-sm text-gray-400">
          Showing {alerts.length} of 60 most recent notifications
        </p>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
};

export default AlertList;