package com.notification_service.entities;


import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "notification_log")
public class NotificationLog {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String apiId;

    private String recipientEmail;

    private String alertType; // DOWN, RECOVERED, SLOW

    @Column(length = 500)
    private String message;

    private String status; // SUCCESS / FAILED

    private LocalDateTime createdAt;

    // getters & setters


    public NotificationLog() {
    }

    public NotificationLog(String id, String apiId, String recipientEmail, String alertType, String message, String status, LocalDateTime createdAt) {
        this.id = id;
        this.apiId = apiId;
        this.recipientEmail = recipientEmail;
        this.alertType = alertType;
        this.message = message;
        this.status = status;
        this.createdAt = createdAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getApiId() {
        return apiId;
    }

    public void setApiId(String apiId) {
        this.apiId = apiId;
    }

    public String getRecipientEmail() {
        return recipientEmail;
    }

    public void setRecipientEmail(String recipientEmail) {
        this.recipientEmail = recipientEmail;
    }

    public String getAlertType() {
        return alertType;
    }

    public void setAlertType(String alertType) {
        this.alertType = alertType;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "NotificationLog{" +
                "id='" + id + '\'' +
                ", apiId='" + apiId + '\'' +
                ", recipientEmail='" + recipientEmail + '\'' +
                ", alertType='" + alertType + '\'' +
                ", message='" + message + '\'' +
                ", status='" + status + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
}