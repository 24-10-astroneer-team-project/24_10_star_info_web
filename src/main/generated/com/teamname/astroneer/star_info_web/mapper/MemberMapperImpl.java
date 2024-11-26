package com.teamname.astroneer.star_info_web.mapper;

import com.teamname.astroneer.star_info_web.dto.MemberDetailDTO;
import com.teamname.astroneer.star_info_web.entity.Location;
import com.teamname.astroneer.star_info_web.entity.Member;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-11-19T11:05:20+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.11 (Oracle Corporation)"
)
@Component
public class MemberMapperImpl implements MemberMapper {

    @Override
    public MemberDetailDTO toMemberDetailDTO(Member member) {
        if ( member == null ) {
            return null;
        }

        MemberDetailDTO memberDetailDTO = new MemberDetailDTO();

        memberDetailDTO.setUserId( member.getId() );
        memberDetailDTO.setUName( member.getUName() );
        memberDetailDTO.setNickname( member.getNickname() );
        memberDetailDTO.setEmail( member.getEmail() );
        memberDetailDTO.setPreferredTime( member.getPreferredTime() );
        if ( member.getAlertEnabled() != null ) {
            memberDetailDTO.setAlertEnabled( member.getAlertEnabled() );
        }
        memberDetailDTO.setFavoriteLocationId( member.getFavoriteLocationId() );
        List<Location> list = member.getLocations();
        if ( list != null ) {
            memberDetailDTO.setLocations( new ArrayList<Location>( list ) );
        }
        memberDetailDTO.setUpdateDate( member.getUpdateDate() );
        memberDetailDTO.setGoogleLoginId( member.getGoogleLoginId() );

        return memberDetailDTO;
    }
}
