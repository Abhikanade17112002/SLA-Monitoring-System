package com.monitor_service.dtos;

import java.time.LocalDateTime;

public class ApiStatusResponse {
    private String apiId;
    private String apiName;
    private String apiUrl;
    private Boolean active;
    private Boolean lastStatusUp;
    private LocalDateTime lastCheckedAt;

    private Integer lastStatusCode;
    private Integer lastResponseTimeMs; // from last latency log (if available)

    public ApiStatusResponse() {
    }

    public ApiStatusResponse(String apiId, String apiName, String apiUrl, Boolean active, Boolean lastStatusUp, LocalDateTime lastCheckedAt, Integer lastStatusCode, Integer lastResponseTimeMs) {
        this.apiId = apiId;
        this.apiName = apiName;
        this.apiUrl = apiUrl;
        this.active = active;
        this.lastStatusUp = lastStatusUp;
        this.lastCheckedAt = lastCheckedAt;
        this.lastStatusCode = lastStatusCode;
        this.lastResponseTimeMs = lastResponseTimeMs;
    }

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

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Boolean getLastStatusUp() {
        return lastStatusUp;
    }

    public void setLastStatusUp(Boolean lastStatusUp) {
        this.lastStatusUp = lastStatusUp;
    }

    public LocalDateTime getLastCheckedAt() {
        return lastCheckedAt;
    }

    public void setLastCheckedAt(LocalDateTime lastCheckedAt) {
        this.lastCheckedAt = lastCheckedAt;
    }

    public Integer getLastStatusCode() {
        return lastStatusCode;
    }

    public void setLastStatusCode(Integer lastStatusCode) {
        this.lastStatusCode = lastStatusCode;
    }

    public Integer getLastResponseTimeMs() {
        return lastResponseTimeMs;
    }

    public void setLastResponseTimeMs(Integer lastResponseTimeMs) {
        this.lastResponseTimeMs = lastResponseTimeMs;
    }

    @Override
    public String toString() {
        return "ApiStatusResponse{" +
                "apiId='" + apiId + '\'' +
                ", apiName='" + apiName + '\'' +
                ", apiUrl='" + apiUrl + '\'' +
                ", active=" + active +
                ", lastStatusUp=" + lastStatusUp +
                ", lastCheckedAt=" + lastCheckedAt +
                ", lastStatusCode=" + lastStatusCode +
                ", lastResponseTimeMs=" + lastResponseTimeMs +
                '}';
    }
}
