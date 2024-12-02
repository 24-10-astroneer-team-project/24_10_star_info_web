package com.teamname.astroneer.star_info_web.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.teamname.astroneer.star_info_web.entity.Member;
import com.teamname.astroneer.star_info_web.jwt.JwtUtil;
import com.teamname.astroneer.star_info_web.repository.MemberRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
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

    private final JwtUtil jwtUtil;
    private final MemberRepository memberRepository;

    // JwtUtil을 주입받는 생성자 추가
    public CustomOAuth2SuccessHandler(JwtUtil jwtUtil, MemberRepository memberRepository) {
        this.jwtUtil = jwtUtil;
        this.memberRepository = memberRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();
        String email = oauthUser.getAttribute("email");
        String googleLoginId = oauthUser.getAttribute("sub"); // Google의 "sub"을 고유 식별자로 사용

        Optional<Member> member = memberRepository.findByGoogleLoginId(googleLoginId);

        if (email != null && googleLoginId != null) {
            Member user = member.get();
            String accessToken = jwtUtil.generateToken(googleLoginId, email);
            String refreshToken = jwtUtil.generateRefreshToken(googleLoginId, email);

            log.info("Generated Access Token: {}", accessToken);
            log.info("Generated Refresh Token: {}", refreshToken);

            // URL 인코딩 후 리디렉션
            response.sendRedirect("/react/dashboard?accessToken=" + URLEncoder.encode(accessToken, StandardCharsets.UTF_8.name())
                    + "&refreshToken=" + URLEncoder.encode(refreshToken, StandardCharsets.UTF_8.name())+ "&userId=" + user.getId());
        } else {
            log.error("OAuth2 User 정보 부족: email={}, googleLoginId={}", email, googleLoginId);
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Email or Google Login ID not found");
        }
    }

}
