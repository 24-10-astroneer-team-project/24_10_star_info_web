package com.teamname.astroneer.star_info_web.googleCalender.service;

import com.google.api.services.calendar.model.Event;
import com.teamname.astroneer.star_info_web.googleCalender.dto.EventCategory;
import com.teamname.astroneer.star_info_web.googleCalender.dto.EventRequest;
import com.teamname.astroneer.star_info_web.googleCalender.entity.PublicCalendar;
import com.teamname.astroneer.star_info_web.googleCalender.manager.CalendarEventManager;
import com.teamname.astroneer.star_info_web.googleCalender.repository.PublicCalendarRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.OffsetDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class PublicCalendarEventService {
    private final CalendarEventManager calendarEventManager;
    private final PublicCalendarRepository publicCalendarRepository;

    // Add Event
    @Transactional
    public void addEvent(EventRequest request) throws IOException {
        // Google Calendar에 이벤트 추가하고, 생성된 이벤트 객체를 반환받음
        Event event = calendarEventManager.addEvent(
                request.getSummary(),
                request.getLocation(),
                request.getDescription(),
                request.getStartDateTime(),
                request.getEndDateTime(),
                request.getTimeZone()
        );

        OffsetDateTime offsetDateTime = OffsetDateTime.parse(request.getStartDateTime());
        OffsetDateTime offsetEndDateTime = OffsetDateTime.parse(request.getEndDateTime());

        // Google Calendar에서 반환된 이벤트의 `creator` 정보를 사용하여 createdBy 설정
        String createdBy = event.getCreator().getEmail();

        // DB에 이벤트 추가
        PublicCalendar publicCalendar = new PublicCalendar();
        publicCalendar.setGoogleEventId(event.getId());
        publicCalendar.setSummary(request.getSummary());
        publicCalendar.setLocation(request.getLocation());
        publicCalendar.setDescription(request.getDescription());
        publicCalendar.setStartDateTime(offsetDateTime.toLocalDateTime());
        publicCalendar.setEndDateTime(offsetEndDateTime.toLocalDateTime());
        publicCalendar.setTimeZone(request.getTimeZone());
        publicCalendar.setCreatedBy(createdBy);

        // EventCategory 설정
        publicCalendar.setEventCategory(
                request.getEventCategory() != null ? request.getEventCategory() : EventCategory.GENERAL
        );

        publicCalendarRepository.save(publicCalendar); // DB 추가
    }

    // Read (구글 캘린더 이벤트 조회)
    public List<Event> getPublicEvents(String calendarId) throws IOException {
        return calendarEventManager.getPublicEvents(calendarId);
    }

    // Read (DB에서 모든 이벤트 조회)
    public List<PublicCalendar> getAllEventsFromDB() {
        return publicCalendarRepository.findAll();
    }

    // Read (DB에서 특정 Public Calendar ID로 이벤트 조회)
    public PublicCalendar getEventById(Long publicCalendarId) {
        return publicCalendarRepository.findById(publicCalendarId)
                .orElseThrow(() -> new IllegalArgumentException("Event not found: " + publicCalendarId));
    }

    // Update Event
    @Transactional
    public void updateEvent(Long publicCalendarId, EventRequest request) throws IOException {
        // DB에서 Google Event ID를 가져옴
        PublicCalendar publicCalendar = publicCalendarRepository.findById(publicCalendarId)
                .orElseThrow(() -> new IllegalArgumentException("Event not found: " + publicCalendarId));
        String googleEventId = publicCalendar.getGoogleEventId();

        // eventCategory가 일치하는지 확인 (여기서는 Meteor와 Planet으로 구분하는 예시)
        if ("Meteor".equals(publicCalendar.getEventCategory())) {
            // 유성우 관련 로직
            log.info("Updating a Meteor event with ID: {}", publicCalendarId);
        } else if ("Planet".equals(publicCalendar.getEventCategory())) {
            // 행성 대접근 관련 로직
            log.info("Updating a Planet event with ID: {}", publicCalendarId);
        } else {
            // 일반 이벤트로 처리
            log.info("Updating a General event with ID: {}", publicCalendarId);
        }

        // Google Calendar에서 이벤트 업데이트
        calendarEventManager.updateEvent(
                "primary",
                googleEventId,
                request.getSummary(),
                request.getLocation(),
                request.getDescription(),
                request.getStartDateTime(),
                request.getEndDateTime(),
                request.getTimeZone()
        );

        OffsetDateTime offsetDateTime = OffsetDateTime.parse(request.getStartDateTime());
        OffsetDateTime offsetEndDateTime = OffsetDateTime.parse(request.getEndDateTime());

        // DB에서도 이벤트 업데이트
        publicCalendar.setSummary(request.getSummary());
        publicCalendar.setLocation(request.getLocation());
        publicCalendar.setDescription(request.getDescription());
        publicCalendar.setStartDateTime(offsetDateTime.toLocalDateTime());
        publicCalendar.setEndDateTime(offsetEndDateTime.toLocalDateTime());
        publicCalendar.setTimeZone(request.getTimeZone());

        // EventCategory 업데이트
        if (request.getEventCategory() != null) {
            publicCalendar.setEventCategory(request.getEventCategory());
        }

        publicCalendarRepository.save(publicCalendar); // DB 업데이트
    }

    // Delete
    @Transactional
    public void deleteEvent(Long publicCalendarId) throws IOException {
        // DB에서 Google Event ID를 가져옴
        PublicCalendar publicCalendar = publicCalendarRepository.findById(publicCalendarId)
                .orElseThrow(() -> new IllegalArgumentException("Event not found: " + publicCalendarId));
        String googleEventId = publicCalendar.getGoogleEventId();

        // Google Calendar에서 이벤트 삭제
        calendarEventManager.deleteEvent("primary", googleEventId);

        // DB에서도 이벤트 삭제
        publicCalendarRepository.delete(publicCalendar);
    }
}