package com.authetication_service.repository;

import com.authetication_service.entities.Role;
import com.authetication_service.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role,String> {
    Optional<Role> findByUserRole(UserRole userRole) ;
}
