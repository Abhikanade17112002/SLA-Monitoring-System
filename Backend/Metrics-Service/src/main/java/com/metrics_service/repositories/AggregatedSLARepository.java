package com.metrics_service.repositories;

import com.metrics_service.entities.AggregatedSLA;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;

public interface AggregatedSLARepository extends JpaRepository<AggregatedSLA,String> {
    AggregatedSLA findByApiIdAndDate(String apiId, LocalDate date);
}
