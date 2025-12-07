package com.metrics_service.entities;


import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "aggregated_sla")
public class AggregatedSLA {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String apiId;

    @Column(nullable = false)
    private LocalDate date;

    private Double uptimePercentage;
    private Integer avgLatency;
    private Integer totalDowntimeMinutes;

    public AggregatedSLA() {
    }

    public AggregatedSLA(String id, String apiId, LocalDate date, Double uptimePercentage, Integer avgLatency, Integer totalDowntimeMinutes) {
        this.id = id;
        this.apiId = apiId;
        this.date = date;
        this.uptimePercentage = uptimePercentage;
        this.avgLatency = avgLatency;
        this.totalDowntimeMinutes = totalDowntimeMinutes;
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

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Double getUptimePercentage() {
        return uptimePercentage;
    }

    public void setUptimePercentage(Double uptimePercentage) {
        this.uptimePercentage = uptimePercentage;
    }

    public Integer getAvgLatency() {
        return avgLatency;
    }

    public void setAvgLatency(Integer avgLatency) {
        this.avgLatency = avgLatency;
    }

    public Integer getTotalDowntimeMinutes() {
        return totalDowntimeMinutes;
    }

    public void setTotalDowntimeMinutes(Integer totalDowntimeMinutes) {
        this.totalDowntimeMinutes = totalDowntimeMinutes;
    }


    @Override
    public String toString() {
        return "AggregatedSLA{" +
                "id='" + id + '\'' +
                ", apiId='" + apiId + '\'' +
                ", date=" + date +
                ", uptimePercentage=" + uptimePercentage +
                ", avgLatency=" + avgLatency +
                ", totalDowntimeMinutes=" + totalDowntimeMinutes +
                '}';
    }
}