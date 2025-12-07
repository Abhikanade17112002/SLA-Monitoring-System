package com.monitor_service.dtos;

import java.time.LocalDateTime;

public class UpTimeEventDTO {
    private String apiId;
    private boolean up;
    private Integer statusCode;
    private String errorMessage;
    private LocalDateTime timestamp;

    public UpTimeEventDTO() {
    }

    public UpTimeEventDTO(String apiId, boolean up, Integer statusCode,
                          String errorMessage, LocalDateTime timestamp) {

        this.apiId = apiId;
        this.up = up;
        this.statusCode = statusCode;
        this.errorMessage = errorMessage;
        this.timestamp = timestamp;
    }

    public String getApiId() { return apiId; }
    public boolean isUp() { return up; }
    public Integer getStatusCode() { return statusCode; }
    public String getErrorMessage() { return errorMessage; }
    public LocalDateTime getTimestamp() { return timestamp; }


    public void setApiId(String apiId) {
        this.apiId = apiId;
    }

    public void setUp(boolean up) {
        this.up = up;
    }

    public void setStatusCode(Integer statusCode) {
        this.statusCode = statusCode;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        return "UpTimeEventDTO{" +
                "apiId='" + apiId + '\'' +
                ", up=" + up +
                ", statusCode=" + statusCode +
                ", errorMessage='" + errorMessage + '\'' +
                ", timestamp=" + timestamp +
                '}';
    }
}
