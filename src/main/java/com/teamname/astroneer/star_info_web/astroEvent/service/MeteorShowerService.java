package com.teamname.astroneer.star_info_web.astroEvent.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.teamname.astroneer.star_info_web.astroEvent.data.MeteorShowerData;
import com.teamname.astroneer.star_info_web.astroEvent.dto.meteorShower.CoordinatesDTO;
import com.teamname.astroneer.star_info_web.astroEvent.dto.meteorShower.MeteorShowerVisibilityDTO;
import com.teamname.astroneer.star_info_web.astroEvent.entity.AstronomicalEvent;
import com.teamname.astroneer.star_info_web.astroEvent.entity.MeteorShowerVisibility;
import com.teamname.astroneer.star_info_web.astroEvent.mapper.MeteorShowerVisibilityMapper;
import com.teamname.astroneer.star_info_web.astroEvent.repository.AstronomicalEventRepository;
import com.teamname.astroneer.star_info_web.astroEvent.repository.MeteorShowerVisibilityRepository;
import com.teamname.astroneer.star_info_web.astroEvent.util.Util;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
@Slf4j
public class MeteorShowerService {
    private final RestTemplate restTemplate;
    private final Util util;
    private final MeteorShowerVisibilityRepository meteorShowerVisibilityRepository;
    private final AstronomicalEventRepository astronomicalEventRepository;

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
            log.debug("Response received: {}", response);  // 응답 로그 출력
            return response;
        } catch (Exception e) {
            log.error("Error occurred while making API request", e);  // 에러 로그 출력
            return "Error occurred while fetching constellation data";
        }
    }

    @Cacheable(value = "meteorShowerVisibility", key = "#meteorShowerName + '-' + #year + '-' + #latitude + '-' + #longitude")
    @Retryable(value = {RestClientException.class}, maxAttempts = 3, backoff = @Backoff(delay = 1000))
    public String getMeteorShowerVisibilityData(String meteorShowerName, int year, double latitude, double longitude) {
        try {
            // Step 1: DB에서 데이터 조회
            Optional<MeteorShowerVisibility> visibilityOptional = getVisibilityFromDB(meteorShowerName, year, latitude, longitude);
            if (visibilityOptional.isPresent()) {
                log.debug("Data found in DB for meteorShowerName: {}, year: {}, latitude: {}, longitude: {}",
                        meteorShowerName, year, latitude, longitude);

                // Util 클래스의 convertToJson() 메서드를 사용해서 JSON 문자열로 변환
                return util.convertToJson(visibilityOptional.get());
            }

            // Step 2: 외부 API 요청 진행 및 데이터 저장
            String response = fetchAndSaveMeteorShowerData(meteorShowerName, year, latitude, longitude);
            return response;

        } catch (Exception e) {
            log.error("Error occurred while making API request", e);
            return "{\"error\":\"Error occurred while fetching meteor shower visibility data\"}";
        }
    }

    // 데이터 조회
    private Optional<MeteorShowerVisibility> getVisibilityFromDB(String meteorShowerName, int year, double latitude, double longitude) {
        log.debug("==========================유성우 데이터 DB 조회 로직 시작.===============================");
        // 유성우 정보에서 피크 기간 가져오기
        MeteorShowerData.MeteorShowerInfo meteorShowerInfo = MeteorShowerData.METEOR_SHOWERS.values().stream()
                .flatMap(List::stream)
                .filter(info -> info.getName().equalsIgnoreCase(meteorShowerName))
                .findFirst()
                .orElse(null);

        if (meteorShowerInfo == null) {
            log.warn("유성우 이름 '{}'에 해당하는 피크 기간 정보를 찾을 수 없습니다.", meteorShowerName);
            return Optional.empty();
        }

        // 피크 시작 날짜 설정
        LocalDate peakStart = LocalDate.of(year, Integer.parseInt(meteorShowerInfo.getPeakStart().substring(0, 2)),
                Integer.parseInt(meteorShowerInfo.getPeakStart().substring(3)));

        // 위도와 경도를 정수형으로 변환
        int roundedLatitude = (int) Math.round(latitude);
        int roundedLongitude = (int) Math.round(longitude);

        log.debug("조회에 사용할 값들 - 유성우 이름: {}, 위도: {}, 경도: {}, 피크 시작 날짜: {}", meteorShowerName, roundedLatitude, roundedLongitude, peakStart);

        // 피크 시작 날짜 기준으로 데이터 조회
        Optional<MeteorShowerVisibility> result = meteorShowerVisibilityRepository.findByMeteorShowerNameLatitudeLongitudeAndPeakStart(
                meteorShowerName, roundedLatitude, roundedLongitude, peakStart);

        if (result.isPresent()) {
            log.info("조회 성공 - 조회된 데이터: {}", result.get());
        } else {
            log.warn("조회 실패 - 일치하는 데이터를 찾을 수 없습니다.");
        }

        return result;
    }

    // 외부 API 요청 후 DATA 저장 및 조회
    private String fetchAndSaveMeteorShowerData(String meteorShowerName, int year, double latitude, double longitude) {
        String url = String.format("http://64.110.98.105:5555/api/meteor_shower_visibility?name=%s&year=%s&latitude=%f&longitude=%f",
                meteorShowerName, year, latitude, longitude);

//        log.debug("Request URL: {}", url);
        System.err.println("Request URL: " + url);

        // 외부 API 요청
        String response = restTemplate.getForObject(url, String.class);
//        log.debug("Response received: {}", response);

        // DB에 데이터 저장 호출
        saveMeteorShowerVisibility(response, meteorShowerName, year, latitude, longitude);

        // DB에서 저장된 데이터를 다시 조회
        Optional<MeteorShowerVisibility> savedVisibility = getVisibilityFromDB(meteorShowerName, year, latitude, longitude);
        if (savedVisibility.isPresent()) {
            return getMeteorShowerVisibilityData(meteorShowerName, year, latitude, longitude);
        } else {
            log.error("Failed to retrieve saved meteor shower visibility data for meteorShowerName: {}, year: {}, latitude: {}, longitude: {}",
                    meteorShowerName, year, latitude, longitude);
            return "Error occurred while fetching saved meteor shower visibility data";
        }
    }

    // 외부 API로부터 가져온 데이터를 DB에 저장하는 메서드
    private void saveMeteorShowerVisibility(String response, String meteorShowerName, int year, double latitude, double longitude) {
        log.debug("==========================유성우 데이터 DB 저장 로직 시작.===============================");

        // Step 1: JSON 응답 파싱하여 DTO 리스트로 변환
        List<MeteorShowerVisibilityDTO> dtoList = util.parseVisibilityData(response);

        for (MeteorShowerVisibilityDTO dto : dtoList) {
            // Step 2: 추가적인 파라미터로 받은 정보 설정
            dto.setMeteorShowerName(meteorShowerName);

            // Coordinates 객체가 null인지 확인 후 설정
            if (dto.getCoordinates() != null) {
                dto.getCoordinates().setLatitude(latitude);
                dto.getCoordinates().setLongitude(longitude);
                log.debug("Coordinates set in DTO: {}", dto.getCoordinates());
            } else {
                CoordinatesDTO coordinates = new CoordinatesDTO();
                coordinates.setLatitude(latitude);
                coordinates.setLongitude(longitude);
                dto.setCoordinates(coordinates);
                log.debug("New Coordinates object created and set: {}", coordinates);
            }

            // 적절한 시작 및 종료 날짜를 설정
            if (dto.getPeakDates() != null) {
                if (dto.getPeakDates().getStart() != null) {
                    dto.setPeakStartDate(dto.getPeakDates().getStart());
                } else {
                    log.warn("Start date not found in PeakDates for meteor shower: {}", meteorShowerName);
                }

                if (dto.getPeakDates().getEnd() != null) {
                    dto.setPeakEndDate(dto.getPeakDates().getEnd());
                } else {
                    log.warn("End date not found in PeakDates for meteor shower: {}", meteorShowerName);
                }
            } else {
                log.warn("Peak dates not found in response for meteor shower: {}", meteorShowerName);
            }

            // Step 3: MapStruct 매퍼를 사용해 DTO를 엔티티로 변환
            MeteorShowerVisibilityMapper mapper = MeteorShowerVisibilityMapper.INSTANCE;
            MeteorShowerVisibility visibility = mapper.toEntity(dto);

            // 부모 클래스의 필드 설정 (eventName, eventType)
            AstronomicalEvent event = AstronomicalEvent.builder()
                    .eventName(meteorShowerName)
                    .eventType("meteor_shower")
                    .build();

            // Step 4: 부모 클래스 저장
            try {
                AstronomicalEvent savedEvent = astronomicalEventRepository.save(event);
                visibility.setAstronomicalEvent(savedEvent); // 부모의 이벤트 ID 설정
                log.info("AstronomicalEvent saved to DB with eventId: {}", savedEvent.getId());

                // Step 5: 자식 클래스 저장
                MeteorShowerVisibility savedEntity = meteorShowerVisibilityRepository.save(visibility);
                log.info("MeteorShowerVisibility saved to DB for meteorShowerName: {}, year: {}, latitude: {}, longitude: {}",
                        meteorShowerName, year, latitude, longitude);
                log.debug("Saved entity: {}", savedEntity);
            } catch (DataIntegrityViolationException e) {
                log.error("Failed to save data to DB due to integrity violation for meteorShowerName: {}, year: {}, latitude: {}, longitude: {}",
                        meteorShowerName, year, latitude, longitude, e);
            } catch (Exception e) {
                log.error("Unexpected error occurred while saving to DB for meteorShowerName: {}, year: {}, latitude: {}, longitude: {}",
                        meteorShowerName, year, latitude, longitude, e);
            }
        }
    }

}