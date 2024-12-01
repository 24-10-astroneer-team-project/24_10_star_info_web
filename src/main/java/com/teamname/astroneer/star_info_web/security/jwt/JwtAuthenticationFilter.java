package com.teamname.astroneer.star_info_web.security.jwt;

import com.teamname.astroneer.star_info_web.entity.Member;
import com.teamname.astroneer.star_info_web.jwt.JwtAuthenticationToken;
import com.teamname.astroneer.star_info_web.jwt.JwtUtil;
import com.teamname.astroneer.star_info_web.repository.MemberRepository;
import io.jsonwebtoken.Claims;
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
import java.util.Optional;

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

        logger.debug("Processing request URL: {}", request.getRequestURI()); // 요청 URL 확인용 로그 추가

        if (header == null || !header.startsWith("Bearer ")) {
            logger.debug("Authorization 헤더가 없거나 형식이 잘못되었습니다. URL: {}", request.getRequestURI());
            chain.doFilter(request, response);
            return;
        }

        String token = header.substring(7);
        try {
            Claims claims = jwtUtil.validateToken(token); // 전체 Claims 객체 가져오기
            String email = claims.getSubject(); // email은 subject로 저장됨
            String googleLoginId = claims.get("googleLoginId", String.class); // googleLoginId는 Claim으로 저장됨

            if (email != null && googleLoginId != null) {
                // googleLoginId로 DB에서 사용자 조회
                Optional<Member> member = memberRepository.findByGoogleLoginId(googleLoginId);
                if (member.isPresent()) {
                    Member user = member.get();

                    // 인증 객체에 email과 userId 포함
                    JwtAuthenticationToken authenticationToken = new JwtAuthenticationToken(
                            user.getEmail(), googleLoginId, user.getId() // userId를 포함
                    );

                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    logger.info("JWT 인증 성공: {} (GoogleLoginId: {}, UserId: {}, URL: {})",
                            email, googleLoginId, user.getId(), request.getRequestURI());
                } else {
                    logger.warn("DB 조회 실패: googleLoginId={}로 사용자를 찾을 수 없습니다. URL: {}", googleLoginId, request.getRequestURI());
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "User not found");
                    return;
                }
            } else {
                logger.warn("JWT 인증 실패: email 또는 googleLoginId가 null입니다. URL: {}", request.getRequestURI());
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
