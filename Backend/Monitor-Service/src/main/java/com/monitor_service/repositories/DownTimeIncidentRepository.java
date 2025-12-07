package com.monitor_service.repositories;


import com.monitor_service.entities.DownTimeIncident;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DownTimeIncidentRepository extends JpaRepository<DownTimeIncident,String> {
    List<DownTimeIncident> findByMonitoredApi_ApiIdAndActiveTrue(String apiId);

    List<DownTimeIncident> findByMonitoredApi_ApiIdOrderByStartedAtDesc(String apiId);
}
