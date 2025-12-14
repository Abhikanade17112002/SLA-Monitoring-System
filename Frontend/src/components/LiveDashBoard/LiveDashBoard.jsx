import React, { useState, useEffect } from 'react';
import { Activity, CheckCircle, XCircle, Clock, TrendingUp, Info, Lock, FileText, X, Download, AlertTriangle, Zap, AlertCircle, Calendar, BarChart3, Server, ExternalLink, User, Settings, RefreshCw, PieChart } from 'lucide-react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const LiveDashboard = () => {
  const navigate = useNavigate();
  const [apis, setApis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isAuthenticated,setisAuthenticated] = useState(useSelector((state) => state.auth.user));
  const [hoveredButton, setHoveredButton] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedApiData, setSelectedApiData] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [generatingReport, setGeneratingReport] = useState(false);

  const handleFetchMonitoredApis = async () => {
    try {
      setLoading(true);
      const response = await axios
        .get(`${import.meta.env.VITE_MONITORING_SERVICE_BASE_URL}/live-dashboard-data`);

      const data = await response.data;
      console.log("Dashboard Data ==> ", data);

      setApis(data.monitoredApis || []);
      setLastUpdate(new Date());
    } catch (error) {
      console.log("Error During Fetching Live Dash Board Data ==> " + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
   
      handleFetchMonitoredApis();

  }, []) ;

  const stats = {
    total: apis.length,
    up: apis.filter(api => api.lastStatusUp).length || 0,
    down: apis.filter(api => !api.lastStatusUp).length || 0,
    uptime: apis.length > 0 ? ((apis.filter(api => api.lastStatusUp).length / apis.length) * 100).toFixed(1) : '0.0'
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDateTime = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDateShort = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTimeSince = (timestamp) => {
    if (!timestamp) return 'Never';
    const now = new Date();
    const then = new Date(timestamp);
    const diff = Math.floor((now - then) / 1000);

    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  const formatDowntime = (minutes) => {
    if (!minutes || minutes === 0) return '0 minutes';
    const days = Math.floor(minutes / 1440);
    const hours = Math.floor((minutes % 1440) / 60);
    const mins = Math.floor(minutes % 60);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ${hours} hour${hours > 1 ? 's' : ''} ${mins} minute${mins > 1 ? 's' : ''}`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ${mins} minute${mins > 1 ? 's' : ''}`;
    return `${mins} minute${mins > 1 ? 's' : ''}`;
  };

  const calculateTotalDowntime = (incidents) => {
    if (!incidents || incidents.length === 0) return 0;
    
    let totalMinutes = 0;
    const now = new Date();
    
    incidents.forEach(incident => {
      const startedAt = new Date(incident.startedAt);
      const resolvedAt = incident.resolvedAt ? new Date(incident.resolvedAt) : now;
      const diffMs = resolvedAt - startedAt;
      totalMinutes += Math.floor(diffMs / (1000 * 60));
    });
    
    return totalMinutes;
  };

  const calculateUptimePercentage = (apiData) => {
    if (!apiData || !apiData.healthCheckLogs || apiData.healthCheckLogs.length === 0) return 0;
    
    const totalChecks = apiData.healthCheckLogs.length;
    const successfulChecks = apiData.healthCheckLogs.filter(log => log.up).length;
    
    return totalChecks > 0 ? (successfulChecks / totalChecks * 100) : 0;
  };

  const calculateAverageLatency = (apiData) => {
    if (!apiData || !apiData.latencyLogs || apiData.latencyLogs.length === 0) return 0;
    
    const totalLatency = apiData.latencyLogs.reduce((sum, log) => sum + log.responseTimeMs, 0);
    return Math.round(totalLatency / apiData.latencyLogs.length);
  };

  const calculateLatencyStats = (apiData) => {
    if (!apiData || !apiData.latencyLogs || apiData.latencyLogs.length === 0) {
      return { min: 0, max: 0, avg: 0, p95: 0 };
    }
    
    const latencies = apiData.latencyLogs.map(log => log.responseTimeMs).sort((a, b) => a - b);
    const min = latencies[0];
    const max = latencies[latencies.length - 1];
    const avg = Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length);
    const p95Index = Math.floor(latencies.length * 0.95);
    const p95 = latencies[p95Index];
    
    return { min, max, avg, p95 };
  };

  const handleGetDetails = async (apiId) => {
    if (!isAuthenticated) return;

    try {
      setDetailsLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_MONITORING_SERVICE_BASE_URL}/${apiId}`, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("jwtToken"))
        }
      });

      const data = response.data;
      console.log("API Details Data ==> ", data);
      
      setSelectedApiData(data);
      setShowDetailsModal(true);

      // Calculate report data from the API response
      const uptimePercentage = calculateUptimePercentage(data);
      const avgLatency = calculateAverageLatency(data);
      const totalDowntimeMinutes = calculateTotalDowntime(data.downTimeIncidentList);
      const totalChecks = data.healthCheckLogs?.length || 0;
      const successfulChecks = data.healthCheckLogs?.filter(log => log.up).length || 0;
      const latencyStats = calculateLatencyStats(data);
      
      const calculatedReportData = {
        uptimePercentage: parseFloat(uptimePercentage),
        avgLatency,
        totalDowntimeMinutes,
        totalChecks,
        successfulChecks,
        failedChecks: totalChecks - successfulChecks,
        latencyStats,
        slaCompliance: parseFloat(uptimePercentage) >= 99.9 ? 100 : 
                      parseFloat(uptimePercentage) >= 99.0 ? 99 : 
                      parseFloat(uptimePercentage) >= 95.0 ? 95 : 90,
        incidentCount: data.downTimeIncidentList?.length || 0,
        currentStatus: data.monitoredApi?.lastStatusUp || data.lastStatusUp ? 'Operational' : 'Down'
      };

      setReportData(calculatedReportData);
    } catch (error) {
      console.log("Error During Fetching Api Details Data ==> " + error);
      alert('Failed to fetch API details');
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleGetReport = async (api) => {
    if (!isAuthenticated) return;

    try {
      // For report, we'll fetch fresh data
      setDetailsLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_MONITORING_SERVICE_BASE_URL}/api/${api.apiId}`, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("jwtToken"))
        }
      });

      const data = response.data;
      setSelectedApiData(data);
      setShowDetailsModal(true);

      // Calculate report data
      const uptimePercentage = calculateUptimePercentage(data);
      const avgLatency = calculateAverageLatency(data);
      const totalDowntimeMinutes = calculateTotalDowntime(data.downTimeIncidentList);
      const totalChecks = data.healthCheckLogs?.length || 0;
      const successfulChecks = data.healthCheckLogs?.filter(log => log.up).length || 0;
      const latencyStats = calculateLatencyStats(data);
      
      const calculatedReportData = {
        uptimePercentage: parseFloat(uptimePercentage),
        avgLatency,
        totalDowntimeMinutes,
        totalChecks,
        successfulChecks,
        failedChecks: totalChecks - successfulChecks,
        latencyStats,
        slaCompliance: parseFloat(uptimePercentage) >= 99.9 ? 100 : 
                      parseFloat(uptimePercentage) >= 99.0 ? 99 : 
                      parseFloat(uptimePercentage) >= 95.0 ? 95 : 90,
        incidentCount: data.downTimeIncidentList?.length || 0,
        currentStatus: data.monitoredApi?.lastStatusUp || data.lastStatusUp ? 'Operational' : 'Down'
      };

      setReportData(calculatedReportData);
    } catch (error) {
      console.log("Error fetching report data:", error);
      alert('Failed to generate report');
    } finally {
      setDetailsLoading(false);
    }
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedApiData(null);
    setReportData(null);
  };

  const getUptimeColor = (percentage) => {
    if (percentage >= 99.9) return 'text-emerald-400';
    if (percentage >= 99.0) return 'text-blue-400';
    if (percentage >= 95.0) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getUptimeBgColor = (percentage) => {
    if (percentage >= 99.9) return 'bg-emerald-400';
    if (percentage >= 99.0) return 'bg-blue-400';
    if (percentage >= 95.0) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  const getUptimeLabel = (percentage) => {
    if (percentage >= 99.9) return 'Excellent';
    if (percentage >= 99.0) return 'Good';
    if (percentage >= 95.0) return 'Fair';
    return 'Poor';
  };

  const getStatusBadgeColor = (status) => {
    return status 
      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
      : 'bg-red-500/20 text-red-300 border border-red-500/30';
  };

const generateProfessionalReport = async () => {
    if (!reportData || !selectedApiData) return;
    
    try {
      setGeneratingReport(true);
      
      const api = selectedApiData.monitoredApi || selectedApiData;
      const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      const currentTime = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });

      // Create PDF document
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Add header with logo and title
      pdf.setFillColor(30, 41, 59); // slate-800
      pdf.rect(0, 0, 210, 40, 'F');
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(24);
      pdf.setFont('helvetica', 'bold');
      pdf.text('SLA MONITORING REPORT', 105, 20, { align: 'center' });
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Generated: ${currentDate} at ${currentTime}`, 105, 28, { align: 'center' });

      // Add API Information Section
      pdf.setFillColor(241, 245, 249); // slate-100
      pdf.rect(10, 45, 190, 25, 'F');
      
      pdf.setTextColor(15, 23, 42); // slate-900
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('API SERVICE INFORMATION', 105, 55, { align: 'center' });
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      let yPos = 65;
      
      const apiInfo = [
        { label: 'Service Name', value: api.apiName },
        { label: 'Endpoint URL', value: api.apiUrl },
        { label: 'Owner', value: api.ownerEmail },
        { label: 'Current Status', value: reportData.currentStatus },
        { label: 'Last Checked', value: getTimeSince(api.lastCheckedAt) }
      ];
      
      apiInfo.forEach((info, index) => {
        const xPos = index < 3 ? 15 : 110;
        const yOffset = index < 3 ? (index * 8) : ((index - 3) * 8);
        
        pdf.setFont('helvetica', 'bold');
        pdf.text(`${info.label}:`, xPos, yPos + yOffset);
        pdf.setFont('helvetica', 'normal');
        pdf.text(info.value, xPos + 30, yPos + yOffset);
      });

      yPos += 45;

      // Performance Summary Section
      pdf.setFillColor(30, 41, 59);
      pdf.rect(10, yPos, 190, 15, 'F');
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('PERFORMANCE SUMMARY', 20, yPos + 10);

      yPos += 20;

      // Performance Metrics Grid - FIXED COLOR ARRAYS
      const metrics = [
        { 
          label: 'Uptime', 
          value: `${reportData.uptimePercentage.toFixed(2)}%`, 
          subtext: getUptimeLabel(reportData.uptimePercentage),
          color: reportData.uptimePercentage >= 99.9 ? [16, 185, 129] : 
                reportData.uptimePercentage >= 99.0 ? [59, 130, 246] : 
                reportData.uptimePercentage >= 95.0 ? [234, 179, 8] : [239, 68, 68]
        },
        { 
          label: 'Avg Response Time', 
          value: `${reportData.avgLatency}ms`, 
          subtext: `Target: ${api.thresholdConfig?.maxResponseTimeMs || 1000}ms`,
          color: reportData.avgLatency <= 500 ? [16, 185, 129] : 
                reportData.avgLatency <= 1000 ? [234, 179, 8] : [239, 68, 68]
        },
        { 
          label: 'SLA Compliance', 
          value: `${reportData.slaCompliance}%`, 
          subtext: reportData.slaCompliance >= 99 ? 'Compliant' : 'Non-Compliant',
          color: reportData.slaCompliance >= 99 ? [16, 185, 129] : [239, 68, 68]
        },
        { 
          label: 'Total Downtime', 
          value: formatDowntime(reportData.totalDowntimeMinutes), 
          subtext: `${reportData.incidentCount} incidents`,
          color: reportData.totalDowntimeMinutes === 0 ? [16, 185, 129] : 
                reportData.totalDowntimeMinutes < 60 ? [234, 179, 8] : [239, 68, 68]
        }
      ];

      metrics.forEach((metric, index) => {
        const x = 15 + (index % 2) * 95;
        const y = yPos + Math.floor(index / 2) * 25;
        
        pdf.setFillColor(241, 245, 249);
        pdf.roundedRect(x, y, 90, 20, 3, 3, 'F');
        
        pdf.setFontSize(18);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(metric.color[0], metric.color[1], metric.color[2]); // FIXED: Access array elements
        pdf.text(metric.value, x + 5, y + 12);
        
        pdf.setFontSize(10);
        pdf.setTextColor(71, 85, 105); // slate-600
        pdf.setFont('helvetica', 'normal');
        pdf.text(metric.label, x + 5, y + 17);
        
        pdf.setFontSize(8);
        pdf.text(metric.subtext, x + 5, y + 19.5);
      });

      yPos += 55;

      // Detailed Statistics Section
      pdf.setFillColor(30, 41, 59);
      pdf.rect(10, yPos, 190, 15, 'F');
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('DETAILED STATISTICS', 20, yPos + 10);

      yPos += 20;

      // Statistics Table
      const statsData = [
        ['Total Health Checks', reportData.totalChecks],
        ['Successful Checks', reportData.successfulChecks],
        ['Failed Checks', reportData.failedChecks],
        ['Success Rate', `${((reportData.successfulChecks / reportData.totalChecks) * 100).toFixed(2)}%`],
        ['Min Response Time', `${reportData.latencyStats.min}ms`],
        ['Max Response Time', `${reportData.latencyStats.max}ms`],
        ['95th Percentile', `${reportData.latencyStats.p95}ms`],
        ['Monitoring Frequency', `${api.monitorFrequencySec || 30} seconds`]
      ];

      pdf.setFontSize(10);
      pdf.setTextColor(15, 23, 42);
      
      statsData.forEach((row, index) => {
        const y = yPos + (index * 8);
        
        // Alternate row colors
        if (index % 2 === 0) {
          pdf.setFillColor(248, 250, 252);
          pdf.rect(15, y - 5, 180, 8, 'F');
        }
        
        pdf.setFont('helvetica', 'bold');
        pdf.text(row[0], 20, y);
        pdf.setFont('helvetica', 'normal');
        pdf.text(row[1].toString(), 120, y);
      });

      yPos += (statsData.length * 8) + 10;

      // Configuration Section
      pdf.setFillColor(30, 41, 59);
      pdf.rect(10, yPos, 190, 15, 'F');
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('MONITORING CONFIGURATION', 20, yPos + 10);

      yPos += 20;

      const configData = [
        ['Expected Status Code', api.thresholdConfig?.expectedStatusCode || 200],
        ['Max Response Time', `${api.thresholdConfig?.maxResponseTimeMs || 1000}ms`],
        ['Retry Attempts', api.thresholdConfig?.retryAttempts || 2],
        ['Timeout', `${api.thresholdConfig?.timeoutMs || 2500}ms`],
        ['Service Active', api.active ? 'Yes' : 'No']
      ];

      configData.forEach((row, index) => {
        const y = yPos + (index * 8);
        
        if (index % 2 === 0) {
          pdf.setFillColor(248, 250, 252);
          pdf.rect(15, y - 5, 180, 8, 'F');
        }
        
        pdf.setTextColor(15, 23, 42);
        pdf.setFont('helvetica', 'bold');
        pdf.text(row[0], 20, y);
        pdf.setFont('helvetica', 'normal');
        pdf.text(row[1].toString(), 120, y);
      });

      yPos += (configData.length * 8) + 15;

      // Recent Incidents Section
      if (selectedApiData.downTimeIncidentList && selectedApiData.downTimeIncidentList.length > 0) {
        pdf.setFillColor(30, 41, 59);
        pdf.rect(10, yPos, 190, 15, 'F');
        
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`RECENT INCIDENTS (${Math.min(selectedApiData.downTimeIncidentList.length, 5)} of ${selectedApiData.downTimeIncidentList.length})`, 20, yPos + 10);

        yPos += 20;

        const incidents = selectedApiData.downTimeIncidentList.slice(0, 5);
        
        incidents.forEach((incident, index) => {
          const y = yPos + (index * 15);
          
          pdf.setFillColor(248, 250, 252); // FIXED: Removed incorrect array syntax
          pdf.rect(15, y - 5, 180, 13, 'F');
          
          pdf.setTextColor(15, 23, 42);
          pdf.setFontSize(9);
          pdf.setFont('helvetica', 'bold');
          pdf.text(`Incident ${index + 1}`, 20, y);
          
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(8);
          pdf.text(`Started: ${formatDateTime(incident.startedAt)}`, 20, y + 4);
          pdf.text(`Status: ${incident.active ? 'Active' : 'Resolved'}`, 20, y + 7);
          
          if (incident.resolvedAt) {
            pdf.text(`Resolved: ${formatDateTime(incident.resolvedAt)}`, 100, y + 4);
          }
        });

        yPos += (incidents.length * 15) + 10;
      }

      // Footer
      pdf.setFontSize(8);
      pdf.setTextColor(100, 116, 139);
      pdf.setFont('helvetica', 'italic');
      pdf.text('This report was automatically generated by SLA Monitoring System', 105, 285, { align: 'center' });
      pdf.text('For more information, visit your dashboard or contact support', 105, 288, { align: 'center' });

      // Add page numbers
      const pageCount = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(100, 116, 139);
        pdf.text(`Page ${i} of ${pageCount}`, 105, 290, { align: 'center' });
      }

      // Save the PDF
      const fileName = `SLA_Report_${api.apiName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF report');
    } finally {
      setGeneratingReport(false);
    }
  };

  const handleDownloadReport = async () => {
    await generateProfessionalReport();
  };

  const renderUptimeGauge = (percentage) => {
    const normalizedPercentage = Math.min(percentage, 100);
    const circumference = 2 * Math.PI * 40;
    const strokeDashoffset = circumference - (normalizedPercentage / 100) * circumference;
    
    return (
      <div className="relative w-32 h-32 mx-auto">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#1e293b"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={percentage >= 99.9 ? "#10b981" : 
                   percentage >= 99.0 ? "#3b82f6" : 
                   percentage >= 95.0 ? "#eab308" : "#ef4444"}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-2xl font-bold ${getUptimeColor(percentage)}`}>
            {percentage.toFixed(1)}%
          </span>
          <span className="text-xs text-slate-400 mt-1">Uptime</span>
        </div>
      </div>
    );
  };

  const renderLatencyChart = () => {
    if (!selectedApiData?.latencyLogs || selectedApiData.latencyLogs.length === 0) {
      return (
        <div className="h-48 flex items-center justify-center bg-slate-900/50 rounded-lg">
          <p className="text-slate-500">No latency data available</p>
        </div>
      );
    }

    const recentLogs = selectedApiData.latencyLogs.slice(-10);
    const maxLatency = Math.max(...recentLogs.map(log => log.responseTimeMs));
    const threshold = selectedApiData.thresholdConfig?.maxResponseTimeMs || 1000;

    return (
      <div className="h-48 bg-slate-900/50 rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-sm font-semibold text-slate-300">Recent Response Times</h4>
          <span className="text-xs text-slate-400">Last 10 checks</span>
        </div>
        <div className="flex items-end h-32 space-x-2">
          {recentLogs.map((log, index) => {
            const height = (log.responseTimeMs / maxLatency) * 100;
            const isOverThreshold = log.responseTimeMs > threshold;
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className={`w-full rounded-t ${isOverThreshold ? 'bg-red-500' : 'bg-blue-500'}`}
                  style={{ height: `${Math.max(height, 10)}%` }}
                  title={`${log.responseTimeMs}ms at ${formatTime(log.timestamp)}`}
                />
                <div className="text-xs text-slate-400 mt-2">
                  {formatTime(log.timestamp).split(':').slice(0, 2).join(':')}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-2 pt-2 border-t border-slate-700">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-blue-500"></div>
              <span className="text-slate-400">Below threshold ({threshold}ms)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-red-500"></div>
              <span className="text-slate-400">Above threshold</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStatusTrend = () => {
    if (!selectedApiData?.healthCheckLogs || selectedApiData.healthCheckLogs.length === 0) {
      return null;
    }

    const recentLogs = selectedApiData.healthCheckLogs.slice(-20);
    const statusColors = recentLogs.map(log => log.up ? '#10b981' : '#ef4444');

    return (
      <div className="mt-4">
        <h4 className="text-sm font-semibold text-slate-300 mb-2">Recent Status Trend</h4>
        <div className="flex items-center h-8 space-x-1">
          {statusColors.map((color, index) => (
            <div
              key={index}
              className="flex-1 rounded-sm"
              style={{ 
                backgroundColor: color,
                height: '20px',
                opacity: 0.8
              }}
              title={`Check ${index + 1}: ${recentLogs[index].up ? 'Up' : 'Down'}`}
            />
          ))}
        </div>
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>Older</span>
          <span>Newer</span>
        </div>
      </div>
    );
  };

  return (
    <>
      {loading ? <Loader /> : (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 md:p-6">
          {/* Header */}
          <div className="max-w-7xl mx-auto mb-6 md:mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
              <div className="flex items-center gap-3">
                <Activity className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />
                <h1 className="text-2xl md:text-3xl font-bold">SLA Monitoring Dashboard</h1>
              </div>
              <div className="flex items-center gap-3 md:gap-4">
                <div className="text-xs md:text-sm text-slate-400">
                  Last updated: {formatTime(lastUpdate)}
                </div>
                <button
                  onClick={() => navigate("/")}
                  className="px-3 md:px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-xs md:text-sm font-medium transition-colors"
                >
                  Home
                </button>
              </div>
            </div>
            <p className="text-sm md:text-base text-slate-400">Real-time monitoring of API endpoints and services</p>
          </div>

          {/* Stats Cards */}
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-xs md:text-sm mb-1">Total Services</p>
                  <p className="text-2xl md:text-3xl font-bold">{stats.total}</p>
                </div>
                <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-blue-400" />
              </div>
            </div>

            <div className="bg-emerald-500/10 backdrop-blur border border-emerald-500/30 rounded-lg p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-300 text-xs md:text-sm mb-1">Services Up</p>
                  <p className="text-2xl md:text-3xl font-bold text-emerald-400">{stats.up}</p>
                </div>
                <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-emerald-400" />
              </div>
            </div>

            <div className="bg-red-500/10 backdrop-blur border border-red-500/30 rounded-lg p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-300 text-xs md:text-sm mb-1">Services Down</p>
                  <p className="text-2xl md:text-3xl font-bold text-red-400">{stats.down}</p>
                </div>
                <XCircle className="w-8 h-8 md:w-10 md:h-10 text-red-400" />
              </div>
            </div>

            <div className="bg-blue-500/10 backdrop-blur border border-blue-500/30 rounded-lg p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-xs md:text-sm mb-1">Uptime</p>
                  <p className="text-2xl md:text-3xl font-bold text-blue-400">{stats.uptime}%</p>
                </div>
                <Activity className="w-8 h-8 md:w-10 md:h-10 text-blue-400" />
              </div>
            </div>
          </div>

          {/* API List - Desktop */}
          <div className="max-w-7xl mx-auto hidden lg:block">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg overflow-hidden">
              <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-slate-900/50 border-b border-slate-700 font-semibold text-sm text-slate-300">
                <div className="col-span-2">Service Name</div>
                <div className="col-span-3">URL</div>
                <div className="col-span-1 text-center">Status</div>
                <div className="col-span-2 text-center">Response Time</div>
                <div className="col-span-2 text-center">Last Checked</div>
                <div className="col-span-2 text-center">Actions</div>
              </div>

              {apis.map((api, index) => (
                <div
                  key={api.apiId}
                  className={`grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-slate-700/30 transition-colors ${index !== apis.length - 1 ? 'border-b border-slate-700/50' : ''
                    }`}
                >
                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      {api.lastStatusUp ? (
                        <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                      )}
                      <span className="font-medium truncate">{api.apiName}</span>
                    </div>
                  </div>

                  <div className="col-span-3">
                    <a
                      href={api.apiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-400 hover:text-blue-300 truncate block"
                      title={api.apiUrl}
                    >
                      {api.apiUrl}
                    </a>
                  </div>

                  <div className="col-span-1 flex justify-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(api.lastStatusUp)}`}>
                      {api.lastStatusUp ? 'Up' : 'Down'}
                    </span>
                  </div>

                  <div className="col-span-2 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className="text-sm">{api.thresholdConfig?.maxResponseTimeMs || 'N/A'}ms</span>
                    </div>
                  </div>

                  <div className="col-span-2 text-center text-sm text-slate-400">
                    {getTimeSince(api.lastCheckedAt)}
                  </div>

                  <div className="col-span-2 flex justify-center gap-2">
                    <div className="relative">
                      <button
                        onClick={() => handleGetDetails(api.apiId)}
                        onMouseEnter={() => setHoveredButton(`details-${api.apiId}`)}
                        onMouseLeave={() => setHoveredButton(null)}
                        disabled={!isAuthenticated}
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${isAuthenticated
                          ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                          : 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                          }`}
                      >
                        {!isAuthenticated && <Lock className="w-3.5 h-3.5" />}
                        <Info className="w-3.5 h-3.5" />
                        <span>Details</span>
                      </button>

                      {!isAuthenticated && hoveredButton === `details-${api.apiId}` && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg shadow-xl z-10 whitespace-nowrap">
                          <div className="text-sm text-slate-200 mb-1 font-medium">Login Required</div>
                          <div className="text-xs text-slate-400">Please login or create an account</div>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                            <div className="border-8 border-transparent border-t-slate-900"></div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="relative">
                      <button
                        onClick={() => handleGetReport(api)}
                        onMouseEnter={() => setHoveredButton(`report-${api.apiId}`)}
                        onMouseLeave={() => setHoveredButton(null)}
                        disabled={!isAuthenticated}
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${isAuthenticated
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer'
                          : 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                          }`}
                      >
                        {!isAuthenticated && <Lock className="w-3.5 h-3.5" />}
                        <FileText className="w-3.5 h-3.5" />
                        <span>Report</span>
                      </button>

                      {!isAuthenticated && hoveredButton === `report-${api.apiId}` && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg shadow-xl z-10 whitespace-nowrap">
                          <div className="text-sm text-slate-200 mb-1 font-medium">Login Required</div>
                          <div className="text-xs text-slate-400">Please login to get SLA report</div>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                            <div className="border-8 border-transparent border-t-slate-900"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* API List - Mobile Cards */}
          <div className="max-w-7xl mx-auto lg:hidden space-y-4">
            {apis.map((api) => (
              <div
                key={api.apiId}
                className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {api.lastStatusUp ? (
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400" />
                      )}
                      <h3 className="font-semibold">{api.apiName}</h3>
                    </div>
                    <a
                      href={api.apiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-400 hover:text-blue-300 break-all"
                    >
                      {api.apiUrl}
                    </a>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ml-2 ${getStatusBadgeColor(api.lastStatusUp)}`}>
                    {api.lastStatusUp ? 'Up' : 'Down'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-slate-900/50 rounded p-2">
                    <p className="text-xs text-slate-400 mb-1">Response Time</p>
                    <p className="text-sm font-medium">{api.thresholdConfig?.maxResponseTimeMs || 'N/A'}ms</p>
                  </div>
                  <div className="bg-slate-900/50 rounded p-2">
                    <p className="text-xs text-slate-400 mb-1">Last Checked</p>
                    <p className="text-sm font-medium">{getTimeSince(api.lastCheckedAt)}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleGetDetails(api.apiId)}
                    disabled={!isAuthenticated}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${isAuthenticated
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-slate-700/50 text-slate-500'
                      }`}
                  >
                    {!isAuthenticated && <Lock className="w-3.5 h-3.5" />}
                    <Info className="w-3.5 h-3.5" />
                    <span>Details</span>
                  </button>

                  <button
                    onClick={() => handleGetReport(api)}
                    disabled={!isAuthenticated}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${isAuthenticated
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-slate-700/50 text-slate-500'
                      }`}
                  >
                    {!isAuthenticated && <Lock className="w-3.5 h-3.5" />}
                    <FileText className="w-3.5 h-3.5" />
                    <span>Report</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="max-w-7xl mx-auto mt-6 md:mt-8 text-center text-slate-500 text-xs md:text-sm">
            <p>Dashboard updates automatically every 5 seconds</p>
          </div>

          {/* API Details Modal */}
          {showDetailsModal && selectedApiData && reportData && (
            <div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={closeDetailsModal}
            >
              <div
                className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-slate-700 bg-slate-900/80 backdrop-blur">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Server className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                    </div>
                    <div>
                      <h2 className="text-lg md:text-xl font-bold">API Performance Dashboard</h2>
                      <p className="text-xs text-slate-400">Comprehensive monitoring insights</p>
                    </div>
                  </div>
                  <button
                    onClick={closeDetailsModal}
                    className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-4 md:p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                  {detailsLoading ? (
                    <div className="flex justify-center items-center py-12">
                      <Loader />
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Service Overview */}
                      <div className="bg-slate-900/50 rounded-xl p-4 md:p-6 border border-slate-700">
                        <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-xl md:text-2xl font-bold">
                                {selectedApiData.monitoredApi?.apiName || selectedApiData.apiName}
                              </h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
                                selectedApiData.monitoredApi?.lastStatusUp || selectedApiData.lastStatusUp
                              )}`}>
                                {reportData.currentStatus}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-slate-400">
                              <a
                                href={selectedApiData.monitoredApi?.apiUrl || selectedApiData.apiUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                              >
                                {selectedApiData.monitoredApi?.apiUrl || selectedApiData.apiUrl}
                                <ExternalLink className="w-3 h-3" />
                              </a>
                              <div className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                <span>{selectedApiData.monitoredApi?.ownerEmail || selectedApiData.ownerEmail}</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 md:mt-0">
                            {renderUptimeGauge(reportData.uptimePercentage)}
                          </div>
                        </div>
                        
                        {renderStatusTrend()}
                      </div>

                      {/* Performance Metrics Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Latency Card */}
                        <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <div className="p-2 bg-purple-500/20 rounded-lg">
                                <Zap className="w-4 h-4 text-purple-400" />
                              </div>
                              <span className="text-sm text-slate-300">Response Time</span>
                            </div>
                            <span className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-400">
                              Target: {selectedApiData.thresholdConfig?.maxResponseTimeMs || 1000}ms
                            </span>
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-400">Average</span>
                              <span className="text-lg font-bold text-purple-400">{reportData.avgLatency}ms</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-400">Min / Max</span>
                              <span className="text-sm font-medium">
                                {reportData.latencyStats.min}ms / {reportData.latencyStats.max}ms
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-400">95th Percentile</span>
                              <span className="text-sm font-medium">{reportData.latencyStats.p95}ms</span>
                            </div>
                          </div>
                        </div>

                        {/* Availability Card */}
                        <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <div className="p-2 bg-emerald-500/20 rounded-lg">
                                <PieChart className="w-4 h-4 text-emerald-400" />
                              </div>
                              <span className="text-sm text-slate-300">Availability</span>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded ${getUptimeBgColor(reportData.uptimePercentage)}/20 ${getUptimeColor(reportData.uptimePercentage)}`}>
                              {getUptimeLabel(reportData.uptimePercentage)}
                            </span>
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-400">Uptime</span>
                              <span className={`text-lg font-bold ${getUptimeColor(reportData.uptimePercentage)}`}>
                                {reportData.uptimePercentage.toFixed(2)}%
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-400">Total Checks</span>
                              <span className="text-sm font-medium">{reportData.totalChecks}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-400">Success Rate</span>
                              <span className={`text-sm font-medium ${reportData.successfulChecks / reportData.totalChecks >= 0.95 ? 'text-emerald-400' : 'text-red-400'}`}>
                                {((reportData.successfulChecks / reportData.totalChecks) * 100).toFixed(2)}%
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Incidents Card */}
                        <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <div className="p-2 bg-red-500/20 rounded-lg">
                                <AlertTriangle className="w-4 h-4 text-red-400" />
                              </div>
                              <span className="text-sm text-slate-300">Incidents & Downtime</span>
                            </div>
                            <span className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-400">
                              {reportData.incidentCount} incidents
                            </span>
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-400">Total Downtime</span>
                              <span className="text-lg font-bold text-red-400">
                                {formatDowntime(reportData.totalDowntimeMinutes)}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-400">Active Incidents</span>
                              <span className="text-sm font-medium">
                                {selectedApiData.downTimeIncidentList?.filter(i => i.active).length || 0}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-400">SLA Compliance</span>
                              <span className={`text-sm font-medium ${reportData.slaCompliance >= 99 ? 'text-emerald-400' : 'text-red-400'}`}>
                                {reportData.slaCompliance}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Latency Chart */}
                      {renderLatencyChart()}

                      {/* Configuration & Recent Activity */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Configuration */}
                        <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
                          <h4 className="font-semibold mb-4 flex items-center gap-2 text-sm">
                            <Settings className="w-4 h-4 text-blue-400" />
                            Monitoring Configuration
                          </h4>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-400">Frequency</span>
                              <span className="text-sm font-medium">
                                Every {selectedApiData.monitoredApi?.monitorFrequencySec || selectedApiData.monitorFrequencySec || 30}s
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-400">Expected Status</span>
                              <span className="text-sm font-medium">
                                {selectedApiData.thresholdConfig?.expectedStatusCode || selectedApiData.monitoredApi?.thresholdConfig?.expectedStatusCode || 200}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-400">Max Response Time</span>
                              <span className="text-sm font-medium">
                                {selectedApiData.thresholdConfig?.maxResponseTimeMs || selectedApiData.monitoredApi?.thresholdConfig?.maxResponseTimeMs || 1000}ms
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-400">Retry Attempts</span>
                              <span className="text-sm font-medium">
                                {selectedApiData.thresholdConfig?.retryAttempts || selectedApiData.monitoredApi?.thresholdConfig?.retryAttempts || 2}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-400">Timeout</span>
                              <span className="text-sm font-medium">
                                {selectedApiData.thresholdConfig?.timeoutMs || selectedApiData.monitoredApi?.thresholdConfig?.timeoutMs || 2500}ms
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Recent Incidents */}
                        <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
                          <h4 className="font-semibold mb-4 flex items-center gap-2 text-sm">
                            <AlertCircle className="w-4 h-4 text-red-400" />
                            Recent Incidents
                          </h4>
                          <div className="space-y-3 max-h-64 overflow-y-auto">
                            {selectedApiData.downTimeIncidentList && selectedApiData.downTimeIncidentList.length > 0 ? (
                              selectedApiData.downTimeIncidentList.slice(0, 5).map((incident) => (
                                <div key={incident.incidentId} className="p-3 bg-slate-800/50 rounded-lg">
                                  <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-2">
                                      <div className={`w-2 h-2 rounded-full ${incident.active ? 'bg-red-400 animate-pulse' : 'bg-emerald-400'}`} />
                                      <span className="text-sm font-medium">
                                        {incident.active ? 'Active Incident' : 'Resolved Incident'}
                                      </span>
                                    </div>
                                    <span className="text-xs text-slate-400">
                                      {formatDateShort(incident.startedAt)}
                                    </span>
                                  </div>
                                  <div className="text-xs text-slate-400 space-y-1">
                                    <div>Started: {formatDateTime(incident.startedAt)}</div>
                                    {incident.resolvedAt && (
                                      <div>Resolved: {formatDateTime(incident.resolvedAt)}</div>
                                    )}
                                    <div className="flex items-center gap-1">
                                      <RefreshCw className="w-3 h-3" />
                                      <span>Duration: {formatDowntime(
                                        Math.floor((new Date(incident.resolvedAt || new Date()) - new Date(incident.startedAt)) / (1000 * 60))
                                      )}</span>
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="text-center py-8 text-slate-500">
                                <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p>No incidents recorded</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Download Button */}
                      <button
                        onClick={handleDownloadReport}
                        disabled={generatingReport}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {generatingReport ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            <span>Generating Report...</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-5 h-5" />
                            <span>Download Professional PDF Report</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default LiveDashboard;