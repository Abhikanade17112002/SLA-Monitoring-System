package com.metrics_service.dtos;

public class SLASummaryDTO {

    private Double uptimePercentage;
    private Integer avgLatency;
    private Integer totalDowntimeMinutes;

    public SLASummaryDTO() {
    }

    public SLASummaryDTO(Double uptimePercentage, Integer avgLatency, Integer totalDowntimeMinutes) {
        this.uptimePercentage = uptimePercentage;
        this.avgLatency = avgLatency;
        this.totalDowntimeMinutes = totalDowntimeMinutes;
    }

    public Double getUptimePercentage() { return uptimePercentage; }
    public Integer getAvgLatency() { return avgLatency; }
    public Integer getTotalDowntimeMinutes() { return totalDowntimeMinutes; }

    public void setUptimePercentage(Double uptimePercentage) {
        this.uptimePercentage = uptimePercentage;
    }

    public void setAvgLatency(Integer avgLatency) {
        this.avgLatency = avgLatency;
    }

    public void setTotalDowntimeMinutes(Integer totalDowntimeMinutes) {
        this.totalDowntimeMinutes = totalDowntimeMinutes;
    }

    @Override
    public String toString() {
        return "SLASummaryDTO{" +
                "uptimePercentage=" + uptimePercentage +
                ", avgLatency=" + avgLatency +
                ", totalDowntimeMinutes=" + totalDowntimeMinutes +
                '}';
    }
}
