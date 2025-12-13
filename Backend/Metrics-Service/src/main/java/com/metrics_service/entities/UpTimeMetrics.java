package com.metrics_service.entities;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "uptime_metrics")
public class UpTimeMetrics {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String apiId;

    private String apiName ;

    @Column(nullable = false)
    private boolean up;

    private Integer statusCode;

    @Column(length = 300)
    private String errorMessage;

    @Column(nullable = false)
    private LocalDateTime timestamp;

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

    public boolean isUp() {
        return up;
    }

    public void setUp(boolean up) {
        this.up = up;
    }

    public Integer getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(Integer statusCode) {
        this.statusCode = statusCode;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
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

    @Override
    public String toString() {
        return "UpTimeMetrics{" +
                "id='" + id + '\'' +
                ", apiId='" + apiId + '\'' +
                ", apiName='" + apiName + '\'' +
                ", up=" + up +
                ", statusCode=" + statusCode +
                ", errorMessage='" + errorMessage + '\'' +
                ", timestamp=" + timestamp +
                '}';
    }
}
