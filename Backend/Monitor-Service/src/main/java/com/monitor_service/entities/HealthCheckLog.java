package com.monitor_service.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "health_check_log",
        indexes = {
                @Index(name = "idx_apiid_timestamp", columnList = "api_id, timestamp")
        }
)
public class HealthCheckLog {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String logId;

    @ManyToOne
    @JoinColumn(name = "api_id", nullable = false)
    private MonitoredApi monitoredApi;

    @Column(nullable = false)
    private Boolean isUp;

    @Column(nullable = false)
    private Integer statusCode;

    @Column(nullable = false)
    private LocalDateTime timestamp;

    public String getLogId() {
        return logId;
    }

    public void setLogId(String logId) {
        this.logId = logId;
    }

    public MonitoredApi getMonitoredApi() {
        return monitoredApi;
    }

    public void setMonitoredApi(MonitoredApi monitoredApi) {
        this.monitoredApi = monitoredApi;
    }

    public Boolean getUp() {
        return isUp;
    }

    public void setUp(Boolean up) {
        isUp = up;
    }

    public Integer getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(Integer statusCode) {
        this.statusCode = statusCode;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
