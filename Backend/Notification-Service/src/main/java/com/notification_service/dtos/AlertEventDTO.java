package com.notification_service.dtos;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

import java.time.LocalDateTime;

public class AlertEventDTO {
    private String apiName ;
    private String apiId;
    private String alertType; // DOWN, RECOVERED, SLOW
    private String message;
    private Integer latencyMs; // for SLOW alerts (optional)
    private LocalDateTime timestamp;

    public AlertEventDTO() {}

    public AlertEventDTO(String apiId, String apiName , String alertType, String message,
                         Integer latencyMs, LocalDateTime timestamp) {
        this.apiId = apiId;
        this.alertType = alertType;
        this.message = message;
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
    public String getAlertType() { return alertType; }
    public String getMessage() { return message; }
    public Integer getLatencyMs() { return latencyMs; }
    public LocalDateTime getTimestamp() { return timestamp; }

    public void setApiId(String apiId) { this.apiId = apiId; }
    public void setAlertType(String alertType) { this.alertType = alertType; }
    public void setMessage(String message) { this.message = message; }
    public void setLatencyMs(Integer latencyMs) { this.latencyMs = latencyMs; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    @Override
    public String toString() {
        return "AlertEventDTO{" +
                "apiName='" + apiName + '\'' +
                ", apiId='" + apiId + '\'' +
                ", alertType='" + alertType + '\'' +
                ", message='" + message + '\'' +
                ", latencyMs=" + latencyMs +
                ", timestamp=" + timestamp +
                '}';
    }
}
