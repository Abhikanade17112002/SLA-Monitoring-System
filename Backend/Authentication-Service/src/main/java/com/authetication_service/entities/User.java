package com.authetication_service.entities;


import com.authetication_service.enums.UserRole;
import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table( name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue( strategy = GenerationType.UUID)
    private String userId ;

    @Column( nullable = false )
    private String firstName ;

    @Column( nullable = false )
    private String lastName ;

    @Column( nullable = false , unique = true )
    private String emailId ;

    @Column( nullable = false ,  unique = true)
    private String userName ;

    @Column( nullable = false )
    private String password ;

    @ManyToOne( fetch = FetchType.EAGER )
    @JoinColumn( name = "role_id")
    private Role role ;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        System.out.println("Look ==> " +  role.getUserRole().getUserRole());
        return List.of( new SimpleGrantedAuthority(role.getUserRole().getUserRole()) ) ;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.emailId;
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

    public void setPassword(String password) {
        this.password = password;
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

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "User{" +
                "emailId='" + emailId + '\'' +
                ", userId='" + userId + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", userName='" + userName + '\'' +
                ", userRole=" + role.getUserRole().getUserRole() +
                '}';
    }
}
