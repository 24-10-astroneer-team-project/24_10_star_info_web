package com.teamname.astroneer.star_info_web.service;

import com.teamname.astroneer.star_info_web.dto.LocationDTO;
import com.teamname.astroneer.star_info_web.dto.LocationEditRequest;
import com.teamname.astroneer.star_info_web.entity.Location;
import com.teamname.astroneer.star_info_web.entity.Member;
import com.teamname.astroneer.star_info_web.exception.InvalidLocationException;
import com.teamname.astroneer.star_info_web.repository.LocationRepository;
import com.teamname.astroneer.star_info_web.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LocationService {
    private final LocationRepository locationRepository;
    private final MemberRepository memberRepository;

    // 생성자를 통한 의존성 주입
    @Autowired
    public LocationService(LocationRepository locationRepository, MemberRepository memberRepository) {
        this.locationRepository = locationRepository;
        this.memberRepository = memberRepository;
    }

    public void saveLocation(LocationDTO locationDTO) throws InvalidLocationException {
        System.err.println("=================LocationService: 유저 위치 정보 저장 로직 시작 ================");
        if (!isValidLocation(locationDTO)) {
            throw new InvalidLocationException("Invalid latitude or longitude");
        }
        Location location = new Location();
        location.setLatitude(locationDTO.getLat());
        location.setLongitude(locationDTO.getLng());
        location.setDescription(locationDTO.getDescription()); // 설명 추가

        // userId로 Member 조회 및 설정
        Member user = memberRepository.findById(locationDTO.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        location.setUser(user);

        locationRepository.save(location);
    }

    private boolean isValidLocation(LocationDTO locationDTO) {
        return (locationDTO.getLat() >= -90 && locationDTO.getLat() <= 90) &&
                (locationDTO.getLng() >= -180 && locationDTO.getLng() <= 180);
    }

    // 위치 목록 조회
    public List<Location> findLocationsByUserId(long userId) {
        return locationRepository.findByUserId(userId);
    }

    public void updateLocationDescription(long locationId, String description) {
        Optional<Location> locationOptional = locationRepository.findById(locationId);
        if (locationOptional.isPresent()) {
            Location location = locationOptional.get();
            if (description != null) {
                location.setDescription(description);
                locationRepository.save(location);
            }
        } else {
            throw new IllegalArgumentException("Location not found");
        }
    }

    public Optional<Location> findById(long locationId) {
        return locationRepository.findById(locationId);
    }



    public void deleteLocation(Long locationId) {
        // 위치가 존재하는지 확인
        if (!locationRepository.existsById(locationId)) {
            throw new InvalidLocationException("존재하지 않는 위치입니다.");
        }

        // 즐겨찾기인지 확인
        Optional<Member> memberOptional = memberRepository.findByFavoriteLocationId(locationId);
        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();
            member.setFavoriteLocationId(0L); // 즐겨찾기 초기화
            memberRepository.save(member); // 변경사항 저장
            System.out.println("Reset favorite location for user with ID: " + member.getFavoriteLocationId());
        }

        // 위치 삭제
        locationRepository.deleteById(locationId);
        System.out.println("Deleted location with ID: " + locationId);
    }


    public boolean updateLocation(LocationEditRequest editRequest) {
        return locationRepository.findById(editRequest.getLocationId())
                .map(location -> {
                    // 필드 업데이트
                    location.setLatitude(editRequest.getLat());
                    location.setLongitude(editRequest.getLng());
                    location.setDescription(editRequest.getDescription());
                    locationRepository.save(location); // 저장
                    return true;
                })
                .orElse(false); // id에 해당하는 위치가 없으면 false 반환
    }

}