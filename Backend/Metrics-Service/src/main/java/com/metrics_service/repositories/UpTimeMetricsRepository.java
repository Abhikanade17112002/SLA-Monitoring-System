package com.metrics_service.repositories;

import com.metrics_service.entities.UpTimeMetrics;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UpTimeMetricsRepository extends JpaRepository<UpTimeMetrics,String> {
    // Latest 50 uptime signals → chart
    List<UpTimeMetrics> findTop50ByApiIdOrderByTimestampDesc(String apiId);

    // For SLA uptime percentage calculation
    List<UpTimeMetrics> findByApiIdOrderByTimestampDesc(String apiId);
}
