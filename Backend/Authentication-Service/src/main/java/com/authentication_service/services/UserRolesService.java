package com.authentication_service.services;

import com.authentication_service.entities.UserRoles;
import com.authentication_service.repositories.UserRolesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserRolesService {

    @Autowired
    private UserRolesRepository  userRolesRepository ;
    public Optional<UserRoles> findByRoleType(String role) {

        return userRolesRepository.findByRoleType(role) ;
    }
}
