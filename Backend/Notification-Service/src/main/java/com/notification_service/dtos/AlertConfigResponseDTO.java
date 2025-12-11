package com.notification_service.dtos;

import lombok.Builder;
import lombok.Data;


public class AlertConfigResponseDTO {

    private String id;
    private String apiId;
    private String ownerEmail;

    private boolean alertOnDown;
    private boolean alertOnRecovered;
    private boolean alertOnSlow;

    private Integer slowThresholdMs;

    public AlertConfigResponseDTO() {
    }


    public  boolean toBoolean(String value) {
        if (value == null) return false;

        value = value.trim().toLowerCase();

        // Handle common broken variants
        if (value.equals("tru") || value.equals("tr") || value.equals("t")) {
            return true;
        }

        if (value.equals("fals") || value.equals("fal") || value.equals("fa") || value.equals("f")) {
            return false;
        }

        // Normal true/false
        return value.equals("true");
    }


    public AlertConfigResponseDTO(boolean alertOnDown, boolean alertOnRecovered, boolean alertOnSlow, String apiId, String id, String ownerEmail, Integer slowThresholdMs) {
        this.alertOnDown = alertOnDown;
        this.alertOnRecovered = alertOnRecovered;
        this.alertOnSlow = alertOnSlow;
        this.apiId = apiId;
        this.id = id;
        this.ownerEmail = ownerEmail;
        this.slowThresholdMs = slowThresholdMs;
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

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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
        return "AlertConfigResponseDTO{" +
                "alertOnDown=" + alertOnDown +
                ", id='" + id + '\'' +
                ", apiId='" + apiId + '\'' +
                ", ownerEmail='" + ownerEmail + '\'' +
                ", alertOnRecovered=" + alertOnRecovered +
                ", alertOnSlow=" + alertOnSlow +
                ", slowThresholdMs=" + slowThresholdMs +
                '}';
    }
}