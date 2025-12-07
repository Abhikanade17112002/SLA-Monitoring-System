package com.monitor_service.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class CreateMonitoredApiRequest {


    @NotBlank
    private String apiName;

    @NotBlank
    private String apiUrl;

    @Min(10)
    private Integer monitorFrequencySec; // at least 10 seconds

    @NotBlank
    @Email
    private String ownerEmail;

    // Threshold config
    private Integer expectedStatusCode = 200;
    private Integer maxResponseTimeMs = 300;
    private Integer retryAttempts = 2;
    private Integer timeoutMs = 2500;

    public CreateMonitoredApiRequest() {
    }

    public CreateMonitoredApiRequest(String apiName, String apiUrl, Integer monitorFrequencySec, String ownerEmail,
            Integer expectedStatusCode, Integer maxResponseTimeMs, Integer retryAttempts, Integer timeoutMs) {
        this.apiName = apiName;
        this.apiUrl = apiUrl;
        this.monitorFrequencySec = monitorFrequencySec;
        this.ownerEmail = ownerEmail;
        this.expectedStatusCode = expectedStatusCode;
        this.maxResponseTimeMs = maxResponseTimeMs;
        this.retryAttempts = retryAttempts;
        this.timeoutMs = timeoutMs;
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

    public String getOwnerEmail() {
        return ownerEmail;
    }

    public void setOwnerEmail(String ownerEmail) {
        this.ownerEmail = ownerEmail;
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
        return "CreateMonitoredApiRequest [apiName=" + apiName + ", apiUrl=" + apiUrl + ", monitorFrequencySec="
                + monitorFrequencySec + ", ownerEmail=" + ownerEmail + ", expectedStatusCode=" + expectedStatusCode
                + ", maxResponseTimeMs=" + maxResponseTimeMs + ", retryAttempts=" + retryAttempts + ", timeoutMs="
                + timeoutMs + "]";
    }


}
