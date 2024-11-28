package com.teamname.astroneer.star_info_web.googleCalender.service;


import com.google.api.client.googleapis.batch.BatchRequest;
import com.google.api.client.googleapis.batch.json.JsonBatchCallback;
import com.google.api.client.googleapis.json.GoogleJsonError;
import com.google.api.client.googleapis.json.GoogleJsonErrorContainer;
import com.google.api.client.http.HttpHeaders;
import com.google.api.services.calendar.Calendar;
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
import java.util.ArrayList;
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
        // Google Calendar에 이벤트 추가
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

        // DB에 이벤트 추가
        PublicCalendar publicCalendar = new PublicCalendar();
        publicCalendar.setGoogleEventId(event.getId());
        publicCalendar.setSummary(request.getSummary());
        publicCalendar.setLocation(request.getLocation());
        publicCalendar.setDescription(request.getDescription());
        publicCalendar.setStartDateTime(offsetDateTime.toLocalDateTime());
        publicCalendar.setEndDateTime(offsetEndDateTime.toLocalDateTime());
        publicCalendar.setTimeZone(request.getTimeZone());
        publicCalendar.setCreatedBy(event.getCreator().getEmail());

        // EventCategory 설정 (DB에만 저장)
        publicCalendar.setEventCategory(
                request.getEventCategory() != null ? request.getEventCategory() : EventCategory.GENERAL
        );

        publicCalendarRepository.save(publicCalendar); // DB 추가
    }

    // Read (Google Calendar에서 이벤트 조회, 항상 primary 사용)
    public List<Event> getPublicEvents(String calendarId) throws IOException {
        log.info("Fetching events from Google Calendar: {}", calendarId);

        // primary 캘린더에서 모든 이벤트 조회
        return calendarEventManager.getAllEvents(calendarId);
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

        log.info("Updating event in primary calendar, Event ID: {}", googleEventId);

        // Google Calendar에서 이벤트 업데이트
        calendarEventManager.updateEvent(
                "primary", // 항상 primary 캘린더
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

        // EventCategory 업데이트 (DB에서만 관리)
        if (request.getEventCategory() != null) {
            publicCalendar.setEventCategory(request.getEventCategory());
        }

        publicCalendarRepository.save(publicCalendar); // DB 업데이트
    }

    // Delete Event
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

    // Batch Event Sync (Google Calendar와 DB 동기화)
    @Transactional
    public void syncAllEventsWithBatch(List<EventRequest> requests) throws IOException {
        BatchRequest batch = calendarEventManager.getBatchRequest();

        JsonBatchCallback<Event> callback = new JsonBatchCallback<>() {
            @Override
            public void onSuccess(Event event, HttpHeaders responseHeaders) {
                log.info("Successfully added event to Google Calendar: {}", event.getId());

                OffsetDateTime startDateTime = OffsetDateTime.parse(event.getStart().getDateTime().toStringRfc3339());
                OffsetDateTime endDateTime = OffsetDateTime.parse(event.getEnd().getDateTime().toStringRfc3339());

                PublicCalendar publicCalendar = new PublicCalendar();
                publicCalendar.setGoogleEventId(event.getId());
                publicCalendar.setSummary(event.getSummary());
                publicCalendar.setLocation(event.getLocation());
                publicCalendar.setDescription(event.getDescription());
                publicCalendar.setStartDateTime(startDateTime.toLocalDateTime());
                publicCalendar.setEndDateTime(endDateTime.toLocalDateTime());
                publicCalendar.setTimeZone(event.getStart().getTimeZone());
                publicCalendar.setCreatedBy(event.getCreator().getEmail());
                publicCalendar.setEventCategory(EventCategory.GENERAL); // 기본 General 설정

                publicCalendarRepository.save(publicCalendar);
            }

            @Override
            public void onFailure(GoogleJsonError e, HttpHeaders responseHeaders) {
                log.error("Failed to add event to Google Calendar: {}", e.getMessage());
            }
        };

        for (EventRequest request : requests) {
            Calendar.Events.Insert insertRequest = calendarEventManager.addEventRequest(
                    request.getSummary(),
                    request.getLocation(),
                    request.getDescription(),
                    request.getStartDateTime(),
                    request.getEndDateTime(),
                    request.getTimeZone()
            );
            insertRequest.queue(batch, callback);
        }

        batch.execute();
    }
}
