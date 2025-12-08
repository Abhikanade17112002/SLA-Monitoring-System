package com.notification_service.services;

import com.notification_service.dtos.AlertEventDTO;
import com.notification_service.entities.AlertConfig;
import com.notification_service.entities.NotificationLog;
import com.notification_service.repositories.AlertConfigRepository;
import com.notification_service.repositories.NotificationLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class NotificationService {

    @Autowired
    private AlertConfigRepository alertConfigRepository;

    @Autowired
    private NotificationLogRepository notificationLogRepository;

    @Autowired
    private JavaMailSender mailSender;

    public void processAlert(AlertEventDTO alert) {

        Optional<AlertConfig> configOpt = alertConfigRepository.findByApiId(alert.getApiId());

        if (configOpt.isEmpty()) {
            return; // No config → skip
        }

        AlertConfig config = configOpt.get();

        // ----------------- CHECK ALERT TYPE ENABLED -----------------
        if (alert.getAlertType().equalsIgnoreCase("DOWN") && !config.isAlertOnDown()) return;
        if (alert.getAlertType().equalsIgnoreCase("RECOVERED") && !config.isAlertOnRecovered()) return;
        if (alert.getAlertType().equalsIgnoreCase("SLOW") && !config.isAlertOnSlow()) return;

        // ----------------- SUBJECT -----------------
        String subject = "[API ALERT] " + alert.getApiId() + " - " + alert.getAlertType();

        // ----------------- PREPARE HTML CONTENT -----------------
        String latencyRow = "";
        if (alert.getLatencyMs() != null) {
            latencyRow = """
                    <tr>
                        <td style='padding:8px; border:1px solid #ddd;'><strong>Latency</strong></td>
                        <td style='padding:8px; border:1px solid #ddd;'>%s ms</td>
                    </tr>
                """.formatted(alert.getLatencyMs());
        }

        String html = """
            <div style="font-family: Arial, sans-serif; padding: 20px; color:#333;">
                <h2 style="color:#d9534f;">API Alert Notification</h2>
                <p>Hello,</p>

                <p>An alert has been triggered for one of your APIs. Please check the details below:</p>

                <table style="border-collapse: collapse; width: 100%%; margin-top:10px;">
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;"><strong>API ID</strong></td>
                        <td style="padding: 8px; border: 1px solid #ddd;">%s</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Status</strong></td>
                        <td style="padding: 8px; border: 1px solid #ddd;">%s</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Timestamp</strong></td>
                        <td style="padding: 8px; border: 1px solid #ddd;">%s</td>
                    </tr>
                    %s
                </table>

                <p style="margin-top:20px;"><strong>Message:</strong><br>%s</p>

                <p style="margin-top:30px;">Regards,<br><strong>Monitoring Service</strong></p>
            </div>
        """.formatted(
                alert.getApiId(),
                alert.getAlertType(),
                alert.getTimestamp(),
                latencyRow,
                alert.getMessage()
        );

        String status = "SUCCESS";

        // ----------------- SEND EMAIL -----------------
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(config.getOwnerEmail());
            helper.setSubject(subject);
            helper.setText(html, true); // enable HTML

            mailSender.send(message);

        } catch (Exception ex) {
            status = "FAILED";
            ex.printStackTrace();
        }

        // ----------------- LOG ACTIVITY -----------------
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
