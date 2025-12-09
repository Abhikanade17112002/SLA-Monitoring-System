package com.monitor_service.dtos;

import com.monitor_service.entities.MonitoredApi;
import com.monitor_service.entities.ThresholdConfig;

public class UpdateApiDetailResponse {

    private MonitoredApi monitoredApi ;
    private ThresholdConfig thresholdConfig ;

    public UpdateApiDetailResponse(MonitoredApi monitoredApi, ThresholdConfig thresholdConfig) {
        this.monitoredApi = monitoredApi;
        this.thresholdConfig = thresholdConfig;
    }

    public UpdateApiDetailResponse() {
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
        return "UpdateApiDetailResponse{" +
                "monitoredApi=" + monitoredApi +
                ", thresholdConfig=" + thresholdConfig +
                '}';
    }
}
