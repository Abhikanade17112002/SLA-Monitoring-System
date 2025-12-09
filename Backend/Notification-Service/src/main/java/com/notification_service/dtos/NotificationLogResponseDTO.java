package com.notification_service.dtos;

import com.notification_service.entities.NotificationLog;

import java.util.List;

public class NotificationLogResponseDTO {

    private List<NotificationLog> notificationLogList ;

    public NotificationLogResponseDTO() {
    }

    public NotificationLogResponseDTO(List<NotificationLog> notificationLogList) {
        this.notificationLogList = notificationLogList;
    }

    public List<NotificationLog> getNotificationLogList() {
        return notificationLogList;
    }

    public void setNotificationLogList(List<NotificationLog> notificationLogList) {
        this.notificationLogList = notificationLogList;
    }


    @Override
    public String toString() {
        return "NotificationLogResponseDTO{" +
                "notificationLogList=" + notificationLogList +
                '}';
    }
}
