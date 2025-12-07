package com.monitor_service.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "latency_log",
        indexes = {
                @Index(name = "idx_latency_apiid_timestamp", columnList = "api_id, timestamp")
        }
)
public class LatencyLog {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String latencyId;

    @ManyToOne
    @JoinColumn(name = "api_id", nullable = false)
    private MonitoredApi monitoredApi;

    @Column(nullable = false)
    private Integer responseTimeMs;

    @Column(nullable = false)
    private LocalDateTime timestamp;

    public String getLatencyId() {
        return latencyId;
    }

    public void setLatencyId(String latencyId) {
        this.latencyId = latencyId;
    }

    public MonitoredApi getMonitoredApi() {
        return monitoredApi;
    }

    public void setMonitoredApi(MonitoredApi monitoredApi) {
        this.monitoredApi = monitoredApi;
    }

    public Integer getResponseTimeMs() {
        return responseTimeMs;
    }

    public void setResponseTimeMs(Integer responseTimeMs) {
        this.responseTimeMs = responseTimeMs;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
