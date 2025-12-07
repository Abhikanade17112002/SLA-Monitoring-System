package com.monitor_service.configuration;
import feign.RequestInterceptor;
import feign.RequestTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class FeingAuthInterceptor {

    @Bean
    public RequestInterceptor authForwardingInterceptor() {
        return (RequestTemplate template) -> {
            var auth = SecurityContextHolder.getContext().getAuthentication();
            System.out.println("Authentication ==> " + auth);
            if (auth != null && auth.getCredentials() != null) {
                // Forward the same JWT to metrics service
                String token = auth.getCredentials().toString();
                template.header("Authorization", "Bearer " + token);
            }
        };
    }
}