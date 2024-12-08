package com.teamname.astroneer.star_info_web.config.redis;

import jakarta.annotation.PreDestroy;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.SmartLifecycle;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig implements SmartLifecycle {

    private boolean isRunning = false;

    private LettuceConnectionFactory lettuceConnectionFactory;

    // YML 설정값 주입
    @Value("${spring.data.redis.host}")
    private String redisHost;

    @Value("${spring.data.redis.port}")
    private int redisPort;

    @Value("${spring.data.redis.password}")
    private String redisPassword;

    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        System.err.println("Initializing RedisConnectionFactory...");

        // 기존 동작을 보존하면서 설정값 반영
        RedisStandaloneConfiguration redisConfig = new RedisStandaloneConfiguration();
        redisConfig.setHostName(redisHost);
        redisConfig.setPort(redisPort);
        redisConfig.setPassword(redisPassword);

        lettuceConnectionFactory = new LettuceConnectionFactory(redisConfig);
        return lettuceConnectionFactory;
    }

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory connectionFactory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(connectionFactory);

        // Serializer 설정
        template.setKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(new GenericJackson2JsonRedisSerializer());
        return template;
    }

    @Override
    public void start() {
        isRunning = true;
        System.out.println("RedisConfig started.");
    }

    @Override
    public void stop() {
        isRunning = false;
        System.out.println("Stopping Redis connections...");
        if (lettuceConnectionFactory != null) {
            lettuceConnectionFactory.destroy();
        }
    }

    @Override
    public boolean isRunning() {
        return isRunning;
    }

    @Override
    public int getPhase() {
        return Integer.MAX_VALUE; // 다른 Bean들보다 나중에 실행
    }

    @PreDestroy
    public void closeRedisConnection() {
        if (lettuceConnectionFactory != null) {
            System.err.println("Closing RedisConnectionFactory...");
            lettuceConnectionFactory.destroy();
        }
    }
}