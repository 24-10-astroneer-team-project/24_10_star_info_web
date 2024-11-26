package com.teamname.astroneer.star_info_web.astroEvent.controller;

import com.teamname.astroneer.star_info_web.astroEvent.service.PlanetService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/planet")
@RequiredArgsConstructor
@Slf4j
public class PlanetController {
    private final PlanetService planetService;

    @GetMapping("/visibility")
    public String getPlanetData(@RequestParam String planetName, @RequestParam double latitude, @RequestParam double longitude, @RequestParam String date, @RequestParam String rangeDays) {
        log.info("==========================핼성의 가시성 데이터 요청==============================");
        return planetService.getPlanetData(planetName, longitude, latitude, date, rangeDays);
    }

    @GetMapping("/opposition")
    public String getOppositionData(@RequestParam String planetName, @RequestParam String year) {
        log.info("=============================행성 대접근 데이터 요청=================================");
        return planetService.getOppositionData(planetName, year);
    }
}
