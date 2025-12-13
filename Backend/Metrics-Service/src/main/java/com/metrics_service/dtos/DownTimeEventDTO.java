package com.metrics_service.dtos;

import java.time.LocalDateTime;

public class DownTimeEventDTO {
    private String apiName ;
    private String apiId;
    private String eventType; // DOWN or RECOVERED
    private LocalDateTime startedAt;
    private LocalDateTime resolvedAt;

    public DownTimeEventDTO() {
    }

    public DownTimeEventDTO(String apiId, String eventType,
                            LocalDateTime startedAt, LocalDateTime resolvedAt , String apiName ) {

        this.apiId = apiId;
        this.eventType = eventType;
        this.startedAt = startedAt;
        this.resolvedAt = resolvedAt;
        this.apiName =apiName ;
    }

    public String getApiName() {
        return apiName;
    }

    public void setApiName(String apiName) {
        this.apiName = apiName;
    }

    public String getApiId() { return apiId; }
    public String getEventType() { return eventType; }
    public LocalDateTime getStartedAt() { return startedAt; }
    public LocalDateTime getResolvedAt() { return resolvedAt; }

    public void setApiId(String apiId) {
        this.apiId = apiId;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public void setStartedAt(LocalDateTime startedAt) {
        this.startedAt = startedAt;
    }

    public void setResolvedAt(LocalDateTime resolvedAt) {
        this.resolvedAt = resolvedAt;
    }

    @Override
    public String toString() {
        return "DownTimeEventDTO{" +
                "apiName='" + apiName + '\'' +
                ", apiId='" + apiId + '\'' +
                ", eventType='" + eventType + '\'' +
                ", startedAt=" + startedAt +
                ", resolvedAt=" + resolvedAt +
                '}';
    }
}
