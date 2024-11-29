package com.teamname.astroneer.star_info_web.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.teamname.astroneer.star_info_web.jwt.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Map;

@Slf4j
@Component
public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtUtil jwtUtil;

    // JwtUtil을 주입받는 생성자 추가
    public CustomOAuth2SuccessHandler(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();
        String email = oauthUser.getAttribute("email");

        if (email != null) {
            String accessToken = jwtUtil.generateToken(email);
            String refreshToken = jwtUtil.generateRefreshToken(email);

            log.info("Generated Access Token: {}", accessToken);
            log.info("Generated Refresh Token: {}", refreshToken);

            // React 메인 페이지로 리디렉션 (쿼리 파라미터에 토큰 추가)
            response.sendRedirect("/react/dashboard?accessToken=" + accessToken + "&refreshToken=" + refreshToken);
        } else {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Email not found");
        }
    }
}
