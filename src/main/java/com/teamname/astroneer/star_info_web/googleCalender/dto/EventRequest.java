package com.teamname.astroneer.star_info_web.googleCalender.dto;

import lombok.Data;

@Data
public class EventRequest {
    private String googleEventId;
    private String summary;
    private String location;
    private String description;
    private String startDateTime;
    private String endDateTime;
    private String timeZone;
//    private String createdBy;
}
