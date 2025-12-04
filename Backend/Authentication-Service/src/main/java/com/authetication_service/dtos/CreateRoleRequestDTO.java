package com.authetication_service.dtos;

public class CreateRoleRequestDTO {
    private String role ;

    public CreateRoleRequestDTO() {
    }

    public CreateRoleRequestDTO(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "CreateRoleRequestDTO{" +
                "role='" + role + '\'' +
                '}';
    }
}
