package com.metrics_service.controllers;


import com.metrics_service.dtos.DowntimeHistoryDTO;
import com.metrics_service.dtos.LatencyChartPointDTO;
import com.metrics_service.dtos.SLASummaryDTO;
import com.metrics_service.dtos.UpTimeChartPointDTO;
import com.metrics_service.services.MetricsAnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/metrics/api")
public class MetricsAnalyticsController {

    @Autowired
    private MetricsAnalyticsService metricsAnalyticsService ;

    @GetMapping("/{apiId}/latency-chart")
    public ResponseEntity<List<LatencyChartPointDTO>> getLatencyChart(@PathVariable( name = "apiId") String apiId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(metricsAnalyticsService.getLatencyChart(apiId));
    }

    @GetMapping("/{apiId}/uptime-chart")
    public ResponseEntity<List<UpTimeChartPointDTO>> getUptimeChart(@PathVariable( name = "apiId") String apiId) {
        return  ResponseEntity.status(HttpStatus.OK)
                .body(metricsAnalyticsService.getUptimeChart(apiId));
    }

    @GetMapping("/{apiId}/downtime-history")
    public ResponseEntity<List<DowntimeHistoryDTO>> getDowntimeHistory(@PathVariable( name = "apiId") String apiId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(metricsAnalyticsService.getDowntimeHistory(apiId));
    }

    @GetMapping("/{apiId}/sla-summary")
    public ResponseEntity<SLASummaryDTO> getSlaSummary(@PathVariable( name = "apiId") String apiId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(metricsAnalyticsService.getSlaSummary(apiId));
    }
}
