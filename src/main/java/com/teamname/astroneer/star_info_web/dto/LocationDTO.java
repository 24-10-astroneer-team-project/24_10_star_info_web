package com.teamname.astroneer.star_info_web.dto;

import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
public class LocationDTO {
    private double lat;  // 위도
    private double lng;  // 경도
    private String description;  // 위치 설명
    private int userId;  // 사용자 ID
}
