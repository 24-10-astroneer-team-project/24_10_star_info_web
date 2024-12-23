package com.teamname.astroneer.star_info_web.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "users")  // DB의 테이블 이름과 매핑
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Primary Key 자동 생성
    @Column(name = "user_id")
    private long id;

    @Column(name = "u_name", nullable = false, length = 100) // 사용자 이름
    private String uName;

    @Column(name = "nickname", nullable = false, length = 20)
    private String nickname;

    @Column(name = "email", nullable = false, unique = true, length = 100) // 이메일
    private String email;

    @Column(name = "google_id", nullable = false, unique = true, length = 255) // 구글 소셜 로그인 ID
    private String googleLoginId;

    @Column(name = "favorite_location_id", nullable = true)  // 선호하는 위치 ID
    private long favoriteLocationId;

    @Column(name = "preferred_time", length = 50) // 선호하는 관측 시간대
    private String preferredTime;

    @Column(name = "alert_enabled", nullable = false) // 천문 현상 알림 활성화 여부
    private Boolean alertEnabled = true;

    @Column(name = "reg_date", nullable = false, updatable = false) // 가입 시각
    private LocalDateTime regDate = LocalDateTime.now();

    @Column(name = "update_date", nullable = false) // 업데이트 시각
    private LocalDateTime updateDate = LocalDateTime.now();

    @Column(name = "auth_level", nullable = false, columnDefinition = "TINYINT(1) DEFAULT 1") // 권한 레벨
    private int authLevel;

    @Column(name = "del_status", nullable = false) // 탈퇴 여부
    private Boolean delStatus = false;

    @Column(name = "del_date") // 탈퇴 날짜
    private LocalDateTime delDate;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY) // Member와 Location의 관계 설정
    private List<Location> locations;

    @PrePersist
    protected void onCreate() {
        this.regDate = LocalDateTime.now();
        this.updateDate = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updateDate = LocalDateTime.now();
    }

    public boolean isAlertEnabled() {
        return alertEnabled;
    }
}
