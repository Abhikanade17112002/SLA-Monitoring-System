
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";
import { handleFetchIndividualApi } from "../../store/slices/MonitorSlice/MonitorSlice";
import { convertToReadableDate } from "../../utility/utility";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const ApiDetails = () => {
  const { apiId } = useParams();
  const dispatch = useDispatch();
  const [apiDetail, setApiDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApiDetails = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await dispatch(handleFetchIndividualApi(apiId));
        
        if (response.type === "monitor/fetchIndividualApi/fulfilled") {
          setApiDetail(response.payload);
        } else if (response.type === "monitor/fetchIndividualApi/rejected") {
          setError(response.error?.message || "Failed to fetch API details");
        }
      } catch (err) {
        setError("An unexpected error occurred");
        console.error("Error fetching API details:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchApiDetails();
  }, [apiId, dispatch]);

  // Chart options configuration
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  // Latency Chart with styling
  const latencyChartData = {
    labels: apiDetail?.latencyLogs?.map(log =>
      new Date(log.timestamp).toLocaleTimeString()
    ) || [],
    datasets: [
      {
        label: "Response Time (ms)",
        data: apiDetail?.latencyLogs?.map(log => log.responseTimeMs) || [],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 5,
      }
    ]
  };

  // Uptime Chart with styling
  const statusChartData = {
    labels: apiDetail?.healthCheckLogs?.map(log =>
      new Date(log.timestamp).toLocaleTimeString()
    ) || [],
    datasets: [
      {
        label: "Status (1 = Up, 0 = Down)",
        data: apiDetail?.healthCheckLogs?.map(log => (log.up ? 1 : 0)) || [],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 5,
      }
    ]
  };

  // Loading state
  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-700 font-medium">Loading API details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-5">
          <h3 className="text-red-800 font-semibold mb-2">Error Loading API Details</h3>
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // No data state
  if (!apiDetail) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
          <p className="text-yellow-800 font-medium">No API details found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
          {apiDetail.monitoredApi?.apiName || "Unknown API"}
        </h2>
        <p className="text-gray-700 mb-1">
          <strong className="text-gray-900">URL:</strong> {apiDetail.monitoredApi?.apiUrl || "N/A"}
        </p>
        <p className="text-gray-700 mb-1">
          <strong className="text-gray-900">Owner:</strong> {apiDetail.monitoredApi?.ownerEmail || "N/A"}
        </p>
        <p className="text-gray-700 mb-1">
          <strong className="text-gray-900">Frequency:</strong> {apiDetail.monitoredApi?.monitorFrequencySec || 0}s
        </p>
        <p className="text-gray-700">
          <strong className="text-gray-900">Last Status:</strong>{" "}
          {apiDetail.monitoredApi?.lastStatusUp ? (
            <span className="text-green-600 font-semibold">🟢 Up</span>
          ) : (
            <span className="text-red-600 font-semibold">🔴 Down</span>
          )}
        </p>
      </div>

      {/* Threshold Config */}
      {apiDetail.thresholdConfig && (
        <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold mb-3 text-gray-900">Threshold Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="text-gray-700">
              <strong className="text-gray-900">Expected Status:</strong> {apiDetail.thresholdConfig.expectedStatusCode}
            </p>
            <p className="text-gray-700">
              <strong className="text-gray-900">Max Response Time:</strong> {apiDetail.thresholdConfig.maxResponseTimeMs} ms
            </p>
            <p className="text-gray-700">
              <strong className="text-gray-900">Retry Attempts:</strong> {apiDetail.thresholdConfig.retryAttempts}
            </p>
            <p className="text-gray-700">
              <strong className="text-gray-900">Timeout:</strong> {apiDetail.thresholdConfig.timeoutMs} ms
            </p>
          </div>
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
          <h3 className="mb-3 font-semibold text-gray-900">Latency Trend</h3>
          {apiDetail.latencyLogs && apiDetail.latencyLogs.length > 0 ? (
            <Line data={latencyChartData} options={chartOptions} />
          ) : (
            <p className="text-gray-500 text-center py-8">No latency data available</p>
          )}
        </div>
        <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
          <h3 className="mb-3 font-semibold text-gray-900">Uptime Trend</h3>
          {apiDetail.healthCheckLogs && apiDetail.healthCheckLogs.length > 0 ? (
            <Line data={statusChartData} options={chartOptions} />
          ) : (
            <p className="text-gray-500 text-center py-8">No uptime data available</p>
          )}
        </div>
      </div>

      {/* Downtime Incidents */}
      <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
        <h3 className="mb-3 font-semibold text-gray-900">Downtime Incidents</h3>

        {!apiDetail.downTimeIncidentList || apiDetail.downTimeIncidentList.length === 0 ? (
          <p className="text-gray-500">No downtime incidents recorded.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border border-gray-300 text-left text-gray-900 font-semibold">Started At</th>
                  <th className="p-3 border border-gray-300 text-left text-gray-900 font-semibold">Resolved At</th>
                  <th className="p-3 border border-gray-300 text-left text-gray-900 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {apiDetail.downTimeIncidentList.map(inc => (
                  <tr key={inc.incidentId} className="hover:bg-gray-50">
                    <td className="p-3 border border-gray-300 text-gray-700">
                      {new Date(inc.startedAt).toLocaleString()}
                    </td>
                    <td className="p-3 border border-gray-300 text-gray-700">
                      {inc.resolvedAt ? new Date(inc.resolvedAt).toLocaleString() : (
                        <span className="text-orange-600 font-semibold">Active</span>
                      )}
                    </td>
                    <td className="p-3 border border-gray-300">
                      {inc.active ? (
                        <span className="text-red-600 font-semibold">🔴 Ongoing</span>
                      ) : (
                        <span className="text-green-600 font-semibold">🟢 Resolved</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Health Check Logs */}
      <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
        <h3 className="mb-3 font-semibold text-gray-900">Health Check Logs</h3>
        {!apiDetail.healthCheckLogs || apiDetail.healthCheckLogs.length === 0 ? (
          <p className="text-gray-500">No health check logs available.</p>
        ) : (
          <div className="max-h-80 overflow-y-auto border border-gray-300 p-3 rounded bg-gray-50">
            {apiDetail.healthCheckLogs.map(log => (
              <div key={log.logId} className="border-b border-gray-200 py-2 text-sm last:border-b-0">
                <p className="text-gray-700">
                  <strong className="text-gray-900">Time:</strong> {
                  convertToReadableDate(log.timestamp).date + " "+convertToReadableDate(log.timestamp).time 
                  
                }
                </p>
                <p className="text-gray-700">
                  <strong className="text-gray-900">Status Code:</strong> {log.statusCode}
                </p>
                <p className="text-gray-700">
                  <strong className="text-gray-900">Status:</strong>{" "}
                  {log.up ? (
                    <span className="text-green-600 font-semibold">🟢 Up</span>
                  ) : (
                    <span className="text-red-600 font-semibold">🔴 Down</span>
                  )}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Latency Logs */}
      <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
        <h3 className="mb-3 font-semibold text-gray-900">Latency Logs</h3>
        {!apiDetail.latencyLogs || apiDetail.latencyLogs.length === 0 ? (
          <p className="text-gray-500">No latency logs available.</p>
        ) : (
          <div className="max-h-80 overflow-y-auto border border-gray-300 p-3 rounded bg-gray-50">
            {apiDetail.latencyLogs.map(log => (
              <div key={log.latencyId} className="border-b border-gray-200 py-2 text-sm last:border-b-0">
                <p className="text-gray-700">
                  <strong className="text-gray-900">Time:</strong> {convertToReadableDate(log.timestamp).date + " "+convertToReadableDate(log.timestamp).time }
                </p>
                <p className="text-gray-700">
                  <strong className="text-gray-900">Latency:</strong> {log.responseTimeMs} ms
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiDetails;