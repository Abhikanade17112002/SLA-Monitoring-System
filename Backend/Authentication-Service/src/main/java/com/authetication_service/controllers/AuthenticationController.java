package com.authetication_service.controllers;


import com.authetication_service.dtos.CreateRoleRequestDTO;
import com.authetication_service.dtos.CreateRoleResponseDTO;
import com.authetication_service.dtos.UserSignUpRequestDTO;
import com.authetication_service.dtos.UserSignUpResponseDTO;
import com.authetication_service.service.RoleService;
import com.authetication_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private RoleService roleService ;


    @Autowired
    private UserService userService ;


    @PostMapping("/signup")
    public ResponseEntity<UserSignUpResponseDTO> getUserSignUp(@RequestBody UserSignUpRequestDTO user ){

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(
                   userService.getUserSignUp(  user )
                ) ;

    }

    @PostMapping("/signin")
    public ResponseEntity< UserSignInResponseDTO > getUserSignIn(@RequestBody UserSignInRequestDTO user ){

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(
                        userService.getUserSignIn( user )
                ) ;

    }



    @PreAuthorize("hasAuthority('Admin')")
    @PostMapping("/create/role")
    public ResponseEntity<CreateRoleResponseDTO> createRole(@RequestBody CreateRoleRequestDTO userRole){

        System.out.println("Recevied Role Request ==> " + userRole);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                      roleService
                              .createRole(  userRole )
                ) ;
    }

    @PreAuthorize("hasAuthority('Admin')")
    @GetMapping
    ResponseEntity<List<CreateRoleResponseDTO>> getAllUserRoles(){
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(
                        roleService.getAllUserRoles()
                );

    }
}
