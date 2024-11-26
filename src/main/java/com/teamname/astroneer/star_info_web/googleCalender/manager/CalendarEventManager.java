package com.teamname.astroneer.star_info_web.googleCalender.manager;

import com.google.api.client.util.DateTime;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.model.Event;
import com.google.api.services.calendar.model.EventDateTime;
import com.google.api.services.calendar.model.Events;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class CalendarEventManager {

    private final Calendar service;

    public void addEvent(String summary, String location, String description,
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
    }

    public List<Event> getPublicEvents(String calendarId) throws IOException {
        // Retrieve the next 10 upcoming events from the specified calendar.
        Events events = service.events().list(calendarId)
                .setMaxResults(10)
                .setOrderBy("startTime")
                .setSingleEvents(true)
                .execute();

        return events.getItems();
    }

    public void updateEvent(String calendarId, String eventId, String summary, String location, String description,
                            String startDateTimeStr, String endDateTimeStr, String timeZone) throws IOException {
        // Retrieve the event to update
        Event event = service.events().get(calendarId, eventId).execute();

        // Update the event details
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

        // Update the event in the calendar
        event = service.events().update(calendarId, eventId, event).execute();

        System.out.printf("Event updated: %s\n", event.getHtmlLink());
    }

    public void deleteEvent(String calendarId, String eventId) throws IOException {
        // Delete the event from the specified calendar
        service.events().delete(calendarId, eventId).execute();

        System.out.printf("Event deleted: %s\n", eventId);
    }
}