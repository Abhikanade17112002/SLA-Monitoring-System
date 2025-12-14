package com.monitor_service.dtos;

import com.monitor_service.entities.MonitoredApi;

import java.util.List;

public class FetchLiveDashBoardDataResponseDTO {
    private List<MonitoredApi> monitoredApis ;

    public FetchLiveDashBoardDataResponseDTO() {
    }

    public FetchLiveDashBoardDataResponseDTO(List<MonitoredApi> monitoredApis) {
        this.monitoredApis = monitoredApis;
    }

    public List<MonitoredApi> getMonitoredApis() {
        return monitoredApis;
    }

    public void setMonitoredApis(List<MonitoredApi> monitoredApis) {
        this.monitoredApis = monitoredApis;
    }

    @Override
    public String toString() {
        return "FetchLiveDashBoardDataResponseDTO{" +
                "monitoredApis=" + monitoredApis +
                '}';
    }
}
