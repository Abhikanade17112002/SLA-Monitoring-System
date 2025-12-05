package com.authetication_service.controllers;

public class UserSignInResponseDTO {
    private String userId ;
    private String jwtToken ;


    public UserSignInResponseDTO() {
    }

    public UserSignInResponseDTO(String jwtToken, String userId) {
        this.jwtToken = jwtToken;
        this.userId = userId;
    }

    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "UserSignInResponseDTO{" +
                "jwtToken='" + jwtToken + '\'' +
                ", userId='" + userId + '\'' +
                '}';
    }
}
