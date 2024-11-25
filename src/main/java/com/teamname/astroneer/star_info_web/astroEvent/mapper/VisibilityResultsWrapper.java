package com.teamname.astroneer.star_info_web.astroEvent.mapper;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.teamname.astroneer.star_info_web.astroEvent.dto.meteorShower.MeteorShowerVisibilityDTO;
import lombok.Data;

import java.util.List;

@Data
public class VisibilityResultsWrapper {
    @JsonProperty("visibility_results")
    private List<MeteorShowerVisibilityDTO> visibilityResults;
}
