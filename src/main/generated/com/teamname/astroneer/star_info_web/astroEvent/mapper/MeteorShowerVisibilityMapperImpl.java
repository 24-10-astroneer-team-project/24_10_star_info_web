package com.teamname.astroneer.star_info_web.astroEvent.mapper;

import com.teamname.astroneer.star_info_web.astroEvent.dto.meteorShower.ConditionsDTO;
import com.teamname.astroneer.star_info_web.astroEvent.dto.meteorShower.CoordinatesDTO;
import com.teamname.astroneer.star_info_web.astroEvent.dto.meteorShower.MeteorShowerVisibilityDTO;
import com.teamname.astroneer.star_info_web.astroEvent.dto.meteorShower.PeakDatesDTO;
import com.teamname.astroneer.star_info_web.astroEvent.dto.meteorShower.SunTimesDTO;
import com.teamname.astroneer.star_info_web.astroEvent.entity.MeteorShowerVisibility;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-12-02T21:17:32+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.11 (Oracle Corporation)"
)
public class MeteorShowerVisibilityMapperImpl implements MeteorShowerVisibilityMapper {

    @Override
    public MeteorShowerVisibility toEntity(MeteorShowerVisibilityDTO dto) {
        if ( dto == null ) {
            return null;
        }

        MeteorShowerVisibility.MeteorShowerVisibilityBuilder<?, ?> meteorShowerVisibility = MeteorShowerVisibility.builder();

        meteorShowerVisibility.altitude( dtoConditionsAltitude( dto ) );
        meteorShowerVisibility.direction( dtoConditionsDirection( dto ) );
        meteorShowerVisibility.illumination( dtoConditionsIllumination( dto ) );
        meteorShowerVisibility.moonPhase( dtoConditionsMoonPhase( dto ) );
        meteorShowerVisibility.phaseDescription( dtoConditionsPhaseDescription( dto ) );
        meteorShowerVisibility.latitude( dtoCoordinatesLatitude( dto ) );
        meteorShowerVisibility.longitude( dtoCoordinatesLongitude( dto ) );
        meteorShowerVisibility.sunriseTime( dtoSunTimesSunrise( dto ) );
        meteorShowerVisibility.sunsetTime( dtoSunTimesSunset( dto ) );
        meteorShowerVisibility.timeZoneId( dtoSunTimesTimeZoneId( dto ) );
        meteorShowerVisibility.peakStart( dtoPeakDatesStart( dto ) );
        meteorShowerVisibility.peakEnd( dtoPeakDatesEnd( dto ) );
        meteorShowerVisibility.bestPeakDatetime( dtoPeakDatesBestPeakDatetime( dto ) );
        meteorShowerVisibility.visibilityMessage( dto.getVisibilityMessage() );
        meteorShowerVisibility.visibilityRating( dto.getVisibilityRating() );
        meteorShowerVisibility.meteorShowerName( dto.getMeteorShowerName() );
        meteorShowerVisibility.cometName( dto.getCometName() );
        meteorShowerVisibility.cometApproaching( dto.getCometApproaching() );

        return meteorShowerVisibility.build();
    }

    private Double dtoConditionsAltitude(MeteorShowerVisibilityDTO meteorShowerVisibilityDTO) {
        if ( meteorShowerVisibilityDTO == null ) {
            return null;
        }
        ConditionsDTO conditions = meteorShowerVisibilityDTO.getConditions();
        if ( conditions == null ) {
            return null;
        }
        Double altitude = conditions.getAltitude();
        if ( altitude == null ) {
            return null;
        }
        return altitude;
    }

    private String dtoConditionsDirection(MeteorShowerVisibilityDTO meteorShowerVisibilityDTO) {
        if ( meteorShowerVisibilityDTO == null ) {
            return null;
        }
        ConditionsDTO conditions = meteorShowerVisibilityDTO.getConditions();
        if ( conditions == null ) {
            return null;
        }
        String direction = conditions.getDirection();
        if ( direction == null ) {
            return null;
        }
        return direction;
    }

    private Double dtoConditionsIllumination(MeteorShowerVisibilityDTO meteorShowerVisibilityDTO) {
        if ( meteorShowerVisibilityDTO == null ) {
            return null;
        }
        ConditionsDTO conditions = meteorShowerVisibilityDTO.getConditions();
        if ( conditions == null ) {
            return null;
        }
        Double illumination = conditions.getIllumination();
        if ( illumination == null ) {
            return null;
        }
        return illumination;
    }

    private Double dtoConditionsMoonPhase(MeteorShowerVisibilityDTO meteorShowerVisibilityDTO) {
        if ( meteorShowerVisibilityDTO == null ) {
            return null;
        }
        ConditionsDTO conditions = meteorShowerVisibilityDTO.getConditions();
        if ( conditions == null ) {
            return null;
        }
        Double moonPhase = conditions.getMoonPhase();
        if ( moonPhase == null ) {
            return null;
        }
        return moonPhase;
    }

