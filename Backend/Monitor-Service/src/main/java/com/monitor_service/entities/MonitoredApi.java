package com.monitor_service.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "monitored_api")
public class MonitoredApi {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String apiId;

    @Column(nullable = false)
    private String apiName;

    @Column(nullable = false)
    private String apiUrl;

    @Column(nullable = false)
    private Integer monitorFrequencySec;

    @Column(nullable = false)
    private Boolean active = true;

    @Column(nullable = false)
    private String ownerEmail;       // Who should receive alerts

    private LocalDateTime lastCheckedAt;

    private Boolean lastStatusUp;


    public MonitoredApi() {
    }

    public MonitoredApi(String apiId, String apiName, String apiUrl, Integer monitorFrequencySec, Boolean active, String ownerEmail, LocalDateTime lastCheckedAt, Boolean lastStatusUp, ThresholdConfig thresholdConfig) {
        this.apiId = apiId;
        this.apiName = apiName;
        this.apiUrl = apiUrl;
        this.monitorFrequencySec = monitorFrequencySec;
        this.active = active;
        this.ownerEmail = ownerEmail;
        this.lastCheckedAt = lastCheckedAt;
        this.lastStatusUp = lastStatusUp;
        this.thresholdConfig = thresholdConfig;
    }

    @OneToOne(mappedBy = "monitoredApi", cascade = CascadeType.ALL)
    @JsonManagedReference
    private ThresholdConfig thresholdConfig;

    public String getApiId() {
        return apiId;
    }

    public void setApiId(String apiId) {
        this.apiId = apiId;
    }

    public String getApiName() {
        return apiName;
    }

    public void setApiName(String apiName) {
        this.apiName = apiName;
    }

    public String getApiUrl() {
        return apiUrl;
    }

    public void setApiUrl(String apiUrl) {
        this.apiUrl = apiUrl;
    }

    public Integer getMonitorFrequencySec() {
        return monitorFrequencySec;
    }

    public void setMonitorFrequencySec(Integer monitorFrequencySec) {
        this.monitorFrequencySec = monitorFrequencySec;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public String getOwnerEmail() {
        return ownerEmail;
    }

    public void setOwnerEmail(String ownerEmail) {
        this.ownerEmail = ownerEmail;
    }

    public LocalDateTime getLastCheckedAt() {
        return lastCheckedAt;
    }

    public void setLastCheckedAt(LocalDateTime lastCheckedAt) {
        this.lastCheckedAt = lastCheckedAt;
    }

    public Boolean getLastStatusUp() {
        return lastStatusUp;
    }

    public void setLastStatusUp(Boolean lastStatusUp) {
        this.lastStatusUp = lastStatusUp;
    }

    public ThresholdConfig getThresholdConfig() {
        return thresholdConfig;
    }

    public void setThresholdConfig(ThresholdConfig thresholdConfig) {
        this.thresholdConfig = thresholdConfig;
    }

    @Override
    public String toString() {
        return "MonitoredApi{" +
                "apiId='" + apiId + '\'' +
                ", apiName='" + apiName + '\'' +
                ", apiUrl='" + apiUrl + '\'' +
                ", monitorFrequencySec=" + monitorFrequencySec +
                ", active=" + active +
                ", ownerEmail='" + ownerEmail + '\'' +
                ", lastCheckedAt=" + lastCheckedAt +
                ", lastStatusUp=" + lastStatusUp +
                ", thresholdConfig=" + thresholdConfig +
                '}';
    }
}
