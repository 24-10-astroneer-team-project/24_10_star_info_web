package com.teamname.astroneer.star_info_web.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/test/hello").permitAll()  // 인증 없이 접근 허용
                        .anyRequest().authenticated()  // 그 외의 요청은 인증 필요
                );

        return http.build();
    }
}