package com.monitor_service.dtos;

import com.monitor_service.entities.*;

import java.util.List;

public class FetchDataResponse {

    private List<MonitoredApi> monitoredApis ;
    private List<ThresholdConfig> thresholdConfigs ;
    private List<LatencyLog> latencyLogs ;
    private List<DownTimeIncident> downTimeIncidents ;
    private List<HealthCheckLog> healthCheckLogs ;

    public FetchDataResponse() {
    }

    public FetchDataResponse(List<DownTimeIncident> downTimeIncidents, List<HealthCheckLog> healthCheckLogs, List<LatencyLog> latencyLogs, List<MonitoredApi> monitoredApis, List<ThresholdConfig> thresholdConfigs) {
        this.downTimeIncidents = downTimeIncidents;
        this.healthCheckLogs = healthCheckLogs;
        this.latencyLogs = latencyLogs;
        this.monitoredApis = monitoredApis;
        this.thresholdConfigs = thresholdConfigs;
    }


    public List<DownTimeIncident> getDownTimeIncidents() {
        return downTimeIncidents;
    }

    public void setDownTimeIncidents(List<DownTimeIncident> downTimeIncidents) {
        this.downTimeIncidents = downTimeIncidents;
    }

    public List<HealthCheckLog> getHealthCheckLogs() {
        return healthCheckLogs;
    }

    public void setHealthCheckLogs(List<HealthCheckLog> healthCheckLogs) {
        this.healthCheckLogs = healthCheckLogs;
    }

    public List<LatencyLog> getLatencyLogs() {
        return latencyLogs;
    }

    public void setLatencyLogs(List<LatencyLog> latencyLogs) {
        this.latencyLogs = latencyLogs;
    }

    public List<MonitoredApi> getMonitoredApis() {
        return monitoredApis;
    }

    public void setMonitoredApis(List<MonitoredApi> monitoredApis) {
        this.monitoredApis = monitoredApis;
    }

    public List<ThresholdConfig> getThresholdConfigs() {
        return thresholdConfigs;
    }

    public void setThresholdConfigs(List<ThresholdConfig> thresholdConfigs) {
        this.thresholdConfigs = thresholdConfigs;
    }

    @Override
    public String toString() {
        return "FetchDataResponse{" +
                "downTimeIncidents=" + downTimeIncidents +
                ", monitoredApis=" + monitoredApis +
                ", thresholdConfigs=" + thresholdConfigs +
                ", latencyLogs=" + latencyLogs +
                ", healthCheckLogs=" + healthCheckLogs +
                '}';
    }
}
