package com.teamname.astroneer.star_info_web.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Location")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;  // id의 타입을 Long으로 변경

    @Column(nullable = false)
    private double latitude;  // 위도

    @Column(nullable = false)
    private double longitude;  // 경도

    @Column(length = 255)  // 설명 길이를 255로 제한
    private String description;  // 위치에 대한 설명

    @ManyToOne  // 다대일 관계를 명시
    @JoinColumn(name = "user_id", nullable = false)  // 외래키로 user_id를 사용하며, null 허용하지 않음
    private Member user;  // Location과 연결된 Users 엔티티

}
