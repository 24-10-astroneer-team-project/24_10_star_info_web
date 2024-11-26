package com.teamname.astroneer.star_info_web.googleCalender.service;

import com.google.api.services.calendar.model.Event;
import com.teamname.astroneer.star_info_web.googleCalender.dto.EventRequest;
import com.teamname.astroneer.star_info_web.googleCalender.manager.CalendarEventManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class PublicCalendarEventService {
    private final CalendarEventManager calendarEventManager;

    // Create
    public void addEvent(EventRequest request) throws IOException {
        calendarEventManager.addEvent(
                request.getSummary(),
                request.getLocation(),
                request.getDescription(),
                request.getStartDateTime(),
                request.getEndDateTime(),
                request.getTimeZone()
        );
    }

    // Read
    public List<Event> getPublicEvents(String calendarId) throws IOException {
        return calendarEventManager.getPublicEvents(calendarId);
    }

    // Update
    public void updateEvent(String calendarId, String eventId, EventRequest request) throws IOException {
        calendarEventManager.updateEvent(
                calendarId,
                eventId,
                request.getSummary(),
                request.getLocation(),
                request.getDescription(),
                request.getStartDateTime(),
                request.getEndDateTime(),
                request.getTimeZone()
        );
    }

    // Delete
    public void deleteEvent(String calendarId, String eventId) throws IOException {
        calendarEventManager.deleteEvent(calendarId, eventId);
    }
}
