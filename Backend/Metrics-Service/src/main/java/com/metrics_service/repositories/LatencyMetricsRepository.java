package com.metrics_service.repositories;

import com.metrics_service.entities.LatencyMetrics;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LatencyMetricsRepository extends JpaRepository<LatencyMetrics,String> {

    // Latest 50 latency records → chart
    List<LatencyMetrics> findTop50ByApiIdOrderByTimestampDesc(String apiId);

    // Average latency for SLA
    List<LatencyMetrics> findByApiIdOrderByTimestampDesc(String apiId);

}
