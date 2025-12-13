package com.metrics_service.dtos;

import java.time.LocalDateTime;

public class LatencyEventDTO {

    private String apiName ;
    private String apiId;
    private Integer latencyMs;
    private LocalDateTime timestamp;


    public LatencyEventDTO() {
    }

    public LatencyEventDTO( String apiId, String apiName , Integer latencyMs, LocalDateTime timestamp) {
        this.apiId = apiId;
        this.latencyMs = latencyMs;
        this.timestamp = timestamp;
        this.apiName = apiName ;
    }

    public String getApiName() {
        return apiName;
    }

    public void setApiName(String apiName) {
        this.apiName = apiName;
    }

    public String getApiId() { return apiId; }
    public Integer getLatencyMs() { return latencyMs; }
    public LocalDateTime getTimestamp() { return timestamp; }

    public void setApiId(String apiId) {
        this.apiId = apiId;
    }

    public void setLatencyMs(Integer latencyMs) {
        this.latencyMs = latencyMs;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        return "LatencyEventDTO{" +
                "apiName='" + apiName + '\'' +
                ", apiId='" + apiId + '\'' +
                ", latencyMs=" + latencyMs +
                ", timestamp=" + timestamp +
                '}';
    }
}
