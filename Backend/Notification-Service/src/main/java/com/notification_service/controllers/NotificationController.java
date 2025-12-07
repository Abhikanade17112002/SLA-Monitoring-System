package com.notification_service.controllers;


import com.notification_service.dtos.AlertEventDTO;
import com.notification_service.services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService ;
    @PostMapping("/alert")
    public void handleAlert(@RequestBody AlertEventDTO alertEventDTO) {
        notificationService.processAlert(alertEventDTO);
    }
}
