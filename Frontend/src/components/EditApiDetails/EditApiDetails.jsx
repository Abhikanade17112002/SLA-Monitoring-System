import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {handleFetchIndividualApi, updateMonitoredApi } from "../../store/slices/MonitorSlice/MonitorSlice";

const EditApiDetails = () => {
  const { apiId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    monitoredApiId:"",
    thresholdConfigId:"",
    apiName: "",
    apiUrl: "",
    monitorFrequencySec: "",
    ownerEmail: "",
    expectedStatusCode: "",
    maxResponseTimeMs: "",
    retryAttempts: "",
    timeoutMs: ""
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const res = await dispatch(handleFetchIndividualApi(apiId));

        if (res.type === "monitor/fetchIndividualApi/fulfilled") {
          const d = res.payload;
          console.log("DDDD ==> " );
          console.log(d);
          
          
          setForm({
            thresholdConfigId:d.thresholdConfig.thresholdId,
            monitoredApiId:d.monitoredApi.apiId,
            apiName: d.monitoredApi.apiName,
            apiUrl: d.monitoredApi.apiUrl,
            monitorFrequencySec: d.monitoredApi.monitorFrequencySec,
            ownerEmail: d.monitoredApi.ownerEmail,
            expectedStatusCode: d.thresholdConfig.expectedStatusCode,
            maxResponseTimeMs: d.thresholdConfig.maxResponseTimeMs,
            retryAttempts: d.thresholdConfig.retryAttempts,
            timeoutMs: d.thresholdConfig.timeoutMs
          });
        } else if (res.type === "monitor/fetchIndividualApi/rejected") {
          setError(res.error?.message || "Failed to fetch API details");
        }
      } catch (err) {
        setError("An unexpected error occurred");
        console.error("Error loading API details:", err);
      } finally {
        setLoading(false);
      }
    };
    
    load();
  }, [apiId, dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const updatedData = {
     
        monitoredApiId:form.monitoredApiId,
        apiName: form.apiName,
        apiUrl: form.apiUrl,
        monitorFrequencySec: parseInt(form.monitorFrequencySec),
        ownerEmail: form.ownerEmail,
        thresholdConfigId:form.thresholdConfigId,
        expectedStatusCode: parseInt(form.expectedStatusCode),
        maxResponseTimeMs: parseInt(form.maxResponseTimeMs),
        retryAttempts: parseInt(form.retryAttempts),
        timeoutMs: parseInt(form.timeoutMs)
    
    };

    try {
      const res = await dispatch(updateMonitoredApi({ apiId, updatedData }));

      if (res.type === "monitor/updateApi/fulfilled") {
        navigate(`/admin/api/${apiId}`);
      } else {
        setError("Failed to update API");
      }
    } catch (err) {
      setError("An error occurred while updating");
      console.error("Update error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500 mx-auto"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 animate-ping opacity-20 mx-auto"></div>
          </div>
          <p className="text-gray-300 font-medium mt-6 text-lg">Loading API details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 flex items-center justify-center">
        <div className="max-w-md w-full backdrop-blur-xl bg-red-900/20 border border-red-500/30 rounded-2xl p-8 shadow-2xl">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-red-300 font-semibold text-xl mb-2">Error Loading Details</h3>
            <p className="text-red-200/80 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-medium hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105 shadow-lg"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Edit API Configuration
          </h1>
          <p className="text-gray-400">Update monitoring settings and thresholds</p>
        </div>

        {/* Main Form Card */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
          <form className="space-y-8" onSubmit={handleSubmit}>

            {/* API Information Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">API Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">API Name</label>
                  <input
                    type="text"
                    name="apiName"
                    value={form.apiName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all backdrop-blur-sm"
                    placeholder="My API Service"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">API URL</label>
                  <input
                    type="url"
                    name="apiUrl"
                    value={form.apiUrl}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all backdrop-blur-sm"
                    placeholder="https://api.example.com/endpoint"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Monitor Frequency (seconds)</label>
                  <input
                    type="number"
                    name="monitorFrequencySec"
                    value={form.monitorFrequencySec}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all backdrop-blur-sm"
                    placeholder="60"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Owner Email</label>
                  <input
                    type="email"
                    name="ownerEmail"
                    value={form.ownerEmail}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all backdrop-blur-sm"
                    placeholder="owner@example.com"
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-gradient-to-r from-transparent via-gray-800 to-transparent text-gray-400 text-sm">
                  Threshold Configuration
                </span>
              </div>
            </div>

            {/* Threshold Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">Performance Thresholds</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Expected Status Code</label>
                  <input
                    type="number"
                    name="expectedStatusCode"
                    value={form.expectedStatusCode}
                    onChange={handleChange}
                    required
                    min="100"
                    max="599"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm"
                    placeholder="200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Max Response Time (ms)</label>
                  <input
                    type="number"
                    name="maxResponseTimeMs"
                    value={form.maxResponseTimeMs}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm"
                    placeholder="5000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Retry Attempts</label>
                  <input
                    type="number"
                    name="retryAttempts"
                    value={form.retryAttempts}
                    onChange={handleChange}
                    required
                    min="0"
                    max="10"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm"
                    placeholder="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Timeout (ms)</label>
                  <input
                    type="number"
                    name="timeoutMs"
                    value={form.timeoutMs}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm"
                    placeholder="10000"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 px-8 py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 disabled:hover:scale-100"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving Changes...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save Changes
                  </span>
                )}
              </button>
              
              <button
                type="button"
                onClick={() => navigate(`/api-details/${apiId}`)}
                disabled={submitting}
                className="px-8 py-4 backdrop-blur-xl bg-white/5 border border-white/10 text-gray-300 rounded-xl font-semibold hover:bg-white/10 hover:border-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 disabled:hover:scale-100"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Info Card */}
        <div className="mt-6 backdrop-blur-xl bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4">
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-blue-200">
              Changes will be applied immediately after saving. Your API will continue to be monitored without interruption.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditApiDetails;