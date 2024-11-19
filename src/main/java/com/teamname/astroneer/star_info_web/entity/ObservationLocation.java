package com.teamname.astroneer.star_info_web.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "ObservationLocation")  // DB의 테이블 이름과 매핑
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ObservationLocation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Primary Key 자동 생성
    @Column(name = "loc_id")
    private long id;

    @Column(name = "loc_name", length = 100)
    private String LocName;

    @Column(name = "latitude") // 위도
    private Double latitude;

    @Column(name = "longitude") // 경도
    private Double longitude;

    @Column(name = "is_recommended")
    private Boolean isRecommended;

    @Column(name = "loc_reg_date", nullable = false, updatable = false)
    @CreationTimestamp  // 자동으로 현재 시간 삽입
    private Timestamp locRegDate;
}
