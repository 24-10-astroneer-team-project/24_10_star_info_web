package com.teamname.astroneer.star_info_web.astroEvent.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.time.LocalDate;

@MappedSuperclass
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public abstract class AstronomicalEvent {

    @Column(name = "event_name", length = 100, nullable = false)
    private String eventName;

    @Column(name = "event_type", length = 50, nullable = false)
    private String eventType;

    @Column(name = "event_reg_date", nullable = false, updatable = false)
    @CreationTimestamp
    private Timestamp eventRegDate;
}