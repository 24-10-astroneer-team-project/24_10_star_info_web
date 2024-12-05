package com.teamname.astroneer.star_info_web.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.teamname.astroneer.star_info_web.entity.Member;
import com.teamname.astroneer.star_info_web.jwt.JwtUtil;
import com.teamname.astroneer.star_info_web.repository.MemberRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Component
public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        CustomOAuth2User customOAuth2User = (CustomOAuth2User) authentication.getPrincipal();

        log.info("JWT 인증 성공: {}, UserId: {}, isNewUser: {}", customOAuth2User.getEmail(), customOAuth2User.getUserId(), customOAuth2User.isNewUser());

        // 리디렉션 URL 생성
        String redirectUrl = String.format("/react/dashboard?accessToken=%s&refreshToken=%s&userId=%s&isNewUser=%s",
                URLEncoder.encode(customOAuth2User.getAccessToken(), StandardCharsets.UTF_8),
                URLEncoder.encode(customOAuth2User.getRefreshToken(), StandardCharsets.UTF_8),
                customOAuth2User.getUserId(),
                customOAuth2User.isNewUser());

        response.sendRedirect(redirectUrl);
    }
}
