package com.teamname.astroneer.star_info_web.service;

import com.teamname.astroneer.star_info_web.entity.ObservationLocation;
import com.teamname.astroneer.star_info_web.repository.ObservationLocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ObservationLocationService {
    @Autowired
    private ObservationLocationRepository locationRepository;

    // 모든 관측 장소 리스트 가져오기
    public List<ObservationLocation> getAllLocations() {
        return locationRepository.findAll();
    }

    // 새로운 관측 장소 추가
    public ObservationLocation addLocation(ObservationLocation location) {
        return locationRepository.save(location);
    }

    // 특정 관측 장소 업데이트
    public ObservationLocation updateLocation(int id, ObservationLocation updatedLocation) {
        Optional<ObservationLocation> existingLocation = locationRepository.findById(id);

        if (existingLocation.isPresent()) {
            ObservationLocation location = existingLocation.get();
            location.setLocName(updatedLocation.getLocName());
            location.setLatitude(updatedLocation.getLatitude());
            location.setLongitude(updatedLocation.getLongitude());
            location.setIsRecommended(updatedLocation.getIsRecommended());
            return locationRepository.save(location);
        } else {
            throw new RuntimeException("관측 장소를 찾을 수 없습니다.");
        }
    }

    // 특정 관측 장소 삭제
    public void deleteLocation(int id) {
        if (locationRepository.existsById(id)) {
            locationRepository.deleteById(id);
        } else {
            throw new RuntimeException("관측 장소를 찾을 수 없습니다.");
        }
    }
}
