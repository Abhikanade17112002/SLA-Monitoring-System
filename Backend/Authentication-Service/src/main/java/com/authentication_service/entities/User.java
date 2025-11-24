package com.authentication_service.entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue( strategy = GenerationType.UUID )
    private String userId ;

    @Column( nullable = false , unique = true)
    private String userName ;

    @Column( nullable = false )
    private String firstName ;

    @Column( nullable = false )
    private String lastName ;

    @Column( nullable = false , unique = true )
    private String emailId ;

    @Column( nullable = false )
    private String password ;

    @ManyToMany( fetch = FetchType.EAGER  , cascade = {CascadeType.MERGE, CascadeType.PERSIST,CascadeType.REMOVE} )
    @JoinTable(
            name = "userrolesmapping",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "userId"),  // FK → users.user_id
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "roleId") // FK → userroles.role_id
    )
    private List<UserRoles> userRoles = new ArrayList<>() ;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return userRoles.stream()
                .map(role -> (GrantedAuthority) () -> role.getRoleType())
                .toList();
    }

    @Override
    public @Nullable String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.emailId ;
    }


    public String getUserName() {
        return this.userName ;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public List<UserRoles> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(List<UserRoles> userRoles) {
        this.userRoles = userRoles;
    }


    @Override
    public String toString() {
        return "User{" +
                "userId='" + userId + '\'' +
                ", userName='" + userName + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", emailId='" + emailId + '\'' +
                ", password='" + password + '\'' +
                ", userRoles=" + userRoles +
                '}';
    }
}
