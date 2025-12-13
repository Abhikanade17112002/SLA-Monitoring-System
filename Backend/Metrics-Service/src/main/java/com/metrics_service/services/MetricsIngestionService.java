package com.metrics_service.services;

import com.metrics_service.clients.NotificationClient;
import com.metrics_service.dtos.AlertEventDTO;
import com.metrics_service.dtos.DownTimeEventDTO;
import com.metrics_service.dtos.LatencyEventDTO;
import com.metrics_service.dtos.UpTimeEventDTO;
import com.metrics_service.entities.DownTimeIncident;
import com.metrics_service.entities.LatencyMetrics;
import com.metrics_service.entities.UpTimeMetrics;
import com.metrics_service.repositories.AggregatedSLARepository;
import com.metrics_service.repositories.DownTimeIncidentRepository;
import com.metrics_service.repositories.LatencyMetricsRepository;
import com.metrics_service.repositories.UpTimeMetricsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MetricsIngestionService {

    @Autowired
    private NotificationClient notificationClient;

    @Autowired
    private LatencyMetricsRepository latencyMetricsRepository;

    @Autowired
    private UpTimeMetricsRepository upTimeMetricsRepository;

    @Autowired
    private DownTimeIncidentRepository downTimeIncidentRepository;

    @Autowired
    private AggregatedSLARepository aggregatedSLARepository;

    public void saveLatency(LatencyEventDTO dto) {

        LatencyMetrics metric = new LatencyMetrics();
        metric.setApiId(dto.getApiId());
        metric.setApiName(dto.getApiName());
        metric.setLatencyMs(dto.getLatencyMs());
        metric.setTimestamp(dto.getTimestamp());

        latencyMetricsRepository.save(metric);

        System.out.println();
        System.out.println("Latency Metrics ==> " + metric);
        System.out.println();

        // 🔥 Trigger Slow API Alert — Threshold hardcoded (500ms)
        if (dto.getLatencyMs() > 500) {

            System.out.println("Triggering Latency Alter For ==> " + dto.getApiId());
            AlertEventDTO alert = new AlertEventDTO(
                    dto.getApiId(),
                    dto.getApiName(),
                    "SLOW",
                    "Latency exceeded threshold: " + dto.getLatencyMs() + " ms",
                    dto.getLatencyMs(),
                    dto.getTimestamp()
            );

            System.out.println("SENDING THE SLOW EVENT ==> " );
            notificationClient.sendAlert(alert);
        }
    }


    /* =======================================================================
                                 UPTIME EVENT
        Handles downtime + recovery alerts properly.
    ======================================================================= */
    public void saveUptime(UpTimeEventDTO dto) {

        // SAVE ENTRY

        UpTimeMetrics metric = new UpTimeMetrics();
        metric.setApiId(dto.getApiId());
        metric.setApiName(dto.getApiName());
        metric.setUp(dto.isUp());
        metric.setStatusCode(dto.getStatusCode());
        metric.setErrorMessage(dto.getErrorMessage());
        metric.setTimestamp(dto.getTimestamp());
        upTimeMetricsRepository.save(metric);

        System.out.println();
        System.out.println("Received Uptime metrics  ==> " + metric );
        System.out.println();

        // Fetch last 2 records to detect transitions
        List<UpTimeMetrics> history = upTimeMetricsRepository
                .findTop2ByApiIdOrderByTimestampDesc(dto.getApiId());

        System.out.println();
        System.out.println();
        System.out.println("History ==>    " + dto.getApiId() + "       " + history);
        System.out.println();
        System.out.println();
        boolean isCurrentUp = dto.isUp();
        boolean wasPreviouslyUp = history.size() > 1 && history.get(1).isUp();

        /* -----------------------------------------------------------
                         DOWNTIME DETECTED
        ------------------------------------------------------------ */

        if (!isCurrentUp && wasPreviouslyUp) {

            AlertEventDTO alert = new AlertEventDTO(
                    dto.getApiId(),
                    dto.getApiName(),
                    "DOWN",
                    "API DOWN. Error: " + dto.getErrorMessage(),
                    null,
                    dto.getTimestamp()
            );

            System.out.println();
            System.out.println();
            System.out.println("Sending Down Time Event ==> " + alert);
            System.out.println();
            notificationClient.sendAlert(alert);
            System.out.println();
        }

        /* -----------------------------------------------------------
                         RECOVERY DETECTED
        ------------------------------------------------------------ */
        if (isCurrentUp && !wasPreviouslyUp) {

            AlertEventDTO alert = new AlertEventDTO(
                    dto.getApiId(),
                    dto.getApiName(),
                    "RECOVERED",
                    "API RECOVERED with status: " + dto.getStatusCode(),
                    null,
                    dto.getTimestamp()
            );
            System.out.println();
            System.out.println();
            System.out.println("Sending RECOVERED Time Event ==> " + alert);
            System.out.println();
            notificationClient.sendAlert(alert);
            System.out.println();
        }

    }

    public void saveDowntime(DownTimeEventDTO dto) {

        System.out.println();
        System.out.println("Received DownTime metrics  ==> " + dto );
        System.out.println();
        DownTimeIncident incident = new DownTimeIncident();
        incident.setApiId(dto.getApiId());
        incident.setApiName(dto.getApiName());
        incident.setEventType(dto.getEventType());
        incident.setStartedAt(dto.getStartedAt());
        incident.setResolvedAt(dto.getResolvedAt());

        downTimeIncidentRepository.save(incident);

//        // Forward to Notification Service
//        AlertEventDTO alert = new AlertEventDTO(
//                dto.getApiId(),
//                dto.getApiName(),
//                dto.getEventType(),
//                "Downtime event: " + dto.getEventType(),
//                null,
//                dto.getStartedAt()
//        );
//        System.out.println();
//        System.out.println();
//        System.out.println("Sending Downtime Time Event ==> " + alert);
//        System.out.println();
//        notificationClient.sendAlert(alert);
    }
}
