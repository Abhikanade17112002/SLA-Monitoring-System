package com.notification_service.dtos;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class AlertEventDTO {

    private String apiId;
    private String alertType; // DOWN, RECOVERED, SLOW
    private String message;
    private Integer latencyMs; // for SLOW alerts (optional)
    private LocalDateTime timestamp;

    public AlertEventDTO() {}

    public AlertEventDTO(String apiId, String alertType, String message,
                         Integer latencyMs, LocalDateTime timestamp) {
        this.apiId = apiId;
        this.alertType = alertType;
        this.message = message;
        this.latencyMs = latencyMs;
        this.timestamp = timestamp;
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
                "apiId='" + apiId + '\'' +
                ", alertType='" + alertType + '\'' +
                ", message='" + message + '\'' +
                ", latencyMs=" + latencyMs +
                ", timestamp=" + timestamp +
                '}';
    }
}
