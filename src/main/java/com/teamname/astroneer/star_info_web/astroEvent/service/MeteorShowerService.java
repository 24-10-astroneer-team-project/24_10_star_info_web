package com.teamname.astroneer.star_info_web.astroEvent.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
@Slf4j
public class MeteorShowerService {
    private final RestTemplate restTemplate;

    @Cacheable(value = "meteorShowerVisibility", key = "#cometName + '-' + #startDate")
    public String getMeteorShowerData(String cometName, String startDate) {
        // 외부 API 호출을 위한 URL 생성
        String url = String.format(
                "http://64.110.98.105:5555/api/meteor_shower?comet=%s&start_date=%s",
                cometName, startDate
        );

        log.debug("Request URL: {}", url);  // 요청 URL 로그 출력

        try {
            // RestTemplate을 사용해서 GET 요청
            String response = restTemplate.getForObject(url, String.class);
            log.info("Response received: {}", response);  // 응답 로그 출력
            return response;
        } catch (Exception e) {
            log.error("Error occurred while making API request", e);  // 에러 로그 출력
            return "Error occurred while fetching constellation data";
        }
    }

//    @Cacheable(value = "meteorShowerVisibility", key = "#meteorShowerName + '-' + #year + '-' + #latitude + '-' + #longitude")
    @Retryable(value = {RestClientException.class}, maxAttempts = 3, backoff = @Backoff(delay = 1000))
    public String getMeteorShowerVisibilityData(String meteorShowerName, String year, double latitude, double longitude) {
        // URL을 직접 문자열로 조합 (인코딩 없음)
        String url = String.format("http://64.110.98.105:5555/api/meteor_shower_visibility?name=%s&year=%s&latitude=%f&longitude=%f",
                meteorShowerName, year, latitude, longitude);

        log.info("Request URL: {}", url);  // 요청 URL 로그 출력
        System.err.println("Request URL: " + url);

        try {
            // RestTemplate을 사용해서 GET 요청
            String response = restTemplate.getForObject(url, String.class);
            log.info("Response received: {}", response);  // 응답 로그 출력
            return response;
        } catch (Exception e) {
            log.error("Error occurred while making API request", e);  // 에러 로그 출력
            return "Error occurred while fetching constellation data";
        }
    }
}

