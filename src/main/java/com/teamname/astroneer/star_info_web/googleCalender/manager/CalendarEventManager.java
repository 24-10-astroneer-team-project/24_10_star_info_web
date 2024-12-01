package com.teamname.astroneer.star_info_web.googleCalender.manager;

import com.google.api.client.googleapis.batch.BatchRequest;
import com.google.api.client.util.DateTime;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.model.Event;
import com.google.api.services.calendar.model.EventDateTime;
import com.google.api.services.calendar.model.Events;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import com.google.api.services.calendar.Calendar.Events.Insert;


import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class CalendarEventManager {

    private final Calendar service;

    public Event addEvent(String summary, String location, String description,
                          String startDateTimeStr, String endDateTimeStr, String timeZone) throws IOException {
        Event event = new Event()
                .setSummary(summary)
                .setLocation(location)
                .setDescription(description);

        DateTime startDateTime = new DateTime(startDateTimeStr);
        EventDateTime start = new EventDateTime()
                .setDateTime(startDateTime)
                .setTimeZone(timeZone);
        event.setStart(start);

        DateTime endDateTime = new DateTime(endDateTimeStr);
        EventDateTime end = new EventDateTime()
                .setDateTime(endDateTime)
                .setTimeZone(timeZone);
        event.setEnd(end);

        String calendarId = "primary";  // 기본 캘린더 사용
        event = service.events().insert(calendarId, event).execute();

        System.out.printf("Event created: %s\n", event.getHtmlLink());
        return event; // 생성된 Google Event 객체 반환
    }

    public List<Event> getAllEvents(String calendarId) throws IOException {
        List<Event> events = new ArrayList<>();
        String pageToken = null;

        do {
            // Google Calendar API 호출
            Events result = service.events().list(calendarId)
                    .setPageToken(pageToken)
                    .execute();

            if (result.getItems() != null) {
                events.addAll(result.getItems());
            }

            pageToken = result.getNextPageToken();
        } while (pageToken != null);

        return events;
    }

    public void updateEvent(String calendarId, String googleEventId, String summary, String location, String description,
                            String startDateTimeStr, String endDateTimeStr, String timeZone) throws IOException {
        // Retrieve and update event
        Event event = service.events().get(calendarId, googleEventId).execute();  // calendarId 추가

        event.setSummary(summary)
                .setLocation(location)
                .setDescription(description);

        DateTime startDateTime = new DateTime(startDateTimeStr);
        EventDateTime start = new EventDateTime()
                .setDateTime(startDateTime)
                .setTimeZone(timeZone);
        event.setStart(start);

        DateTime endDateTime = new DateTime(endDateTimeStr);
        EventDateTime end = new EventDateTime()
                .setDateTime(endDateTime)
                .setTimeZone(timeZone);
        event.setEnd(end);

        // Update event
        service.events().update(calendarId, googleEventId, event).execute();  // calendarId 추가

        System.out.printf("Event updated: %s\n", event.getHtmlLink());
    }

    public void deleteEvent(String calendarId, String googleEventId) throws IOException {
        // Google Calendar에서 이벤트 삭제
        service.events().delete(calendarId, googleEventId).execute();

        System.out.printf("Event deleted: %s\n", googleEventId);
    }

    // BatchRequest 생성 메서드 추가
    public BatchRequest getBatchRequest() {
        return service.batch(); // Google Calendar service 객체에서 BatchRequest 생성
    }

    // Batch용 Add Event Request 생성
    public Insert addEventRequest(String summary, String location, String description,
                                  String startDateTimeStr, String endDateTimeStr, String timeZone) throws IOException {
        Event event = new Event()
                .setSummary(summary)
                .setLocation(location)
                .setDescription(description);

        DateTime startDateTime = new DateTime(startDateTimeStr);
        EventDateTime start = new EventDateTime()
                .setDateTime(startDateTime)
                .setTimeZone(timeZone);
        event.setStart(start);

        DateTime endDateTime = new DateTime(endDateTimeStr);
        EventDateTime end = new EventDateTime()
                .setDateTime(endDateTime)
                .setTimeZone(timeZone);
        event.setEnd(end);

        String calendarId = "primary"; // 기본 캘린더
        return service.events().insert(calendarId, event); // Insert 요청 반환
    }
}