    private String dtoConditionsPhaseDescription(MeteorShowerVisibilityDTO meteorShowerVisibilityDTO) {
        if ( meteorShowerVisibilityDTO == null ) {
            return null;
        }
        ConditionsDTO conditions = meteorShowerVisibilityDTO.getConditions();
        if ( conditions == null ) {
            return null;
        }
        String phaseDescription = conditions.getPhaseDescription();
        if ( phaseDescription == null ) {
            return null;
        }
        return phaseDescription;
    }

    private Double dtoCoordinatesLatitude(MeteorShowerVisibilityDTO meteorShowerVisibilityDTO) {
        if ( meteorShowerVisibilityDTO == null ) {
            return null;
        }
        CoordinatesDTO coordinates = meteorShowerVisibilityDTO.getCoordinates();
        if ( coordinates == null ) {
            return null;
        }
        Double latitude = coordinates.getLatitude();
        if ( latitude == null ) {
            return null;
        }
        return latitude;
    }

    private Double dtoCoordinatesLongitude(MeteorShowerVisibilityDTO meteorShowerVisibilityDTO) {
        if ( meteorShowerVisibilityDTO == null ) {
            return null;
        }
        CoordinatesDTO coordinates = meteorShowerVisibilityDTO.getCoordinates();
        if ( coordinates == null ) {
            return null;
        }
        Double longitude = coordinates.getLongitude();
        if ( longitude == null ) {
            return null;
        }
        return longitude;
    }

    private OffsetDateTime dtoSunTimesSunrise(MeteorShowerVisibilityDTO meteorShowerVisibilityDTO) {
        if ( meteorShowerVisibilityDTO == null ) {
            return null;
        }
        SunTimesDTO sunTimes = meteorShowerVisibilityDTO.getSunTimes();
        if ( sunTimes == null ) {
            return null;
        }
        OffsetDateTime sunrise = sunTimes.getSunrise();
        if ( sunrise == null ) {
            return null;
        }
        return sunrise;
    }

    private OffsetDateTime dtoSunTimesSunset(MeteorShowerVisibilityDTO meteorShowerVisibilityDTO) {
        if ( meteorShowerVisibilityDTO == null ) {
            return null;
        }
        SunTimesDTO sunTimes = meteorShowerVisibilityDTO.getSunTimes();
        if ( sunTimes == null ) {
            return null;
        }
        OffsetDateTime sunset = sunTimes.getSunset();
        if ( sunset == null ) {
            return null;
        }
        return sunset;
    }

    private String dtoSunTimesTimeZoneId(MeteorShowerVisibilityDTO meteorShowerVisibilityDTO) {
        if ( meteorShowerVisibilityDTO == null ) {
            return null;
        }
        SunTimesDTO sunTimes = meteorShowerVisibilityDTO.getSunTimes();
        if ( sunTimes == null ) {
            return null;
        }
        String timeZoneId = sunTimes.getTimeZoneId();
        if ( timeZoneId == null ) {
            return null;
        }
        return timeZoneId;
    }

    private LocalDate dtoPeakDatesStart(MeteorShowerVisibilityDTO meteorShowerVisibilityDTO) {
        if ( meteorShowerVisibilityDTO == null ) {
            return null;
        }
        PeakDatesDTO peakDates = meteorShowerVisibilityDTO.getPeakDates();
        if ( peakDates == null ) {
            return null;
        }
        LocalDate start = peakDates.getStart();
        if ( start == null ) {
            return null;
        }
        return start;
    }

    private LocalDate dtoPeakDatesEnd(MeteorShowerVisibilityDTO meteorShowerVisibilityDTO) {
        if ( meteorShowerVisibilityDTO == null ) {
            return null;
        }
        PeakDatesDTO peakDates = meteorShowerVisibilityDTO.getPeakDates();
        if ( peakDates == null ) {
            return null;
        }
        LocalDate end = peakDates.getEnd();
        if ( end == null ) {
            return null;
        }
        return end;
    }

    private LocalDateTime dtoPeakDatesBestPeakDatetime(MeteorShowerVisibilityDTO meteorShowerVisibilityDTO) {
        if ( meteorShowerVisibilityDTO == null ) {
            return null;
        }
        PeakDatesDTO peakDates = meteorShowerVisibilityDTO.getPeakDates();
        if ( peakDates == null ) {
            return null;
        }
        LocalDateTime bestPeakDatetime = peakDates.getBestPeakDatetime();
        if ( bestPeakDatetime == null ) {
            return null;
        }
        return bestPeakDatetime;
    }
}
