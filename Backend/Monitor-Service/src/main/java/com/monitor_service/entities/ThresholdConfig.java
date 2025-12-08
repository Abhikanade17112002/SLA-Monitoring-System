package com.monitor_service.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "threshold_config")
public class ThresholdConfig {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String thresholdId;

    @OneToOne
    @JoinColumn(name = "api_id", nullable = false)
    @JsonBackReference
    private MonitoredApi monitoredApi;

    @Column(nullable = false)
    private Integer expectedStatusCode = 200;

    @Column(nullable = false)
    private Integer maxResponseTimeMs = 300;

    @Column(nullable = false)
    private Integer retryAttempts = 2;

    @Column(nullable = false)
    private Integer timeoutMs = 2500;

    public ThresholdConfig() {
    }

    public ThresholdConfig(String thresholdId, MonitoredApi monitoredApi, Integer expectedStatusCode, Integer maxResponseTimeMs, Integer retryAttempts, Integer timeoutMs) {
        this.thresholdId = thresholdId;
        this.monitoredApi = monitoredApi;
        this.expectedStatusCode = expectedStatusCode;
        this.maxResponseTimeMs = maxResponseTimeMs;
        this.retryAttempts = retryAttempts;
        this.timeoutMs = timeoutMs;
    }

    public String getThresholdId() {
        return thresholdId;
    }

    public void setThresholdId(String thresholdId) {
        this.thresholdId = thresholdId;
    }

    public MonitoredApi getMonitoredApi() {
        return monitoredApi;
    }

    public void setMonitoredApi(MonitoredApi monitoredApi) {
        this.monitoredApi = monitoredApi;
    }

    public Integer getExpectedStatusCode() {
        return expectedStatusCode;
    }

    public void setExpectedStatusCode(Integer expectedStatusCode) {
        this.expectedStatusCode = expectedStatusCode;
    }

    public Integer getMaxResponseTimeMs() {
        return maxResponseTimeMs;
    }

    public void setMaxResponseTimeMs(Integer maxResponseTimeMs) {
        this.maxResponseTimeMs = maxResponseTimeMs;
    }

    public Integer getRetryAttempts() {
        return retryAttempts;
    }

    public void setRetryAttempts(Integer retryAttempts) {
        this.retryAttempts = retryAttempts;
    }

    public Integer getTimeoutMs() {
        return timeoutMs;
    }

    public void setTimeoutMs(Integer timeoutMs) {
        this.timeoutMs = timeoutMs;
    }


    @Override
    public String toString() {
        return "ThresholdConfig{" +
                "thresholdId='" + thresholdId + '\'' +
//                ", monitoredApi=" + monitoredApi +
                ", expectedStatusCode=" + expectedStatusCode +
                ", maxResponseTimeMs=" + maxResponseTimeMs +
                ", retryAttempts=" + retryAttempts +
                ", timeoutMs=" + timeoutMs +
                '}';
    }
}
