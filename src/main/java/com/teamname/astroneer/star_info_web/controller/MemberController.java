package com.teamname.astroneer.star_info_web.controller;

import com.teamname.astroneer.star_info_web.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("/api/member")
public class MemberController {

    @Autowired
    private MemberService memberService;

    @Autowired
    private AuthenticationManager authenticationManager;

    // OAuth2 로그인 후 사용자 정보 확인 API
    @GetMapping("/me")
    public OAuth2User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated() && !(authentication instanceof AnonymousAuthenticationToken)) {
            if (authentication instanceof OAuth2AuthenticationToken) {
                OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
                return oAuth2User;  // 사용자 정보 반환
            }
        }
        return null;  // 인증되지 않은 경우
    }

    // 로그아웃 처리 API
    @PostMapping("/logout")
    public String logout(HttpServletRequest request) {
        // 세션 무효화 처리
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        // SecurityContext도 초기화 (선택사항)
        SecurityContextHolder.clearContext();

        return "로그아웃 성공";
    }
}
