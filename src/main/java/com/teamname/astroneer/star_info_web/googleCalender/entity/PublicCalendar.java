package com.teamname.astroneer.star_info_web.googleCalender.entity;

import com.teamname.astroneer.star_info_web.googleCalender.dto.EventCategory;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class PublicCalendar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "public_calendar_id")
    private Long publicCalendarId;  // 자동 생성되는 고유 ID 번호

    @Column(unique = true, nullable = false)
    private String googleEventId;  // Google Calendar에서 생성된 이벤트 ID

    @Column(nullable = false)
    private String summary;  // 이벤트 제목

    private String location; // 이벤트 위치

    @Column(columnDefinition = "TEXT")
    private String description;  // 이벤트 설명

    @Column(name = "start_datetime", nullable = false)
    private LocalDateTime startDateTime;  // 시작 시간

    @Column(name = "end_datetime", nullable = false)
    private LocalDateTime endDateTime;  // 종료 시간

    @Column(name = "time_zone", nullable = false)
    private String timeZone;  // 시간대

    @Column(name = "created_by", nullable = false)
    private String createdBy;  // 이벤트 생성자 (서비스 계정 또는 사용자 ID)

    @Column(name = "event_category", nullable = false)
    @Enumerated(EnumType.STRING)  // Enum 값을 문자열로 저장
    private EventCategory eventCategory;
}