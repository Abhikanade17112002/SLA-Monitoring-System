package com.notification_service.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AlertConfigResponseDTO {

    private String id;
    private String apiId;
    private String ownerEmail;

    private boolean alertOnDown;
    private boolean alertOnRecovered;
    private boolean alertOnSlow;

    private Integer slowThresholdMs;
}