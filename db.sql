-- 데이터베이스 삭제 및 생성
DROP DATABASE IF EXISTS `2024_10_ASTRONEER_TEAMPROJECT`;
CREATE DATABASE `2024_10_ASTRONEER_TEAMPROJECT`;
USE `2024_10_ASTRONEER_TEAMPROJECT`;

-- User 테이블
CREATE TABLE `users` (
                         `user_id` INT NOT NULL AUTO_INCREMENT COMMENT '고유 사용자 ID (Primary Key)',
                         `u_name` VARCHAR(100) NOT NULL COMMENT '사용자 이름',
                         `nickname` VARCHAR(50) NOT NULL COMMENT '사용자 닉네임',  -- 닉네임 추가
                         `email` VARCHAR(100) NOT NULL UNIQUE COMMENT '사용자의 이메일 (Google 계정과 연동)',
                         `google_id` VARCHAR(255) NOT NULL UNIQUE COMMENT '구글 소셜 로그인 ID (고유)',
                         `preferred_time` VARCHAR(50) NULL COMMENT '선호하는 관측 시간대 (예: 아침, 저녁)',
                         `alert_enabled` BOOLEAN DEFAULT TRUE COMMENT '천문 현상 알림 활성화 여부 (True: 활성화, False: 비활성화)',
                         `auth_level` TINYINT(1) NOT NULL DEFAULT 1 COMMENT '권한 레벨 (1=일반 사용자, 5=관리자)',
                         `reg_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '사용자 가입 시각',
                         `update_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '사용자 정보 업데이트 시각',
                         `del_status` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '탈퇴 여부 (0=탈퇴 전, 1=탈퇴 후)',
                         `del_date` DATETIME NULL COMMENT '탈퇴 날짜',
                         `favorite_location_id` INT NULL COMMENT '선호위치 즐겨찾기',
                         PRIMARY KEY (`user_id`)
);

-- Location 테이블 생성 (users 테이블을 참조하기 때문에 이후에 생성)
CREATE TABLE `Location` (
                            `location_id` INT NOT NULL AUTO_INCREMENT,
                            `user_id` INT NOT NULL,
                            `latitude` DOUBLE NOT NULL,
                            `longitude` DOUBLE NOT NULL,
                            `description` VARCHAR(255) NULL,
                            PRIMARY KEY (`location_id`),
                            FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) -- 사용자 테이블과의 외래 키 관계 설정
);

