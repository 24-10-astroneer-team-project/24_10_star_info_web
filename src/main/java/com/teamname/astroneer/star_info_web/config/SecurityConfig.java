package com.teamname.astroneer.star_info_web.config;

import com.teamname.astroneer.star_info_web.config.redis.service.RedisRefreshTokenService;
import com.teamname.astroneer.star_info_web.jwt.JwtUtil;
import com.teamname.astroneer.star_info_web.repository.MemberRepository;
import com.teamname.astroneer.star_info_web.security.*;
import com.teamname.astroneer.star_info_web.security.jwt.JwtAuthenticationFilter;
import jakarta.servlet.DispatcherType;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
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
import org.springframework.security.web.authentication.logout.LogoutFilter;

@Configuration
@EnableWebSecurity(debug = true)  // 개발 단계이므로 디버깅 모드 활성화
public class SecurityConfig {

    @Value("${spring.application.base-url}")
    private String baseUrl;

    private final CustomOAuth2SuccessHandler oAuth2AuthenticationSuccessHandler;
    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final JwtUtil jwtUtil;
    private final RedisRefreshTokenService redisRefreshTokenService; // Redis 서비스 추가
    private final OAuth2AuthorizedClientRepository authorizedClientRepository; // OAuth2 클라이언트 리포지토리 추가
    private final MemberRepository memberRepository;

    // 생성자 주입을 통한 의존성 주입
    @Autowired
    public SecurityConfig(CustomOAuth2SuccessHandler oAuth2AuthenticationSuccessHandler,
                          CustomAuthenticationEntryPoint customAuthenticationEntryPoint,
                          @Lazy CustomOAuth2UserService customOAuth2UserService,
                          JwtUtil jwtUtil,
                          @Lazy RedisRefreshTokenService redisRefreshTokenService,
                          @Lazy OAuth2AuthorizedClientRepository authorizedClientRepository, MemberRepository memberRepository) {
        this.oAuth2AuthenticationSuccessHandler = oAuth2AuthenticationSuccessHandler;
        this.customAuthenticationEntryPoint = customAuthenticationEntryPoint;
        this.customOAuth2UserService = customOAuth2UserService;
        this.jwtUtil = jwtUtil;
        this.redisRefreshTokenService = redisRefreshTokenService;
        this.authorizedClientRepository = authorizedClientRepository;
        this.memberRepository = memberRepository;
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, CustomOAuth2FailureHandler customOAuth2FailureHandler) throws Exception {
        http
                .headers(headers -> headers
                        .contentTypeOptions(HeadersConfigurer.ContentTypeOptionsConfig::disable)
                )
                .cors(Customizer.withDefaults())  // CORS 설정
//                .cors(AbstractHttpConfigurer::disable)  // CORS 비활성화
                .csrf(AbstractHttpConfigurer::disable)  // CSRF 비활성화
                .authorizeHttpRequests(authorizeRequests ->
                        authorizeRequests
                                .dispatcherTypeMatchers(DispatcherType.FORWARD).permitAll()  // FORWARD 요청은 인증 없이 허용
                                .requestMatchers("/actuator/health").permitAll() // 서버 검증 확인.
                                .requestMatchers("/", "/react/**", "/static/**", "/react/login", "/react/main").permitAll()  // React 경로 추가
                                .requestMatchers("/login").anonymous() // 로그인되지 않은 사용자만 접근 가능
                                .requestMatchers("/locations", "/locations/**", "/api/auth/refresh").permitAll()
                                .requestMatchers("/constellations", "/constellations/**").permitAll() // 별자리 경로
                                .requestMatchers("/planet/**", "/planet/visibility", "/planet/opposition").permitAll() // 행성 경로
                                .requestMatchers("/meteorShower", "/meteorShower/general", "/meteorShower/**").permitAll() // 유성우 경로
                                .requestMatchers("/public/calendar/**").permitAll() // 공용 캘린더 경로
                                .requestMatchers("/static/**", "/media/**", "/js/**", "/css/**", "/img/**", "/fontawesome-free-6.5.1-web/**", "/particle.png").permitAll()
                                .requestMatchers("/api/**", "/auth/**", "/oauth2/**").authenticated() // API 경로는 명확히 구분
                                .requestMatchers("/api/location/save").authenticated()
                                .anyRequest().authenticated()
                )
                .exceptionHandling(exceptionHandling ->
                        exceptionHandling.authenticationEntryPoint(customAuthenticationEntryPoint)
                )
                .oauth2Login(oauth2 -> oauth2
                        .loginPage(baseUrl + "/react/login")
                        .successHandler(oAuth2AuthenticationSuccessHandler)
                        .failureHandler(customOAuth2FailureHandler)
                        .userInfoEndpoint(userInfoEndpoint -> userInfoEndpoint.userService(customOAuth2UserService))
                )
                // 특정 경로에만 JwtAuthenticationFilter 추가
                .addFilterBefore(
                        new JwtAuthenticationFilter(authenticationManager(http.getSharedObject(AuthenticationConfiguration.class)), jwtUtil, memberRepository) {
                            @Override
                            protected boolean shouldNotFilter(@NotNull HttpServletRequest request) {
                                // 필터링을 제외할 경로 정의
                                String path = request.getRequestURI();
                                return path.startsWith("/react/")
                                        || path.startsWith("/constellations/")
                                        || path.startsWith("/planet/")
                                        || path.startsWith("/meteorShower/")
                                        || path.startsWith("/public/calendar/");
                            }
                        },
                        LogoutFilter.class
                )
                .sessionManagement(sessionManagement ->
                        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS) // JWT 인증 시 무상태 설정
                )
                .logout(logout -> logout
                        .logoutUrl("/api/member/logout")
                        .logoutSuccessHandler((request, response, authentication) -> {
                            response.setStatus(HttpServletResponse.SC_OK); // 성공 상태 반환
                            response.getWriter().write("Logout successful");
                        })
                        .addLogoutHandler(customLogoutHandler(authorizedClientRepository, redisRefreshTokenService)) // 제대로 된 핸들러 등록
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID")
                );
        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring()
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations())  // Spring이 제공하는 공통 정적 리소스 경로
                .requestMatchers("/static/**", "/js/**", "/css/**", "/img/**", "/index.html", "/react/**");        // 추가적으로 정의한 정적 리소스 경로
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public OAuth2AuthorizedClientRepository authorizedClientRepository() {
        return new HttpSessionOAuth2AuthorizedClientRepository();
    }

    @Bean
    public CustomLogoutHandler customLogoutHandler(@Lazy OAuth2AuthorizedClientRepository authorizedClientRepository,
                                             @Lazy RedisRefreshTokenService redisRefreshTokenService) {
        return new CustomLogoutHandler(authorizedClientRepository, redisRefreshTokenService);
    }
}