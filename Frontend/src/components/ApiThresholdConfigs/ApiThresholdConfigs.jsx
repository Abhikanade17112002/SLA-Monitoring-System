import React from "react";
import { Settings, Pencil, Code2 } from "lucide-react";
import { useSelector } from "react-redux";

const ApiThresholdConfigs = () => {
    const state = useSelector((state)=>state.monitor) ;

  const {thresholdConfig} =  useSelector((state)=>state.monitor) ;
    console.log(state);


  return (
    <div className="text-white space-y-10">

      {/* Title */}
      <h1 className="text-4xl font-extrabold tracking-wide drop-shadow mb-6">
        API Threshold Configurations
      </h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {thresholdConfig?.map((config) => (
          <ThresholdCard key={config.thresholdId} config={config} />
        ))}
      </div>
    </div>
  );
};

/* ============================
     THRESHOLD CARD COMPONENT 
============================= */
const ThresholdCard = ({ config }) => {
  const {
    thresholdId,
    expectedStatusCode,
    maxResponseTimeMs,
    retryAttempts,
    timeoutMs,
  } = config;

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 
                    rounded-xl p-6 shadow-xl hover:scale-[1.01] transition-all">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Settings size={20} className="text-blue-400" />
          SLA Threshold Rule
        </h2>
      </div>

      {/* Threshold Data */}
      <div className="space-y-2 text-sm">
        <DataRow label="Expected Status Code" value={expectedStatusCode} />
        <DataRow label="Max Response Time" value={`${maxResponseTimeMs} ms`} />
        <DataRow label="Retry Attempts" value={retryAttempts} />
        <DataRow label="Timeout" value={`${timeoutMs} ms`} />
      </div>

      {/* Footer */}
      <div className="flex justify-between mt-5 pt-4 border-t border-white/10">
        <button className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition">
          <Pencil size={16} /> Edit
        </button>

        <span className="text-gray-400 text-xs flex gap-1 items-center">
          <Code2 size={12} /> ID: {thresholdId.slice(0, 8)}...
        </span>
      </div>
    </div>
  );
};

/* Sub-component for formatted rows */
const DataRow = ({ label, value }) => (
  <p className="text-gray-300">
    <span className="text-gray-500">{label}:</span> {value}
  </p>
);

export default ApiThresholdConfigs;
