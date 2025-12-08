package com.notification_service.error;

public class AlertConfigNotFoundException extends RuntimeException {
    public AlertConfigNotFoundException(String apiId) {
        super("No alert configuration found for API: " + apiId);
    }
}