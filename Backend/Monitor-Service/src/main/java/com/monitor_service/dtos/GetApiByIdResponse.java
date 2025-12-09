package com.monitor_service.dtos;

import com.monitor_service.entities.*;

import java.util.List;

public class GetApiByIdResponse {
  private List<DownTimeIncident> downTimeIncidentList ;
  private List<HealthCheckLog> healthCheckLogs ;
  private List<LatencyLog> latencyLogs ;
  private MonitoredApi monitoredApi ;
  private ThresholdConfig thresholdConfig ;


    public GetApiByIdResponse(List<DownTimeIncident> downTimeIncidentList, List<HealthCheckLog> healthCheckLogs, List<LatencyLog> latencyLogs, MonitoredApi monitoredApi, ThresholdConfig thresholdConfig) {
        this.downTimeIncidentList = downTimeIncidentList;
        this.healthCheckLogs = healthCheckLogs;
        this.latencyLogs = latencyLogs;
        this.monitoredApi = monitoredApi;
        this.thresholdConfig = thresholdConfig;
    }

    public GetApiByIdResponse() {
    }

    public List<DownTimeIncident> getDownTimeIncidentList() {
        return downTimeIncidentList;
    }

    public void setDownTimeIncidentList(List<DownTimeIncident> downTimeIncidentList) {
        this.downTimeIncidentList = downTimeIncidentList;
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

    public MonitoredApi getMonitoredApi() {
        return monitoredApi;
    }

    public void setMonitoredApi(MonitoredApi monitoredApi) {
        this.monitoredApi = monitoredApi;
    }

    public ThresholdConfig getThresholdConfig() {
        return thresholdConfig;
    }

    public void setThresholdConfig(ThresholdConfig thresholdConfig) {
        this.thresholdConfig = thresholdConfig;
    }

    @Override
    public String toString() {
        return "GetApiByIdResponse{" +
                "downTimeIncidentList=" + downTimeIncidentList +
                ", healthCheckLogs=" + healthCheckLogs +
                ", latencyLogs=" + latencyLogs +
                ", monitoredApi=" + monitoredApi +
                ", thresholdConfig=" + thresholdConfig +
                '}';
    }
}
