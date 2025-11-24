package com.authentication_service.configurations;

import org.apache.http.protocol.HTTP;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.Authentication;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {


    Authentication getSecurityConfiguration(HttpSecurity https ){
        https.
    }
}
