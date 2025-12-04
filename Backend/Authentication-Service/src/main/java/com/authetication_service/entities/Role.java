package com.authetication_service.entities;


import com.authetication_service.enums.UserRole;
import jakarta.persistence.*;

@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue( strategy = GenerationType.UUID )
    private String roleId ;

    @Enumerated(EnumType.STRING)
    private UserRole userRole ;

    public Role() {
    }

    public Role(String roleId, UserRole userRole) {
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
        return "Role{" +
                "roleId='" + roleId + '\'' +
                ", userRole=" + userRole.getUserRole() +
                '}';
    }
}
