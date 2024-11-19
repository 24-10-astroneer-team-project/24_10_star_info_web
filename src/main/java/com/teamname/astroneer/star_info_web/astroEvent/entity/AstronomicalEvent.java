package com.teamname.astroneer.star_info_web.astroEvent.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "Astronomical_Event")  // DB의 테이블 이름과 매핑
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AstronomicalEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Primary Key 자동 생성
    @Column(name = "event_id")
    private int id;

    @Column(name = "event_name", length = 100, nullable = false)
    private String eventName;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalDateTime endTime;

    @Column(name = "latitude") // 위도
    private Double latitude;

    @Column(name = "longitude") // 경도
    private Double longitude;

    @Column(name = "event_reg_date", nullable = false, updatable = false)
    @CreationTimestamp  // 자동으로 현재 시간 삽입
    private Timestamp eventRegDate;
}
