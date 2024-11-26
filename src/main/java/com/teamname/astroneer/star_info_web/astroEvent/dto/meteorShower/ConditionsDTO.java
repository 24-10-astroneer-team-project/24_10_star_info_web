package com.teamname.astroneer.star_info_web.astroEvent.dto.meteorShower;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class ConditionsDTO {
    private Double altitude;
    private String direction;
    private Double illumination;

    @JsonProperty("moon_phase")
    private Double moonPhase;

    @JsonProperty("phase_description")
    private String phaseDescription;
}