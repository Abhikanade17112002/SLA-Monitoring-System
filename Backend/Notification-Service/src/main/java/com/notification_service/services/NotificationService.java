package com.notification_service.services;

import com.notification_service.dtos.AlertEventDTO;
import com.notification_service.dtos.NotificationLogResponseDTO;
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
import java.util.List;
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
        System.out.println("=".repeat(80));
        System.out.println("📨 INCOMING ALERT NOTIFICATION");
        System.out.println("=".repeat(80));
        System.out.println("Alert Details:");
        System.out.println("  • API ID: " + alert.getApiId());
        System.out.println("  • API Name: " + alert.getApiName());
        System.out.println("  • Alert Type: " + alert.getAlertType());
        System.out.println("  • Timestamp: " + alert.getTimestamp());
        System.out.println("  • Latency: " + (alert.getLatencyMs() != null ? alert.getLatencyMs() + " ms" : "N/A"));
        System.out.println("  • Message: " + alert.getMessage());
        System.out.println("-".repeat(80));

        Optional<AlertConfig> configOpt = alertConfigRepository.findByApiId(alert.getApiId());

        if (configOpt.isEmpty()) {
            System.out.println("⚠️  WARNING: No alert configuration found for API ID: " + alert.getApiId());
            System.out.println("   Skipping notification.");
            System.out.println("=".repeat(80));
            System.out.println();
            return; // No config → skip
        }

        AlertConfig config = configOpt.get();
        System.out.println("✓ Alert configuration found:");
        System.out.println("  • Owner Email: " + config.getOwnerEmail());
        System.out.println("  • Alert on DOWN: " + config.isAlertOnDown());
        System.out.println("  • Alert on SLOW: " + config.isAlertOnSlow());
        System.out.println("  • Alert on RECOVERED: " + config.isAlertOnRecovered());
        System.out.println("-".repeat(80));

        // ----------------- CHECK ALERT TYPE ENABLED -----------------
        if (alert.getAlertType().equalsIgnoreCase("DOWN") && !config.isAlertOnDown()) {
            System.out.println("⏭️  SKIPPED: DOWN alerts are disabled for this API");
            System.out.println("=".repeat(80));
            System.out.println();
            return;
        }
        if (alert.getAlertType().equalsIgnoreCase("RECOVERED") && !config.isAlertOnRecovered()) {
            System.out.println("⏭️  SKIPPED: RECOVERED alerts are disabled for this API");
            System.out.println("=".repeat(80));
            System.out.println();
            return;
        }
        if (alert.getAlertType().equalsIgnoreCase("SLOW") && !config.isAlertOnSlow()) {
            System.out.println("⏭️  SKIPPED: SLOW alerts are disabled for this API");
            System.out.println("=".repeat(80));
            System.out.println();
            return;
        }

        System.out.println("✓ Alert type check passed - proceeding with notification");

        // ----------------- DETERMINE ALERT COLORS & ICONS -----------------
        String alertColor, alertBgColor, statusIcon, statusText;

        switch (alert.getAlertType().toUpperCase()) {
            case "DOWN":
                alertColor = "#dc3545";
                alertBgColor = "#f8d7da";
                statusIcon = "🔴";
                statusText = "Service Down";
                break;
            case "SLOW":
                alertColor = "#ffc107";
                alertBgColor = "#fff3cd";
                statusIcon = "⚠️";
                statusText = "Performance Degradation";
                break;
            case "RECOVERED":
                alertColor = "#28a745";
                alertBgColor = "#d4edda";
                statusIcon = "✅";
                statusText = "Service Recovered";
                break;
            default:
                alertColor = "#6c757d";
                alertBgColor = "#e2e3e5";
                statusIcon = "ℹ️";
                statusText = alert.getAlertType();
        }

        String subject = String.format(" %s - %s",              alert.getApiName(),              statusText         );

        // ----------------- PREPARE HTML CONTENT -----------------
        String latencyRow = "";
        if (alert.getLatencyMs() != null) {
            String latencyColor = alert.getLatencyMs() > 1000 ? "#dc3545" : "#6c757d";
            latencyRow = """
                <tr>
                    <td style='padding: 14px 16px; border-bottom: 1px solid #e9ecef; color: #495057; font-weight: 500;'>
                        Response Time
                    </td>
                    <td style='padding: 14px 16px; border-bottom: 1px solid #e9ecef; color: %s; font-weight: 600;'>
                        %s ms
                    </td>
                </tr>
            """.formatted(latencyColor, alert.getLatencyMs());
        }

        String html = """
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f6f9;">
                <table width="100%%" cellpadding="0" cellspacing="0" style="background-color: #f4f6f9; padding: 40px 20px;">
                    <tr>
                        <td align="center">
                            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.07); overflow: hidden;">
                                
                                <!-- Header -->
                                <tr>
                                    <td style="background: linear-gradient(135deg, #667eea 0%%, #764ba2 100%%); padding: 32px 40px; text-align: center;">
                                        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">
                                            SLA Monitoring System
                                        </h1>
                                        <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">
                                            Real-time API Health Monitoring
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Alert Banner -->
                                <tr>
                                    <td style="background-color: %s; padding: 20px 40px; border-left: 4px solid %s;">
                                        <table width="100%%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td style="font-size: 24px; width: 40px; vertical-align: middle;">%s</td>
                                                <td style="vertical-align: middle;">
                                                    <h2 style="margin: 0; color: %s; font-size: 20px; font-weight: 600;">
                                                        %s
                                                    </h2>
                                                    <p style="margin: 4px 0 0 0; color: #6c757d; font-size: 13px;">
                                                        Alert triggered at %s
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                
                                <!-- Content -->
                                <tr>
                                    <td style="padding: 32px 40px;">
                                        <p style="margin: 0 0 24px 0; color: #495057; font-size: 15px; line-height: 1.6;">
                                            Hello,
                                        </p>
                                        <p style="margin: 0 0 28px 0; color: #495057; font-size: 15px; line-height: 1.6;">
                                            An alert has been triggered for your monitored API. Please review the details below and take appropriate action if necessary.
                                        </p>
                                        
                                        <!-- Details Table -->
                                        <table width="100%%" cellpadding="0" cellspacing="0" style="border-radius: 8px; overflow: hidden; border: 1px solid #e9ecef;">
                                            <tr>
                                                <td colspan="2" style="background-color: #f8f9fa; padding: 12px 16px; border-bottom: 2px solid #dee2e6;">
                                                    <strong style="color: #212529; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">
                                                        Alert Details
                                                    </strong>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 14px 16px; border-bottom: 1px solid #e9ecef; color: #495057; font-weight: 500; width: 40%%;">
                                                    API Name
                                                </td>
                                                <td style="padding: 14px 16px; border-bottom: 1px solid #e9ecef; color: #212529; font-weight: 600;">
                                                    %s
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 14px 16px; border-bottom: 1px solid #e9ecef; color: #495057; font-weight: 500;">
                                                    API ID
                                                </td>
                                                <td style="padding: 14px 16px; border-bottom: 1px solid #e9ecef; color: #6c757d; font-family: 'Courier New', monospace; font-size: 13px;">
                                                    %s
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 14px 16px; border-bottom: 1px solid #e9ecef; color: #495057; font-weight: 500;">
                                                    Status
                                                </td>
                                                <td style="padding: 14px 16px; border-bottom: 1px solid #e9ecef;">
                                                    <span style="display: inline-block; padding: 4px 12px; background-color: %s; color: %s; border-radius: 12px; font-size: 13px; font-weight: 600;">
                                                        %s
                                                    </span>
                                                </td>
                                            </tr>
                                            %s
                                            <tr>
                                                <td style="padding: 14px 16px; color: #495057; font-weight: 500;">
                                                    Detected At
                                                </td>
                                                <td style="padding: 14px 16px; color: #6c757d;">
                                                    %s
                                                </td>
                                            </tr>
                                        </table>
                                        
                                        <!-- Message Box -->
                                        <div style="margin-top: 24px; padding: 16px; background-color: #f8f9fa; border-left: 3px solid %s; border-radius: 4px;">
                                            <p style="margin: 0; color: #495057; font-size: 14px; line-height: 1.6;">
                                                <strong style="color: #212529;">Additional Information:</strong><br>
                                                %s
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                                
                                <!-- Footer -->
                                <tr>
                                    <td style="background-color: #f8f9fa; padding: 24px 40px; border-top: 1px solid #e9ecef;">
                                        <p style="margin: 0 0 8px 0; color: #6c757d; font-size: 13px; line-height: 1.5;">
                                            Best regards,<br>
                                            <strong style="color: #495057;">SLA Monitoring Team</strong>
                                        </p>
                                        <p style="margin: 16px 0 0 0; color: #adb5bd; font-size: 12px; line-height: 1.4;">
                                            This is an automated notification from your SLA monitoring system. Please do not reply to this email.
                                        </p>
                                    </td>
                                </tr>
                                
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
        """.formatted(
                alertBgColor,                                    // Alert banner background
                alertColor,                                      // Alert banner left border
                statusIcon,                                      // Status icon
                alertColor,                                      // Alert title color
                statusText,                                      // Alert status text
                alert.getTimestamp() != null ? alert.getTimestamp() : "N/A",  // Timestamp in banner
                alert.getApiName(),                                         // API Name
                alert.getApiId() != null ? alert.getApiId() : "N/A",         // API ID
                alertBgColor,                                    // Status badge background
                alertColor,                                      // Status badge text color
                alert.getAlertType(),                                       // Status badge text
                latencyRow,                                      // Latency row (conditional)
                alert.getTimestamp() != null ? alert.getTimestamp() : "N/A",  // Detected at timestamp
                alertColor,                                      // Message box border color
                alert.getMessage() != null ? alert.getMessage() : "No additional information available"  // Message content
        );

        String status = "SUCCESS";

        // ----------------- SEND EMAIL -----------------
        System.out.println("-".repeat(80));
        System.out.println("📤 SENDING EMAIL...");

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(config.getOwnerEmail());
            helper.setSubject(subject);
            helper.setText(html, true); // enable HTML

            mailSender.send(message);

            System.out.println("✅ SUCCESS: Email sent successfully!");
            System.out.println("   Recipient: " + config.getOwnerEmail());
            System.out.println("   API ID: " + alert.getApiId());

        } catch (Exception ex) {
            System.out.println("❌ ERROR: Failed to send email");
            System.out.println("   API ID: " + alert.getApiId());
            System.out.println("   Recipient: " + config.getOwnerEmail());
            System.out.println("   Error Message: " + ex.getMessage());
            System.out.println("   Exception Type: " + ex.getClass().getSimpleName());
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

        System.out.println();
        System.out.println("Notification Log ==> " + log);
        System.out.println();

        notificationLogRepository.save(log);
    }

    public NotificationLogResponseDTO getNotificationsLogs() {
        System.out.println("=".repeat(80));
        System.out.println("📋 FETCHING NOTIFICATION LOGS");
        System.out.println("=".repeat(80));

        List<NotificationLog> notificationLogResponseDTOList = notificationLogRepository.findTop60ByOrderByCreatedAtDesc();

        System.out.println("✓ Retrieved " + notificationLogResponseDTOList.size() + " notification logs");
        System.out.println("=".repeat(80));
        System.out.println();

        NotificationLogResponseDTO response = new NotificationLogResponseDTO();
        response.setNotificationLogList(notificationLogResponseDTOList);
        return response;
    }
}