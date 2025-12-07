package com.metrics_service.dtos;

import java.time.LocalDateTime;

public class UpTimeChartPointDTO {

    private LocalDateTime timestamp;
    private boolean up;

    public UpTimeChartPointDTO() {
    }

    public UpTimeChartPointDTO(LocalDateTime timestamp, boolean up) {
        this.timestamp = timestamp;
        this.up = up;
    }

    public LocalDateTime getTimestamp() { return timestamp; }
    public boolean isUp() { return up; }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public void setUp(boolean up) {
        this.up = up;
    }

    @Override
    public String toString() {
        return "UpTimeChartPointDTO{" +
                "timestamp=" + timestamp +
                ", up=" + up +
                '}';
    }
}
