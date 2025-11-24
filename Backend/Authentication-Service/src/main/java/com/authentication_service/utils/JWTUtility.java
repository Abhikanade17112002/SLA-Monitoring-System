package com.authentication_service.utils;

import com.authentication_service.entities.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JWTUtility {

    private static final String jwtSecretKey =
            "ddgdbydjsmsjjsmhdgdndjsksjbdddjdabkcbascb12391238129wdhisbdaskdbasskddkZXZXaxzcxczxczxczxczxczasdasdasdasdadasdZXZxZxadsasdasdasdQWQW";

    private SecretKey generateSecretKey() {
        return Keys.hmacShaKeyFor(jwtSecretKey.getBytes(StandardCharsets.UTF_8));
    }

    // Create JWT token
    public String createToken(User user) {
        return Jwts.builder()
                .subject(user.getUserId())
                .claim("email", user.getEmailId())
                .claim("roles",
                        user.getUserRoles()
                                .stream()
                                .map(r -> r.getRoleType())
                                .toList()
                )
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 15)) // 15 min
                .signWith(generateSecretKey())
                .compact();
    }

    // Extract UserId from token
    public String extractUserId(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(generateSecretKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return claims.getSubject(); // userId as String
    }
}
