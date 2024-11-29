package com.teamname.astroneer.star_info_web.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${spring.jwt.secret}") // application-secret.yml의 JWT_SECRET 값 주입
    private String secret;

    @Value("${spring.jwt.expiration}") // application-secret.yml의 JWT 만료 시간
    private long expirationTime;

    @Value("${spring.jwt.refresh-expiration}")
    private long refreshExpirationTime;

    private Key key;

    @PostConstruct
    public void init() {
        this.key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret)); // JWT_SECRET 값을 Key로 변환
    }

    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String validateToken(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject(); // 토큰이 유효하면 이메일 반환
        } catch (ExpiredJwtException e) {
            throw new ExpiredJwtException(null, null, "JWT expired"); // 만료된 토큰
        } catch (MalformedJwtException | UnsupportedJwtException | IllegalArgumentException e) {
            throw new JwtException("Invalid JWT"); // 잘못된 토큰
        }
    }

    public String generateRefreshToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + refreshExpirationTime)) // Refresh Token 만료 시간
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }
}
