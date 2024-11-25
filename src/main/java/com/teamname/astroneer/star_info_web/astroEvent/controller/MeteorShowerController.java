package com.teamname.astroneer.star_info_web.astroEvent.controller;

import com.teamname.astroneer.star_info_web.astroEvent.service.MeteorShowerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
}
