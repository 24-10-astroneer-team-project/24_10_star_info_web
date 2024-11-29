package com.teamname.astroneer.star_info_web.astroEvent.controller;

import com.teamname.astroneer.star_info_web.astroEvent.service.MeteorShowerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/meteorShower")
@RequiredArgsConstructor
@Slf4j
public class MeteorShowerController {

    private final MeteorShowerService meteorShowerService;

    @GetMapping("/general")
    public String getConstellationData(@RequestParam String cometName, @RequestParam String startDate) {
        log.debug("========meteorShower/general Get 요청 받음========");
        return meteorShowerService.getMeteorShowerData(cometName, startDate);
    }

    @GetMapping("/visibility")
    public String getVisibilityData(@RequestParam String meteorShowerName, @RequestParam int year, @RequestParam double latitude, @RequestParam double longitude) {
        log.info("================meteorShower/visibility Get 요청 받음===================");

        String decodedMeteorShowerName = meteorShowerName.replace("+", "%20");

        log.info("Calling service method with parameters - Meteor Shower Name: {}, Year: {}, Latitude: {}, Longitude: {}",
                decodedMeteorShowerName, year, latitude, longitude);

        return meteorShowerService.getMeteorShowerVisibilityData(decodedMeteorShowerName, year, latitude, longitude);
    }

    // 연도 기준으로 유성우 데이터를 Google Calendar와 동기화
    @PostMapping("/syncToCalendar")
    public String syncMeteorShowersToCalendar(@RequestParam int year) {
        try {
            log.info("Syncing meteor showers for year: {}", year);

            // 서비스 호출로 Google Calendar 동기화
            meteorShowerService.syncMeteorShowersToCalendar(year);

            return "Meteor showers synced to Google Calendar successfully";
        } catch (Exception e) {
            log.error("Failed to sync meteor showers", e);
            return "Failed to sync meteor showers: " + e.getMessage();
        }
    }
}
