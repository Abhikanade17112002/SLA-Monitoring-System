package com.notification_service.repositories;

import com.notification_service.entities.NotificationLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationLogRepository extends JpaRepository<NotificationLog,String> {
    List<NotificationLog> findTop60ByOrderByCreatedAtDesc();
}
