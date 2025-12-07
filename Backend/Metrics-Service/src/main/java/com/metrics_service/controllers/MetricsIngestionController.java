package com.metrics_service.controllers;


import com.metrics_service.clients.NotificationClient;
import com.metrics_service.dtos.DownTimeEventDTO;
import com.metrics_service.dtos.LatencyEventDTO;
import com.metrics_service.dtos.UpTimeEventDTO;
import com.metrics_service.services.MetricsIngestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/metrics/event")
public class MetricsIngestionController {

    @Autowired
    private MetricsIngestionService metricsIngestionService ;




    @PostMapping("/latency")
    public void ingestLatency(@RequestBody LatencyEventDTO dto) {
        metricsIngestionService.saveLatency(dto);
    }

    @PostMapping("/uptime")
    public void ingestUptime(@RequestBody UpTimeEventDTO dto) {
        metricsIngestionService.saveUptime(dto);
    }

    @PostMapping("/downtime")
    public void ingestDowntime(@RequestBody DownTimeEventDTO dto) {
        metricsIngestionService.saveDowntime(dto);
    }
}
