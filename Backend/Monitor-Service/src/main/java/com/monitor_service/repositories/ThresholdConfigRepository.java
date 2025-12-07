package com.monitor_service.repositories;


import com.monitor_service.entities.ThresholdConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThresholdConfigRepository extends JpaRepository<ThresholdConfig,String> {
    ThresholdConfig findByMonitoredApi_ApiId(String apiId);
}
