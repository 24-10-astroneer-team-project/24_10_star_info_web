package com.teamname.astroneer.star_info_web.astroEvent.dto.meteorShower;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class PeakDatesDTO {
    private LocalDate start;
    private LocalDate end;

    @JsonProperty("best")
    private LocalDateTime bestPeakDatetime;
}
