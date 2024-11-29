package com.teamname.astroneer.star_info_web.astroEvent.mapper;

import com.teamname.astroneer.star_info_web.astroEvent.dto.meteorShower.MeteorShowerVisibilityDTO;
import com.teamname.astroneer.star_info_web.astroEvent.entity.MeteorShowerVisibility;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface MeteorShowerVisibilityMapper {
    MeteorShowerVisibilityMapper INSTANCE = Mappers.getMapper(MeteorShowerVisibilityMapper.class);

    @Mapping(target = "visibilityId", ignore = true)  // visibilityId는 자동 생성되므로 무시
    @Mapping(source = "conditions.altitude", target = "altitude")
    @Mapping(source = "conditions.direction", target = "direction")
    @Mapping(source = "conditions.illumination", target = "illumination")
    @Mapping(source = "conditions.moonPhase", target = "moonPhase")
    @Mapping(source = "conditions.phaseDescription", target = "phaseDescription")
    @Mapping(source = "coordinates.latitude", target = "latitude")
    @Mapping(source = "coordinates.longitude", target = "longitude")
    @Mapping(source = "sunTimes.sunrise", target = "sunriseTime")
    @Mapping(source = "sunTimes.sunset", target = "sunsetTime")
    @Mapping(source = "sunTimes.timeZoneId", target = "timeZoneId")
    @Mapping(source = "peakDates.start", target = "peakStart")
    @Mapping(source = "peakDates.end", target = "peakEnd")
    @Mapping(source = "peakDates.bestPeakDatetime", target = "bestPeakDatetime")
    @Mapping(source = "visibilityMessage", target = "visibilityMessage")
    @Mapping(source = "visibilityRating", target = "visibilityRating")
    @Mapping(source = "meteorShowerName", target = "meteorShowerName")
    @Mapping(source = "cometName", target = "cometName")
    @Mapping(source = "cometApproaching", target = "cometApproaching")
    MeteorShowerVisibility toEntity(MeteorShowerVisibilityDTO dto);
}

