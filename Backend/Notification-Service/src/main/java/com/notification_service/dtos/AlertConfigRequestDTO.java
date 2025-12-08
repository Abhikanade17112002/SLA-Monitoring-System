package com.notification_service.dtos;


import lombok.Data;

@Data
public class AlertConfigRequestDTO {

    private String apiId;
    private String ownerEmail;

    private boolean alertOnDown;
    private boolean alertOnRecovered;
    private boolean alertOnSlow;

    private Integer slowThresholdMs;
}