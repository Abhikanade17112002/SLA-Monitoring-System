package com.metrics_service.dtos;

import java.time.LocalDateTime;

public class LatencyChartPointDTO {
    private LocalDateTime timestamp;
    private Integer latencyMs;

    public LatencyChartPointDTO() {
    }

    public LatencyChartPointDTO(LocalDateTime timestamp, Integer latencyMs) {
        this.timestamp = timestamp;
        this.latencyMs = latencyMs;
    }

    public LocalDateTime getTimestamp() { return timestamp; }
    public Integer getLatencyMs() { return latencyMs; }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public void setLatencyMs(Integer latencyMs) {
        this.latencyMs = latencyMs;
    }

    @Override
    public String toString() {
        return "LatencyChartPointDTO{" +
                "timestamp=" + timestamp +
                ", latencyMs=" + latencyMs +
                '}';
    }
}
