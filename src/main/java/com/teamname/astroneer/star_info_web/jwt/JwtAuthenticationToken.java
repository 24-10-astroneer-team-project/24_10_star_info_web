package com.teamname.astroneer.star_info_web.jwt;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.Collections;

public class JwtAuthenticationToken extends AbstractAuthenticationToken {

    private final String email; // JWT에서 추출한 사용자 이메일

    public JwtAuthenticationToken(String email) {
        super(Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"))); // 기본 권한 설정
        this.email = email;
        setAuthenticated(true); // 인증된 상태로 설정
    }

    public JwtAuthenticationToken(String email, Collection<? extends GrantedAuthority> authorities) {
        super(authorities != null ? authorities : Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"))); // 기본 권한 설정
        this.email = email;
        setAuthenticated(true);
    }

    @Override
    public Object getCredentials() {
        return null; // JWT 기반 인증이므로 credentials는 필요 없음
    }

    @Override
    public Object getPrincipal() {
        return email; // 이메일을 Principal로 사용
    }

    public String getEmail() {
        return this.email; // 이메일 반환 메서드 추가
    }
}