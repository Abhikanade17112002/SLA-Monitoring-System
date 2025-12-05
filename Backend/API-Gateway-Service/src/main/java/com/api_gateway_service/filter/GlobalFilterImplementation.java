package com.api_gateway_service.filter;

import com.api_gateway_service.utilty.JWTUtility;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Component
public class GlobalFilterImplementation implements GlobalFilter, Ordered {

    @Autowired
    private JWTUtility jwtUtil ;
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {

        ServerHttpRequest request = exchange.getRequest() ;
        String path = request.getURI().getPath() ;
        System.out.println("Path ==> " + path);

        // 1. Allow unprotected paths (login, register)
        if (path.contains("/auth/")) {
            return chain.filter(exchange);
        }


        // 2. Extract authorization header
        String authHeader = request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return writeErrorResponse(exchange, HttpStatus.UNAUTHORIZED, "Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7);

        // 2. Invalid token
        try {
            if (!jwtUtil.validateToken(token)) {
                return writeErrorResponse(exchange, HttpStatus.UNAUTHORIZED, "Invalid or expired token");
            }
        } catch (Exception ex) {
            return writeErrorResponse(exchange, HttpStatus.UNAUTHORIZED, ex.getMessage());
        }

        // 4. Extract claims
        String userId = jwtUtil.extractUserId(token);
        String role = jwtUtil.extractRoles(token);


        System.out.println("Roles ==> " +role);

        // 5. Add identity headers for downstream services
        ServerHttpRequest modifiedReq = request.mutate()
                .header("X-User-Id", userId)
                .header("X-Roles", role)
                .build();

        return chain.filter(exchange.mutate().request(modifiedReq).build());

    }


    // JSON Response writer
    private Mono<Void> writeErrorResponse(ServerWebExchange exchange, HttpStatus status, String message) {
        exchange.getResponse().setStatusCode(status);
        exchange.getResponse().getHeaders().add("Content-Type", "application/json");

        Map<String, Object> errorBody = new HashMap<>();
        errorBody.put("timestamp", LocalDateTime.now().toString());
        errorBody.put("status", status.value());
        errorBody.put("error", status.getReasonPhrase());
        errorBody.put("message", message);

        byte[] bytes;
        try {
            bytes = new ObjectMapper().writeValueAsBytes(errorBody);
        } catch (Exception e) {
            bytes = new byte[0];
        }

        DataBuffer buffer = exchange.getResponse().bufferFactory().wrap(bytes);

        return exchange.getResponse().writeWith(Mono.just(buffer));
    }




    //SETS THIS FILTER AS HIGHEST PRIORITY
    @Override
    public int getOrder() {
        return -1;
    }
}
