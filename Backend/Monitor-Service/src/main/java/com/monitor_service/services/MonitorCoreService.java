package com.monitor_service.services;

import com.monitor_service.clients.MetricsClient;
import com.monitor_service.dtos.DownTimeEventDTO;
import com.monitor_service.dtos.LatencyEventDTO;
import com.monitor_service.dtos.UpTimeEventDTO;
import com.monitor_service.entities.*;
import com.monitor_service.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

//✔ Performs HTTP call
//✔ Measures latency
//✔ Logs:
//
//latency
//
//        uptime
//
//response codes
//
//✔ Detects downtime (creates incident)
//✔ Detects recovery (closes incident)
//✔ Updates lastCheckedAt & lastStatus
//✔ Runs for all APIs
//
//This is the entire brain of the Monitor Service.


@Service
public class MonitorCoreService {

    @Autowired
    private MonitoredApiRepository monitoredApiRepository ;
    @Autowired
    private ThresholdConfigRepository thresholdConfigRepository ;
    @Autowired
    private HealthCheckLogRepository healthCheckLogRepository ;
    @Autowired
    private LatencyLogRepository latencyLogRepository ;
    @Autowired
    private DownTimeIncidentRepository downTimeIncidentRepository ;
    @Autowired
    private HttpPingService httpPingService ;
    @Autowired
    private MetricsClient metricsClient ;



    public void monitorAllApis(){
        List<MonitoredApi>  apis = monitoredApiRepository.findByActiveTrue() ;

        System.out.println("Hello");

        apis.forEach(( api )->{

            // Get The Threshold configuration For Each Api
            ThresholdConfig thresholdConfig = thresholdConfigRepository.findByMonitoredApi_ApiId(  api.getApiId()  ) ;

            System.out.println("Trying ==> " + api.getApiName());

           HttpPingService.HttpResult  httpResult =  httpPingService.ping( api , thresholdConfig) ;


            LocalDateTime now = LocalDateTime.now() ;

            // Log Health Status

            HealthCheckLog healthCheckLog = new HealthCheckLog() ;
            healthCheckLog.setMonitoredApi(api);
            healthCheckLog.setUp( httpResult.isUp() );
            healthCheckLog.setTimestamp( now );
            healthCheckLog.setStatusCode( httpResult.statusCode() != null ? httpResult.statusCode() : 0);

            healthCheckLogRepository.save( healthCheckLog ) ;
            metricsClient.sendUptimeEvent(
                    new UpTimeEventDTO(
                            api.getApiId(),
                            httpResult.isUp(),
                            httpResult.statusCode(),
                            httpResult.error(),
                            now
                    )
            );


            // Log Latency Status only if the status is up

            if(httpResult.isUp()) {
                LatencyLog latencyLog = new LatencyLog() ;

                latencyLog.setMonitoredApi( api );
                latencyLog.setTimestamp( now );
                latencyLog.setResponseTimeMs( httpResult.latencyMs().intValue());

                latencyLogRepository.save( latencyLog ) ;
                metricsClient.sendLatencyEvent(
                        new LatencyEventDTO(api.getApiId(), httpResult.latencyMs().intValue(), now)
                );

            }


            // Handling DownTime Incident

            handleDownTimeLogic( api , httpResult , now ) ;


            // UPDATE LAST STATUS
            api.setLastCheckedAt(now);
            api.setLastStatusUp(httpResult.isUp());
            monitoredApiRepository.save(api);
        });
    }

    private void handleDownTimeLogic(MonitoredApi api, HttpPingService.HttpResult httpResult, LocalDateTime now) {

        if( !httpResult.isUp() ){
            // API Is DOWN

            List<DownTimeIncident> activeIncidents = downTimeIncidentRepository
                    .findByMonitoredApi_ApiIdAndActiveTrue( api.getApiId() ) ;

            // Only If All The Previous Inciendts Have been Closed
            if( activeIncidents.isEmpty() ){
                DownTimeIncident newIncident = new DownTimeIncident() ;
                newIncident.setMonitoredApi( api );
                newIncident.setActive( true );
                newIncident.setStartedAt( now );

                downTimeIncidentRepository.save(newIncident) ;
                metricsClient.sendDowntimeEvent(
                        new DownTimeEventDTO(api.getApiId(), "DOWN", now, null)
                );
            }



        }
        else if(httpResult.isUp()){
            // API Is Up Again And Settle Its Last Raised Incident
            List<DownTimeIncident> activeIncidents = downTimeIncidentRepository
                    .findByMonitoredApi_ApiIdAndActiveTrue( api.getApiId() ) ;

            for( DownTimeIncident incident : activeIncidents ){
                incident.setActive(false);
                incident.setResolvedAt(now);
                downTimeIncidentRepository.save( incident) ;

                metricsClient.sendDowntimeEvent(
                        new DownTimeEventDTO(api.getApiId(), "RECOVERED",
                                incident.getStartedAt(), now)
                );
            }




        }
    }
}
