package com.authetication_service.service;

import com.authetication_service.dtos.CreateRoleRequestDTO;
import com.authetication_service.dtos.CreateRoleResponseDTO;
import com.authetication_service.entities.Role;
import com.authetication_service.enums.UserRole;
import com.authetication_service.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository ;

    public CreateRoleResponseDTO createRole( CreateRoleRequestDTO userRole) {

        System.out.println("A ==> " + userRole);

        UserRole role = null ;


        switch ( userRole.getRole() ){
            case "ADMIN" : role = UserRole.ADMIN ;
            break ;

            case "DEVELOPER" : role = UserRole.DEVELOPER ;
            break;

            case "USER" : role = UserRole.USER ;
            break ;

            default: role = null ;
            break ;
        }

        Role createdRole = new Role() ;
        createdRole.setUserRole(role);

        System.out.println("B ==> " + createdRole);

        Role savedRole =  roleRepository.save( createdRole ) ;

        System.out.println("Saved Role ==> " + savedRole );

        return new CreateRoleResponseDTO(  savedRole.getRoleId() , savedRole.getUserRole()) ;
    }

    public List<CreateRoleResponseDTO> getAllUserRoles() {

        List<Role> userRoles = roleRepository.findAll() ;
        List<CreateRoleResponseDTO>  response = userRoles
                                                .stream()
                                                .map( (role) -> new CreateRoleResponseDTO( role.getRoleId() , role.getUserRole()))
                                                .collect( Collectors.toList()) ;


        return response ;

    }
}
