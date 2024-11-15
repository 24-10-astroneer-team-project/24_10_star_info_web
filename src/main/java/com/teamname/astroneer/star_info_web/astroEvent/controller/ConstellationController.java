package com.teamname.astroneer.star_info_web.astroEvent.controller;

import com.teamname.astroneer.star_info_web.astroEvent.service.ConstellationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/constellations")
public class ConstellationController {

    private static final Logger logger = LoggerFactory.getLogger(ConstellationController.class);

    private final ConstellationService constellationService;

    @Autowired
    public ConstellationController(ConstellationService constellationService) {
        this.constellationService = constellationService;
    }

    @GetMapping
    public String getConstellationData(@RequestParam double latitude, @RequestParam double longitude, @RequestParam String startDate, @RequestParam String endDate) {
        logger.info("========Constellations Get 요청 받음========");
        return constellationService.getConstellationData(latitude, longitude, startDate, endDate);
    }

}
