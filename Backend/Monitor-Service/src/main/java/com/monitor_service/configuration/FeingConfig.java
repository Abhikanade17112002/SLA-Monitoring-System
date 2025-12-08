package com.monitor_service.configuration;


import feign.Logger;
import feign.Request;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;

@Configuration
public class FeingConfig {
    @Bean
    public Logger.Level feignLoggerLevel() {
        return Logger.Level.FULL; // Logs request + response + headers
    }

    @Bean
    public Request.Options options() {
        return new Request.Options(
                10, TimeUnit.SECONDS,  // connectTimeout
                60, TimeUnit.SECONDS,  // readTimeout
                true                   // followRedirects
        );
    }
}
