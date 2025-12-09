package com.monitor_service.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class UpdateMonitoredApiRequest {
    @NotBlank
    private String apiName;

    @NotBlank
    private String apiUrl;

    @Min(10)
    private Integer monitorFrequencySec;

    @NotBlank
    @Email
    private String ownerEmail;

    private String monitoredApiId ;

    private String thresholdConfigId ;
    // Threshold config
    private Integer expectedStatusCode;
    private Integer maxResponseTimeMs;
    private Integer retryAttempts;
    private Integer timeoutMs;

    public UpdateMonitoredApiRequest() {
    }

    public UpdateMonitoredApiRequest(String apiName, String apiUrl, Integer monitorFrequencySec, String ownerEmail, String monitoredApiId, String thresholdConfigId, Integer expectedStatusCode, Integer maxResponseTimeMs, Integer retryAttempts, Integer timeoutMs) {
        this.apiName = apiName;
        this.apiUrl = apiUrl;
        this.monitorFrequencySec = monitorFrequencySec;
        this.ownerEmail = ownerEmail;
        this.monitoredApiId = monitoredApiId;
        this.thresholdConfigId = thresholdConfigId;
        this.expectedStatusCode = expectedStatusCode;
        this.maxResponseTimeMs = maxResponseTimeMs;
        this.retryAttempts = retryAttempts;
        this.timeoutMs = timeoutMs;
    }

    public @NotBlank String getApiName() {
        return apiName;
    }

    public void setApiName(@NotBlank String apiName) {
        this.apiName = apiName;
    }

    public @NotBlank String getApiUrl() {
        return apiUrl;
    }

    public void setApiUrl(@NotBlank String apiUrl) {
        this.apiUrl = apiUrl;
    }

    public @Min(10) Integer getMonitorFrequencySec() {
        return monitorFrequencySec;
    }

    public void setMonitorFrequencySec(@Min(10) Integer monitorFrequencySec) {
        this.monitorFrequencySec = monitorFrequencySec;
    }

    public @NotBlank @Email String getOwnerEmail() {
        return ownerEmail;
    }

    public void setOwnerEmail(@NotBlank @Email String ownerEmail) {
        this.ownerEmail = ownerEmail;
    }

    public String getMonitoredApiId() {
        return monitoredApiId;
    }

    public void setMonitoredApiId(String monitoredApiId) {
        this.monitoredApiId = monitoredApiId;
    }

    public String getThresholdConfigId() {
        return thresholdConfigId;
    }

    public void setThresholdConfigId(String thresholdConfigId) {
        this.thresholdConfigId = thresholdConfigId;
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
        return "UpdateMonitoredApiRequest{" +
                "apiName='" + apiName + '\'' +
                ", apiUrl='" + apiUrl + '\'' +
                ", monitorFrequencySec=" + monitorFrequencySec +
                ", ownerEmail='" + ownerEmail + '\'' +
                ", monitoredApiId='" + monitoredApiId + '\'' +
                ", thresholdConfigId='" + thresholdConfigId + '\'' +
                ", expectedStatusCode=" + expectedStatusCode +
                ", maxResponseTimeMs=" + maxResponseTimeMs +
                ", retryAttempts=" + retryAttempts +
                ", timeoutMs=" + timeoutMs +
                '}';
    }
}
