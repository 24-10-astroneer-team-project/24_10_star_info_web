package com.teamname.astroneer.star_info_web.astroEvent.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@Slf4j
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class PlanetService {

    private final RestTemplate restTemplate;

    public String getPlanetData(String planetName, double longitude, double latitude, String startDate, String rangeDays) {
        // 외부 API 호출을 위한 URL 생성
        String url = String.format(
                "http://64.110.98.105:5555/api/planet_visibility?planet=%s&lat=%f&lon=%f&start_date=%s&range_days=%s",
                planetName,latitude, longitude, startDate, rangeDays
        );

        log.debug("Request URL: {}", url);  // 요청 URL 로그 출력

        try {
            // RestTemplate을 사용해서 GET 요청
            String response = restTemplate.getForObject(url, String.class);
            log.debug("Response received: {}", response);  // 응답 로그 출력
            return response;
        } catch (Exception e) {
            log.debug("Error occurred while making API request", e);  // 에러 로그 출력
            return String.format("Error: Failed to fetch data for planet %s with message: %s", planetName, e.getMessage());
        }
    }

    public String getOppositionData(String planetName, String year) {
        // 외부 API 호출을 위한 URL 생성
        String url = String.format(
                "http://64.110.98.105:5555/api/opposition?planet=%s&year=%s",
                planetName, year
        );

        log.debug("Request URL: {}", url);  // 요청 URL 로그 출력

        try {
            // RestTemplate을 사용해서 GET 요청
            String response = restTemplate.getForObject(url, String.class);
            log.debug("Response received: {}", response);  // 응답 로그 출력
            return response;
        } catch (Exception e) {
            log.debug("Error occurred while making API request", e);  // 에러 로그 출력
            return String.format("Error: Failed to fetch data for planet %s with message: %s", planetName, e.getMessage());
        }
    }
}
