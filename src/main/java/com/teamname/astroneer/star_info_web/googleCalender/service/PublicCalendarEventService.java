package com.teamname.astroneer.star_info_web.googleCalender.service;

import com.google.api.services.calendar.model.Event;
import com.teamname.astroneer.star_info_web.googleCalender.dto.EventRequest;
import com.teamname.astroneer.star_info_web.googleCalender.entity.PublicCalendar;
import com.teamname.astroneer.star_info_web.googleCalender.manager.CalendarEventManager;
import com.teamname.astroneer.star_info_web.googleCalender.repository.PublicCalendarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PublicCalendarEventService {
    private final CalendarEventManager calendarEventManager;
    private final PublicCalendarRepository publicCalendarRepository;

    // Create
    @Transactional
    public void addEvent(EventRequest request) throws IOException {
        // Google Calendar에 이벤트 추가하고, 생성된 ID를 반환받음
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
        publicCalendarRepository.save(publicCalendar); // DB 추가
    }

    // Read (구글 캘린더 이벤트 조회)
    public List<Event> getPublicEvents(String calendarId) throws IOException {
        return calendarEventManager.getPublicEvents(calendarId);
    }

    // Read (DB에서 이벤트 조회)
    public List<PublicCalendar> getAllEventsFromDB() {
        return publicCalendarRepository.findAll();
    }

    // Read (DB에서 특정 Google Event ID로 이벤트 조회)
    public PublicCalendar getEventByGoogleEventId(String googleEventId) {
        return publicCalendarRepository.findByGoogleEventId(googleEventId)
                .orElseThrow(() -> new IllegalArgumentException("Event not found: " + googleEventId));
    }


    // Update
    @Transactional
    public void updateEvent(String calendarId, String googleEventId, EventRequest request) throws IOException {
        // Google Calendar에서 이벤트 업데이트
        calendarEventManager.updateEvent(
                calendarId,  // 여기서 calendarId 추가
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
        PublicCalendar publicCalendar = publicCalendarRepository.findByGoogleEventId(googleEventId)
                .orElseThrow(() -> new IllegalArgumentException("Event not found: " + googleEventId));
        publicCalendar.setSummary(request.getSummary());
        publicCalendar.setLocation(request.getLocation());
        publicCalendar.setDescription(request.getDescription());
        publicCalendar.setStartDateTime(offsetDateTime.toLocalDateTime());
        publicCalendar.setEndDateTime(offsetEndDateTime.toLocalDateTime());
        publicCalendar.setTimeZone(request.getTimeZone());

        publicCalendarRepository.save(publicCalendar); // DB 업데이트

        // 구글 캘린더 업데이트된 이벤트 링크 출력
        System.out.printf("Event updated: https://www.google.com/calendar/event?eid=%s\n", googleEventId);
    }

    // Delete
    @Transactional
    public void deleteEvent(String calendarId, String googleEventId) throws IOException {
        // Google Calendar에서 이벤트 삭제
        calendarEventManager.deleteEvent(calendarId, googleEventId);

        // DB에서도 이벤트 삭제
        PublicCalendar publicCalendar = publicCalendarRepository.findByGoogleEventId(googleEventId)
                .orElseThrow(() -> new IllegalArgumentException("Event not found: " + googleEventId));
        publicCalendarRepository.delete(publicCalendar);
    }
}
