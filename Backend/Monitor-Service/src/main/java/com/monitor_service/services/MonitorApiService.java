package com.monitor_service.services;

import com.monitor_service.dtos.ApiStatusResponse;
import com.monitor_service.dtos.CreateMonitorApiResponse;
import com.monitor_service.dtos.CreateMonitoredApiRequest;
import com.monitor_service.dtos.UpdateMonitoredApiRequest;
import com.monitor_service.entities.LatencyLog;
import com.monitor_service.entities.MonitoredApi;
import com.monitor_service.entities.ThresholdConfig;
import com.monitor_service.repositories.LatencyLogRepository;
import com.monitor_service.repositories.MonitoredApiRepository;
import com.monitor_service.repositories.ThresholdConfigRepository;
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


    public String  updateApi(String apiId, UpdateMonitoredApiRequest request) {

        MonitoredApi api = monitoredApiRepository.findById(apiId)
                .orElseThrow(() -> new RuntimeException("API not found with api Id ==> " + apiId));

        api.setApiName(request.getApiName());
        api.setApiUrl(request.getApiUrl());
        api.setOwnerEmail(request.getOwnerEmail());
        api.setMonitorFrequencySec(request.getMonitorFrequencySec());

        if (request.getActive() != null) {
            api.setActive(request.getActive());
        }

        monitoredApiRepository.save(api);

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

        thresholdConfigRepository.save(config);

        return "message: Updated Api With Api Id ==> " + apiId + " Succesfully" ;
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

}
