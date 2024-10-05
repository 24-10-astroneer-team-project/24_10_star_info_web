package com.teamname.astroneer.star_info_web.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;

@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        // 경고 메시지와 함께 로그인 페이지로 리다이렉트
        response.sendRedirect("/usr/member/login?error=true&message=" + URLEncoder.encode("로그인 후 이용 가능합니다.", "UTF-8"));
    }
}