package com.monitor_service.configuration;


import com.monitor_service.filters.SecurityAuthFilter;
import com.monitor_service.utility.JWTUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration {

    @Autowired
    private JWTUtility jwtUtility ;

    @Autowired
    private SecurityAuthFilter authFilter ;


    @Bean
    AuthenticationManager getAuthenticationManagerBean(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager() ;
    }


    @Bean
    SecurityFilterChain   getSecurityFilterChain(HttpSecurity httpSecurity) throws Exception {

        httpSecurity
                .csrf( (csrfConfig) -> csrfConfig.disable())
                .authorizeHttpRequests(
                        ( http ) -> http
                                .requestMatchers("/monitor/**","/actuator/**")
                                .permitAll()
                                .anyRequest()
                                .authenticated()
                )
                .sessionManagement( (sessionConfig)->
                        sessionConfig
                                .sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        ))
                .formLogin( ( formLoginConfig ) -> formLoginConfig.disable())
                .addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class);


        return httpSecurity.build() ;

    }
}
