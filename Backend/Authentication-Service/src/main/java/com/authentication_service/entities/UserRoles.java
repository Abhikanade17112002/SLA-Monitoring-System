package com.authentication_service.entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "roleId"
)
@Entity
@Table(name = "userroles")
public class UserRoles {
    @Id
    private String roleId ;

    @Column( nullable = false)
    private String roleType ;


    @ManyToMany( mappedBy = "userRoles")

    private List<User> userList = new ArrayList<>() ;


    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    public String getRoleType() {
        return roleType;
    }

    public void setRoleType(String roleType) {
        this.roleType = roleType;
    }

    public List<User> getUserList() {
        return userList;
    }

    public void setUserList(List<User> userList) {
        this.userList = userList;
    }

    @Override
    public String toString() {
        return "UserRoles{" +
                "roleId='" + roleId + '\'' +
                ", roleType='" + roleType + '\'' +
                '}';
    }
}
