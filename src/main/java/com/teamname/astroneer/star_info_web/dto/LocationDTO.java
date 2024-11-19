package com.teamname.astroneer.star_info_web.dto;

import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
public class LocationDTO {
    private long locationId;
    private double lat;  // 위도
    private double lng;  // 경도
    private String description;  // 위치 설명
    private long userId;  // 사용자 ID
}
