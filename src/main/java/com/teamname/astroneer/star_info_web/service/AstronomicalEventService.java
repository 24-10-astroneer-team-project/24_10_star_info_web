package com.teamname.astroneer.star_info_web.service;

import com.teamname.astroneer.star_info_web.entity.AstronomicalEvent;
import com.teamname.astroneer.star_info_web.repository.AstronomicalEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AstronomicalEventService {

    @Autowired
    private AstronomicalEventRepository eventRepository;

    // 모든 천문 이벤트 리스트 가져오기
    public List<AstronomicalEvent> getAllEvents() {
        return eventRepository.findAll();
    }

    // 특정 ID로 천문 이벤트 조회
    public AstronomicalEvent getEventById(int id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("해당 ID의 천문 이벤트를 찾을 수 없습니다: " + id));
    }

    // 새로운 천문 이벤트 추가
    public AstronomicalEvent addEvent(AstronomicalEvent event) {
        return eventRepository.save(event);
    }

    // 특정 천문 이벤트 업데이트
    public AstronomicalEvent updateEvent(int id, AstronomicalEvent updatedEvent) {
        Optional<AstronomicalEvent> existingEvent = eventRepository.findById(id);

        if (existingEvent.isPresent()) {
            AstronomicalEvent event = existingEvent.get();
            event.setEventName(updatedEvent.getEventName());
            event.setStartTime(updatedEvent.getStartTime());
            event.setEndTime(updatedEvent.getEndTime());
            event.setLatitude(updatedEvent.getLatitude());
            event.setLongitude(updatedEvent.getLongitude());
            return eventRepository.save(event);
        } else {
            throw new RuntimeException("천문 이벤트를 찾을 수 없습니다.");
        }
    }

    // 특정 천문 이벤트 삭제
    public void deleteEvent(int id) {
        if (eventRepository.existsById(id)) {
            eventRepository.deleteById(id);
        } else {
            throw new RuntimeException("천문 이벤트를 찾을 수 없습니다.");
        }
    }
}
