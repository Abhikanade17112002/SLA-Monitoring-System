package com.authentication_service.dtos;

public class UserSignInResponseDTO {
    private String emailId ;

    public UserSignInResponseDTO(String emailId, String jwtToken) {
        this.emailId = emailId;
        this.jwtToken = jwtToken;
    }

    public UserSignInResponseDTO() {
    }

    private String jwtToken ;

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    @Override
    public String toString() {
        return "UserSignInResponseDTO{" +
                "emailId='" + emailId + '\'' +
                ", jwtToken='" + jwtToken + '\'' +
                '}';
    }
}
