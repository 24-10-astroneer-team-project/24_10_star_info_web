package com.teamname.astroneer.star_info_web.controller;

import com.teamname.astroneer.star_info_web.entity.AstronomicalEvent;
import com.teamname.astroneer.star_info_web.service.AstronomicalEventService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/events")
public class AstronomicalEventController {

    private static final Logger logger = LoggerFactory.getLogger(AstronomicalEventController.class);

    @Autowired
    private AstronomicalEventService eventService;

    // 모든 천문 이벤트 리스트 가져오기
    @GetMapping
    public List<AstronomicalEvent> getAllEvents() {
        logger.info("========events Get 요청 받음. Controller 작동.========");
        return eventService.getAllEvents();
    }

    // 새로운 천문 이벤트 추가
    @PostMapping
    public AstronomicalEvent addEvent(@RequestBody AstronomicalEvent event) {
        logger.info("========events Post 요청 받음. Controller 작동.========");
        return eventService.addEvent(event);
    }

    // 특정 천문 이벤트 업데이트
    @PutMapping("/{id}")
    public AstronomicalEvent updateEvent(@PathVariable int id, @RequestBody AstronomicalEvent event) {
        logger.info("========events Put 요청 받음. {}번 접근. Controller 작동.========", id);
        return eventService.updateEvent(id, event);
    }

    // 특정 천문 이벤트 삭제
    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable int id) {
        logger.info("========events Delete 요청 받음. {}번 접근. Controller 작동시작.========", id);
        eventService.deleteEvent(id);
        logger.info("========events Delete 요청 받음. {}번 접근. Controller 작동끝.========", id);
    }
}
