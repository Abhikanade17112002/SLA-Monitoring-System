package com.metrics_service.services;

import com.metrics_service.dtos.DowntimeHistoryDTO;
import com.metrics_service.dtos.LatencyChartPointDTO;
import com.metrics_service.dtos.SLASummaryDTO;
import com.metrics_service.dtos.UpTimeChartPointDTO;
import com.metrics_service.entities.DownTimeIncident;
import com.metrics_service.entities.LatencyMetrics;
import com.metrics_service.entities.UpTimeMetrics;
import com.metrics_service.repositories.DownTimeIncidentRepository;
import com.metrics_service.repositories.LatencyMetricsRepository;
import com.metrics_service.repositories.UpTimeMetricsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.List;

@Service
public class MetricsAnalyticsService {

    @Autowired
    private UpTimeMetricsRepository upTimeMetricsRepository ;
    @Autowired
    private LatencyMetricsRepository latencyMetricsRepository ;
    @Autowired
    private DownTimeIncidentRepository downTimeIncidentRepository ;

    // -----------------------------------------------------
    // 1) LATENCY CHART (LAST 50 ENTRIES)
    // -----------------------------------------------------
    public List<LatencyChartPointDTO> getLatencyChart(String apiId) {

        List<LatencyMetrics> logs =
                latencyMetricsRepository.findTop50ByApiIdOrderByTimestampDesc(apiId);

        return logs.stream()
                .map(l -> new LatencyChartPointDTO(l.getTimestamp(), l.getLatencyMs()))
                .toList();
    }

    // -----------------------------------------------------
    // 2) UPTIME CHART (LAST 50 ENTRIES)
    // -----------------------------------------------------
    public List<UpTimeChartPointDTO> getUptimeChart(String apiId) {

        List<UpTimeMetrics> logs =
                upTimeMetricsRepository.findTop50ByApiIdOrderByTimestampDesc(apiId);

        return logs.stream()
                .map(l -> new UpTimeChartPointDTO(l.getTimestamp(), l.isUp()))
                .toList();
    }

    // -----------------------------------------------------
    // 3) DOWNTIME HISTORY
    // -----------------------------------------------------
    public List<DowntimeHistoryDTO> getDowntimeHistory(String apiId) {

        List<DownTimeIncident> incidents =
                downTimeIncidentRepository.findByApiIdOrderByStartedAtDesc(apiId);

        return incidents.stream()
                .filter(i -> i.getResolvedAt() != null) // ignore ongoing incidents
                .map(i -> new DowntimeHistoryDTO(
                        i.getStartedAt(),
                        i.getResolvedAt(),
                        Duration.between(i.getStartedAt(), i.getResolvedAt()).toMinutes()
                ))
                .toList();
    }

    // -----------------------------------------------------
    // 4) SLA SUMMARY
    // -----------------------------------------------------
    public SLASummaryDTO getSlaSummary(String apiId) {

        // Uptime %
        List<UpTimeMetrics> uptimeLogs =
                upTimeMetricsRepository.findByApiIdOrderByTimestampDesc(apiId);

        System.out.println("uptimeLogs ==> " + uptimeLogs);

        long totalChecks = uptimeLogs.size();
        long upChecks = uptimeLogs.stream().filter(UpTimeMetrics::isUp).count();

        double uptimePercentage = (totalChecks == 0)
                ? 0
                : (upChecks * 100.0 / totalChecks);

        // Avg latency
        List<LatencyMetrics> latencyLogs =
                latencyMetricsRepository.findByApiIdOrderByTimestampDesc(apiId);

        int avgLatency = latencyLogs.isEmpty()
                ? 0
                : (int) latencyLogs.stream()
                .mapToInt(LatencyMetrics::getLatencyMs)
                .average()
                .orElse(0);

        // Total downtime minutes
        List<DownTimeIncident> incidents =
                downTimeIncidentRepository.findByApiIdOrderByStartedAtDesc(apiId);


        System.out.println(" DownTimeIncident ==> " + incidents);

        int totalDowntimeMinutes = incidents.stream()
                .filter(i -> i.getResolvedAt() != null)
                .mapToInt(i -> (int) Duration
                        .between(i.getStartedAt(), i.getResolvedAt())
                        .toMinutes())
                .sum();

        return new SLASummaryDTO(uptimePercentage, avgLatency, totalDowntimeMinutes);
    }
}
