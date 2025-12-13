
import { jwtDecode } from "jwt-decode";

export const formatTime = (localDateTime) => {
    if (!localDateTime) return "";
    const cleaned = localDateTime.split(".")[0];
    const date = new Date(cleaned);
    if (isNaN(date)) return "";
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
export function convertToReadableDate(dateString) {
  // Extract the actual date-time part
  console.log( "Fuck ==> " );
  console.log(dateString);
  
// Remove microseconds: "2025-12-08T22:21:58.348352" → "2025-12-08T22:21:58"
  const cleaned = dateString.split(".")[0];

  const date = new Date(cleaned);

  if (isNaN(date)) return "";

  return {
    date: date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    time: date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  };
}
export   const calculateUp = (monitorState) => {
    console.log("bahsbdkabsdasd");
    console.log(monitorState);

    return monitorState.monitoredApis
      ? monitorState.monitoredApis?.filter((api) => api.lastStatusUp === true)
          .length
      : 0;
  };

export   const calculateDown = (monitorState) => {
    return monitorState.monitoredApis
      ? monitorState.monitoredApis?.filter((api) => api.lastStatusUp === false)
          .length
      : 0;
  };

export   const calculateActiveIncidents = (monitorState) => {
    return monitorState?.downTimeIncidents
      ? monitorState?.downTimeIncidents?.length
      : 0;
  };

export   const calculateAverageLatency = (monitorState) => {
    return monitorState?.latencyLogs?.length
      ? Math.round(
          monitorState?.latencyLogs?.reduce(
            (sum, log) => sum + log.responseTimeMs,
            0
          ) / monitorState?.latencyLogs?.length
        )
      : 0;
  };

export   const calculateTotalNumberOfMonitoredApis = (monitorState) => {
    return monitorState?.monitoredApis
      ? monitorState?.monitoredApis?.length
      : 0;
  };



export const isTokenValid = () => {
  const token = localStorage.getItem("jwtToken");
  console.log("isTokenValid ==> " + token);
  

  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    console.log("isTokenValid ==> " + currentTime);

    return decoded.exp > currentTime;
  } catch (error) {
    console.log("Error While Validation The JWT Token ==> " + error);
    return false;
  }
};