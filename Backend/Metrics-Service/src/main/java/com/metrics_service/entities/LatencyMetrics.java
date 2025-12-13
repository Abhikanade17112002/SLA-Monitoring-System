package com.metrics_service.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "latency_metrics")
public class LatencyMetrics {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String apiName ;

    @Column(nullable = false)
    private String apiId;

    @Column(nullable = false)
    private Integer latencyMs;

    @Column(nullable = false)
    private LocalDateTime timestamp;

    public LatencyMetrics() {
    }

    public LatencyMetrics(String id,String apiName , String apiId, Integer latencyMs, LocalDateTime timestamp) {
        this.id = id;
        this.apiName =apiName ;
        this.apiId = apiId;
        this.latencyMs = latencyMs;
        this.timestamp = timestamp;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getApiName() {
        return apiName;
    }

    public void setApiName(String apiName) {
        this.apiName = apiName;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public String getApiId() {
        return apiId;
    }

    public void setApiId(String apiId) {
        this.apiId = apiId;
    }

    public Integer getLatencyMs() {
        return latencyMs;
    }

    public void setLatencyMs(Integer latencyMs) {
        this.latencyMs = latencyMs;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        return "LatencyMetrics{" +
                "id='" + id + '\'' +
                ", apiName='" + apiName + '\'' +
                ", apiId='" + apiId + '\'' +
                ", latencyMs=" + latencyMs +
                ", timestamp=" + timestamp +
                '}';
    }
}
