package com.teamname.astroneer.star_info_web.astroEvent.dto.meteorShower;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.OffsetDateTime;

@Data
public class SunTimesDTO {
    private OffsetDateTime sunrise;
    private OffsetDateTime sunset;

    @JsonProperty("timeZoneId")
    private String timeZoneId;
}