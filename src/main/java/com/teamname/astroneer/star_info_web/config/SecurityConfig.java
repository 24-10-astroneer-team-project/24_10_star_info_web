package com.teamname.astroneer.star_info_web.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(withDefaults())  // CORS 설정 추가
                .csrf(AbstractHttpConfigurer::disable)  // CSRF 비활성화
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/", "/test/hello", "/usr/home/**", "/usr/home/main").permitAll()  // 홈 페이지 및 특정 리소스 접근 허용
                        .requestMatchers("/js/**", "/css/**", "/img/**", "/fontawesome-free-6.5.1-web/**").permitAll()  // 정적 리소스 허용
                        .anyRequest().authenticated()  // 그 외의 요청은 인증 필요
                );

        return http.build();
    }
}