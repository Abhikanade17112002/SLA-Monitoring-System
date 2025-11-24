package com.authentication_service.controllers;


import org.apache.hc.core5.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @GetMapping("/")
    public ResponseEntity getHomePage(){
        return ResponseEntity.ok("Home Page") ;
    }
}
