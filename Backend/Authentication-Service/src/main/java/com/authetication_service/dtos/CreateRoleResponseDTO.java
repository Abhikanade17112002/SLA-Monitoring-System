package com.authetication_service.dtos;

import com.authetication_service.enums.UserRole;

public class CreateRoleResponseDTO {

    private String roleId ;

    private UserRole userRole ;

    public CreateRoleResponseDTO() {
    }

    public CreateRoleResponseDTO(String roleId, UserRole userRole) {
        this.roleId = roleId;
        this.userRole = userRole;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    public UserRole getUserRole() {
        return userRole;
    }

    public void setUserRole(UserRole userRole) {
        this.userRole = userRole;
    }

    @Override
    public String toString() {
        return "CreateRoleResponseDTO{" +
                "roleId='" + roleId + '\'' +
                ", userRole=" + userRole +
                '}';
    }
}