-- ObservationLocation 테이블
CREATE TABLE `observation_location` (
                                        `loc_id` INT NOT NULL AUTO_INCREMENT COMMENT '고유 관측 장소 ID (Primary Key)',
                                        `loc_name` VARCHAR(100) NULL COMMENT '관측 장소 이름',
                                        `latitude` DOUBLE NULL COMMENT '관측 장소 위도',  -- DOUBLE 타입으로 수정
                                        `longitude` DOUBLE NULL COMMENT '관측 장소 경도',  -- DOUBLE 타입으로 수정
                                        `is_recommended` BOOLEAN DEFAULT FALSE COMMENT '장소 추천 여부 (True: 추천, False: 비추천)',
                                        `loc_reg_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '장소 등록 시간',
                                        PRIMARY KEY (`loc_id`)
);

-- astronomical_event 테이블
CREATE TABLE astronomical_event (
                                    event_id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                    event_name VARCHAR(100) NOT NULL,
                                    event_type VARCHAR(50) NOT NULL,
                                    event_reg_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
-- astronomical_event 의 자식 meteor_shower_visibility 테이블
CREATE TABLE meteor_shower_visibility (
                                          event_id BIGINT PRIMARY KEY,
                                          comet_name VARCHAR(255) NOT NULL,
                                          comet_approaching VARCHAR(255) NOT NULL,
                                          meteor_shower_name VARCHAR(255) NOT NULL,
                                          altitude DOUBLE NOT NULL,
                                          direction VARCHAR(255) NOT NULL,
                                          illumination DOUBLE NOT NULL,
                                          moon_phase DOUBLE NOT NULL,
                                          phase_description VARCHAR(255) NOT NULL,
                                          latitude DOUBLE NOT NULL,
                                          longitude DOUBLE NOT NULL,
                                          sunrise_time TIMESTAMP WITH TIME ZONE NOT NULL,
                                          sunset_time TIMESTAMP WITH TIME ZONE NOT NULL,
                                          time_zone_id VARCHAR(255) NOT NULL,
                                          visibility_message VARCHAR(255) NOT NULL,
                                          peak_start DATE NOT NULL,
                                          peak_end DATE NOT NULL,
                                          best_peak_datetime TIMESTAMP NOT NULL,
                                          visibility_rating VARCHAR(255) NOT NULL,
                                          CONSTRAINT fk_event FOREIGN KEY (event_id) REFERENCES astronomical_event (event_id)
);


-- ObservationRecommendation 테이블
CREATE TABLE `observation_recommendation` (
                                              `recommendation_id` INT NOT NULL AUTO_INCREMENT COMMENT '고유 추천 ID (Primary Key)',
                                              `recommended_time` DATETIME NULL COMMENT '추천된 시간',
                                              `recom_reg_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '추천 생성 시간',
                                              `user_id` INT NOT NULL COMMENT '고유 사용자 ID',
                                              `loc_id` INT NOT NULL COMMENT '고유 관측 장소 ID',
                                              PRIMARY KEY (`recommendation_id`),
                                              FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
                                              FOREIGN KEY (`loc_id`) REFERENCES `observation_location` (`loc_id`) ON DELETE CASCADE
);

-- ObservationRecord 테이블
CREATE TABLE `observation_record` (
                                      `record_id` INT NOT NULL AUTO_INCREMENT COMMENT '고유 관측 기록 ID (Primary Key)',
                                      `user_id` INT NOT NULL COMMENT '고유 사용자 ID',
                                      `event_id` INT NOT NULL COMMENT '고유 천문 현상 ID',
                                      `observation_date` DATETIME NOT NULL COMMENT '관측 날짜',
                                      `latitude` DOUBLE NULL COMMENT '관측한 장소의 위도',  -- DOUBLE 타입으로 수정
                                      `longitude` DOUBLE NULL COMMENT '관측한 장소의 경도',  -- DOUBLE 타입으로 수정
                                      `observation_result` TEXT NULL COMMENT '관측 결과 (성공 여부, 메모 등)',
                                      `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '기록 생성 시간',
                                      PRIMARY KEY (`record_id`),
                                      FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
                                      FOREIGN KEY (`event_id`) REFERENCES `astronomical_event` (`event_id`) ON DELETE CASCADE
);

-- UserEventInterest 테이블
CREATE TABLE `user_event_interest` (
                                       `user_id` INT NOT NULL COMMENT '고유 사용자 ID',
                                       `event_id` INT NOT NULL COMMENT '고유 천문 현상 ID',
                                       PRIMARY KEY (`user_id`, `event_id`),
                                       FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
                                       FOREIGN KEY (`event_id`) REFERENCES `astronomical_event` (`event_id`) ON DELETE CASCADE
);

-- public_calendar 테이블
CREATE TABLE public_calendar (
                                 id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                 googleEventId VARCHAR(255) UNIQUE NOT NULL,
                                 summary VARCHAR(255) NOT NULL,
                                 location VARCHAR(255),
                                 description TEXT,
                                 start_datetime DATETIME NOT NULL,
                                 end_datetime DATETIME NOT NULL,
                                 time_zone VARCHAR(255) NOT NULL,
                                 created_by VARCHAR(255) NOT NULL
);

SHOW TABLES;

-- user table 조회
SELECT * FROM users;

-- location tavle 조회
SELECT * FROM Location;

-- observation_location table 조회
SELECT * FROM observation_location;

-- astronomical_event table 조회
SELECT * FROM astronomical_event;
SELECT * FROM meteor_shower_visibility;

SELECT * FROM public_calendar;
