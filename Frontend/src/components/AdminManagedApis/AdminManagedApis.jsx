import React from "react";
import {
  CheckCircle,
  XCircle,
  Settings,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import { useSelector } from "react-redux";

const AdminManagedApis = () => {

    const { monitoredApis:apiList} = useSelector((state)=>state.monitor) ;
  return (
    <div className="text-white space-y-8">

      {/* Title */}
      <h1 className="text-4xl font-extrabold tracking-wide drop-shadow mb-6">
        Manage Monitored APIs
      </h1>

      {/* APIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {apiList && apiList.map((api) => (
          <ApiCard key={api.apiId} api={api} />
        ))}
      </div>
    </div>
  );
};

/* ============================
      API CARD COMPONENT
============================= */
const ApiCard = ({ api }) => {
  const {
    apiName,
    apiUrl,
    active,
    lastStatusUp,
    lastCheckedAt,
    ownerEmail,
    thresholdConfig,
  } = api;

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 
                    rounded-xl p-6 shadow-xl hover:scale-[1.01] transition-all">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{apiName}</h2>

        {/* STATUS BADGE */}
        <span
          className={`px-3 py-1 text-xs rounded-full flex items-center gap-1 ${
            lastStatusUp
              ? "bg-green-500/20 text-green-300 border border-green-500/30"
              : "bg-red-500/20 text-red-300 border border-red-500/30"
          }`}
        >
          {lastStatusUp ? (
            <>
              <CheckCircle size={14} /> UP
            </>
          ) : (
            <>
              <XCircle size={14} /> DOWN
            </>
          )}
        </span>
      </div>

      {/* URL */}
      <p className="text-gray-400 text-sm truncate mb-2">{apiUrl}</p>

      {/* Owner */}
      <p className="text-gray-300 text-sm">
        <span className="text-gray-500">Owner:</span> {ownerEmail}
      </p>

      {/* Last Checked */}
      <p className="text-gray-300 text-sm mb-4">
        <span className="text-gray-500">Last Checked:</span>{" "}
        {new Date(lastCheckedAt).toLocaleString()}
      </p>

      {/* Threshold Config */}
      <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-sm mt-3">
        <p className="text-gray-400 mb-1 font-semibold">Threshold Settings:</p>

        <ul className="text-gray-300 space-y-1">
          <li>
            <span className="text-gray-500">Status Code:</span>{" "}
            {thresholdConfig.expectedStatusCode}
          </li>
          <li>
            <span className="text-gray-500">Max Latency:</span>{" "}
            {thresholdConfig.maxResponseTimeMs} ms
          </li>
          <li>
            <span className="text-gray-500">Retry Attempts:</span>{" "}
            {thresholdConfig.retryAttempts}
          </li>
          <li>
            <span className="text-gray-500">Timeout:</span>{" "}
            {thresholdConfig.timeoutMs} ms
          </li>
        </ul>
      </div>

      {/* Actions */}
      <div className="flex justify-between mt-5 pt-4 border-t border-white/10">

        <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition">
          <Eye size={16} /> View
        </button>

        <button className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition">
          <Pencil size={16} /> Edit
        </button>

        <button className="flex items-center gap-2 text-red-400 hover:text-red-300 transition">
          <Trash2 size={16} /> Delete
        </button>

      </div>
    </div>
  );
};

export default AdminManagedApis;
