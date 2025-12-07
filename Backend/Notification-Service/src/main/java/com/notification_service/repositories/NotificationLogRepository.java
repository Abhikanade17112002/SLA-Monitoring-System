package com.notification_service.repositories;

import com.notification_service.entities.NotificationLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationLogRepository extends JpaRepository<NotificationLog,String> {

}
