package com.teamname.astroneer.star_info_web.astroEvent.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.teamname.astroneer.star_info_web.astroEvent.dto.meteorShower.MeteorShowerVisibilityDTO;
import com.teamname.astroneer.star_info_web.astroEvent.mapper.VisibilityResultsWrapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class Util {

    private final ObjectMapper objectMapper;

    public List<MeteorShowerVisibilityDTO> parseVisibilityData(String response) {
        try {
            // JSON 응답을 파싱해서 Wrapper로 변환
            VisibilityResultsWrapper wrapper = objectMapper.readValue(response, VisibilityResultsWrapper.class);
            return wrapper.getVisibilityResults(); // 필드 이름도 맞춤
        } catch (Exception e) {
            log.error("Error parsing visibility data", e);
            throw new RuntimeException("Failed to parse visibility data", e);
        }
    }

    public String convertToJson(Object object) {
        try {
            return objectMapper.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            log.error("Error converting object to JSON", e);
            throw new RuntimeException("Failed to convert object to JSON", e);
        }
    }
}

