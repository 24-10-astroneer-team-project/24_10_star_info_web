package com.teamname.astroneer.star_info_web.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizedClientRepository;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Component;

@Component
public class CustomLogoutHandler implements LogoutHandler {

    private final OAuth2AuthorizedClientRepository authorizedClientRepository;

    // 생성자를 통해 주입
    @Autowired
    public CustomLogoutHandler(OAuth2AuthorizedClientRepository authorizedClientRepository) {
        this.authorizedClientRepository = authorizedClientRepository;
    }

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        // 로그아웃 시도 로그 출력
        System.err.println("로그아웃 핸들러 호출됨");

        // Google OAuth2 클라이언트 삭제
        authorizedClientRepository.removeAuthorizedClient("google", authentication, request, response);
        System.err.println("Google 클라이언트 삭제 완료");

        // 로그아웃 완료 메시지
        System.err.println("로그아웃 처리 완료");
    }
}