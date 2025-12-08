package com.notification_service.controllers;


import com.notification_service.dtos.AlertConfigRequestDTO;
import com.notification_service.dtos.AlertConfigResponseDTO;
import com.notification_service.services.AlertConfigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notifications/config")
public class AlertConfigController {

    @Autowired
    private AlertConfigService alertConfigService ;

    @PostMapping
    @PreAuthorize("hasAuthority('Admin')")
    public AlertConfigResponseDTO createOrUpdate(@RequestBody AlertConfigRequestDTO dto) {
        return alertConfigService.saveOrUpdate(dto);
    }

    @GetMapping("/{apiId}")
    @PreAuthorize("hasAnyAuthority('Admin','developer')")
    public AlertConfigResponseDTO get(@PathVariable String apiId) {
        return alertConfigService.getByApiId(apiId);
    }

    @DeleteMapping("/{apiId}")
    @PreAuthorize("hasAnyAuthority('Admin')")
    public String delete(@PathVariable String apiId) {
        alertConfigService.deleteByApiId(apiId);
        return "Config deleted";
    }
}