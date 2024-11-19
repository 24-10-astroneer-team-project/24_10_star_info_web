package com.teamname.astroneer.star_info_web.config;

import com.teamname.astroneer.star_info_web.security.*;
import jakarta.servlet.DispatcherType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.web.HttpSessionOAuth2AuthorizedClientRepository;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizedClientRepository;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity(debug = true)  // 개발 단계이므로 디버깅 모드 활성화
public class SecurityConfig {

    private final CustomOAuth2SuccessHandler oAuth2AuthenticationSuccessHandler;
    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
    private final CustomOAuth2UserService customOAuth2UserService;

    // 생성자 주입을 통한 의존성 주입
    @Autowired
    public SecurityConfig(CustomOAuth2SuccessHandler oAuth2AuthenticationSuccessHandler,
                          CustomAuthenticationEntryPoint customAuthenticationEntryPoint,
                          CustomOAuth2UserService customOAuth2UserService) {
        this.oAuth2AuthenticationSuccessHandler = oAuth2AuthenticationSuccessHandler;
        this.customAuthenticationEntryPoint = customAuthenticationEntryPoint;
        this.customOAuth2UserService = customOAuth2UserService;
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, CustomOAuth2FailureHandler customOAuth2FailureHandler) throws Exception {
        http
                .headers(headers -> headers
                        .contentTypeOptions(HeadersConfigurer.ContentTypeOptionsConfig::disable)
                )
                .cors(withDefaults())  // CORS 설정
                .csrf(AbstractHttpConfigurer::disable)  // CSRF 비활성화
                .authorizeHttpRequests(authorizeRequests ->
                        authorizeRequests
                                .dispatcherTypeMatchers(DispatcherType.FORWARD).permitAll()  // FORWARD 요청은 인증 없이 허용
                                .requestMatchers("/","/react/**", "/static/**", "/react/login", "/react/main").permitAll()  // React 경로 추가
                                .requestMatchers("/login").anonymous() // 로그인되지 않은 사용자만 접근 가능
                                .requestMatchers("/api/**", "/auth/**", "/oauth2/**").authenticated() // API 경로는 명확히 구분
                                .requestMatchers("/locations", "/locations/**").permitAll()
                                .requestMatchers("/constellations", "/constellations/**").permitAll() // 별자리 경로
                                .requestMatchers("/static/**","/media/**","/js/**", "/css/**", "/img/**", "/fontawesome-free-6.5.1-web/**", "/particle.png").permitAll()
                                .requestMatchers("/api/location/save").authenticated()
                                .anyRequest().authenticated()
                )
                .exceptionHandling(exceptionHandling ->
                        exceptionHandling.authenticationEntryPoint(customAuthenticationEntryPoint)
                )
                .oauth2Login(oauth2 -> oauth2
                        .loginPage("/react/login")
                        .successHandler(oAuth2AuthenticationSuccessHandler)
                        .failureHandler(customOAuth2FailureHandler)
                        .userInfoEndpoint(userInfoEndpoint -> userInfoEndpoint.userService(customOAuth2UserService))
                )
                .sessionManagement(sessionManagement ->
                        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                )
                .logout(logout ->
                        logout
                                .logoutUrl("/api/member/logout")
                                .logoutSuccessUrl("/login?logout")
                                .invalidateHttpSession(true)
                                .deleteCookies("JSESSIONID")
                );
        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring()
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations())  // Spring이 제공하는 공통 정적 리소스 경로
                .requestMatchers("/static/**", "/js/**", "/css/**", "/img/**");        // 추가적으로 정의한 정적 리소스 경로
    }



    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public OAuth2AuthorizedClientRepository authorizedClientRepository() {
        return new HttpSessionOAuth2AuthorizedClientRepository();
    }
}