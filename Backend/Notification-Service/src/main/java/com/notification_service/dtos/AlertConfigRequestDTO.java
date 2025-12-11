package com.notification_service.dtos;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AlertConfigRequestDTO {

    private String apiId;
    private String ownerEmail;

    private boolean alertOnDown;
    private boolean alertOnRecovered;
    private boolean alertOnSlow;

    private Integer slowThresholdMs;

    public AlertConfigRequestDTO(boolean alertOnDown, boolean alertOnRecovered, boolean alertOnSlow, String apiId, String ownerEmail, Integer slowThresholdMs) {
        this.alertOnDown = alertOnDown;
        this.alertOnRecovered = alertOnRecovered;
        this.alertOnSlow = alertOnSlow;
        this.apiId = apiId;
        this.ownerEmail = ownerEmail;
        this.slowThresholdMs = slowThresholdMs;
    }

    public AlertConfigRequestDTO() {
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

    public Integer getSlowThresholdMs() {
        return slowThresholdMs;
    }

    public void setSlowThresholdMs(Integer slowThresholdMs) {
        this.slowThresholdMs = slowThresholdMs;
    }

    @Override
    public String toString() {
        return "AlertConfigRequestDTO{" +
                "alertOnDown=" + alertOnDown +
                ", apiId='" + apiId + '\'' +
                ", ownerEmail='" + ownerEmail + '\'' +
                ", alertOnRecovered=" + alertOnRecovered +
                ", alertOnSlow=" + alertOnSlow +
                ", slowThresholdMs=" + slowThresholdMs +
                '}';
    }
}