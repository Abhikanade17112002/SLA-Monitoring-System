package com.notification_service.repositories;

import com.notification_service.entities.AlertConfig;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AlertConfigRepository extends JpaRepository<AlertConfig,String> {

    Optional<AlertConfig> findByApiId(String apiId);
}
