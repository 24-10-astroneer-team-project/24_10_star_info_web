package com.teamname.astroneer.star_info_web.controller;

import com.teamname.astroneer.star_info_web.dto.LocationDTO;
import com.teamname.astroneer.star_info_web.exception.InvalidLocationException;
import com.teamname.astroneer.star_info_web.security.CustomOAuth2User;
import com.teamname.astroneer.star_info_web.service.LocationService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;

@RestController
@RequestMapping("/api/location")
public class LocationController {
    @Autowired
    private LocationService locationService;

    @PostMapping("/save")
    public ResponseEntity<?> saveUserLocation(@RequestBody LocationDTO locationDTO, @AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
        try {
            // CustomOAuth2User에서 userId와 email 가져오기
            System.out.println("Received customOAuth2User:");
            System.out.println("User ID: " + customOAuth2User.getUserId());

            // LocationDTO의 초기 상태 출력
            System.out.println("Received locationDTO:");
            System.out.println("Latitude: " + locationDTO.getLat());
            System.out.println("Longitude: " + locationDTO.getLng());
            System.out.println("Description: " + locationDTO.getDescription());
            System.err.println("User ID (before setting): " + locationDTO.getUserId());

            // CustomOAuth2User에서 가져온 userId를 LocationDTO에 설정
            locationDTO.setUserId(customOAuth2User.getUserId());

            // 설정된 userId와 함께 locationDTO를 다시 출력
            System.out.println("Updated locationDTO with User ID:");
            System.err.println("User ID (after setting): " + locationDTO.getUserId());

            locationService.saveLocation(locationDTO);
            return ResponseEntity.ok("위치 저장 성공");
        } catch (Exception e) {
            System.out.println("Error during location save: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("위치 저장 실패: " + e.getMessage());
        }
    }
}
