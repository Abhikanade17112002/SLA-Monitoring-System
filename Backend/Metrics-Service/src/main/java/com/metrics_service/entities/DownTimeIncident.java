package com.metrics_service.entities;


import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "downtime_incidents")
public class DownTimeIncident {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String apiName ;

    @Column(nullable = false)
    private String apiId;

    @Column(nullable = false)
    private String eventType; // DOWN or RECOVERED

    @Column(nullable = false)
    private LocalDateTime startedAt;

    private LocalDateTime resolvedAt;

    public DownTimeIncident() {
    }

    public DownTimeIncident(String id, String apiName, String apiId, String eventType, LocalDateTime startedAt, LocalDateTime resolvedAt) {
        this.id = id;
        this.apiId = apiId;
        this.eventType = eventType;
        this.startedAt = startedAt;
        this.resolvedAt = resolvedAt;
        this.apiName = apiName ;
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

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public LocalDateTime getStartedAt() {
        return startedAt;
    }

    public void setStartedAt(LocalDateTime startedAt) {
        this.startedAt = startedAt;
    }

    public LocalDateTime getResolvedAt() {
        return resolvedAt;
    }

    public void setResolvedAt(LocalDateTime resolvedAt) {
        this.resolvedAt = resolvedAt;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "DownTimeIncident{" +
                "id='" + id + '\'' +
                ", apiName='" + apiName + '\'' +
                ", apiId='" + apiId + '\'' +
                ", eventType='" + eventType + '\'' +
                ", startedAt=" + startedAt +
                ", resolvedAt=" + resolvedAt +
                '}';
    }
}