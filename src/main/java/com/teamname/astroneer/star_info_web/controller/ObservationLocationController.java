package com.teamname.astroneer.star_info_web.controller;

import com.teamname.astroneer.star_info_web.entity.ObservationLocation;
import com.teamname.astroneer.star_info_web.service.ObservationLocationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")  // 모든 도메인 허용, 필요에 따라 특정 도메인만 허용 가능
@RequestMapping("/locations")
public class ObservationLocationController {

    private static final Logger logger = LoggerFactory.getLogger(ObservationLocationController.class);
    private final ObservationLocationService locationService;

    @Autowired
    public ObservationLocationController(ObservationLocationService locationService) {
        this.locationService = locationService;
    }

    // 모든 관측 장소 리스트 가져오기
    @GetMapping
    public List<ObservationLocation> getAllLocations() {
        logger.info("========location Get 요청 받음. Controller 작동.========");
        return locationService.getAllLocations();
    }

    // 특정 관측 장소의 천문 이벤트 정보 가져오기
//    @GetMapping("/{id}/astronomy")
//    public String getAstronomicalDataForLocation(@PathVariable int id, @RequestParam String date) {
//        logger.info("========Astronomy Get 요청 받음. id: {}, date: {}========", id, date); // 로그 추가
//        ObservationLocation location = locationService.getLocationById(id);
//        double latitude = location.getLatitude();
//        double longitude = location.getLongitude();
//
//        // Astronomy API를 호출하여 해당 위치와 날짜의 천문 데이터를 가져옴
//        return astronomyApiService.getAstronomicalData(latitude, longitude, date);
//    }

    // 특정 관측 장소 가져오기
    @GetMapping("/{id}")
    public ObservationLocation getLocationById(@PathVariable int id) {
        logger.info("========location Get 요청 받음. id: {}========", id);
        return locationService.getLocationById(id);
    }

    // 새로운 관측 장소 추가
    @PostMapping
    public ObservationLocation addLocation(@RequestBody ObservationLocation location) {
        logger.info("========location Post 요청 받음. Controller 작동.========");
        return locationService.addLocation(location);
    }

    // 특정 관측 장소 업데이트
    @PutMapping("/{id}")
    public ObservationLocation updateLocation(@PathVariable int id, @RequestBody ObservationLocation location) {
        logger.info("========location Put 요청 받음. {}번 접근. Controller 작동.========", id);
        return locationService.updateLocation(id, location);
    }

    // 특정 관측 장소 삭제
    @DeleteMapping("/{id}")
    public void deleteLocation(@PathVariable int id) {
        logger.info("========location Delete 요청 받음. {}번 접근. Controller 작동.========", id);
        locationService.deleteLocation(id);
    }
}
