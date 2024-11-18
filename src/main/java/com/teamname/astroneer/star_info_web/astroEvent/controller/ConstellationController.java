package com.teamname.astroneer.star_info_web.astroEvent.controller;

import com.teamname.astroneer.star_info_web.astroEvent.service.ConstellationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/constellations")
@RequiredArgsConstructor
@Slf4j
public class ConstellationController {

    private final ConstellationService constellationService;

    @GetMapping
    public String getConstellationData(@RequestParam double latitude, @RequestParam double longitude, @RequestParam String startDate, @RequestParam String endDate) {
        log.debug("========Constellations Get 요청 받음========");
        return constellationService.getConstellationData(latitude, longitude, startDate, endDate);
    }

}
