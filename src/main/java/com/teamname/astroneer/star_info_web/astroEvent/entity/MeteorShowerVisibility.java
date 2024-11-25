package com.teamname.astroneer.star_info_web.astroEvent.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;

@SuperBuilder
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "meteor_shower_visibility")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MeteorShowerVisibility extends AstronomicalEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "visibility_id")
    private Long visibilityId;

    @Column(name = "comet_name", nullable = false)
    private String cometName;

    @Column(name = "comet_approaching", nullable = false)
    private String cometApproaching;

    @Column(name = "meteor_shower_name", nullable = false)
    private String meteorShowerName;

    @Column(name = "altitude", nullable = false)
    private Double altitude;

    @Column(name = "direction", nullable = false)
    private String direction;

    @Column(name = "illumination", nullable = false)
    private Double illumination;

    @Column(name = "moon_phase", nullable = false)
    private Double moonPhase;

    @Column(name = "phase_description", nullable = false)
    private String phaseDescription;

    @Column(name = "latitude", nullable = false)
    private Double latitude;

    @Column(name = "longitude", nullable = false)
    private Double longitude;

    @Column(name = "sunrise_time", nullable = false)
    private OffsetDateTime sunriseTime;

    @Column(name = "sunset_time", nullable = false)
    private OffsetDateTime sunsetTime;

    @Column(name = "time_zone_id", nullable = false)
    private String timeZoneId;

    @Column(name = "visibility_message", nullable = false)
    private String visibilityMessage;

    @Column(name = "peak_start", nullable = false)
    private LocalDate peakStart;

    @Column(name = "peak_end", nullable = false)
    private LocalDate peakEnd;

    @Column(name = "best_peak_datetime", nullable = false)
    private LocalDateTime bestPeakDatetime;

    @Column(name = "visibility_rating", nullable = false)
    private String visibilityRating;
}