package com.authetication_service.controllers;

public class UserSignInRequestDTO {
    private String emailId ;
    private String password ;

    public UserSignInRequestDTO() {
    }

    public UserSignInRequestDTO(String emailId, String password) {
        this.emailId = emailId;
        this.password = password;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "UserSignInRequestDTO{" +
                "emailId='" + emailId + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
