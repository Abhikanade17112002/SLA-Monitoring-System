package com.authetication_service.errorhandling;


import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpClientErrorException;

import java.nio.file.AccessDeniedException;
import java.security.SignatureException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // ---------- 401: Token Expired ----------
    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<Object> handleExpiredToken(ExpiredJwtException ex) {
        return buildResponse("Token expired", HttpStatus.UNAUTHORIZED);
    }

    // ---------- 401: Invalid / Malformed Token ----------
    @ExceptionHandler({MalformedJwtException.class, SignatureException.class, IllegalArgumentException.class})
    public ResponseEntity<Object> handleInvalidToken(Exception ex) {
        return buildResponse("Invalid token", HttpStatus.UNAUTHORIZED);
    }

    // ---------- 403: Access Denied (from @PreAuthorize) ----------
    @ExceptionHandler(org.springframework.security.access.AccessDeniedException.class)
    public ResponseEntity<Object> handleAccessDenied(org.springframework.security.access.AccessDeniedException ex) {
        return buildResponse("Access denied", HttpStatus.FORBIDDEN);
    }

    // ---------- 500: Internal Server Errors ----------
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleGeneralException(Exception ex) {
        ex.printStackTrace();  // useful for debugging
        return buildResponse("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private ResponseEntity<Object> buildResponse(String message, HttpStatus status) {
        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now().toString());
        body.put("status", status.value());
        body.put("error", status.getReasonPhrase());
        body.put("message", message);

        return new ResponseEntity<>(body, status);
    }
}
