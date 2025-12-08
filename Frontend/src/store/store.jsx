import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/AuthSlice/AuthSlice.jsx";
import monitorReducer from "./slices/MonitorSlice/MonitorSlice.jsx";
// import metricsReducer from "./slices/MetricsSlice/MetricsSlice.jsx";
// import alertReducer from "./slices/AlertSlice/AlertSlice.jsx";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    monitor: monitorReducer,
    // metrics: metricsReducer,
    // alerts: alertReducer
  },
});