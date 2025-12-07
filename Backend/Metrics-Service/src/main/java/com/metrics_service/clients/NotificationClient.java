package com.metrics_service.clients;

import com.metrics_service.dtos.AlertEventDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "notification-service")
public interface NotificationClient {

    @PostMapping("/notifications/alert")
    void sendAlert(@RequestBody AlertEventDTO dto);
}
