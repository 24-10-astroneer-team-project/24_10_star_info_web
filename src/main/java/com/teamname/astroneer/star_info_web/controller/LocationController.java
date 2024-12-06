package com.teamname.astroneer.star_info_web.controller;

import com.teamname.astroneer.star_info_web.dto.LocationDTO;
import com.teamname.astroneer.star_info_web.dto.LocationEditRequest;
import com.teamname.astroneer.star_info_web.exception.InvalidLocationException;
import com.teamname.astroneer.star_info_web.security.CustomOAuth2User;
import com.teamname.astroneer.star_info_web.service.LocationService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;

@Slf4j
@RestController
@RequestMapping("/api/location")
@RequiredArgsConstructor
public class LocationController {

    private final LocationService locationService;

    @PostMapping("/save")
    public ResponseEntity<?> saveUserLocation(@RequestBody LocationDTO locationDTO, @AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
        if (customOAuth2User == null) {
            log.error("AuthenticationPrincipal is null");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
        }

        log.info("Authenticated User: {}", customOAuth2User);

        try {
            long userId = customOAuth2User.getUserId();
            locationDTO.setUserId(userId);

            locationService.saveLocation(locationDTO);

            return ResponseEntity.ok("위치 저장 성공");
        } catch (Exception e) {
            log.error("Error during location save", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("위치 저장 실패: " + e.getMessage());
        }
    }

    @DeleteMapping("/{locationId}")
    public ResponseEntity<?> deleteLocation(@PathVariable Long locationId) {
        try {
            System.out.println("Received request to delete location with ID: " + locationId);
            locationService.deleteLocation(locationId);
            return ResponseEntity.ok("위치 삭제 성공");
        } catch (InvalidLocationException e) {
            System.out.println("Invalid location deletion attempt: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("위치 삭제 실패: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Error during location deletion: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("위치 삭제 실패: " + e.getMessage());
        }
    }

    @PutMapping("/edit")
    public ResponseEntity<String> editLocation(@RequestBody LocationEditRequest editRequest) {
        try {
            // id 기반으로 업데이트 시도
            boolean isUpdated = locationService.updateLocation(editRequest);

            // 업데이트 결과에 따라 응답 처리
            if (isUpdated) {
                return ResponseEntity.ok("Location updated successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Location not found or no changes made.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error occurred while updating the location: " + e.getMessage());
        }
    }

}