package com.monitor_service.configuration;


import feign.Logger;
import feign.Request;
import org.springframework.context.annotation.Bean;
public class FeingConfig {
    @Bean
    public Logger.Level feignLoggerLevel() {
        return Logger.Level.FULL; // Logs request + response + headers
    }
    @Bean
    public Request.Options options() {
        return new Request.Options(
                3000,   // connection timeout (ms)
                5000    // read timeout (ms)
        );
    }
}
