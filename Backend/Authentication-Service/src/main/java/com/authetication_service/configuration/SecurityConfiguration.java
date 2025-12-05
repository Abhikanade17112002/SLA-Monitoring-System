package com.authetication_service.configuration;

import com.authetication_service.filters.AuthFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfiguration {

    @Autowired
    private AuthFilter authFilter ;


    // Returns The BCrypt Password Encoder
    @Bean
    PasswordEncoder getBCryptPasswordEncoder(){
        return new BCryptPasswordEncoder() ;
    }


    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {

        httpSecurity
                .authorizeHttpRequests(
                        auth-> auth
                                .requestMatchers("/auth/**","/actuator/")
                                .permitAll()
                                .anyRequest()
                                .authenticated()
                )
                .csrf((csrfConfig)->csrfConfig.disable())
                .formLogin((formLoginConfig)-> formLoginConfig.disable())
                .sessionManagement((sessionManagementConfig)->sessionManagementConfig
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class)
                 ;


        return httpSecurity.build();
    }


}
