package com.authetication_service.dtos;

import lombok.*;


public class UserSignInResponseDTO {
    private String userId ;
    private String jwtToken ;

    private String firstName ;


    private String lastName ;


    private String emailId ;


    private String userName ;

    private String role ;


    public UserSignInResponseDTO() {
    }

    public UserSignInResponseDTO(String emailId, String firstName, String jwtToken, String lastName, String userId, String userName , String role ) {
        this.emailId = emailId;
        this.firstName = firstName;
        this.jwtToken = jwtToken;
        this.lastName = lastName;
        this.userId = userId;
        this.userName = userName;
        this.role = role ;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
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
        return "UserSignInResponseDTO{" +
                "emailId='" + emailId + '\'' +
                ", userId='" + userId + '\'' +
                ", jwtToken='" + jwtToken + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", userName='" + userName + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}
