package com.authentication_service.repositories;

import com.authentication_service.entities.UserRoles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Optional;

public interface UserRolesRepository extends JpaRepository<UserRoles, String> {

    Optional<UserRoles> findByRoleType(String roleType);

}