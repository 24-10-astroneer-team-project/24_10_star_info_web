package com.teamname.astroneer.star_info_web.astroEvent.dto.meteorShower;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class CoordinatesDTO {
    private Double latitude;
    private Double longitude;
    private Double altitude;
    private String direction;

    @JsonProperty("moon_phase")
    private Double moonPhase;

    private Double illumination;
}