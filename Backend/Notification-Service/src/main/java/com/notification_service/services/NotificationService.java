package com.notification_service.services;


import com.notification_service.dtos.AlertEventDTO;
import com.notification_service.entities.AlertConfig;
import com.notification_service.entities.NotificationLog;
import com.notification_service.repositories.AlertConfigRepository;
import com.notification_service.repositories.NotificationLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class NotificationService {

    @Autowired
    private AlertConfigRepository alertConfigRepository ;
    @Autowired
    private NotificationLogRepository notificationLogRepository ;
    @Autowired
    private JavaMailSender mailSender ;


    public void processAlert(AlertEventDTO alert) {

        Optional<AlertConfig> configOpt = alertConfigRepository.findByApiId(alert.getApiId());

        if (configOpt.isEmpty()) {
            // No config for this API → ignore
            return;
        }

        AlertConfig config = configOpt.get();

        // Check if this alert type is enabled
        if (alert.getAlertType().equalsIgnoreCase("DOWN") && !config.isAlertOnDown()) {
            return;
        }
        if (alert.getAlertType().equalsIgnoreCase("RECOVERED") && !config.isAlertOnRecovered()) {
            return;
        }
        if (alert.getAlertType().equalsIgnoreCase("SLOW") && !config.isAlertOnSlow()) {
            return;
        }

        // Build email content
        String subject = "[ALERT] API " + alert.getAlertType() + " - " + alert.getApiId();
        StringBuilder body = new StringBuilder();
        body.append("API ID: ").append(alert.getApiId()).append("\n");
        body.append("Type: ").append(alert.getAlertType()).append("\n");
        body.append("Time: ").append(alert.getTimestamp()).append("\n");
        if (alert.getLatencyMs() != null) {
            body.append("Latency: ").append(alert.getLatencyMs()).append(" ms\n");
        }
        body.append("Details: ").append(alert.getMessage());

        String status = "SUCCESS";

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(config.getOwnerEmail());
            message.setSubject(subject);
            message.setText(body.toString());
            mailSender.send(message);
        } catch (Exception ex) {
            status = "FAILED";
            ex.printStackTrace();
        }

        // Log notification
        NotificationLog log = new NotificationLog();
        log.setApiId(alert.getApiId());
        log.setRecipientEmail(config.getOwnerEmail());
        log.setAlertType(alert.getAlertType());
        log.setMessage(alert.getMessage());
        log.setStatus(status);
        log.setCreatedAt(LocalDateTime.now());

        notificationLogRepository.save(log);
    }
}
