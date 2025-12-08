import React from "react";
import { AlertTriangle, CheckCircle2, Clock, Activity } from "lucide-react";
import { useSelector } from "react-redux";

const AdminIncidentsPage = () => {
  const { downTimeIncidents: incidents } = useSelector((state) => state.monitor);

  console.log("Loaded Incidents ⇒ ", incidents);

  // Safe map (avoids breaking if incidents = undefined)
  const processed = (incidents || []).map((inc) => {
    const start = new Date(inc.startedAt);
    const end = inc.resolvedAt ? new Date(inc.resolvedAt) : null;

    const durationMinutes =
      end && start ? Math.round((end - start) / (1000 * 60)) : null;

    return {
      ...inc,
      _startFormatted: start.toLocaleString(),
      _endFormatted: end ? end.toLocaleString() : "—",
      _duration: durationMinutes !== null ? `${durationMinutes} min` : "Ongoing",
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0b0f1a] to-black text-white px-6 py-10">

      {/* Title */}
      <div className="flex items-center gap-3 mb-8">
        <Activity className="text-blue-400" size={28} />
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide">
          Incident History
        </h1>
      </div>

      {/* Table Container */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">

        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-2 text-gray-300">
            <AlertTriangle size={20} className="text-yellow-400" />
            <span className="font-medium">Total Incidents: {processed.length}</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-white/10 text-gray-300 uppercase text-xs tracking-wide">
              <tr>
                <th className="px-4 py-3 text-left">API</th>
                <th className="px-4 py-3 text-left">Started At</th>
                <th className="px-4 py-3 text-left">Resolved At</th>
                <th className="px-4 py-3 text-left">Duration</th>
                <th className="px-4 py-3 text-left">Owner</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {processed.map((incident, idx) => (
                <tr
                  key={incident.incidentId}
                  className={`border-t border-white/10 ${
                    idx % 2 === 0 ? "bg-white/0" : "bg-white/5"
                  } hover:bg-white/10 transition-colors`}
                >
                  {/* API Name & URL */}
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-100">
                        {incident.monitoredApi.apiName}
                      </span>
                      <span className="text-xs text-blue-300 truncate max-w-xs">
                        {incident.monitoredApi.apiUrl}
                      </span>
                    </div>
                  </td>

                  {/* Dates */}
                  <td className="px-4 py-3 text-gray-200">{incident._startFormatted}</td>
                  <td className="px-4 py-3 text-gray-200">{incident._endFormatted}</td>

                  {/* Duration */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 text-gray-200">
                      <Clock size={14} className="text-blue-400" />
                      <span>{incident._duration}</span>
                    </div>
                  </td>

                  {/* Owner */}
                  <td className="px-4 py-3 text-gray-300">
                    {incident.monitoredApi.ownerEmail}
                  </td>

                  {/* Status Badge */}
                  <td className="px-4 py-3">
                    {incident.active ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-red-500/20 text-red-300 border border-red-500/40">
                        <AlertTriangle size={12} /> ACTIVE
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-300 border border-green-500/40">
                        <CheckCircle2 size={12} /> RESOLVED
                      </span>
                    )}
                  </td>
                </tr>
              ))}

              {processed.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-gray-400 py-8 text-sm">
                    No incidents found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default AdminIncidentsPage;
