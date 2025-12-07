package com.monitor_service.repositories;

import com.monitor_service.entities.LatencyLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LatencyLogRepository extends JpaRepository<LatencyLog,String> {
    List<LatencyLog> findTop50ByMonitoredApi_ApiIdOrderByTimestampDesc(String apiId);
}
