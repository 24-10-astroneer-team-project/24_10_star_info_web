//package com.teamname.astroneer.star_info_web.googleCalender.entity;
//
//import jakarta.persistence.Column;
//import jakarta.persistence.Entity;
//import jakarta.persistence.Id;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//import java.time.LocalDateTime;
//
//@Entity
//@Getter
//@Setter
//@NoArgsConstructor
//public class PublicCalendar {
//
//    @Id
//    @Column(name = "event_id")
//    private String eventId;  // Google Calendar 이벤트 ID (기본 키)
//
//    @Column(nullable = false)
//    private String summary;  // 이벤트 제목
//
//    private String location; // 이벤트 위치
//
//    @Column(columnDefinition = "TEXT")
//    private String description;  // 이벤트 설명
//
//    @Column(name = "start_datetime", nullable = false)
//    private LocalDateTime startDateTime;  // 시작 시간
//
//    @Column(name = "end_datetime", nullable = false)
//    private LocalDateTime endDateTime;  // 종료 시간
//
//    @Column(name = "time_zone", nullable = false)
//    private String timeZone;  // 시간대
//
//    @Column(name = "created_by", nullable = false)
//    private String createdBy;  // 이벤트 생성자 (서비스 계정 또는 사용자 ID)
//}
