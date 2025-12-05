package com.authetication_service.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {
    @PreAuthorize("hasAuthority('Admin')")
    @GetMapping("/home")
    public ResponseEntity<String> getHomePage(){
        return ResponseEntity.ok("Home Page") ;
    }

    @PreAuthorize("hasAuthority('User')")
    @GetMapping("/home2")
    public ResponseEntity<String> getHomePage2() {

        return ResponseEntity.ok("Home Page 2");
    }
}
