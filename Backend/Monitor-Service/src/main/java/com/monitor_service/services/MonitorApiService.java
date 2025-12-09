package com.monitor_service.services;

import com.monitor_service.dtos.*;
import com.monitor_service.entities.*;
import com.monitor_service.repositories.*;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MonitorApiService {

    @Autowired
    private MonitoredApiRepository monitoredApiRepository ;
    @Autowired
    private ThresholdConfigRepository thresholdConfigRepository ;
    @Autowired
    private LatencyLogRepository latencyLogRepository ;
    @Autowired
    private HealthCheckLogRepository healthCheckLogRepository ;
    @Autowired
    private DownTimeIncidentRepository downTimeIncidentRepository ;


    public CreateMonitorApiResponse createApi(CreateMonitoredApiRequest request) {

        if (monitoredApiRepository.existsByApiUrl(request.getApiUrl())) {
            throw new RuntimeException("API already exists with same URL.");
        }

        MonitoredApi api = new MonitoredApi();
        api.setApiName(request.getApiName());
        api.setApiUrl(request.getApiUrl());
        api.setOwnerEmail(request.getOwnerEmail());
        api.setMonitorFrequencySec(request.getMonitorFrequencySec());
        api.setActive(true);

        MonitoredApi savedApi = monitoredApiRepository.save(api);

        // -------- Create Threshold ----------
        ThresholdConfig config = new ThresholdConfig();
        config.setMonitoredApi(savedApi);
        config.setExpectedStatusCode(request.getExpectedStatusCode());
        config.setMaxResponseTimeMs(request.getMaxResponseTimeMs());
        config.setRetryAttempts(request.getRetryAttempts());
        config.setTimeoutMs(request.getTimeoutMs());

        thresholdConfigRepository.save(config);

        return new CreateMonitorApiResponse(
                savedApi.getApiId() ,
                savedApi.getApiUrl() ,
                savedApi.getApiName()
        );
    }


    public UpdateApiDetailResponse  updateApi(String apiId, UpdateMonitoredApiRequest request) {

        MonitoredApi api = monitoredApiRepository.findById(apiId)
                .orElseThrow(() -> new RuntimeException("API not found with api Id ==> " + apiId));

        api.setApiName(request.getApiName());
        api.setApiUrl(request.getApiUrl());
        api.setOwnerEmail(request.getOwnerEmail());
        api.setMonitorFrequencySec(request.getMonitorFrequencySec());



       MonitoredApi savedMonitoredApi =  monitoredApiRepository.save(api);

        // Update Threshold
        ThresholdConfig config = thresholdConfigRepository.findByMonitoredApi_ApiId(apiId);

        if (request.getExpectedStatusCode() != null)
            config.setExpectedStatusCode(request.getExpectedStatusCode());

        if (request.getMaxResponseTimeMs() != null)
            config.setMaxResponseTimeMs(request.getMaxResponseTimeMs());

        if (request.getRetryAttempts() != null)
            config.setRetryAttempts(request.getRetryAttempts());

        if (request.getTimeoutMs() != null)
            config.setTimeoutMs(request.getTimeoutMs());

       ThresholdConfig savedThresholdConfig = thresholdConfigRepository.save(config);

       UpdateApiDetailResponse response = new UpdateApiDetailResponse() ;

       response.setMonitoredApi(savedMonitoredApi);
       response.setThresholdConfig(savedThresholdConfig);

        return response;
    }


    public List<MonitoredApi> getAllApis() {
        return monitoredApiRepository.findAll();
    }

    public ApiStatusResponse getApiStatus(String apiId) {

        MonitoredApi api = monitoredApiRepository.findById(apiId)
                .orElseThrow(() -> new RuntimeException("API not found with api Id ==> " + apiId));

        ApiStatusResponse response = new ApiStatusResponse();
        response.setApiId(api.getApiId());
        response.setApiName(api.getApiName());
        response.setApiUrl(api.getApiUrl());
        response.setActive(api.getActive());
        response.setLastCheckedAt(api.getLastCheckedAt());
        response.setLastStatusUp(api.getLastStatusUp());

        // Fetch last latency record
        List<LatencyLog> lastLatency = latencyLogRepository
                .findTop50ByMonitoredApi_ApiIdOrderByTimestampDesc(apiId);

        if (!lastLatency.isEmpty()) {
            response.setLastResponseTimeMs(lastLatency.get(0).getResponseTimeMs());
        }

        return response;
    }

    public FetchDataResponse getAdminData() {

        List<DownTimeIncident> downTimeIncidents = downTimeIncidentRepository.findAll() ;
        List<HealthCheckLog> healthCheckLogs = healthCheckLogRepository.findAll() ;
        List<MonitoredApi> monitoredApis = monitoredApiRepository.findAll() ;
        List<LatencyLog> latencyLogs = latencyLogRepository.findAll() ;
        List<ThresholdConfig> thresholdConfigs = thresholdConfigRepository.findAll() ;


        FetchDataResponse fetchDataResponse = new FetchDataResponse() ;

        fetchDataResponse.setMonitoredApis(monitoredApis);
        fetchDataResponse.setDownTimeIncidents(downTimeIncidents);
        fetchDataResponse.setHealthCheckLogs(healthCheckLogs);
        fetchDataResponse.setLatencyLogs(latencyLogs);
        fetchDataResponse.setThresholdConfigs(thresholdConfigs);


        System.out.println(fetchDataResponse);


        return fetchDataResponse ;
    }

    public String deleteApiById(String apiId) {

        monitoredApiRepository.deleteById(apiId);
        return "Successfully Deleted Api With Id ==> " + apiId ;
    }

    public GetApiByIdResponse getApiById(String apiId) {

        List<DownTimeIncident> downTimeIncidents = downTimeIncidentRepository.findTop50ByMonitoredApi_ApiIdOrderByStartedAtDesc(apiId) ;
        List<HealthCheckLog> healthCheckLogs = healthCheckLogRepository.findTop50ByMonitoredApi_ApiIdOrderByTimestampDesc(apiId);
        List<LatencyLog> latencyLogs = latencyLogRepository.findTop50ByMonitoredApi_ApiIdOrderByTimestampDesc(apiId) ;
        ThresholdConfig thresholdConfigs = thresholdConfigRepository.findByMonitoredApi_ApiId(apiId) ;
        MonitoredApi monitoredApi = monitoredApiRepository.findById(apiId).orElseThrow(()-> new EntityNotFoundException());

        GetApiByIdResponse response = new GetApiByIdResponse() ;

        response.setMonitoredApi(monitoredApi);
        response.setDownTimeIncidentList(downTimeIncidents);
        response.setLatencyLogs(latencyLogs);
        response.setHealthCheckLogs(healthCheckLogs);
        response.setThresholdConfig(thresholdConfigs);

        return response ;
    }
}
