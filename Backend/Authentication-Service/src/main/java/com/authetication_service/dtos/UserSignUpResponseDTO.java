package com.authetication_service.dtos;

public class UserSignUpResponseDTO {

    private String userId ;

    private String userName ;

    private String emailId ;


    private String role ;

    public UserSignUpResponseDTO() {
    }

    public UserSignUpResponseDTO(String userId, String userName, String emailId, String role) {
        this.userId = userId;
        this.userName = userName;
        this.emailId = emailId;
        this.role = role;
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

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "UserSignUpResponseDTO{" +
                "userId='" + userId + '\'' +
                ", userName='" + userName + '\'' +
                ", emailId='" + emailId + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}
