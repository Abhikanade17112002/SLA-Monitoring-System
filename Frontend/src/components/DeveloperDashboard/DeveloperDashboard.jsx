import React, { useEffect, useState } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import { Activity, AlertTriangle, CloudCheck, Server } from "lucide-react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { handleFetchMonitoredApisData } from "../../store/slices/MonitorSlice/MonitorSlice";
import { calculateActiveIncidents, calculateAverageLatency, calculateDown, calculateTotalNumberOfMonitoredApis, calculateUp, formatTime } from "../../utility/utility";
import Loader from '../Loader/Loader';
import { useNavigate } from "react-router-dom";

ChartJS.register(
  LineElement,
  PointElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const DeveloperDashboard = () => {
  const navigate = useNavigate() ;
  const dispatch = useDispatch();
  const [monitoredData, setMonitoredData] = useState({});
  const [stats, setStats] = useState();
  const { isLoading } = useSelector((state)=>state.monitor) ;

  
  const handleFetchMonitoredApi = async () => {
    const respose = await dispatch(handleFetchMonitoredApisData());
    console.log("Response Is Here ==> ");
    console.log(respose);

    if (respose.type === "monitor/fetchMonitoredAPIs/fulfilled") {
      setMonitoredData(respose.payload);

      localStorage.setItem("monitoredApi",JSON.stringify(respose.payload))

     
    }
    else if( respose.payload === "Request failed with status code 401"){
      navigate("/sessionexpired") ;
    }
  };

  useEffect(() => {
    handleFetchMonitoredApi();
  }, []);

  useEffect(()=>{
      const state = {
        totalApis: calculateTotalNumberOfMonitoredApis(monitoredData),
        up: calculateUp(monitoredData),
        down: calculateDown(monitoredData),
        avgLatency: calculateAverageLatency(monitoredData),
        activeIncidents: calculateActiveIncidents(monitoredData),
        uptimePercent:
          (calculateUp(monitoredData) /
            calculateTotalNumberOfMonitoredApis(monitoredData)) *
          100,
      };
      setStats(state);
  },[monitoredData])

console.log("Stats ==> " );
console.log(stats);
console.log("Monitored Data ==> ");
console.log(monitoredData);





  // SAMPLE CHART DATA
  const latencyData = {
    labels: ["10:00", "10:10", "10:20", "10:30", "10:40"],
    datasets: [
      {
        label: "Latency (ms)",
        data: monitoredData
          ? monitoredData?.latencyLogs?.map((logs) => logs.responseTimeMs)
          : [],
        borderColor: "rgba(59,130,246,1)",
        backgroundColor: "rgba(59,130,246,0.3)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const uptimeDonut = {
    labels: ["Uptime", "Downtime"],
    datasets: [
      {
        data: [stats?.uptimePercent, 100 - stats?.uptimePercent],
        backgroundColor: ["#22c55e", "#ef4444"],
        hoverOffset: 8,
      },
    ],
  };

  return (<div className="">
{
  isLoading ? <Loader></Loader> :     <div className="text-white space-y-10">
      {/* Page Title */}
      <h1 className="text-4xl font-extrabold tracking-wide drop-shadow mb-4">
        Developer Dashboard
      </h1>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
        <Card
          icon={<Server size={26} />}
          label="Total APIs"
          value={stats?.totalApis}
        />
        <Card
          icon={<CloudCheck size={26} />}
          label="APIs UP"
          value={stats?.up}
          color="text-green-400"
        />
        <Card
          icon={<AlertTriangle size={26} />}
          label="APIs DOWN"
          value={stats?.down}
          color="text-red-400"
        />
        <Card
          icon={<Activity size={26} />}
          label="Avg Latency"
          value={`${stats?.avgLatency} ms`}
        />
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Latency Line Graph */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Latency Trend</h2>
          <Line data={latencyData} height={180} />
        </div>

        {/* Uptime Pie Chart */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Uptime Percentage</h2>
          <Doughnut data={uptimeDonut} />
        </div>
      </div>

      {/* RECENT INCIDENTS TABLE */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Recent Incidents</h2>

        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-300 border-b border-white/10">
              <th className="py-2">API Name</th>
              <th>Status</th>
              <th>Start Time</th>
              <th>Resolved At</th>
            </tr>
          </thead>

          <tbody>
            {monitoredData ? (
              monitoredData?.downTimeIncidents?.slice(0, 5)?.map((incidents, index) => (
                <tr className="border-b border-white/10">
                  <td className="py-3">{incidents.monitoredApi.apiName}</td>
                  <td
                    className={`${
                      incidents.active == true
                        ? "text-red-700 font-semibold"
                        : "text-green-700 font-semibold"
                    }`}
                  >
                    {incidents?.active == true ? "DOWN" : "RECOVERED"}
                  </td>
                  <td className="text-red-500">
                    {" "}
                    {formatTime(incidents.startedAt)}
                  </td>
                  <td className="text-green-500">
                    {" "}
                    {formatTime(incidents.resolvedAt)}
                  </td>
                </tr>
              ))
            ) : (
              <>
                <tr className="border-b border-white/10">
                  <td className="py-3">Payment API</td>
                  <td className="text-red-400">DOWN</td>
                  <td>12:40 PM</td>
                  <td>—</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
}

  </div>

  );
};

/* CARD COMPONENT (Reusable for stats) */
const Card = ({ icon, label, value, color = "text-blue-400" }) => (
  <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-xl shadow-lg flex items-center justify-between">
    <div>
      <p className="text-gray-300 text-sm">{label}</p>
      <h3 className={`text-3xl font-bold mt-1 ${color}`}>{value}</h3>
    </div>
    <div className="text-blue-400">{icon}</div>
  </div>
);

export default DeveloperDashboard;
