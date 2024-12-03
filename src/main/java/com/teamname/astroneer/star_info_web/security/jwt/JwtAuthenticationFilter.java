package com.teamname.astroneer.star_info_web.security.jwt;

import com.teamname.astroneer.star_info_web.entity.Member;
import com.teamname.astroneer.star_info_web.jwt.JwtAuthenticationToken;
import com.teamname.astroneer.star_info_web.jwt.JwtUtil;
import com.teamname.astroneer.star_info_web.repository.MemberRepository;
import com.teamname.astroneer.star_info_web.security.CustomOAuth2User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import java.io.IOException;
import java.util.Optional;

@Slf4j
public class JwtAuthenticationFilter extends BasicAuthenticationFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    private final JwtUtil jwtUtil;
    private final MemberRepository memberRepository;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtUtil jwtUtil, MemberRepository memberRepository) {
        super(authenticationManager);
        this.jwtUtil = jwtUtil;
        this.memberRepository = memberRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        String header = request.getHeader("Authorization");

        log.debug("Processing request URL: {}", request.getRequestURI());

        if (header == null || !header.startsWith("Bearer ")) {
            log.debug("Authorization 헤더가 없거나 형식이 잘못되었습니다. URL: {}", request.getRequestURI());
            chain.doFilter(request, response);
            return;
        }

        String token = header.substring(7);
        try {
            Claims claims = jwtUtil.validateToken(token);
            // 유효한 Access Token이므로 사용자 인증 처리
            authenticateUser(request, claims);

        } catch (ExpiredJwtException e) {
            log.error("JWT 만료됨. URL: {}, Message: {}", request.getRequestURI(), e.getMessage());
            String refreshToken = request.getHeader("Refresh-Token");

            if (refreshToken != null) {
                // Refresh Token이 있는 경우, Access Token 갱신 처리
                handleRefreshToken(refreshToken, response);
                return; // 새로운 Access Token이 발급되면 필터 체인 중단
            } else {
                // Refresh Token이 없으면 인증 실패
                log.warn("Access Token 만료 및 Refresh Token 누락. URL: {}", request.getRequestURI());
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "JWT expired and no refresh token provided");
                return;
            }
        } catch (JwtException e) {
            log.error("JWT 검증 실패. URL: {}, Message: {}", request.getRequestURI(), e.getMessage());
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid JWT");
            return;
        }

        // 인증이 완료되었으므로 요청 필터 체인을 계속 진행
        chain.doFilter(request, response);
    }

    private void authenticateUser(HttpServletRequest request, Claims claims) {
        String email = claims.getSubject();
        String googleLoginId = claims.get("googleLoginId", String.class);

        if (email != null && googleLoginId != null) {
            Optional<Member> member = memberRepository.findByGoogleLoginId(googleLoginId);
            if (member.isPresent()) {
                Member user = member.get();

                CustomOAuth2User customOAuth2User = new CustomOAuth2User(user, null, null, null);

                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                        customOAuth2User, null, customOAuth2User.getAuthorities()
                );

                SecurityContextHolder.getContext().setAuthentication(authenticationToken);

                log.info("JWT 인증 성공: {} (GoogleLoginId: {}, UserId: {}, URL: {})",
                        email, googleLoginId, user.getId(), request.getRequestURI());
            } else {
                throw new JwtException("User not found");
            }
        } else {
            throw new JwtException("Invalid JWT payload");
        }
    }

    private void handleRefreshToken(String refreshToken, HttpServletResponse response) throws IOException {
        try {
            Claims refreshClaims = jwtUtil.validateToken(refreshToken);
            String email = refreshClaims.getSubject();
            String googleLoginId = refreshClaims.get("googleLoginId", String.class);

            Optional<Member> memberOptional = memberRepository.findByGoogleLoginId(googleLoginId);

            if (memberOptional.isEmpty()) {
                log.warn("리프레시 토큰 검증 실패. 사용자가 존재하지 않습니다.");
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid Refresh Token");
                return;
            }

            Member user = memberOptional.get();

            // 새로운 Access Token 생성
            String newAccessToken = jwtUtil.generateToken(googleLoginId, email);

            // 응답 헤더에 Access Token과 userId 추가
            response.setHeader("Authorization", "Bearer " + newAccessToken);
            response.setHeader("userId", String.valueOf(user.getId()));

            log.info("리프레시 토큰을 사용해 새 Access Token 생성: {} (UserId: {})", newAccessToken, user.getId());
        } catch (ExpiredJwtException e) {
            log.error("리프레시 토큰 만료됨: {}", e.getMessage());
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Refresh Token expired");
        } catch (JwtException e) {
            log.error("리프레시 토큰 검증 실패: {}", e.getMessage());
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid Refresh Token");
        }
    }

}
