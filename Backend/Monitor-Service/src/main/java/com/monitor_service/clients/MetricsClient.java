package com.monitor_service.clients;
import com.monitor_service.dtos.DownTimeEventDTO;
import com.monitor_service.dtos.LatencyEventDTO;
import com.monitor_service.dtos.UpTimeEventDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(
        name = "metrics-service",
        configuration = com.monitor_service.configuration.FeingConfig.class
)
public interface MetricsClient {

    @PostMapping("/metrics/event/latency")
    void sendLatencyEvent(LatencyEventDTO event);

    @PostMapping("/metrics/event/uptime")
    void sendUptimeEvent(UpTimeEventDTO event);

    @PostMapping("/metrics/event/downtime")
    void sendDowntimeEvent(DownTimeEventDTO event);
}
