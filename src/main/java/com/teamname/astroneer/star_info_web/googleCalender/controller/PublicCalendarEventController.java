package com.teamname.astroneer.star_info_web.googleCalender.controller;

import com.teamname.astroneer.star_info_web.googleCalender.dto.EventCategory;
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
            publicCalendarEventService.addEvent(request); // DB에 EventCategory 저장
            return "Event added successfully";
        } catch (IOException e) {
            log.error("Failed to add event", e);
            return "Failed to add event: " + e.getMessage();
        }
    }

    // Read Events from Google Calendar (always primary calendar)
    @GetMapping("/events")
    public List<com.google.api.services.calendar.model.Event> getPublicEvents() {
        try {
            return publicCalendarEventService.getPublicEvents("primary"); // Google Calendar에서 항상 primary 사용
        } catch (IOException e) {
            log.error("Failed to get events", e);
            return List.of();  // 빈 리스트 반환
        }
    }

    // Read All Events from DB
    @GetMapping("/db/events")
    public List<PublicCalendar> getAllEventsFromDB() {
        return publicCalendarEventService.getAllEventsFromDB(); // DB에 저장된 모든 이벤트 반환
    }

    // Read Specific Event from DB by Public Calendar ID
    @GetMapping("/db/event")
    public PublicCalendar getEventById(@RequestParam Long publicCalendarId) {
        return publicCalendarEventService.getEventById(publicCalendarId); // 특정 이벤트 반환
    }

    // Update Event
    @PutMapping("/update")
    public String updateEvent(@RequestParam Long publicCalendarId, @RequestBody EventRequest request) {
        try {
            log.info("Updating event with ID: {}", publicCalendarId);
            publicCalendarEventService.updateEvent(publicCalendarId, request); // primary 캘린더와 DB 업데이트
            return "Event updated successfully";
        } catch (IOException e) {
            log.error("Failed to update event", e);
            return "Failed to update event: " + e.getMessage();
        }
    }

    // Delete Event
    @DeleteMapping("/delete")
    public String deleteEvent(@RequestParam Long publicCalendarId) {
        try {
            publicCalendarEventService.deleteEvent(publicCalendarId); // primary 캘린더와 DB에서 이벤트 삭제
            return "Event deleted successfully";
        } catch (IOException e) {
            log.error("Failed to delete event", e);
            return "Failed to delete event: " + e.getMessage();
        }
    }

    // Sync Events in Batch
    @PostMapping("/sync/batch")
    public String syncAllEventsWithBatch(@RequestBody List<EventRequest> requests) {
        try {
            publicCalendarEventService.syncAllEventsWithBatch(requests);
            return "Events synced successfully";
        } catch (IOException e) {
            log.error("Failed to sync events in batch", e);
            return "Failed to sync events: " + e.getMessage();
        }
    }

    // 캘린더 초기화 API
    @DeleteMapping("/reset")
    public String resetCalendar() {
        try {
            publicCalendarEventService.resetCalendar();
            return "Calendar and DB reset successfully.";
        } catch (IOException e) {
            log.error("Failed to reset calendar", e);
            return "Failed to reset calendar: " + e.getMessage();
        }
    }

    /////////////////////////////

    @GetMapping("/events/monthly")
    public List<PublicCalendar> getMonthlyEvents(
            @RequestParam int year,
            @RequestParam int month
    ) {
        return publicCalendarEventService.getMonthlyEvents(year, month);
    }
}
