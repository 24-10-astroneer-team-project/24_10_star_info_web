package com.teamname.astroneer.star_info_web.googleCalender.controller;

import com.teamname.astroneer.star_info_web.googleCalender.dto.EventRequest;
import com.teamname.astroneer.star_info_web.googleCalender.entity.PublicCalendar;
import com.teamname.astroneer.star_info_web.googleCalender.service.PublicCalendarEventService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/public/calendar")
@RequiredArgsConstructor
@Slf4j
public class PublicCalendarEventController {

    private final PublicCalendarEventService publicCalendarEventService;

    // Create Event
    @PostMapping("/add")
    public String addEvent(@RequestBody EventRequest request) {
        try {
            publicCalendarEventService.addEvent(request);
            return "Event added successfully";
        } catch (IOException e) {
            log.error("Failed to add event", e);
            return "Failed to add event: " + e.getMessage();
        }
    }

    // Read Events
    @GetMapping("/events")
    public List<com.google.api.services.calendar.model.Event> getPublicEvents(@RequestParam(defaultValue = "primary") String calendarId) {
        try {
            return publicCalendarEventService.getPublicEvents(calendarId);
        } catch (IOException e) {
            log.error("Failed to get events", e);
            return List.of();  // 빈 리스트 반환
        }
    }

    // Read All Events from DB
    @GetMapping("/db/events")
    public List<PublicCalendar> getAllEventsFromDB() {
        return publicCalendarEventService.getAllEventsFromDB();
    }

    // Read Specific Event from DB by Google Event ID
    @GetMapping("/db/event")
    public PublicCalendar getEventByGoogleEventId(@RequestParam String googleEventId) {
        return publicCalendarEventService.getEventByGoogleEventId(googleEventId);
    }

    // Update Event
    @PutMapping("/update")
    public String updateEvent(@RequestParam(defaultValue = "primary") String calendarId, @RequestParam String googleEventId, @RequestBody EventRequest request) {
        try {
            log.info("Updating event with ID: {}", googleEventId);
            publicCalendarEventService.updateEvent(calendarId, googleEventId, request);
            return "Event updated successfully";
        } catch (IOException e) {
            log.error("Failed to update event", e);
            return "Failed to update event: " + e.getMessage();
        }
    }

    // Delete Event
    @DeleteMapping("/delete")
    public String deleteEvent(@RequestParam(defaultValue = "primary") String calendarId, @RequestParam String googleEventId) {
        try {
            publicCalendarEventService.deleteEvent(calendarId, googleEventId);
            return "Event deleted successfully";
        } catch (IOException e) {
            log.error("Failed to delete event", e);
            return "Failed to delete event: " + e.getMessage();
        }
    }
}

