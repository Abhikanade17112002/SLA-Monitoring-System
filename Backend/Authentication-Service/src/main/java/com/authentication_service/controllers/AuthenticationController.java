package com.authentication_service.controllers;


import com.authentication_service.dtos.UserSignInRequestDTO;
import com.authentication_service.dtos.UserSignInResponseDTO;
import com.authentication_service.dtos.UserSignUpRequestDTO;
import com.authentication_service.dtos.UserSignUpResponseDTO;
import com.authentication_service.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private UserService userService ;

    @GetMapping("")
    public ResponseEntity getHomePage(){
        return ResponseEntity.ok("Home Page") ;
    }


    @PostMapping("/signup")
    public ResponseEntity<UserSignUpResponseDTO> getUserSignUp(@RequestBody UserSignUpRequestDTO userSignUpRequestDTO){

        return ResponseEntity.status(HttpStatus.CREATED).body(
                userService.getUserSignUp(userSignUpRequestDTO)
        ) ;

    }


    @PostMapping("/signin")
    public ResponseEntity<UserSignInResponseDTO> getUserSignIn(@RequestBody UserSignInRequestDTO userSignInRequestDTO){

        return ResponseEntity.status(HttpStatus.OK).body(
                userService.getUserSignIn(userSignInRequestDTO)
        ) ;

    }



}
