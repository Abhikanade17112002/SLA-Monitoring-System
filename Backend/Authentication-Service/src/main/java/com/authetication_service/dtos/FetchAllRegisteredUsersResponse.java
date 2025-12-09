package com.authetication_service.dtos;

import com.authetication_service.entities.Role;
import jakarta.persistence.*;

public class FetchAllRegisteredUsersResponse {
    private String userId ;

    private String firstName ;

    private String lastName ;

    private String emailId ;

    private String userName ;

    private String role ;

    public FetchAllRegisteredUsersResponse() {
    }

    public FetchAllRegisteredUsersResponse(String userId, String firstName, String lastName, String emailId, String userName, String role) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailId = emailId;
        this.userName = userName;
        this.role = role;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "FetchAllRegisteredUsersResponse{" +
                "userId='" + userId + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", emailId='" + emailId + '\'' +
                ", userName='" + userName + '\'' +
                ", role=" + role +
                '}';
    }
}
