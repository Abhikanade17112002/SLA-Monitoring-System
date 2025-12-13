package com.metrics_service.dtos;


import java.time.LocalDateTime;

public class UpTimeEventDTO {
    private String apiName ;
    private String apiId;
    private boolean up;
    private Integer statusCode;
    private String errorMessage;
    private LocalDateTime timestamp;

    public UpTimeEventDTO() {
    }

    public UpTimeEventDTO(String apiName, String apiId, boolean up, Integer statusCode, String errorMessage, LocalDateTime timestamp) {
        this.apiName = apiName;
        this.apiId = apiId;
        this.up = up;
        this.statusCode = statusCode;
        this.errorMessage = errorMessage;
        this.timestamp = timestamp;
    }

    public String getApiName() {
        return apiName;
    }

    public void setApiName(String apiName) {
        this.apiName = apiName;
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

    @Override
    public String toString() {
        return "UpTimeEventDTO{" +
                "apiName='" + apiName + '\'' +
                ", apiId='" + apiId + '\'' +
                ", up=" + up +
                ", statusCode=" + statusCode +
                ", errorMessage='" + errorMessage + '\'' +
                ", timestamp=" + timestamp +
                '}';
    }
}
