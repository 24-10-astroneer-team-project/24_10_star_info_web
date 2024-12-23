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

@Slf4j
@Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class ConstellationService {

    private final RestTemplate restTemplate;

    @Cacheable(value = "constellations", key = "#latitude + '-' + #longitude + '-' + #startDate + '-' + #endDate")
    @Retryable(value = {RestClientException.class}, maxAttempts = 3, backoff = @Backoff(delay = 1000))
    public String getConstellationData(double latitude, double longitude, String startDate, String endDate) {
        // 외부 API 호출을 위한 URL 생성
        String url = String.format(
                "http://64.110.98.105:5555/api/constellations/visibility?lat=%f&lon=%f&start_date=%s&end_date=%s",
                latitude, longitude, startDate, endDate
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
}
