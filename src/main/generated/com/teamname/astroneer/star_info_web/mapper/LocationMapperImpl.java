package com.teamname.astroneer.star_info_web.mapper;

import com.teamname.astroneer.star_info_web.dto.LocationDTO;
import com.teamname.astroneer.star_info_web.entity.Location;
import com.teamname.astroneer.star_info_web.entity.Member;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-11-19T11:05:19+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.11 (Oracle Corporation)"
)
@Component
public class LocationMapperImpl implements LocationMapper {

    @Override
    public LocationDTO toLocationDTO(Location location) {
        if ( location == null ) {
            return null;
        }

        LocationDTO locationDTO = new LocationDTO();

        locationDTO.setUserId( locationUserId( location ) );
        locationDTO.setLocationId( location.getId() );
        locationDTO.setLat( location.getLatitude() );
        locationDTO.setLng( location.getLongitude() );
        locationDTO.setDescription( location.getDescription() );

        return locationDTO;
    }

    private long locationUserId(Location location) {
        if ( location == null ) {
            return 0L;
        }
        Member user = location.getUser();
        if ( user == null ) {
            return 0L;
        }
        long id = user.getId();
        return id;
    }
}
