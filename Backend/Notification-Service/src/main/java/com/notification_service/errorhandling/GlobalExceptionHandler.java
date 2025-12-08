package com.notification_service.errorhandling;
import com.notification_service.error.AlertConfigNotFoundException;
import feign.FeignException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private ResponseEntity<Object> build(HttpStatus status, String message) {
        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now().toString());
        body.put("status", status.value());
        body.put("error", status.getReasonPhrase());
        body.put("message", message);
        return new ResponseEntity<>(body, status);
    }

    // ----------------------------
    // Validation Errors
    // ----------------------------
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleValidation(MethodArgumentNotValidException ex) {
        String error = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .findFirst()
                .map(f -> f.getField() + " : " + f.getDefaultMessage())
                .orElse("Validation failed");

        return build(HttpStatus.BAD_REQUEST, error);
    }

    // ----------------------------
    // Alert Config Not Found
    // ----------------------------
    @ExceptionHandler(AlertConfigNotFoundException.class)
    public ResponseEntity<Object> handleAlertConfigNotFound(AlertConfigNotFoundException ex) {
        return build(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    // ----------------------------
    // FeignClient Errors (Metrics → Notification)
    // ----------------------------
    @ExceptionHandler(FeignException.class)
    public ResponseEntity<Object> handleFeignErrors(FeignException ex) {
        return build(HttpStatus.BAD_GATEWAY, "Failed to communicate with another service: " + ex.getMessage());
    }

    // ----------------------------
    // Email Sending Failures
    // ----------------------------
    @ExceptionHandler(MailException.class)
    public ResponseEntity<Object> handleMailErrors(MailException ex) {
        return build(HttpStatus.INTERNAL_SERVER_ERROR,
                "Failed to send email: " + ex.getMessage());
    }

    // ----------------------------
    // Bad Requests / Illegal Arguments
    // ----------------------------
    @ExceptionHandler({IllegalArgumentException.class, ResponseStatusException.class})
    public ResponseEntity<Object> handleIllegalArgs(Exception ex) {
        return build(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    // ----------------------------
    // Fallback Exception Handler
    // ----------------------------
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleUnknown(Exception ex) {
        ex.printStackTrace();
        return build(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error: " + ex.getMessage());
    }
}

