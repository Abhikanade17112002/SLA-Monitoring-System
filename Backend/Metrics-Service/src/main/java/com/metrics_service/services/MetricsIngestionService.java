//package com.metrics_service.services;
//
//import com.metrics_service.clients.NotificationClient;
//import com.metrics_service.dtos.AlertEventDTO;
//import com.metrics_service.dtos.DownTimeEventDTO;
//import com.metrics_service.dtos.LatencyEventDTO;
//import com.metrics_service.dtos.UpTimeEventDTO;
//import com.metrics_service.entities.DownTimeIncident;
//import com.metrics_service.entities.LatencyMetrics;
//import com.metrics_service.entities.UpTimeMetrics;
//import com.metrics_service.repositories.AggregatedSLARepository;
//import com.metrics_service.repositories.DownTimeIncidentRepository;
//import com.metrics_service.repositories.LatencyMetricsRepository;
//import com.metrics_service.repositories.UpTimeMetricsRepository;
//import io.micrometer.core.instrument.binder.system.UptimeMetrics;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class MetricsIngestionService {
//
//    @Autowired
//    private NotificationClient notificationClient ;
//
//    @Autowired
//    private LatencyMetricsRepository latencyMetricsRepository ;
//    @Autowired
//    private UpTimeMetricsRepository upTimeMetricsRepository ;
//    @Autowired
//    private DownTimeIncidentRepository downTimeIncidentRepository ;
//    @Autowired
//    private AggregatedSLARepository aggregatedSLARepository ;
//
//
//    public void saveLatency(LatencyEventDTO dto) {
//
//        LatencyMetrics metric = new LatencyMetrics();
//        metric.setApiId(dto.getApiId());
//        metric.setLatencyMs(dto.getLatencyMs());
//        metric.setTimestamp(dto.getTimestamp());
//
//        latencyMetricsRepository.save(metric);
//
//        // --- TRIGGER SLOW ALERT ---
//        // For simplicity: threshold = 500ms (later: read from ThresholdConfig table)
//        if (dto.getLatencyMs() > 500) {
//
//            AlertEventDTO alert = new AlertEventDTO(
//                    dto.getApiId(),
//                    "SLOW",
//                    "Latency exceeded threshold: " + dto.getLatencyMs() + " ms",
//                    dto.getLatencyMs(),
//                    dto.getTimestamp()
//            );
//
//            notificationClient.sendAlert(alert);
//        }
//    }
//
//    public void saveUptime(UpTimeEventDTO dto) {
//
//        UpTimeMetrics m = new UpTimeMetrics();
//        m.setApiId(dto.getApiId());
//        m.setUp(dto.isUp());
//        m.setStatusCode(dto.getStatusCode());
//        m.setErrorMessage(dto.getErrorMessage());
//        m.setTimestamp(dto.getTimestamp());
//
//       upTimeMetricsRepository.save(m);
//
//        // --------------------------
//        // TRIGGER DOWNTIME ALERT
//        // --------------------------
//        List<UpTimeMetrics> upTimeMetrics = upTimeMetricsRepository.findByApiIdOrderByTimestampDesc(dto.getApiId()) ;
//        System.out.println("upTimeMetrics ==> " + upTimeMetrics );
//        if (!dto.isUp() && upTimeMetrics.size() == 1 ) {
//            AlertEventDTO alert = new AlertEventDTO(
//                    dto.getApiId(),
//                    "DOWN",
//                    "API is DOWN. Error: " + dto.getErrorMessage(),
//                    null,
//                    dto.getTimestamp()
//            );
//            notificationClient.sendAlert(alert);
//        }
//        else if( !dto.isUp() && upTimeMetrics.get(0).isUp()){
//            AlertEventDTO alert = new AlertEventDTO(
//                    dto.getApiId(),
//                    "DOWN",
//                    "API is DOWN. Error: " + dto.getErrorMessage(),
//                    null,
//                    dto.getTimestamp()
//            );
//            notificationClient.sendAlert(alert);
//        }
//
//        // --------------------------
//        // TRIGGER RECOVERY ALERT
//        // --------------------------
//        if (dto.isUp() && upTimeMetrics.size() == 1) {
//            AlertEventDTO alert = new AlertEventDTO(
//                    dto.getApiId(),
//                    "RECOVERED",
//                    "API has recovered with status: " + dto.getStatusCode(),
//                    null,
//                    dto.getTimestamp()
//            );
//            notificationClient.sendAlert(alert);
//        }
//        else if( dto.isUp() &&  !upTimeMetrics.get(0).isUp()){
//
//            AlertEventDTO alert = new AlertEventDTO(
//                    dto.getApiId(),
//                    "RECOVERED",
//                    "API has recovered with status: " + dto.getStatusCode(),
//                    null,
//                    dto.getTimestamp()
//            );
//            notificationClient.sendAlert(alert);
//
//        }
//    }
//
//    public void saveDowntime(DownTimeEventDTO dto) {
//
//        DownTimeIncident incident = new DownTimeIncident();
//        incident.setApiId(dto.getApiId());
//        incident.setEventType(dto.getEventType());
//        incident.setStartedAt(dto.getStartedAt());
//        incident.setResolvedAt(dto.getResolvedAt());
//
//        downTimeIncidentRepository.save(incident);
//
//        // forward event as alert to notification service
//        AlertEventDTO alert = new AlertEventDTO(
//                dto.getApiId(),
//                dto.getEventType(),
//                "Downtime event: " + dto.getEventType(),
//                null,
//                dto.getStartedAt()
//        );
//
//        notificationClient.sendAlert(alert);
//    }
//}



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


    /* =======================================================================
                                LATENCY EVENT
    ======================================================================= */
    public void saveLatency(LatencyEventDTO dto) {

        LatencyMetrics metric = new LatencyMetrics();
        metric.setApiId(dto.getApiId());
        metric.setLatencyMs(dto.getLatencyMs());
        metric.setTimestamp(dto.getTimestamp());

        latencyMetricsRepository.save(metric);

        // 🔥 Trigger Slow API Alert — Threshold hardcoded (500ms)
        if (dto.getLatencyMs() > 500) {
            AlertEventDTO alert = new AlertEventDTO(
                    dto.getApiId(),
                    "SLOW",
                    "Latency exceeded threshold: " + dto.getLatencyMs() + " ms",
                    dto.getLatencyMs(),
                    dto.getTimestamp()
            );
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
        metric.setUp(dto.isUp());
        metric.setStatusCode(dto.getStatusCode());
        metric.setErrorMessage(dto.getErrorMessage());
        metric.setTimestamp(dto.getTimestamp());
        upTimeMetricsRepository.save(metric);

        // Fetch last 2 records to detect transitions
        List<UpTimeMetrics> history = upTimeMetricsRepository
                .findTop2ByApiIdOrderByTimestampDesc(dto.getApiId());

        boolean isCurrentUp = dto.isUp();
        boolean wasPreviouslyUp = history.size() > 1 && history.get(1).isUp();

        /* -----------------------------------------------------------
                         DOWNTIME DETECTED
        ------------------------------------------------------------ */
        System.out.println("HERE 1");
        if (!isCurrentUp && wasPreviouslyUp) {
            System.out.println("HERE 2");
            AlertEventDTO alert = new AlertEventDTO(
                    dto.getApiId(),
                    "DOWN",
                    "API DOWN. Error: " + dto.getErrorMessage(),
                    null,
                    dto.getTimestamp()
            );
            notificationClient.sendAlert(alert);
        }

        /* -----------------------------------------------------------
                         RECOVERY DETECTED
        ------------------------------------------------------------ */
        if (isCurrentUp && !wasPreviouslyUp) {
            System.out.println("HERE 3");
            AlertEventDTO alert = new AlertEventDTO(
                    dto.getApiId(),
                    "RECOVERED",
                    "API RECOVERED with status: " + dto.getStatusCode(),
                    null,
                    dto.getTimestamp()
            );
            notificationClient.sendAlert(alert);
        }

        // First ever event → No transition detection needed
    }


    /* =======================================================================
                            DOWNTIME (START / END)
    ======================================================================= */
    public void saveDowntime(DownTimeEventDTO dto) {

        DownTimeIncident incident = new DownTimeIncident();
        incident.setApiId(dto.getApiId());
        incident.setEventType(dto.getEventType());
        incident.setStartedAt(dto.getStartedAt());
        incident.setResolvedAt(dto.getResolvedAt());

        downTimeIncidentRepository.save(incident);

        // Forward to Notification Service
        AlertEventDTO alert = new AlertEventDTO(
                dto.getApiId(),
                dto.getEventType(),
                "Downtime event: " + dto.getEventType(),
                null,
                dto.getStartedAt()
        );

        notificationClient.sendAlert(alert);
    }
}
