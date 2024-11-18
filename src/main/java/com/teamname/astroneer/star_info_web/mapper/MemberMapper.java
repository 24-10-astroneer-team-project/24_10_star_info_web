package com.teamname.astroneer.star_info_web.mapper;

import com.teamname.astroneer.star_info_web.dto.MemberDetailDTO;
import com.teamname.astroneer.star_info_web.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    MemberMapper INSTANCE = Mappers.getMapper(MemberMapper.class);

    // Member -> MemberDetailDTO 매핑
    @Mapping(source = "id", target = "userId")
    MemberDetailDTO toMemberDetailDTO(Member member);

    // MemberDetailDTO -> Member 매핑 (필요 시)
//    @Mapping(source = "userId", target = "id")
//    Member toMember(MemberDetailDTO memberDetailDTO);
}