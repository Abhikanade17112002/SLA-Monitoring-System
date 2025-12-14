
import React, { useState } from "react";
import {
  CheckCircle,
  XCircle,
  Eye,
  Pencil,
  Trash2,
  AlertTriangle,
  X,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { convertToReadableDate } from "../../utility/utility";
import { useNavigate } from 'react-router-dom';
import {  handleFetchMonitoredApisData } from "../../store/slices/MonitorSlice/MonitorSlice";

const UserManagedApis = () => {
  const { monitoredApis: apiList } = useSelector((state) => state.monitor);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Manage Monitored APIs
          </h1>
          <p className="text-gray-400">Monitor, configure, and manage your API endpoints</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total APIs</p>
                <p className="text-white text-2xl font-bold">{apiList?.length || 0}</p>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">APIs Up</p>
                <p className="text-white text-2xl font-bold">
                  {apiList?.filter(api => api.lastStatusUp).length || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
                <XCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">APIs Down</p>
                <p className="text-white text-2xl font-bold">
                  {apiList?.filter(api => !api.lastStatusUp).length || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* APIs Grid */}
        {apiList && apiList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {apiList.map((api) => <ApiCard key={api.apiId} api={api} />)}
          </div>
        ) : (
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
            <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-gray-400 text-lg">No APIs being monitored yet</p>
            <p className="text-gray-500 text-sm mt-2">Add your first API to start monitoring</p>
          </div>
        )}
      </div>
    </div>
  );
};

/* ============================
      API CARD COMPONENT
============================= */
const ApiCard = ({ api }) => {
  const navigate = useNavigate();


  const {
    apiName,
    apiUrl,
    apiId,
    lastStatusUp,
    lastCheckedAt,
    ownerEmail,
    thresholdConfig,
  } = api;



  return (
    <>
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] transition-all duration-300">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-xl font-semibold text-white truncate flex-1 mr-2">
            {apiName}
          </h2>

          {/* STATUS BADGE */}
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1 whitespace-nowrap ${
              lastStatusUp
                ? "bg-green-500/20 text-green-300 border border-green-500/40"
                : "bg-red-500/20 text-red-300 border border-red-500/40"
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
        <div className="mb-3">
          <p className="text-gray-400 text-xs mb-1">Endpoint</p>
          <p className="text-gray-300 text-sm truncate bg-white/5 px-3 py-2 rounded-lg border border-white/5">
            {apiUrl}
          </p>
        </div>

        {/* Owner */}
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <p className="text-gray-400 text-sm">{ownerEmail}</p>
        </div>

        {/* Last Checked */}
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-400 text-sm">
            {lastCheckedAt ? convertToReadableDate(lastCheckedAt)?.date : null} {lastCheckedAt ?convertToReadableDate(lastCheckedAt).time : null}
          </p>
        </div>

        {/* Threshold Config */}
        <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-sm mt-3">
          <p className="text-gray-300 mb-2 font-semibold flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Thresholds
          </p>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Status Code</span>
              <span className="text-gray-200 font-medium">{thresholdConfig.expectedStatusCode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Max Latency</span>
              <span className="text-gray-200 font-medium">{thresholdConfig.maxResponseTimeMs}ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Retries</span>
              <span className="text-gray-200 font-medium">{thresholdConfig.retryAttempts}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Timeout</span>
              <span className="text-gray-200 font-medium">{thresholdConfig.timeoutMs}ms</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-5 pt-4 border-t border-white/10">
          <button 
            onClick={() => navigate("/user/api/" + apiId)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-all transform hover:scale-105"
          >
            <Eye size={16} /> View
          </button>
        </div>
      </div>
    </>
  );
};

export default UserManagedApis;