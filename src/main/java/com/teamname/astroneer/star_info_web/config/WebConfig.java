package com.teamname.astroneer.star_info_web.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.EncodedResourceResolver;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/")
                .setCachePeriod(0)
                .resourceChain(true)
                .addResolver(new EncodedResourceResolver());
    }

    @Override
    public void addCorsMappings(final CorsRegistry registry) {
        registry.addMapping("/**") // 모든 경로에 CORS 적용
                .allowedOriginPatterns("http://localhost:7777", "http://localhost:9999", "http://localhost:4444", "https://www.astro.qyef.site")
                .allowedMethods("*")
                .allowedHeaders("*")
                .exposedHeaders(HttpHeaders.AUTHORIZATION, HttpHeaders.LOCATION) // 필요한 헤더 노출
                .allowCredentials(true)
                .maxAge(3600);
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/react/**")
                .setViewName("forward:/index.html");
    }
}