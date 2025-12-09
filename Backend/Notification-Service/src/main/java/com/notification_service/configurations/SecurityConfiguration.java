package com.notification_service.configurations;



import com.notification_service.filters.JWTAuthFilter;
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
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableMethodSecurity
public class SecurityConfiguration {

    @Autowired
    private JWTAuthFilter jwtAuthFilter ;

    @Bean
    AuthenticationManager getAuthenticationManagerBean(AuthenticationConfiguration authenticationConfiguration) throws Exception {

        return authenticationConfiguration.getAuthenticationManager() ;

    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:5173")
                        .allowedMethods("GET", "POST", "PUT", "DELETE")
                        .allowCredentials(true);
            }
        };
    }
    @Bean
    public SecurityFilterChain getSecurityFilterChainBean(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .csrf( (csrfConfig)-> csrfConfig.disable())
                .authorizeHttpRequests(
                        (  http) -> http
                                .requestMatchers("/actuator/**","/notifications/**")
                                        .permitAll()
                                        .anyRequest()
                                        .authenticated()
                )
                .sessionManagement((sessionConfig)->sessionConfig.sessionCreationPolicy(
                        SessionCreationPolicy.STATELESS
                ))
                .formLogin((formLogInConfig)->formLogInConfig.disable())
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
        ;

        return httpSecurity.build() ;
    }
}
