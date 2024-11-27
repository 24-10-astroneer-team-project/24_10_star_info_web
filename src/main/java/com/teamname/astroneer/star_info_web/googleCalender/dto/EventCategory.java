package com.teamname.astroneer.star_info_web.googleCalender.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum EventCategory {
    METEOR("Meteor"),
    PLANET("Planet"),
    GENERAL("General");

    private final String displayName;

    EventCategory(String displayName) {
        this.displayName = displayName;
    }

    @JsonValue
    public String getDisplayName() {
        return displayName;
    }

    @JsonCreator
    public static EventCategory fromString(String text) {
        for (EventCategory category : EventCategory.values()) {
            if (category.displayName.equalsIgnoreCase(text)) {
                return category;
            }
        }
        throw new IllegalArgumentException("Invalid event category: " + text);
    }
}
