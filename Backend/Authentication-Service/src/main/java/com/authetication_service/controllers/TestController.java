package com.authetication_service.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class TestController {

    @GetMapping("/home")
    public ResponseEntity<String> getHomePage(){
        return ResponseEntity.ok("Home Page") ;
    }
}
