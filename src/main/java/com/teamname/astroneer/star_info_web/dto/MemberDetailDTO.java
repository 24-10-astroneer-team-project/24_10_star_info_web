package com.teamname.astroneer.star_info_web.dto;

import com.teamname.astroneer.star_info_web.entity.Location;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class MemberDetailDTO {
    private long userId;
    private String uName;
    private String nickname;
    private String email;
    private String preferredTime;
    private boolean alertEnabled;
    private Long favoriteLocationId;
    private List<Location> locations;
    private LocalDateTime updateDate;
    private String googleLoginId;
}
