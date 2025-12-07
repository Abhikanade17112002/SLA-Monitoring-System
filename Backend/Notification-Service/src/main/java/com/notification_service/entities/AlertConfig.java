package com.notification_service.entities;


import jakarta.persistence.*;

@Entity
@Table(name = "alert_config")
public class AlertConfig {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String apiId;

    @Column(nullable = false)
    private String ownerEmail;

    @Column(nullable = false)
    private boolean alertOnDown = true;

    @Column(nullable = false)
    private boolean alertOnRecovered = true;

    @Column(nullable = false)
    private boolean alertOnSlow = true;

    @Column(nullable = false)
    private Integer slowThresholdMs = 500; // if latency > threshold = SLOW


    public AlertConfig() {
    }

    public AlertConfig(String id, String apiId, String ownerEmail, boolean alertOnDown, boolean alertOnRecovered, boolean alertOnSlow, Integer slowThresholdMs) {
        this.id = id;
        this.apiId = apiId;
        this.ownerEmail = ownerEmail;
        this.alertOnDown = alertOnDown;
        this.alertOnRecovered = alertOnRecovered;
        this.alertOnSlow = alertOnSlow;
        this.slowThresholdMs = slowThresholdMs;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getApiId() {
        return apiId;
    }

    public void setApiId(String apiId) {
        this.apiId = apiId;
    }

    public String getOwnerEmail() {
        return ownerEmail;
    }

    public void setOwnerEmail(String ownerEmail) {
        this.ownerEmail = ownerEmail;
    }

    public boolean isAlertOnDown() {
        return alertOnDown;
    }

    public void setAlertOnDown(boolean alertOnDown) {
        this.alertOnDown = alertOnDown;
    }

    public boolean isAlertOnRecovered() {
        return alertOnRecovered;
    }

    public void setAlertOnRecovered(boolean alertOnRecovered) {
        this.alertOnRecovered = alertOnRecovered;
    }

    public boolean isAlertOnSlow() {
        return alertOnSlow;
    }

    public void setAlertOnSlow(boolean alertOnSlow) {
        this.alertOnSlow = alertOnSlow;
    }

    public Integer getSlowThresholdMs() {
        return slowThresholdMs;
    }

    public void setSlowThresholdMs(Integer slowThresholdMs) {
        this.slowThresholdMs = slowThresholdMs;
    }

    @Override
    public String toString() {
        return "AlertConfig{" +
                "id='" + id + '\'' +
                ", apiId='" + apiId + '\'' +
                ", ownerEmail='" + ownerEmail + '\'' +
                ", alertOnDown=" + alertOnDown +
                ", alertOnRecovered=" + alertOnRecovered +
                ", alertOnSlow=" + alertOnSlow +
                ", slowThresholdMs=" + slowThresholdMs +
                '}';
    }
}