package com.teamname.astroneer.star_info_web.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LocationEditRequest {
    private Long locationId;    // 수정할 위치 ID
    private Double lat;         // 수정할 위도
    private Double lng;         // 수정할 경도
    private String description; // 수정할 위치 설명
}