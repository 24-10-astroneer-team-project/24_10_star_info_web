package com.teamname.astroneer.star_info_web.service;

import io.github.cdimascio.dotenv.Dotenv;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Service
public class AstronomyApiService {

    private static final Logger logger = LoggerFactory.getLogger(AstronomyApiService.class);

    private final String apiKey;
    private final String apiSecret;
    private final String baseUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public AstronomyApiService() {
        // Dotenv로 환경 변수 불러오기
        Dotenv dotenv = Dotenv.load();
        this.apiKey = dotenv.get("ASTRONOMY_API_ID");
        this.apiSecret = dotenv.get("ASTRONOMY_API_SECRET_KEY");
        this.baseUrl = dotenv.get("ASTRONOMY_API_BASE_URL");

        // 환경 변수가 제대로 로드되었는지 확인
        if (apiKey == null || apiSecret == null || baseUrl == null) {
            throw new IllegalStateException("API Key, Secret 또는 Base URL이 설정되지 않았습니다.");
        }

        logger.info("API Key: {}", apiKey);
        logger.info("API Secret: {}", apiSecret);
        logger.info("API Base URL: {}", baseUrl);
    }

    // 특정 위치에서 특정 시간에 대한 천문 이벤트 정보를 가져오는 메서드
    public String getAstronomicalData(double latitude, double longitude, String date) {
        String url = baseUrl + "/astronomy?lat=" + latitude + "&long=" + longitude + "&date=" + date;

        // API Key와 Secret을 Base64로 인코딩
        String credentials = apiKey + ":" + apiSecret;  // Application ID:Secret 형태로 연결
        String encodedCredentials = Base64.getEncoder().encodeToString(credentials.getBytes(StandardCharsets.UTF_8));  // Base64로 인코딩
        logger.info("인코딩 credentials: {}", encodedCredentials);
        // 인코딩된 credentials 로그로 출력
        logger.info("Authorization 헤더 값: Basic " + encodedCredentials);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Basic " + encodedCredentials);  // Authorization 헤더 추가

        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                return response.getBody();
            } else {
                logger.error("API 호출 실패: 상태 코드 {} 메시지: {}", response.getStatusCode(), response.getBody());
                throw new RuntimeException("천문 데이터를 불러오지 못했습니다.");
            }
        } catch (Exception e) {
            logger.error("API 호출 중 오류 발생: {}", e.getMessage());
            throw new RuntimeException("천문 데이터를 불러오지 못했습니다.");
        }
    }
}