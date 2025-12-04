package com.authetication_service.enums;
public enum UserRole {

    ADMIN("Admin"),
    USER("User"),
    DEVELOPER("Developer");

    private final String userRole;

    UserRole(String userRole) {
        this.userRole = userRole;
    }

    public String getUserRole() {
        return userRole;
    }
}
