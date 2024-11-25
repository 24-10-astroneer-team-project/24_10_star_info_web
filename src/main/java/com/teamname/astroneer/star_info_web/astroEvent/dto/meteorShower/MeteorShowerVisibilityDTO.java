package com.teamname.astroneer.star_info_web.astroEvent.dto.meteorShower;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.LocalDate;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class MeteorShowerVisibilityDTO {
    @JsonProperty("comet_approaching")
    private String cometApproaching;

    @JsonProperty("comet_name")
    private String cometName;

    @JsonProperty("conditions")
    private ConditionsDTO conditions;

    @JsonProperty("coordinates")
    private CoordinatesDTO coordinates;

    @JsonProperty("sun_times")
    private SunTimesDTO sunTimes;

    @JsonProperty("message")
    private String visibilityMessage;

    @JsonProperty("peak_dates")
    private PeakDatesDTO peakDates;

    @JsonProperty("visibility_rating")
    private String visibilityRating;

    @JsonProperty("name")
    private String meteorShowerName;

    // 추가된 필드들
    private LocalDate peakStartDate;  // PeakDates의 시작 날짜
    private LocalDate peakEndDate;    // PeakDates의 종료 날짜

}