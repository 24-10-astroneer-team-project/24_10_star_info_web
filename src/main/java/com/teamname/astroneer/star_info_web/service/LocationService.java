package com.teamname.astroneer.star_info_web.service;

import com.teamname.astroneer.star_info_web.dto.LocationDTO;
import com.teamname.astroneer.star_info_web.entity.Location;
import com.teamname.astroneer.star_info_web.entity.Member;
import com.teamname.astroneer.star_info_web.exception.InvalidLocationException;
import com.teamname.astroneer.star_info_web.repository.LocationRepository;
import com.teamname.astroneer.star_info_web.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LocationService {
    @Autowired
    private LocationRepository locationRepository;
    @Autowired
    private MemberRepository memberRepository;

    public void saveLocation(LocationDTO locationDTO) throws InvalidLocationException {
        if (!isValidLocation(locationDTO)) {
            throw new InvalidLocationException("Invalid latitude or longitude");
        }
        Location location = new Location();
        location.setLatitude(locationDTO.getLat());
        location.setLongitude(locationDTO.getLng());
        location.setDescription(locationDTO.getDescription()); // 설명 추가
        // userId로 Member를 조회하여 설정
        Member user = memberRepository.findById(locationDTO.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        location.setUser(user);  // 사용자 설정        locationRepository.save(location);
    }

    private boolean isValidLocation(LocationDTO locationDTO) {
        return (locationDTO.getLat() >= -90 && locationDTO.getLat() <= 90) &&
                (locationDTO.getLng() >= -180 && locationDTO.getLng() <= 180);
    }
}