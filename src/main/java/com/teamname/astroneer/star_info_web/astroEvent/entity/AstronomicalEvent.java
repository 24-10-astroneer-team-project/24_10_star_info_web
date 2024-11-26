package com.teamname.astroneer.star_info_web.astroEvent.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "astronomical_event")
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class AstronomicalEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_id")
    private Long id;

    @Column(name = "event_name", length = 100, nullable = false)
    private String eventName;

    @Column(name = "event_type", length = 50, nullable = false)
    private String eventType;

    @Column(name = "event_reg_date", nullable = false, updatable = false)
    @CreationTimestamp
    private Timestamp eventRegDate;
}