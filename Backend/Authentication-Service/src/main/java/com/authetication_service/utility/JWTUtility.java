package com.authetication_service.utility;

import com.authetication_service.entities.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;
@Component
public class JWTUtility {

    @Value("${jwt.token.key}")
    private String SECRET;

    @Value("${jwt.token.expiration}")
    private long EXPIRATION;

    private Key key;

    @PostConstruct
    public void init() {
        this.key = Keys.hmacShaKeyFor(SECRET.getBytes());
    }

    // Extract Username (userId)
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // Extract UserId (same as subject)
    public String extractUserId(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // Extract Email from token
    public String extractEmailId(String token) {
        return extractClaim(token, claims -> claims.get("emailId", String.class));
    }

    // Extract Expiration
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // Generic Claim Extractor
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Generate Token
    public String generateToken(User user) {
        return Jwts.builder()
                .setSubject(user.getUserId())                         // userId stored here
                .claim("emailId", user.getEmailId())                 // storing email
                .claim("role", user.getRole().getUserRole().getUserRole())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public boolean validateToken(String token, String username) {
        return extractUserId(token).equals(username) && !isTokenExpired(token);
    }

    public Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
