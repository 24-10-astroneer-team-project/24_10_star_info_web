package com.teamname.astroneer.star_info_web.mapper;

import com.teamname.astroneer.star_info_web.dto.MemberDetailDTO;
import com.teamname.astroneer.star_info_web.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    // Member -> MemberDetailDTO 매핑
    @Mapping(source = "id", target = "userId")
    @Mapping(source = "locations", target = "locations") // Location 매핑
    @Mapping(source = "favoriteLocationId", target = "favoriteLocationId") // 즐겨찾기 위치 ID 매핑
    MemberDetailDTO toMemberDetailDTO(Member member);
}