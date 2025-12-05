package com.api_gateway_service.utilty;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.function.Function;

@Component
public class JWTUtility {

    @Value("${jwt.token.key}")
    private String SECRET;

    @Value("${jwt.token.expiration}")
    private long EXPIRATION;

    private Key key;

    // ✅ Now Spring injects SECRET first, then this runs
    @PostConstruct
    public void init() {
        this.key = Keys.hmacShaKeyFor(SECRET.getBytes());
    }

    // 🔹 Generate JWT
    public String generateToken(String userId, String roles) {
        return Jwts.builder()
                .setSubject(userId)
                .claim("roles", roles)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // 🔹 Validate Token
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    // 🔹 Extract userId
    public String extractUserId(String token) {
        return extractAllClaims(token).getSubject();
    }

    // 🔹 Extract roles
    public String extractRoles(String token) {
        return extractAllClaims(token).get("role", String.class);
    }

    // 🔹 Extract all claims
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
