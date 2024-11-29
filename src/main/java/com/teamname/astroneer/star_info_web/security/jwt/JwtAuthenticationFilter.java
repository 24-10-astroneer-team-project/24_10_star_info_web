package com.teamname.astroneer.star_info_web.security.jwt;

import com.teamname.astroneer.star_info_web.jwt.JwtAuthenticationToken;
import com.teamname.astroneer.star_info_web.jwt.JwtUtil;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import java.io.IOException;

public class JwtAuthenticationFilter extends BasicAuthenticationFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    private final JwtUtil jwtUtil;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        super(authenticationManager);
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        String header = request.getHeader("Authorization");

        logger.debug("Processing request URL: {}", request.getRequestURI()); // 요청 URL 확인용 로그 추가

        if (header == null || !header.startsWith("Bearer ")) {
            logger.debug("Authorization 헤더가 없거나 형식이 잘못되었습니다. URL: {}", request.getRequestURI());
            chain.doFilter(request, response);
            return;
        }

        String token = header.substring(7);
        try {
            String email = jwtUtil.validateToken(token);
            if (email != null) {
                JwtAuthenticationToken authenticationToken = new JwtAuthenticationToken(email);
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                logger.info("JWT 인증 성공: {} (URL: {})", email, request.getRequestURI());
            } else {
                logger.warn("JWT 인증 실패: email이 null입니다. URL: {}", request.getRequestURI());
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid JWT payload");
                return;
            }
        } catch (ExpiredJwtException e) {
            logger.error("JWT 만료됨. URL: {}, Message: {}", request.getRequestURI(), e.getMessage());
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "JWT expired");
            return;
        } catch (JwtException e) {
            logger.error("JWT 검증 실패. URL: {}, Message: {}", request.getRequestURI(), e.getMessage());
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid JWT");
            return;
        }

        chain.doFilter(request, response);
    }
}