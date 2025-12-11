// import React, { useEffect } from "react";
// import {
//   CheckCircle,
//   XCircle,
//   Settings,
//   Eye,
//   Pencil,
//   Trash2,
// } from "lucide-react";
// import { useSelector } from "react-redux";
// import { convertToReadableDate } from "../../utility/utility";
// import {  useNavigate } from 'react-router-dom';

// const AdminManagedApis = () => {
  
//   const { monitoredApis: apiList } = useSelector((state) => state.monitor);
//   return (
//     <div className="text-white space-y-8">
//       {/* Title */}
//       <h1 className="text-4xl font-extrabold tracking-wide drop-shadow mb-6">
//         Manage Monitored APIs
//       </h1>

//       {/* APIs Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//         {apiList && apiList.map((api) => <ApiCard key={api.apiId} api={api} />)}
//       </div>
//     </div>
//   );
// };

// /* ============================
//       API CARD COMPONENT
// ============================= */
// const ApiCard = ({ api }) => {
//   const navigate = useNavigate() ;
//   const {
//     apiName,
//     apiUrl,
//     active,
//     lastStatusUp,
//     lastCheckedAt,
//     ownerEmail,
//     thresholdConfig,
//   } = api;

//   return (
//     <div
//       className="bg-white/5 backdrop-blur-xl border border-white/10 
//                     rounded-xl p-6 shadow-xl hover:scale-[1.01] transition-all"
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-xl font-semibold">{apiName}</h2>

//         {/* STATUS BADGE */}
//         <span
//           className={`px-3 py-1 text-xs rounded-full flex items-center gap-1 ${
//             lastStatusUp
//               ? "bg-green-500/20 text-green-300 border border-green-500/30"
//               : "bg-red-500/20 text-red-300 border border-red-500/30"
//           }`}
//         >
//           {lastStatusUp ? (
//             <>
//               <CheckCircle size={14} /> UP
//             </>
//           ) : (
//             <>
//               <XCircle size={14} /> DOWN
//             </>
//           )}
//         </span>
//       </div>

//       {/* URL */}
//       <p className="text-gray-400 text-sm truncate mb-2">{apiUrl}</p>

//       {/* Owner */}
//       <p className="text-gray-300 text-sm">
//         <span className="text-gray-500">Owner:</span> {ownerEmail}
//       </p>

//       {/* Last Checked */}
//       <p className="text-gray-300 text-sm mb-4">
//         <span className="text-gray-500">Last Checked:</span>{" "}
//         {convertToReadableDate(lastCheckedAt).date +
//           " " +
//           convertToReadableDate(lastCheckedAt).time}
//       </p>

//       {/* Threshold Config */}
//       <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-sm mt-3">
//         <p className="text-gray-400 mb-1 font-semibold">Threshold Settings:</p>

//         <ul className="text-gray-300 space-y-1">
//           <li>
//             <span className="text-gray-500">Status Code:</span>{" "}
//             {thresholdConfig.expectedStatusCode}
//           </li>
//           <li>
//             <span className="text-gray-500">Max Latency:</span>{" "}
//             {thresholdConfig.maxResponseTimeMs} ms
//           </li>
//           <li>
//             <span className="text-gray-500">Retry Attempts:</span>{" "}
//             {thresholdConfig.retryAttempts}
//           </li>
//           <li>
//             <span className="text-gray-500">Timeout:</span>{" "}
//             {thresholdConfig.timeoutMs} ms
//           </li>
//         </ul>
//       </div>

//       {/* Actions */}
//       <div className="flex justify-between mt-5 pt-4 border-t border-white/10">
//         <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition" onClick={ ()=> navigate("/admin/api/"+ api?.apiId)}  >
//           <Eye size={16} /> View
//         </button>

//         <button className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition" onClick={ ()=> navigate("/admin/api/update/"+ api?.apiId)}>
//           <Pencil size={16} /> Edit
//         </button>

//         <button className="flex items-center gap-2 text-red-400 hover:text-red-300 transition">
//           <Trash2 size={16} /> Delete
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminManagedApis;







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
import { deleteMonitoredApi, handleFetchMonitoredApisData } from "../../store/slices/MonitorSlice/MonitorSlice";

const AdminManagedApis = () => {
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
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    apiName,
    apiUrl,
    apiId,
    lastStatusUp,
    lastCheckedAt,
    ownerEmail,
    thresholdConfig,
  } = api;

  const handleDelete = async () => {
    setIsDeleting(true);
    
    try {
      // Replace with your actual delete action
     const result = await dispatch(deleteMonitoredApi(apiId));
      
     
      
      // If delete is successful:
      if (result.type === "monitor/deleteApi/fulfilled") {
        setShowDeleteModal(false);
        dispatch(handleFetchMonitoredApisData());
        // Optionally show success notification
      }
      
      setShowDeleteModal(false);
      // You should dispatch your delete action here
      console.log("Deleting API:", apiId);
      navigate("/admin/apis")
      
    } catch (error) {
      console.error("Error deleting API:", error);
      alert("Failed to delete API. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

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
            onClick={() => navigate("/admin/api/" + apiId)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-all transform hover:scale-105"
          >
            <Eye size={16} /> View
          </button>

          <button 
            onClick={() => navigate("/admin/api/update/" + apiId)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 rounded-lg hover:bg-yellow-500/30 transition-all transform hover:scale-105"
          >
            <Pencil size={16} /> Edit
          </button>

          <button 
            onClick={() => setShowDeleteModal(true)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 text-red-300 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-all transform hover:scale-105"
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="backdrop-blur-xl bg-gray-900/95 border border-red-500/30 rounded-2xl p-8 max-w-md w-full shadow-2xl shadow-red-500/20 transform transition-all">
            {/* Warning Icon */}
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-white text-center mb-2">
              Delete API Monitor?
            </h3>

            {/* Description */}
            <p className="text-gray-400 text-center mb-6">
              Are you sure you want to delete <span className="text-white font-semibold">"{apiName}"</span>? 
              This will remove all monitoring data, logs, and incidents. This action cannot be undone.
            </p>

            {/* API Info */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
              <p className="text-gray-400 text-sm mb-1">Endpoint</p>
              <p className="text-white text-sm truncate">{apiUrl}</p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="flex-1 px-6 py-3 backdrop-blur-xl bg-white/10 border border-white/20 text-white rounded-xl font-medium hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-medium hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-red-500/30"
              >
                {isDeleting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Deleting...
                  </span>
                ) : (
                  "Delete Monitor"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminManagedApis;