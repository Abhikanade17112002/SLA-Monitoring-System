package com.authetication_service.dtos;

public class SignUpResponseDTO {
    private String firstName;
    private String lastName;
    private String emailId;
    private String role;


    public SignUpResponseDTO() {
    }

    public SignUpResponseDTO(String emailId, String firstName, String lastName, String role) {
        this.emailId = emailId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
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

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
