package com.monitor_service.repositories;


import com.monitor_service.entities.HealthCheckLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HealthCheckLogRepository extends JpaRepository<HealthCheckLog,String> {
    List<HealthCheckLog> findTop20ByMonitoredApi_ApiIdOrderByTimestampDesc(String apiId);
}
