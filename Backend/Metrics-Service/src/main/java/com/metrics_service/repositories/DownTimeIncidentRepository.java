package com.metrics_service.repositories;

import com.metrics_service.entities.DownTimeIncident;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DownTimeIncidentRepository extends JpaRepository<DownTimeIncident,String> {
    // Full downtime history
    List<DownTimeIncident> findByApiIdOrderByStartedAtDesc(String apiId);
}
