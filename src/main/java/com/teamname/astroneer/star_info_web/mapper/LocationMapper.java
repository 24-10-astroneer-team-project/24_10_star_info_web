package com.teamname.astroneer.star_info_web.mapper;

import com.teamname.astroneer.star_info_web.dto.LocationDTO;
import com.teamname.astroneer.star_info_web.entity.Location;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface LocationMapper {

    // Location -> LocationDTO로 변환
    @Mappings({
            @Mapping(source = "user.id", target = "userId"),
            @Mapping(source = "id", target = "locationId"),
            @Mapping(source = "latitude", target = "lat"),
            @Mapping(source = "longitude", target = "lng"),
            @Mapping(source = "description", target = "description")
    })
    LocationDTO toLocationDTO(Location location);

    // LocationDTO -> Location으로 변환 (필요하다면 추가)
//    @Mappings({
//            @Mapping(source = "userId", target = "user.id"),
//            @Mapping(source = "locationId", target = "id"),
//            @Mapping(source = "lat", target = "latitude"),
//            @Mapping(source = "lng", target = "longitude"),
//            @Mapping(source = "description", target = "description")
//    })
//    Location toLocation(LocationDTO locationDTO);
}
